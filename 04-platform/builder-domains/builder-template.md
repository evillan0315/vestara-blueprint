---
id: "builder-template"
title: "Builder Template — Canonical Builder Definition Contract"
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
tags: ["platform", "builder-domains", "template", "canonical"]
---

# Builder Template

## Canonical Builder Definition Contract

> **BuilderTemplate defines the configuration shape that every builder must declare. Individual builders become data rather than bespoke implementations.**

---

## 1. Architectural Position

```
BuilderTemplate
    │
    ├── Application Builder
    │       uses: BuilderTemplate
    │       domain: ApplicationDomain
    │
    ├── API Builder
    │       uses: BuilderTemplate
    │       domain: ApiDomain
    │
    ├── Database Builder
    │       uses: BuilderTemplate
    │       domain: DatabaseDomain
    │
    ├── Workflow Builder
    │       uses: BuilderTemplate
    │       domain: WorkflowDomain
    │
    ├── Infrastructure Builder
    │       uses: BuilderTemplate
    │       domain: InfrastructureDomain
    │
    └── Integration Builder
            uses: BuilderTemplate
            domain: IntegrationDomain
```

BuilderTemplate removes duplication. Each builder declares its configuration rather than reimplementing orchestration.

---

## 2. Canonical Entities

### 2.1 BuilderTemplate

```
BuilderTemplate
    ├── TemplateIdentity
    │   ├── id: TemplateId
    │   ├── name: string
    │   ├── version: string
    │   └── description: string
    ├── TemplateDefinition
    │   ├── supportedDomain: DomainReference
    │   ├── planningPipeline: PlanningPipelineDefinition
    │   ├── runtimeCapabilities: RuntimeCapabilityDefinition
    │   ├── requiredAgents: AgentDefinition[]
    │   ├── supportedArtifacts: ArtifactTypeDefinition[]
    │   ├── verificationStrategy: VerificationStrategyDefinition
    │   ├── evidenceRequirements: EvidenceRequirementDefinition[]
    │   └── outputContract: OutputContractDefinition
    ├── TemplateState
    │   ├── status: TemplateStatus
    │   ├── maturity: TemplateMaturity
    │   └── usage: TemplateUsage
    └── TemplateMetadata
        ├── tags: string[]
        ├── author: string
        ├── license: string
        └── repository: string
```

### 2.2 DomainReference

```typescript
interface DomainReference {
  domainId: string;
  domainVersion: string;
  canonicalDocument: string;
  runtimeOwner: string;
  entities: DomainEntityReference[];
  relationships: DomainRelationshipReference[];
  events: DomainEventReference[];
}
```

### 2.3 PlanningPipelineDefinition

```typescript
interface PlanningPipelineDefinition {
  stages: PlanningStage[];
  transitions: PlanningTransition[];
  gates: PlanningGate[];
  milestones: PlanningMilestone[];
  timeout: Duration;
  retryPolicy: RetryPolicyDefinition;
}

interface PlanningStage {
  id: string;
  name: string;
  type: StageType;
  actions: PlanningAction[];
  conditions: PlanningCondition[];
  participants: ParticipantDefinition[];
  timeout: Duration;
}

interface PlanningAction {
  id: string;
  name: string;
  type: ActionType;
  handler: string;
  parameters: ParameterDefinition[];
  timeout: Duration;
}

interface PlanningCondition {
  id: string;
  name: string;
  expression: string;
  evaluationContext: string;
}

interface PlanningGate {
  id: string;
  name: string;
  type: GateType;
  conditions: PlanningCondition[];
  requiredApprovals: number;
}

interface PlanningMilestone {
  id: string;
  name: string;
  description: string;
  requiredArtifacts: string[];
  verificationRequired: boolean;
}
```

### 2.4 RuntimeCapabilityDefinition

```typescript
interface RuntimeCapabilityDefinition {
  required: Capability[];
  optional: Capability[];
  deprecated: Capability[];
  experimental: Capability[];
}

interface Capability {
  id: string;
  name: string;
  version: string;
  required: boolean;
  fallback?: string;
}
```

### 2.5 AgentDefinition

```typescript
interface AgentDefinition {
  agentId: string;
  role: AgentRole;
  capabilities: Capability[];
  required: boolean;
  maxInstances: number;
  timeout: Duration;
  fallback?: string;
}

type AgentRole = 
  | 'planner'
  | 'architect'
  | 'developer'
  | 'reviewer'
  | 'verifier'
  | 'deployer';
```

### 2.6 ArtifactTypeDefinition

```typescript
interface ArtifactTypeDefinition {
  artifactType: string;
  name: string;
  description: string;
  format: string;
  schema?: string;
  validation: ValidationDefinition;
  storage: StorageDefinition;
  lifecycle: ArtifactLifecycleDefinition;
}

interface ArtifactLifecycleDefinition {
  creation: string;
  validation: string;
  storage: string;
  retrieval: string;
  archival: string;
}
```

### 2.7 VerificationStrategyDefinition

```typescript
interface VerificationStrategyDefinition {
  strategy: VerificationStrategy;
  levels: VerificationLevel[];
  criteria: VerificationCriterion[];
  automation: AutomationDefinition;
  evidence: EvidenceStrategyDefinition;
}

type VerificationStrategy = 
  | 'automatic'
  | 'manual'
  | 'hybrid'
  | 'gate-based';

interface VerificationLevel {
  id: string;
  name: string;
  type: VerificationType;
  required: boolean;
  automation: AutomationLevel;
  timeout: Duration;
}

type VerificationType = 
  | 'unit'
  | 'integration'
  | 'contract'
  | 'performance'
  | 'security'
  | 'compliance';

interface VerificationCriterion {
  id: string;
  name: string;
  description: string;
  metric: string;
  threshold: number;
  unit: string;
}
```

### 2.8 EvidenceRequirementDefinition

```typescript
interface EvidenceRequirementDefinition {
  evidenceType: string;
  name: string;
  description: string;
  required: boolean;
  automation: AutomationLevel;
  storage: StorageDefinition;
  retention: RetentionDefinition;
  validation: ValidationDefinition;
}

type AutomationLevel = 
  | 'manual'
  | 'semi-automatic'
  | 'automatic';
```

### 2.9 OutputContractDefinition

```typescript
interface OutputContractDefinition {
  artifacts: OutputArtifactDefinition[];
  relationships: OutputRelationshipDefinition[];
  events: OutputEventDefinition[];
  projections: OutputProjectionDefinition[];
}

interface OutputArtifactDefinition {
  artifactType: string;
  required: boolean;
  schema: string;
  validation: ValidationDefinition;
}

interface OutputRelationshipDefinition {
  relationshipType: string;
  source: string;
  target: string;
  cardinality: Cardinality;
}

interface OutputEventDefinition {
  eventType: string;
  payload: string;
  trigger: string;
}

interface OutputProjectionDefinition {
  projectionType: string;
  workspace: string;
  document: string;
}
```

---

## 3. Builder Declarations

### 3.1 Application Builder Declaration

```yaml
id: application-builder
name: Application Builder
version: 1.0.0
domain: ApplicationDomain

planningPipeline:
  stages:
    - id: brief
      name: Application Brief
      type: specification
    - id: requirements
      name: Requirements
      type: specification
    - id: architecture
      name: Architecture
      type: design
    - id: features
      name: Features
      type: planning
    - id: pages
      name: Pages and Routes
      type: design
    - id: components
      name: Components
      type: design
    - id: data-models
      name: Data Models
      type: design
    - id: api-integrations
      name: API Integrations
      type: design
    - id: authentication
      name: Authentication
      type: security
    - id: deployment
      name: Deployment
      type: operations
    - id: build-plan
      name: Build Plan
      type: execution
    - id: artifacts
      name: Generated Artifacts
      type: output

requiredAgents:
  - agentId: architect
    role: architect
    required: true
  - agentId: frontend-engineer
    role: developer
    required: true
  - agentId: verifier
    role: verifier
    required: true

supportedArtifacts:
  - artifactType: source-code
    name: Source Code
    format: typescript
  - artifactType: configuration
    name: Configuration Files
    format: json
  - artifactType: documentation
    name: Documentation
    format: markdown
  - artifactType: tests
    name: Tests
    format: typescript

verificationStrategy:
  strategy: hybrid
  levels:
    - id: unit
      name: Unit Tests
      type: unit
      required: true
      automation: automatic
    - id: integration
      name: Integration Tests
      type: integration
      required: true
      automation: automatic
    - id: e2e
      name: E2E Tests
      type: integration
      required: true
      automation: semi-automatic

outputContract:
  artifacts:
    - artifactType: source-code
      required: true
    - artifactType: configuration
      required: true
    - artifactType: documentation
      required: true
    - artifactType: tests
      required: true
  projections:
    - projectionType: builder-sections
      workspace: 06-workspace
      document: builders/01-application-builder.md
```

### 3.2 API Builder Declaration

```yaml
id: api-builder
name: API Builder
version: 1.0.0
domain: ApiDomain

planningPipeline:
  stages:
    - id: overview
      name: API Overview
      type: specification
    - id: resources
      name: Resources
      type: design
    - id: endpoints
      name: Endpoints
      type: design
    - id: schemas
      name: Schemas
      type: design
    - id: authentication
      name: Authentication
      type: security
    - id: authorization
      name: Authorization
      type: security
    - id: validation
      name: Validation
      type: quality
    - id: errors
      name: Errors
      type: design
    - id: events
      name: Events and Webhooks
      type: integration
    - id: integrations
      name: Integrations
      type: integration
    - id: tests
      name: Tests
      type: quality
    - id: openapi
      name: OpenAPI
      type: documentation
    - id: deployment
      name: Deployment
      type: operations

requiredAgents:
  - agentId: architect
    role: architect
    required: true
  - agentId: backend-engineer
    role: developer
    required: true
  - agentId: verifier
    role: verifier
    required: true

supportedArtifacts:
  - artifactType: openapi-spec
    name: OpenAPI Specification
    format: yaml
  - artifactType: source-code
    name: Source Code
    format: typescript
  - artifactType: tests
    name: Contract Tests
    format: typescript

verificationStrategy:
  strategy: gate-based
  levels:
    - id: contract
      name: Contract Tests
      type: contract
      required: true
      automation: automatic
    - id: integration
      name: Integration Tests
      type: integration
      required: true
      automation: automatic
    - id: security
      name: Security Tests
      type: security
      required: true
      automation: semi-automatic

outputContract:
  artifacts:
    - artifactType: openapi-spec
      required: true
    - artifactType: source-code
      required: true
    - artifactType: tests
      required: true
  projections:
    - projectionType: builder-sections
      workspace: 06-workspace
      document: builders/02-api-builder.md
```

### 3.3 Database Builder Declaration

```yaml
id: database-builder
name: Database Builder
version: 1.0.0
domain: DatabaseDomain

planningPipeline:
  stages:
    - id: overview
      name: Database Overview
      type: specification
    - id: schema
      name: Schema Design
      type: design
    - id: tables
      name: Tables
      type: design
    - id: indexes
      name: Indexes
      type: optimization
    - id: migrations
      name: Migrations
      type: operations
    - id: security
      name: Security
      type: security
    - id: performance
      name: Performance
      type: optimization
    - id: backup
      name: Backup Strategy
      type: operations
    - id: monitoring
      name: Monitoring
      type: operations

requiredAgents:
  - agentId: architect
    role: architect
    required: true
  - agentId: data-engineer
    role: developer
    required: true
  - agentId: verifier
    role: verifier
    required: true

supportedArtifacts:
  - artifactType: schema-definition
    name: Schema Definition
    format: sql
  - artifactType: migration-scripts
    name: Migration Scripts
    format: sql
  - artifactType: seed-data
    name: Seed Data
    format: sql

verificationStrategy:
  strategy: hybrid
  levels:
    - id: schema-validation
      name: Schema Validation
      type: unit
      required: true
      automation: automatic
    - id: migration-testing
      name: Migration Testing
      type: integration
      required: true
      automation: automatic
    - id: performance-testing
      name: Performance Testing
      type: performance
      required: true
      automation: semi-automatic

outputContract:
  artifacts:
    - artifactType: schema-definition
      required: true
    - artifactType: migration-scripts
      required: true
  projections:
    - projectionType: builder-sections
      workspace: 06-workspace
      document: builders/03-database-builder.md
```

---

## 4. Template Registration

### 4.1 Registration Interface

```typescript
interface BuilderTemplateRegistration {
  templateId: string;
  template: BuilderTemplate;
  metadata: TemplateMetadata;
  validation: TemplateValidation;
}

interface TemplateMetadata {
  author: string;
  license: string;
  repository: string;
  documentation: string;
  examples: string[];
}

interface TemplateValidation {
  schema: string;
  rules: ValidationRule[];
  required: boolean;
}
```

### 4.2 Registration Process

```
Template Definition
    ↓
Schema Validation
    ↓
Domain Validation
    ↓
Capability Validation
    ↓
Agent Validation
    ↓
Artifact Validation
    ↓
Verification Validation
    ↓
Registered
```

---

## 5. Lifecycle

### 5.1 Template Lifecycle

```
Draft
  ↓
Review
  ↓
Approved
  ↓
Published
  ↓
Active
  ↓
Deprecated
  ↓
Retired
```

### 5.2 Template Versioning

```typescript
interface TemplateVersion {
  major: number;
  minor: number;
  patch: number;
  breaking: boolean;
  deprecationNotice?: string;
  migrationGuide?: string;
}
```

---

## 6. Events

### 6.1 Template Events

| Event | Payload | Trigger |
|-------|---------|---------|
| TemplateCreated | BuilderTemplate | Creation |
| TemplateUpdated | BuilderTemplate, ChangeSet | Update |
| TemplatePublished | BuilderTemplate | Publication |
| TemplateDeprecated | BuilderTemplate, Reason | Deprecation |
| TemplateRetired | BuilderTemplate, Reason | Retirement |

---

## 7. Verification Requirements

### 7.1 Template Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Schema Validation | Template conforms to schema |
| Domain Validation | Domain reference exists and is valid |
| Capability Validation | Required capabilities available |
| Agent Validation | Required agents available |
| Artifact Validation | Artifact types supported |
| Verification Validation | Verification strategy valid |

### 7.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 8. Integration Points

### 8.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Builder Registry | Template registration | Registry API |
| Builder Runtime | Template execution | Runtime API |
| Domain Registry | Domain validation | Domain API |
| Agent Registry | Agent validation | Agent API |

---

## 9. Open Questions

1. How should template versions be managed?
2. How should template dependencies be resolved?
3. How should template validation be automated?
4. How should template examples be maintained?
5. How should template documentation be generated?

---

*This document defines the canonical Builder Template contract for Vestara.*
*Builders become data by declaring configuration rather than reimplementing orchestration.*
