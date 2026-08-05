---
id: "os-grub-troubleshooting"
title: "GRUB — Troubleshooting"
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
tags: ["os", "grub", "troubleshooting", "recovery"]
---

# GRUB — Troubleshooting

## Purpose

Capture common GRUB boot failures and their diagnostics, so boot problems can
be triaged without the Vestara services being available.

## Common failures

| Symptom | Likely cause | Diagnostic |
|---------|--------------|------------|
| No GRUB menu | theme/config parse error | validate config before embedding |
| `error: no such partition` | root partition moved/not found | confirm partition UUID in entry |
| Hang at GRUB | font/image asset missing or wrong format | verify theme assets exist in image |
| Recovery entry missing | entry not declared in template | check `configs/grub/` declaration |
| Boots to fallback only | A/B slot invalid | check slot state and recovery entry |

## Diagnostics that do not depend on Vestara

- GRUB command line (`c` at the menu) for manual booting.
- Confirm kernel/initramfs paths are present.
- Confirm `theme.txt` and fonts resolve within the image.
- Check firmware boot order (UEFI) to confirm GRUB is the active loader.

## Validation hook

GRUB config and theme are validated at image-build time (parse check, asset
existence, resolution) so the most common failures never reach a user. See
`VALIDATION.md`.

## Related

- `README.md`
- `CONFIGURATION.md`
- `THEMING.md`
