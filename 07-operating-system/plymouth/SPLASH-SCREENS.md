---
id: "os-plymouth-splash-screens"
title: "Plymouth — Splash Screens"
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
tags: ["os", "plymouth", "splash"]
---

# Plymouth — Splash Screens

## Purpose

Describe the splash-screen variants and their fallback behavior.

## Variants

| Variant | When shown | Presentation |
|---------|------------|--------------|
| Standard splash | normal boot | branded animation |
| Silent boot | `quiet` kernel param | minimal/no splash, fast boot |
| Recovery splash | recovery entry boot | distinct branding, diagnostics visible |
| Emergency mode | critical failure | text mode, no dependency on assets |

## Behavior rules

- Standard and silent splash share brand tokens.
- Recovery must remain diagnosable: service status must not be hidden.
- Emergency mode must never depend on the animation module or GPU.
- The splash must not mask boot failures; errors surface promptly.

## Evidence

Splash screens are validated with screenshot capture per variant where the
variant can be booted in a test environment (see `VALIDATION.md`).

## Related

- `README.md`
- `THEMES.md`
- `ANIMATIONS.md`
- `TROUBLESHOOTING.md` (`grub/`)
