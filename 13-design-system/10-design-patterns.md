---
title: "VDS Design Patterns"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "patterns", "interaction"]
---

# VDS Design Patterns

Reusable interaction patterns: loading states, empty states, error recovery, forms, lists, search, filtering, confirmation dialogs. Each pattern includes behavior, accessibility requirements, and motion spec.

## Routing patterns

- Begin with profiles, recent choices, and task recommendations; expose the full
  catalog progressively.
- Show effective selection before governed execution.
- Treat revision conflicts as reviewable state, never last-write-wins.
- Distinguish changing defaults from reassigning active work.
- Allow automatic fallback only within the declared stage and side-effect policy.
- After side effects, pause and require explicit approval; never imply resume.
- Preserve rejected-candidate reason codes for explanation and evidence.

## Terminal patterns

Help overlays, command palettes, and confirmations capture focus. Escape closes
non-destructive overlays. Cancellation retains evidence already produced. Errors
remain in the transcript with a recovery action when one exists.
