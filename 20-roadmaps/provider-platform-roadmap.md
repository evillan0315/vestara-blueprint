---
id: "roadmap-provider-platform"
title: "Provider Platform Roadmap"
volume: "20-roadmaps"
book: "Book 6: Future Technologies"
version: "1.0.0"
status: "review"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "proposed"
implementation-status: "partial"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (@vestara/provider-runtime, provider-opencode)"
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

## Proposed

- Installable provider packages with enable/disable/prioritize.
- Provider health checks and version detection.
- OpenAI Codex engineering provider (CLI detection, SDK adapter, thread
  management, resume, cancellation, event translation, policy translation,
  evidence capture, MCP, UI/CLI config).
- Claude Code engineering provider (session management, permission-mode
  translation, allowed tools, MCP).
- Cross-provider verification policy: require independent verifier, disallow
  same provider / vendor / model family.

## Provider types

API model provider (implemented), engineering execution provider (proposed),
interactive CLI provider (proposed), local inference provider (configured,
non-default), MCP-connected provider (proposed).

## Related

- `05-ai-core/provider-architecture.md`
- `99-appendix/capability-maturity-matrix.md`
