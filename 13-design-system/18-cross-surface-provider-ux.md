---
title: "VDS Cross-Surface Provider UX"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.0.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "providers", "tui", "cli", "workspace", "accessibility"]
---

# VDS Cross-Surface Provider UX

Provider and model configuration is one interaction contract with three
presentations:

| Surface | Primary interaction | Persistence authority |
| --- | --- | --- |
| Workspace UI | forms, validation, health and credential controls | Workspace/API |
| TUI | keyboard-first provider/model selection and quick actions | Workspace/API |
| CLI | scriptable CRUD, status and secure credential input | Workspace/API |

All surfaces use the same provider identity (`providerId` + `modelId`), expose
the same semantic status vocabulary, and distinguish installed, enabled,
authenticated, reachable, and suitable. A disabled provider is not rendered as
unavailable; an authentication failure is not rendered as a generic error.

Credentials are always masked, never echoed into command history, and are
submitted through the governed API. Model lists are provider-scoped and may be
created, updated, enabled, disabled, or removed only through the shared
provider contract.

Responsive behavior is normative: Workspace collapses provider detail panels
on narrow screens, TUI uses overlays when panes cannot fit, and CLI remains
usable with `NO_COLOR` and non-interactive output.
