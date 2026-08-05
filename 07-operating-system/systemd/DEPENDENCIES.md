---
id: "os-systemd-dependencies"
title: "Systemd — Dependencies & Ordering"
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
tags: ["os", "systemd", "dependencies"]
---

# Systemd — Dependencies & Ordering

## Purpose

Describe how Vestara services are ordered and what "ready" means for each link
in the startup chain.

## Dependency graph

```text
multi-user.target
      └─ vestara.target
           ├─ Requires: vestara-host.service
           ├─ Requires: vestara-api.service
           ├─ Requires: vestara-workspace.service
           └─ After: vestara-workspace.service

vestara-api.service
      ├─ Requires: vestara-host.service
      └─ After: network-online.target, vestara-host.service
```

## Ordering rules

- Host preflight runs first; the API requires it.
- The API waits for `network-online.target` before serving.
- `vestara.target` starts after `vestara-workspace.service` has verified
  readiness.
- Boot Runtime stages must not be skipped or reversed
  (`firmware-complete` → … → `workspace-ready`).

## Readiness

- Host readiness: preflight completes without unhealthy status.
- API readiness: kernel + runtimes + API composed and healthy.
- Workspace readiness: `workspace-ready` committed; kernel diagnosis must not
  be unhealthy before that stage.

## Constraints

- Presentation-only units must not make the API a hard dependency of boot.
- Shutdown proceeds through the kernel's reverse dependency order.

## Related

- `README.md`
- `BOOT-TARGETS.md`
- `STARTUP-SERVICES.md`
- `os-0-host-integration.md`
