---
id: "os-image-builder-packages"
title: "Image Builder — Packages"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.0.0"
status: "proposed"
owner: "@devops-engineer"
created: "2026-08-03"
last-reviewed: "2026-08-03"
next-review: "2026-11-03"
architecture-status: "proposed"
implementation-status: "not-started"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "not implemented"
tags: ["os", "image-builder", "packages"]
---

# Image Builder — Packages

## Purpose

Define the base package set and pinning model for reproducible images.

## Package categories

| Category | Examples |
|----------|----------|
| Base OS | kernel, initramfs tooling, systemd, bootloader |
| Runtime | Node.js (required by the Vestara runtime) |
| Display | display manager, session, window manager |
| AI workloads | GPU drivers, Ollama on demand (no auto-start daemon) |
| Tooling | CLI tools for the developer profile |

## Pinning & reproducibility

- Pin exact package versions; a `packages.yaml` lists category → package →
  version.
- Record resolved versions in the image manifest.
- Content-addressed package resolution so builds are deterministic.

## Constraints

- **Minimal**: only necessary services, no bloat.
- **AI-Optimized**: pre-configured for AI workloads without auto-starting
  background services (Ollama on demand only).
- Vestara runtime packages (`apps/*`, `packages/*`) are built from the
  `vestara-ai-core` repository, not fetched as distribution packages.

## Related

- `README.md`
- `BLUEPRINT.md`
- `FILESYSTEM.md`
- `IMAGE-BUILDER.md`
