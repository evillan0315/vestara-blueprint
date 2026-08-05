---
title: "Roadmaps — Volume Overview"
volume: "20-roadmaps"
book: "Book 6: Future Technologies"
version: "1.0.0"
status: "draft"
owner: "@product-manager"
last-reviewed: "2025-07-23"
next-review: "2026-01-23"
tags: ["roadmaps", "strategy", "generations", "planning"]
---

# Volume 20: Roadmaps
## Every Domain Has Its Own Path Forward

> **Mission**: Maintain a comprehensive, multi-domain roadmap that aligns all Vestara development toward the five-generation vision.

---

## 📋 Volume Contents

```
20-roadmaps/
│
├── README.md                              ← This file
├── MASTER_ROADMAP.md                      ← Cross-domain integrated roadmap (planned)
├── PLATFORM.md                           ← Platform services roadmap (planned)
├── AI_CORE.md                            ← AI capabilities roadmap (planned)
├── WORKSPACE.md                          ← Workspace features roadmap (planned)
├── OS.md                                 ← Operating system roadmap (planned)
├── CLOUD.md                              ← Cloud services roadmap (planned)
├── MOBILE.md                             ← Mobile companion roadmap (planned)
├── ENTERPRISE.md                         ← Enterprise features roadmap (planned)
├── MARKETPLACE.md                        ← Marketplace & ecosystem roadmap (planned)
├── marketplace-workspace-roadmap.md       ← Product ecosystem / strategic (MW-000..MW-010)
├── product-runtime-roadmap.md             ← Product execution model (PR-000..PR-004)
└── LONG_TERM_VISION.md                   ← 10-year vision & beyond (planned)
```

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `01-company` | Vision drives roadmap priorities |
| `03-product` | Product strategy shapes roadmap |
| `16-operations` | Operations executes roadmap |
| `21-research` | Research feeds future roadmap items |

---

## Standards & Roadmaps

Standards define **what** products must conform to. Roadmaps define **when**
each capability is built. A milestone is "done" when it implements the
contract the corresponding standard defines.

| Standard | What It Defines | Implemented By |
|----------|-----------------|----------------|
| [VES-100 Product Contract](../30-standards/VES-100-product-contract.md) | Shared foundation every product implements | All roadmaps |
| [VES-101 Workspace Contract](../30-standards/VES-101-workspace-contract.md) | Workspace-specific capabilities | Marketplace Workspace Roadmap |
| [VES-102 Application Contract](../30-standards/VES-102-application-contract.md) | Application isolation and lifecycle | Marketplace Workspace Roadmap |
| [VES-103 Agent Contract](../30-standards/VES-103-agent-contract.md) | Agent policies and capabilities | Marketplace Workspace Roadmap |
| [VES-104 Runtime Contract](../30-standards/VES-104-runtime-contract.md) | Runtime injection and service hosting | Product Runtime Roadmap |
| [VES-105 Extension Contract](../30-standards/VES-105-extension-contract.md) | Extension points and sandboxing | Extension Platform Roadmap |

## Validation Milestones

Before scaling the Marketplace and Workspace architecture, prove it on one
concrete product:

| Milestone | Purpose | Validates |
|-----------|---------|-----------|
| [EW-PV-001](engineering-workspace-validation.md) | Package the Engineering Workspace as the first official Vestara product | Product identity, VES-100/VES-101 conformance, Product Runtime execution, evidence generation, distribution independence |

The decisive acceptance test: remove the Workspace from the platform build,
install it as a product package, launch it through Product Runtime, verify
its evidence, and uninstall or replace it without modifying Vestara Core.

## Roadmap Layers

The Marketplace-related roadmaps are split by responsibility, not by feature:

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

- **Marketplace Workspace Roadmap** — the *product ecosystem* roadmap.
  Strategic: what a Product, Workspace, Application, Agent, Theme, Plugin,
  and Service are, and how they are discovered, installed, published, and
  managed.
- **Product Runtime Roadmap** — the *product execution* roadmap. Defines how
  an installed product actually runs: lifecycle, isolation, permissions,
  capabilities, service discovery, registration, and governance.
- **Extension Platform Roadmap** — the *developer extensibility* roadmap.
  Technical: the SDK, hooks, APIs, events, dependency injection, sandboxing,
  and security model products use to extend Vestara.

The Marketplace defines *what* can be distributed. The Product Runtime defines
*how* those products execute. The Extension Platform defines *how* they
integrate.

## Roadmaps (reconciled)

- [engineering-os-roadmap.md](engineering-os-roadmap.md) — engineering operating system
- [provider-platform-roadmap.md](provider-platform-roadmap.md) — provider-neutral providers
- [extension-platform-roadmap.md](extension-platform-roadmap.md) — developer extensibility / technical
- [marketplace-workspace-roadmap.md](marketplace-workspace-roadmap.md) — product ecosystem / strategic (MW-000..MW-010)
- [product-runtime-roadmap.md](product-runtime-roadmap.md) — product execution model (PR-000..PR-004)
- [engineering-workspace-validation.md](engineering-workspace-validation.md) — first product validation (EW-PV-001A..G)
- [V1.0-ROADMAP.md](V1.0-ROADMAP.md) — generation V1 roadmap

**END OF ROADMAPS VOLUME OVERVIEW**

*A roadmap without a vision is just a to-do list.*
