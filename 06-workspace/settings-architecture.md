---
id: "workspace-settings-architecture"
title: "Settings Architecture"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (apps/workspace/src/pages/Settings, lib/theme.tsx)"
tags: ["settings", "configuration", "workspace", "reconciliation"]
---

# Settings Architecture

## Purpose

Document the Workspace Settings page as a **view over real runtime and
configuration systems**, not a disconnected collection of UI toggles. Only mark
implemented sections as implemented.

## Current state (implemented)

- **Theme / appearance** settings (dark/light/system, font, spacing, radius,
  accent palette, profiles) are wired to the theme system
  (`lib/theme.tsx`), persisted under `vestara-theme*` localStorage keys.
- **Provider settings** surface exists (`useProviderSettings`), scoped to the
  active provider.
- **General settings** persist via the workspace preferences store.

The Settings page is the engineering control surface, but most sections below
are **proposed**, not implemented toggles.

## Proposed sections

```text
Settings
├── Overview
├── General
├── Runtime
├── AI Providers
├── Agents
├── Filesystem & Safety
├── Verification
├── CLI Integration
├── Engineering History
├── Notifications
├── Telemetry
└── Advanced
```

## Configuration hierarchy

```text
Built-in defaults
      ↓
User configuration
      ↓
Workspace configuration
      ↓
Session overrides
      ↓
Command-specific overrides
```

Every resolved setting should preserve **provenance**. This hierarchy is the
proposed model; only built-in defaults (theme/appearance) and a subset of user
configuration are implemented today.

Do not state exact configuration paths (e.g. `~/.config/vestara/config.json`,
`.vestara/config.json`) unless the implementation uses them or an ADR defines
them. The current implementation persists preferences through the workspace
session store, not a documented file path.

## Required behaviors (proposed)

Configuration provenance, inherited settings, explicit overrides, runtime
health, provider health, CLI status, event store status, verification profiles,
filesystem policies, telemetry levels, destructive-action warnings, dirty-state
handling, section reset, validation, and secret masking.

## Implementation status

| Element | Status |
|---------|--------|
| Theme/appearance settings | implemented and verified |
| Provider settings (basic) | partial |
| General settings (prefs) | implemented |
| Runtime / Agents / Verification / CLI / History / Telemetry sections | proposed |

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `apps/workspace/src/pages/Settings/SettingsPage.tsx`,
  `apps/workspace/src/lib/theme.tsx`,
  `apps/workspace/src/hooks/useProviderSettings.ts`,
  `apps/api/src/routes/workspace.ts` (`/api/settings`)
