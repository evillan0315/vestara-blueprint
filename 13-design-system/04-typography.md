---
title: "VDS Typography"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "typography", "type-scale"]
---

# VDS Typography

Type scale, font families (primary, mono, UI), line heights, and rhythm. Specified as token values, not absolute sizes. Readable at all sizes, optimized for code and prose equally.

## Terminal interpretation

The terminal owns the font. VDS controls hierarchy through labels, weight where
supported, blank-line rhythm, indentation, and borders. Output MUST wrap at cell
boundaries without truncating identifiers silently. Code, provider/model refs,
revisions, and commands use exact text and MUST remain copyable.
