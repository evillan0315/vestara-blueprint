---
id: "appendix-capability-maturity-matrix"
title: "Capability Maturity Matrix"
volume: "99-appendix"
book: "Book 6: Future Technologies"
version: "1.2.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "implemented"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main"
tags: ["matrix", "maturity", "status", "reconciliation"]
---

# Capability Maturity Matrix

## Purpose

The single canonical view of Vestara capability maturity, populated from actual
evidence. Status legend:

- **Spec** — described in the Blueprint.
- **Architecture** — architecture accepted (accepted / proposed).
- **Implementation** — implemented / partial / not started.
- **Verification** — verified / partial / unverified.
- **Docs** — Blueprint coverage: complete / draft / missing.

Precise states only; no checkmarks for unknown status.

## Matrix

| Capability | Spec | Architecture | Implementation | Verification | Docs |
|------------|------|--------------|----------------|--------------|------|
| WorkspaceRuntime (open/close, fingerprint, understanding) | yes | accepted | implemented | verified | complete |
| Kernel (boot orchestration, state machine) | yes | accepted | implemented | verified | complete |
| AgentRuntime (agents, executions, telemetry states) | yes | accepted | implemented | verified | complete |
| Filesystem capabilities (capability manager) | yes | accepted | implemented | verified | complete |
| Capability-governed execution (approval gates) | yes | accepted | implemented | verified | complete |
| Telemetry (agent ops, events) | yes | accepted | implemented | verified | complete |
| Engineering Graph (entities, relationships, backlinks, search, insights, health) | yes | accepted | implemented | verified | complete |
| Temporal Engineering Event Store (events, stateAt, diff, replay, checkpoints) | yes | accepted | implemented | verified | complete (session-only persistence) |
| Engineering Graph / Inspector UI (universal inspector) | yes | accepted | implemented | verified | complete |
| Execution Center (queue, timeline, replay) | yes | accepted | implemented | verified | complete |
| Diagnostic Center (host observability, health checks) | yes | accepted | implemented | verified | complete |
| Documentation Center (docs browsing/search) | yes | accepted | implemented | verified | complete |
| Visual screenshot verification (Playwright) | yes | accepted | implemented | verified (subset) | complete |
| Verification pipeline (typecheck/build/test/lint runners) | yes | accepted | implemented | verified | complete |
| Evaluation harness (corpus + fixtures) | yes | accepted | implemented | verified | complete |
| Cross-provider verification | yes | proposed | not started | unverified | draft |
| Provider-neutral routing domain and governed assignments | yes | accepted | implemented | verified | complete |
| Installable provider packages | yes | proposed | not started | unverified | draft |
| OpenAI Codex provider | yes | proposed | not started | unverified | draft |
| Claude Code provider | yes | proposed | not started | unverified | draft |
| CLI as shared runtime client (routing) | yes | accepted | implemented | verified | complete |
| Ink engineering Console | yes | accepted | implemented | verified | complete |
| Agent Harness Runtime | yes | accepted | not started | unverified | complete |
| Durable task/thread/turn/item model | yes | accepted | partial | partial | complete |
| Environment Runtime | yes | accepted | not started | unverified | complete |
| Unified Tool Runtime | yes | accepted | partial | partial | complete |
| Context Runtime as harness source | yes | accepted | partial | partial | complete |
| Policy and Approval Runtime | yes | accepted | partial | partial | complete |
| Verification and Evidence Runtime | yes | accepted | partial | partial | complete |
| Worktree and Parallel-Agent Runtime | yes | accepted | not started | unverified | complete |
| Orchestration Runtime | yes | accepted | partial | partial | complete |
| Automation Runtime | yes | accepted | partial | partial | complete |
| Event, Telemetry, and Audit Runtime | yes | accepted | partial | partial | complete |
| Shared command envelope (correlation/causation) | yes | proposed | not started | unverified | draft |
| Extension platform (module/plugin runtime) | yes | proposed | not started | unverified | draft |
| Marketplace | yes | proposed | not started | unverified | draft |
| Durable event persistence (SQLite append log) | yes | proposed | not started | unverified | draft |
| Trust score | yes | proposed | not started | unverified | draft |
| Historical confidence | yes | proposed | not started | unverified | draft |
| Visual Evidence (interaction walkthrough, a11y, video) | partial | proposed | not started | unverified | draft |
| Vestara AI OS installer packages | yes | proposed | not started | unverified | draft |

## Notes on evidence

- "verified" means exercised by the local implementation verification loop
  (build-order + `pnpm test` + API smoke tests) and/or the visual-regression
  run.
- The Engineering Event Store is memory-resident; durable persistence is a
  future extension and is marked accordingly.
- Visual screenshot verification is marked "verified (subset)" because only a
  limited route × viewport × theme matrix has been run end-to-end, not the full
  suite.

## Related

- `99-appendix/implementation-alignment.md` — status legend + repository
  references.
- `00-governance/adr/ADR-105-event-sourced-engineering-graph.md`
- `00-governance/adr/ADR-111-agent-harness-centered-runtime-architecture.md`
