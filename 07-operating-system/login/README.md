---
id: "os-login"
title: "Login — Display Manager & Session Profiles"
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
tags: ["os", "login", "display-manager", "session"]
---

# Login — Display Manager & Session Profiles

## Purpose

Document the login experience of the Vestara OS: display manager selection,
session profiles, autologin, and the first-run experience.

## What login owns

- Display manager (GDM / SDDM / LightDM) selection and theming.
- Autologin and kiosk mode.
- Session profiles (developer, production, recovery).
- First-boot wizard and user provisioning.
- Terminal login banner for headless/server images.

## Source of truth

The implementation notes for the presentation layer live at
`vestara-ai-core/os/customization/login/`. The login layer is selected
according to the image profile:

- headless/server image: terminal login and system status only;
- desktop image: display-manager theme and workspace launcher;
- recovery image: minimal diagnostic login with service status visible.

Do not place credentials or provider secrets in this layer.

## Design coverage

- [GDM.md](GDM.md) — GDM integration and theming.
- [SDDM.md](SDDM.md) — SDDM integration and theming.
- [AUTOLOGIN.md](AUTOLOGIN.md) — autologin and kiosk mode.
- [PROFILES.md](PROFILES.md) — image session profiles.
- [SESSION.md](SESSION.md) — session startup to the workspace.

## Related

- `BOOT-SEQUENCE.md`
- `BRANDING.md`
- `ARCHITECTURE.md`
