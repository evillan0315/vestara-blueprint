---
id: "workspace-architecture"
title: "Workspace Architecture — Canonical Model and Design Decisions"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "ratified"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "architecture", "model", "design-decisions"]
implementation-ref: "local main (workspace-ui, workspace-runtime, kernel)"
---

# Workspace Architecture

## Canonical Model and Design Decisions

> **Vestara Workspace is a temporal, evidence-driven projection of an Engineering Session—not a collection of AI tools arranged in a sidebar.**

---

## 1. Architectural Model

The Workspace is organized around a single primary object: the **Engineering Session**. Everything else is a projection of that model.

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

### 1.1 Model Principles

| Principle | Description |
|-----------|-------------|
| **Session-Centric** | The Engineering Session is the primary object |
| **Temporal** | All state evolves over time; history is preserved |
| **Evidence-Driven** | Every action produces verifiable evidence |
| **Projection-Based** | UI views are projections of session state |
| **Event-Sourced** | Engineering Event Store is the source of truth |

### 1.2 What the Workspace Is Not

| Not This | But This |
|----------|----------|
| Collection of tools | Unified engineering environment |
| File explorer with AI | Session-driven workspace |
| Chat interface with files | Evidence-driven projection |
| Dashboard with widgets | Temporal event projection |
| IDE with plugins | Engineering Operating System |

---

## 2. Engineering Session Structure

The Engineering Session contains all state for a unit of engineering work.

```typescript
interface EngineeringSession {
  // Identity
  id: string;
  taskId: string;
  title: string;
  
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
  
  // State
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

type SessionStatus = 
  | 'created'
  | 'planning'
  | 'executing'
  | 'verifying'
  | 'completed'
  | 'failed'
  | 'archived';
```

### 2.1 Session Relationships

```
EngineeringSession
├── contains → Plan
├── triggers → Workflow
├── assigns → AgentAssignment[]
├── runs → Execution[]
├── produces → Artifact[]
├── captures → Evidence[]
├── verifies → VerificationState
├── requires → Approval[]
├── emits → TimelineEvent[]
└── records → ActivityLog
```

---

## 3. Design Decisions

### 3.1 Universal Inspector

Every entity resolves through one Inspector contract with entity-specific sections. No separate detail drawers for different entity types.

```typescript
interface Inspector {
  entity: Entity;
  sections: InspectorSection[];
  actions: InspectorAction[];
}

interface InspectorSection {
  type: 'identity' | 'state' | 'relationships' | 'activity' 
      | 'history' | 'evidence' | 'risks' | 'actions';
  title: string;
  content: unknown;
  expandable: boolean;
}

interface InspectorAction {
  id: string;
  label: string;
  icon: string;
  handler: () => Promise<void>;
  requiresApproval: boolean;
}
```

**Inspector Sections:**

| Section | Content |
|---------|---------|
| **Identity** | Name, type, owner, creation date |
| **Current State** | Status, progress, metrics |
| **Relationships** | Connected entities, dependencies |
| **Activity** | Recent actions, changes |
| **History** | Timeline of state transitions |
| **Evidence** | Proof of work, verification records |
| **Risks** | Known issues, warnings, blockers |
| **Available Actions** | Next possible operations |

### 3.2 Live State vs. Historical Truth

The interface clearly distinguishes ephemeral progress from persisted evidence.

```typescript
// Live State — what is happening now
interface LiveState {
  activeExecutions: Execution[];
  runningAgents: AgentStatus[];
  pendingApprovals: Approval[];
  currentTelemetry: TelemetryMetrics;
}

// Historical Truth — what actually happened
interface HistoricalTruth {
  engineeringEvents: EngineeringEvent[];
  completedExecutions: Execution[];
  collectedEvidence: Evidence[];
  auditTrail: AuditEvent[];
}
```

| Live State | Historical Truth |
|------------|------------------|
| Telemetry shows what is happening now | Engineering Event Store shows what happened |
| Ephemeral progress | Persisted evidence |
| Can change | Immutable once recorded |
| Optimistic updates | Verified facts |

### 3.3 Evidence as First-Class Entity

Every evidence item has identity, provenance, and verification status.

```typescript
interface Evidence {
  id: string;
  type: EvidenceType;
  
  // Provenance
  producer: string;        // Agent or process that created this
  subject: string;         // What this evidence is about
  timestamp: string;       // When this was created
  
  // Content
  artifact: Artifact;      // The actual evidence artifact
  
  // Verification
  verificationStatus: 'pending' | 'verified' | 'failed' | 'disputed';
  verifiedBy?: string;
  verifiedAt?: string;
  
  // Retention
  retentionPolicy: RetentionPolicy;
  expiresAt?: string;
}

type EvidenceType = 
  | 'test-result'
  | 'verification-record'
  | 'screenshot'
  | 'diff'
  | 'log'
  | 'metric'
  | 'approval'
  | 'inspection';
```

### 3.4 Intervention Controls

The Workspace exposes intervention controls beyond simple permissions.

```typescript
type InterventionAction = 
  | 'pause'           // Pause execution
  | 'resume'          // Resume paused execution
  | 'cancel'          // Cancel execution
  | 'redirect'        // Redirect to different agent/task
  | 'explain'         // Request explanation for decision
  | 'require-verification'  // Require verification before proceeding
  | 'require-approval'      // Require human approval
  | 'rollback'        // Rollback to previous state
  | 'quarantine';     // Quarantine output for review
```

### 3.5 Maturity Markers

Every Workspace specification identifies its implementation state.

```yaml
maturity: proposed | specified | partial | implemented | verified

implementation:
  repository: vestara-ai-core
  packages:
    - apps/workspace
    - packages/engineering-graph
  routes:
    - GET /api/workspace

verification:
  evidence: pending | collected
  tests: 0
  lastVerified: "2026-08-02"
```

---

## 4. Projection Model

UI views are projections of the Engineering Session state.

### 4.1 Projection Types

| Projection | Purpose | Data Source |
|------------|---------|-------------|
| **Dashboard** | High-level overview | Session summary |
| **Timeline** | Chronological events | Engineering events |
| **Graph** | Entity relationships | Engineering graph |
| **Inspector** | Entity details | Entity state |
| **Evidence View** | Verification records | Evidence collection |
| **Agent View** | Agent status and history | Agent runtime |
| **Operations View** | System health and telemetry | Runtime metrics |

### 4.2 Projection Contract

```typescript
interface Projection<T> {
  id: string;
  session: EngineeringSession;
  state: T;
  subscribe(callback: (state: T) => void): Subscription;
  refresh(): Promise<void>;
}
```

### 4.3 Projection Synchronization

All projections stay synchronized through the Engineering Event Store.

```
Engineering Event Store
    ↓
Event Bus
    ↓
Projections
    ↓
UI Components
```

---

## 5. Architectural Boundaries

### 5.1 Volume 06 Responsibilities

Volume 06 defines:

- Behavior and information architecture
- State models and transitions
- User flows and interactions
- Implementation boundaries
- API contracts
- Event protocols

### 5.2 Volume 13 Responsibilities

Volume 13 (Design System) owns:

- Colors and typography
- Spacing and layout tokens
- Motion and animation
- Component semantics
- Accessibility standards
- Themes and dark mode
- Agent visual identity

### 5.3 Boundary Rule

**Volume 06 defines WHAT happens. Volume 13 defines HOW it looks.**

---

## 6. Build Sequence

The Workspace should be built in this order:

| Order | Component | Rationale |
|-------|-----------|-----------|
| 1 | Application Shell | Foundation for all views |
| 2 | Engineering Session | Primary object model |
| 3 | Universal Inspector | Consistent entity inspection |
| 4 | Activity Timeline | Event history visualization |
| 5 | Execution Pipeline | Agent work visualization |
| 6 | Evidence & Verification | Proof of work |
| 7 | Agent Center | Agent management |
| 8 | Operations Center | System health |
| 9 | Engineering Graph | Relationship visualization |
| 10 | Historical Replay | Time-travel debugging |

### 6.1 Build Principle

**The Inspector and session model should come before advanced dashboards.** Otherwise, each screen invents its own state and navigation patterns.

---

## 7. Implementation References

### 7.1 Source Code

| Package | Path | Purpose |
|---------|------|---------|
| workspace | `packages/workspace/` | Core workspace runtime |
| workspace-ui | `apps/workspace/` | React UI implementation |
| kernel | `packages/kernel/` | Service orchestration |
| engineering-graph | `packages/engineering-graph/` | Graph queries and visualization |

### 7.2 Related ADRs

| ADR | Title |
|-----|-------|
| ADR-017 | WorkspaceRuntime |
| ADR-018 | RepositoryWorkspace |
| ADR-105 | Event-Sourced Engineering Graph |
| ADR-111 | Agent Harness Centered Runtime Architecture |
| ADR-119 | Agent Type Selection |

---

*This document is the architectural foundation for the Vestara Workspace.*
*All other Workspace specifications derive from this model.*
