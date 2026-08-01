---
id: "os-os0-host-integration"
title: "OS-0 Host Integration"
volume: "07-operating-system"
book: "Book 5: Operations"
version: "1.0.0"
status: "approved"
owner: "@devops-engineer"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "implemented"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "579df3f"
tags: ["os-0", "host", "boot", "systemd", "linux"]
---

# OS-0 Host Integration

## Scope

OS-0 is a Linux host-integration milestone, not a bootable Vestara image. It
proves that Linux can start Vestara as a managed environment and that Vestara
can inspect, verify, expose, and shut down its own runtime composition safely.

```text
Linux + systemd
  -> Host Runtime preflight
  -> Vestara kernel and API
  -> Boot Runtime evidence
  -> Workspace Runtime composition
  -> health verification
  -> workspace-ready
```

## Implemented runtimes

### Host Runtime

`@vestara/host-runtime` observes:

- hostname, platform, architecture, kernel, and distribution;
- CPU, load average, memory, and uptime;
- block-device names and mount state;
- network interfaces and addresses;
- systemd availability.

Observation is read-only and uses operating-system APIs and virtual filesystems,
not an agent-controlled shell. Power methods exist behind three independent
gates—explicit enablement, request authorization, and policy permission—and are
not exposed by the OS-0 API or CLI.

### Boot Runtime

`@vestara/boot-runtime` persists this ordered lifecycle:

```text
firmware-complete -> host-started -> storage-mounted -> identity-loaded
  -> services-started -> runtime-composed -> health-verified
  -> workspace-ready
```

Stages cannot be skipped or reversed. Each transition records its timestamp and
optional evidence. State is written atomically with restricted file mode. A
failure or recovery transition preserves the preceding history.

These names describe Vestara's observed post-firmware lifecycle. OS-0 does not
control firmware, the Linux kernel, or initramfs.

## Runtime composition

The API registers Host Runtime before Boot Runtime in the kernel dependency
graph. Workspace construction advances boot stages. Kernel diagnosis must not
be unhealthy before `workspace-ready` is committed. Shutdown proceeds through
the kernel's reverse dependency order.

Read-only surfaces:

```text
GET /api/host
GET /api/boot
vestara host status [--json]
vestara boot status [--json]
```

The CLI prefers the shared API. Host status may fall back to local read-only
inspection; boot status may read the local persisted state.

## Systemd deployment

The reviewed templates under `vestara-ai-core/os/systemd` provide:

- `vestara-host.service` — read-only host preflight;
- `vestara-api.service` — the kernel, runtimes, and API composition;
- `vestara-workspace.service` — readiness verification;
- `vestara.target` — host-mode grouping.

Units use a dedicated service identity, `NoNewPrivileges`, private temporary
storage, read-only host protection, and narrow writable paths. Copying,
enabling, starting, disabling, or removing these units remains explicit
administrator work.

## Verified evidence

Implementation reference `579df3f` was verified with:

- the canonical 71-project dependency build;
- 105 test files (1,030 passed, 1 skipped);
- a live API boot reaching `workspace-ready` through eight transitions;
- read-only API and CLI status smoke tests;
- clean reverse-order shutdown;
- `systemd-analyze verify` for all supplied units.

## Explicitly not implemented

- ISO or disk-image generation;
- GRUB or systemd-boot installation;
- initramfs composition;
- disk partitioning or formatting;
- encrypted portable persistence provisioning;
- immutable A/B system slots and rollback;
- signed updates, Secure Boot, or measured boot;
- hardware portability certification;
- unattended OS installation.

These belong to later OS milestones and must retain proposed or not-started
status until implementation evidence exists.

## Related

- `00-governance/adr/ADR-114-linux-host-integration-foundation.md`
- `04-platform/engineering-operating-system.md`
- `99-appendix/capability-maturity-matrix.md`
