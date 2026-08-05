---
id: "os-image-builder"
title: "Image Builder — Declarative Image Generation"
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
tags: ["os", "image-builder", "iso", "release"]
---

# Image Builder — Declarative Image Generation

## Purpose

Document the canonical image builder: a declarative pipeline that consumes
configuration, assets, and packages and produces reproducible, validated
images (ISO, disk image, QEMU qcow2, container rootfs, VM image). No manual
editing occurs after the build starts.

## Pipeline

```text
Git Repository
      ↓
Configuration (declarative)
      ↓
Assets (content-addressed)
      ↓
Packages (pinned versions)
      ↓
Filesystem (layout & partitions)
      ↓
Customization (branding, login, services)
      ↓
Validation (boot, login, desktop, workspace)
      ↓
ISO / USB image / qcow2 / rootfs / release
```

## Declarative inputs

The builder consumes only declarative configuration. A single `image.yaml`
blueprint references the other declarative inputs:

```yaml
# image.yaml (target shape)
blueprint:
  assets: ../assets/
  configs: ../configs/
  packages: ../packages.yaml
  validation: ../validation.yaml
outputs:
  - iso
  - img
  - qcow2
  - docker-rootfs
  - vm-image
```

See `image-builder/BLUEPRINT.md` for the full schema and `image-builder/BUILD.md`
for the concrete build steps.

## Reproducibility

- Pin package versions (`image-builder/PACKAGES.md`).
- Content-address assets (`ASSET-PIPELINE.md`).
- Set `SOURCE_DATE_EPOCH` for reproducible timestamps (already used by the
  OS-2 archive scripts).
- Emit a content-addressed manifest alongside every artifact so an image can be
  reproduced or audited from its manifest alone.

## Current-state mapping

The OS-1/OS-2/OS-3 scripts in `vestara-ai-core/` are the first concrete steps
toward this pipeline:

```bash
pnpm os1:plan                                          # portable staging tree
node scripts/os1-portable-drive.mjs stage --output /tmp/vestara-portable-drive --clean
pnpm os2:plan                                          # deterministic archive
node scripts/os2-portable-drive.mjs image --source /tmp/vestara-os1 --output /tmp/vestara-os2.tar
node scripts/os2-portable-drive.mjs verify --image /tmp/vestara-os2.tar
pnpm os3:plan                                          # controlled installation
node scripts/os3-installer.mjs install --image /tmp/vestara-os2.tar --target /opt/vestara
```

A hardware-bootable GPT/UEFI image is generated with:

```bash
sudo pnpm os:image -- --output /tmp/vestara.img --size 16G
```

These produce deterministic archives and filesystem-tree installs, but are not
yet the full validation pipeline described here.

## Related

- `ARCHITECTURE.md`
- `VALIDATION.md`
- `ASSET-PIPELINE.md`
- `image-builder/BLUEPRINT.md`
- `image-builder/BUILD.md`
- `image-builder/RELEASES.md`
- `15-devops/`
