---
id: "os-image-builder-customization"
title: "Image Builder — Customization"
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
tags: ["os", "image-builder", "customization"]
---

# Image Builder — Customization

## Purpose

Describe how the image builder applies declarative customization — branding,
login, and service configuration — without manual post-build edits.

## Customization inputs

| Input | Applies | Source |
|-------|---------|--------|
| Brand tokens | all surfaces | `assets/` + `BRANDING.md` |
| GRUB config + theme | bootloader | `configs/grub/` |
| Plymouth theme | splash | `configs/plymouth/` |
| systemd units | startup | `os/systemd/` |
| Login profile | display manager / session | `login/PROFILES.md` |

## Principle

Every customization originates from a single source of truth and is applied
declaratively during the build. Nothing is edited on the generated image after
the build starts.

## Rules

- Presentation layers must not hide service failures.
- The API must not become a hard dependency of boot.
- Custom units are optional; `vestara-host`, `vestara-api`, and
  `vestara-workspace` remain the operational authority.

## Related

- `README.md`
- `BLUEPRINT.md`
- `BRANDING.md`
- `grub/THEMING.md`
