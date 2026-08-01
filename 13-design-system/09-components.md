---
title: "VDS Components"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "components"]
---

# VDS Components

Specifications for atomic UI components (button, input, select, dialog, toast, etc.). Defines states, anatomy, and behavior — not implementation. Each component references tokens from 14-design-tokens.md.

## Engineering control components

| Component | Required semantics | Terminal interpretation |
|-----------|--------------------|-------------------------|
| Routing profile selector | name, intent, active state | command/palette list with active marker |
| Provider/model candidate | provider-scoped identity, availability, compatibility | stacked or tabular labeled row |
| Preflight summary | effective route, policy, permissions, fallback | bordered label/value region |
| Status badge | explicit dimension and value | text label; color optional |
| Confirmation dialog | action, target, consequence, choices | input-capturing bordered region |
| Conflict dialog | previous/current revision and recovery actions | blocking revision message |
| Transcript | attribution, content, state | scrollable labeled entries |
| Composer | editable text, multiline, paste safety | persistent bottom input region |

“Healthy” MUST NOT replace installed, authenticated, reachable, available,
compatible, allowed, and busy dimensions.
