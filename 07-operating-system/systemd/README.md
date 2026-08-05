---
id: "os-systemd"
title: "Systemd — Startup Targets, Services & Dependencies"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.0.0"
status: "proposed"
owner: "@devops-engineer"
created: "2026-08-03"
last-reviewed: "2026-08-03"
next-review: "2026-11-03"
architecture-status: "proposed"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main"
tags: ["os", "systemd", "services", "boot"]
---

# Systemd — Startup Targets, Services & Dependencies

## Purpose

Document the systemd startup model for the Vestara OS: boot targets, service
startup order, dependencies, and where presentation-only units fit.

## Source of truth

The authoritative units live at `vestara-ai-core/os/systemd/`:

- `vestara-host.service` — read-only host preflight;
- `vestara-api.service` — the kernel, runtimes, and API composition;
- `vestara-workspace.service` — readiness verification;
- `vestara.target` — host-mode grouping.

`vestara.target` is the authoritative boot dependency. Keep startup ordering and
readiness in the service units; the `customization/systemd/` directory is for
optional presentation-only units.

## Design coverage

- [BOOT-TARGETS.md](BOOT-TARGETS.md) — targets and their roles.
- [STARTUP-SERVICES.md](STARTUP-SERVICES.md) — each service's purpose and lifecycle.
- [DEPENDENCIES.md](DEPENDENCIES.md) — ordering and readiness rules.
- [CUSTOM-UNITS.md](CUSTOM-UNITS.md) — presentation-only and custom units.

## Related

- `BOOT-SEQUENCE.md`
- `ARCHITECTURE.md`
- `os-0-host-integration.md`
