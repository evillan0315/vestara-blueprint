---
id: "developer-platform-extension-platform"
title: "Extension Platform"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "not-started"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "not implemented"
tags: ["extension-platform", "plugins", "modules", "marketplace", "reconciliation"]
---

# Extension Platform

## Purpose

Define the extension architecture — modules, plugins, providers, agent packs,
and the Marketplace — as the future distribution mechanism of the Vestara
engineering operating system.

## Current state

**Not implemented.** The `10-developer-platform/extensions` and
`04-platform/plugins|marketplace|providers` directories are empty. This
document is architecture intent; do not treat it as implemented.

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
None implemented today; all proposed.

## Future direction

See `20-roadmaps/extension-platform-roadmap.md`.

## Related ADRs

- `adr/ADR-109-blueprint-implementation-alignment-metadata.md` (status framing)

## Related implementation

- None (not implemented).
