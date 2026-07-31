---
id: "platform-engineering-event-architecture"
title: "Engineering Event Architecture"
volume: "04-platform"
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
tags: ["events", "event-store", "temporal", "reconciliation", "architecture"]
---

# Engineering Event Architecture

## Purpose

Document the Engineering Event Store as a first-class architectural capability:
events are historical truth, graph state is a derived projection, and
checkpoints are acceleration artifacts.

## Current state

**Implemented and verified** in `@vestara/engineering-graph`
(`packages/engineering-graph/src/events.ts`) and served by
`apps/api/src/routes/graph.ts`:

| Capability | Status |
|------------|--------|
| Append-only graph events | implemented |
| Monotonic sequence numbers | implemented |
| Entity create / update / delete events | implemented |
| Relationship add / remove events | implemented |
| Structural patches on update | implemented |
| State reconstruction at a specific time (`stateAt(time)`) | implemented |
| Checkpoint-assisted replay | implemented (auto-checkpointing) |
| Entity history | implemented |
| Structural diffs between times | implemented |
| Replay | implemented |
| Temporal graph queries (`POST /api/graph/query`, `at`) | implemented |
| Bounded graph traversal | implemented |
| Current graph derived from events | implemented |
| Timeline integration (Inspector event log) | implemented |
| Live event feeds (`/api/graph/events`) | implemented |

## Architectural principle

```text
Events are historical truth.
Graph state is a derived projection.
Checkpoints are acceleration artifacts.
```

Every hydration diffs the previous state against the new state and appends the
resulting domain events to an append-only log. Any state in time is derived by
replaying the log from the nearest checkpoint.

## Event model

```ts
type GraphEventType =
  | 'entity-created'
  | 'entity-updated'
  | 'entity-deleted'
  | 'relationship-added'
  | 'relationship-removed';

interface GraphEvent {
  seq: number;            // monotonic
  at: string;             // ISO timestamp
  type: GraphEventType;
  source?: string;        // module that produced the change
  entityId?: string;
  entity?: GraphEntity;   // full snapshot on create
  patch?: Partial<GraphEntity>; // changed fields on update
  from?: string;
  to?: string;
  relationshipType?: RelationshipType;
  relationship?: GraphRelationship;
}
```

## Persistence limitation (must be stated accurately)

The Engineering Event Store is currently **memory-resident**:

```text
Persistence mode: session-only
Current state can be rebuilt from sources.
Historical intermediate states cannot be recovered after restart.
```

Durable append-log persistence (e.g. SQLite) is **not implemented**. It is
documented as a natural future extension, not as an existing capability.

## Correlation and causation

Engineering events today carry a `source` label and timestamps, but the event
log does **not** currently implement a full correlation/causation contract.
Specifically, the following are **not** present on `GraphEvent` today:

- `correlationId`
- `causationId`
- `commandId`

Execution/session identity is available on related objects (execution sessions
carry `id`, `goal`, `assignedAgentIds`; agent executions carry `agentId`;
capability entities carry `agent`). Full causal traceability — connecting
intent → command → execution → filesystem operation → graph event →
verification → evidence → outcome — is therefore **not** claimed.

**Required architectural extension**: add `correlationId` / `causationId` (and
optionally `commandId`) to the event envelope, and thread them from commands
through executions to verification. Classified as proposed architecture.

## Temporal queries

- `GET /api/graph/at?time=` — reconstruct state at a time
- `GET /api/graph/diff?from=&to=` — structural diff between times
- `GET /api/graph/history?entity=` — entity event log
- `GET /api/graph/replay` — full event stream
- `POST /api/graph/query` — bounded walk, optionally at a past state (`at`)

## Security

Events are attributed by `source`; no secrets are stored. Event volume is
bounded (telemetry feeds are limited).

## Trade-offs

- **Memory-resident**: fast, simple; loses history on restart.
- **Event-sourced**: reconstructable any time; no separate snapshot store needed.

## Future direction

- Durable append-log persistence with checkpoints on disk.
- Full correlation/causation envelope.
- Confidence over history (see `05-ai-core/trust-and-confidence.md`).
- Time-travel debugging and execution replay over real state.

## Related ADRs

- `adr/ADR-105-event-sourced-engineering-graph.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/engineering-graph/src/events.ts`,
  `packages/engineering-graph/src/graph.ts`,
  `apps/api/src/routes/graph.ts`, `apps/api/src/graph/service.ts`
