---
id: "ai-core-engineering-orchestration"
title: "Engineering Orchestration"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
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
implementation-ref: "local main (workspace, kernel, agent-runtime, sessions)"
tags: ["orchestration", "workflow", "agents", "reconciliation"]
---

# Engineering Orchestration

## Purpose

Identify the engineering orchestration boundary in the implemented architecture
and document how intent, planning, assignment, execution, verification, and
completion are coordinated.

## Context

The Blueprint must not invent an `EngineeringOrchestrator` if the responsibility
already exists cleanly. Inspection of `vestara-ai-core` shows orchestration is
split across a workflow coordinator and the runtime hosts, with an identified
gap where coordination is implicit.

## Current state

Implemented and verified orchestration boundaries:

```text
WorkspaceRuntime        Compose + host workspace subsystems (open()/close())
SessionOrchestrator     Coordinate execution sessions (goal → workflow → run)
AgentRuntime            Run agents + record executions
Provider layer          Execute provider-specific reasoning
VerificationRuntime     Evaluate claims and evidence
EngineeringEventStore   Historical truth
EngineeringGraph        Structural + temporal projection
```

The `SessionOrchestrator` (workspace `sessions`) is the closest existing
implementation of an engineering workflow coordinator: it accepts a goal and a
workflow, assigns agents, and records execution sessions with timelines,
approvals, and metrics.

## Responsibilities

- **WorkspaceRuntime** — workspace identity, fingerprint, understanding,
  indexing.
- **Workflow coordinator (SessionOrchestrator)** — intent → workflow → agent
  assignment → execution session.
- **PlanningService** — plan + task graph generation from intent.
- **ImplementationService** — change-set generation (capability-governed).
- **VerificationService** — verification runs against change sets.
- **AgentRuntime** — per-agent task execution.

## Boundaries

- The workflow coordinator does not perform provider reasoning.
- Providers never own intent, permissions, evidence, or history.
- The Engineering Event Store owns history; the graph owns the projection.

## Identified architecture gap

Coordination across plan → task → execution → verification is **partially
implicit**: plan tasks, agent executions, and execution sessions are recorded
separately and linked opportunistically (e.g., execution sessions reference
plan ids) rather than through a single coordination envelope. This is an
identified architecture gap; a future ADR should define the workflow
coordination contract (correlation across intent, command, execution,
verification) rather than silently inventing a new runtime.

## Events

Orchestration is observable through telemetry (`agent.*`, `workspace.*`,
`verification.*`, `plan.*`) and the Engineering Event Store (execution sessions,
agent executions, change sets, verifications).

## Security

Agent actions are governed by `AgentCapabilityManager` capability declarations
and approval gates.

## Evidence and verification

Execution sessions record timelines, approvals, and metrics; verification
reports record checks and evidence. Visual verification adds screenshot
evidence (see `14-engineering/visual-verification.md`).

## Failure behavior

- Provider timeouts degrade to error states with events.
- Verification failures and retries are recorded.
- Capability denials are surfaced.

## Implementation status

Implemented and verified for single-provider orchestration. Multi-provider /
cross-provider verification is proposed (see `provider-architecture.md`).

## Future direction

- Full correlation envelope across intent/command/execution/verification.
- Provider-independent orchestration and cross-provider verification.
- Engineering workflow coordination contract (ADR).

## Related ADRs

- `adr/ADR-100-ai-organization.md`
- `adr/ADR-104-evidence-based-verification.md`
- `adr/ADR-105-event-sourced-engineering-graph.md`
- `adr/ADR-106-provider-neutral-engineering-provider-runtime.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/workspace/src/session-*`, `packages/workspace/src/agent-*`,
  `packages/workspace/src/execution-*`, `packages/kernel/src`
