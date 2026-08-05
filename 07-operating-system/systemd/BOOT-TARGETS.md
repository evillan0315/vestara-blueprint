---
id: "os-systemd-boot-targets"
title: "Systemd — Boot Targets"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.0.0"
status: "proposed"
owner: "@devops-engineer"
created: "2026-08-03"
last-reviewed: "2026-08-03"
next-review: "2026-11-03"
architecture-status: "proposed"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main"
tags: ["os", "systemd", "targets", "boot"]
---

# Systemd — Boot Targets

## Purpose

Describe the systemd targets that organize the Vestara boot.

## Target model

```text
Firmware → GRUB → kernel + initramfs → systemd
      ↓
multi-user.target
      ↓
vestara.target
  ├── vestara-host.service
  ├── vestara-api.service
  └── vestara-workspace.service
      ↓
graphical.target (desktop) / workspace session
```

## Targets

| Target | Role |
|--------|------|
| `multi-user.target` | base multi-user boot; `vestara.target` is wanted by it |
| `vestara.target` | Vestara host-mode grouping; requires host, api, workspace |
| `graphical.target` | desktop session when the image includes a display manager |

## Ordering

`vestara.target` requires the three Vestara services and starts after
`vestara-workspace.service`. The OS-1 staging tree enables `vestara.target`
from `multi-user.target` and enables all Vestara services under that target.

## Related

- `README.md`
- `STARTUP-SERVICES.md`
- `DEPENDENCIES.md`
- `BOOT-SEQUENCE.md`
