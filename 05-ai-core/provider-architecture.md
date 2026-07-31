---
id: "ai-core-provider-architecture"
title: "Provider Architecture"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (@vestara/provider-runtime, @vestara/provider-opencode)"
tags: ["providers", "provider-neutral", "reconciliation"]
---

# Provider Architecture

## Purpose

Document Vestara as explicitly **provider-neutral**. A Vestara distribution may
ship with a default provider; users may install, remove, enable, disable, and
prioritize providers. Providers are replaceable engineering workers governed by
Vestara.

## Current state

**Implemented (partial)**:

- `@vestara/provider-runtime` defines the provider manager contract and
  lifecycle.
- `@vestara/provider-opencode` is the **default provider** wired into the API
  (`DefaultProviderManager` + `OpenCodeProvider` in `workspace-context.ts`).
- The provider surface (`complete`, `stream`) is used by chat, docs/ask,
  execution/analyze, graph/analyze, and diagnostics/analyze.
- `provider` CLI sub-command and a `useProviderSettings` hook exist in the UI.

**Not implemented**:

- Installable third-party provider packages.
- User-driven enable/disable/prioritize in a production sense (a settings
  surface exists; provider routing is not generalized).
- Cross-provider verification.

## Provider taxonomy

Do not treat all provider types as identical. Distinguish:

| Provider type | Behavior | Implemented |
|---------------|----------|-------------|
| API model provider | Remote `complete`/`stream` over an API | yes (default) |
| Engineering execution provider | Owns a tool loop and implementation execution | proposed (Codex, Claude Code) |
| Interactive CLI provider | A CLI that performs engineering actions | proposed |
| Local inference provider | Local model serving (e.g. Ollama) | proposed (configured, not default) |
| MCP-connected provider | Connects via Model Context Protocol tools | proposed |

## Core distinction

```text
Vestara core is provider-neutral.

A Vestara distribution may ship with a default provider.

Users may install, remove, enable, disable, and prioritize providers.

Providers are replaceable engineering workers governed by Vestara.
```

Vestara owns: intent, planning, assignment, permissions, execution identity,
events, evidence, verification, trust, and history.
The provider owns: provider-specific reasoning, tool loop, and implementation
execution.

## OpenAI Codex integration direction

Codex is a **possible installable engineering provider**. The Blueprint may
describe: CLI detection, SDK adapter, authentication health, thread management,
resume, cancellation, structured event translation, policy translation,
workspace context, evidence capture, independent verification, MCP integration,
and UI/CLI configuration.

**None of these are implemented today.** They are proposed architecture. The
architectural relationship is:

```text
Vestara owns: intent, planning, assignment, permissions, execution identity,
              events, evidence, verification, trust, history.
Codex owns:   provider-specific reasoning, tool loop, implementation execution.
```

## Claude Code integration direction

Claude Code is another **optional engineering provider**. Use the correct
product name **Claude Code** (never "Claude Codex"). Future options: CLI
detection, SDK integration, session management, resume, cancellation,
permission-mode translation, allowed tools, MCP integration, provider health,
and cross-provider verification. **Not implemented today** — proposed.

## Cross-provider verification

Architectural value of provider independence:

```text
Planner: Vestara
Developer: OpenAI Codex
Verifier: Claude Code
Runtime checks: Vestara
Visual checks: Vestara browser runtime
Final verification decision: Vestara
```

(or the inverse provider arrangement). **Not implemented.** Classified as
planned architecture. A future policy model may include: require independent
verifier, disallow same provider, disallow same vendor, disallow same model
family. Do not create implementation contracts for this without an ADR.

## Local providers

Ollama is configured as an optional provider in `opencode.json` for local
development. It is not the default and is not auto-started.

## Implementation status

- Provider manager + default provider: **implemented**.
- Provider-neutral routing, installable packages, cross-provider verification:
  **proposed**.
- Codex / Claude Code adapters: **proposed**.

## Future direction

See `20-roadmaps/provider-platform-roadmap.md`.

## Related ADRs

- `adr/ADR-106-provider-neutral-engineering-provider-runtime.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/providers/opencode/src`,
  `packages/provider-runtime/src`,
  `apps/api/src/workspace-context.ts`, `apps/cli/src/commands/provider.ts`
