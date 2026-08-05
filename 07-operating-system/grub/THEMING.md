---
id: "os-grub-theming"
title: "GRUB — Theming"
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
tags: ["os", "grub", "theme", "branding"]
---

# GRUB — Theming

## Purpose

Describe how the Vestara brand is applied to the GRUB menu: theme files, fonts,
resolution, backgrounds, and label styling.

## Source

A GRUB theme is a plain-text theme file (e.g. `theme.txt`) plus referenced
font and image assets. The implementation template lives at
`vestara-ai-core/os/customization/grub/theme.txt`.

## Theme elements

| Element | Concern |
|---------|---------|
| `desktop-color` | menu background color |
| `title-text` | branded title string |
| `label` blocks | title and subtitle text, color, font, position |
| fonts | font assets with compatible licenses |
| images | background image, logo (from `assets/`) |
| resolution | target display resolution, scalability |

## Branding integration

- Colors come from the canonical brand tokens (`BRANDING.md`), never
  hard-coded per surface.
- The logo raster is a generated export from `assets/logos/`.
- Fonts come from `assets/fonts/` with licenses recorded.

## Design guidance

- Keep the menu readable at boot resolution (e.g. 1080p) and on small fonts.
- Prefer a small, fixed number of entries; avoid clutter.
- Branding must not obscure menu selection or error/diagnostic text.

## Related

- `README.md`
- `CONFIGURATION.md`
- `BRANDING.md`
- `ASSET-PIPELINE.md`
