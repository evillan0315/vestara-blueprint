---
id: "os-image-builder-filesystem"
title: "Image Builder — Filesystem Layout"
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
tags: ["os", "image-builder", "filesystem"]
---

# Image Builder — Filesystem Layout

## Purpose

Define the partition layout and filesystem choices for a bootable Vestara OS
image.

## Target layout

```text
┌──────────────────────────────────┐
│ EFI System Partition (ESP)        │  GRUB + UEFI binaries
├──────────────────────────────────┤
│ Root A (active)                   │  immutable system slot
├──────────────────────────────────┤
│ Root B (inactive)                 │  update slot
├──────────────────────────────────┤
│ Persistence / data partition      │  encrypted, user & workspace data
├──────────────────────────────────┤
│ Recovery partition                │  recovery image, diagnostics
└──────────────────────────────────┘
```

## Design decisions

- **Immutable A/B roots** for atomic updates and instant rollback.
- **Encrypted persistence** (LUKS2) for user and workspace data.
- **Recovery partition** for self-healing boot and diagnostics.
- GPT partitioning with UEFI boot (matching the OS-2 `os:image` GPT/UEFI
  target).

## Current-state mapping

The OS-2 archive is a filesystem-tree TAR, not a partitioned image. It "does
not format disks, write `/dev/*`, install a bootloader, or change the current
machine." A GPT/UEFI hardware-bootable image is produced by
`pnpm os:image` with EFI System Partition + ext4 root, but it has no A/B
slots, encryption, or recovery partition yet.

## Related

- `README.md`
- `BLUEPRINT.md`
- `PACKAGES.md`
- `ARCHITECTURE.md`
