---
id: "workspace-volume"
title: "Volume 06 — Workspace"
book: "Book 2: Platform Architecture"
version: "5.0.0"
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
supersedes: "4.0.0"
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
Runtime Owner
        ↓
Engineering Events
        ↓
Engineering Graph (projection layer)
        ↓
Workspace Projection
        ↓
UI Component
```

**The Workspace is a projection layer.** It does not own, define, or persist domain objects. Every entity displayed in the Workspace is a projection of a canonical domain contract defined in another volume.

---

## Navigation Structure

```
Workspace
├── Engineering Sessions
├── Projects
├── Overview
└── Activity


Engineering
├── Planning
├── Executions
├── Artifacts
├── Verification
├── Evidence
├── Engineering Graph
└── Timeline


Builders
├── Application Builder
└── API Builder


Operations
├── Operations
├── Telemetry
├── Runtime
├── Events
└── Diagnostics


Tools
├── Chat
├── Editor
├── Explorer
├── Terminal
├── Browser
└── Knowledge


Platform
├── Marketplace
├── Extensions
└── Settings
```

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
| `activity-room.md` | Activity Room (AAR-001) implementation plan | Proposed |
| `visual-edit-mode.md` | Visual Edit Mode — human–AI interaction model for visual software modification (experimental direction) | Proposed |

### Builders

| Document | Purpose | Status |
|----------|---------|--------|
| `builders/01-application-builder.md` | Application development projection | Proposed |
| `builders/02-api-builder.md` | API development projection | Proposed |

---

## Projection Sources

| Domain Contract | Canonical Document | Runtime Owner |
|----------------|-------------------|---------------|
| Agent | `05-ai-core/agent-domain.md` | AgentRuntime |
| Assignment | `05-ai-core/agent-domain.md` | AgentRuntime |
| Execution | `04-platform/agent-harness-architecture.md` | AgentRuntime |
| Capability | `05-ai-core/agent-domain.md` | AgentRuntime |
| Evidence | `14-engineering/evidence-based-verification.md` | VerificationRuntime |
| Verification | `14-engineering/evidence-based-verification.md` | VerificationRuntime |
| Claim | `14-engineering/evidence-based-verification.md` | VerificationRuntime |
| Artifact | `14-engineering/evidence-based-verification.md` | ArtifactStorage |
| Plan | `14-engineering/engineering-principles.md` | PlanningService |
| Task | `14-engineering/engineering-principles.md` | PlanningService |
| Engineering Session | `04-platform/engineering-operating-system.md` | WorkspaceRuntime |
| Engineering Event | `04-platform/engineering-event-architecture.md` | EngineeringEventStore |
| Engineering Graph | `04-platform/engineering-event-architecture.md` | EngineeringGraph |
| Runtime Health | `04-platform/engineering-operating-system.md` | Kernel |
| Telemetry | `04-platform/engineering-operating-system.md` | Kernel |
| Project | `14-engineering/engineering-principles.md` | WorkspaceRuntime |
| API Specification | `14-engineering/engineering-principles.md` | PlanningService |

---

## Builder Architecture

### Builder Rule

```
Builder
  ≠ domain owner
```

A builder orchestrates and projects existing contracts:

```
Canonical Domain Contracts
        ↓
Builder Workflow
        ↓
Engineering Session
        ↓
Plans and Tasks
        ↓
Executions
        ↓
Artifacts
        ↓
Verification and Evidence
```

### Future Builders

| Builder | Purpose |
|---------|---------|
| Database Builder | Database schema and migration design |
| Workflow Builder | Business process and workflow design |
| Agent Builder | Agent capability and behavior design |
| Integration Builder | Third-party integration design |
| Infrastructure Builder | Infrastructure and deployment design |
| Plugin Builder | Extension and plugin design |

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

### 6. Builders as Orchestrators
Builders orchestrate and project existing domain contracts—they do not own them.

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

## Related documents

- [Workspace UX Contract](01-workspace-ux-contract.md)
- [Workspace Architecture](02-workspace-architecture.md)
- [Engineering Session Workspace Projection](05-engineering-session.md)
- [Workspace Modes](06-workspace-modes.md)
- [Application Builder](builders/01-application-builder.md)
- [API Builder](builders/02-api-builder.md)
- [CLI and Workspace Integration](cli-workspace-integration.md)
- [Engineering Session](engineering-session.md)
- [Universal Inspector](inspector.md)
- [Settings Architecture](settings-architecture.md)
- [Contextual Tool Contract](tools/01-contextual-tool-contract.md)
- [Messages Workspace](tools/02-messages-workspace.md)
- [Vestara Assist](vestara-assist.md)
- [Workspace Module](workspace-module.md)
- [Workspace Projections](workspace-projections.md)

