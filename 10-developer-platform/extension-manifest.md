---
id: "extension-manifest"
title: "Extension Manifest — Canonical Asset Declaration"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@chief-architect"
author: ["@chief-architect", "@frontend-engineer"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: []
tags: ["marketplace", "extension", "manifest", "canonical"]
---

# Extension Manifest

## Canonical Asset Declaration

> **One top-level manifest for all Marketplace assets. The manifest is the single source of truth for identity, capabilities, dependencies, permissions, and activation model.**

---

## 1. Architectural Position

```
ExtensionManifest
    ├── Identity
    ├── Publisher
    ├── Compatibility
    ├── Entrypoints
    ├── Dependencies
    ├── Permissions
    ├── Contributions
    ├── Integrity
    ├── Signatures
    └── Lifecycle
```

The manifest is interpreted by the Extension Runtime and validated by the Marketplace. It defines what the asset is, what it needs, what it provides, and how it activates.

---

## 2. Canonical Entities

### 2.1 ExtensionManifest

```typescript
interface ExtensionManifest {
  // Schema
  schemaVersion: '1.0';
  
  // Identity
  id: string;
  name: string;
  version: string;
  kind: AssetKind;
  description?: string;
  
  // Publisher
  publisher: PublisherIdentity;
  
  // Compatibility
  compatibility: CompatibilityConstraints;
  
  // Entrypoints
  entrypoints: Entrypoints;
  
  // Dependencies
  dependencies: Dependencies;
  
  // Permissions
  permissions: PermissionDeclaration;
  
  // Contributions
  contributions?: ContributionDeclaration;
  
  // Integrity
  integrity: IntegrityDeclaration;
  
  // Signatures
  signatures?: SignatureDeclaration;
  
  // Lifecycle
  lifecycle?: LifecycleDeclaration;
  
  // Configuration
  configuration?: ConfigurationDeclaration;
  
  // Metadata
  metadata?: MetadataDeclaration;
}

type AssetKind = 'package' | 'workspace-module' | 'app';
```

### 2.2 PublisherIdentity

```typescript
interface PublisherIdentity {
  id: string;
  name: string;
  verified: boolean;
  url?: string;
  email?: string;
}
```

### 2.3 CompatibilityConstraints

```typescript
interface CompatibilityConstraints {
  workspace: string;      // SemVer range
  sdk?: string;           // SDK version range
  platform: Platform[];   // Supported platforms
  node?: string;          // Node.js version range
  pnpm?: string;          // pnpm version range
}

type Platform = 
  | 'linux-x64' 
  | 'linux-arm64' 
  | 'darwin-x64' 
  | 'darwin-arm64' 
  | 'win32-x64';
```

### 2.4 Entrypoints

```typescript
interface Entrypoints {
  // Package entrypoints
  main?: string;
  exports?: Record<string, string>;
  
  // Workspace module entrypoint
  workspace?: string;
  
  // App entrypoint
  process?: string;
  
  // Activation entrypoints
  activation?: {
    eager?: string[];
    onDemand?: string[];
    event?: string[];
    manual?: string[];
  };
}
```

### 2.5 Dependencies

```typescript
interface Dependencies {
  // Extension dependencies
  extensions?: Record<string, string>;
  
  // Runtime dependencies
  runtime?: Record<string, string>;
  
  // Peer dependencies
  peer?: Record<string, string>;
  
  // Optional dependencies
  optional?: Record<string, string>;
  
  // Platform-specific dependencies
  platform?: Record<string, Record<string, string>>;
}
```

### 2.6 PermissionDeclaration

```typescript
interface PermissionDeclaration {
  required: Permission[];
  optional?: Permission[];
}

interface Permission {
  id: string;
  description?: string;
  reason?: string;
  risk?: PermissionRisk;
}

type PermissionRisk = 'low' | 'medium' | 'high' | 'critical';
```

### 2.7 ContributionDeclaration

```typescript
interface ContributionDeclaration {
  // Navigation
  navigation?: NavigationContribution[];
  
  // Commands
  commands?: string[];
  
  // Search providers
  searchProviders?: string[];
  
  // Inspectors
  inspectors?: string[];
  
  // Routes
  routes?: string[];
  
  // Toolbar
  toolbar?: ToolbarContribution[];
  
  // Sidebar
  sidebar?: SidebarContribution[];
  
  // Status
  status?: StatusContribution[];
  
  // Workspace modules (for apps)
  workspaceModules?: string[];
}

interface NavigationContribution {
  id: string;
  section: string;
  labelToken: string;
  icon?: string;
  order?: number;
}

interface ToolbarContribution {
  id: string;
  position: 'left' | 'center' | 'right';
  component: string;
  priority?: number;
}

interface SidebarContribution {
  id: string;
  position: 'top' | 'bottom';
  icon: string;
  label: string;
  order?: number;
}

interface StatusContribution {
  id: string;
  position: 'left' | 'center' | 'right';
  component: string;
  priority?: number;
}
```

### 2.8 IntegrityDeclaration

```typescript
interface IntegrityDeclaration {
  algorithm: 'sha256' | 'sha384' | 'sha512';
  digest: string;
}
```

### 2.9 SignatureDeclaration

```typescript
interface SignatureDeclaration {
  required: boolean;
  algorithm?: string;
  keyId?: string;
}
```

### 2.10 LifecycleDeclaration

```typescript
interface LifecycleDeclaration {
  activation: ActivationMode;
  rollback: boolean;
  healthCheck?: HealthCheckDeclaration;
  shutdownTimeoutMs?: number;
}

type ActivationMode = 'eager' | 'on-demand' | 'event' | 'manual';

interface HealthCheckDeclaration {
  command: string[];
  intervalMs?: number;
  timeoutMs?: number;
  retries?: number;
}
```

### 2.11 ConfigurationDeclaration

```typescript
interface ConfigurationDeclaration {
  schema: string;
  defaults: Record<string, unknown>;
  ui?: {
    label: string;
    description: string;
    group?: string;
  };
}
```

### 2.12 MetadataDeclaration

```typescript
interface MetadataDeclaration {
  tags?: string[];
  category?: string;
  icon?: string;
  banner?: string;
  screenshots?: string[];
  changelog?: string;
  repository?: string;
  homepage?: string;
  bugs?: string;
}
```

---

## 3. Manifest Examples

### 3.1 Package Manifest

```yaml
schemaVersion: "1.0"
id: "@vestara/provider-openai"
name: "OpenAI Provider"
version: "1.2.0"
kind: "package"

publisher:
  id: "vestara"
  name: "Vestara"
  verified: true

compatibility:
  workspace: ">=1.0.0 <2.0.0"
  platform:
    - linux-x64
    - linux-arm64
    - darwin-x64
    - darwin-arm64

entrypoints:
  main: "./dist/index.js"
  exports:
    "./provider": "./dist/provider.js"

dependencies:
  runtime:
    "@vestara/ai-runtime": "^1.0.0"

permissions:
  required:
    - network.api.openai.com
    - credentials.read:openai
  optional:
    - logging.write

contributions:
  commands:
    - "provider.openai.configure"
  searchProviders:
    - "provider.openai.models"

integrity:
  algorithm: "sha256"
  digest: "abc123..."

signatures:
  required: true

lifecycle:
  activation: "on-demand"
  rollback: true
```

### 3.2 Workspace Module Manifest

```yaml
schemaVersion: "1.0"
id: "com.vestara.github"
name: "GitHub"
version: "1.2.0"
kind: "workspace-module"

publisher:
  id: "vestara"
  name: "Vestara"
  verified: true

compatibility:
  workspace: ">=1.0.0 <2.0.0"
  sdk: "^1.0.0"
  platform:
    - linux-x64
    - linux-arm64

entrypoints:
  workspace: "./dist/workspace-module.js"

dependencies:
  extensions:
    "@vestara/git-runtime": "^1.0.0"

permissions:
  required:
    - network.github.com
    - credentials.read:github
    - notifications.publish
  optional:
    - filesystem.read

contributions:
  navigation:
    - id: "github"
      section: "tools"
      labelToken: "github.title"
  commands:
    - "github.open-repository"
  searchProviders:
    - "github.repositories"
  inspectors:
    - "github.repository"
  routes:
    - "/tools/github"

integrity:
  algorithm: "sha256"
  digest: "def456..."

signatures:
  required: true

lifecycle:
  activation: "on-demand"
  rollback: true
```

### 3.3 App Manifest

```yaml
schemaVersion: "1.0"
id: "com.vestara.data-studio"
name: "Data Studio"
version: "2.0.0"
kind: "app"

publisher:
  id: "vestara"
  name: "Vestara"
  verified: true

compatibility:
  workspace: ">=1.0.0 <2.0.0"
  platform:
    - linux-x64
    - darwin-x64

entrypoints:
  process: "./bin/vestara-data-studio"

runtime:
  isolation: "process"
  healthCheck:
    command: ["./bin/vestara-data-studio", "health"]
    intervalMs: 30000
    timeoutMs: 5000
    retries: 3
  shutdownTimeoutMs: 10000

dependencies:
  extensions:
    "@vestara/database-runtime": "^1.0.0"
    "@vestara/provider-postgres": "^1.0.0"

permissions:
  required:
    - process.spawn
    - network.listen
    - filesystem.workspace.read
    - filesystem.workspace.write
    - credentials.read
    - service.register
    - background.run

contributions:
  workspaceModules:
    - "./dist/workspace-module.js"

integrity:
  algorithm: "sha256"
  digest: "ghi789..."

signatures:
  required: true

lifecycle:
  activation: "manual"
  rollback: true
```

---

## 4. Relationships

### 4.1 Entity Relationships

```
ExtensionManifest 1──1 PublisherIdentity
ExtensionManifest 1──1 CompatibilityConstraints
ExtensionManifest 1──1 Entrypoints
ExtensionManifest 1──1 Dependencies
ExtensionManifest 1──1 PermissionDeclaration
ExtensionManifest 1──* ContributionDeclaration
ExtensionManifest 1──1 IntegrityDeclaration
ExtensionManifest 1──* SignatureDeclaration
ExtensionManifest 1──1 LifecycleDeclaration
ExtensionManifest 1──* ConfigurationDeclaration
ExtensionManifest 1──* MetadataDeclaration
```

---

## 5. Runtime Ownership

### 5.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| ExtensionManifest | ExtensionRuntime | Validation, interpretation |
| PublisherIdentity | MarketplaceRegistry | Trust verification |
| CompatibilityConstraints | ExtensionRuntime | Compatibility checking |
| Entrypoints | ExtensionRuntime | Activation routing |
| Dependencies | ExtensionRuntime | Dependency resolution |
| PermissionDeclaration | ExtensionRuntime | Permission enforcement |
| ContributionDeclaration | WorkspaceRuntime | Contribution registration |
| IntegrityDeclaration | ExtensionRuntime | Integrity verification |
| SignatureDeclaration | SecurityService | Signature verification |
| LifecycleDeclaration | ExtensionRuntime | Lifecycle management |

---

## 6. Events

### 6.1 Manifest Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ManifestParsed | ExtensionManifest | Parsing |
| ManifestValidated | ExtensionManifest, ValidationResult | Validation |
| ManifestRejected | ExtensionManifest, Failure[] | Rejection |
| ManifestMigrated | ExtensionManifest, MigrationResult | Migration |

---

## 7. Verification Requirements

### 7.1 Manifest Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Schema Validation | Manifest conforms to schema |
| Version Validation | Version follows semver |
| ID Validation | ID follows naming conventions |
| Entrypoint Validation | Entrypoints exist |
| Dependency Validation | Dependencies resolvable |
| Permission Validation | Permissions are valid |
| Integrity Validation | Checksum matches |
| Signature Validation | Signature is valid |

---

## 8. Open Questions

1. How should manifest migration be handled across schema versions?
2. How should partial manifests be supported?
3. How should manifest overrides be managed?
4. How should manifest inheritance work?
5. How should manifest validation be extensible?

---

*This document defines the canonical Extension Manifest for Vestara.*
*One manifest format for all asset kinds.*
