---
id: "application-builder"
title: "Application Builder — Projection of Application Development Contracts"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
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
supersedes: []
tags: ["workspace", "builders", "application", "projection"]
---

# Application Builder

## Projection of Application Development Contracts

> **Application Builder orchestrates and projects existing domain contracts—it does not own them.**

---

## 1. Projection Sources

| Domain Contract | Canonical Document | Runtime Owner |
|----------------|-------------------|---------------|
| Project | `14-engineering/engineering-principles.md` | WorkspaceRuntime |
| Application Specification | `14-engineering/engineering-principles.md` | PlanningService |
| Feature | `14-engineering/engineering-principles.md` | PlanningService |
| Route | `04-platform/engineering-operating-system.md` | WorkspaceRuntime |
| Page | `14-engineering/engineering-principles.md` | PlanningService |
| Component | `14-engineering/engineering-principles.md` | PlanningService |
| Data Model | `14-engineering/engineering-principles.md` | PlanningService |
| API Dependency | `05-ai-core/agent-domain.md` | AgentRuntime |
| Workflow | `04-platform/engineering-operating-system.md` | WorkflowCoordinator |
| Plan | `14-engineering/engineering-principles.md` | PlanningService |
| Task | `14-engineering/engineering-principles.md` | PlanningService |
| Artifact | `14-engineering/evidence-based-verification.md` | ArtifactStorage |
| Execution | `04-platform/agent-harness-architecture.md` | AgentRuntime |
| Verification | `14-engineering/evidence-based-verification.md` | VerificationRuntime |
| Evidence | `14-engineering/evidence-based-verification.md` | VerificationRuntime |

---

## 2. Builder Workflow

```
Intent
  ↓
Application Specification
  ↓
Architecture
  ↓
Feature Graph
  ↓
Implementation Plan
  ↓
Agent Assignment
  ↓
Code Generation
  ↓
Verification
  ↓
Runnable Application
```

---

## 3. Projection Sections

### 3.1 Application Brief

> **Projection of: Project, Application Specification**

```
Application Brief
    ├── ProjectIdentity (from Project)
    ├── Specification (from Application Specification)
    ├── Objective (from EngineeringSession)
    ├── Constraints (from Application Specification)
    └── SuccessCriteria (from Application Specification)
```

### 3.2 Requirements

> **Projection of: Application Specification, Feature**

```
Requirements
    ├── FunctionalRequirements (from Application Specification)
    ├── NonFunctionalRequirements (from Application Specification)
    ├── Features (from Feature)
    ├── Priorities (from Application Specification)
    └── AcceptanceCriteria (from Feature)
```

### 3.3 Architecture

> **Projection of: Application Specification, Plan**

```
Architecture
    ├── SystemArchitecture (from Application Specification)
    ├── TechnologyStack (from Application Specification)
    ├── ComponentDiagram (from Application Specification)
    ├── DataFlow (from Application Specification)
    └── IntegrationPoints (from Application Specification)
```

### 3.4 Features

> **Projection of: Feature, Task**

```
Features
    ├── FeatureList (from Feature)
    ├── FeatureDependencies (from Feature)
    ├── FeatureStatus (from Task)
    ├── FeaturePriority (from Application Specification)
    └── FeatureGraph (from Feature)
```

### 3.5 Pages and Routes

> **Projection of: Route, Page**

```
Pages and Routes
    ├── RouteDefinitions (from Route)
    ├── PageComponents (from Page)
    ├── NavigationStructure (from Route)
    ├── RouteGuards (from Application Specification)
    └── RouteParameters (from Route)
```

### 3.6 Components

> **Projection of: Component, Artifact**

```
Components
    ├── ComponentLibrary (from Component)
    ├── ComponentHierarchy (from Component)
    ├── ComponentProps (from Component)
    ├── ComponentState (from Component)
    └── GeneratedComponents (from Artifact)
```

### 3.7 Data Models

> **Projection of: Data Model, Schema**

```
Data Models
    ├── EntityDefinitions (from Data Model)
    ├── Relationships (from Data Model)
    ├── Schemas (from Data Model)
    ├── Migrations (from Data Model)
    └── Validators (from Data Model)
```

### 3.8 API Integrations

> **Projection of: API Dependency, Integration**

```
API Integrations
    ├── ExternalAPIs (from API Dependency)
    ├── IntegrationPoints (from Integration)
    ├── AuthenticationRequirements (from Application Specification)
    ├── RateLimits (from Application Specification)
    └── ErrorHandling (from Application Specification)
```

### 3.9 Authentication

> **Projection of: Application Specification, Security Policy**

```
Authentication
    ├── AuthStrategy (from Application Specification)
    ├── AuthProviders (from Application Specification)
    ├── SessionManagement (from Application Specification)
    ├── TokenHandling (from Application Specification)
    └── SecurityPolicy (from Application Specification)
```

### 3.10 Deployment

> **Projection of: Plan, Execution, Artifact**

```
Deployment
    ├── DeploymentTargets (from Plan)
    ├── DeploymentStrategy (from Plan)
    ├── EnvironmentConfig (from Application Specification)
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
| Application Brief | Proposed | Not yet implemented |
| Requirements | Proposed | Not yet implemented |
| Architecture | Proposed | Not yet implemented |
| Features | Proposed | Not yet implemented |
| Pages and Routes | Proposed | Not yet implemented |
| Components | Proposed | Not yet implemented |
| Data Models | Proposed | Not yet implemented |
| API Integrations | Proposed | Not yet implemented |
| Authentication | Proposed | Not yet implemented |
| Deployment | Proposed | Not yet implemented |
| Build Plan | Proposed | Not yet implemented |
| Generated Artifacts | Proposed | Not yet implemented |

### 6.2 Open Questions

1. How should application specifications be validated?
2. How should feature graphs be visualized?
3. How should generated artifacts be verified?
4. How should deployment be automated?

---

*This document defines the Application Builder projection for the Vestara Workspace.*
*The Builder orchestrates and projects existing domain contracts—it does not own them.*
