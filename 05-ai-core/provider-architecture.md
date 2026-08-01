---
id: "ai-core-provider-architecture"
title: "Provider Architecture"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
version: "1.1.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "vestara-ai-core@a350622 (@vestara/provider-runtime, @vestara/provider-opencode)"
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
- Engineering routing models role, agent instance, provider, and provider-scoped
  model separately. It includes normalized capabilities, named profiles,
  constraints, health hysteresis, candidate evidence, and fallback boundaries.
- Routing selections and task assignments are versioned and persisted beneath
  the active workspace. Reassignment after recorded side effects requires a
  pause and explicit approval.
- Routing is exposed through shared Workspace commands, raw HTTP routes, the
  `routing` CLI command, a Workspace `/routing` page, and the Ink Console.

**Not implemented**:

- Installable third-party provider packages.
- User-driven installation and enable/disable of provider packages in a
  production Marketplace sense.
- Additional engineering execution adapters beyond the default OpenCode
  provider.
- Cross-provider verification.

## Provider taxonomy

Do not treat all provider types as identical. Distinguish:

| Provider type | Behavior | Implemented |
|---------------|----------|-------------|
| API model provider | Remote `complete`/`stream` over an API | yes (default) |
| Engineering execution provider | Owns a tool loop and implementation execution | contract implemented; additional adapters proposed |
| Interactive CLI provider | A CLI that performs engineering actions | presentation Console implemented; provider adapters proposed |
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

The provider-neutral catalog and assignment contract are implemented, but a
Codex adapter is not. The remaining items are proposed architecture. The
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
and cross-provider verification. The shared routing contract is implemented;
the Claude Code adapter is not.

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

(or the inverse provider arrangement). The `Strict Engineering` profile can
express the independent-verifier requirement, but multiple execution providers
and cross-provider verification are **not implemented**. Same-vendor and
same-model-family enforcement remain proposed.

## Local providers

Ollama is configured as an optional provider in `opencode.json` for local
development. It is not the default and is not auto-started.

## Implementation status

- Provider manager + default provider: **implemented**.
- Provider-neutral routing domain, selection, evidence, persistence, and
  governed assignments: **implemented**.
- Installable packages and cross-provider verification: **proposed**.
- Codex / Claude Code adapters: **proposed**.

## Future direction

See `20-roadmaps/provider-platform-roadmap.md`.

## Related ADRs

- `adr/ADR-106-provider-neutral-engineering-provider-runtime.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/providers/opencode/src`,
  `packages/provider-runtime/src`,
  `apps/api/src/workspace-context.ts`, `apps/api/src/routes/routing.ts`,
  `apps/cli/src/commands/routing.ts`, `apps/console/src`,
  `apps/workspace/src/pages/Routing.tsx`
