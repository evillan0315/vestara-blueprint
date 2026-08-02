---
id: "workspace-volume"
title: "Volume 06 — Workspace"
book: "Book 2: Platform Architecture"
version: "2.1.0"
status: "ratified"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
supersedes: "2.0.0"
---

# Volume 06 — Workspace

> **Vestara Workspace is a temporal, evidence-driven projection of an Engineering Session—not a collection of AI tools arranged in a sidebar.**

## Canonical Specification

The Workspace is defined by a session-centric architecture where the Engineering Session is the primary object. All UI views are projections of that model.

**Core Architecture:**
- `02-workspace-architecture.md` — Canonical model, design decisions, projection contract
- `05-engineering-session.md` — Primary object structure, lifecycle, operations
- `06-workspace-modes.md` — Adaptive interface contexts and transitions

## Volume Contents

### Core Specifications

| Document | Purpose |
|----------|---------|
| `02-workspace-architecture.md` | Canonical model and design decisions |
| `05-engineering-session.md` | Primary workspace object |
| `06-workspace-modes.md` | Adaptive interface contexts |

### Planned Specifications

| Directory | Purpose |
|-----------|---------|
| `engineering/` | Session views: project, planning, execution, timeline, graph, artifacts, evidence, verification |
| `agents/` | Agent center, orchestration, runtime view, inspector, collaboration |
| `operations/` | Operations center, runtime observability, telemetry, event stream, terminal, browser, health |
| `inspector/` | Universal inspector, entity/relationship/historical inspection |
| `tools/` | Code editor, terminal, browser, diff viewer, visual verification |
| `implementation/` | Frontend architecture, state management, realtime events, routing, permissions, performance, testing, roadmap |

## Architectural Model

```
Human Intent
    ↓
Engineering Session
    ↓
Plan
    ↓
Workflow
    ↓
Agent Executions
    ↓
Artifacts and File Changes
    ↓
Verification
    ↓
Evidence
    ↓
Engineering Event History
```

## Design Decisions

### 1. Universal Inspector
Every entity resolves through one Inspector contract with entity-specific sections.

### 2. Live State vs. Historical Truth
The interface distinguishes ephemeral progress from persisted evidence.

### 3. Evidence as First-Class Entity
Every evidence item has identity, provenance, and verification status.

### 4. Intervention Controls
The Workspace exposes pause, resume, cancel, redirect, explain, verify, approve, rollback, and quarantine.

### 5. Maturity Markers
Every specification identifies its implementation state.

## Relationship to Other Volumes

| Volume | Relationship |
|--------|--------------|
| Volume 02 (Platform) | Workspace is the primary UI layer |
| Volume 08 (AI Agent) | Workspace visualizes agent execution |
| Volume 13 (Design System) | Visual design tokens and components |
| Volume 17 (Event Bus) | Real-time event streaming |

## Implementation References

| Package | Path | Purpose |
|---------|------|---------|
| workspace | `packages/workspace/` | Core workspace runtime |
| workspace-ui | `apps/workspace/` | React UI implementation |
| kernel | `packages/kernel/` | Service orchestration |
| engineering-graph | `packages/engineering-graph/` | Graph queries and visualization |

## Build Sequence

1. Application Shell
2. Engineering Session
3. Universal Inspector
4. Activity Timeline
5. Execution Pipeline
6. Evidence & Verification
7. Agent Center
8. Operations Center
9. Engineering Graph
10. Historical Replay

---

*This volume defines the behavioral and information architecture for the Vestara Workspace.*
*Visual design tokens and component semantics are defined in Volume 13 (Design System).*
