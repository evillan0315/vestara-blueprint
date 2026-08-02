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
- Telemetry
- Engineering Graph + Temporal Event Store (session-only)
- Verification pipeline + evidence
- Visual screenshot verification (subset verified)
- Workspace UI modules (Docs, Diagnostics, Execution, Graph + Universal
  Inspector)
- Provider-neutral routing domain, versioned assignments, shared API/CLI/UI
  controls, and Ink Console

## Next milestones

### Phase 1 — Complete the Agent Harness

1. Durable task/thread/turn/item schemas and event persistence.
2. Agent Harness coordinator over current agent, provider, context, capability,
   and verification services.
3. Unified Tool Runtime envelope and adapters for existing tools.
4. Policy/approval evaluation for every proposed tool call.
5. Structured observations, cancellation, steering, and resume.

### Phase 2 — Make results trustworthy

1. Repeated verification and repair loop.
2. Structured evidence artifacts.
3. Browser/computer-use tool providers and human-visible demonstration.
4. Full visual evidence suite.

### Phase 3 — Enable parallel engineering

1. Worktree leases and environment isolation.
2. Dependency-aware task assignment and supervisor orchestration.
3. Conflict detection, merge preparation, and integration verification.

### Phase 4 — Enable long-running work

1. Context compaction and durable resume.
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

## Related

- `04-platform/engineering-operating-system.md`
- `04-platform/agent-harness-architecture.md`
- `99-appendix/capability-maturity-matrix.md`
