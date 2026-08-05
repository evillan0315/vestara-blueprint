---
id: "os-grub-configuration"
title: "GRUB — Configuration"
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
tags: ["os", "grub", "configuration", "boot"]
---

# GRUB — Configuration

## Purpose

Describe the declarative GRUB configuration model used by the image builder:
menu entries, kernel parameters, default entry, timeout, and recovery menu.

## Configuration model

Configuration is written as a template consumed by the image builder, not
hand-edited on the target:

```text
configs/grub/
├── default          GRUB_DEFAULT, GRUB_TIMEOUT
├── grub.cfg.template  generated from declared entries
└── theme.txt        branding (see THEMING.md)
```

## Menu entries

| Entry | Purpose |
|-------|---------|
| Vestara AI OS | primary boot entry |
| Recovery | diagnostic/recovery partition |
| Previous A/B slot | rollback entry when A/B slots exist |
| UEFI settings | firmware entry passthrough |

## Kernel parameters

Kernel parameters are declared centrally so boot, recovery, and fallback
entries share one source:

- quiet / splash behavior coordinated with Plymouth;
- dm-verity / encryption options (see `11-security`);
- console / serial for diagnostics;
- recovery flags (single-user, fail-safe).

## Default & timeout

- Default entry: Vestara AI OS.
- Timeout: declared, branded; short on production images, longer in recovery.
- `GRUB_TIMEOUT_STYLE` and hidden-menu behavior are configurable per image
  profile.

## Secure Boot considerations

- Kernel must be signed for Secure Boot enrollment.
- GRUB config and kernel params should be verified/hashed where the threat
  model requires (see `11-security`).

## Related

- `README.md`
- `THEMING.md`
- `TROUBLESHOOTING.md`
- `BOOT-SEQUENCE.md`
