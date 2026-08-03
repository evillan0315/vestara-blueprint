---
id: "developer-platform-extension-platform"
title: "Extension Platform"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.3.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-04"
next-review: "2026-11-04"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "45e670d; packages/extension-contracts; packages/extension-runtime; packages/marketplace"
tags: ["extension-platform", "plugins", "modules", "marketplace", "publishers", "commerce", "offline", "reconciliation"]
---

# Extension Platform

## Purpose

Define the extension architecture — modules, plugins, providers, agent packs,
and the Marketplace — as the distribution mechanism of the Vestara
engineering operating system and the wider Vestara platform ecosystem.

## Current state

**Lifecycle foundation and Marketplace foundation implemented; remote
distribution not started.** Vestara has v1 manifest and lifecycle contracts plus
a transactional local package manager. It validates compatibility and
integrity, requests declared permissions, activates controlled contributions,
persists workspace enablement, projects package relationships into the
Engineering Graph, and supports disable, health, update, rollback, and
uninstall.

The Marketplace (`packages/marketplace`) now sits *above* the lifecycle engine
as the catalog and discovery layer: read-only local registry (symlink-safe,
strict manifest validation, content hashing, malformed isolation, bounded
scans, incremental rescan), search and filtering, compatibility checks,
semantic version ordering, minimum-viable dependency resolution with explicit
conflict/cycle/missing-dependency errors, installed/update projections, and
dry-run install plans. It exposes `vestara marketplace` CLI commands, a
Workspace API (`apps/api/src/routes/marketplace.ts`) returning operation DTOs,
and Workspace UI views (Discover, Categories, Installed, Updates, asset detail,
install review, and a WebSocket-driven operation center). Installation,
activation, rollback, and uninstall delegate to `extension-runtime` — one
authority.

Remote registries, publishing, signatures, archive extraction, commercial
services, publisher identity, entitlements, payouts, offline catalog snapshots,
and out-of-process isolation remain proposed.

## Terminology

```text
Module        A substantial runtime capability that may register services,
              commands, event handlers, APIs, or UI contributions.

Plugin        A smaller extension built on stable module contracts.

Provider      An installable adapter that supplies model or engineering
              execution capability.

Agent Pack    Roles, policies, prompts, workflows, and capability requirements.

Marketplace   The primary platform operating center for discovery, trust,
              distribution, configuration, updates, commerce, publishing,
              and installation.

Publisher     An individual or organization that owns and distributes one or
              more Marketplace products and releases.
```

Do not freeze these definitions without an ADR if they shift architectural
meaning.

## Extension architecture

```text
Extension Platform
├── Package manifest
├── Package identity
├── Publisher identity
├── Module lifecycle
├── Plugin lifecycle
├── Provider packages
├── Agent packs
├── MCP integrations
├── UI contributions
├── Permissions
├── Capability declarations
├── Dependency resolution
├── Compatibility rules
├── Signature verification
├── Installation
├── Enable / disable
├── Upgrade
├── Rollback
├── Removal
├── Telemetry
├── Offline catalog
├── Publishing pipeline
├── Licensing and entitlement
├── Commerce and payouts
└── Marketplace distribution
```

## Boundaries

- The extension platform builds on stable runtime contracts
  (WorkspaceRuntime, AgentRuntime, capability manager, event bus).
- Providers remain governed by Vestara; extensions declare requested
  permissions and capability usage.
- The Marketplace is not just a catalog UI; it is discovery + trust metadata +
  distribution + configuration + updates + publishing + optional commerce.
- Official Vestara products remain free to install and operate when self-hosted;
  premium value comes from managed services, assurance, collaboration,
  certification, distribution, and support.
- Third-party publishing does not bypass lifecycle, security, verification,
  evidence, licensing, or user-data ownership rules.

## Security

Package identity, publisher identity, capability declarations, requested
permissions, workspace boundaries, protected paths, terminal/network policy,
approval requirements, sandbox modes, secret isolation, signature verification,
supply-chain security, event attribution, and install/update/uninstall audit.
Checksum verification, permission declarations, path and symlink containment,
event attribution, transactional rollback, and isolation declarations are
implemented in the local foundation. The Marketplace additionally enforces
read-only discovery, malformed-package isolation, bounded scans, and registry
failure isolation; permission-gated installs surface an explicit
awaiting-permission state before any lifecycle action. Signatures, SBOM
enforcement, revocation, community isolation, resource limits, secret
mediation, publisher verification, commercial entitlement, and moderation
remain proposed.

## Marketplace operating modes

```text
Offline
├── bundled official Vestara products
├── installed official products
├── cached official metadata
├── organization-provisioned packages
└── clearly separated local or unverified imports

Online
├── official Vestara products
├── certified partners
├── verified publishers
├── community publishers
├── organization-private catalogs
└── free and paid products and managed services
```

Offline mode must remain a complete and useful official Vestara experience.
Online mode expands discovery and commerce without weakening provenance,
capability controls, verification, or uninstall safety.

## Future direction

See `20-roadmaps/extension-platform-roadmap.md` and
`marketplace-creator-ecosystem.md`.

## Unified Asset Model

The Marketplace distributes three asset kinds through one installer (ADR-124):

```text
Marketplace Asset
├── Package
├── Workspace Module
└── App
```

All three share identity, versioning, integrity, dependency resolution,
permissions, transactions, rollback, events, and Engineering Graph projection.
They differ only in activation model and runtime boundary.

Products and solution bundles may compose multiple assets, services,
microservices, workspaces, agents, verification profiles, and documentation
under one commercial or free listing.

See `10-developer-platform/marketplace-asset-model.md` for the canonical taxonomy
and `10-developer-platform/marketplace-creator-ecosystem.md` for publishing,
commerce, offline behavior, and creator opportunity.

## Related ADRs

- `../00-governance/adr/ADR-112-extension-platform-and-local-package-manager.md`
- `../00-governance/adr/ADR-115-marketplace-foundation-and-workspace-experience.md`
- `../00-governance/adr/ADR-124-unified-marketplace-asset-model.md`
- `../00-governance/adr/ADR-125-marketplace-creator-economy-and-offline-catalog.md`

## Related implementation

- `packages/extension-contracts/src/index.ts`
- `packages/extension-runtime/src/index.ts`
- `packages/marketplace/src/index.ts`
- `apps/api/src/routes/marketplace.ts`
- `apps/workspace/src/pages/Marketplace/`
- `apps/cli/src/commands/marketplace.ts`
- `packages/extension-contracts/__tests__/index.test.ts`
- `packages/extension-runtime/__tests__/index.test.ts`
- `packages/marketplace/__tests__/`
