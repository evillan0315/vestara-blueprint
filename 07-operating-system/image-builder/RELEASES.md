---
id: "os-image-builder-releases"
title: "Image Builder — Releases"
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
tags: ["os", "image-builder", "releases"]
---

# Image Builder — Releases

## Purpose

Define the release pipeline for generated images: versioning, signing,
checksums, and release notes.

## Release pipeline

```text
validated image outputs
      ↓
version (semver, channel)
      ↓
checksums (SHA-256 manifest)
      ↓
signature (image + manifest)
      ↓
release notes (what changed, evidence links)
      ↓
publish (artifact store, update channel)
```

## Requirements

- **Signed releases**: images and manifests are signed before publication.
- **Versioned artifacts**: every artifact carries a version and channel.
- **Build manifests**: full input hashes recorded for reproducibility.
- **Checksums**: SHA-256 manifest published alongside each artifact.
- **Release notes**: changes, validation evidence, and known issues.

## Channels

`stable` for general release; `testing`/`dev` for pre-release images. Channel
selection is part of the blueprint (`release.channel`).

## Relation to updates

Releases feed the atomic A/B update mechanism (see `ARCHITECTURE.md` and
`08-cloud`). The image is versioned so a running system can verify and roll
back.

## Related

- `README.md`
- `VALIDATION.md`
- `BUILD.md`
- `15-devops/`
