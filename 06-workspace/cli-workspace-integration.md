---
id: "workspace-cli-workspace-integration"
title: "CLI and Workspace Integration"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
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
implementation-ref: "local main (apps/cli, apps/api, apps/workspace)"
tags: ["cli", "workspace", "integration", "reconciliation"]
---

# CLI and Workspace Integration

## Purpose

Document Workspace UI and Vestara CLI as two clients of the same runtime and
command infrastructure, and mark each shared capability accurately.

## Target model

```text
Vestara Workspace UI
        │
        │ HTTP / WebSocket
        ▼
Vestara Workspace API
        │
        ├── WorkspaceRuntime
        ├── AgentRuntime
        ├── FilesystemRuntime
        ├── VerificationRuntime
        ├── EngineeringGraph
        ├── EngineeringEventStore
        └── EventBus
        ▲
        │
        │ HTTP / IPC / Unix socket
        │
Vestara CLI
```

## Current state

- The **Workspace API** (`apps/api`) is a real HTTP + WebSocket server hosting
  the runtime services; the **UI** (`apps/workspace`) is a full client of it.
- The **CLI** (`apps/cli`) currently **boots its own runtime** (a CLI runtime
  that opens a workspace) rather than consuming the shared API. This is a
  divergence from the target model.

The following shared capabilities are **not yet unified** across UI and CLI:

| Capability | Status |
|------------|--------|
| Shared workspace identity | partial (both open workspaces, separate processes) |
| Shared configuration | partial |
| Shared execution history | no (separate sessions/stores) |
| Shared approvals | no |
| Shared verification | no |
| Command origin tracking | no |
| Event origin tracking | no |
| CLI-to-UI activity visibility | no |
| UI-to-CLI command equivalence | no |
| Deep links | no |
| Runtime health sharing | no |
| CLI version detection | no |
| Local socket direction | no |

## Shared command model

A shared command envelope is **not implemented**. No `commandId`/`correlationId`/
`causationId` envelope exists. Do not create a duplicate command system if an
existing job, intent, execution, or action contract already fulfills the
purpose. The Engineering Session contract (`goal`, `workflowId`,
`assignedAgentIds`) is the closest existing primitive and should be extended
before introducing a new command envelope.

Possible future command sources: `workspace-ui`, `vestara-cli`, `agent`, `api`,
`system`.

## Implementation status

- Workspace API + UI: implemented and verified.
- CLI as shared-runtime client: **proposed** (identified as an architecture gap).

## Future direction

Unify the CLI onto the shared runtime/API, introduce the shared command
envelope (with correlation/causation), and expose CLI activity in the UI.

## Related ADRs

- `adr/ADR-107-workspace-ui-and-cli-as-shared-runtime-clients.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `apps/api/src/index.ts`, `apps/cli/src/runtime/cli-runtime.ts`,
  `apps/workspace/src/lib/api.ts`
