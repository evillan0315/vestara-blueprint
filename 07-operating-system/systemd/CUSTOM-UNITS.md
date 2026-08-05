---
id: "os-systemd-custom-units"
title: "Systemd — Custom & Presentation Units"
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
tags: ["os", "systemd", "units"]
---

# Systemd — Custom & Presentation Units

## Purpose

Describe where optional, custom, or presentation-only systemd units live and
the rules they must follow.

## Location

The authoritative operational units are `os/systemd/`. Optional
presentation-only units (e.g. a boot message bridge or a Plymouth-ready
notification) live under `os/customization/systemd/`.

## Rules for custom units

- Startup ordering and readiness belong in the authoritative units, not in
  presentation units.
- Presentation units must not hide service failures.
- A presentation unit must not make the API a hard dependency of the bootloader.
- `vestara-host`, `vestara-api`, and `vestara-workspace` remain the
  operational authority.

## Example

A Plymouth-ready boot message unit may report staged progress from Boot
Runtime, but it must degrade gracefully (no splash / text) when the API is
unhealthy.

## Related

- `README.md`
- `BOOT-TARGETS.md`
- `DEPENDENCIES.md`
- `plymouth/README.md`
