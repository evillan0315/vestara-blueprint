---
id: "os-plymouth"
title: "Plymouth — Kernel/Initramfs Boot Splash"
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
tags: ["os", "plymouth", "splash", "boot"]
---

# Plymouth — Kernel/Initramfs Boot Splash

## Purpose

Document the Plymouth boot splash: the branded animation shown during kernel
and initramfs bring-up, before systemd and the desktop session take over.

## What Plymouth owns

- Branded splash sequence during early boot.
- Logo rendering and progress animation.
- GPU fallback when no accelerated console is available.
- Coordination with silent boot (`quiet` kernel parameter).
- Emergency-mode messaging.

## Source of truth

The implementation templates live at `vestara-ai-core/os/customization/plymouth/`
(`vestara.plymouth.example`, `vestara.script.example`). Keep the splash
independent of the API so boot remains diagnosable when Vestara services are
unhealthy.

## Design coverage

- [THEMES.md](THEMES.md) — theme structure, `.plymouth` descriptor, packaging.
- [ANIMATIONS.md](ANIMATIONS.md) — logo animation, timeline, progress.
- [SPLASH-SCREENS.md](SPLASH-SCREENS.md) — splash variants and fallbacks.

## Related

- `BOOT-SEQUENCE.md`
- `BRANDING.md`
- `grub/README.md`
