---
id: "workspace-projections"
title: "Workspace Projections — Domain Contract Projection Rules"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "2.0.0"
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
canonical: true
supersedes: "1.0.0"
tags: ["workspace", "projections", "domain-contracts", "ui"]
---

# Workspace Projections

## Domain Contract Projection Rules

> **The Workspace never defines business objects. It only projects canonical domain contracts.**

---

## 1. Projection Architecture

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

### 1.1 Ownership Rule

The Workspace is a **projection layer** over the Engineering Operating System. It does not own, define, or persist domain objects. Every entity displayed in the Workspace is a projection of a canonical domain contract defined elsewhere.

### 1.2 Persistence Rule

> **The Workspace may persist presentation preferences and transient interaction state, but it must not persist authoritative domain state independently of its canonical runtime owner.**

**Allowed persistence:**
- Panel layout and view state
- Density and theme preferences
- Dismissed notices
- Saved filters and column visibility
- Local drafts
- Navigation history

**Prohibited persistence:**
- Domain entity state (Agent, Session, Execution, etc.)
- Engineering events
- Evidence records
- Verification results
- Any state that has a canonical runtime owner

### 1.3 Anti-Pattern

```
Workspace
        ↓
defines Agent
defines Artifact
defines Evidence
defines Session
```

This creates two competing sources of truth. The Workspace must not define business objects.

---

## 2. Domain Contract Sources

> **Exact canonical document references, not volume numbers.**

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
| Policy Action | `04-platform/engineering-operating-system.md` | PolicyRuntime |

---

## 3. Projection Rules

### 3.1 Agent Center

> **Agent Center is a projection of Agent, Assignment, Execution, Capability, and Engineering Session.**

```
Agent Center
    ├── AgentIdentity (from Agent)
    ├── AgentState (from AgentRuntime)
    ├── ActiveAssignment (from Assignment)
    ├── CapabilitySummary (from Capability)
    ├── PerformanceMetrics (from Execution history)
    └── RecentEvents (from EngineeringEventStore)
```

The Workspace does not define `Agent`. It projects the canonical `Agent` contract from `05-ai-core/agent-domain.md` through the Engineering Graph.

### 3.2 Artifact Center

> **Artifact Center is a projection of Artifact, Execution, and Engineering Event.**

```
Artifact Center
    ├── ArtifactIdentity (from Artifact)
    ├── ArtifactContent (from Artifact)
    ├── Provenance (from Execution, EngineeringEvent)
    ├── VerificationStatus (from Verification)
    └── Relationships (from EngineeringGraph)
```

The Workspace does not define `Artifact`. It projects the canonical `Artifact` contract from `14-engineering/evidence-based-verification.md` through the Engineering Graph.

**Ownership chain:**
```
ArtifactStorage (domain owner)
    ↓
Engineering events
    ↓
Engineering Graph projection
    ↓
Workspace projection
```

### 3.3 Evidence Center

> **Evidence Center is a projection of Evidence, Claim, Verification, and Engineering Event.**

```
Evidence Center
    ├── EvidenceIdentity (from Evidence)
    ├── EvidenceProvenance (from Evidence)
    ├── Claims (from Claim)
    ├── VerificationStatus (from Verification)
    ├── Relationships (from EngineeringGraph)
    └── Integrity (from Evidence)
```

The Workspace does not define `Evidence`. It projects the canonical `Evidence` contract from `14-engineering/evidence-based-verification.md` through the Engineering Graph.

### 3.4 Verification Center

> **Verification Center is a projection of Verification, Claim, Evidence, and Check.**

```
Verification Center
    ├── VerificationStatus (from Verification)
    ├── Claims (from Claim)
    ├── Checks (from Verification)
    ├── Evidence (from Evidence)
    └── CompletionEligibility (from Verification)
```

The Workspace does not define `Verification`. It projects the canonical `Verification` contract from `14-engineering/evidence-based-verification.md` through the Engineering Graph.

**Note:** `ConfidenceScore` is not projected because historical confidence remains a proposed capability in the platform architecture. Only project confidence after a canonical domain contract defines its calculation and provenance.

### 3.5 Engineering Timeline

> **Engineering Timeline is a projection of Engineering Event, ordered by event sequence.**

```
Engineering Timeline
    ├── Events (from EngineeringEventStore)
    ├── EventRelationships (from EngineeringGraph)
    ├── ActorAttribution (from Agent, Human)
    └── SubjectReferences (from any domain entity)
```

**Ordering rule:**
- Primary ordering: event sequence (monotonic, from event store)
- Display timestamp: event timestamp (for human readability)
- Fallback ordering: sequence, then timestamp

The Workspace does not define `Timeline`. It projects the canonical `EngineeringEvent` contract from `04-platform/engineering-event-architecture.md` through the Engineering Graph.

### 3.6 Operations Center

> **Operations Center is a projection of Runtime Health, Telemetry, and Service Status.**

```
Operations Center
    ├── ServiceHealth (from Kernel)
    ├── SystemMetrics (from Kernel)
    ├── Alerts (from Kernel)
    ├── HealthChecks (from Kernel)
    └── Uptime (from Kernel)
```

The Workspace does not define `ServiceHealth` or `Metrics`. It projects the canonical runtime contracts from `04-platform/engineering-operating-system.md`.

### 3.7 Planning Workspace

> **Planning Workspace is a projection of Plan, Task, Intent, and Agent Recommendation.**

```
Planning Workspace
    ├── Intent (from EngineeringSession)
    ├── Context (from Repository, Project)
    ├── Plan (from Plan)
    ├── TaskGraph (from Task)
    ├── RiskAssessment (from Plan)
    ├── AgentRecommendations (from Agent, Capability)
    └── ApprovalStatus (from Approval)
```

The Workspace does not define `Plan` or `Task`. It projects the canonical contracts from `14-engineering/engineering-principles.md` through the Engineering Graph.

---

## 4. Inspector as Projection Funnel

The Universal Inspector is the primary mechanism for projecting domain entities.

```
Any Domain Entity
        ↓
Universal Inspector
    ├── Identity (from domain contract)
    ├── Current State (from runtime)
    ├── Relationships (from EngineeringGraph)
    ├── Activity (from EngineeringEventStore)
    ├── History (from EngineeringEventStore)
    ├── Evidence (from Evidence)
    ├── Risks (from Plan, Verification)
    └── Available Actions (from Policy, Permissions)
```

### 4.1 Inspector Rules

1. Every entity resolves through one Inspector contract
2. Inspector sections are populated from domain contracts, not invented by the Workspace
3. Inspector actions are governed by Policy and Permissions, not defined by the Workspace
4. Inspector history comes from the Engineering Event Store, not from Workspace state

---

## 5. Projection Contract

> **Workspace read model — not a domain contract.**

```typescript
type DomainEntityKind =
  | 'agent'
  | 'assignment'
  | 'execution'
  | 'artifact'
  | 'evidence'
  | 'verification'
  | 'plan'
  | 'task'
  | 'engineering-session'
  | 'engineering-event';

interface DomainContractReference {
  documentId: string;
  repository: string;
  path: string;
}

interface WorkspaceProjectionDescriptor {
  entityKind: DomainEntityKind;
  contract: DomainContractReference;
  runtimeOwner: string;
  graphScheme: `${string}://`;
  projectionId: string;
  inspectorSectionIds: readonly string[];
}

// Example projection descriptors
const projectionDescriptors: WorkspaceProjectionDescriptor[] = [
  {
    entityKind: 'agent',
    contract: {
      documentId: 'agent-domain',
      repository: 'evillan0315/vestara-ai-core',
      path: '05-ai-core/agent-domain.md',
    },
    runtimeOwner: 'AgentRuntime',
    graphScheme: 'agent://',
    projectionId: 'agent-center',
    inspectorSectionIds: ['identity', 'state', 'capabilities', 'assignments', 'history'],
  },
  {
    entityKind: 'evidence',
    contract: {
      documentId: 'evidence-based-verification',
      repository: 'evillan0315/vestara-blueprint',
      path: '14-engineering/evidence-based-verification.md',
    },
    runtimeOwner: 'VerificationRuntime',
    graphScheme: 'evidence://',
    projectionId: 'evidence-center',
    inspectorSectionIds: ['identity', 'provenance', 'claims', 'integrity', 'relationships'],
  },
  {
    entityKind: 'artifact',
    contract: {
      documentId: 'evidence-based-verification',
      repository: 'evillan0315/vestara-blueprint',
      path: '14-engineering/evidence-based-verification.md',
    },
    runtimeOwner: 'ArtifactStorage',
    graphScheme: 'artifact://',
    projectionId: 'artifact-center',
    inspectorSectionIds: ['identity', 'content', 'provenance', 'verification', 'relationships'],
  },
];
```

---

## 6. Action Projections

> **Actions are projected from the policy/action system, not defined by the Workspace.**

```typescript
interface WorkspaceActionProjection {
  actionId: string;
  labelToken: string;
  availability: 'available' | 'disabled' | 'hidden';
  decisionSource: string;
  approvalRequired: boolean;
  denialReason?: string;
}
```

The Workspace projects the effective action set returned by:
- Policy engine
- Capability gates
- Permissions
- Runtime state

It does not maintain its own list of valid interventions.

---

## 7. Implementation Notes

### 7.1 Current State

| Projection | Status | Notes |
|-----------|--------|-------|
| Agent Center | Partial | Basic agent listing exists |
| Artifact Center | Partial | Basic artifact listing exists |
| Evidence Center | Partial | Basic evidence listing exists |
| Verification Center | Partial | Basic verification listing exists |
| Engineering Timeline | Partial | Basic timeline exists |
| Operations Center | Partial | Basic operations view exists |
| Planning Workspace | Partial | Basic planning view exists |
| Universal Inspector | Implemented | Inspector exists |

### 7.2 Open Questions

1. How should projection descriptors be registered?
2. How should projection state be synchronized with domain state?
3. How should projection errors be handled?
4. How should projection performance be optimized?

---

*This document defines the projection rules for the Vestara Workspace.*
*The Workspace never defines business objects—it only projects canonical domain contracts.*
