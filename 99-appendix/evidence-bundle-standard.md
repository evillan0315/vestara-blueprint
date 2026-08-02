# Evidence Bundle Standard

## Purpose

Define the standard evidence bundle produced by every verification run.
Evidence is the permanent historical record that proves a capability was
verified at a specific commit, in a specific environment, with specific
commands.

## Bundle structure

```
evidence/
├── metadata.json          # Run identity and environment
├── commands.log           # Commands executed
├── stdout.log             # Standard output
├── stderr.log             # Standard error
├── git-diff.patch         # Uncommitted changes at run time
├── verification.json      # Test results and assertions
├── screenshots/           # Visual evidence (if applicable)
│   └── <surface>-<viewport>-<theme>.png
├── artifacts/             # Build artifacts, coverage reports
│   ├── coverage/
│   └── build/
├── events.jsonl           # Engineering events during run
├── graph.json             # Graph snapshot at run time
└── confidence.json        # Trust and confidence scores
```

## metadata.json

```json
{
  "runId": "verification-eb3fd3d-001",
  "repository": "evillan0315/vestara-ai-core",
  "commit": "eb3fd3dc0aed549c56690e5610d3d985ea53c1b5",
  "branch": "feature/engineering-graph-diagnostics-ui",
  "startedAt": "2026-08-02T20:00:00+08:00",
  "completedAt": "2026-08-02T20:05:32+08:00",
  "verifier": "agent-verifier",
  "duration": "5m 32s",
  "environment": {
    "node": "22.16.0",
    "pnpm": "9.15.0",
    "os": "Linux 6.8.0",
    "arch": "x86_64"
  },
  "status": "passed",
  "limitations": [
    "visual suite covered only selected routes",
    "no cross-provider verification"
  ]
}
```

## verification.json

```json
{
  "summary": {
    "total": 843,
    "passed": 841,
    "failed": 2,
    "skipped": 0,
    "duration": "45.2s"
  },
  "suites": [
    {
      "name": "packages/filesystem-runtime",
      "tests": 25,
      "passed": 25,
      "failed": 0,
      "duration": "2.1s"
    },
    {
      "name": "packages/workspace/__tests__/agent-capability.test.ts",
      "tests": 43,
      "passed": 43,
      "failed": 0,
      "duration": "3.4s"
    }
  ],
  "failures": [
    {
      "suite": "packages/understanding",
      "test": "UnderstandingAssembler",
      "error": "Type-only interface exported, asserted at runtime",
      "status": "pre-existing"
    }
  ],
  "coverage": {
    "statements": 78.5,
    "branches": 72.3,
    "functions": 81.2,
    "lines": 79.1
  }
}
```

## events.jsonl

```json
{"ts":"2026-08-02T20:00:01+08:00","type":"verification.started","runId":"verification-eb3fd3d-001","commit":"eb3fd3d"}
{"ts":"2026-08-02T20:00:02+08:00","type":"build.started","command":"bash build-order.sh"}
{"ts":"2026-08-02T20:02:15+08:00","type":"build.completed","duration":"133s","status":"passed"}
{"ts":"2026-08-02T20:02:16+08:00","type":"test.started","command":"pnpm test"}
{"ts":"2026-08-02T20:05:30+08:00","type":"test.completed","total":843,"passed":841,"failed":2,"duration":"194s"}
{"ts":"2026-08-02T20:05:32+08:00","type":"verification.completed","status":"passed","runId":"verification-eb3fd3d-001"}
```

## graph.json

```json
{
  "snapshot": {
    "id": "graph-eb3fd3d-20260802",
    "timestamp": "2026-08-02T20:05:32+08:00",
    "commit": "eb3fd3d",
    "entities": 156,
    "relationships": 342,
    "health": "healthy"
  }
}
```

## confidence.json

```json
{
  "runId": "verification-eb3fd3d-001",
  "overall": 0.92,
  "dimensions": {
    "test-pass-rate": 0.998,
    "coverage": 0.79,
    "build-success": 1.0,
    "lint-clean": 0.95,
    "no-regressions": 1.0
  },
  "limitations": [
    "2 pre-existing test failures (understanding type exports)",
    "visual regression not fully covered"
  ]
}
```

## Naming convention

```
verification-<commit-short-sha>-<sequence>.json
```

Examples:
- `verification-eb3fd3d-001.json`
- `verification-8453313-001.json`

## Requirements

1. Every verification run MUST produce a `metadata.json`.
2. Every verification run MUST produce a `verification.json`.
3. Commands MUST be logged to `commands.log`.
4. Build output MUST be captured to `stdout.log` and `stderr.log`.
5. Uncommitted changes MUST be captured to `git-diff.patch`.
6. Visual evidence MUST be stored in `screenshots/` with naming convention `<surface>-<viewport>-<theme>.png`.
7. Engineering events during the run MUST be captured to `events.jsonl`.
8. The graph snapshot at run time MUST be captured to `graph.json`.
9. Confidence scores MUST be computed and stored in `confidence.json`.
10. Evidence bundles MUST be immutable once created.
