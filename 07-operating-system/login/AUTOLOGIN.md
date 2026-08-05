---
id: "os-login-autologin"
title: "Login — Autologin & Kiosk Mode"
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
tags: ["os", "login", "autologin", "kiosk"]
---

# Login — Autologin & Kiosk Mode

## Purpose

Document autologin and kiosk-mode profiles, which bypass interactive
authentication for trusted or single-purpose images.

## Autologin

- Autologin automatically starts the Vestara workspace session for a declared
  user.
- Configurable per image profile; disabled by default for shared/security-
  sensitive images.
- The autologin user is provisioned at build time (or by the first-boot
  wizard).

## Kiosk mode

- A locked-down profile that starts a single-purpose workspace session.
- No interactive user switching; minimal surface area.
- Pairs with policy lockdown (see `11-security`).

## Security

Autologin and kiosk modes trade authentication for convenience. They must be
explicit profile choices, never the default for general-purpose images, and
must be documented in the image manifest.

## Validation

- Autologin reaches `workspace-ready` without prompts (evidence).
- Kiosk mode locks to the declared session and blocks user switching.

## Related

- `README.md`
- `PROFILES.md`
- `SESSION.md`
- `11-security/`
