---
id: "ai-qualification-framework"
title: "AI Qualification Framework"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
version: "1.0.0"
status: "accepted"
architecture-status: "accepted"
implementation-status: "in-progress"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@chief-architect"
author: ["@chief-architect", "@engineering-manager"]
created: "2026-08-06"
last-reviewed: "2026-08-06"
next-review: "2026-11-06"
tags: ["ai", "qualification", "planner", "reviewer", "engineer", "verifier", "governance"]
---

# AI Qualification Framework

## Purpose

Vestara qualifies AI agents by their governed engineering behavior before they
are trusted to act. Qualification is not a one-time certification — it is a
continuous evaluation of whether an agent's outputs meet engineering standards.

This framework defines how each agent role is qualified, what metrics matter,
and how qualification feeds into the engineering lifecycle.

## Agent Roles

### Planner

Qualification criteria:
- **Repository Grounding** — plans reference actual codebase structure, not hallucinated files
- **Schema Reliability** — produced plans conform to the plan schema
- **Scope Discipline** — plans stay within the stated objective
- **Approval Awareness** — plans identify where human approval is needed

### Reviewer

Qualification criteria:
- **Revision Efficiency** — reviews produce actionable, specific feedback
- **Schema Reliability** — review decisions conform to the review schema
- **Scope Discipline** — reviews address the task, not tangential concerns
- **Approval Awareness** — reviews identify blocking vs non-blocking issues

### Engineer

Qualification criteria:
- **Repository Grounding** — implementations reference actual files and APIs
- **Schema Reliability** — code changes conform to project conventions
- **Scope Discipline** — changes stay within the approved plan
- **Revision Efficiency** — changes converge with minimal rework

### Verifier

Qualification criteria:
- **Evidence Quality** — verification produces structured, comparable evidence
- **Schema Reliability** — verification results conform to the evidence schema
- **Scope Discipline** — verification covers the stated success criteria
- **Approval Awareness** — verification identifies unresolved risks

## Qualification Metrics

| Metric | Description |
|--------|-------------|
| **Repository Grounding** | % of agent references that map to real codebase entities |
| **Schema Reliability** | % of outputs that conform to the expected schema |
| **Revision Efficiency** | Mean iterations needed to reach approval |
| **Scope Discipline** | % of outputs that stay within the stated objective |
| **Approval Awareness** | % of outputs that correctly identify approval requirements |
| **Cost** | Token/compute cost per qualified output |
| **Latency** | Time from request to qualified output |
| **Human Assessment** | Human reviewer rating of output quality |

## Capability Ladder

Future versions will define a capability ladder where agents progress through
levels of autonomy based on demonstrated qualification:

```
Level 1: Assist — agent suggests, human executes
Level 2: Collaborate — agent executes with human review
Level 3: Execute — agent executes autonomously within qualified scope
Level 4: Orchestrate — agent coordinates other agents within qualified scope
```

Qualification at each level requires demonstrated competence at the prior level
plus additional governance requirements.

## Integration with Engineering Lifecycle

Qualification feeds into the deterministic engineering workflow:

```text
Objective
  → Context
  → Planning (Planner qualified)
  → Review (Reviewer qualified)
  → Human Approval
  → Execution (Engineer qualified)
  → Verification (Verifier qualified)
  → Evidence
  → Repair (if needed)
  → Completion
```

Each gate requires the responsible agent to be qualified for the current scope.
Unqualified agents trigger human review or scope reduction.
