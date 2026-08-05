---
id: "os-login-sddm"
title: "Login — SDDM"
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
tags: ["os", "login", "sddm"]
---

# Login — SDDM

## Purpose

Describe SDDM (Simple Desktop Display Manager) integration for desktop-image
profiles.

## Scope

- Theme, logo, and background applied via SDDM's theme directories.
- Session selection to the Vestara workspace.
- Autologin support (see `AUTOLOGIN.md`).

## Notes

- SDDM themes are declarative inputs to the image build, sourced from
  `assets/`.
- SDDM must not depend on the API; the login screen renders before services
  are verified.
- Selection of SDDM vs GDM vs LightDM is an image-profile choice
  (`PROFILES.md`).

## Validation

- Login screen renders with the brand theme (screenshot evidence).
- Session starts and reaches the workspace.
- Autologin (when enabled) reaches the workspace without prompts.

## Related

- `README.md`
- `PROFILES.md`
- `SESSION.md`
- `AUTOLOGIN.md`
