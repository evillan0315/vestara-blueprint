---
id: "roadmap-engineering-os"
title: "Engineering OS Roadmap"
volume: "20-roadmaps"
book: "Book 6: Future Technologies"
version: "1.0.0"
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

## Next milestones

1. **Durable event persistence** — SQLite append log + on-disk checkpoints.
2. **Correlation/causation envelope** — `correlationId` / `causationId` /
   `commandId` across intent → command → execution → verification.
3. **Provider platform** — installable providers, provider health, routing.
4. **CLI shared runtime** — CLI as a client of the Workspace API.
5. **Cross-provider verification** — independent verifier policy.
6. **Trust and historical confidence** — projection over the event store.
7. **Extension platform + Marketplace**.
8. **Full visual suite** — complete route × viewport × theme matrix + Visual
   Evidence (interaction, a11y, video).

## Related

- `04-platform/engineering-operating-system.md`
- `99-appendix/capability-maturity-matrix.md`
