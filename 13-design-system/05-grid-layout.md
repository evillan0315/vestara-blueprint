---
title: "VDS Grid & Layout"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "grid", "layout", "breakpoints"]
---

# VDS Grid & Layout

Responsive grid system with defined breakpoints, column counts, and gutter widths. Supports density modes (comfortable, compact) that scale uniformly across all surfaces.

## Character-cell layout

Terminal layout uses measured columns and rows. The minimum reference viewport is
80×24. At reduced height, decoration and secondary hints collapse first; status,
active confirmation, transcript, and composer remain. Wide catalogs SHOULD use
aligned columns only when values remain readable; otherwise they become stacked
label/value groups. Resize MUST preserve input and scroll position.
