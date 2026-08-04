---
title: "Artifact-Centered Agent Continuity"
volume: "14-engineering"
book: "Book 4: Engineering"
version: "1.0.0"
status: "proposed"
owner: "@engineering-manager"
last-reviewed: "2026-08-04"
next-review: "2027-02-04"
tags: ["ai-agents", "artifacts", "continuity", "workflow", "model-independence", "verification", "knowledge"]
---

# Artifact-Centered Agent Continuity

## The engineering artifact is the unit of collaboration

> **The unit of collaboration in Vestara is not the conversation. It is the engineering artifact.**

Vestara must not depend on the model, provider, conversation, or agent that began a project. A qualified agent must be able to continue the work by loading governed artifacts, current repository state, applicable decisions, and verification evidence.

Conversation is useful for exploration and coordination. It is not the durable source of engineering continuity.

---

## 1. Core Decision

Vestara stores continuity in durable, reviewable engineering artifacts rather than in one model's private context.

```text
Conversation
    ↓
Candidate understanding
    ↓
Engineering artifact
    ↓
Validation and review
    ↓
Promoted artifact
    ↓
Input to the next engineering stage
```

A model may disappear, be replaced, lose its context, become unavailable, or cease to satisfy the task. The project must continue without reconstructing the original conversation.

The authority belongs to Vestara's governed state:

- approved specifications;
- architectural decisions;
- plans and task contracts;
- repository state;
- engineering graph context;
- event history;
- evidence bundles;
- verification results;
- versioned knowledge.

---

## 2. Model Independence

The model is an executor assigned to a stage. It is not the owner of project memory or truth.

```text
Stage Contract
+ Approved Inputs
+ Repository Understanding
+ Expected Output
+ Verification Gates
+ Evidence Requirements
        ↓
Qualified Model or Minion
        ↓
Candidate Artifact
```

The same workflow may use different models for different stages:

```text
Product intent
    ↓
UX specification          — UX Architect model
    ↓
Visual specification      — Visual Designer model
    ↓
Component architecture    — Frontend Architect model
    ↓
State architecture        — State Architect model
    ↓
Implementation plan       — Engineering Planner model
    ↓
Implementation            — Developer model
    ↓
Review                    — Reviewer model
    ↓
Behavioral verification   — Verifier model
```

No stage should depend on hidden assumptions from the previous model. Required context must be expressed through approved artifacts and explicit contracts.

---

## 3. Engineering Artifact Contract

Every stage must declare:

- **role** — the engineering responsibility assigned to the executor;
- **approved inputs** — artifacts and state the stage is allowed to consume;
- **preserved decisions** — decisions the stage must not redesign;
- **expected output** — the artifact or implementation result to produce;
- **scope boundaries** — responsibilities the stage must not assume;
- **validation gates** — structural, architectural, behavioral, and security checks;
- **evidence requirements** — proof required before promotion;
- **promotion state** — proposed, reviewed, approved, verified, or released.

Example:

```yaml
stage: component-architecture
role: frontend-architect
inputs:
  - docs/TUI-UX-SPECIFICATION.md
  - docs/TUI-VISUAL-SPECIFICATION.md
preserve:
  - approved-user-journeys
  - vestara-design-system
  - tui-renderer-boundary
output:
  path: docs/TUI-COMPONENT-ARCHITECTURE.md
  status: proposed
gates:
  - docs-validation
  - architecture-review
  - dependency-boundary-review
```

The executor may improve the assigned artifact. It may not silently reopen decisions owned by earlier stages.

---

## 4. Artifact Promotion

A generated output is not automatically trusted.

```text
Generated
    ↓
Structurally valid
    ↓
Reviewed
    ↓
Verified
    ↓
Approved
    ↓
Trusted input
    ↓
Released
```

A downstream agent should consume the required promotion state, not merely the latest file or the most confident statement.

Promotion must be supported by relevant evidence. Confidence without evidence does not promote an artifact.

---

## 5. Agent-Domain CI/CD

Vestara applies CI/CD principles to intelligence and agent work, not only to DevOps deployment.

### Continuous Intelligence

New observations, evidence, decisions, and lessons are continuously reconciled into shared engineering understanding.

```text
New observation
    ↓
Normalize into evidence
    ↓
Compare with current understanding
    ↓
Update affected artifacts and graph relationships
    ↓
Trigger review or verification where required
```

### Continuous Delegation

Stages are assigned to the best qualified available executor based on:

- role capability;
- measured task performance;
- context capacity;
- local or cloud policy;
- privacy requirements;
- availability and health;
- cost and latency policy.

### Continuous Verification

Every promoted artifact is checked independently against its contract and observable evidence.

### Continuous Delivery

Verified artifacts may progress into implementation, packages, Marketplace releases, deployments, or workspace changes through governed release gates.

The complete lifecycle is:

```text
Intent
→ Context
→ Specification
→ Architecture
→ Plan
→ Implementation
→ Review
→ Verification
→ Evidence
→ Release
→ Learning
```

---

## 6. Conversation Versus Engineering Continuity

Conversation continuity means resuming the same discussion.

Engineering continuity means any qualified executor can continue the work correctly.

| Conversation continuity | Engineering continuity |
|---|---|
| Depends on chat history | Depends on governed artifacts |
| Often model-specific | Model- and provider-independent |
| Context-window bounded | Repository- and evidence-backed |
| Difficult to audit | Versioned and attributable |
| Easy to lose | Recoverable and replayable |
| Carries informal assumptions | Requires explicit contracts |

Vestara should preserve useful conversation context, but no architectural decision should exist only in conversation.

---

## 7. Git-Like Intelligence

Vestara agents should treat meaningful changes in understanding similarly to Git changes in source code.

The system should be able to answer:

- What changed in the agent's understanding?
- Which observations caused the change?
- Which evidence supports it?
- Which agent or model authored it?
- Which decision consumed it?
- Was it verified, rejected, superseded, or reverted?

Conceptual operations include:

```text
understanding log
understanding diff
understanding branch
understanding merge
understanding blame
understanding revert
understanding replay
```

Not every token or raw event becomes a knowledge commit. Vestara separates layers:

```text
Raw events
    ↓
Normalized observations
    ↓
Understanding changes
    ↓
Accepted decisions
    ↓
Institutional knowledge
```

Only meaningful changes in interpretation, decision, or reusable knowledge are promoted.

---

## 8. Handoff Rules

Before ending a stage, the current executor must leave enough durable state for another executor to continue without asking it to reconstruct hidden reasoning.

A valid handoff includes:

- artifact path and version;
- status and promotion state;
- inputs consumed;
- decisions preserved;
- assumptions still unresolved;
- evidence references;
- validation performed;
- known risks;
- recommended next stage.

A handoff must not rely on phrases such as "as discussed earlier" without a durable reference.

---

## 9. Failure and Replacement

When an executor becomes unavailable:

```text
Stage remains pending
    ↓
Vestara reloads the stage contract
    ↓
Approved artifacts and repository state are assembled
    ↓
Another qualified executor is selected
    ↓
Work continues from the last promoted state
```

Partial candidate output may be retained as evidence but must not become authoritative until its gates pass.

The system should prefer resuming from durable stage state over replaying an entire conversation.

---

## 10. Governance Rules

1. No model owns project truth.
2. No conversation is the sole storage location for a decision.
3. Every stage consumes declared inputs and produces a declared output.
4. Earlier approved decisions remain protected unless a governed change reopens them.
5. Generated output is candidate state until promoted.
6. Downstream agents trust artifact status and evidence, not model confidence.
7. Every significant handoff must be reproducible from durable state.
8. Model substitution must not invalidate engineering continuity.
9. New observations should improve the next decision; they should not invalidate active work without sufficient reason.
10. Reusable lessons must be promoted into the Engineering Knowledge System rather than left in task-local conversation.

---

## 11. Success Criteria

Artifact-centered continuity is working when:

- a different model can continue the next stage without the original conversation;
- the replacement model preserves approved decisions;
- every stage output is attributable and versioned;
- downstream agents can identify why an artifact is trusted;
- failed or unavailable agents do not restart the project;
- rejected alternatives remain inspectable;
- verification evidence travels with promoted artifacts;
- project continuity survives provider and model replacement;
- reusable knowledge is not repeatedly rediscovered;
- the human does not have to manually transfer context between agents.

---

## 12. Foundational Principle

> **Vestara's continuity belongs to its artifacts, evidence, and governed understanding—not to any individual model or conversation.**

Models may change. Providers may change. Agents may change. The engineering work remains coherent because every meaningful decision is made durable, reviewable, and transferable.

---

**END OF ARTIFACT-CENTERED AGENT CONTINUITY**
