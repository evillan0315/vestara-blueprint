---
id: "os-login-profiles"
title: "Login — Session Profiles"
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
tags: ["os", "login", "profiles"]
---

# Login — Session Profiles

## Purpose

Define the image session profiles and how each selects display manager, login
behavior, and the startup target.

## Profiles

| Profile | Display manager | Login | Startup |
|---------|-----------------|-------|---------|
| **Desktop** | GDM or SDDM | interactive or autologin | graphical target → workspace |
| **Developer** | GDM/SDDM | interactive, dev tools | graphical → workspace + dev session |
| **Server / headless** | none (terminal login) | terminal | `multi-user.target` / `vestara.target` |
| **Kiosk** | display manager | autologin, locked | single-purpose workspace session |
| **Recovery** | none | terminal, diagnostic | minimal services, service status visible |

## Selection

The profile is a declarative image-builder input; it determines which
components, display manager, and startup units the image embeds. The profile
name is recorded in the image manifest.

## First-boot wizard

Developer/desktop profiles run a first-boot wizard that provisions the user
and declares defaults; server and kiosk profiles provision deterministically
at build time.

## Related

- `README.md`
- `SESSION.md`
- `AUTOLOGIN.md`
- `ARCHITECTURE.md`
