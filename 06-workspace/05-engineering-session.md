---
id: "engineering-session-projection"
title: "Engineering Session Workspace Projection"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "2.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-runtime, workspace-ui)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: "1.0.0"
tags: ["workspace", "session", "projection", "ui"]
---

# Engineering Session Workspace Projection

## How the Workspace Projects the Engineering Session

> **The Engineering Session is the primary projection object in the Workspace. The Workspace does not define the session—it projects it from the canonical domain contract.**

---

## 1. Projection Source

| Property | Value |
|----------|-------|
| Domain Contract | `04-platform/engineering-operating-system.md` |
| Runtime Owner | WorkspaceRuntime |
| Graph Scheme | `session://` |
| Canonical Entity | `EngineeringSession` |

The Engineering Session domain object is defined in Volume 04. This document specifies only how the Workspace projects it.

---

## 2. Projection Scope

### 2.1 What the Workspace Projects

The Workspace projects session information for display and interaction:

| Projection Area | What is Shown |
|----------------|---------------|
| **Session Identity** | ID, title, objective, status |
| **Lifecycle State** | Current stage, progress, transitions |
| **Related Entities** | Plans, executions, agents, artifacts, evidence |
| **Live State** | Active executions, running agents, pending approvals |
| **Historical Truth** | Completed work, captured evidence, audit trail |
| **Timeline** | Chronological event history |
| **Inspector Sections** | Entity details through Universal Inspector |

### 2.2 What the Workspace Does Not Define

The Workspace does not redefine:

- Session fields or schema
- Session lifecycle state machine
- Session persistence or storage
- Domain relationships or ownership
- Runtime ownership or event semantics
- Session creation or mutation logic

Those belong in Volume 04.

---

## 3. Lifecycle State Projection

### 3.1 State Rendering

The Workspace renders session lifecycle state from the domain contract:

```
Domain State Machine (Volume 04)
        ↓
Workspace State Projection
        ↓
UI State Indicators
```

| Domain State | Workspace Rendering |
|-------------|---------------------|
| `created` | New session indicator |
| `planning` | Planning mode active |
| `executing` | Execution pipeline visible |
| `verifying` | Verification center active |
| `completed` | Session complete indicator |
| `failed` | Error state, failure details |
| `paused` | Paused indicator, resume action |
| `archived` | Archived state, read-only |

### 3.2 State Transitions

The Workspace projects state transitions but does not define them:

```
User Action or Agent Event
        ↓
Domain State Transition (Volume 04)
        ↓
Workspace State Update
        ↓
UI Re-render
```

---

## 4. Related Entity Projections

### 4.1 Entity Navigation

The Workspace projects relationships between the session and related entities:

```
Engineering Session
    ├── Plans (from Plan domain)
    ├── Executions (from Execution domain)
    ├── Agents (from Agent domain)
    ├── Artifacts (from Artifact domain)
    ├── Evidence (from Evidence domain)
    ├── Verification (from Verification domain)
    ├── Approvals (from Approval domain)
    └── Events (from EngineeringEventStore)
```

### 4.2 Inspector Integration

Every related entity resolves through the Universal Inspector:

```
Session Entity Selection
        ↓
Universal Inspector
    ├── Identity (from domain contract)
    ├── Current State (from runtime)
    ├── Relationships (from EngineeringGraph)
    ├── Activity (from EngineeringEventStore)
    ├── History (from EngineeringEventStore)
    ├── Evidence (from Evidence)
    └── Available Actions (from Policy)
```

---

## 5. Live vs. Historical Projection

### 5.1 Live State

The Workspace projects real-time session state:

| Live Element | Source |
|-------------|--------|
| Active executions | AgentRuntime |
| Running agents | AgentRuntime |
| Pending approvals | PolicyRuntime |
| Current telemetry | Kernel |
| Active sessions | WorkspaceRuntime |

### 5.2 Historical Truth

The Workspace projects persisted session history:

| Historical Element | Source |
|-------------------|--------|
| Completed executions | EngineeringEventStore |
| Captured evidence | VerificationRuntime |
| Audit trail | EngineeringEventStore |
| Event timeline | EngineeringEventStore |

### 5.3 Visual Distinction

| Indicator | Live State | Historical Truth |
|-----------|------------|------------------|
| Timestamp | Relative ("2m ago") | Absolute ("01:42:08") |
| Mutability | Can change | Immutable |
| Source | Telemetry, WebSocket | Event Store |
| Badge | "Live" | "Recorded" |

---

## 6. Action Projections

### 6.1 Action Sourcing

Session actions are projected from the policy/action system:

```typescript
interface SessionActionProjection {
  actionId: string;
  labelToken: string;
  availability: 'available' | 'disabled' | 'hidden';
  decisionSource: string;
  approvalRequired: boolean;
  denialReason?: string;
}
```

### 6.2 Available Actions by State

| Session State | Available Actions |
|--------------|-------------------|
| `created` | Start Planning, Cancel |
| `planning` | Approve Plan, Reject Plan, Modify Plan |
| `executing` | Pause, Resume, Cancel, Redirect, Request Evidence |
| `verifying` | Approve, Reject, Require Re-verification |
| `completed` | Archive, View Summary, Create Follow-up |
| `failed` | Retry, View Error, Cancel |
| `paused` | Resume, Cancel |

---

## 7. Implementation Notes

### 7.1 Current State

| Projection | Status | Notes |
|-----------|--------|-------|
| Session Identity | Implemented | Basic session listing exists |
| Lifecycle State | Partial | Basic state rendering exists |
| Related Entities | Partial | Basic navigation exists |
| Live State | Partial | Basic live updates exist |
| Historical Truth | Partial | Basic history exists |
| Action Projections | Partial | Basic actions exist |

### 7.2 Open Questions

1. How should session state synchronization be optimized?
2. How should concurrent session editing be handled?
3. How should session snapshots be projected?

---

*This document defines how the Workspace projects the Engineering Session.*
*The session domain object is defined in Volume 04.*
