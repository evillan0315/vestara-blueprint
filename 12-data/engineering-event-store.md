---
id: "data-engineering-event-store"
title: "Engineering Event Store (Data Volume)"
volume: "12-data"
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
implementation-ref: "local main (packages/engineering-graph/src/events.ts)"
tags: ["data", "event-store", "persistence", "reconciliation"]
---

# Engineering Event Store (Data Volume)

## Purpose

Data-volume view of the Engineering Event Store: how engineering history is
recorded, reconstructed, checkpointed, and (in the future) persisted durably.

## Current state

The event store is **memory-resident**. See
`04-platform/engineering-event-architecture.md` for the full capability list.

```text
Persistence mode: session-only
Current state can be rebuilt from sources.
Historical intermediate states cannot be recovered after restart.
```

## Checkpoints and replay

Checkpoints (`GraphSnapshot`) accelerate reconstruction: `stateAt(time)` replays
from the nearest checkpoint with `at <= time`, then applies subsequent events.
Checkpoints are bounded (auto-created every N events; a retention cap keeps the
most recent). Replay is exact: checkpoint state + replayed events equals
reconstructing from the full log.

## Artifact and evidence retention

- Baselines (screenshots) are committed and retained.
- Current / diff / reports are run-scoped and removable via `screenshots:clean`.
- Verification reports and telemetry are retained in the workspace store for
  the session.

## Future direction

Durable append-log persistence (SQLite) with on-disk checkpoints is a natural
extension; it is **proposed**, not implemented. Once durable, historical
intermediate states survive restart and temporal debugging becomes possible.

## Related ADRs

- `adr/ADR-105-event-sourced-engineering-graph.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/engineering-graph/src/events.ts`,
  `packages/engineering-graph/src/graph.ts`
