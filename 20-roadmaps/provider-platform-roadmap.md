---
id: "roadmap-provider-platform"
title: "Provider Platform Roadmap"
volume: "20-roadmaps"
book: "Book 6: Future Technologies"
version: "1.1.0"
status: "review"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "proposed"
implementation-status: "partial"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "vestara-ai-core@a350622 (@vestara/provider-runtime, provider-opencode)"
tags: ["roadmap", "providers", "reconciliation"]
---

# Provider Platform Roadmap

## Purpose

Roadmap for provider-neutral engineering providers, including Codex and
Claude Code integration directions.

## Implemented today

- Provider manager contract (`@vestara/provider-runtime`).
- Default provider (`@vestara/provider-opencode`).
- Provider settings surface (basic) + provider CLI sub-command.
- Normalized engineering capability catalog and provider-scoped model identity.
- Named profiles, task-specific role routing, constraints, candidate evidence,
  health hysteresis, and side-effect-aware fallback policy.
- Versioned routing selection and governed task assignments.
- Routing API, CLI, Workspace UI, and Ink Console surfaces.

## Proposed

- Installable provider packages with enable/disable/prioritize.
- Marketplace provider discovery and lifecycle-managed installation.
- OpenAI Codex engineering provider (CLI detection, SDK adapter, thread
  management, resume, cancellation, event translation, policy translation,
  evidence capture, MCP, UI/CLI config).
- Claude Code engineering provider (session management, permission-mode
  translation, allowed tools, MCP).
- Cross-provider verification execution. The independent-verifier requirement
  is expressible; same-vendor and model-family enforcement remain proposed.

## Provider types

API model provider (implemented), engineering routing contract (implemented),
additional engineering execution provider adapters (proposed), interactive Ink
Console (implemented), local inference provider (configured, non-default),
MCP-connected provider (proposed).

## Related

- `05-ai-core/provider-architecture.md`
- `99-appendix/capability-maturity-matrix.md`
