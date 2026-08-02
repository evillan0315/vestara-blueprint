# Commit-to-Capability Map

## Purpose

Trace every recent implementation commit to the capability it changes, the
architecture it realizes, and the documents it affects. This map enables
automated drift detection and evidence traceability.

## Map

| Commit | Date | Capabilities | Architecture | Documents Affected |
|--------|------|--------------|--------------|-------------------|
| `eb3fd3d` | 2026-08-02 | engineering-graph | ADR-105 | `packages/workspace/src/index.ts` |
| `8453313` | 2026-08-02 | engineering-graph, provider-routing, ui | ADR-105, ADR-106 | `apps/workspace/src/pages/OpsCenter.tsx`, `apps/workspace/src/pages/Agents.tsx` |
| `a9318fe` | 2026-08-02 | provider-routing, workspace-runtime | ADR-106, ADR-017 | `apps/api/src/workspace-context.ts` |
| `ad6370d` | 2026-08-02 | marketplace, extension-platform | ADR-112, ADR-115 | `packages/execution-center/` (new) |
| `df1591d` | 2026-08-01 | tui, orchestration | ADR-113 | `packages/tui/src/app.tsx` |
| `579df3f` | 2026-08-01 | host-runtime, os-0 | ADR-114 | `docs/Architecture/` |
| `db3f498` | 2026-08-01 | tui | ADR-113 | `packages/tui/src/controller.ts` |
| `502b078` | 2026-08-01 | tui, cli | ADR-113 | `packages/tui/src/app.tsx` |
| `45e670d` | 2026-08-01 | extension-platform | ADR-112 | `packages/extension-runtime/` |
| `4a76027` | 2026-08-01 | agent-harness | ADR-111 | `packages/agent-harness/src/index.ts` |
| `a350622` | 2026-08-01 | provider-routing, orchestration | ADR-106 | `apps/api/src/routes/` |
| `3f2d03d` | 2026-08-01 | verification, documentation | ADR-104 | `scripts/` |
| `05fab1a` | 2026-08-01 | engineering-graph, verification | ADR-105, ADR-104 | `docs/MILESTONES.md` |

## Capability tags

```text
runtime — WorkspaceRuntime, kernel, lifecycle
agent-harness — Agent Harness foundation, turn lifecycle
capabilities — Agent capability system, permission gates
filesystem — Filesystem Runtime, sandboxed execution
orchestration — WorkflowOrchestrator, task dispatch
verification — Verification pipeline, evidence
evidence — Evidence objects, artifacts
engineering-graph — Engineering Graph, entities, relationships
event-store — Engineering Event Store, temporal truth
marketplace — Marketplace catalog, install, CLI
extension-platform — Extension contracts, local package manager
provider-routing — Provider-neutral routing, health, fallback
workspace-ui — Workspace UI components
design-system — VDS tokens, components
cli — CLI commands, REPL
tui — Native TUI, Ink Console
api — API routes, WebSocket
host-runtime — OS-0 host observation
boot-runtime — Boot Runtime, systemd
conversation — Conversation runtime
security — Threat model, encryption
documentation — Docs, ADRs, specifications
roadmap — Roadmaps, milestones
milestone — Milestone completion
```

## Undocumented changes

The following commits introduce new capabilities or significant changes that
may lack corresponding Blueprint documentation:

| Commit | Change | Risk |
|--------|--------|------|
| `ad6370d` | New `packages/execution-center/` package | No Blueprint volume for Execution Center |
| `8453313` | Engineering graph diagnostics UI | Diagnostics not in capability matrix |
| `a9318fe` | Provider and tool wiring for workspace boot | Wiring details not documented |

## Stale document candidates

| Document | Issue |
|----------|-------|
| `05-ai-core/README.md` | Provider table references old routing model |
| `00-governance/01-ai-constitution.md` | Version bumped but review date may need update |
