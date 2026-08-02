---
id: "workspace-ux-contract"
title: "Workspace UX Contract — Canonical Interaction Architecture"
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
tags: ["workspace", "ux", "architecture", "contract"]
implementation-ref: "local main (workspace-ui, workspace-runtime)"
---

# Workspace UX Contract

## Canonical Interaction Architecture

> **The Workspace is the observable control surface of the Engineering Operating System. It does not own engineering state—it renders projections and issues governed commands.**

---

## 1. Architectural Boundary

The Workspace UI is a projection layer. It does not own engineering state.

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

### 1.1 Ownership Rules

| Owner | Responsibility |
|-------|----------------|
| WorkspaceRuntime | Workspace composition, session lifecycle |
| WorkflowCoordinator | Intent through completion lifecycle |
| AgentRuntime | Agent execution, provider routing |
| VerificationRuntime | Checks, evidence aggregation |
| EngineeringEventStore | Historical truth, event persistence |
| EngineeringGraph | Derived projections, relationship queries |
| ProviderLayer | Provider-specific intelligence only |

### 1.2 UI Constraints

The Workspace UI must NOT:

- Persist engineering state directly
- Bypass runtime owners for state mutations
- Treat live telemetry as historical truth
- Mix projection state with source-of-truth state

---

## 2. Canonical Engineering Lifecycle

```
Intent
  ↓
Context Assembly
  ↓
Planning
  ↓
Task Graph
  ↓
Agent Assignment
  ↓
Provider Routing
  ↓
Capability-Governed Execution
  ↓
Verification
  ↓
Evidence
  ↓
Completion
```

### 2.1 Stage Contract

Each lifecycle stage exposes:

```typescript
interface LifecycleStage {
  status: StageStatus;
  owner: string;
  agent?: string;
  provider?: string;
  model?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  inputs: StageInput[];
  outputs: StageOutput[];
  dependencies: string[];
  sideEffects: SideEffect[];
  evidence: EvidenceRecord[];
  verification?: VerificationResult;
  blockingConditions: BlockingCondition[];
  availableInterventions: InterventionAction[];
}
```

### 2.2 Stage Status

```typescript
type StageStatus = 
  | 'pending'
  | 'active'
  | 'blocked'
  | 'completed'
  | 'failed'
  | 'paused'
  | 'cancelled';
```

---

## 3. Information Architecture Tiers

### 3.1 Primary Engineering Domains

These are the core objects that define engineering work.

| Domain | Description | Inspector Contract |
|--------|-------------|-------------------|
| Projects | Repository and workspace organization | Yes |
| Engineering Sessions | Goal-bound work units with lifecycle | Yes |
| Plans | Step-by-step execution strategies | Yes |
| Executions | Active agent work and results | Yes |
| Agents | Agent assignment, orchestration, collaboration | Yes |
| Verification | Quality gates, checks, approval workflows | Yes |
| Evidence | Provenance-tracked proof of work | Yes |
| Engineering Graph | Entity relationships and derived projections | Yes |
| Operations | System health, runtime, diagnostics | Yes |

### 3.2 Tools (Contextual Instruments)

These are surfaces that attach to engineering domains.

| Tool | Binds To | Inspector |
|------|----------|-----------|
| Chat | Session conversation | Via session |
| Terminal | Governed execution tool | Via execution |
| Browser | Governed runtime tool | Via execution |
| Editor | File and artifact editing surface | Via file/artifact |
| Explorer | Repository projection | Via file |
| Documentation | Knowledge and document projection | Via document |

### 3.3 Platform Surfaces

These are system-level configuration and management surfaces.

| Surface | Purpose |
|---------|---------|
| Settings | Configuration governance |
| Marketplace | Extension and agent catalog |
| Routing | Provider and model routing |
| Notifications | System and session alerts |
| Profile | User identity and preferences |

---

## 4. Universal Inspector Contract

Every entity resolves through one Inspector contract.

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
  availableIn: StageStatus[];
}
```

### 4.1 Inspector Sections

| Section | Content | Applies To |
|---------|---------|------------|
| **Identity** | Name, type, owner, creation date | All entities |
| **Current State** | Status, progress, metrics | All entities |
| **Relationships** | Connected entities, dependencies | All entities |
| **Activity** | Recent actions, changes | All entities |
| **History** | Timeline of state transitions | All entities |
| **Evidence** | Proof of work, verification records | Executions, verifications |
| **Risks** | Known issues, warnings, blockers | Sessions, executions |
| **Available Actions** | Next possible operations | All entities |

### 4.2 Entity-Specific Projections

The Inspector adapts its sections based on entity type.

| Entity | Primary Sections | Secondary Sections |
|--------|------------------|-------------------|
| Engineering Session | State, Timeline, Evidence | Risks, Actions |
| Plan | Identity, Steps, Approvals | History, Risks |
| Execution | State, Agent, Tool Output | Evidence, Actions |
| Agent | Identity, Capabilities, History | Assignments, Metrics |
| Evidence | Provenance, Claims, Integrity | History, Actions |
| File | Identity, Changes, Relationships | History, Evidence |
| Artifact | Identity, Content, Provenance | Verification, History |

---

## 5. Live State vs. Historical Truth

### 5.1 Live Operational State

```typescript
interface LiveState {
  activeExecutions: Execution[];
  runningAgents: AgentStatus[];
  pendingApprovals: Approval[];
  currentTelemetry: TelemetryMetrics;
  activeSessions: EngineeringSession[];
}
```

**Examples:**
- "Agent is editing `runtime.ts`"
- "Build is running"
- "3 approvals pending"

### 5.2 Persisted Engineering History

```typescript
interface HistoricalTruth {
  engineeringEvents: EngineeringEvent[];
  completedExecutions: Execution[];
  collectedEvidence: Evidence[];
  auditTrail: AuditEvent[];
}
```

**Examples:**
- "Agent modified `runtime.ts` at 01:42:08"
- "Build completed with exit code 0"
- "Evidence X was captured at 01:42:15"

### 5.3 Visual Distinction

| Indicator | Live State | Historical Truth |
|-----------|------------|------------------|
| Color | Dynamic, animated | Static, muted |
| Timestamp | Relative ("2m ago") | Absolute ("01:42:08") |
| Mutability | Can change | Immutable |
| Source | Telemetry, WebSocket | Event Store |
| Badge | "Live" | "Recorded" |

---

## 6. Evidence Entity Contract

```typescript
interface EvidenceRecord {
  id: string;
  type: EvidenceType;
  subjectId: string;
  sessionId: string;
  executionId?: string;
  producedBy: string;
  capturedAt: string;
  source: string;
  claimIds: string[];
  status: EvidenceStatus;
  integrity?: {
    hash: string;
    algorithm: string;
  };
  retention?: {
    policy: RetentionPolicy;
    expiresAt?: string;
  };
}

type EvidenceType = 
  | 'test'
  | 'build'
  | 'terminal'
  | 'screenshot'
  | 'visual-comparison'
  | 'browser'
  | 'filesystem'
  | 'telemetry'
  | 'log'
  | 'review'
  | 'manual-observation';

type EvidenceStatus = 
  | 'captured'
  | 'validated'
  | 'rejected'
  | 'expired';
```

### 6.1 Evidence Properties

| Property | Description |
|----------|-------------|
| **Provenance** | Who produced this evidence and when |
| **Claims** | What this evidence asserts |
| **Freshness** | When this evidence was captured |
| **Integrity** | Cryptographic hash for tamper detection |
| **Validity** | Whether this evidence has been validated |
| **Conflicts** | Whether this evidence contradicts other evidence |
| **Retention** | How long this evidence is preserved |

---

## 7. Intervention Controls

```typescript
type InterventionAction = 
  | 'pause-session'
  | 'resume-session'
  | 'cancel-session'
  | 'pause-agent'
  | 'redirect-task'
  | 'change-assignment'
  | 'change-provider-model'
  | 'request-explanation'
  | 'request-evidence'
  | 'require-re-verification'
  | 'reject-output'
  | 'approve-operation'
  | 'quarantine-artifact'
  | 'rollback-change-set'
  | 'open-affected-files'
  | 'create-follow-up-task';
```

### 7.1 State-Dependent Availability

| Action | Before Side Effects | After Side Effects |
|--------|--------------------|--------------------|
| Reassignment | Automatic if policy permits | Requires explicit approval |
| Provider/Model Change | Allowed | Requires approval + review |
| Cancel | Allowed with rollback | Requires approval |
| Redirect | Allowed | Requires approval |
| Quarantine | Allowed | Allowed |
| Rollback | Allowed | Requires approval |

---

## 8. Configuration Governance

### 8.1 Configuration Hierarchy

```
Built-in defaults
    ↓
User configuration
    ↓
Workspace configuration
    ↓
Session overrides
    ↓
Command-specific overrides
```

### 8.2 Resolved Value Inspector

For any effective setting, the user should see:

```
Effective value: require-approval
Source: workspace policy
Overridden by: session policy
Default value: allow-with-audit
Locked by: organization policy
Applies to: filesystem.delete
```

---

## 9. Command Origin Tracking

Until CLI-Workspace unification is implemented, the blueprint should not claim that CLI actions are visible in the Workspace.

**Proposed Origins:**

```typescript
type CommandOrigin = 
  | 'workspace-ui'
  | 'vestara-cli'
  | 'agent'
  | 'api'
  | 'system'
  | 'automation';
```

---

## 10. Maturity Marker

```yaml
maturity: specified

implementation:
  repository: vestara-ai-core
  packages:
    - apps/workspace
    - packages/workspace
    - packages/engineering-graph

verification:
  evidence: partial
  tests: 0
  lastVerified: "2026-08-02"
```

---

*This document is the canonical UX contract for the Vestara Workspace.*
*It defines how the Engineering Operating System becomes a coherent human experience.*
