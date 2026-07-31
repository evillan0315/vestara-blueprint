---
id: "operating-system-provider-installation"
title: "Provider and Extension Installation (AI OS)"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "proposed"
implementation-status: "not-started"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "not implemented"
tags: ["installer", "providers", "extensions", "reconciliation"]
---

# Provider and Extension Installation

## Purpose

Document the future AI OS installer's optional installable capabilities.

## Current state

**Not implemented.** No installer packages exist. Do not imply packages are
installable today.

## Future installable capabilities

```text
Core Runtime
Workspace UI
Vestara CLI
OpenAI Codex
Claude Code
OpenCode
Ollama
GitHub integration
Docker integration
Kubernetes integration
Visual Verification
Browser Automation
Engineering Graph
Telemetry
Marketplace
```

## Future onboarding flow

```text
Detect
Install
Authenticate
Health check
Configure defaults
Declare permissions
Verify integration
```

## Provider installation

Providers are replaceable engineering workers governed by Vestara. Installation
declares provider capability and permissions; health checks validate the
integration (see `05-ai-core/provider-architecture.md`).

## Related implementation

- None (not implemented).
