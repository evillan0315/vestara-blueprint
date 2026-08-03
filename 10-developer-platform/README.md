---
title: "Developer Platform — Volume Overview"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.1.0"
status: "draft"
owner: "@chief-architect"
last-reviewed: "2026-08-04"
next-review: "2026-11-04"
tags: ["developer-platform", "sdk", "cli", "api", "extensions", "marketplace", "publishers"]
---

# Volume 10: Developer Platform
## Building the Extensible Foundation — Where Vestara Replaces OpenCode

> **Mission**: Create the development platform that enables anyone to build on Vestara — from plugins and extensions to full applications, industry solutions, and commercial products — and eventually provide the native AI workspace that replaces OpenCode.

---

## 📋 Volume Contents

```text
10-developer-platform/
│
├── README.md                              ← This file
├── DEVELOPER_EXPERIENCE.md                ← Developer journey & philosophy
├── SDK.md                                 ← Vestara SDK specification
├── CLI.md                                 ← `vestara` CLI reference
├── API.md                                 ← Public API reference
├── extension-platform.md                  ← Extension and Marketplace architecture
├── marketplace-asset-model.md             ← Unified package/module/app taxonomy
├── marketplace-creator-ecosystem.md       ← Publishers, commerce, offline catalog, self-hosting
│
├── ide/                                   ← Native AI IDE (future OpenCode replacement)
├── cli/                                   ← Command-line interface
├── terminal/                              ← Integrated terminal
├── debugger/                              ← Debugger & introspection
├── profiler/                              ← Performance profiler
├── package-manager/                       ← Plugin & template manager
├── extensions/                            ← Extension system
├── templates/                             ← Project templates & generators
├── generators/                            ← Code generators
└── ai-development/                        ← AI-assisted development tools
```

---

## 🔧 Developer Platform Principles

| Principle | Description |
|-----------|-------------|
| **Open Ecosystem** | Anyone can build, publish, and monetize products under controlled Marketplace governance |
| **Self-Hosted Freedom** | Official Vestara products remain free when users operate their own models, storage, databases, and infrastructure |
| **Creator Opportunity** | Individuals, schools, consultants, and businesses can distribute free or paid products |
| **Offline-First Catalog** | Offline installations retain a complete official Vestara catalog and clearly separate local imports |
| **Sandboxed** | Plugins and third-party products run in isolated environments with explicit permissions |
| **Evidence-Backed Trust** | Verification, provenance, security, and maintenance matter more than popularity alone |
| **Versioned** | API versioning guarantees backward compatibility |
| **Type-Safe** | Full TypeScript support in SDK and plugins |
| **AI-First** | AI assistance is built into creation, operation, verification, and publishing |
| **Marketplace Operating Center** | Discover, install, configure, update, verify, publish, monetize, and remove products |

---

## Marketplace Scope

The Marketplace is the primary post-onboarding operating center for technical and non-technical users. It can distribute engineering tools, education products, AI tutors, LMS packages, business systems such as POS and inventory, personal learning workspaces, infrastructure providers, services, microservices, and complete industry solution bundles.

Official Vestara products form the offline and self-hosted foundation. Online connectivity expands the catalog to verified partners, community publishers, organization-private products, and a mix of free and paid offerings.

See:

- `extension-platform.md`
- `marketplace-asset-model.md`
- `marketplace-creator-ecosystem.md`
- `../00-governance/adr/ADR-125-marketplace-creator-economy-and-offline-catalog.md`

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `02-business` | Managed services, creator economy, commerce, pricing, and ecosystem sustainability |
| `03-product` | Marketplace-first onboarding and domain solution strategy |
| `04-platform` | Platform APIs exposed through SDK |
| `05-ai-core` | AI capabilities available to products and publishing minions |
| `06-workspace` | Developer and domain tools integrated into workspaces |
| `11-security` | Publisher identity, signatures, isolation, entitlement, and supply-chain policy |
| `12-data` | User ownership, product data boundaries, offline state, and commerce records |
| `14-engineering` | SDK and published products follow engineering and evidence standards |

---

**END OF DEVELOPER PLATFORM VOLUME OVERVIEW**

*The developer platform is where Vestara grows from a product into an ecosystem—and where useful ideas can become opportunities for their creators.*
