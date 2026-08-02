---
id: "application-builder"
title: "Application Builder — Projection of Application Development Contracts"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "2.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: "1.0.0"
tags: ["workspace", "builders", "application", "projection"]
---

# Application Builder

## Projection of Application Development Contracts

> **Application Builder orchestrates and projects existing domain contracts—it does not own them.**

---

## 1. Projection Sources

### 1.1 Resolved Contracts

| Domain Contract | Canonical Document | Runtime Owner | Status |
|----------------|-------------------|---------------|--------|
| Project | `14-engineering/engineering-principles.md` | WorkspaceRuntime | Implemented |
| Plan | `14-engineering/engineering-principles.md` | PlanningService | Implemented |
| Task | `14-engineering/engineering-principles.md` | PlanningService | Implemented |
| Artifact | `14-engineering/evidence-based-verification.md` | ArtifactStorage | Implemented |
| Execution | `04-platform/agent-harness-architecture.md` | AgentRuntime | Implemented |
| Verification | `14-engineering/evidence-based-verification.md` | VerificationRuntime | Implemented |
| Evidence | `14-engineering/evidence-based-verification.md` | VerificationRuntime | Implemented |

### 1.2 Pending Canonical Contracts

| Domain Contract | Canonical Document | Runtime Owner | Status |
|----------------|-------------------|---------------|--------|
| Application Specification | Pending canonical contract | unresolved | Proposed |
| Feature | Pending canonical contract | unresolved | Proposed |
| Route | Pending canonical contract | unresolved | Proposed |
| Page | Pending canonical contract | unresolved | Proposed |
| Component | Pending canonical contract | unresolved | Proposed |
| Data Model | Pending canonical contract | unresolved | Proposed |
| API Dependency | Pending canonical contract | unresolved | Proposed |
| Integration | Pending canonical contract | unresolved | Proposed |
| Security Policy | Pending canonical contract | unresolved | Proposed |

> **Note:** These contracts are projected but not yet canonically defined. Volume 06 projects them assuming future canonical definitions exist in `04-platform/builder-domains/application-domain.md`.

---

## 2. Builder Workflow

```
Human Intent
    ↓
Engineering Session
    ↓
Builder Workflow
    ↓
Canonical Specification Drafts
    ↓
Plans and Tasks
    ↓
Executions
    ↓
Artifacts
    ↓
Verification and Evidence
```

> **The Engineering Session exists before the builder workflow executes. The Builder is a session-bound orchestration surface.**

---

## 3. Projection Sections

### 3.1 Application Brief

> **Projection of: Project, Application Specification (pending)**

```
Application Brief
    ├── ProjectIdentity (from Project)
    ├── Specification (from Application Specification — pending)
    ├── Objective (from EngineeringSession)
    ├── Constraints (from Application Specification — pending)
    └── SuccessCriteria (from Application Specification — pending)
```

### 3.2 Requirements

> **Projection of: Application Specification (pending), Feature (pending)**

```
Requirements
    ├── FunctionalRequirements (from Application Specification — pending)
    ├── NonFunctionalRequirements (from Application Specification — pending)
    ├── Features (from Feature — pending)
    ├── Priorities (from Application Specification — pending)
    └── AcceptanceCriteria (from Feature — pending)
```

### 3.3 Architecture

> **Projection of: Application Specification (pending), Plan**

```
Architecture
    ├── SystemArchitecture (from Application Specification — pending)
    ├── TechnologyStack (from Application Specification — pending)
    ├── ComponentDiagram (from Application Specification — pending)
    ├── DataFlow (from Application Specification — pending)
    └── IntegrationPoints (from Application Specification — pending)
```

### 3.4 Features

> **Projection of: Feature (pending), Task**

```
Features
    ├── FeatureList (from Feature — pending)
    ├── FeatureDependencies (from Feature — pending)
    ├── FeatureStatus (from Task)
    ├── FeaturePriority (from Application Specification — pending)
    └── FeatureGraph (from Feature — pending)
```

### 3.5 Pages and Routes

> **Projection of: Route (pending), Page (pending)**

```
Pages and Routes
    ├── RouteDefinitions (from Route — pending)
    ├── PageComponents (from Page — pending)
    ├── NavigationStructure (from Route — pending)
    ├── RouteGuards (from Application Specification — pending)
    └── RouteParameters (from Route — pending)
```

### 3.6 Components

> **Projection of: Component (pending), Artifact**

```
Components
    ├── ComponentLibrary (from Component — pending)
    ├── ComponentHierarchy (from Component — pending)
    ├── ComponentProps (from Component — pending)
    ├── ComponentState (from Component — pending)
    └── GeneratedComponents (from Artifact)
```

### 3.7 Data Models

> **Projection of: Data Model (pending)**

```
Data Models
    ├── EntityDefinitions (from Data Model — pending)
    ├── Relationships (from Data Model — pending)
    ├── Schemas (from Data Model — pending)
    ├── Migrations (from Data Model — pending)
    └── Validators (from Data Model — pending)
```

### 3.8 API Integrations

> **Projection of: API Dependency (pending), Integration (pending)**

```
API Integrations
    ├── ExternalAPIs (from API Dependency — pending)
    ├── IntegrationPoints (from Integration — pending)
    ├── AuthenticationRequirements (from Security Policy — pending)
    ├── RateLimits (from Application Specification — pending)
    └── ErrorHandling (from Application Specification — pending)
```

### 3.9 Authentication

> **Projection of: Application Specification (pending), Security Policy (pending)**

```
Authentication
    ├── AuthStrategy (from Security Policy — pending)
    ├── AuthProviders (from Security Policy — pending)
    ├── SessionManagement (from Application Specification — pending)
    ├── TokenHandling (from Security Policy — pending)
    └── SecurityPolicy (from Security Policy — pending)
```

### 3.10 Deployment

> **Projection of: Plan, Execution, Artifact**

```
Deployment
    ├── DeploymentTargets (from Plan)
    ├── DeploymentStrategy (from Plan)
    ├── EnvironmentConfig (from Application Specification — pending)
    ├── CICDPipeline (from Plan)
    └── DeploymentArtifacts (from Artifact)
```

### 3.11 Build Plan

> **Projection of: Plan, Task, Execution**

```
Build Plan
    ├── ImplementationPlan (from Plan)
    ├── TaskBreakdown (from Task)
    ├── AgentAssignments (from Execution)
    ├── Dependencies (from Task)
    ├── Timeline (from Plan)
    └── Risks (from Plan)
```

### 3.12 Generated Artifacts

> **Projection of: Artifact, Evidence**

```
Generated Artifacts
    ├── SourceCode (from Artifact)
    ├── ConfigurationFiles (from Artifact)
    ├── Documentation (from Artifact)
    ├── Tests (from Artifact)
    ├── Evidence (from Evidence)
    └── VerificationResults (from Verification)
```

---

## 4. Inspector Sections

The Application Builder projects through the Universal Inspector:

```
Application Builder Entity
        ↓
Universal Inspector
    ├── Identity (from domain contract)
    ├── Current State (from runtime)
    ├── Relationships (from EngineeringGraph)
    ├── Activity (from EngineeringEventStore)
    ├── History (from EngineeringEventStore)
    ├── Evidence (from Evidence)
    ├── Verification (from Verification)
    └── Available Actions (from Policy)
```

---

## 5. Action Projections

> **Actions are projected from the policy/action system, not defined by the Builder.**

```typescript
interface BuilderActionProjection {
  actionId: string;
  labelToken: string;
  availability: 'available' | 'disabled' | 'hidden';
  decisionSource: string;
  approvalRequired: boolean;
  denialReason?: string;
}
```

### 5.1 Available Actions by Stage

| Builder Stage | Available Actions |
|--------------|-------------------|
| Brief | Edit Brief, Start Planning |
| Requirements | Edit Requirements, Approve |
| Architecture | Edit Architecture, Approve |
| Features | Add Feature, Remove Feature, Prioritize |
| Pages | Add Page, Remove Page, Edit Routes |
| Components | Add Component, Remove Component |
| Data Models | Add Model, Remove Model |
| API Integrations | Add Integration, Remove Integration |
| Authentication | Configure Auth, Test Auth |
| Deployment | Configure Deployment, Test Deployment |
| Build Plan | Start Execution, Pause, Cancel |
| Generated Artifacts | View Artifacts, Verify, Deploy |

---

## 6. Implementation Notes

### 6.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Application Brief | Proposed | Canonical contract pending |
| Requirements | Proposed | Canonical contract pending |
| Architecture | Proposed | Canonical contract pending |
| Features | Proposed | Canonical contract pending |
| Pages and Routes | Proposed | Canonical contract pending |
| Components | Proposed | Canonical contract pending |
| Data Models | Proposed | Canonical contract pending |
| API Integrations | Proposed | Canonical contract pending |
| Authentication | Proposed | Canonical contract pending |
| Deployment | Proposed | Canonical contract pending |
| Build Plan | Proposed | Canonical contract pending |
| Generated Artifacts | Proposed | Canonical contract pending |

### 6.2 Open Questions

1. Where should canonical Application domain contracts be defined?
2. How should application specifications be validated?
3. How should feature graphs be visualized?
4. How should generated artifacts be verified?
5. How should deployment be automated?

---

*This document defines the Application Builder projection for the Vestara Workspace.*
*The Builder orchestrates and projects existing domain contracts—it does not own them.*
*Several projected contracts are pending canonical definitions.*
