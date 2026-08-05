---
id: "os-validation"
title: "Validation — Boot, Login, Workspace Evidence Pipeline"
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
tags: ["os", "validation", "evidence", "boot"]
---

# Validation — Boot, Login, Workspace Evidence Pipeline

## Purpose

Define how every generated OS image is validated and how that validation
becomes verifiable evidence — aligning the OS image platform with Vestara's
broader observable-engineering philosophy (PCS-026).

## Principle

Each validation stage emits an evidence artifact rather than relying on logs
alone. Validation results are captured, content-addressed, and published
alongside the image so a reviewer can verify a release without re-running it.

## Validation pipeline

```text
Validate Assets
      ↓
Validate Configuration
      ↓
Validate Package Versions
      ↓
Validate Services (systemd-analyze verify, boot health)
      ↓
Validate Boot (GRUB presence, kernel boot, splash)
      ↓
Validate Login (display manager starts, profiles selectable)
      ↓
Validate Desktop (session, wallpaper, icons)
      ↓
Validate Workspace (workspace-ready reachable, health verified)
      ↓
Generate Evidence (manifest)
      ↓
Publish Image (signed, checksummed)
```

## Evidence types

| Stage | Example evidence |
|-------|------------------|
| Assets | validated dimensions/formats, content hashes |
| Configuration | validated config files, service unit verification |
| Packages | pinned version manifest |
| Boot | boot screenshots, kernel log, GRUB menu capture |
| Login | display-manager screenshot, profile availability |
| Workspace | `workspace-ready` boot stage, API health, screenshot |

## Relation to OS-0

The OS-0 Boot Runtime already emits a persisted, ordered stage history with
optional evidence per transition (`firmware-complete` … `workspace-ready`).
Image-level validation extends this to bootloader, splash, and login stages
that OS-0 intentionally does not control.

## Tooling

- `systemd-analyze verify` for supplied service units (already used for OS-0).
- `pnpm screenshots`-style visual capture for boot/login/desktop surfaces.
- Content-addressed manifests for every validated build.

## Related

- `IMAGE-BUILDER.md`
- `image-builder/VALIDATION.md`
- `image-builder/RELEASES.md`
- `os-0-host-integration.md`
- `04-platform/engineering-operating-system.md` (evidence model)
