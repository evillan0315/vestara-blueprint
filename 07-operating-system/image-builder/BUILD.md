---
id: "os-image-builder-build"
title: "Image Builder — Build"
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
tags: ["os", "image-builder", "build"]
---

# Image Builder — Build

## Purpose

Document the concrete build steps and tooling for generating images from a
blueprint.

## Build steps

```text
1. Resolve blueprint + references
2. Validate inputs (assets, config, packages, versions)
3. Assemble filesystem (partition layout per FILESYSTEM.md)
4. Install packages (pinned set per PACKAGES.md)
5. Apply customization (branding, login, services)
6. Install bootloader + kernel + initramfs
7. Validate the result (build gates per VALIDATION.md)
8. Generate outputs (ISO, IMG, QCOW2, rootfs, VM image)
9. Sign + checksum + manifest (RELEASES.md)
```

## Current-state tooling

The first concrete builders exist in `vestara-ai-core`:

```bash
pnpm os1:plan
node scripts/os1-portable-drive.mjs stage --output /tmp/vestara-portable-drive --clean
pnpm os2:plan
node scripts/os2-portable-drive.mjs image --source /tmp/vestara-os1 --output /tmp/vestara-os2.tar
pnpm os3:plan
node scripts/os3-installer.mjs install --image /tmp/vestara-os2.tar --target /opt/vestara
sudo pnpm os:image -- --output /tmp/vestara.img --size 16G
```

Set `SOURCE_DATE_EPOCH` for reproducible timestamps. The OS-2/OS-3 tools
refuse to touch the running machine (no disk format, no `/dev/*`, no
bootloader install); `os:image` writes only the image file.

## Determinism

- Pinned packages + content-addressed assets + `SOURCE_DATE_EPOCH`.
- Manifest records every input hash so a build can be reproduced or audited.

## Related

- `README.md`
- `BLUEPRINT.md`
- `FILESYSTEM.md`
- `VALIDATION.md`
