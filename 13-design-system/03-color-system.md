---
title: "VDS Color System"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "color", "theme", "accessibility"]
---

# VDS Color System

Semantic color tokens organized by role (background, foreground, border, accent, status) with light/dark pairings. All combinations meet WCAG AA contrast. No raw hex values outside the token system.

## Terminal interpretation

Terminal adapters map semantic roles to the detected ANSI capability: truecolor,
256-color, 16-color, or monochrome. Color MUST NOT be the only status signal.
`success`, `warning`, `danger`, `information`, `participant-human`, and
`participant-agent` always include a text label or structural distinction.
Applications MUST respect `NO_COLOR` and equivalent user preferences.
