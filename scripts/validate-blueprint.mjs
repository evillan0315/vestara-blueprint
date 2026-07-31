#!/usr/bin/env node
/**
 * Blueprint validation — standalone Node script (no dependencies).
 *
 * Validates:
 *   - Required frontmatter + valid status values + date formats
 *   - Unique document ids and volume numbers
 *   - Broken relative markdown links
 *   - Duplicate ADR ids and missing ADR files
 *   - Mermaid fence integrity
 *   - Orphaned documents (not referenced anywhere)
 *
 * Run from the repository root:
 *   node scripts/validate-blueprint.mjs
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname, basename, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STATUS_VALUES = new Set(['draft', 'review', 'approved', 'deprecated', 'superseded', 'ratified', 'accepted', 'proposed', 'rejected', 'replaced']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MD = 'md';

const errors = [];
const warnings = [];
let files = 0;

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ─── Collect markdown files ───────────────────────────────────
function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'scripts') continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const mdFiles = walk(ROOT);
const relPaths = mdFiles.map((p) => relative(ROOT, p));
files = mdFiles.length;

// Frontmatter: YAML block between leading `---` lines.
function parseFrontmatter(content) {
  if (!content.startsWith('---')) return {};
  const end = content.indexOf('\n---', 3);
  if (end === -1) return {};
  const block = content.slice(3, end);
  const meta = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^([a-zA-Z][\w-]*)\s*:\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  }
  return meta;
}

// Strip code blocks/fences + inline code before scanning links.
function stripFenced(content) {
  return content.replace(/```[\s\S]*?```/g, '\n```\n');
}

function linkTargets(content) {
  const targets = new Set();
  const body = stripFenced(content);
  // [text](target) and ![alt](target)
  for (const m of body.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)) {
    let t = m[1];
    if (t.startsWith('<') && t.endsWith('>')) t = t.slice(1, -1);
    if (t.startsWith('#') || /^[a-z]+:/i.test(t)) continue; // anchor or absolute scheme
    targets.add(t.split('#')[0]);
  }
  // HTML links
  for (const m of body.matchAll(/href=["']([^"']+)["']/g)) {
    const t = m[1];
    if (t.startsWith('#') || /^[a-z]+:/i.test(t)) continue;
    targets.add(t.split('#')[0]);
  }
  return targets;
}

// ─── Per-file checks ──────────────────────────────────────────
const docIds = new Map();
const volumeDirs = new Map();
const adrIds = new Map();

for (const file of mdFiles) {
  const rel = relative(ROOT, file);
  const content = readFileSync(file, 'utf8');
  const fm = parseFrontmatter(content);

  // Frontmatter requirements (only for files inside a numbered volume)
  const inVolume = /^\d{2}-/.test(relative(ROOT, file).split('/')[0] ?? '');
  if (inVolume) {
    for (const required of ['title']) {
      if (!fm[required]) err(`${rel}: missing frontmatter "${required}"`);
    }
    if (fm.status && !STATUS_VALUES.has(fm.status)) {
      err(`${rel}: invalid status "${fm.status}" (expected one of ${[...STATUS_VALUES].join(', ')})`);
    }
  }
  for (const dateField of ['created', 'last-reviewed', 'next-review', 'date']) {
    if (fm[dateField] && !DATE_RE.test(fm[dateField])) err(`${rel}: invalid date format for "${dateField}": ${fm[dateField]}`);
  }
  if (fm.id) {
    if (docIds.has(fm.id)) err(`${rel}: duplicate document id "${fm.id}" (also in ${docIds.get(fm.id)})`);
    docIds.set(fm.id, rel);
  }

  // ADR-specific
  if (/\/adr\/|adr\//.test(rel) || basename(rel).startsWith('ADR-')) {
    if (fm.id) {
      if (adrIds.has(fm.id)) err(`${rel}: duplicate ADR id "${fm.id}"`);
      adrIds.set(fm.id, rel);
    }
    if (fm.adr && !/^ADR-\d+$/.test(fm.adr)) warn(`${rel}: adr label "${fm.adr}" not in ADR-NNN format`);
  }

  // Mermaid fence integrity
  const fences = content.match(/```mermaid/g) ?? [];
  const closes = content.match(/```/g) ?? [];
  if (fences.length > 0 && closes.length % 2 !== 0) {
    err(`${rel}: unbalanced code fences near mermaid diagram`);
  }

  // Link targets
  for (const target of linkTargets(content)) {
    const decoded = target.replace(/^\.\//, '');
    if (!decoded) continue;
    const targetPath = resolve(dirname(file), decoded);
    // Allow directory links (resolve to index/README) and missing anchors handled below.
    let ok = existsSync(targetPath);
    if (!ok && statExistsDir(targetPath)) {
      ok = existsSync(join(targetPath, 'README.md')) || existsSync(join(targetPath, 'index.md'));
    }
    if (!ok) {
      err(`${rel}: broken link -> "${target}" (${relative(ROOT, targetPath)})`);
    }
  }
}

// Volume number uniqueness
for (const entry of readdirSync(ROOT, { withFileTypes: true })) {
  const m = entry.name.match(/^(\d{2})-/);
  if (entry.isDirectory() && m) {
    const num = m[1];
    if (volumeDirs.has(num)) err(`volume number conflict: ${num} used by both "${volumeDirs.get(num)}" and "${entry.name}"`);
    else volumeDirs.set(num, entry.name);
  }
}

// ─── Orphan detection ─────────────────────────────────────────
const allRel = new Set(relPaths);
const referenced = new Set();
for (const file of mdFiles) {
  const content = readFileSync(file, 'utf8');
  const base = relative(ROOT, file);
  for (const target of linkTargets(content)) {
    const resolved = resolve(dirname(file), target);
    const rel = relative(ROOT, resolved);
    if (rel && !rel.startsWith('..')) referenced.add(rel);
  }
}
for (const rel of relPaths) {
  if (rel === 'README.md') continue;
  if (!referenced.has(rel) && !/\/README\.md$/.test(rel)) {
    warnings.push(`orphan: ${rel} is not referenced by any other document`);
  }
}

// ─── Report ───────────────────────────────────────────────────
console.log(`\nBlueprint validation (${files} markdown files)`);
if (volumeDirs.size > 0) console.log(`Volumes: ${volumeDirs.size} distinct volume numbers`);
if (errors.length > 0) {
  console.log(`\n✖ ${errors.length} ERROR${errors.length === 1 ? '' : 'S'}`);
  for (const e of errors) console.log(`  - ${e}`);
} else {
  console.log('\n✔ No blocking errors.');
}
if (warnings.length > 0) {
  console.log(`\n⚠ ${warnings.length} WARNING${warnings.length === 1 ? '' : 'S'}`);
  for (const w of warnings.slice(0, 40)) console.log(`  - ${w}`);
  if (warnings.length > 40) console.log(`  … and ${warnings.length - 40} more`);
}
console.log(`\nExit code: ${errors.length > 0 ? 1 : 0}`);
process.exit(errors.length > 0 ? 1 : 0);

function statExistsDir(p) {
  try { return statSync(p).isDirectory(); } catch { return false; }
}
