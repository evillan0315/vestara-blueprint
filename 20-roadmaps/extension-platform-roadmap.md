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

## Layer & Responsibility

This is the **developer extensibility roadmap**. It is technical: it defines
how products extend and integrate with the Vestara Platform.

It answers questions like:

- Plugin SDK
- Extension SDK
- Hooks
- APIs
- Events
- Runtime injection
- Dependency Injection
- Capability registration
- Sandboxing
- Security
- Permissions
- Version compatibility

> **Extension Platform = How products extend Vestara**

## Purpose

Roadmap for the module/plugin runtime, provider packages, agent packs, and the
Marketplace integration layer.

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

## Relationship to Other Roadmaps

```text
Marketplace Workspace Roadmap (what is distributed)
            │
            ▼
Product Runtime Roadmap (how products execute)
            │
            ▼
Extension Platform Roadmap (how products integrate)
            │
            ▼
Workspace SDK
            │
            ▼
Third-party Products
```

- The **Marketplace** defines *what* can be distributed.
- The **Product Runtime** defines *how* an installed product executes.
- The **Extension Platform** defines *how* those products integrate.

This roadmap depends on the Product Runtime: extensions execute inside the
product runtime, so the runtime model must exist before extension contracts
can be stabilized.

See [Marketplace-Driven Workspace Roadmap](marketplace-workspace-roadmap.md)
and [Product Runtime Roadmap](product-runtime-roadmap.md).

## Standards

This roadmap implements the following product contract standards:

| Standard | Description |
|----------|-------------|
| [VES-100 Product Contract](../30-standards/VES-100-product-contract.md) | Shared foundation |
| [VES-105 Extension Contract](../30-standards/VES-105-extension-contract.md) | Extension points, hooks, sandboxing |

## Related

- `10-developer-platform/extension-platform.md`
- `99-appendix/capability-maturity-matrix.md`
- `00-governance/adr/ADR-115-marketplace-foundation-and-workspace-experience.md`
