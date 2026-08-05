---
id: "os-branding"
title: "Branding — Visual Identity System"
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
tags: ["os", "branding", "design", "identity"]
---

# Branding — Visual Identity System

## Purpose

Define the single brand system that the image builder applies across the boot
experience — GRUB menu, Plymouth splash, login screen, and desktop — so
branding is consistent, versioned, and derived from one asset source rather
than scattered across `/etc`, `/usr/share`, GRUB, Plymouth, and systemd.

## Principle

Every customization originates from a single source of truth
(`assets/` + brand config). No branding is edited inside a generated image;
all of it is applied declaratively during the build.

## Brand surfaces

| Surface | Applies | Config source |
|---------|---------|---------------|
| Bootloader | GRUB menu theme, fonts, resolution, timeout, background | `grub/THEMING.md` |
| Splash | Plymouth logo, animation, progress | `plymouth/THEMES.md` |
| Login | Display-manager theme, wallpaper, logo | `login/PROFILES.md` |
| Desktop | Wallpaper, icons, fonts, sounds | `assets/` |

## Core tokens

- Colors are defined once as canonical tokens (see `assets/colors.json` in the
  implementation tree) and referenced by every surface.
- The vector mark (`logos/`) is the source; rasters for bootloader/splash/login
  are generated exports.
- Fonts must carry compatible redistribution licenses.

## Asset pipeline

Assets flow through `ASSET-PIPELINE.md`: source → content-addressed manifest →
validated exports → embedded in image with hashes recorded.

## Related

- `ASSET-PIPELINE.md`
- `grub/THEMING.md`
- `plymouth/THEMES.md`
- `login/PROFILES.md`
- `assets/README.md`
