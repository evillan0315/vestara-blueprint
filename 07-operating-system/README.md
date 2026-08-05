---
title: "Vestara OS & Image Platform — Volume Overview"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.2.0"
status: "approved"
owner: "@devops-engineer"
last-reviewed: "2026-08-03"
next-review: "2026-11-03"
tags: ["os", "operating-system", "image-builder", "grub", "plymouth", "systemd", "login", "branding"]
---

# Volume 07: Operating System
## The OS as a Reproducible, Observable Engineering Artifact

> **Mission**: Build an immutable, portable AI operating system that boots from
> external SSD on any x86-64 computer — zero installation, zero configuration,
> instant productivity — where the operating system itself is a first-class,
> reproducible engineering product.

The operating system is treated as part of the product rather than as
deployment infrastructure. Everything the image produces — branding, boot
presentation, service configuration, login experience — originates from a
single source of truth in `vestara-ai-core/os/`, and the image builder consumes
only declarative configuration. No manual editing occurs after a build starts,
and every stage emits evidence.

## Current implementation status

Vestara is not yet a bootable distribution. OS-0 Host Integration is implemented
and verified: Linux/systemd can start the Vestara service composition, Host
Runtime provides typed read-only machine inspection, and Boot Runtime persists
ordered progress through `workspace-ready`.

See [OS-0 Host Integration](os-0-host-integration.md) and ADR-114. ISO generation,
bootloader/initramfs integration, partitioning, encrypted portable persistence,
A/B updates, Secure Boot, recovery images, and installers remain future work.

OS-1 (portable staging tree), OS-2 (deterministic image archive), and OS-3
(controlled installation) have working plan scripts and staged implementation in
`vestara-ai-core/os/portable-drive/`; they are not verified bootable images.

---

## 📋 Volume Contents

```
07-operating-system/
│
├── README.md                              ← This file
├── os-0-host-integration.md               ← Implemented Linux host foundation
├── provider-installation.md               ← Future installer capabilities
│
├── ARCHITECTURE.md                        ← OS layers & component architecture
├── IMAGE-BUILDER.md                       ← Declarative image generation pipeline
├── ASSET-PIPELINE.md                      ← Branding asset source & versioning
├── BOOT-SEQUENCE.md                       ← Firmware → GRUB → Kernel → systemd → Desktop
├── BRANDING.md                            ← Brand system & visual identity
├── VALIDATION.md                          ← Boot/login/workspace evidence pipeline
│
├── grub/                                  ← UEFI/GRUB menu theme & configuration
│   ├── README.md
│   ├── CONFIGURATION.md
│   ├── THEMING.md
│   └── TROUBLESHOOTING.md
│
├── plymouth/                              ← Kernel/initramfs boot splash
│   ├── README.md
│   ├── THEMES.md
│   ├── ANIMATIONS.md
│   └── SPLASH-SCREENS.md
│
├── systemd/                               ← Startup targets, services, dependencies
│   ├── README.md
│   ├── BOOT-TARGETS.md
│   ├── STARTUP-SERVICES.md
│   ├── DEPENDENCIES.md
│   └── CUSTOM-UNITS.md
│
├── login/                                 ← Display manager & session profiles
│   ├── README.md
│   ├── GDM.md
│   ├── SDDM.md
│   ├── AUTOLOGIN.md
│   ├── PROFILES.md
│   └── SESSION.md
│
├── image-builder/                         ← Builder blueprint, filesystem, packages
│   ├── README.md
│   ├── BLUEPRINT.md
│   ├── FILESYSTEM.md
│   ├── PACKAGES.md
│   ├── CUSTOMIZATION.md
│   ├── BUILD.md
│   ├── VALIDATION.md
│   └── RELEASES.md
│
└── assets/                                ← Branding assets consumed by the builder
    ├── README.md
    ├── metadata.json
    ├── logos/
    ├── wallpapers/
    ├── boot/
    ├── login/
    ├── icons/
    ├── fonts/
    └── sounds/
```

The **source of truth** for implemented OS artifacts is `vestara-ai-core/os/`
(systemd units, portable-drive scripts, and the `customization/` presentation
layer). Blueprint docs describe the target design; the ai-core directory is
executable truth.

---

## 🖥️ OS Architecture Principles

| Principle | Implementation |
|-----------|----------------|
| **Portable** | Boots any x86-64 via UEFI, zero host dependencies |
| **Immutable** | A/B root partitions, atomic updates, instant rollback |
| **Secure** | Secure Boot, dm-verity, LUKS2 encryption, TPM2 measured boot |
| **Self-Healing** | Automatic rollback on boot failure, recovery partition |
| **Minimal** | Only necessary services, no bloat |
| **AI-Optimized** | Pre-configured for AI workloads, GPU drivers, local models |
| **Updatable** | Atomic over-the-air updates with verification |
| **Reproducible** | Declarative config + content-addressed assets → deterministic images |
| **Observable** | Every build stage emits verifiable evidence, not just logs |

The table above is the target distribution architecture, not the current
implementation claim. The implemented OS-0 subset is intentionally smaller.

---

## 🗺️ OS Milestones

| Milestone | Focus | Status |
|-----------|-------|--------|
| OS-0 | Linux Host Integration — `host status`, `boot status` | ✅ Implemented and verified |
| OS-1 | Portable staging tree — systemd-bootable under a Linux root | 📋 Planned |
| OS-2 | Reproducible bootable image — deterministic archive / GPT image | 📋 Planned |
| OS-3 | Immutable A/B Vestara OS — controlled install + trial boot + rollback | 🔮 Future |
| OS-4 | Hardware portability certification | 🔮 Future |

The image-platform **workstreams** (assets, configuration repository, boot
branding, login experience, image builder, validation pipeline, release
pipeline) feed the milestones above. See `20-roadmaps/V1.0-ROADMAP.md` for the
canonical milestone list.

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `04-platform` | Platform services run on OS |
| `11-security` | Secure Boot, encryption, threat model |
| `15-devops` | OS image build, CI/CD for updates |
| `08-cloud` | Cloud-managed updates (Gen 3) |

---

**END OF OS VOLUME OVERVIEW**

*The OS is the foundation. Everything runs on it, but users should never need to think about it.*
