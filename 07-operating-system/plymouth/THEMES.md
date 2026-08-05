---
id: "os-plymouth-themes"
title: "Plymouth — Themes"
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
tags: ["os", "plymouth", "theme"]
---

# Plymouth — Themes

## Purpose

Describe the structure and packaging of a Vestara Plymouth theme.

## Theme structure

A production theme provides:

- a `.plymouth` descriptor declaring name, module, and assets;
- a script or animation module rendering the splash;
- reviewed logo/background assets from `assets/`.

```text
themes/vestara/
├── vestara.plymouth      descriptor
├── script/               animation script
├── logo.png              branded logo (exported from assets)
└── background.png        boot background
```

## Packaging

- Themes are packaged into the image as files (initramfs or root) and selected
  via `plymouth-set-default-theme` during the build.
- Assets are exported from `assets/`; licenses are recorded.
- A theme must fall back gracefully (text/emergency) when its assets or the
  GPU are unavailable.

## Validation

- Theme parses (`plymouthd` accepts the descriptor).
- Required assets exist and have correct format/dimensions.
- Screenshot evidence is captured for the default theme (see `VALIDATION.md`).

## Related

- `README.md`
- `ANIMATIONS.md`
- `SPLASH-SCREENS.md`
- `BRANDING.md`
