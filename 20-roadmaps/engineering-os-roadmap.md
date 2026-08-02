---
id: "roadmap-engineering-os"
title: "Engineering OS Roadmap"
volume: "20-roadmaps"
book: "Book 6: Future Technologies"
version: "1.2.0"
status: "review"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main"
tags: ["roadmap", "engineering-os", "reconciliation"]
---

# Engineering OS Roadmap

## Purpose

Lay out the next milestones for the engineering operating system, based on the
implemented runtime and the identified architecture gaps.

## Implemented today

- WorkspaceRuntime + kernel lifecycle
- AgentRuntime + capability-governed execution
- Durable agent execution via `AgentHarnessRuntime` — the single execution
  path (multi-tool deterministic ordering, approval suspension with restart-
  safe pending-call queue, idempotent approval resolution, durable
  `pendingApprovals`, cancellation/steering/resume). The legacy capability
  orchestrator loop is removed (ADR-120).
- Provider context compaction preserving instruction, steering, tool-call IDs,
  changed files, failed attempts, verification, and approvals.
- Engineering event projection — `harness.*` bridge and `change.*`
  filesystem/diff projection derived from actual filesystem + Git state
  (ADR-121).
- Real-time workflow lifecycle — canonical eight-stage projection, incremental
  push protocol with monotonic sequences, hybrid stage derivation, a live TUI
  workflow view, and eight-stage owning-agent attribution with human names
  (ADR-122, ADR-123).
- Workspace UI surfaces the lifecycle from the one canonical projection:
  Dashboard "Live Engineering Workflow", Sessions harness ExecutionSessions,
  Agent Control workflow rails, Artifacts "Live Change Projection",
  Documentation "System Milestones".
- Telemetry
- Engineering Graph + Temporal Event Store (session-only)
- Verification pipeline + evidence
- Visual screenshot verification (subset verified)
- Workspace UI modules (Docs, Diagnostics, Execution, Graph + Universal
  Inspector, Workforce, harness thread timelines)
- Provider-neutral routing domain, versioned assignments, shared API/CLI/UI
  controls, and Ink Console

## Next milestones

### Phase 1 — Complete the Agent Harness ✅

Durable task/thread/turn/item schemas and event persistence, the Agent Harness
coordinator (model→tool→approval→verification), the unified Tool Runtime
envelope, policy/approval evaluation, structured observations, cancellation,
steering, resume, multi-tool deterministic ordering, restart-safe pending-call
queues, and provider context compaction are all delivered and are the default
execution path (ADR-120).

### Phase 2 — Make results trustworthy

1. Repeated verification and repair loop.
2. Structured evidence artifacts.
3. Browser/computer-use tool providers and human-visible demonstration.
4. Full visual evidence suite.

### Phase 3 — Enable parallel engineering

1. Worktree leases and environment isolation.
2. Dependency-aware task assignment and supervisor orchestration.
3. Conflict detection, merge preparation, and integration verification.
4. Agent swimlanes in the workflow projection (multi-agent runs).

### Phase 4 — Enable long-running work

1. Context compaction and durable resume — delivered (ADR-120); full
   long-horizon verification remains.
2. Cloud/remote environments and cross-device steering.
3. Automation that creates ordinary task threads.
4. Durable engineering memory derived from completed threads.

### Phase 5 — Improve from outcomes

1. Failure-pattern extraction and reusable skills.
2. Repository-specific instruction refinement.
3. Verification-policy refinement, trust, and agent evaluation.
4. Provider platform extensions and cross-provider verification.
5. Extension platform and Marketplace — local foundation and Workspace
   experience shipped (ADR-115); remote distribution and publishing remain.

### Phase 6 — Real-Time Workflow Lifecycle (in progress)

Canonical workflow projection, incremental push protocol, hybrid stage
derivation, eight-stage owning-agent attribution, and the TUI lifecycle rail
are shipped (ADR-122, ADR-123). Remaining: agent swimlanes (ADR-118), the
premium Workspace diagram consuming the canonical projection, and temporal
replay controls.

## Related

- `04-platform/engineering-operating-system.md`
- `04-platform/agent-harness-architecture.md`
- `99-appendix/capability-maturity-matrix.md`
