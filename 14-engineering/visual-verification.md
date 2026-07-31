---
id: "engineering-visual-verification"
title: "Visual and Screenshot Verification"
volume: "14-engineering"
book: "Book 4: Engineering"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "implemented"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (apps/workspace/tests/visual)"
tags: ["visual", "screenshot", "playwright", "regression", "reconciliation"]
---

# Visual and Screenshot Verification

## Purpose

Document the Visual Evidence capability for the Workspace UI, built on a
verified Playwright visual-regression flow.

## Current state

**Implemented and verified** in `apps/workspace/tests/visual`:

- **Route selection**: routes are discovered from `src/routes.ts` (the
  application's single source of truth). `SCREENSHOT_ROUTES` filters runs.
- **Viewport selection**: configurable groups — `desktop`, `tablet`, `mobile` —
  covering 1920/1600/1440/1366, iPad Pro/Air + Surface Pro, iPhone SE/15,
  Pixel 8, Galaxy S24. `SCREENSHOT_VIEWPORT` selects the group.
- **Theme selection**: dark/light themes via `vestara-theme` localStorage
  seeding before navigation. `SCREENSHOT_THEME` selects one.
- **Browser setup**: isolated Playwright context per capture (device scale
  factor, touch, mobile emulation); Chromium.
- **Baseline discovery**: approved baselines under
  `tests/visual/.artifacts/baselines/` (committed).
- **Screenshot capture**: wait for load + fonts + settle; disable animations,
  transitions, cursors; emulate reduced motion; apply route masks; capture.
- **Comparison**: pixelmatch + pngjs; configurable `tolerance` and
  `maxDiffPercent`.
- **Missing baseline handling**: missing baselines fail the run until
  `screenshots:update` approves them.
- **New screenshot handling**: update mode writes baselines and reports `new`.
- **Diff artifacts**: `current/` and `diff/` PNGs written per shot.
- **Report generation**: HTML dashboard, JSON, Markdown under
  `tests/visual/.artifacts/reports/`.
- **Exit behavior**: any regression fails the Playwright run (CI gate).
- **Timeouts**: page load 30s, network-idle opt-in (dev websockets/HMR block
  it; disabled by default), settle 800ms.
- **Evidence retention**: baselines committed; current/diff/reports retained
  for the run; `screenshots:clean` removes generated artifacts only.
- **Parallelism**: Playwright workers + fully-parallel; sharding supported.

## Verified evidence

A recent run (dashboard route, desktop viewports, dark theme) reported:

```text
4/4 passing
0 failed
0 missing baselines
0 new
100% pass rate
```

Markdown report generated under:
`apps/workspace/tests/visual/.artifacts/reports/visual-regression.md`

Command used (from `apps/workspace`):

```bash
SCREENSHOT_ROUTES=dashboard \
SCREENSHOT_VIEWPORT=desktop \
SCREENSHOT_THEME=dark \
timeout 240 node_modules/.bin/playwright test
```

This proves the capture → compare → report loop for the exercised route/viewport/
theme matrix. It does **not** prove behavior for unexercised routes, viewports,
or themes; full-suite verification remains under final verification.

### Observed regression detection (evidence of function)

After the application routes were refactored to data-driven rendering
(`src/routes.ts`), a fresh compare run against the prior baselines reported a
consistent ~4.5–5.8% pixel diff on every desktop viewport — a real layout
change, correctly flagged by the framework. Baselines were re-approved with
`screenshots:update`, after which the compare run reported `4/4 passing ·
100%` again. This sequence demonstrates the baseline approval workflow and the
failure gate working as designed.

## Integration status

| Integration | Status |
|-------------|--------|
| Verification pipeline | partial (screenshots are independent of `packages/verification`) |
| Telemetry | not integrated |
| Engineering Event Store | not integrated |
| Workspace UI | not integrated (standalone test harness) |
| CI (`visual-regression.yml`) | implemented (install → build → screenshot → artifact → PR comment → fail gate) |

## Visual Evidence capability

The broader Visual Evidence capability is proposed. Only implemented elements
are marked implemented:

```text
Visual Evidence
├── Screenshot regression        ✅ implemented + verified
├── Responsive verification      ✅ implemented + verified (viewport matrix)
├── Theme verification           ✅ implemented (dark/light)
├── Interaction walkthrough      ⬜ proposed
├── Console-error capture        ⬜ proposed
├── Network-error capture        ⬜ proposed
├── Accessibility checks         ⬜ proposed
├── Video evidence               ⬜ proposed
└── Human-observable execution   ⬜ proposed
```

## Current limitations

- Full-suite verification is under final verification (only a subset has been
  run end-to-end).
- Screenshots are not yet emitted as first-class verification evidence into the
  verification pipeline or the Engineering Event Store.
- Network-idle waiting is disabled by default (Vite HMR/websockets).
- Baselines are captured against the local workspace; environment-dependent
  rendering (fonts, OS) can produce diffs across machines.

## Commands

```bash
pnpm screenshots            # desktop viewports, dark + light
pnpm screenshots:update     # approve baselines
pnpm screenshots:mobile     # mobile viewport group
pnpm screenshots:tablet     # tablet viewport group
pnpm screenshots:desktop    # desktop viewport group
pnpm screenshots:ci         # CI mode (2 workers, retries)
pnpm screenshots:report     # regenerate reports
pnpm screenshots:clean      # remove generated artifacts (keeps baselines)
```

## Related ADRs

- `adr/ADR-104-evidence-based-verification.md`
- `adr/ADR-108-visual-evidence-and-screenshot-verification.md`

## Related implementation

- Repository: `evillan0315/vestara-ai-core`
- Paths: `apps/workspace/tests/visual/`,
  `apps/workspace/playwright.config.ts`,
  `.github/workflows/visual-regression.yml`
