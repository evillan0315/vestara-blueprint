---
title: "Developer Platform — Volume Overview"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "draft"
owner: "@chief-architect"
last-reviewed: "2025-07-23"
next-review: "2026-01-23"
tags: ["developer-platform", "sdk", "cli", "api", "extensions"]
---

# Volume 10: Developer Platform
## Building the Extensible Foundation — Where Vestara Replaces OpenCode

> **Mission**: Create the development platform that enables anyone to build on Vestara — from plugins and extensions to full applications — and eventually provide the native AI workspace that replaces OpenCode.

---

## 📋 Volume Contents

```
10-developer-platform/
│
├── README.md                              ← This file
├── DEVELOPER_EXPERIENCE.md                ← Developer journey & philosophy
├── SDK.md                                 ← Vestara SDK specification
├── CLI.md                                 ← `vestara` CLI reference
├── API.md                                 ← Public API reference
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
| **Open Ecosystem** | Anyone can build, publish, and monetize plugins |
| **Sandboxed** | Plugins run in isolated environments with permissions |
| **Versioned** | API versioning guarantees backward compatibility |
| **Type-Safe** | Full TypeScript support in SDK and plugins |
| **AI-First** | AI assistance built into every developer tool |
| **Marketplace** | Discover, install, and manage plugins |

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `04-platform` | Platform APIs exposed through SDK |
| `05-ai-core` | AI capabilities available to plugins |
| `06-workspace` | Developer tools integrated into workspace |
| `14-engineering` | SDK follows engineering standards |

---

## Related documents

- [App Runtime and Isolation](app-runtime-and-isolation.md)
- [Dependency Resolution](dependency-resolution.md)
- [Engineering Workflow SDK](engineering-workflow-sdk.md)
- [Extension Lockfile](extension-lockfile.md)
- [Extension Manifest](extension-manifest.md)
- [Extension Platform](extension-platform.md)
- [Install Lifecycle](install-lifecycle.md)
- [Marketplace Asset Model](marketplace-asset-model.md)
- [Marketplace Catalog](marketplace-catalog.md)
- [Marketplace Release Catalog](marketplace-release-catalog.md)
- [Package Activation](package-activation.md)
- [Publishing](publishing.md)
- [Trust and Signing](trust-and-signing.md)
- [Workspace Module Installation](workspace-module-installation.md)



**END OF DEVELOPER PLATFORM VOLUME OVERVIEW**

*The developer platform is where Vestara grows from a product into an ecosystem.*
