---
id: "workspace-projections"
title: "Workspace Projections — Domain Contract Projection Rules"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
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
supersedes: []
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
Runtime
        ↓
Engineering Graph
        ↓
Workspace Projection
        ↓
UI Component
```

### 1.1 Ownership Rule

The Workspace is a **projection layer** over the Engineering Operating System. It does not own, define, or persist domain objects. Every entity displayed in the Workspace is a projection of a canonical domain contract defined elsewhere.

### 1.2 Anti-Pattern

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

The Workspace does not define `Agent`. It projects the canonical `Agent` contract from Volume 08 through the Engineering Graph.

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

The Workspace does not define `Artifact`. It projects the canonical `Artifact` contract from Volume 14 through the Engineering Graph.

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

The Workspace does not define `Evidence`. It projects the canonical `Evidence` contract from Volume 14 through the Engineering Graph.

### 3.4 Verification Center

> **Verification Center is a projection of Verification, Claim, Evidence, and Check.**

```
Verification Center
    ├── VerificationStatus (from Verification)
    ├── Claims (from Claim)
    ├── Checks (from Verification)
    ├── ConfidenceScore (from Verification)
    ├── Evidence (from Evidence)
    └── CompletionEligibility (from Verification)
```

The Workspace does not define `Verification`. It projects the canonical `Verification` contract from Volume 14 through the Engineering Graph.

### 3.5 Engineering Timeline

> **Engineering Timeline is a projection of Engineering Event, ordered by timestamp.**

```
Engineering Timeline
    ├── Events (from EngineeringEventStore)
    ├── EventRelationships (from EngineeringGraph)
    ├── ActorAttribution (from Agent, Human)
    └── SubjectReferences (from any domain entity)
```

The Workspace does not define `Timeline`. It projects the canonical `EngineeringEvent` contract from Volume 04 through the Engineering Graph.

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

The Workspace does not define `ServiceHealth` or `Metrics`. It projects the canonical runtime contracts from Volume 04.

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

The Workspace does not define `Plan` or `Task`. It projects the canonical contracts from Volume 14 through the Engineering Graph.

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
// Workspace projection rule
interface ProjectionRule {
  domainEntity: string;
  volume: string;
  runtime: string;
  graphNodeType: string;
  inspectorSections: string[];
  availableActions: string[];
}

// Example projection rules
const projectionRules: ProjectionRule[] = [
  {
    domainEntity: 'Agent',
    volume: '08-ai-agent',
    runtime: 'AgentRuntime',
    graphNodeType: 'agent://',
    inspectorSections: ['identity', 'state', 'capabilities', 'assignments', 'history'],
    availableActions: ['pause', 'redirect', 'view-session'],
  },
  {
    domainEntity: 'Evidence',
    volume: '14-engineering',
    runtime: 'VerificationRuntime',
    graphNodeType: 'evidence://',
    inspectorSections: ['identity', 'provenance', 'claims', 'integrity', 'relationships'],
    availableActions: ['view-raw', 'download', 'compare'],
  },
  {
    domainEntity: 'Artifact',
    volume: '14-engineering',
    runtime: 'EngineeringGraph',
    graphNodeType: 'artifact://',
    inspectorSections: ['identity', 'content', 'provenance', 'verification', 'relationships'],
    availableActions: ['view-diff', 'view-file', 'quarantine'],
  },
];
```

---

## 6. Implementation Notes

### 6.1 Current State

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

### 6.2 Open Questions

1. How should projection rules be registered?
2. How should projection state be synchronized with domain state?
3. How should projection errors be handled?
4. How should projection performance be optimized?

---

*This document defines the projection rules for the Vestara Workspace.*
*The Workspace never defines business objects—it only projects canonical domain contracts.*
