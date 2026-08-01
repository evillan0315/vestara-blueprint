---
title: "VDS Theme Engine"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "theme", "dark-mode", "brand-theming"]
---

# VDS Theme Engine

How themes work: dark/light mode switching, brand theme injection, token overrides, and custom theme creation. All themes are token swaps — no structural changes.

Terminal themes negotiate capability rather than assuming a background. They
MUST support dark, light, 16-color, and monochrome mappings and SHOULD detect
user preferences without overriding terminal configuration. Theme changes MUST
NOT alter information hierarchy, labels, confirmation behavior, or status
meaning.
