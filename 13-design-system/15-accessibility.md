---
title: "VDS Accessibility"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "accessibility", "a11y", "wcag"]
---

# VDS Accessibility

WCAG 2.1 AA compliance targets per component, focus management, screen reader patterns, reduced-motion requirements, color-blind safe palettes, and keyboard navigation spec.

## Terminal requirements

- Every operation MUST be keyboard accessible and discoverable.
- Color and Unicode MUST have text/ASCII fallbacks.
- Focus-capturing overlays MUST announce their title and dismissal key.
- Confirmation prompts MUST state action and consequence before choices.
- Resize MUST not discard composer content.
- Streaming MUST not repeatedly redraw unchanged content or produce one
  accessibility announcement per token.
- `NO_COLOR`, reduced motion, terminal width, and terminal capability SHOULD be
  respected.
- Destructive or side-effect-aware operations MUST NOT use a single-key default
  that can be triggered by pasted input.
