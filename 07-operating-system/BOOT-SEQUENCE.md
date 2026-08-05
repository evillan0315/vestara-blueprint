---
id: "os-boot-sequence"
title: "Boot Sequence — Firmware to Workspace"
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
tags: ["os", "boot", "grub", "plymouth", "systemd"]
---

# Boot Sequence — Firmware to Workspace

## Purpose

Describe the end-to-end boot sequence of a Vestara OS image, from power-on to
the Vestara Workspace, and where each stage's configuration and evidence live.

## Sequence

```text
Firmware (UEFI)
      ↓
GRUB (boot menu, branding, Secure Boot)
      ↓
Linux Kernel
      ↓
initramfs (Plymouth splash)
      ↓
systemd (targets & service graph)
      ↓
Vestara service composition (Host Runtime → API → Workspace Runtime)
      ↓
health verification
      ↓
workspace-ready (desktop / workspace session)
```

## Stage ownership

| Stage | Config source | Presentation |
|-------|---------------|--------------|
| Firmware → GRUB | `grub/` docs, `os/customization/grub/` | GRUB theme |
| Kernel → initramfs | distribution kernel + `plymouth/` docs | Plymouth splash |
| systemd targets | `systemd/` docs, `os/systemd/vestara.target` | boot messages |
| Vestara composition | `os/systemd/vestara-*.service` | service status |
| readiness | `os-0-host-integration.md` Boot Runtime stages | — |

## Implemented subset (OS-0)

Boot Runtime persists this ordered lifecycle (cannot be skipped or reversed):

```text
firmware-complete → host-started → storage-mounted → identity-loaded
  → services-started → runtime-composed → health-verified → workspace-ready
```

OS-0 does not control firmware, the Linux kernel, or initramfs. The bootloader,
splash, and login stages above are target design.

## Boot validation

Each stage is a candidate for evidence: GRUB menu presence, splash screenshots,
service startup timing, and reachability of `workspace-ready`. See
`VALIDATION.md`.

## Related

- `ARCHITECTURE.md`
- `grub/README.md`
- `plymouth/README.md`
- `systemd/README.md`
- `os-0-host-integration.md`
