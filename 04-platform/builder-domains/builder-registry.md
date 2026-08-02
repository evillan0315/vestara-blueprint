---
id: "builder-registry"
title: "Builder Registry — Canonical Builder Discovery Contract"
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
tags: ["platform", "builder-domains", "registry", "canonical"]
---

# Builder Registry

## Canonical Builder Discovery Contract

> **Builder Registry is the single source of truth for available builders. It enables third-party contribution without modifying the core Workspace.**

---

## 1. Architectural Position

```
Builder Registry
        │
        ├── Application Builder
        ├── API Builder
        ├── Database Builder
        ├── Workflow Builder
        ├── Infrastructure Builder
        ├── Integration Builder
        └── [Third-Party Builders]
```

The registry makes builders discoverable. Third parties can contribute builders by registering them rather than modifying the Workspace directly.

---

## 2. Canonical Entities

### 2.1 BuilderRegistry

```
BuilderRegistry
    ├── RegistryIdentity
    │   ├── id: RegistryId
    │   ├── version: string
    │   └── description: string
    ├── RegistryState
    │   ├── status: RegistryStatus
    │   ├── builders: BuilderEntry[]
    │   └── health: RegistryHealth
    └── RegistryConfiguration
        ├── autoDiscovery: boolean
        ├── validation: ValidationConfiguration
        ├── caching: CachingConfiguration
        └── security: SecurityConfiguration
```

### 2.2 BuilderEntry

```
BuilderEntry
    ├── EntryIdentity
    │   ├── id: BuilderId
    │   ├── name: string
    │   ├── version: string
    │   └── description: string
    ├── EntryDefinition
    │   ├── template: TemplateReference
    │   ├── domain: DomainReference
    │   ├── runtime: RuntimeReference
    │   ├── capabilities: CapabilityDefinition[]
    │   ├── workspaceProjections: WorkspaceProjectionDefinition[]
    │   ├── verificationStrategy: VerificationStrategyDefinition
    │   ├── artifactTypes: ArtifactTypeDefinition[]
    │   └── dependencies: DependencyDefinition[]
    ├── EntryState
    │   ├── status: BuilderStatus
    │   ├── maturity: BuilderMaturity
    │   ├── installed: boolean
    │   ├── enabled: boolean
    │   └── lastUsed: timestamp
    └── EntryMetadata
        ├── tags: string[]
        ├── author: string
        ├── license: string
        ├── repository: string
        ├── documentation: string
        ├── homepage: string
        ├── issues: string
        └── lastUpdated: timestamp
```

### 2.3 BuilderManifest

```typescript
interface BuilderManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  
  // Identity
  author: string;
  license: string;
  repository: string;
  homepage?: string;
  issues?: string;
  
  // Domain
  domain: {
    id: string;
    version: string;
    entities: string[];
  };
  
  // Template
  template: {
    id: string;
    version: string;
  };
  
  // Runtime
  runtime: {
    id: string;
    version: string;
    capabilities: string[];
  };
  
  // Agents
  agents: {
    id: string;
    role: string;
    required: boolean;
  }[];
  
  // Artifacts
  artifacts: {
    type: string;
    name: string;
    format: string;
    schema?: string;
  }[];
  
  // Verification
  verification: {
    strategy: string;
    levels: string[];
    automation: string;
  };
  
  // Workspace
  workspace: {
    document: string;
    sections: string[];
    inspector: string[];
  };
  
  // Dependencies
  dependencies?: {
    builders?: string[];
    domains?: string[];
    agents?: string[];
  };
  
  // Configuration
  configuration?: {
    schema: string;
    defaults: Record<string, any>;
  };
}
```

### 2.4 BuilderSearchQuery

```typescript
interface BuilderSearchQuery {
  query?: string;
  domain?: string;
  tags?: string[];
  author?: string;
  maturity?: string;
  capability?: string;
  artifact?: string;
  limit?: number;
  offset?: number;
  sort?: 'name' | 'version' | 'lastUpdated' | 'popularity';
  order?: 'asc' | 'desc';
}
```

### 2.5 BuilderSearchResult

```typescript
interface BuilderSearchResult {
  builders: BuilderEntry[];
  total: number;
  hasMore: boolean;
  nextPage?: number;
}
```

### 2.6 BuilderInstallRequest

```typescript
interface BuilderInstallRequest {
  builderId: string;
  version?: string;
  force?: boolean;
  skipValidation?: boolean;
}
```

### 2.7 BuilderInstallResult

```typescript
interface BuilderInstallResult {
  success: boolean;
  builderId: string;
  version: string;
  installedAt: string;
  warnings?: string[];
  errors?: string[];
}
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
BuilderRegistry 1──* BuilderEntry
BuilderEntry *──* BuilderTemplate
BuilderEntry *──* DomainReference
BuilderEntry *──* RuntimeReference
BuilderEntry *──* WorkspaceProjectionDefinition
BuilderEntry *──* ArtifactTypeDefinition
BuilderEntry *──* VerificationStrategyDefinition
BuilderEntry *──* DependencyDefinition
```

### 3.2 Dependency Graph

```
BuilderRegistry
    ├── contains: BuilderEntry[]
    ├── validates: BuilderManifest
    ├── discovers: BuilderTemplate
    └── projects: WorkspaceProjection[]

BuilderEntry
    ├── belongsTo: BuilderRegistry
    ├── uses: BuilderTemplate
    ├── targets: DomainReference
    ├── runsOn: RuntimeReference
    ├── requires: AgentDefinition[]
    ├── produces: ArtifactTypeDefinition[]
    ├── verifies: VerificationStrategyDefinition
    └── projects: WorkspaceProjectionDefinition[]
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| BuilderRegistry | RegistryRuntime | Registry lifecycle, discovery |
| BuilderEntry | RegistryRuntime | Entry lifecycle, validation |
| BuilderManifest | RegistryRuntime | Manifest validation |
| BuilderSearchQuery | RegistryRuntime | Search execution |
| BuilderInstallRequest | RegistryRuntime | Installation orchestration |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner delegates projection to Workspace

---

## 5. Lifecycle

### 5.1 Registry Lifecycle

```
Initialized
  ↓
Loading
  ↓
Ready
  ↓
Active
  ↓
Monitoring
  ↓
Updating
  ↓
Shutdown
```

### 5.2 BuilderEntry Lifecycle

```
Discovered
  ↓
Validated
  ↓
Registered
  ↓
Installed
  ↓
Active
  ↓
Deprecated
  ↓
Retired
```

### 5.3 Installation Lifecycle

```
Requested
  ↓
Validating
  ↓
Downloading
  ↓
Installing
  ↓
Configuring
  ↓
Testing
  ↓
Installed
```

---

## 6. Events

### 6.1 Registry Events

| Event | Payload | Trigger |
|-------|---------|---------|
| RegistryInitialized | BuilderRegistry | Initialization |
| RegistryLoaded | BuilderRegistry, BuilderEntry[] | Loading |
| RegistryUpdated | BuilderRegistry, ChangeSet | Update |
| RegistryShutdown | BuilderRegistry, Reason | Shutdown |

### 6.2 BuilderEntry Events

| Event | Payload | Trigger |
|-------|---------|---------|
| BuilderRegistered | BuilderEntry | Registration |
| BuilderInstalled | BuilderEntry | Installation |
| BuilderEnabled | BuilderEntry | Enable |
| BuilderDisabled | BuilderEntry, Reason | Disable |
| BuilderDeprecated | BuilderEntry, Reason | Deprecation |
| BuilderRetired | BuilderEntry, Reason | Retirement |
| BuilderUninstalled | BuilderEntry, Reason | Uninstallation |

### 6.3 Search Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SearchExecuted | BuilderSearchQuery, BuilderSearchResult | Search |
| SearchFailed | BuilderSearchQuery, Failure | Failure |

### 6.4 Installation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| InstallationRequested | BuilderInstallRequest | Request |
| InstallationStarted | BuilderInstallRequest | Start |
| InstallationProgress | BuilderInstallRequest, Progress | Progress |
| InstallationCompleted | BuilderInstallResult | Completion |
| InstallationFailed | BuilderInstallRequest, Failure | Failure |

---

## 7. Discovery Mechanisms

### 7.1 Auto-Discovery

```typescript
interface AutoDiscovery {
  enabled: boolean;
  sources: DiscoverySource[];
  interval: Duration;
  onDiscovery: 'register' | 'notify' | 'validate';
}

interface DiscoverySource {
  type: DiscoverySourceType;
  url: string;
  configuration: Record<string, any>;
}

type DiscoverySourceType = 
  | 'registry'
  | 'repository'
  | 'marketplace'
  | 'local'
  | 'custom';
```

### 7.2 Manual Registration

```typescript
interface ManualRegistration {
  manifest: BuilderManifest;
  source: string;
  trusted: boolean;
  validation: ValidationConfiguration;
}
```

### 7.3 Plugin Discovery

```typescript
interface PluginDiscovery {
  enabled: boolean;
  paths: string[];
  patterns: string[];
  autoLoad: boolean;
}
```

---

## 8. Validation

### 8.1 Manifest Validation

```typescript
interface ManifestValidation {
  schema: string;
  rules: ValidationRule[];
  required: boolean;
  strict: boolean;
}

interface ValidationRule {
  id: string;
  name: string;
  type: ValidationType;
  condition: string;
  message: string;
}

type ValidationType = 
  | 'required'
  | 'format'
  | 'range'
  | 'pattern'
  | 'custom';
```

### 8.2 Domain Validation

```typescript
interface DomainValidation {
  domainId: string;
  version: string;
  required: boolean;
  strict: boolean;
  entities: EntityValidation[];
  relationships: RelationshipValidation[];
}
```

### 8.3 Runtime Validation

```typescript
interface RuntimeValidation {
  runtimeId: string;
  version: string;
  capabilities: CapabilityValidation[];
  required: boolean;
}
```

### 8.4 Agent Validation

```typescript
interface AgentValidation {
  agents: AgentValidationEntry[];
  required: boolean;
  fallback: FallbackConfiguration;
}

interface AgentValidationEntry {
  agentId: string;
  role: string;
  available: boolean;
  required: boolean;
}
```

---

## 9. Security

### 9.1 Trust Levels

```typescript
type TrustLevel = 
  | 'core'       // Vestara core builders
  | 'verified'   // Verified third-party
  | 'community'  // Community builders
  | 'untrusted'; // Untrusted builders
```

### 9.2 Security Policies

```typescript
interface SecurityPolicy {
  trustLevel: TrustLevel;
  permissions: Permission[];
  restrictions: Restriction[];
  sandbox: boolean;
  audit: boolean;
}

interface Permission {
  resource: string;
  actions: string[];
  granted: boolean;
}

interface Restriction {
  resource: string;
  reason: string;
  workaround?: string;
}
```

### 9.3 Sandboxing

```typescript
interface SandboxConfiguration {
  enabled: boolean;
  filesystem: FilesystemSandbox;
  network: NetworkSandbox;
  process: ProcessSandbox;
  resources: ResourceSandbox;
}

interface FilesystemSandbox {
  readOnly: string[];
  readWrite: string[];
  excluded: string[];
}

interface NetworkSandbox {
  allowed: string[];
  blocked: string[];
  timeout: Duration;
}

interface ProcessSandbox {
  allowed: string[];
  blocked: string[];
  maxProcesses: number;
}

interface ResourceSandbox {
  maxMemory: DataSize;
  maxCpu: number;
  maxDisk: DataSize;
}
```

---

## 10. API

### 10.1 Registry API

```typescript
interface BuilderRegistryAPI {
  // Discovery
  list(query?: BuilderSearchQuery): Promise<BuilderSearchResult>;
  get(builderId: string): Promise<BuilderEntry>;
  search(query: BuilderSearchQuery): Promise<BuilderSearchResult>;
  
  // Installation
  install(request: BuilderInstallRequest): Promise<BuilderInstallResult>;
  uninstall(builderId: string): Promise<void>;
  update(builderId: string, version?: string): Promise<BuilderInstallResult>;
  
  // Configuration
  enable(builderId: string): Promise<void>;
  disable(builderId: string, reason?: string): Promise<void>;
  configure(builderId: string, config: Record<string, any>): Promise<void>;
  
  // Validation
  validate(manifest: BuilderManifest): Promise<ValidationResult>;
  validateDomain(domainId: string): Promise<ValidationResult>;
  validateRuntime(runtimeId: string): Promise<ValidationResult>;
  
  // Events
  on(event: string, handler: Function): void;
  off(event: string, handler: Function): void;
}
```

### 10.2 Query API

```typescript
interface BuilderQueryAPI {
  // By domain
  getByDomain(domainId: string): Promise<BuilderEntry[]>;
  
  // By capability
  getByCapability(capability: string): Promise<BuilderEntry[]>;
  
  // By artifact
  getByArtifact(artifactType: string): Promise<BuilderEntry[]>;
  
  // By agent
  getByAgent(agentId: string): Promise<BuilderEntry[]>;
  
  // By tag
  getByTag(tag: string): Promise<BuilderEntry[]>;
  
  // By author
  getByAuthor(author: string): Promise<BuilderEntry[]>;
}
```

---

## 11. Integration Points

### 11.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Builder Runtime | Builder execution | Runtime API |
| Builder Template | Template validation | Template API |
| Domain Registry | Domain validation | Domain API |
| Agent Registry | Agent validation | Agent API |
| Artifact Storage | Artifact management | Storage API |
| Verification Runtime | Verification execution | Verification API |

### 11.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Package Registry | Builder distribution | Registry API |
| Source Control | Builder source | Git API |
| CI/CD Pipeline | Builder testing | Pipeline API |
| Marketplace | Builder discovery | Marketplace API |

---

## 12. Open Questions

1. How should builder dependencies be resolved?
2. How should builder conflicts be handled?
3. How should builder updates be managed?
4. How should builder rollback be supported?
5. How should builder analytics be tracked?

---

*This document defines the canonical Builder Registry contract for Vestara.*
*The registry makes builders discoverable and enables third-party contribution.*
