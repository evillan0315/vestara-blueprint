---
id: "builder-sdk"
title: "Builder SDK — Canonical Builder Development Kit"
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
tags: ["platform", "builder-domains", "sdk", "canonical"]
---

# Builder SDK

## Canonical Builder Development Kit

> **Builder SDK provides the tools, APIs, and conventions for building custom builders. A custom builder can register itself with only configuration instead of modifying the Workspace directly.**

---

## 1. Architectural Position

```
Builder SDK
├── BuilderTemplate
├── BuilderRuntime API
├── Domain registration
├── Projection registration
├── Artifact registration
├── Verification registration
├── Evidence registration
└── Workspace contribution
```

The SDK is the interface between custom builders and the Vestara platform. It enables third-party contribution without modifying core components.

---

## 2. SDK Components

### 2.1 Core APIs

```typescript
// Builder definition
interface BuilderSDK {
  // Template API
  template: TemplateAPI;
  
  // Runtime API
  runtime: RuntimeAPI;
  
  // Domain API
  domain: DomainAPI;
  
  // Projection API
  projection: ProjectionAPI;
  
  // Artifact API
  artifact: ArtifactAPI;
  
  // Verification API
  verification: VerificationAPI;
  
  // Evidence API
  evidence: EvidenceAPI;
  
  // Registry API
  registry: RegistryAPI;
  
  // Event API
  events: EventAPI;
  
  // Logging API
  logging: LoggingAPI;
  
  // Configuration API
  configuration: ConfigurationAPI;
}
```

### 2.2 Template API

```typescript
interface TemplateAPI {
  // Create template
  create(template: BuilderTemplateDefinition): Promise<TemplateId>;
  
  // Validate template
  validate(template: BuilderTemplateDefinition): Promise<ValidationResult>;
  
  // Register template
  register(templateId: TemplateId): Promise<void>;
  
  // Get template
  get(templateId: TemplateId): Promise<BuilderTemplate>;
  
  // Update template
  update(templateId: TemplateId, changes: TemplateChangeSet): Promise<void>;
  
  // Delete template
  delete(templateId: TemplateId): Promise<void>;
  
  // List templates
  list(query?: TemplateQuery): Promise<TemplateSearchResult>;
}

interface BuilderTemplateDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  domain: DomainReference;
  planningPipeline: PlanningPipelineDefinition;
  runtimeCapabilities: RuntimeCapabilityDefinition;
  requiredAgents: AgentDefinition[];
  supportedArtifacts: ArtifactTypeDefinition[];
  verificationStrategy: VerificationStrategyDefinition;
  evidenceRequirements: EvidenceRequirementDefinition[];
  outputContract: OutputContractDefinition;
}
```

### 2.3 Runtime API

```typescript
interface RuntimeAPI {
  // Connect to runtime
  connect(runtimeId: string): Promise<RuntimeConnection>;
  
  // Get runtime capabilities
  getCapabilities(runtimeId: string): Promise<RuntimeCapability[]>;
  
  // Execute planning pipeline
  executePipeline(
    runtimeId: string,
    pipelineId: string,
    context: PlanningContext
  ): Promise<PipelineExecution>;
  
  // Get execution status
  getExecutionStatus(executionId: string): Promise<ExecutionStatus>;
  
  // Cancel execution
  cancelExecution(executionId: string): Promise<void>;
  
  // Get execution results
  getExecutionResults(executionId: string): Promise<ExecutionResults>;
}

interface RuntimeConnection {
  connectionId: string;
  runtimeId: string;
  status: ConnectionStatus;
  capabilities: RuntimeCapability[];
  connectedAt: string;
}

interface PlanningContext {
  sessionId: string;
  domain: DomainReference;
  scope: ScopeDefinition;
  objectives: ObjectiveDefinition[];
  constraints: ConstraintDefinition[];
  existingArtifacts: ArtifactReference[];
}
```

### 2.4 Domain API

```typescript
interface DomainAPI {
  // Register domain
  register(domain: DomainDefinition): Promise<DomainId>;
  
  // Validate domain
  validate(domain: DomainDefinition): Promise<ValidationResult>;
  
  // Get domain
  get(domainId: DomainId): Promise<DomainDefinition>;
  
  // List domains
  list(query?: DomainQuery): Promise<DomainSearchResult>;
  
  // Get domain entities
  getEntities(domainId: DomainId): Promise<EntityDefinition[]>;
  
  // Get domain relationships
  getRelationships(domainId: DomainId): Promise<RelationshipDefinition[]>;
  
  // Get domain events
  getEvents(domainId: DomainId): Promise<EventDefinition[]>;
}

interface DomainDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  entities: EntityDefinition[];
  relationships: RelationshipDefinition[];
  events: EventDefinition[];
  lifecycle: LifecycleDefinition;
  ownership: OwnershipDefinition;
}

interface EntityDefinition {
  id: string;
  name: string;
  type: EntityType;
  properties: PropertyDefinition[];
  relationships: RelationshipDefinition[];
  events: EventDefinition[];
  lifecycle: LifecycleDefinition;
}
```

### 2.5 Projection API

```typescript
interface ProjectionAPI {
  // Register projection
  register(projection: ProjectionDefinition): Promise<ProjectionId>;
  
  // Validate projection
  validate(projection: ProjectionDefinition): Promise<ValidationResult>;
  
  // Get projection
  get(projectionId: ProjectionId): Promise<ProjectionDefinition>;
  
  // List projections
  list(query?: ProjectionQuery): Promise<ProjectionSearchResult>;
  
  // Create projection view
  createView(
    projectionId: ProjectionId,
    view: ViewDefinition
  ): Promise<ViewId>;
  
  // Update projection view
  updateView(
    projectionId: ProjectionId,
    viewId: ViewId,
    changes: ViewChangeSet
  ): Promise<void>;
  
  // Delete projection view
  deleteView(projectionId: ProjectionId, viewId: ViewId): Promise<void>;
}

interface ProjectionDefinition {
  id: string;
  name: string;
  version: string;
  description: string;
  domain: DomainReference;
  source: ProjectionSource;
  transform: ProjectionTransform;
  target: ProjectionTarget;
  views: ViewDefinition[];
}

interface ProjectionSource {
  type: SourceType;
  entities: string[];
  events: string[];
  filters: FilterDefinition[];
}

type SourceType = 
  | 'domain'
  | 'runtime'
  | 'events'
  | 'graph'
  | 'custom';

interface ProjectionTransform {
  rules: TransformRule[];
  mappings: MappingDefinition[];
  validations: ValidationDefinition[];
}

interface ProjectionTarget {
  type: TargetType;
  workspace: string;
  document: string;
  sections: string[];
}

type TargetType = 
  | 'workspace'
  | 'inspector'
  | 'timeline'
  | 'graph'
  | 'custom';
```

### 2.6 Artifact API

```typescript
interface ArtifactAPI {
  // Register artifact type
  registerType(type: ArtifactTypeDefinition): Promise<ArtifactTypeId>;
  
  // Validate artifact type
  validateType(type: ArtifactTypeDefinition): Promise<ValidationResult>;
  
  // Get artifact type
  getType(typeId: ArtifactTypeId): Promise<ArtifactTypeDefinition>;
  
  // List artifact types
  listTypes(query?: ArtifactTypeQuery): Promise<ArtifactTypeSearchResult>;
  
  // Create artifact
  create(artifact: ArtifactDefinition): Promise<ArtifactId>;
  
  // Get artifact
  get(artifactId: ArtifactId): Promise<Artifact>;
  
  // Update artifact
  update(artifactId: ArtifactId, changes: ArtifactChangeSet): Promise<void>;
  
  // Delete artifact
  delete(artifactId: ArtifactId): Promise<void>;
  
  // List artifacts
  list(query?: ArtifactQuery): Promise<ArtifactSearchResult>;
  
  // Validate artifact
  validate(artifact: Artifact): Promise<ValidationResult>;
}

interface ArtifactTypeDefinition {
  id: string;
  name: string;
  description: string;
  format: string;
  schema?: string;
  validation: ValidationDefinition;
  storage: StorageDefinition;
  lifecycle: ArtifactLifecycleDefinition;
}

interface ArtifactDefinition {
  type: ArtifactTypeId;
  name: string;
  description: string;
  content: any;
  metadata: ArtifactMetadata;
  relationships: ArtifactRelationship[];
}
```

### 2.7 Verification API

```typescript
interface VerificationAPI {
  // Register verification strategy
  registerStrategy(
    strategy: VerificationStrategyDefinition
  ): Promise<StrategyId>;
  
  // Validate verification strategy
  validateStrategy(
    strategy: VerificationStrategyDefinition
  ): Promise<ValidationResult>;
  
  // Get verification strategy
  getStrategy(strategyId: StrategyId): Promise<VerificationStrategyDefinition>;
  
  // List verification strategies
  listStrategies(
    query?: StrategyQuery
  ): Promise<StrategySearchResult>;
  
  // Execute verification
  execute(
    verification: VerificationExecution
  ): Promise<VerificationResult>;
  
  // Get verification status
  getStatus(verificationId: string): Promise<VerificationStatus>;
  
  // Get verification results
  getResults(verificationId: string): Promise<VerificationResults>;
  
  // Cancel verification
  cancel(verificationId: string): Promise<void>;
}

interface VerificationStrategyDefinition {
  id: string;
  name: string;
  description: string;
  strategy: VerificationStrategy;
  levels: VerificationLevel[];
  criteria: VerificationCriterion[];
  automation: AutomationDefinition;
  evidence: EvidenceStrategyDefinition;
}

interface VerificationExecution {
  strategyId: StrategyId;
  artifacts: ArtifactReference[];
  context: VerificationContext;
  options: VerificationOptions;
}
```

### 2.8 Evidence API

```typescript
interface EvidenceAPI {
  // Register evidence type
  registerType(type: EvidenceTypeDefinition): Promise<EvidenceTypeId>;
  
  // Validate evidence type
  validateType(type: EvidenceTypeDefinition): Promise<ValidationResult>;
  
  // Get evidence type
  getType(typeId: EvidenceTypeId): Promise<EvidenceTypeDefinition>;
  
  // List evidence types
  listTypes(query?: EvidenceTypeQuery): Promise<EvidenceTypeSearchResult>;
  
  // Collect evidence
  collect(evidence: EvidenceCollection): Promise<EvidenceId>;
  
  // Get evidence
  get(evidenceId: EvidenceId): Promise<Evidence>;
  
  // Update evidence
  update(evidenceId: EvidenceId, changes: EvidenceChangeSet): Promise<void>;
  
  // Delete evidence
  delete(evidenceId: EvidenceId): Promise<void>;
  
  // List evidence
  list(query?: EvidenceQuery): Promise<EvidenceSearchResult>;
  
  // Validate evidence
  validate(evidence: Evidence): Promise<ValidationResult>;
}

interface EvidenceTypeDefinition {
  id: string;
  name: string;
  description: string;
  required: boolean;
  automation: AutomationLevel;
  storage: StorageDefinition;
  retention: RetentionDefinition;
  validation: ValidationDefinition;
}

interface EvidenceCollection {
  type: EvidenceTypeId;
  name: string;
  description: string;
  content: any;
  metadata: EvidenceMetadata;
  relationships: EvidenceRelationship[];
}
```

### 2.9 Registry API

```typescript
interface RegistryAPI {
  // Register builder
  register(manifest: BuilderManifest): Promise<BuilderId>;
  
  // Validate manifest
  validateManifest(manifest: BuilderManifest): Promise<ValidationResult>;
  
  // Get builder
  get(builderId: BuilderId): Promise<BuilderEntry>;
  
  // List builders
  list(query?: BuilderSearchQuery): Promise<BuilderSearchResult>;
  
  // Search builders
  search(query: BuilderSearchQuery): Promise<BuilderSearchResult>;
  
  // Install builder
  install(request: BuilderInstallRequest): Promise<BuilderInstallResult>;
  
  // Uninstall builder
  uninstall(builderId: BuilderId): Promise<void>;
  
  // Update builder
  update(builderId: BuilderId, version?: string): Promise<BuilderInstallResult>;
  
  // Enable builder
  enable(builderId: BuilderId): Promise<void>;
  
  // Disable builder
  disable(builderId: BuilderId, reason?: string): Promise<void>;
}
```

### 2.10 Event API

```typescript
interface EventAPI {
  // Emit event
  emit(event: DomainEvent): Promise<void>;
  
  // Subscribe to events
  subscribe(
    eventType: string,
    handler: EventHandler
  ): Promise<SubscriptionId>;
  
  // Unsubscribe from events
  unsubscribe(subscriptionId: SubscriptionId): Promise<void>;
  
  // Get event history
  getHistory(query: EventQuery): Promise<EventSearchResult>;
  
  // Get event statistics
  getStatistics(query: EventStatisticsQuery): Promise<EventStatistics>;
}

interface DomainEvent {
  type: string;
  payload: any;
  source: string;
  timestamp: string;
  metadata: EventMetadata;
}

interface EventHandler {
  handle(event: DomainEvent): Promise<void>;
}
```

### 2.11 Logging API

```typescript
interface LoggingAPI {
  // Log info
  info(message: string, context?: any): void;
  
  // Log warning
  warn(message: string, context?: any): void;
  
  // Log error
  error(message: string, error?: Error, context?: any): void;
  
  // Log debug
  debug(message: string, context?: any): void;
  
  // Log trace
  trace(message: string, context?: any): void;
  
  // Get logs
  getLogs(query: LogQuery): Promise<LogSearchResult>;
  
  // Clear logs
  clearLogs(query?: LogClearQuery): Promise<void>;
}
```

### 2.12 Configuration API

```typescript
interface ConfigurationAPI {
  // Get configuration
  get(key: string): Promise<any>;
  
  // Set configuration
  set(key: string, value: any): Promise<void>;
  
  // Delete configuration
  delete(key: string): Promise<void>;
  
  // List configuration
  list(query?: ConfigurationQuery): Promise<ConfigurationSearchResult>;
  
  // Validate configuration
  validate(key: string, value: any): Promise<ValidationResult>;
  
  // Watch configuration
  watch(key: string, handler: ConfigurationHandler): Promise<WatcherId>;
  
  // Unwatch configuration
  unwatch(watcherId: WatcherId): Promise<void>;
}
```

---

## 3. Builder Development Flow

### 3.1 Development Steps

```
1. Define Domain
    ↓
2. Create Template
    ↓
3. Implement Builder
    ↓
4. Register Projections
    ↓
5. Register Artifacts
    ↓
6. Register Verification
    ↓
7. Register Evidence
    ↓
8. Test Builder
    ↓
9. Publish Manifest
    ↓
10. Register with Registry
```

### 3.2 Example Builder Implementation

```typescript
import { BuilderSDK } from '@vestara/builder-sdk';

// Initialize SDK
const sdk = new BuilderSDK({
  runtime: 'builder-runtime',
  domain: 'custom-domain',
});

// Define domain
const domain = await sdk.domain.register({
  id: 'mobile-domain',
  name: 'Mobile Domain',
  version: '1.0.0',
  entities: [
    {
      id: 'app',
      name: 'Mobile App',
      type: 'entity',
      properties: [
        { id: 'name', type: 'string', required: true },
        { id: 'platform', type: 'enum', values: ['ios', 'android'] },
      ],
    },
  ],
});

// Create template
const template = await sdk.template.create({
  id: 'mobile-builder-template',
  name: 'Mobile Builder Template',
  version: '1.0.0',
  domain: { id: 'mobile-domain', version: '1.0.0' },
  planningPipeline: {
    stages: [
      { id: 'design', name: 'Design', type: 'design' },
      { id: 'develop', name: 'Develop', type: 'development' },
      { id: 'test', name: 'Test', type: 'testing' },
      { id: 'deploy', name: 'Deploy', type: 'deployment' },
    ],
  },
  requiredAgents: [
    { agentId: 'mobile-architect', role: 'architect', required: true },
    { agentId: 'mobile-developer', role: 'developer', required: true },
  ],
  supportedArtifacts: [
    { artifactType: 'source-code', name: 'Source Code', format: 'swift' },
    { artifactType: 'source-code', name: 'Source Code', format: 'kotlin' },
  ],
  verificationStrategy: {
    strategy: 'hybrid',
    levels: [
      { id: 'unit', name: 'Unit Tests', type: 'unit', required: true },
      { id: 'integration', name: 'Integration Tests', type: 'integration', required: true },
    ],
  },
});

// Register projection
await sdk.projection.register({
  id: 'mobile-builder-projection',
  name: 'Mobile Builder Projection',
  domain: { id: 'mobile-domain', version: '1.0.0' },
  source: {
    type: 'domain',
    entities: ['app'],
  },
  target: {
    type: 'workspace',
    workspace: '06-workspace',
    document: 'builders/mobile-builder.md',
  },
});

// Register with registry
await sdk.registry.register({
  id: 'mobile-builder',
  name: 'Mobile Builder',
  version: '1.0.0',
  description: 'Builder for mobile applications',
  author: 'custom-author',
  license: 'MIT',
  repository: 'https://github.com/custom/mobile-builder',
  domain: { id: 'mobile-domain', version: '1.0.0' },
  template: { id: 'mobile-builder-template', version: '1.0.0' },
  runtime: { id: 'builder-runtime', version: '1.0.0' },
  agents: [
    { id: 'mobile-architect', role: 'architect', required: true },
    { id: 'mobile-developer', role: 'developer', required: true },
  ],
  artifacts: [
    { type: 'source-code', name: 'Source Code', format: 'swift' },
    { type: 'source-code', name: 'Source Code', format: 'kotlin' },
  ],
  verification: {
    strategy: 'hybrid',
    levels: ['unit', 'integration'],
    automation: 'automatic',
  },
  workspace: {
    document: 'builders/mobile-builder.md',
    sections: ['overview', 'design', 'development', 'testing', 'deployment'],
    inspector: ['overview', 'design', 'development', 'testing', 'deployment', 'actions'],
  },
});
```

---

## 4. SDK Packages

### 4.1 Package Structure

```
@vestara/builder-sdk
├── core/
│   ├── sdk.ts
│   ├── types.ts
│   └── errors.ts
├── template/
│   ├── template-api.ts
│   └── template-types.ts
├── runtime/
│   ├── runtime-api.ts
│   └── runtime-types.ts
├── domain/
│   ├── domain-api.ts
│   └── domain-types.ts
├── projection/
│   ├── projection-api.ts
│   └── projection-types.ts
├── artifact/
│   ├── artifact-api.ts
│   └── artifact-types.ts
├── verification/
│   ├── verification-api.ts
│   └── verification-types.ts
├── evidence/
│   ├── evidence-api.ts
│   └── evidence-types.ts
├── registry/
│   ├── registry-api.ts
│   └── registry-types.ts
├── events/
│   ├── event-api.ts
│   └── event-types.ts
├── logging/
│   ├── logging-api.ts
│   └── logging-types.ts
├── configuration/
│   ├── configuration-api.ts
│   └── configuration-types.ts
└── utils/
    ├── validation.ts
    ├── transformation.ts
    └── helpers.ts
```

### 4.2 Package Dependencies

```json
{
  "name": "@vestara/builder-sdk",
  "version": "1.0.0",
  "dependencies": {
    "@vestara/builder-runtime": "^1.0.0",
    "@vestara/domain-registry": "^1.0.0",
    "@vestara/agent-registry": "^1.0.0",
    "@vestara/artifact-storage": "^1.0.0",
    "@vestara/verification-runtime": "^1.0.0",
    "@vestara/engineering-event-store": "^1.0.0",
    "@vestara/engineering-graph": "^1.0.0"
  }
}
```

---

## 5. Testing

### 5.1 Testing Utilities

```typescript
import { BuilderTestUtils } from '@vestara/builder-sdk/testing';

const testUtils = new BuilderTestUtils();

// Create test domain
const domain = await testUtils.createTestDomain();

// Create test template
const template = await testUtils.createTestTemplate(domain);

// Create test builder
const builder = await testUtils.createTestBuilder(template);

// Execute test pipeline
const result = await testUtils.executeTestPipeline(builder, {
  input: testInput,
  expected: testExpected,
});

// Verify results
expect(result.success).toBe(true);
expect(result.artifacts).toHaveLength(1);
```

### 5.2 Test Fixtures

```typescript
import { BuilderFixtures } from '@vestara/builder-sdk/testing';

// Get test fixtures
const fixtures = new BuilderFixtures();

// Use fixtures
const domain = fixtures.domain.mobile;
const template = fixtures.template.mobile;
const builder = fixtures.builder.mobile;
```

---

## 6. Documentation

### 6.1 Documentation Generation

```typescript
import { BuilderDocs } from '@vestara/builder-sdk/docs';

const docs = new BuilderDocs();

// Generate API documentation
const apiDocs = await docs.generateApiDocs(builder);

// Generate usage documentation
const usageDocs = await docs.generateUsageDocs(builder);

// Generate examples
const examples = await docs.generateExamples(builder);
```

### 6.2 Documentation Templates

```typescript
import { BuilderDocTemplates } from '@vestara/builder-sdk/docs';

const templates = new BuilderDocTemplates();

// Get template
const template = templates.getTemplate('builder-readme');

// Generate documentation
const documentation = await template.generate({
  builder: builderManifest,
  domain: domainDefinition,
  examples: exampleCode,
});
```

---

## 7. Distribution

### 7.1 Package Distribution

```typescript
import { BuilderDistributor } from '@vestara/builder-sdk/distribution';

const distributor = new BuilderDistributor();

// Package builder
const package = await distributor.package(builder);

// Publish to registry
await distributor.publish(package, {
  registry: 'npm',
  access: 'public',
});

// Publish to marketplace
await distributor.publishToMarketplace(package, {
  category: 'builders',
  tags: ['mobile', 'ios', 'android'],
});
```

### 7.2 Version Management

```typescript
import { BuilderVersioning } from '@vestara/builder-sdk/versioning';

const versioning = new BuilderVersioning();

// Get next version
const nextVersion = await versioning.getNextVersion(builder, 'minor');

// Create changelog
const changelog = await versioning.createChangelog(builder, nextVersion);

// Update manifest
await versioning.updateManifest(builder, nextVersion, changelog);
```

---

## 8. Integration Points

### 8.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Builder Runtime | Builder execution | Runtime API |
| Builder Registry | Builder registration | Registry API |
| Domain Registry | Domain registration | Domain API |
| Agent Registry | Agent registration | Agent API |
| Artifact Storage | Artifact management | Storage API |
| Verification Runtime | Verification execution | Verification API |
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |

### 8.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Package Registry | Package distribution | Registry API |
| Source Control | Source management | Git API |
| CI/CD Pipeline | Build and test | Pipeline API |
| Documentation | Documentation generation | Docs API |

---

## 9. Open Questions

1. How should SDK versions be managed?
2. How should SDK breaking changes be handled?
3. How should SDK documentation be maintained?
4. How should SDK examples be tested?
5. How should SDK community contributions be managed?

---

*This document defines the canonical Builder SDK specification for Vestara.*
*The SDK enables custom builders to register with only configuration instead of modifying the Workspace directly.*
