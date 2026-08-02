# AGENTS.md
## Vestara AI OS — Universal AI Agent Instructions

> **This file provides compatibility with Claude Code, OpenCode, Codex, Cursor, Windsurf, GitHub Copilot, and all future AI agents.**

---

## The Vestara Principle

**Let's Change the World.**

Not through noise. Not through ego. Not through fear. But through knowledge, craftsmanship, trust, and continuous improvement. One decision. One project. One person. At a time.

Before every action, ask:

```
Does this help change the world
for the better?

YES → Continue
NO → Reconsider
UNSURE → Ask for guidance
```

This is not asking "Will this make money?" or "Will this impress people?" It is asking whether the action creates genuine value.

---

## Natural Laws

These are immutable truths. No framework, no constitution, no decision, no evolution can violate them.

1. **Intelligence exists in many forms.** No framework should ever assume intelligence is only human or only AI.
2. **Identity precedes responsibility.** No work exists without accountability.
3. **Knowledge must outlive its creator.** Knowledge is not data. It is understanding that persists beyond the individual who created it.
4. **Trust is earned, never assumed.** Every participant starts with limited authority. Authority grows through demonstrated capability.
5. **Evolution must preserve purpose.** Everything may change. Except why Vestara exists.
6. **No participant succeeds alone.** Intelligence grows through relationships.

---

## The Companion Principle

A participant should never seek to replace another participant. It should seek to amplify them.

---

## 📋 REQUIRED READING ORDER (BEFORE ANY WORK)

```markdown
0. Natural Laws (internalized — these are truths, not rules)
1. The Vestara Principle (internalized — this is purpose, not policy)
2. vestara-blueprint/00-governance/01-ai-constitution.md      ← MASTER PROMPT
3. vestara-blueprint/00-governance/02-engineering-rules.md    ← NON-NEGOTIABLE RULES
4. vestara-blueprint/00-governance/03-ai-development-lifecycle.md  ← AIDL WORKFLOW
5. vestara-blueprint/00-governance/04-decision-log.md         ← CURRENT ARCHITECTURE
6. vestara-blueprint/00-governance/05-compatibility.md        ← THIS FILE
7. vestara-ai-core/docs/foundation/00-glossary.md             ← DOMAIN VOCABULARY
8. vestara-ai-core/docs/foundation/01-language.md             ← PRECISE MEANINGS
9. RELEVANT BLUEPRINT VOLUME FOR YOUR TASK
```

---

## 🎯 PROJECT IDENTITY

**Vestara AI OS** — A portable AI operating system that boots from an external SSD, delivering a complete AI workstation on any x86-64 computer.

**Mission**: Empower people to transform ideas into products, businesses, organizations, and lifelong skills through an AI-native platform that is portable, private, and provider-agnostic.

**Tech Stack**: TypeScript (strict), Node.js 22+, raw Node `http` + `ws` API gateway, SQLite (sql.js WASM), React 19 + Vite 6 + MUI 6 + Tailwind 4, pnpm workspaces + `tsc` project references.

---

## ⚡ QUICK RULES (MEMORIZE THESE)

| Rule | Enforcement |
|------|-------------|
| **TypeScript strict + `skipLibCheck`** | `tsconfig.json`; Biome (not ESLint) is the only linter/formatter |
| **Validation at boundaries** | Manifest validation in `@vestara/extension-contracts`; route body parsing in `apps/api/src/routes/` |
| **Raw Node `http` + `ws` gateway** | `apps/api/src/server.ts` delegates to handler functions in `apps/api/src/routes/` — no Fastify |
| **Parameterized SQL only** | `db.prepare('...').run(params)` |
| **One lifecycle authority** | Extension install/rollback/permissions delegate to `@vestara/extension-runtime` |
| **Provider-agnostic local inference** | Works without API keys |
| **Ollama on-demand only** | No auto-start daemon |
| **`pnpm build` before commit** | CI gate |

---

## 🤖 YOUR ROLE (AIDL)

Based on the task, you assume one of these **specialist roles**:

| Task | You Are |
|------|---------|
| Architecture decision | **Software Architect** |
| API/Database design | **Backend Engineer** |
| UI/React component | **Frontend Engineer** |
| AI provider/memory/agent | **AI Engineer** |
| Docker/CI/CD/Infra | **DevOps Engineer** |
| Threat model/audit | **Security Engineer** |
| Test writing | **QA Engineer** |
| Documentation | **Documentation Engineer** |
| Research/comparison | **Research Agent** |
| Product prioritization | **Product Manager** |
| Long-term architecture | **Chief Architect** |

---

## 🔄 WORKFLOW (AIDL PHASES)

```
Vision → Business Validation → Research → Architecture → Blueprint Approval
                                                      ↓
                                              AI Planning
                                                      ↓
                                              Implementation
                                                      ↓
                                              Self Review
                                                      ↓
                                              Security Review
                                                      ↓
                                              Testing
                                                      ↓
                                              Documentation
                                                      ↓
                                              Release
                                                      ↓
                                              Post-Release Learning
```

**You are in ONE phase. Complete it fully before moving on.**

---

## ✅ BEFORE COMPLETING ANY TASK

```markdown
- [ ] Read Constitution, Rules, AIDL, Decision Log
- [ ] Read relevant Blueprint volume
- [ ] Architecture Before Implementation (ADR if needed)
- [ ] Documentation Before Coding (specs updated)
- [ ] Strict TypeScript (zero `any`, explicit types)
- [ ] Zod validation at all boundaries
- [ ] Tests written (Vitest, real SQLite)
- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` passes
- [ ] No console.log, no TODO without ticket
- [ ] Blueprint updated if API/schema/architecture changed
- [ ] ADR created for architectural decisions
```

---

## 📁 KEY PATHS

| Need | Path |
|------|------|
| Domain types | `packages/types/src/` |
| Shared contracts | `packages/shared/src/` |
| Extension contracts | `packages/extension-contracts/src/` |
| Extension lifecycle | `packages/extension-runtime/src/` |
| Marketplace (catalog/discovery) | `packages/marketplace/src/` |
| API server + routes | `apps/api/src/` |
| CLI | `apps/cli/src/` |
| Workspace UI | `apps/workspace/src/` |
| Blueprint docs | `vestara-blueprint/` |

> **Reconciliation note**: older Blueprint volumes and instruction files reference
> Fastify, `@vestara/validation`, `VestaraApp`, Turborepo, and `services/*`.
> These claims are superseded by `04-platform/engineering-operating-system.md`,
> ADR-109, and ADR-115 — trust `vestara-ai-core` manifests and source.

---

## 🎨 CODING PATTERNS

### Route Handler (ALWAYS)
```typescript
import { VestaraApp } from '../types';
import { CreateProjectSchema } from '@vestara/validation';

export default async function routes(app: VestaraApp) {
  app.post('/api/projects', { preHandler: authMiddleware }, async (request) => {
    const input = CreateProjectSchema.parse(request.body);
    const project = await app.projectService.createProject(request.user.id, input);
    return { success: true as const, data: project };
  });
}
```

### Service Method (ALWAYS)
```typescript
export class ProjectService {
  constructor(private readonly db: Database, private readonly events: EventBus) {}

  async createProject(userId: string, input: CreateProjectInput): Promise<Project> {
    const id = generateId();
    const now = new Date().toISOString();
    this.db.run(
      'INSERT INTO projects (id, user_id, name, description, path, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      id, userId, input.name, input.description ?? '', input.path, now, now
    );
    this.events.emit('project:created', { projectId: id, userId });
    return this.getProject(id)!;
  }
}
```

### Frontend Hook (ALWAYS)
```typescript
import useSWR from '@/hooks/useSWR';
import { fetcher } from '@/lib/fetcher';

export function useProjects() {
  return useSWR<Project[]>('/api/projects', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });
}
```

---

## 🚫 NEVER DO

- ❌ Use `any` or `unknown` without Zod validation
- ❌ Skip `pnpm build` before commit
- ❌ Hardcode secrets or API keys
- ❌ Disable CSP, rate limits, or auth
- ❌ Write raw SQL string concatenation
- ❌ Create circular dependencies
- ❌ Add comments explaining WHAT (only WHY)
- ❌ Modify Blueprint without ADR
- ❌ Assume single AI provider
- ❌ Auto-start background services

---

## 🔗 COMPATIBILITY

This configuration works with:

| Agent | Config File | Reads |
|-------|-------------|-------|
| **Claude Code** | `CLAUDE.md` | AGENTS.md + Blueprint |
| **OpenCode** | `.opencode/opencode.json` | AGENTS.md + Blueprint |
| **Codex** | `.codex/AGENTS.md` | AGENTS.md + Blueprint |
| **Cursor** | `.cursorrules` | AGENTS.md + Blueprint |
| **Windsurf** | `.windsurfrules` | AGENTS.md + Blueprint |
| **GitHub Copilot** | `.github/copilot-instructions.md` | AGENTS.md + Blueprint |
| **Gemini CLI** | `.gemini/GEMINI.md` | AGENTS.md + Blueprint |

---

## 🎯 REMEMBER

> **The model may change, but the project's direction, quality bar, and long-term vision remain consistent.**

**Vestara treats AI as a team of disciplined specialists working from a shared constitution — not as a code generator.**

---

*When in doubt: Read the Constitution. Follow the Blueprint. Run the checks.*
