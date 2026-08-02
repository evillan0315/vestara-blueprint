---
id: "workspace-volume"
title: "Volume 06 — Workspace"
book: "Book 2: Platform Architecture"
version: "3.0.0"
status: "ratified"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
supersedes: "2.1.0"
---

# Volume 06 — Workspace

> **Vestara Workspace is the observable control surface of the Engineering Operating System. It presents live execution, historical truth, evidence, relationships, risks, and intervention controls around the Engineering Session—while tools such as chat, terminal, browser, editor, and explorer remain contextual instruments rather than the product's primary architecture.**

---

## Canonical Definition

```
Vestara Workspace is a real-time and historical projection of governed
engineering work performed by humans, agents, runtimes, and tools
inside an Engineering Session.
```

---

## Information Architecture

The Workspace is organized into four tiers: engineering domains, operational views, tools, and platform surfaces.

### Primary Engineering Domains

| Domain | Description |
|--------|-------------|
| **Projects** | Repository and workspace organization |
| **Engineering Sessions** | Goal-bound work units with lifecycle |
| **Plans** | Step-by-step execution strategies |
| **Executions** | Active agent work and results |
| **Agents** | Agent assignment, orchestration, collaboration |
| **Verification** | Quality gates, checks, approval workflows |
| **Evidence** | Provenance-tracked proof of work |
| **Engineering Graph** | Entity relationships and derived projections |
| **Operations** | System health, runtime, diagnostics |

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

## Core Hierarchy

```
Workspace
├── Repository
├── Projects
│   └── Engineering Sessions
│       ├── Intent
│       ├── Context
│       ├── Plan
│       ├── Task Graph
│       ├── Assignments
│       ├── Executions
│       ├── Artifacts
│       ├── Evidence
│       ├── Verification
│       ├── Approvals
│       ├── Events
│       └── Timeline
├── Agents
├── Engineering Graph
├── Operations
├── Knowledge
└── System Configuration
```

---

## Navigation Structure

```
Workspace
  Overview
  Projects
  Sessions
  Activity

Engineering
  Plans
  Executions
  Verification
  Evidence
  Artifacts
  Engineering Graph

Agents
  Agent Center
  Assignments
  Collaboration
  Capabilities

Operations
  Operations Center
  Runtime
  Telemetry
  Events
  Filesystem
  Diagnostics

Tools
  Chat
  Editor
  Terminal
  Browser
  Explorer
  Documentation

Platform
  Marketplace
  Routing
  Settings
```

---

## Canonical Specifications

### Core Architecture

| Document | Purpose | Status |
|----------|---------|--------|
| `01-workspace-architecture.md` | Canonical UX contract, design decisions | Specified |
| `02-workspace-architecture.md` | Canonical model, projection contract | Ratified |
| `05-engineering-session.md` | Primary object structure, lifecycle | Ratified |
| `06-workspace-modes.md` | Adaptive interface contexts | Ratified |

### Engineering Experience

| Document | Purpose | Status |
|----------|---------|--------|
| `engineering/execution-experience.md` | Cognitive lifecycle, stage visualization | Proposed |
| `engineering/planning-workspace.md` | Plan creation and review | Proposed |
| `engineering/verification-center.md` | Quality gates and approval | Proposed |
| `engineering/evidence-center.md` | Evidence identity and provenance | Proposed |
| `engineering/artifact-center.md` | Generated artifact management | Proposed |
| `engineering/engineering-graph.md` | Relationship visualization | Proposed |

### Agent Experience

| Document | Purpose | Status |
|----------|---------|--------|
| `agents/agent-center.md` | Agent management | Proposed |
| `agents/agent-assignment.md` | Task assignment and routing | Proposed |
| `agents/agent-collaboration.md` | Multi-agent coordination | Proposed |
| `agents/agent-intervention.md` | Pause, redirect, quarantine, rollback | Proposed |

### Operations Experience

| Document | Purpose | Status |
|----------|---------|--------|
| `operations/operations-center.md` | System health dashboard | Proposed |
| `operations/runtime-observability.md` | Service and process monitoring | Proposed |
| `operations/telemetry-and-events.md` | Live metrics vs historical events | Proposed |
| `operations/diagnostics.md` | Error investigation and debugging | Proposed |

### Platform Surfaces

| Document | Purpose | Status |
|----------|---------|--------|
| `platform/settings-architecture.md` | Configuration governance | Partial |
| `platform/cli-workspace-integration.md` | CLI and Workspace unification | Partial |
| `platform/realtime-transport.md` | WebSocket and event streaming | Implemented |

---

## Architectural Model

```
Engineering Operating System
        ↓
Workspace Projections
        ├── Engineering Session
        ├── Project State
        ├── Execution Lifecycle
        ├── Agent Activity
        ├── Repository State
        ├── Engineering Graph
        ├── Verification
        ├── Evidence
        ├── Operations
        └── Historical Truth
```

### Data Flow

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

### 1. Session-Centric Architecture
The Engineering Session is the primary object. All views are projections of session state.

### 2. Universal Inspector
Every entity resolves through one Inspector contract with entity-specific sections.

### 3. Live State vs. Historical Truth
The interface distinguishes ephemeral progress from persisted evidence.

### 4. Evidence as First-Class Entity
Every evidence item has identity, provenance, claims, and verification status.

### 5. Intervention Controls
The Workspace exposes pause, resume, cancel, redirect, explain, verify, approve, rollback, and quarantine.

### 6. Tools as Instruments
Chat, terminal, browser, editor, and explorer are contextual tools, not primary architecture.

### 7. Maturity Markers
Every specification identifies its implementation state.

---

## Relationship to Other Volumes

| Volume | Relationship |
|--------|--------------|
| Volume 02 (Platform) | Workspace is the primary UI layer |
| Volume 08 (AI Agent) | Workspace visualizes agent execution |
| Volume 13 (Design System) | Visual design tokens and components |
| Volume 17 (Event Bus) | Real-time event streaming |

---

## Implementation References

| Package | Path | Purpose |
|---------|------|---------|
| workspace | `packages/workspace/` | Core workspace runtime |
| workspace-ui | `apps/workspace/` | React UI implementation |
| kernel | `packages/kernel/` | Service orchestration |
| engineering-graph | `packages/engineering-graph/` | Graph queries and visualization |

---

## Build Sequence

| Order | Component | Rationale |
|-------|-----------|-----------|
| 1 | Application Shell | Foundation for all views |
| 2 | Engineering Session | Primary object model |
| 3 | Universal Inspector | Consistent entity inspection |
| 4 | Execution Experience | Cognitive lifecycle visualization |
| 5 | Evidence Center | Proof of work and provenance |
| 6 | Operations Center | Live state vs historical truth |
| 7 | Agent Intervention | Governance controls |
| 8 | Engineering Graph | Relationship visualization |
| 9 | Historical Replay | Time-travel debugging |
| 10 | Knowledge & Documentation | Learning and reference |

---

*This volume defines the behavioral and information architecture for the Vestara Workspace.*
*Visual design tokens and component semantics are defined in Volume 13 (Design System).*
