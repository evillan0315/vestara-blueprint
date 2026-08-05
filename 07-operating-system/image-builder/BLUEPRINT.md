---
id: "os-image-builder-blueprint"
title: "Image Builder — Blueprint Schema"
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
tags: ["os", "image-builder", "blueprint"]
---

# Image Builder — Blueprint Schema

## Purpose

Define the declarative blueprint that describes an image build. The builder
consumes only the blueprint and its references; nothing is edited after the
build starts.

## Blueprint shape

```yaml
# image.yaml
name: vestara-os-desktop
profile: desktop                 # see login/PROFILES.md
version: 1.0.0

references:
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

release:
  signer: <key id>
  channel: stable
```

## Reference contracts

| Reference | Consumed by | Documented in |
|-----------|-------------|---------------|
| `assets/` | branding, boot, login | `ASSET-PIPELINE.md` |
| `configs/` | grub, systemd, login | `grub/`, `systemd/`, `login/` |
| `packages.yaml` | package resolution | `PACKAGES.md` |
| `validation.yaml` | build gates | `VALIDATION.md` |

## Invariants

- The blueprint is content-addressed; identical inputs produce identical
  outputs.
- Output formats are declared, not inferred.
- The profile determines the display manager, login behavior, and startup
  target.
- Release metadata (signer, channel) is part of the blueprint.

## Related

- `README.md`
- `BUILD.md`
- `PACKAGES.md`
- `VALIDATION.md`
