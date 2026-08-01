---
title: "VDS Iconography"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "icons", "iconography"]
---

# VDS Iconography

Icon style (stroke weight, corner radius, sizing), semantic icon categories, and size system. All icons are vector, monochrome by default, with semantic color inheritance.

Terminal icons are optional enhancement glyphs. Every glyph MUST have a stable
text fallback (`Ready`, `Warning`, `Error`, `Paused`, `Approval required`). The
surface MUST account for glyph cell width and MUST NOT use emoji whose width can
shift critical columns.
