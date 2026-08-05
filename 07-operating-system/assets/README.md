---
id: "os-assets"
title: "Assets — Branding & Presentation Assets"
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
tags: ["os", "assets", "branding"]
---

# Assets — Branding & Presentation Assets

## Purpose

This directory is the source asset tree consumed by the image builder. It
mirrors `vestara-ai-core/os/customization/assets/`, which is the executable
source of truth for implemented assets.

## Layout

```text
assets/
├── metadata.json       versioned, content-addressed asset manifest
├── logos/              vector & raster marks
├── wallpapers/         login / desktop backgrounds
├── boot/               GRUB + Plymouth presentation assets
├── login/              display-manager artwork
├── icons/              application & system icons
├── fonts/              fonts with compatible redistribution licenses
└── sounds/             audio feedback assets
```

## Rules

- Keep source assets separate from generated exports.
- Version every asset with a content hash in `metadata.json`.
- Record licenses for anything not authored by Vestara.
- No credentials or provider secrets in this directory.
- Color tokens are defined once (see `metadata.json` / `assets/colors.json`)
  and referenced by every surface.

## Related

- `ASSET-PIPELINE.md`
- `BRANDING.md`
- `metadata.json`
