---
id: "developer-platform-extension-platform"
title: "Extension Platform"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.1.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "packages/extension-contracts/src/index.ts; packages/extension-runtime/src/index.ts"
tags: ["extension-platform", "plugins", "modules", "marketplace", "reconciliation"]
---

# Extension Platform

## Purpose

Define the extension architecture — modules, plugins, providers, agent packs,
and the Marketplace — as the future distribution mechanism of the Vestara
engineering operating system.

## Current state

**Foundation implemented; distribution service not started.** Vestara now has
v1 manifest and lifecycle contracts plus a transactional local package manager.
It validates compatibility and integrity, requests declared permissions,
activates controlled contributions, persists workspace enablement, projects
package relationships into the Engineering Graph, and supports disable,
health, update, rollback, and uninstall. Remote registries, publishing,
signatures, archive extraction, storefront UI, and out-of-process isolation
remain proposed.

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
implemented in the local foundation. Signatures, SBOM enforcement, revocation,
community isolation, resource limits, and secret mediation remain proposed.

## Future direction

See `20-roadmaps/extension-platform-roadmap.md`.

## Related ADRs

- `../00-governance/adr/ADR-112-extension-platform-and-local-package-manager.md`

## Related implementation

- `packages/extension-contracts/src/index.ts`
- `packages/extension-runtime/src/index.ts`
- `packages/extension-contracts/__tests__/index.test.ts`
- `packages/extension-runtime/__tests__/index.test.ts`
