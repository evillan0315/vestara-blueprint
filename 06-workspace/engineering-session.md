---
id: "workspace-engineering-session"
title: "Engineering Session"
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
implementation-ref: "local main (ExecutionSession type, SessionOrchestrator)"
tags: ["session", "execution", "workspace", "reconciliation"]
---

# Engineering Session

## Purpose

Define the engineering session as the unit of AI-driven work in the workspace:
a goal bound to a workflow, executed by agents, and recorded with its timeline,
approvals, and metrics.

## Current state

Implemented in `@vestara/workspace` (`types.ts`, `session-orchestrator`,
`agent-storage`). An execution session is created from a goal + workflow and
progresses `queued → running → completed | failed | cancelled`.

## Lifecycle

```text
queued → running → completed
            │        └→ failed
            └→ cancelled
```

## Contract (implemented)

```ts
interface ExecutionSession {
  id: string;
  goal: string;
  workflowId?: string;
  assignedAgentIds: string[];
  planIds: string[];
  changeSetIds: string[];
  verificationIds: string[];
  logs: string[];
  timeline: Array<{ step: string; agentId: string; status: string; timestamp: string }>;
  approvals: Array<{ agentId: string; approved: boolean; reason?: string; timestamp: string }>;
  metrics: { duration: number; totalSteps: number; completedSteps: number; artifactCount: number };
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}
```

## Relationships

- Session → plan (`planIds`)
- Session → agent (`timeline[].agentId`, `assignedAgentIds`)
- Session → artifact (`changeSetIds`, `verificationIds`)
- Session → approval (`approvals`)
- Graph: `session://<id>` nodes with `references` / `executes` edges

## Events

Session state changes are emitted through the event bus and telemetry, and are
projected into the Engineering Event Store as `session://` entities and
`executes` relationships.

## Persistence

Sessions persist in the workspace SQLite store (session-only scope). The
Engineering Event Store keeps a session-only event projection.

## Security

Agents reach the filesystem only through `AgentCapabilityManager`; approvals
gate high-risk operations.

## Verification

Execution sessions are linked to verification reports and change sets; the
Execution Center surfaces them in the unified queue and replay.

## Implementation status

Implemented and verified (queue, timeline, replay, approvals, metrics).

## Future direction

- Correlation envelope (command/session/causation ids).
- Historical replay over real event state.

## Related ADRs

- `adr/ADR-101-conversation-architecture.md`
- `adr/ADR-105-event-sourced-engineering-graph.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/workspace/src/types.ts`,
  `packages/workspace/src/session-orchestrator.ts`,
  `packages/workspace/src/agent-storage.ts`,
  `apps/api/src/routes/sessions.ts`, `apps/api/src/routes/execution.ts`
