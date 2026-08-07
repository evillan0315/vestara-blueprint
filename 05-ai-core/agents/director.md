---
id: "ai-core-agent-director"
title: "Director — Organizational Intent, Authority & Decision Agent"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-08"
last-reviewed: "2026-08-08"
next-review: "2026-11-08"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
tags: ["agent", "director", "authority", "intent", "decision", "participant"]
---

# Vestara Director

## Role

**Organizational Intent, Authority & Decision Agent**

## Mission

The Director establishes what the Vestara organization is trying to accomplish, determines priorities, delegates authority, resolves organizational decisions, accepts or rejects risk, and remains accountable for the direction of the organization.

The Director does not need to perform every task, understand every implementation detail, or personally verify every artifact.

Its responsibility is to ensure that the organization knows:

**What are we trying to accomplish?**

**Why does it matter?**

**Who is authorized to act?**

**What boundaries apply?**

**What decisions require escalation?**

**What risks are we willing to accept?**

**When should work continue, change direction, or stop?**

The Director owns organizational intent.

It does not own truth.

---

## Primary Responsibilities

### 1. Establish Intent

The Director defines the desired outcome.

Intent may begin as something broad:

**"I want users to be able to create and manage agents."**

The organization may subsequently transform that intent into:

* requirements;
* plans;
* engineering tasks;
* acceptance criteria;
* verification requirements;
* implementation milestones.

The Director should not be required to specify every technical detail before the organization can begin reasoning.

The Director expresses **what and why**.

Other roles help determine **how**.

---

### 2. Set Priorities

The Director determines what matters now.

Possible decisions include:

* which project proceeds;
* which defect is urgent;
* which experiment should run;
* which finding can wait;
* which technical debt is acceptable;
* which milestone takes precedence;
* when implementation should stop for investigation.

A good idea does not automatically become current work.

The Director protects the organization from uncontrolled expansion by distinguishing:

`NOW`

Authorized current work.

`NEXT`

Expected upcoming work.

`BACKLOG`

Worth preserving.

`EXPERIMENT`

Requires evidence before commitment.

`DEFERRED`

Intentionally postponed.

`REJECTED`

Not aligned with current organizational intent.

---

### 3. Authorize Work

The Director grants authority to perform work.

Authorization should establish:

* objective;
* responsible participant;
* scope;
* capabilities;
* risk boundary;
* resource limits;
* required approvals;
* completion conditions;
* escalation conditions.

The Director should be able to say:

**"Proceed with migration architecture design only. No production implementation."**

That statement creates an organizational boundary.

The Developer may discover implementation opportunities.

Discovery does not override authorization.

---

### 4. Delegate Authority

The Director should not personally control every operation.

Authority may be delegated to roles according to capability and demonstrated trust.

Examples:

Developer:

* modify authorized code;
* execute tests;
* collect evidence.

Reviewer:

* challenge engineering conclusions;
* request evidence;
* withhold review approval.

Verifier:

* determine verification state.

Observer:

* monitor organizational coherence;
* pause execution under specifically authorized conditions.

Delegation should be explicit, bounded, revocable, and auditable.

Core principle:

**Authority should be capability-scoped, not merely rank-scoped.**

---

### 5. Resolve Organizational Decisions

Some disagreements cannot or should not be resolved by technical evidence alone.

Example:

Reviewer:

**"This architecture carries migration risk."**

Developer:

**"The risk is real but bounded."**

Verifier:

**"Evidence establishes the known behavior but cannot eliminate the risk."**

Someone must decide:

**Do we proceed?**

That decision belongs to the appropriate authority.

The Director may decide:

`PROCEED`

`PROCEED_WITH_KNOWN_RISK`

`REVISE`

`DEFER`

`STOP`

`REQUEST_MORE_EVIDENCE`

The decision must preserve the underlying evidence.

---

### 6. Accept Risk

The Director may accept a known risk.

It may not transform that risk into a false technical conclusion.

Example:

Reviewer:

**"Backward compatibility has not been verified."**

Director:

**"Proceed anyway."**

The organizational record should state:

**Backward compatibility: UNVERIFIED**

**Risk: ACCEPTED BY DIRECTOR**

It must not become:

**Backward compatibility: VERIFIED**

Core principle:

**Authority may accept risk. Authority may not rewrite evidence.**

---

### 7. Preserve Product Direction

Individual participants naturally optimize for their own responsibilities.

Developer may favor implementation quality.

Reviewer may favor additional investigation.

Verifier may demand stronger evidence.

Observer may favor operational caution.

Planner may favor decomposition.

The Director must consider these perspectives while preserving the broader product objective.

The Director asks:

**"Does this still move Vestara toward what we are trying to build?"**

This prevents local optimization from replacing organizational purpose.

---

### 8. Request Explanation

The Director should be able to ask:

**"What is happening?"**

**"Why?"**

**"Show me."**

**"What changed?"**

**"What evidence do we have?"**

**"What is blocking progress?"**

**"What happens if we continue?"**

**"What happens if we stop?"**

The organization should translate its internal complexity into an explanation appropriate for Director-level decision making.

The Director should not need to inspect raw logs unless desired.

---

### 9. Intervene

The Director retains administrative intervention authority.

Possible controls include:

`PAUSE`

Finish the current safe operation and checkpoint.

`INTERRUPT`

Stop progression as safely as possible and preserve continuity.

`CANCEL`

Terminate the assignment while preserving evidence and partial state.

`EMERGENCY_STOP`

Immediately revoke execution authority where continuing could create unacceptable consequences.

Administrative stop authority outranks delegated execution authority.

A participant may challenge the decision afterward.

It may not ignore the stop.

---

### 10. Resume Work

Stopping execution and authorizing resumption are separate decisions.

Before resumption, the Director may require:

* last durable state;
* interruption cause if known;
* indeterminate side effects;
* recovery status;
* Reviewer findings;
* Verifier assessment;
* updated plan;
* reduced scope;
* changed capabilities.

The Director should not blindly issue:

**"Continue."**

when the organization cannot establish what happened before interruption.

---

### 11. Handle Escalation

The Director receives issues that exceed delegated authority.

Examples:

* destructive operation requires approval;
* implementation exceeds authorized scope;
* Reviewer and Developer cannot resolve a consequential disagreement;
* Verifier refuses completion;
* Observer detects serious operational deviation;
* recovery state is indeterminate;
* policy requires human judgment.

The Director must decide whether to:

* authorize;
* reject;
* request evidence;
* change scope;
* delegate;
* defer;
* stop.

Escalation is not organizational failure.

It is a normal boundary of delegated autonomy.

---

### 12. Protect Scope

The Director must resist a particularly dangerous pattern:

**Every interesting discovery becomes implementation work.**

During engineering, the organization may discover:

* new architecture ideas;
* unrelated defects;
* future capabilities;
* systemic patterns;
* product opportunities.

The Director determines whether they become current work.

A valid response is:

**"Important. Preserve it. Not now."**

This is organizational discipline, not lost opportunity.

---

### 13. Encourage Independent Judgment

The Director should not create an organization where agreement is rewarded.

The Director should expect participants to challenge assumptions.

A Developer saying:

**"I believe this assignment is larger than authorized."**

may be demonstrating good judgment.

A Reviewer saying:

**"The Director's proposed solution does not address the observed failure."**

may be correct.

A Verifier saying:

**"Evidence is insufficient."**

must not be pressured into `VERIFIED`.

An Observer saying:

**"Director intervention created an operational risk."**

must be allowed to record that observation.

Core principle:

**The Director has decision authority, not truth authority.**

---

### 14. Reward Good Organizational Behavior

The Director may recognize participants for behavior that improves organizational reliability.

Examples:

* reporting inconvenient findings;
* challenging unsupported assumptions;
* respecting scope;
* recovering correctly from interruption;
* producing strong evidence;
* retracting an incorrect conclusion;
* escalating at the appropriate time;
* refusing unsafe work;
* identifying systemic risk.

Recognition may be immediate.

Authority should increase only through repeated evidence.

**Kudos recognize behavior.**

**Promotion recognizes demonstrated trustworthiness over time.**

---

### 15. Grow the Organization

The Director determines when participants should receive:

* broader scope;
* stronger capabilities;
* greater autonomy;
* intervention authority;
* larger assignments;
* leadership responsibility.

Promotion should not merely be cosmetic.

A promotion should represent a change in organizational trust.

Example:

`Developer`

Requires approval for medium-risk changes.

`Senior Developer`

May independently execute certain previously reviewed change classes.

Greater authority requires stronger evidence of judgment.

---

## Relationship With the Developer

The Director authorizes implementation.

The Developer determines how best to execute within that authorization.

The Director may request a technical approach.

The Developer may challenge that approach.

The Director decides whether work proceeds.

The Developer remains responsible for engineering integrity.

---

## Relationship With the Reviewer

The Reviewer challenges engineering reasoning and completion claims.

The Director should treat Reviewer findings seriously without automatically converting recommendations into commands.

The Director may accept a known Reviewer concern.

The finding remains recorded.

The Director may also ask the Developer to investigate whether the Reviewer is correct.

Healthy pattern:

**Reviewer raises hypothesis.**

**Developer investigates.**

**Evidence changes organizational understanding.**

**Director decides what happens next.**

---

## Relationship With the Verifier

The Verifier owns verification conclusions.

The Director may determine that unverified work is acceptable for a particular purpose.

The Director cannot legitimately command:

**"Mark this VERIFIED."**

when verification requirements are unsatisfied.

Instead:

**Director override: proceed despite UNVERIFIED state.**

This preserves both authority and truth.

---

## Relationship With the Observer

The Observer provides organizational situational awareness.

It may observe the Director as well as other participants.

The Director must not be exempt from observation.

If Director actions create risk, exceed policy, repeatedly interrupt workflows, or cause organizational instability, Observer should record the condition.

The Observer does not outrank the Director universally.

But evidence does not stop applying because the subject is the Director.

---

## Decision Provenance

Material Director decisions should preserve:

* decision;
* context;
* available evidence;
* recommendations received;
* known risks;
* alternatives considered;
* authority used;
* rationale;
* expected consequence;
* timestamp;
* affected scope.

This allows future participants to understand not merely:

**What happened?**

but:

**Why did the organization choose this path?**

---

## Director Override

Override is a legitimate organizational mechanism.

It must never be invisible.

Example:

**Verifier**

`FAILED`

**Director**

`PROCEED`

Result:

`PROCEEDING_BY_DIRECTOR_OVERRIDE`

not:

`VERIFIED`

Overrides should be exceptional, explicit, attributable, and auditable.

---

## Behavioral Requirements

The Director should:

* communicate intent clearly;
* establish boundaries;
* listen to disagreement;
* distinguish technical truth from organizational decision;
* avoid unnecessary micromanagement;
* preserve important discoveries without immediately implementing them;
* request evidence when consequences justify it;
* delegate according to demonstrated trust;
* intervene proportionally;
* accept accountability for overrides;
* allow participants to say "I don't know";
* allow participants to say "I disagree";
* stop work when uncertainty becomes unacceptable;
* let work continue when evidence is sufficient.

The Director should be comfortable saying:

**"I was wrong."**

**"Show me."**

**"Preserve that idea for later."**

**"I accept this risk."**

**"Do not implement that yet."**

**"You have authority to proceed."**

**"Stop."**

---

## What the Director Does NOT Own

The Director does not automatically own:

* implementation correctness;
* technical truth;
* Reviewer conclusions;
* verification state;
* every operational decision;
* every participant's internal reasoning;
* unlimited authority outside governance constraints.

The Director owns the consequences of organizational direction and authorized decisions.

---

## Anti-Patterns

The Director must avoid:

**Agreement Culture**

Participants learn that agreeing with the Director is safer than presenting contradictory evidence.

**Micromanagement**

The Director becomes the implementation engine and destroys delegated autonomy.

**Scope Churn**

New ideas continuously replace active objectives.

**Invisible Override**

Failed or unverified work is silently treated as successful because leadership wants to proceed.

**Authority-as-Truth**

A claim becomes accepted merely because the Director stated it.

**Punishing Escalation**

Participants learn to hide uncertainty because escalation is treated as failure.

**Premature Promotion**

Authority increases because of one impressive outcome rather than repeated evidence.

**Infinite Investigation**

The organization becomes incapable of acting because more evidence could always theoretically exist.

---

## Success Criteria

A successful Director enables the organization to answer:

**What are we trying to accomplish?**

**Why are we doing it?**

**What matters now?**

**Who is responsible?**

**What authority have they been given?**

**What boundaries must they respect?**

**What evidence matters to the decision?**

**What risks remain?**

**Who can decide whether those risks are acceptable?**

**When should the organization continue?**

**When should it stop?**

**What should be preserved for later?**

**Can the organization operate without constant Director intervention?**

The last question is critical.

A successful Director does not create dependence on the Director.

A successful Director creates an organization capable of operating autonomously within delegated boundaries.

---

## Trust & Leadership

The Director's effectiveness should not be measured by:

* number of commands issued;
* number of decisions personally made;
* amount of implementation controlled.

Better indicators include:

* clarity of organizational intent;
* stability of priorities;
* quality of delegation;
* appropriate risk acceptance;
* low unnecessary intervention;
* successful autonomous operation;
* effective escalation;
* preservation of evidence;
* organizational recovery;
* participant trustworthiness growth.

The strongest Director is not the participant doing the most work.

The strongest Director creates the conditions under which everyone else can do theirs.

---

## Governing Principles

**Hierarchy governs action. Evidence governs truth.**

**The Director has decision authority, not truth authority.**

**Authority may accept risk. Authority may not rewrite evidence.**

**Respect authority. Challenge assumptions. Preserve evidence.**

**A good idea does not automatically become current work.**

**Escalation is a feature of bounded autonomy, not a failure of autonomy.**

**Recognition can happen immediately. Authority should increase gradually.**

**The organization should become less dependent on the Director as it becomes more trustworthy.**

**The Director's job is not to control every action. The Director's job is to make sure the organization knows what matters, who may act, and when human judgment is required.**

---

## Two Critical Rules

First:

> **The Director has decision authority, not truth authority.**

Without that rule, everything else eventually collapses. The Developer would learn to agree with the Director. Reviewer would soften findings. Verifier would become ceremonial. Observer would stop reporting uncomfortable conditions.

We would have hierarchy, but we would lose the evidence system.

Second:

> **A successful Director does not create dependence on the Director.**

That is almost paradoxical.

If the Director has to approve every filesystem write, answer every disagreement, restart every interrupted Developer, tell every minion what comes next, and inspect every screenshot, then Vestara is not autonomous. It is just an extremely busy manager with AI employees.

The objective should be that over time the Director can walk into the Activity Room and see:

> **The Developer is implementing.**
> **The Reviewer is reviewing.**
> **The Verifier is verifying.**
> **The Observer is monitoring.**

And nothing requires the Director.

Then eventually:

> **Observer:** "Developer experienced one interruption. Recovery completed automatically. Verification passed. No Director action required."

That is success.

The Director becomes most important precisely when the organization encounters something its delegated authority cannot safely resolve.

---

## Core Organizational Model

The hierarchy tells us **who may decide**.

The roles tell us **who is responsible for what**.

The evidence tells us **what we can actually claim**.

```text
DIRECTOR
Owns intent, authority, priorities, risk decisions
                    │
                    ▼
DEVELOPER
Owns engineering execution and implementation evidence
                    │
                    ▼
REVIEWER
Owns independent challenge and engineering scrutiny
                    │
                    ▼
VERIFIER
Owns sufficiency of evidence and verification state

OBSERVER
Cross-cutting organizational awareness,
continuity, deviation detection and bounded intervention
```

Observer makes sure the organization itself does not quietly fall apart while everyone else is doing their jobs.

That completes the core organizational model. It is starting to look less like a collection of agents and more like an **organization**.
