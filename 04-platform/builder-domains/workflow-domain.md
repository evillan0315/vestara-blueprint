---
id: "workflow-domain"
title: "Workflow Domain — Canonical Contract"
volume: "04-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@chief-architect"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: []
tags: ["platform", "builder-domains", "workflow", "canonical"]
---

# Workflow Domain

## Canonical Contract

> **This document defines the canonical entities, relationships, and lifecycle for workflow development in Vestara.**

---

## 1. Canonical Entities

### 1.1 Workflow

```
Workflow
    ├── WorkflowIdentity
    │   ├── id: WorkflowId
    │   ├── name: string
    │   ├── version: string
    │   └── description: string
    ├── WorkflowDefinition
    │   ├── stages: StageDefinition[]
    │   ├── transitions: TransitionDefinition[]
    │   ├── participants: ParticipantDefinition[]
    │   └── rules: RuleDefinition[]
    ├── WorkflowState
    │   ├── status: WorkflowStatus
    │   ├── phase: WorkflowPhase
    │   └── progress: WorkflowProgress
    └── WorkflowMetadata
        ├── tags: string[]
        ├── category: WorkflowCategory
        └── priority: WorkflowPriority
```

### 1.2 Stage

```
Stage
    ├── StageIdentity
    │   ├── id: StageId
    │   ├── name: string
    │   ├── type: StageType
    │   └── description: string
    ├── StageDefinition
    │   ├── actions: ActionDefinition[]
    │   ├── conditions: ConditionDefinition[]
    │   ├── participants: ParticipantDefinition[]
    │   └── deadline: DeadlineDefinition
    ├── StageState
    │   ├── status: StageStatus
    │   ├── assignee: ParticipantId
    │   └── progress: StageProgress
    └── StageMetadata
        ├── tags: string[]
        ├── sla: SlaDefinition
        └── escalation: EscalationDefinition
```

### 1.3 Transition

```
Transition
    ├── TransitionIdentity
    │   ├── id: TransitionId
    │   ├── name: string
    │   ├── from: StageId
    │   ├── to: StageId
    │   └── description: string
    ├── TransitionDefinition
    │   ├── conditions: ConditionDefinition[]
    │   ├── guards: GuardDefinition[]
    │   ├── actions: ActionDefinition[]
    │   └── notifications: NotificationDefinition[]
    ├── TransitionState
    │   ├── status: TransitionStatus
    │   └── lastTriggered: timestamp
    └── TransitionMetadata
        ├── tags: string[]
        ├── automatic: boolean
        └── reversible: boolean
```

### 1.4 Participant

```
Participant
    ├── ParticipantIdentity
    │   ├── id: ParticipantId
    │   ├── type: ParticipantType
    │   ├── name: string
    │   └── description: string
    ├── ParticipantDefinition
    │   ├── roles: RoleDefinition[]
    │   ├── permissions: PermissionDefinition[]
    │   ├── responsibilities: ResponsibilityDefinition[]
    │   └── availability: AvailabilityDefinition
    ├── ParticipantState
    │   ├── status: ParticipantStatus
    │   ├── workload: WorkloadMetrics
    │   └── performance: PerformanceMetrics
    └── ParticipantMetadata
        ├── tags: string[]
        ├── skills: SkillDefinition[]
        └── capacity: CapacityDefinition
```

### 1.5 Action

```
Action
    ├── ActionIdentity
    │   ├── id: ActionId
    │   ├── name: string
    │   ├── type: ActionType
    │   └── description: string
    ├── ActionDefinition
    │   ├── handler: HandlerDefinition
    │   ├── parameters: ParameterDefinition[]
    │   ├── timeout: TimeoutDefinition
    │   └── retryPolicy: RetryPolicyDefinition
    ├── ActionState
    │   ├── status: ActionStatus
    │   ├── result: ActionResult
    │   └── error: ActionError
    └── ActionMetadata
        ├── tags: string[]
        ├── critical: boolean
        └── rollback: RollbackDefinition
```

### 1.6 Rule

```
Rule
    ├── RuleIdentity
    │   ├── id: RuleId
    │   ├── name: string
    │   ├── type: RuleType
    │   └── description: string
    ├── RuleDefinition
    │   ├── condition: ConditionDefinition
    │   ├── action: ActionDefinition
    │   ├── priority: number
    │   └── enabled: boolean
    ├── RuleState
    │   ├── status: RuleStatus
    │   ├── lastEvaluated: timestamp
    │   └── matchCount: number
    └── RuleMetadata
        ├── tags: string[]
        ├── category: RuleCategory
        └── scope: RuleScope
```

---

## 2. Relationships

### 2.1 Entity Relationships

```
Workflow 1──* Stage
Workflow 1──* Transition
Workflow 1──* Participant
Workflow 1──* Rule
Stage 1──* Action
Stage *──* Participant
Transition *──* Stage
Transition *──* Condition
Action *──* Rule
Rule *──* Condition
Rule *──* Action
```

### 2.2 Dependency Graph

```
Workflow
    ├── contains: Stage[]
    ├── defines: Transition[]
    ├── involves: Participant[]
    └── enforces: Rule[]

Stage
    ├── belongsTo: Workflow
    ├── contains: Action[]
    ├── assignedTo: Participant[]
    ├── reachedBy: Transition[]
    └── triggers: Transition[]

Transition
    ├── belongsTo: Workflow
    ├── from: Stage
    ├── to: Stage
    ├── guardedBy: Condition[]
    └── triggers: Action[]

Participant
    ├── belongsTo: Workflow
    ├── assignedTo: Stage[]
    ├── hasRole: RoleDefinition[]
    └── hasPermission: PermissionDefinition[]

Action
    ├── belongsTo: Stage
    ├── triggeredBy: Transition
    ├── governedBy: Rule[]
    └── produces: ActionResult

Rule
    ├── belongsTo: Workflow
    ├── evaluatedOn: Condition[]
    └── triggers: Action[]
```

---

## 3. Runtime Ownership

### 3.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| Workflow | WorkflowRuntime | Workflow lifecycle, execution |
| Stage | WorkflowRuntime | Stage management, assignment |
| Transition | WorkflowRuntime | Transition evaluation, execution |
| Participant | WorkflowRuntime | Participant management, assignment |
| Action | WorkflowRuntime | Action execution, error handling |
| Rule | WorkflowRuntime | Rule evaluation, enforcement |

### 3.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner may delegate projection to Workspace

---

## 4. Lifecycle

### 4.1 Workflow Lifecycle

```
Designed
  ↓
Implemented
  ↓
Tested
  ↓
Deployed
  ↓
Active
  ↓
Monitoring
  ↓
Optimized
  ↓
Retired
```

### 4.2 Stage Lifecycle

```
Defined
  ↓
Configured
  ↓
Active
  ↓
InProgress
  ↓
Completed
  ↓
Archived
```

### 4.3 Transition Lifecycle

```
Defined
  ↓
Configured
  ↓
Enabled
  ↓
Triggered
  ↓
Completed
  ↓
Disabled
```

### 4.4 Participant Lifecycle

```
Defined
  ↓
Assigned
  ↓
Active
  ↓
InProgress
  ↓
Completed
  ↓
Released
```

### 4.5 Action Lifecycle

```
Defined
  ↓
Configured
  ↓
Ready
  ↓
Executing
  ↓
Completed
  ↓
Archived
```

### 4.6 Rule Lifecycle

```
Defined
  ↓
Configured
  ↓
Enabled
  ↓
Evaluating
  ↓
Matching
  ↓
Disabled
```

---

## 5. Events

### 5.1 Workflow Events

| Event | Payload | Trigger |
|-------|---------|---------|
| WorkflowCreated | Workflow | Creation |
| WorkflowStarted | Workflow | Start |
| WorkflowCompleted | Workflow | Completion |
| WorkflowFailed | Workflow, Failure | Failure |
| WorkflowPaused | Workflow, Reason | Pause |
| WorkflowResumed | Workflow | Resume |
| WorkflowCancelled | Workflow, Reason | Cancellation |

### 5.2 Stage Events

| Event | Payload | Trigger |
|-------|---------|---------|
| StageCreated | Stage | Creation |
| StageAssigned | Stage, Participant | Assignment |
| StageStarted | Stage | Start |
| StageCompleted | Stage | Completion |
| StageFailed | Stage, Failure | Failure |
| StageSkipped | Stage, Reason | Skip |

### 5.3 Transition Events

| Event | Payload | Trigger |
|-------|---------|---------|
| TransitionDefined | Transition | Definition |
| TransitionEnabled | Transition | Enable |
| TransitionTriggered | Transition | Trigger |
| TransitionCompleted | Transition | Completion |
| TransitionFailed | Transition, Failure | Failure |
| TransitionDisabled | Transition, Reason | Disable |

### 5.4 Participant Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ParticipantDefined | Participant | Definition |
| ParticipantAssigned | Participant, Stage | Assignment |
| ParticipantStarted | Participant | Start |
| ParticipantCompleted | Participant | Completion |
| ParticipantReleased | Participant | Release |

### 5.5 Action Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ActionDefined | Action | Definition |
| ActionConfigured | Action | Configuration |
| ActionStarted | Action | Start |
| ActionCompleted | Action | Completion |
| ActionFailed | Action, Failure | Failure |
| ActionRetried | Action, Attempt | Retry |

### 5.6 Rule Events

| Event | Payload | Trigger |
|-------|---------|---------|
| RuleDefined | Rule | Definition |
| RuleEnabled | Rule | Enable |
| RuleEvaluated | Rule, Result | Evaluation |
| RuleMatched | Rule | Match |
| RuleDisabled | Rule, Reason | Disable |

---

## 6. Projection Points

### 6.1 Workspace Projections

| Entity | Projection | Workspace Document |
|--------|------------|-------------------|
| Workflow | Workflow Overview | `06-workspace/builders/05-workflow-builder.md` |
| Stage | Stage List | `06-workspace/builders/05-workflow-builder.md` |
| Transition | Transition Diagram | `06-workspace/builders/05-workflow-builder.md` |
| Participant | Participant List | `06-workspace/builders/05-workflow-builder.md` |
| Action | Action List | `06-workspace/builders/05-workflow-builder.md` |
| Rule | Rule List | `06-workspace/builders/05-workflow-builder.md` |

### 6.2 Projection Rules

1. **Projection Delegation**: Runtime owners delegate projection to Workspace
2. **Read-Only Projections**: Workspace projections are read-only views
3. **State Synchronization**: Projections update via domain events
4. **Lazy Loading**: Projections load on demand
5. **Caching**: Projections may cache for performance

---

## 7. Verification Requirements

### 7.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| Workflow | Execution Testing | Workflow executes correctly |
| Stage | Stage Testing | Stage completes correctly |
| Transition | Transition Testing | Transition triggers correctly |
| Participant | Assignment Testing | Participant assignment works |
| Action | Action Testing | Action executes correctly |
| Rule | Rule Testing | Rule evaluates correctly |

### 7.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 7.3 Evidence Requirements

1. **Execution Evidence**: Workflow execution logs
2. **Performance Evidence**: Workflow performance metrics
3. **Reliability Evidence**: Workflow reliability metrics
4. **Security Evidence**: Workflow security tests
5. **Compliance Evidence**: Workflow compliance checks

---

## 8. Integration Points

### 8.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Artifact Storage | Artifact management | Storage API |
| Verification Runtime | Verification execution | Verification API |
| Planning Service | Planning coordination | Planning API |

### 8.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Task Queue | Task management | Queue API |
| Notification Service | Notification delivery | Notification API |
| Timer Service | Timer management | Timer API |
| Audit Service | Audit logging | Audit API |

---

## 9. Open Questions

1. How should workflow versions be managed?
2. How should workflow failures be recovered?
3. How should workflow performance be monitored?
4. How should workflow security be enforced?
5. How should workflow compliance be ensured?

---

*This document defines the canonical Workflow domain contract for Vestara.*
*All Workflow-related projections in Volume 06 derive from this contract.*
