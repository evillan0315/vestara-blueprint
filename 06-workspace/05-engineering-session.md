---
id: "engineering-session"
title: "Engineering Session — Primary Workspace Object"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
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
supersedes: []
tags: ["workspace", "session", "model", "state"]
---

# Engineering Session

## Primary Workspace Object

> **An Engineering Session is the primary unit of work in Vestara. Every task, plan, execution, and evidence item exists within a session context.**

---

## 1. Session Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                     ENGINEERING SESSION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐       │
│  │ Created │──▶│Planning │──▶│Executing│──▶│Verifying│──▶ Done │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘       │
│       │             │             │             │               │
│       ▼             ▼             ▼             ▼               │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐       │
│  │ Archived│◀──│ Failed  │◀──│ Paused  │◀──│ Needs   │       │
│  └─────────┘   └─────────┘   └─────────┘   │ Review  │       │
│                                              └─────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.1 State Transitions

| From | To | Trigger |
|------|----|---------|
| Created | Planning | User starts planning |
| Planning | Executing | Plan approved |
| Executing | Verifying | Execution complete |
| Verifying | Done | Verification passed |
| Executing | Paused | User pauses |
| Paused | Executing | User resumes |
| Executing | Failed | Execution error |
| Verifying | Needs Review | Verification failed |
| Needs Review | Executing | User requests revision |
| Any | Archived | User archives session |

---

## 2. Session Structure

```typescript
interface EngineeringSession {
  // Identity
  id: string;
  taskId: string;
  title: string;
  description?: string;
  
  // Core Components
  objective: string;
  project: ProjectReference;
  plan: Plan;
  workflow: Workflow;
  assignedAgents: AgentAssignment[];
  executions: Execution[];
  activities: ActivityLog;
  files: FileChange[];
  artifacts: Artifact[];
  evidence: Evidence[];
  verification: VerificationState;
  approvals: Approval[];
  telemetry: TelemetryState;
  relationships: Relationship[];
  timeline: TimelineEvent[];
  
  // Metadata
  status: SessionStatus;
  priority: Priority;
  tags: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  
  // Ownership
  createdBy: string;
  assignedTo?: string;
}
```

### 2.1 Component Relationships

```
EngineeringSession
│
├── objective
│   └── The goal this session aims to achieve
│
├── project
│   └── Repository and workspace reference
│
├── plan
│   ├── steps: PlanStep[]
│   ├── estimatedDuration: number
│   ├── riskAssessment: Risk[]
│   └── requiredApprovals: ApprovalRequirement[]
│
├── workflow
│   ├── currentStage: WorkflowStage
│   ├── stages: WorkflowStage[]
│   ├── gates: QualityGate[]
│   └── progression: ProgressionRule[]
│
├── assignedAgents
│   ├── role: string
│   ├── agentId: string
│   ├── status: AgentStatus
│   └── responsibilities: string[]
│
├── executions
│   ├── agentId: string
│   ├── threadId: string
│   ├── status: ExecutionStatus
│   ├── startedAt: string
│   ├── completedAt?: string
│   └── result?: ExecutionResult
│
├── activities
│   └── ActivityLogEntry[]
│
├── files
│   ├── path: string
│   ├── action: FileAction
│   ├── diff?: string
│   └── timestamp: string
│
├── artifacts
│   ├── id: string
│   ├── type: ArtifactType
│   ├── name: string
│   ├── content: unknown
│   └── createdAt: string
│
├── evidence
│   ├── id: string
│   ├── type: EvidenceType
│   ├── producer: string
│   ├── subject: string
│   ├── timestamp: string
│   └── verificationStatus: VerificationStatus
│
├── verification
│   ├── status: VerificationStatus
│   ├── checks: VerificationCheck[]
│   ├── score: number
│   └── lastVerified: string
│
├── approvals
│   ├── id: string
│   ├── type: ApprovalType
│   ├── status: ApprovalStatus
│   ├── requestedAt: string
│   └── resolvedAt?: string
│
├── telemetry
│   ├── metrics: TelemetryMetrics
│   ├── alerts: TelemetryAlert[]
│   └── lastUpdated: string
│
├── relationships
│   ├── sourceId: string
│   ├── targetId: string
│   ├── type: RelationshipType
│   └── metadata: Record<string, unknown>
│
└── timeline
    ├── id: string
    ├── type: TimelineEventType
    ├── timestamp: string
    ├── description: string
    └── metadata: Record<string, unknown>
```

---

## 3. Session Operations

### 3.1 Lifecycle Operations

| Operation | Description | Required Role |
|-----------|-------------|---------------|
| Create | Start new session | Engineer |
| Plan | Define execution plan | Engineer / Architect |
| Approve Plan | Approve execution plan | Approver |
| Execute | Start agent execution | Engineer |
| Pause | Pause execution | Engineer |
| Resume | Resume paused execution | Engineer |
| Cancel | Cancel execution | Engineer |
| Verify | Run verification checks | Verifier |
| Approve | Approve verification | Approver |
| Complete | Mark session complete | System |
| Archive | Archive session | Engineer |

### 3.2 Intervention Operations

| Operation | Description | Effect |
|-----------|-------------|--------|
| Pause | Halt current execution | Agents stop, state preserved |
| Resume | Continue paused execution | Agents resume from checkpoint |
| Cancel | Stop execution permanently | State rolled back to last good |
| Redirect | Change agent or task | Execution transferred |
| Explain | Request decision rationale | Agent provides explanation |
| Require Verification | Add verification gate | Must verify before continuing |
| Require Approval | Add approval gate | Must approve before continuing |
| Rollback | Revert to previous state | File changes reverted |
| Quarantine | Isolate output for review | Output marked as untrusted |

---

## 4. Session Views

### 4.1 Projection Types

| View | Projection | Data Source |
|------|------------|-------------|
| Session Overview | High-level status | Session summary |
| Timeline View | Chronological events | Session timeline |
| Execution View | Agent work details | Executions collection |
| Evidence View | Verification records | Evidence collection |
| File View | File changes | Files collection |
| Artifact View | Generated artifacts | Artifacts collection |
| Relationship View | Entity connections | Relationships collection |

### 4.2 View Synchronization

All views stay synchronized through the Engineering Event Store.

```
Engineering Event Store
    ↓
Session State Update
    ↓
Projection Recalculation
    ↓
View Refresh
```

---

## 5. Session Persistence

### 5.1 Storage Model

```typescript
interface SessionStorage {
  // Primary storage
  save(session: EngineeringSession): Promise<void>;
  load(id: string): Promise<EngineeringSession>;
  list(filter: SessionFilter): Promise<SessionSummary[]>;
  
  // Event sourcing
  appendEvent(event: EngineeringEvent): Promise<void>;
  getEvents(sessionId: string): Promise<EngineeringEvent[]>;
  
  // State snapshots
  saveSnapshot(session: EngineeringSession): Promise<void>;
  loadSnapshot(sessionId: string): Promise<EngineeringSession | null>;
}
```

### 5.2 Event Sourcing

Every state change is recorded as an engineering event.

```typescript
interface EngineeringEvent {
  id: string;
  sessionId: string;
  type: EngineeringEventType;
  timestamp: string;
  actor: string;
  subject: string;
  data: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}
```

### 5.3 State Reconstruction

Session state is reconstructed from events:

1. Load latest snapshot (if available)
2. Apply events after snapshot timestamp
3. Return reconstructed state

---

## 6. Session Context

### 6.1 Context Propagation

The session context flows to all connected components:

```
EngineeringSession
    ↓
├── Plan Context
├── Workflow Context
├── Agent Context
├── Execution Context
├── Evidence Context
└── Verification Context
```

### 6.2 Context Contract

```typescript
interface SessionContext {
  session: EngineeringSession;
  project: ProjectContext;
  permissions: PermissionSet;
  telemetry: TelemetryCollector;
  eventBus: EventBus;
}
```

---

## 7. Implementation Notes

### 7.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Session Model | Partial | Core structure exists |
| Lifecycle | Partial | Basic states implemented |
| Persistence | Implemented | Event-sourced in SQLite |
| Views | Partial | Dashboard, Timeline exist |
| Inspector | Partial | Entity inspection exists |
| Interventions | Partial | Pause/Resume/Cancel exist |

### 7.2 Open Questions

1. How should sessions be grouped or organized?
2. What is the maximum session duration?
3. How are session archives managed?
4. What is the retention policy for session data?

---

*This document defines the Engineering Session as the primary object in the Vestara Workspace.*
*All other Workspace components operate within the session context.*
