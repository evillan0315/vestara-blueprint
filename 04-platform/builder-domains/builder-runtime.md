---
id: "builder-runtime"
title: "BuilderRuntime — Canonical Orchestration Contract"
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
tags: ["platform", "builder-domains", "runtime", "canonical"]
---

# BuilderRuntime

## Canonical Orchestration Contract

> **BuilderRuntime owns the shared orchestration behavior for all builders. Individual builders contribute only domain-specific planning logic.**

---

## 1. Architectural Position

```
BuilderRuntime
    ↓
Application Builder
API Builder
Database Builder
Infrastructure Builder
Workflow Builder
Integration Builder
```

BuilderRuntime is the single orchestration surface. Every builder inherits:

- Lifecycle management
- Session binding
- Planning orchestration
- Agent assignment
- Progress reporting
- Artifact collection
- Verification coordination
- Evidence aggregation

---

## 2. Canonical Entities

### 2.1 BuilderRuntime

```
BuilderRuntime
    ├── RuntimeIdentity
    │   ├── id: RuntimeId
    │   ├── version: string
    │   └── capabilities: CapabilityDefinition[]
    ├── RuntimeState
    │   ├── status: RuntimeStatus
    │   ├── activeSessions: SessionId[]
    │   └── health: RuntimeHealth
    └── RuntimeConfiguration
        ├── maxConcurrentSessions: number
        ├── defaultTimeout: Duration
        ├── retryPolicy: RetryPolicyDefinition
        └── logging: LoggingConfiguration
```

### 2.2 BuilderSession

```
BuilderSession
    ├── SessionIdentity
    │   ├── id: SessionId
    │   ├── builderId: BuilderId
    │   ├── engineeringSessionId: EngineeringSessionId
    │   └── createdAt: timestamp
    ├── SessionDefinition
    │   ├── domain: DomainDefinition
    │   ├── scope: ScopeDefinition
    │   ├── objectives: ObjectiveDefinition[]
    │   └── constraints: ConstraintDefinition[]
    ├── SessionState
    │   ├── status: SessionStatus
    │   ├── phase: SessionPhase
    │   ├── progress: SessionProgress
    │   └── startedAt: timestamp
    └── SessionMetadata
        ├── tags: string[]
        ├── priority: SessionPriority
        └── owner: ParticipantId
```

### 2.3 BuilderWorkflow

```
BuilderWorkflow
    ├── WorkflowIdentity
    │   ├── id: WorkflowId
    │   ├── sessionId: SessionId
    │   ├── builderId: BuilderId
    │   └── version: string
    ├── WorkflowDefinition
    │   ├── stages: WorkflowStage[]
    │   ├── transitions: WorkflowTransition[]
    │   ├── gates: WorkflowGate[]
    │   └── milestones: WorkflowMilestone[]
    ├── WorkflowState
    │   ├── status: WorkflowStatus
    │   ├── currentStage: StageId
    │   ├── completedStages: StageId[]
    │   └── progress: WorkflowProgress
    └── WorkflowMetadata
        ├── tags: string[]
        ├── startedAt: timestamp
        └── estimatedCompletion: timestamp
```

### 2.4 PlanningContext

```
PlanningContext
    ├── ContextIdentity
    │   ├── id: ContextId
    │   ├── sessionId: SessionId
    │   └── createdAt: timestamp
    ├── ContextDefinition
    │   ├── domainContracts: DomainContractReference[]
    │   ├── existingArtifacts: ArtifactReference[]
    │   ├── constraints: ConstraintDefinition[]
    │   └── objectives: ObjectiveDefinition[]
    ├── ContextState
    │   ├── status: ContextStatus
    │   └── version: string
    └── ContextMetadata
        ├── tags: string[]
        └── source: ContextSource
```

### 2.5 AgentAssignment

```
AgentAssignment
    ├── AssignmentIdentity
    │   ├── id: AssignmentId
    │   ├── sessionId: SessionId
    │   ├── agentId: AgentId
    │   └── role: AgentRole
    ├── AssignmentDefinition
    │   ├── responsibilities: ResponsibilityDefinition[]
    │   ├── capabilities: CapabilityDefinition[]
    │   ├── constraints: ConstraintDefinition[]
    │   └── authority: AuthorityDefinition
    ├── AssignmentState
    │   ├── status: AssignmentStatus
    │   ├── workload: WorkloadMetrics
    │   └── performance: PerformanceMetrics
    └── AssignmentMetadata
        ├── tags: string[]
        ├── assignedAt: timestamp
        └── expiresAt: timestamp
```

### 2.6 ProgressReport

```
ProgressReport
    ├── ReportIdentity
    │   ├── id: ReportId
    │   ├── sessionId: SessionId
    │   ├── stageId: StageId
    │   └── reportedAt: timestamp
    ├── ReportDefinition
    │   ├── completed: ProgressItem[]
    │   ├── inProgress: ProgressItem[]
    │   ├── blocked: ProgressItem[]
    │   └── metrics: ProgressMetrics
    ├── ReportState
    │   ├── status: ReportStatus
    │   └── version: string
    └── ReportMetadata
        ├── tags: string[]
        └── reporter: ParticipantId
```

### 2.7 ArtifactCollection

```
ArtifactCollection
    ├── CollectionIdentity
    │   ├── id: CollectionId
    │   ├── sessionId: SessionId
    │   ├── builderId: BuilderId
    │   └── createdAt: timestamp
    ├── CollectionDefinition
    │   ├── artifacts: ArtifactReference[]
    │   ├── categories: ArtifactCategory[]
    │   ├── validation: ValidationDefinition
    │   └── documentation: DocumentationDefinition
    ├── CollectionState
    │   ├── status: CollectionStatus
    │   ├── totalCount: number
    │   └── validCount: number
    └── CollectionMetadata
        ├── tags: string[]
        └── version: string
```

### 2.8 VerificationCoordination

```
VerificationCoordination
    ├── CoordinationIdentity
    │   ├── id: CoordinationId
    │   ├── sessionId: SessionId
    │   ├── builderId: BuilderId
    │   └── createdAt: timestamp
    ├── CoordinationDefinition
    │   ├── verificationPlan: VerificationPlanDefinition
    │   ├── verificationSteps: VerificationStepDefinition[]
    │   ├── evidenceRequirements: EvidenceRequirementDefinition[]
    │   └── acceptanceCriteria: AcceptanceCriterionDefinition[]
    ├── CoordinationState
    │   ├── status: CoordinationStatus
    │   ├── completedSteps: StepId[]
    │   └── collectedEvidence: EvidenceReference[]
    └── CoordinationMetadata
        ├── tags: string[]
        └── lastVerifiedAt: timestamp
```

### 2.9 EvidenceAggregation

```
EvidenceAggregation
    ├── AggregationIdentity
    │   ├── id: AggregationId
    │   ├── sessionId: SessionId
    │   ├── builderId: BuilderId
    │   └── createdAt: timestamp
    ├── AggregationDefinition
    │   ├── evidenceItems: EvidenceItem[]
    │   ├── categories: EvidenceCategory[]
    │   ├── validation: ValidationDefinition
    │   └── summary: EvidenceSummaryDefinition
    ├── AggregationState
    │   ├── status: AggregationStatus
    │   ├── totalCount: number
    │   └── validCount: number
    └── AggregationMetadata
        ├── tags: string[]
        └── lastAggregatedAt: timestamp
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
BuilderRuntime 1──* BuilderSession
BuilderSession 1──* BuilderWorkflow
BuilderSession 1──* PlanningContext
BuilderSession 1──* AgentAssignment
BuilderSession 1──* ProgressReport
BuilderSession 1──* ArtifactCollection
BuilderSession 1──* VerificationCoordination
BuilderSession 1──* EvidenceAggregation
BuilderWorkflow *──* PlanningContext
AgentAssignment *──* BuilderSession
ProgressReport *──* BuilderSession
ArtifactCollection *──* BuilderSession
VerificationCoordination *──* BuilderSession
EvidenceAggregation *──* BuilderSession
```

### 3.2 Dependency Graph

```
BuilderRuntime
    ├── manages: BuilderSession[]
    ├── orchestrates: BuilderWorkflow[]
    └── coordinates: VerificationCoordination[]

BuilderSession
    ├── belongsTo: BuilderRuntime
    ├── executes: BuilderWorkflow
    ├── uses: PlanningContext
    ├── assignedTo: AgentAssignment[]
    ├── reports: ProgressReport[]
    ├── collects: ArtifactCollection
    ├── verifies: VerificationCoordination
    └── aggregates: EvidenceAggregation

BuilderWorkflow
    ├── belongsTo: BuilderSession
    ├── uses: PlanningContext
    ├── defines: WorkflowStage[]
    └── produces: ArtifactReference[]

PlanningContext
    ├── belongsTo: BuilderSession
    ├── references: DomainContractReference[]
    └── defines: ObjectiveDefinition[]

AgentAssignment
    ├── belongsTo: BuilderSession
    ├── assignedTo: AgentId
    └── hasRole: AgentRole

ProgressReport
    ├── belongsTo: BuilderSession
    ├── reportsOn: WorkflowStage
    └── references: ProgressItem[]

ArtifactCollection
    ├── belongsTo: BuilderSession
    ├── contains: ArtifactReference[]
    └── validatedBy: ValidationDefinition

VerificationCoordination
    ├── belongsTo: BuilderSession
    ├── verifies: ArtifactCollection
    └── collects: EvidenceAggregation

EvidenceAggregation
    ├── belongsTo: BuilderSession
    ├── collects: EvidenceItem[]
    └── validates: ValidationDefinition
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| BuilderRuntime | BuilderRuntime | Runtime lifecycle, capability management |
| BuilderSession | BuilderRuntime | Session lifecycle, resource allocation |
| BuilderWorkflow | BuilderRuntime | Workflow execution, stage management |
| PlanningContext | BuilderRuntime | Context management, constraint tracking |
| AgentAssignment | BuilderRuntime | Agent allocation, workload balancing |
| ProgressReport | BuilderRuntime | Progress tracking, reporting |
| ArtifactCollection | BuilderRuntime | Artifact collection, validation |
| VerificationCoordination | BuilderRuntime | Verification planning, execution |
| EvidenceAggregation | BuilderRuntime | Evidence collection, aggregation |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner may delegate projection to Workspace

---

## 5. Lifecycle

### 5.1 BuilderRuntime Lifecycle

```
Initialized
  ↓
Configured
  ↓
Ready
  ↓
Processing
  ↓
Monitoring
  ↓
Optimizing
  ↓
Shutdown
```

### 5.2 BuilderSession Lifecycle

```
Created
  ↓
Planning
  ↓
Executing
  ↓
Monitoring
  ↓
Completing
  ↓
Finalizing
  ↓
Archived
```

### 5.3 BuilderWorkflow Lifecycle

```
Defined
  ↓
Configured
  ↓
Started
  ↓
InProgress
  ↓
Completed
  ↓
Verified
  ↓
Archived
```

### 5.4 PlanningContext Lifecycle

```
Created
  ↓
Populated
  ↓
Validated
  ↓
Active
  ↓
Updated
  ↓
Archived
```

### 5.5 AgentAssignment Lifecycle

```
Created
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

### 5.6 ProgressReport Lifecycle

```
Created
  ↓
Reported
  ↓
Reviewed
  ↓
Accepted
  ↓
Archived
```

### 5.7 ArtifactCollection Lifecycle

```
Created
  ↓
Collecting
  ↓
Validating
  ↓
Complete
  ↓
Verified
  ↓
Archived
```

### 5.8 VerificationCoordination Lifecycle

```
Created
  ↓
Planning
  ↓
Executing
  ↓
Collecting
  ↓
Verifying
  ↓
Completed
  ↓
Archived
```

### 5.9 EvidenceAggregation Lifecycle

```
Created
  ↓
Collecting
  ↓
Validating
  ↓
Aggregating
  ↓
Complete
  ↓
Archived
```

---

## 6. Events

### 6.1 BuilderRuntime Events

| Event | Payload | Trigger |
|-------|---------|---------|
| RuntimeInitialized | BuilderRuntime | Initialization |
| RuntimeConfigured | BuilderRuntime, Configuration | Configuration |
| RuntimeReady | BuilderRuntime | Ready |
| RuntimeShutdown | BuilderRuntime, Reason | Shutdown |

### 6.2 BuilderSession Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SessionCreated | BuilderSession | Creation |
| SessionStarted | BuilderSession | Start |
| SessionCompleted | BuilderSession | Completion |
| SessionFailed | BuilderSession, Failure | Failure |
| SessionPaused | BuilderSession, Reason | Pause |
| SessionResumed | BuilderSession | Resume |
| SessionCancelled | BuilderSession, Reason | Cancellation |

### 6.3 BuilderWorkflow Events

| Event | Payload | Trigger |
|-------|---------|---------|
| WorkflowDefined | BuilderWorkflow | Definition |
| WorkflowStarted | BuilderWorkflow | Start |
| WorkflowStageCompleted | BuilderWorkflow, StageId | Stage completion |
| WorkflowCompleted | BuilderWorkflow | Completion |
| WorkflowFailed | BuilderWorkflow, Failure | Failure |

### 6.4 PlanningContext Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContextCreated | PlanningContext | Creation |
| ContextPopulated | PlanningContext, Data | Population |
| ContextValidated | PlanningContext, ValidationResult | Validation |
| ContextUpdated | PlanningContext, ChangeSet | Update |

### 6.5 AgentAssignment Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AgentAssigned | AgentAssignment | Assignment |
| AgentStarted | AgentAssignment | Start |
| AgentCompleted | AgentAssignment | Completion |
| AgentReleased | AgentAssignment | Release |

### 6.6 ProgressReport Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ProgressReported | ProgressReport | Reporting |
| ProgressReviewed | ProgressReport, Review | Review |
| ProgressAccepted | ProgressReport | Acceptance |

### 6.7 ArtifactCollection Events

| Event | Payload | Trigger |
|-------|---------|---------|
| CollectionStarted | ArtifactCollection | Start |
| ArtifactAdded | ArtifactCollection, Artifact | Addition |
| CollectionValidated | ArtifactCollection, ValidationResult | Validation |
| CollectionCompleted | ArtifactCollection | Completion |

### 6.8 VerificationCoordination Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationPlanned | VerificationCoordination | Planning |
| VerificationStarted | VerificationCoordination | Start |
| EvidenceCollected | VerificationCoordination, Evidence | Evidence collection |
| VerificationCompleted | VerificationCoordination | Completion |

### 6.9 EvidenceAggregation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| EvidenceAggregated | EvidenceAggregation, Evidence | Aggregation |
| EvidenceValidated | EvidenceAggregation, ValidationResult | Validation |
| AggregationCompleted | EvidenceAggregation | Completion |

---

## 7. Builder Contributions

### 7.1 Domain-Specific Logic

Each builder contributes only:

1. **Domain Planning Logic**: How to plan within the domain
2. **Domain Validation Logic**: How to validate domain artifacts
3. **Domain Verification Logic**: How to verify domain correctness
4. **Domain Documentation Logic**: How to document domain artifacts

### 7.2 Builder Registry

| Builder ID | Builder Name | Domain | Planning Logic |
|------------|--------------|--------|----------------|
| application-builder | Application Builder | Application | Application planning |
| api-builder | API Builder | API | API planning |
| database-builder | Database Builder | Database | Database planning |
| infrastructure-builder | Infrastructure Builder | Infrastructure | Infrastructure planning |
| workflow-builder | Workflow Builder | Workflow | Workflow planning |
| integration-builder | Integration Builder | Integration | Integration planning |

### 7.3 Builder Interface

```typescript
interface Builder {
  id: string;
  name: string;
  domain: string;
  
  // Domain-specific planning
  plan(context: PlanningContext): WorkflowDefinition;
  
  // Domain-specific validation
  validate(artifacts: ArtifactReference[]): ValidationResult;
  
  // Domain-specific verification
  verify(artifacts: ArtifactReference[]): VerificationResult;
  
  // Domain-specific documentation
  document(artifacts: ArtifactReference[]): DocumentationDefinition;
}
```

---

## 8. Projection Points

### 8.1 Workspace Projections

| Entity | Projection | Workspace Document |
|--------|------------|-------------------|
| BuilderRuntime | Runtime Overview | `06-workspace/builders/00-builder-runtime.md` |
| BuilderSession | Session List | `06-workspace/builders/00-builder-runtime.md` |
| BuilderWorkflow | Workflow Diagram | `06-workspace/builders/00-builder-runtime.md` |
| PlanningContext | Context View | `06-workspace/builders/00-builder-runtime.md` |
| AgentAssignment | Agent List | `06-workspace/builders/00-builder-runtime.md` |
| ProgressReport | Progress Dashboard | `06-workspace/builders/00-builder-runtime.md` |
| ArtifactCollection | Artifact List | `06-workspace/builders/00-builder-runtime.md` |
| VerificationCoordination | Verification View | `06-workspace/builders/00-builder-runtime.md` |
| EvidenceAggregation | Evidence List | `06-workspace/builders/00-builder-runtime.md` |

### 8.2 Projection Rules

1. **Projection Delegation**: Runtime owners delegate projection to Workspace
2. **Read-Only Projections**: Workspace projections are read-only views
3. **State Synchronization**: Projections update via domain events
4. **Lazy Loading**: Projections load on demand
5. **Caching**: Projections may cache for performance

---

## 9. Verification Requirements

### 9.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| BuilderRuntime | Runtime Testing | Runtime initializes correctly |
| BuilderSession | Session Testing | Session lifecycle works correctly |
| BuilderWorkflow | Workflow Testing | Workflow executes correctly |
| PlanningContext | Context Testing | Context populates correctly |
| AgentAssignment | Assignment Testing | Agent assignment works correctly |
| ProgressReport | Report Testing | Progress reporting works correctly |
| ArtifactCollection | Collection Testing | Artifact collection works correctly |
| VerificationCoordination | Verification Testing | Verification coordination works correctly |
| EvidenceAggregation | Aggregation Testing | Evidence aggregation works correctly |

### 9.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 9.3 Evidence Requirements

1. **Runtime Evidence**: Runtime initialization logs
2. **Session Evidence**: Session lifecycle logs
3. **Workflow Evidence**: Workflow execution logs
4. **Planning Evidence**: Planning context logs
5. **Assignment Evidence**: Agent assignment logs
6. **Progress Evidence**: Progress report logs
7. **Artifact Evidence**: Artifact collection logs
8. **Verification Evidence**: Verification coordination logs
9. **Evidence Aggregation Evidence**: Evidence aggregation logs

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Artifact Storage | Artifact management | Storage API |
| Verification Runtime | Verification execution | Verification API |
| Planning Service | Planning coordination | Planning API |
| Agent Runtime | Agent execution | Agent API |

### 10.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Task Queue | Task management | Queue API |
| Notification Service | Notification delivery | Notification API |
| Timer Service | Timer management | Timer API |
| Audit Service | Audit logging | Audit API |

---

## 11. Open Questions

1. How should BuilderRuntime handle concurrent sessions?
2. How should BuilderRuntime manage agent failures?
3. How should BuilderRuntime optimize resource allocation?
4. How should BuilderRuntime handle workflow timeouts?
5. How should BuilderRuntime coordinate cross-builder workflows?

---

*This document defines the canonical BuilderRuntime orchestration contract for Vestara.*
*All builders inherit this orchestration behavior and contribute only domain-specific logic.*
