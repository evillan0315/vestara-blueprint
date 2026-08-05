---
id: "os-plymouth-animations"
title: "Plymouth — Animations"
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
tags: ["os", "plymouth", "animation"]
---

# Plymouth — Animations

## Purpose

Describe the splash animation timeline: how the logo is rendered, how progress
is animated, and how the animation behaves across boot.

## Animation timeline

```text
power-on (logo fade-in)
      ↓
kernel / initramfs (spinner or progress bar)
      ↓
systemd handoff (transition)
      ↓
desktop / workspace (splash ends)
```

## Design

- Logo rendering: the branded mark fades/scales in using exported raster.
- Progress: a subtle progress indicator (bar or spinner) maps to boot progress
  without implying a precise percentage.
- Fallback: if the animation module cannot run, a static logo or text mode is
  shown.
- GPU fallback: when no accelerated console exists, Plymouth uses a compatible
  renderer with the same brand tokens.

## Constraints

- Keep the splash independent of Vestara service health; the animation must not
  require the API.
- Keep frame cost low; boot speed matters.
- Use brand colors from `assets/colors.json`, not per-surface values.

## Related

- `README.md`
- `THEMES.md`
- `SPLASH-SCREENS.md`
- `BRANDING.md`
