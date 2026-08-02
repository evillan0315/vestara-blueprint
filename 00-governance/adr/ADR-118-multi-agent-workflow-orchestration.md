---
id: "adr-118"
adr: "ADR-118"
title: "Multi-Agent Workflow Orchestration"
category: "implementation"
version: 1.0
date: "2026-08-02"
status: "proposed"
author: "@chief-architect"
deciders: ["@chief-architect", "@engineering-manager", "@product-manager"]
consulted: ["@ai-engineer", "@backend-engineer"]
informed: ["@team"]
tags: ["workflow", "orchestration", "agents", "events", "state-machine", "reconciliation"]
depends_on: ["adr-103", "adr-104", "adr-111", "adr-116", "adr-117"]
referenced_by:
  - type: "blueprint"
    target: "05-ai-core/agent-runtime.md"
  - type: "blueprint"
    target: "20-roadmaps/multi-agent-workflow.md"
  - type: "blueprint"
    target: "14-engineering/multi-agent-workflow.md"
---

## Context

The implementation's `AgentWorkflowService` hard-coded a single sequential `feature`
workflow (architect → developer → verifier). Project management demands multiple
plans, task dependencies, parallel execution, approvals, revisions, retries,
resumability, and complete audit history — none of which the prototype supports.

## Decision

Introduce a `WorkflowOrchestrator` as the single writer of workflow state, driven by
an event model and persisted state machines:

- **Orchestrator owns state**: project/plan/task state machines; agents are pluggable
  specialists producing/consuming artifacts.
- **Event-driven**: agents communicate via `@vestara/events` with correlation IDs; the
  workflow is replayable from the event log.
- **Task graph**: the planner emits a DAG; the orchestrator dispatches parallel waves
  with file-lock coordination.
- **Failure handling**: bounded retries and bounded revision loops; human escalation
  through the Approval Gateway as the final path.
- **Resumability**: persisted execution checkpoints and task state; re-entry is
  idempotent.
- **Capability-based assignment**: tasks declare required capabilities; the resolver
  matches agents — replacing keyword regex matching.

The full design is specified in `vestara-ai-core/docs/PCS-025-multi-agent-project-management.md`;
the canonical architecture is `docs/Architecture/Agent-Orchestration.md`. This ADR
records the decision and rationale.

## Alternatives Considered

- **Extend `AgentWorkflowService` in place**: rejected — a hard-coded step list cannot
  express dependencies, parallelism, or retries.
- **Direct agent-to-agent calls**: rejected — couples specialists, breaks
  replayability and audit.
- **Stateless dispatch (fire-and-forget)**: rejected — no resumability or partial
  completion semantics.

## Trade-offs

- The orchestrator is a coordination bottleneck by design; mitigated by horizontal
  worker scaling (agents execute outside the orchestrator).
- Event-sourced replay requires disciplined, idempotent agent steps.

## Consequences

- New agent roles register via agent definition + capability declarations without
  orchestrator changes.
- Remote workers can implement the existing `remote` worker-type contract.
- Status is **proposed**: implementation is staged per the PCS-025 roadmap (Phase 1
  orchestration core → Phase 2 review/test/approval → Phase 3 distributed).
- Implementation ADR: `vestara-ai-core/docs/ADR/ADR-004-multi-agent-workflow.md`.

---

- Supersedes: the `AgentWorkflowService` single-workflow prototype
- Dependencies: ADR-103, ADR-104, ADR-111, ADR-116, ADR-117
