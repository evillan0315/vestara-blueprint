---
id: "os-login-gdm"
title: "Login — GDM"
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
tags: ["os", "login", "gdm"]
---

# Login — GDM

## Purpose

Describe GDM (GNOME Display Manager) integration for desktop-image profiles.

## Scope

- Theme and logo applied via GDM's theming mechanisms.
- Wallpaper/background from `assets/`.
- Session selection to the Vestara workspace.
- Autologin support (see `AUTOLOGIN.md`).

## Notes

- GDM runs before the user session; branding must not require the workspace.
- Monitor scaling and resolution defaults are declared per image profile.
- GDM is one supported display manager; selection is a declarative image
  choice (see `PROFILES.md`).

## Validation

- Login screen renders with the brand theme (screenshot evidence).
- Session starts and reaches the workspace.
- Autologin (when enabled) reaches the workspace without prompts.

## Related

- `README.md`
- `PROFILES.md`
- `SESSION.md`
- `AUTOLOGIN.md`
