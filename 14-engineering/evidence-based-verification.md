---
id: "engineering-evidence-based-verification"
title: "Evidence-Based Verification"
volume: "14-engineering"
book: "Book 4: Engineering"
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
implementation-ref: "local main (packages/verification/src, packages/evaluation/src)"
tags: ["verification", "evidence", "claims", "quality", "reconciliation"]
---

# Evidence-Based Verification

## Purpose

Define verification as an evidence architecture — not only tests or a final
agent response. Verification covers claims, observations, evidence, checks,
profiles, independent verification, and result aggregation.

## Evidence pipeline

```text
Intent
    ↓
Execution
    ↓
Observation
    ↓
Artifact
    ↓
Evidence
    ↓
Verification
    ↓
Decision
    ↓
Confidence
```

## Current state (implemented)

- **Verification pipeline** (`packages/verification`): runners for typecheck,
  build, test, lint, and custom checks; result aggregation; evidence records.
- **Evaluation harness** (`packages/evaluation`): corpus-driven evaluation with
  fixture repos.
- **Runtime checks**: workspace readiness + diagnostics health checks
  (`apps/api/src/routes/diagnostics.ts`).
- **Filesystem diff checks**: change-set / file-level verification and
  artifacts.
- **Verification reports**: `verification://<id>` graph entities; checks with
  `type`, `status`, `durationMs`.
- **Evidence types** produced today:
  - build / type-check / test / lint runner output
  - filesystem changes and file diffs (change sets)
  - runtime events (telemetry)
  - verification reports
  - screenshots and visual diffs (see `visual-verification.md`)
  - graph changes (Engineering Event Store)

## Verification concepts

| Concept | Meaning | Implemented |
|---------|---------|-------------|
| Claim | a proposition about the workspace state | partial (via plan/goal) |
| Observation | an emitted runtime fact | yes (telemetry events) |
| Evidence | recorded artifact supporting a claim | partial (reports, telemetry, screenshots) |
| Verification check | a single runnable check | yes |
| Verification profile | named set of checks | partial |
| Independent verification | verification by a different provider | proposed |
| Result aggregation | combining check results | yes |
| Failure handling / retries | rerun policy | partial |
| Human review | approval gate | partial (approvals) |
| Historical confidence | confidence over time | proposed |

## Boundaries

- Verification evaluates **claims and evidence**; it does not fabricate either.
- Providers never decide the final verification verdict; Vestara does.
- Do not claim independent/cross-provider verification is implemented.

## Implementation status

Implemented and verified: verification pipeline, evaluation harness, health
checks, change-set artifacts, screenshot verification.
Proposed: independent verification, historical confidence, verification
profiles as a first-class configuration surface.

## Related ADRs

- `adr/ADR-104-evidence-based-verification.md` (accepted; update references
  here rather than duplicating)

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `packages/verification/src`, `packages/evaluation/src`,
  `apps/api/src/routes/diagnostics.ts`, `apps/api/src/routes/execution.ts`
