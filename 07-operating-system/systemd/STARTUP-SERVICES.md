---
id: "os-systemd-startup-services"
title: "Systemd — Startup Services"
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
tags: ["os", "systemd", "services"]
---

# Systemd — Startup Services

## Purpose

Document each Vestara systemd service: purpose, lifecycle, and operational
behavior.

## Services

### `vestara-host.service`

Read-only host preflight. Runs `@vestara/host-runtime` inspection
(hostname, kernel, CPU, memory, mounts, network, systemd availability). It is
the first Vestara service.

### `vestara-api.service`

The kernel, runtimes, and API composition. Requires `vestara-host.service`,
waits for `network-online.target`, and runs `apps/api/dist/index.js` with the
`vestara` service identity. Serves the API on `VESTARA_API_PORT=3001`.

### `vestara-workspace.service`

Readiness verification. Runs after the API so the composition reaches
`workspace-ready` only when healthy.

## Common unit properties

The reviewed units enforce a minimal-attack-surface service profile:

| Property | Value |
|----------|-------|
| `User` / `Group` | `vestara` |
| `NoNewPrivileges` | yes |
| `PrivateTmp` | yes |
| `ProtectSystem` | strict |
| `ProtectHome` | read-only |
| `ReadWritePaths` | `/var/lib/vestara`, `/opt/vestara/.vestara` |
| `Restart` | on-failure |

## Per-service documentation contract

Each service documents: purpose, dependencies, startup order, timeout, restart
policy, logging, and validation.

## Related

- `README.md`
- `BOOT-TARGETS.md`
- `DEPENDENCIES.md`
- `os-0-host-integration.md`
