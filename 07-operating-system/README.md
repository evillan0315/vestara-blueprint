---
title: "Operating System — Volume Overview"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.1.0"
status: "approved"
owner: "@devops-engineer"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
tags: ["os", "operating-system", "lxqt", "portable", "ssd"]
---

# Volume 07: Operating System
## From Verified Linux Host Integration to a Portable, Immutable Distribution

> **Mission**: Build an immutable, portable AI operating system that boots from external SSD on any x86-64 computer — zero installation, zero configuration, instant productivity.

## Current implementation status

Vestara is not yet a bootable distribution. OS-0 Host Integration is implemented
and verified: Linux/systemd can start the Vestara service composition, Host
Runtime provides typed read-only machine inspection, and Boot Runtime persists
ordered progress through `workspace-ready`.

See [OS-0 Host Integration](os-0-host-integration.md) and ADR-114. ISO generation,
bootloader/initramfs integration, partitioning, encrypted portable persistence,
A/B updates, Secure Boot, recovery images, and installers remain future work.

---

## 📋 Volume Contents

```
07-operating-system/
│
├── README.md                              ← This file
├── os-0-host-integration.md               ← Implemented Linux host foundation
├── OS_ARCHITECTURE.md                     ← OS layers & component architecture
├── LXQT_CUSTOMIZATION.md                  ← LXQt desktop environment customization
├── BOOT_PROCESS.md                        ← UEFI → GRUB → Kernel → Desktop
├── STARTUP_SEQUENCE.md                    ← Service startup & orchestration
├── SECURITY.md                            ← OS-level security architecture
│
├── branding/                              ← Boot splash, desktop theme, wallpapers
├── bootloader/                            ← GRUB configuration & theming
├── splash/                                ← Plymouth boot splash
├── login/                                 ← SDDM/LightDM login manager
├── desktop/                               ← LXQt panel, widgets, shortcuts
├── services/                              ← Systemd service units
├── filesystem/                            ← A/B partitions, overlayfs, encryption
├── drivers/                               ← Hardware detection & drivers
├── installer/                             ← SSD installation & provisioning
└── updates/                               ← Atomic A/B updates & rollback
```

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

The table above is the target distribution architecture, not the current
implementation claim. The implemented OS-0 subset is intentionally smaller.

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
