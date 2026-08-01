---
title: "VDS Design Tokens"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "tokens", "theming", "platform"]
---

# VDS Design Tokens

## Token Taxonomy

All VDS tokens follow a flat, semantic naming convention:

```
vds-{category}-{property}-{variant}
```

| Segment | Examples |
|---------|----------|
| `category` | `color`, `type`, `space`, `radius`, `shadow`, `motion`, `terminal` |
| `property` | `bg`, `fg`, `border`, `scale`, `inset`, `duration` |
| `variant` | `primary`, `surface`, `muted`, `sm`, `lg`, `slow` |

## Distribution

Tokens are distributed per-platform as:

- **CSS custom properties** (web/desktop)
- **JSON** (codegen source of truth)
- **Swift Asset Catalog** (iOS/macOS)
- **Compose theme** (Android)
- **Semantic ANSI map** (terminal capability tiers)

## Platform Outputs

| Platform | Token Format | Build Step |
|----------|-------------|------------|
| Web | `--vds-color-bg-primary` | Generated at build time |
| iOS | `VDSColor.backgroundPrimary` | Swift codegen |
| Android | `VDS.color.backgroundPrimary` | Kotlin codegen |
| Design tools | JSON import | Manual sync |
| Terminal | semantic role → ANSI/text fallback | Runtime capability mapping |

Terminal tokens include border emphasis, focus treatment, participant labels,
status roles, and dense cell spacing. The source of truth remains semantic; ANSI
escape codes and Unicode glyphs are adapter outputs, never token identities.

**No platform hardcodes values. All consume tokens.**
