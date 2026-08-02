---
id: "developer-platform-extension-platform"
title: "Extension Platform"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.2.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-02"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "45e670d; packages/extension-contracts; packages/extension-runtime; packages/marketplace"
tags: ["extension-platform", "plugins", "modules", "marketplace", "reconciliation"]
---

# Extension Platform

## Purpose

Define the extension architecture — modules, plugins, providers, agent packs,
and the Marketplace — as the distribution mechanism of the Vestara
engineering operating system.

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

Remote registries, publishing, signatures, archive extraction, storefront
polish, and out-of-process isolation remain proposed.

## Terminology

```text
Module        A substantial runtime capability that may register services,
              commands, event handlers, APIs, or UI contributions.

Plugin        A smaller extension built on stable module contracts.

Provider      An installable adapter that supplies model or engineering
              execution capability.

Agent Pack    Roles, policies, prompts, workflows, and capability requirements.

Marketplace   Discovery, trust metadata, distribution, updates, and installation.
```

Do not freeze these definitions without an ADR if they shift architectural
meaning.

## Extension architecture

```text
Extension Platform
├── Package manifest
├── Package identity
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
└── Marketplace distribution
```

## Boundaries

- The extension platform builds on stable runtime contracts
  (WorkspaceRuntime, AgentRuntime, capability manager, event bus).
- Providers remain governed by Vestara; extensions declare requested
  permissions and capability usage.
- The Marketplace is not just a catalog UI; it is discovery + trust metadata +
  distribution + updates + installation.

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
enforcement, revocation, community isolation, resource limits, and secret
mediation remain proposed.

## Future direction

See `20-roadmaps/extension-platform-roadmap.md`.

## Related ADRs

- `../00-governance/adr/ADR-112-extension-platform-and-local-package-manager.md`
- `../00-governance/adr/ADR-115-marketplace-foundation-and-workspace-experience.md`

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
