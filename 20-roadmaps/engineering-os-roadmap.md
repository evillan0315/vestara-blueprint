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
- Engineering evidence pipeline (PCS-026) — collectors → content-addressed
  artifacts → immutable manifest → `VerificationEvidenceBundle` (checks,
  provenance, replay descriptor, derived six-factor confidence); visual
  comparison + human-reviewed baselines; Workspace Evidence viewer; harness
  verification persists a bundle per run.
- Distributed worker cluster (PCS-027) — `TaskDispatcher` over a WebSocket
  transport; node registration/heartbeats, capability + least-load scheduling,
  lease + executionId idempotency; orchestrator dispatches through the cluster
  when nodes are online (fallback to the harness); Workspace Workers view.
- Workspace UI surfaces the lifecycle from the one canonical projection:
  Dashboard "Live Engineering Workflow", Sessions harness ExecutionSessions,
  Agent Control workflow rails, Artifacts "Live Change Projection",
  Documentation "System Milestones".
- Multi-agent workflow orchestration core (ADR-118, Phase 1): `WorkflowOrchestrator`
  + project/plan/task state machines, task/artifact/file-lock stores, bounded
  retry/revision policy, task-graph waves, checkpoint/resume in
  `packages/workflow-orchestrator/`; tasks execute through the harness
  (`HarnessTaskDispatcher`), `orchestration.*` events project into the temporal
  event store, and `/api/orchestration/*` exposes the lifecycle.
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
2. Structured evidence artifacts — delivered (PCS-026): the `EvidencePipeline`
   collects (command/test/filesystem/source-diff) → content-addresses →
   writes an immutable manifest → assembles a `VerificationEvidenceBundle`
   (checks, provenance, replay descriptor, derived six-factor confidence);
   visual comparison + human-reviewed baselines; Workspace Evidence viewer.
3. Browser/computer-use tool providers and human-visible demonstration —
   partial: `PlaywrightScreenshotSource` (PCS-026 slice 2) provisioned via
   `VESTARA_SCREENSHOT_URL`; computer-use tool providers remain.
4. Full visual evidence suite — partial (visual comparison + baselines +
   screenshot collector delivered; baseline review + full matrix pending).

### Phase 3 — Enable parallel engineering

1. Worktree leases and environment isolation — `packages/worktree-runtime/`
   (lease store, recovery).
2. Dependency-aware task assignment and supervisor orchestration — delivered
   via the multi-agent `WorkflowOrchestrator` (ADR-118): task-graph DAG waves,
   bounded retry/revision, review/test stages, Approval Gateway, parallel
   waves, capability-based assignment (PCS-025 Phases 1-3).
3. Conflict detection, merge preparation, and integration verification —
   partial: `FileLockRegistry` + bounded lock-wait prevents concurrent writers;
   apply-time `originalContent` conflict detection and merge prep remain.
4. Agent swimlanes in the workflow projection (multi-agent runs) — partial:
   `projectWorkflowAcrossThreads` aggregates per-agent harness threads into one
   projection with lanes; stage attribution is wired and settling.
5. Distributed worker cluster — delivered (PCS-027 slices 1-2): the
   `TaskDispatcher` worker boundary made physical over a WebSocket transport
   (`/ws/worker`); node registration + heartbeats, capability + least-load
   scheduling, leases with executionId idempotency, and the orchestrator
   dispatching through the cluster when nodes are online (fallback to the
   harness). Multi-node hardening and gRPC/K8s transports remain.

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
are shipped (ADR-122, ADR-123). The multi-agent workflow orchestration core is
implemented (ADR-118, Phase 1 partial). Remaining: agent swimlanes end-to-end
for orchestrated projects (the `projectWorkflowAcrossThreads` aggregation is
wired but stage attribution is still settling), the premium Workspace diagram
consuming the canonical projection, and temporal replay controls.

## Related

- `04-platform/engineering-operating-system.md`
- `04-platform/agent-harness-architecture.md`
- `99-appendix/capability-maturity-matrix.md`
