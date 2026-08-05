---
id: "os-grub"
title: "GRUB — Bootloader Configuration & Theming"
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
tags: ["os", "grub", "bootloader", "uefi"]
---

# GRUB — Bootloader Configuration & Theming

## Purpose

Document how GRUB presents the Vestara OS boot menu, applies the brand theme,
and participates in the boot chain. GRUB configuration and theming are
declarative inputs to the image builder, sourced from `os/customization/grub/`.

## What GRUB owns

- Boot menu and default entry selection.
- Kernel / initramfs loading and kernel parameters.
- Boot branding (theme, fonts, resolution, background, timeout).
- Recovery menu entries.
- Secure Boot considerations.
- Fallback/recovery booting.

## Source of truth

The implementation source tree lives at `vestara-ai-core/os/customization/grub/`
(e.g. `theme.txt`). This directory documents the target design; the ai-core
tree is executable truth.

## Design coverage

- [CONFIGURATION.md](CONFIGURATION.md) — boot entries, kernel params, default/timeout, recovery menu.
- [THEMING.md](THEMING.md) — theme files, fonts, resolution, branding.
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — common boot problems and fixes.

## Boot-chain position

```text
UEFI firmware → GRUB → kernel + initramfs → systemd → Vestara
```

GRUB sits below the kernel. It cannot assume the Vestara services are healthy;
it must remain bootable and diagnosable independently.

## Related

- `BOOT-SEQUENCE.md`
- `BRANDING.md`
- `11-security/` (Secure Boot)
