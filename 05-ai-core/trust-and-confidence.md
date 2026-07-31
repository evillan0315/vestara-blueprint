---
id: "ai-core-trust-and-confidence"
title: "Trust and Confidence"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
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
implementation-ref: "local main"
tags: ["trust", "confidence", "permission", "reconciliation"]
---

# Trust and Confidence

## Purpose

Reconcile the Constitution's principle — *"Trust is earned, never assumed"* —
with the implemented event, verification, evidence, and history architecture.

## Conceptual distinction

```text
Permission   Whether a participant may act.
Trust        How much authority may be granted based on history.
Confidence   How strongly the current evidence supports a specific claim,
             artifact, or state.
```

## Current state

- **Permission**: implemented as capability declarations + approval gates
  (`AgentCapabilityManager`). A participant may act only when the policy permits.
- **Trust**: a persistent, history-derived trust score is **not implemented**.
  Trust accumulation is proposed architecture.
- **Confidence**: per-verification confidence is **not implemented** as a stored
  model. Verification produces pass/fail checks and evidence; a
  historical-confidence engine is **proposed**.

Do not claim that a historical confidence engine exists. It remains future
architecture derived from:

- Historical verification outcomes
- Evidence validity
- State changes
- Repeated success
- Failures
- Contradictory outcomes
- Evidence invalidation
- Provider independence
- Agent performance

## Relationship to the Engineering Event Store

The event log is the substrate a future trust/confidence engine would consume:
verification outcomes, evidence validity, and state changes are already
recorded as events. A confidence projection over history is a natural extension
of `stateAt(time)` / `diff(from, to)`.

## Boundaries

- Confidence applies to claims, artifacts, and states — not to agents as a
  monolithic score (unless separately defined).
- Trust governs authority grants (e.g., capability access, approval
  requirements) based on accumulated history.
- Neither replaces the permission model; they layer on top of it.

## Implementation status

| Element | Status |
|---------|--------|
| Permission (capability + approval) | implemented and verified |
| Verification evidence | implemented and verified |
| Historical event log | implemented and verified (session-only) |
| Trust score | proposed |
| Confidence projection | proposed |
| Weak-link insights (e.g., low-confidence documentation) | proposed |

## Future direction

A confidence engine that consumes the Engineering Event Store and verification
evidence to surface weak links and guide human review.

## Related ADRs

- `adr/ADR-104-evidence-based-verification.md`
- `adr/ADR-105-event-sourced-engineering-graph.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/engineering-graph/src/events.ts`,
  `packages/workspace/src/agent-capability-manager.ts`,
  `packages/verification/src`
