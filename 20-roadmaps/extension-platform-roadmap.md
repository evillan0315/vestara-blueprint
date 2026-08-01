---
id: "roadmap-extension-platform"
title: "Extension Platform Roadmap"
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
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "45e670d; packages/extension-contracts; packages/extension-runtime"
tags: ["roadmap", "extensions", "marketplace", "reconciliation"]
---

# Extension Platform Roadmap

## Purpose

Roadmap for the module/plugin runtime, provider packages, agent packs, and the
Marketplace.

## Current state

The local extension foundation is implemented and tested. Public Marketplace
discovery and publishing are not implemented.

## Phases

1. **Extension contracts — foundation complete.** Package identity, taxonomy, manifest,
   lifecycle, trust, isolation, contributions, permissions, compatibility, and
   health contracts exist.
2. **Local package manager — foundation complete.** Unpacked local install, checksum
   verification, dependency checks, activation, enable/disable, health,
   retained-version rollback, uninstall, events, and graph projection exist.
3. **Reference packages — next.** Extract provider, theme, and standards-pack
   examples against the stable contracts.
4. **Provider packages** — installable model + engineering execution providers.
4. **Agent packs** — roles, policies, prompts, workflows, capability
   requirements.
5. **MCP integrations** — connect external tool servers.
6. **Marketplace** — discovery, trust metadata, distribution, updates,
   installation.
7. **Security hardening** — signatures, SBOM, revocation, process isolation,
   resource limits, and install/update/uninstall audit persistence.

## Terminology

See `10-developer-platform/extension-platform.md`.

## Related

- `10-developer-platform/extension-platform.md`
- `99-appendix/capability-maturity-matrix.md`
