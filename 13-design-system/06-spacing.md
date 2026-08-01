---
title: "VDS Spacing"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "spacing", "scale"]
---

# VDS Spacing

Linear spacing scale (4px base unit) used for all margins, padding, and component gaps. No exceptions. Inset and stack spacing defined as semantic tokens.

For terminal surfaces, one horizontal or vertical cell is the atomic unit.
Semantic inset and stack tokens map to integer cells; adapters MUST NOT emulate
fractional pixel spacing. Dense mode MAY remove blank lines while preserving
label/value separation and focus boundaries.
