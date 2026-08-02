---
id: "workspace-volume"
title: "Volume 06 — Workspace"
book: "Book 2: Platform Architecture"
version: "4.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
supersedes: "3.0.0"
---

# Volume 06 — Workspace

> **The Workspace never defines business objects. It only projects canonical domain contracts.**

---

## Canonical Definition

```
Vestara Workspace is a real-time and historical projection of governed
engineering work performed by humans, agents, runtimes, and tools
inside an Engineering Session.
```

---

## Architectural Rule

```
Domain Contract
        ↓
Runtime
        ↓
Engineering Graph
        ↓
Workspace Projection
        ↓
UI Component
```

**The Workspace is a projection layer.** It does not own, define, or persist domain objects. Every entity displayed in the Workspace is a projection of a canonical domain contract defined in another volume.

---

## Projection Sources

| Domain Contract | Canonical Volume | Runtime Owner |
|----------------|------------------|---------------|
| Agent | Volume 08 (AI Agent) | AgentRuntime |
| Assignment | Volume 08 (AI Agent) | AgentRuntime |
| Execution | Volume 08 (AI Agent) | AgentRuntime |
| Capability | Volume 08 (AI Agent) | AgentRuntime |
| Evidence | Volume 14 (Engineering) | VerificationRuntime |
| Verification | Volume 14 (Engineering) | VerificationRuntime |
| Claim | Volume 14 (Engineering) | VerificationRuntime |
| Artifact | Volume 14 (Engineering) | EngineeringGraph |
| Plan | Volume 14 (Engineering) | PlanningService |
| Task | Volume 14 (Engineering) | PlanningService |
| Engineering Session | Volume 04 (Platform) | WorkspaceRuntime |
| Engineering Event | Volume 04 (Platform) | EngineeringEventStore |
| Engineering Graph | Volume 04 (Platform) | EngineeringGraph |
| Runtime Health | Volume 04 (Platform) | Kernel |
| Telemetry | Volume 04 (Platform) | Kernel |

---

## Volume Contents

### Core Architecture

| Document | Purpose | Status |
|----------|---------|--------|
| `01-workspace-ux-contract.md` | Canonical UX contract, projection model | Approved |
| `02-workspace-architecture.md` | Canonical model, design decisions | Approved |
| `05-engineering-session.md` | Session as primary projection object | Approved |
| `06-workspace-modes.md` | Adaptive interface contexts | Approved |
| `workspace-projections.md` | Domain contract projection rules | Approved |

---

## Information Architecture

### Projected Domains (not defined here)

| Domain | Source Volume | Projection |
|--------|--------------|------------|
| Agent | Volume 08 | Agent Center |
| Evidence | Volume 14 | Evidence Center |
| Verification | Volume 14 | Verification Center |
| Artifact | Volume 14 | Artifact Center |
| Plan | Volume 14 | Planning Workspace |
| Timeline | Volume 04 | Engineering Timeline |
| Operations | Volume 04 | Operations Center |

### Tools (Contextual Instruments)

| Tool | Binds To |
|------|----------|
| **Chat** | Session conversation |
| **Terminal** | Governed execution tool |
| **Browser** | Governed runtime tool |
| **Editor** | File and artifact editing surface |
| **Explorer** | Repository projection |
| **Documentation** | Knowledge and document projection |

### Platform Surfaces

| Surface | Purpose |
|---------|---------|
| **Settings** | Configuration governance |
| **Marketplace** | Extension and agent catalog |
| **Routing** | Provider and model routing |
| **Notifications** | System and session alerts |
| **Profile** | User identity and preferences |

---

## Data Flow

```
Workspace UI
    │
    ├── commands / intents
    ├── queries
    └── subscriptions
            ↓
Workspace API
            ↓
Runtime Owners
    ├── WorkspaceRuntime (composition)
    ├── WorkflowCoordinator (lifecycle)
    ├── AgentRuntime (execution)
    ├── VerificationRuntime (checks)
    ├── EngineeringEventStore (history)
    └── EngineeringGraph (projections)
            ↓
Events, Projections, Evidence, State
```

---

## Design Decisions

### 1. Projection-Only Architecture
The Workspace never defines business objects. It only projects canonical domain contracts.

### 2. Session-Centric Architecture
The Engineering Session is the primary projection object. All views project session state.

### 3. Universal Inspector
Every entity resolves through one Inspector contract with entity-specific sections projected from domain contracts.

### 4. Live State vs. Historical Truth
The interface distinguishes ephemeral progress from persisted evidence.

### 5. Tools as Instruments
Chat, terminal, browser, editor, and explorer are contextual tools, not primary architecture.

---

## Relationship to Other Volumes

| Volume | Relationship |
|--------|--------------|
| Volume 04 (Platform) | Workspace projects runtime state and events |
| Volume 08 (AI Agent) | Workspace projects agent execution |
| Volume 13 (Design System) | Visual design tokens and components |
| Volume 14 (Engineering) | Workspace projects verification and evidence |

---

## Implementation References

| Package | Path | Purpose |
|---------|------|---------|
| workspace | `packages/workspace/` | Core workspace runtime |
| workspace-ui | `apps/workspace/` | React UI implementation |
| kernel | `packages/kernel/` | Service orchestration |
| engineering-graph | `packages/engineering-graph/` | Graph queries and visualization |

---

*This volume defines the projection layer for the Vestara Engineering Operating System.*
*Domain contracts are defined in Volumes 04, 08, and 14.*
