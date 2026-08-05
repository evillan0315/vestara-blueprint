---
id: "os-architecture"
title: "OS Architecture — Layers & Components"
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
tags: ["os", "architecture", "layers", "image"]
---

# OS Architecture — Layers & Components

## Purpose

Describe the target layer model of the Vestara OS and Image Platform: what the
image contains, how the layers relate, and where each component's source of
truth lives. This is the target distribution architecture; only OS-0 is
implemented today.

## Layer model

```text
┌─────────────────────────────────────────────┐
│  Vestara Workspace (user-facing product)     │
├─────────────────────────────────────────────┤
│  Desktop session & login (display manager)   │
├─────────────────────────────────────────────┤
│  Vestara service composition (systemd)       │
├─────────────────────────────────────────────┤
│  Host Runtime / Boot Runtime / Kernel        │
├─────────────────────────────────────────────┤
│  Base operating system (userspace packages)  │
├─────────────────────────────────────────────┤
│  Linux kernel + initramfs                    │
├─────────────────────────────────────────────┤
│  Bootloader (GRUB) + firmware (UEFI)         │
└─────────────────────────────────────────────┘
```

## Layer responsibilities

| Layer | Responsibility | Source of truth |
|-------|----------------|-----------------|
| Bootloader | Present boot menu, load kernel/initramfs, Secure Boot | `os/customization/grub/` |
| Kernel + initramfs | Hardware bring-up, root mount, splash handoff | distribution package |
| Base OS | userspace, package set, filesystem layout | `image-builder/PACKAGES.md`, `FILESYSTEM.md` |
| Host Runtime | read-only machine inspection (OS-0) | `@vestara/host-runtime` |
| Boot Runtime | ordered boot stages through `workspace-ready` (OS-0) | `@vestara/boot-runtime` |
| Service composition | systemd units and targets | `os/systemd/*` |
| Login + session | display manager, profiles, autologin | `login/` docs |
| Workspace | AI engineering product the OS hosts | `06-workspace` |

## Cross-cutting concerns

- **Branding** is a single layer that feeds bootloader, splash, login, and
  desktop presentation from one asset source (`assets/`).
- **Observability**: boot stages, service health, and image validation all
  emit evidence that becomes part of the engineering evidence model.
- **Immutability**: only A/B root slots are writable targets; generated images
  are deterministic and content-addressed.
- **Reproducibility**: every layer is derived from declarative configuration,
  never from manual post-build edits.

## Related

- `README.md`
- `IMAGE-BUILDER.md`
- `BOOT-SEQUENCE.md`
- `os-0-host-integration.md`
- `04-platform/engineering-operating-system.md`
