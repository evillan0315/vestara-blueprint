---
id: "workspace-inspector"
title: "Universal Inspector"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "implemented"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (apps/workspace/src/components/graph/Inspector.tsx)"
tags: ["inspector", "engineering-graph", "ui", "reconciliation"]
---

# Universal Inspector

## Purpose

Define the Universal Inspector: the single entity-inspection surface shared by
every Workspace module. Wherever the user clicks an entity — a plan, task,
agent, file, artifact, document, or diagnostic — the same inspector opens and
answers "tell me everything related to this entity."

## Current state

Implemented and verified in `apps/workspace`:
- `GraphContext` (mounted in `ShellLayout`) provides `openInspector(id)`.
- Any module can deep-link via `inspectEntity(id)` (dispatches the
  `vestara:inspect` custom event).
- The Inspector is a right-side drawer with tabs.

## Tabs (implemented)

| Tab | Content |
|-----|---------|
| Overview | kind, status, owner, metadata, trace origin, produced items |
| Relationships | outgoing/incoming with type filter; click-through navigation |
| Timeline | correlated runtime events + stored entity event log |
| Documentation | linked documents (open in the Docs page) |
| Execution | linked sessions / executions / agents |
| Artifacts | linked change sets, verifications, reviews |
| History | backlinks ("referenced by") |
| Actions | open in originating module, open in explorer, copy id, refresh |

## Architecture

```mermaid
flowchart LR
    M[Any module] -->|inspectEntity(id) / openInspector(id)| C[GraphContext]
    C --> I[Inspector drawer]
    C --> G[Engineering Graph API]
    G --> E[Entity detail]
    G --> R[Relationships]
    G --> T[Timeline + event log]
    G --> B[Backlinks]
```

## No dead ends

Every entity link inside the inspector opens another inspector. Nothing in the
Workspace becomes a dead end.

## Integration

- Documentation Center: document action menu → *Open in Engineering Graph*.
- Execution Center: session rows and agent cards deep-link into the inspector.
- Diagnostic Center: health check rows open `diagnostic://health/<id>`.
- Engineering Graph page: Relationship Explorer + global search open the
  inspector.

## Implementation status

Implemented and verified. Cross-module affordances are wired for docs,
execution, and diagnostics.

## Related ADRs

- `adr/ADR-103-workspace-native-context.md`
- `adr/ADR-105-event-sourced-engineering-graph.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `apps/workspace/src/components/graph/GraphContext.tsx`,
  `apps/workspace/src/components/graph/Inspector.tsx`,
  `apps/workspace/src/lib/graph.ts`
