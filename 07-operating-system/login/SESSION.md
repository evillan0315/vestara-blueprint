---
id: "os-login-session"
title: "Login — Session Startup"
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
tags: ["os", "login", "session"]
---

# Login — Session Startup

## Purpose

Describe how a login transitions into a Vestara workspace session.

## Sequence

```text
display manager / terminal login
      ↓
user session starts (profile-scoped)
      ↓
session services launch (per profile)
      ↓
workspace launcher / shell starts
      ↓
workspace-ready (product visible)
```

## Session contract

- The session inherits the health of `vestara.target`: it starts only when the
  composition is ready.
- Per-profile startup (dev tools, kiosk lock, diagnostics) is declared, not
  ad-hoc.
- Session failure must be diagnosable (return to login or recovery without
  masking errors).

## Validation

- Session reaches the workspace (screenshot evidence).
- Per-profile startup applies (dev session has tools; kiosk is locked).
- Failure paths surface a diagnosable state rather than a hang.

## Related

- `README.md`
- `PROFILES.md`
- `AUTOLOGIN.md`
- `systemd/BOOT-TARGETS.md`
