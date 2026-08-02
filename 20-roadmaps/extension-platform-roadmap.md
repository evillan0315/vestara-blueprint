---
id: "roadmap-extension-platform"
title: "Extension Platform Roadmap"
volume: "20-roadmaps"
book: "Book 6: Future Technologies"
version: "1.2.0"
status: "review"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-02"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "45e670d; packages/extension-contracts; packages/extension-runtime; packages/marketplace"
tags: ["roadmap", "extensions", "marketplace", "reconciliation"]
---

# Extension Platform Roadmap

## Purpose

Roadmap for the module/plugin runtime, provider packages, agent packs, and the
Marketplace.

## Current state

The local extension foundation is implemented and tested. The Marketplace
foundation (catalog, local registry, search, resolution, install orchestration,
`vestara marketplace` CLI) and the Workspace experience (API with operation
DTOs, Discover/Categories/Installed/Updates views, asset detail, install
review, and a WebSocket-driven operation center) are implemented and verified.
Public/remote Marketplace discovery, publishing, and signature enforcement are
not implemented.

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
6. **Marketplace foundation — complete.** Asset/catalog model, read-only local
   registry (symlink-safe, malformed isolation, bounded scans, incremental
   rescan), search and filtering, compatibility checks, semantic version
   ordering, minimum-viable dependency resolution with explicit conflict and
   cycle errors, installed/update projections, dry-run install plans, and the
   `vestara marketplace` CLI command group.
7. **Marketplace Workspace experience — complete.** Workspace API returning
   operation DTOs (planning → awaiting-permission → completed → failed),
   Discover/Categories/Installed/Updates views, asset detail with
   contributions-as-impact, install review driven by the dry-run plan, and an
   operation center subscribed to `marketplace.*` WebSocket events.
8. **Marketplace distribution — next.** Remote/public registries, publishing,
   signature enforcement, storefront governance, collections, and commercial
   services.
9. **Security hardening** — signatures, SBOM, revocation, process isolation,
   resource limits, and install/update/uninstall audit persistence.

## Terminology

See `10-developer-platform/extension-platform.md`.

## Related

- `10-developer-platform/extension-platform.md`
- `99-appendix/capability-maturity-matrix.md`
- `00-governance/adr/ADR-115-marketplace-foundation-and-workspace-experience.md`
