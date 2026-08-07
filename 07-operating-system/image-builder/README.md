---
id: "os-image-builder-readme"
title: "Image Builder — Overview"
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
tags: ["os", "image-builder"]
---

# Image Builder — Overview

## Purpose

Document the concrete image-builder component: its blueprint schema, filesystem
layout, package set, customization inputs, build steps, validation, and release
process. This directory is the detailed companion to the top-level
`IMAGE-BUILDER.md`.

## Directory map

```text
image-builder/
├── BLUEPRINT.md        image.yaml schema & references
├── FILESYSTEM.md       partition layout & filesystem choices
├── PACKAGES.md         package set & pinning
├── CUSTOMIZATION.md    branding/login/service customization inputs
├── BUILD.md            concrete build steps & tooling
├── VALIDATION.md       build-time validation gates
└── RELEASES.md         signed, versioned release pipeline
```

## Pipeline (summary)

```text
Git Repository → Configuration → Assets → Packages → Filesystem
  → Customization → Validation → ISO / IMG / QCOW2 / rootfs / release
```

## Related

- `IMAGE-BUILDER.md`
- `VALIDATION.md`
- `ASSET-PIPELINE.md`
- `15-devops/`

## Related documents

- [Image Builder — Blueprint Schema](BLUEPRINT.md)
- [Image Builder — Build](BUILD.md)
- [Image Builder — Customization](CUSTOMIZATION.md)
- [Image Builder — Filesystem Layout](FILESYSTEM.md)
- [Image Builder — Packages](PACKAGES.md)
- [Image Builder — Releases](RELEASES.md)
- [Image Builder — Build-Time Validation](VALIDATION.md)

