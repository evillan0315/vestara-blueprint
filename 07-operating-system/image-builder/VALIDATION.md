---
id: "os-image-builder-validation"
title: "Image Builder — Build-Time Validation"
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
tags: ["os", "image-builder", "validation"]
---

# Image Builder — Build-Time Validation

## Purpose

Define the validation gates the builder runs before producing a release image,
and the evidence each gate emits.

## Gates

| Gate | Checks | Evidence |
|------|--------|----------|
| Assets | dimensions, format, license, hashes | validated asset manifest |
| Configuration | grub/plymouth/systemd/login parse + existence | config validation report |
| Packages | pinned versions resolve | resolved package manifest |
| Services | `systemd-analyze verify` on supplied units | unit verification output |
| Filesystem | layout matches blueprint | filesystem manifest |
| Boot | image boots to a defined stage (QEMU) | boot log + screenshots |

## Evidence model

Validation emits content-addressed evidence consistent with the engineering
evidence model (PCS-026): each gate produces a verifiable artifact, and the
full set is published with the image. See `VALIDATION.md` for the top-level
pipeline.

## Failing a gate

A failed gate blocks the release; the build stops before outputs are signed.
No image is published without passing validation.

## Related

- `README.md`
- `VALIDATION.md`
- `BUILD.md`
- `RELEASES.md`
