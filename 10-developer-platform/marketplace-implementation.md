---
id: "marketplace-implementation"
title: "Marketplace Implementation — Incremental Build Plan"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "3.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "in-progress"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@chief-architect"
author: ["@chief-architect", "@frontend-engineer"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: ["marketplace-implementation-v1", "marketplace-implementation-v2"]
tags: ["marketplace", "implementation", "milestones", "incremental", "canonical"]
---

# Marketplace Implementation

## Incremental Build Plan

> **Build the Marketplace exactly the way you designed the Workspace: establish the platform first, then add capabilities. Resist building everything at once.**

---

## 1. Implementation Philosophy

```
Design Phase (Complete)
    ↓
Contracts and Planning
    ↓
Local Catalog
    ↓
Lifecycle Integration
    ↓
Marketplace UI
    ↓
Packaging and Local Publishing
    ↓
Remote Marketplace
```

Each milestone builds on the previous one. No milestone depends on future work.

### 1.1 Ownership Rules

```text
Marketplace
    owns discovery, catalog, search, compatibility, resolution, planning

Extension Runtime
    owns installation, activation, rollback, uninstall, permissions,
    durable installation state, and graph projection

Workspace Runtime
    owns module activation, contribution registration

App Runtime
    owns isolated application execution
```

The Marketplace produces install plans, not execution. Execution belongs to Extension Runtime.

---

## 2. Package Structure

### 2.1 Recommended Layout

```text
packages/
├── marketplace/
│   ├── contracts/
│   ├── registry/
│   ├── resolver/
│   ├── planner/
│   └── validation/
│
├── extension-contracts/
├── extension-runtime/
├── extension-security/
├── extension-publishing/
└── app-runtime/
```

### 2.2 Key Principle

Do not create a second lifecycle authority inside `packages/marketplace`.

---

## 3. Core Interfaces

### 3.1 MarketplaceRuntime (Orchestrator)

The MarketplaceRuntime is an orchestrator, not an installer.

```typescript
interface MarketplaceRuntime {
  readonly registries: MarketplaceRegistry[];
  readonly resolver: MarketplaceResolver;
  readonly compatibility: MarketplaceCompatibilityService;
  readonly planner: MarketplaceInstallPlanner;
  readonly validation: MarketplaceValidationService;

  // Orchestration
  search(query: MarketplaceQuery): Promise<MarketplaceSearchResult>;
  plan(request: MarketplaceInstallRequest): Promise<MarketplaceInstallPlan>;
  validate(manifest: ExtensionManifest): Promise<ValidationResult>;
}
```

### 3.2 Registry Abstraction

```typescript
interface MarketplaceRegistry {
  readonly id: string;
  readonly kind: 'local' | 'remote' | 'enterprise';

  search(query: MarketplaceQuery): Promise<MarketplaceSearchResult>;
  getAsset(assetId: string): Promise<MarketplaceAssetDetails>;
  getVersions(assetId: string): Promise<readonly MarketplaceAssetVersion[]>;
  acquire(
    reference: MarketplaceAssetVersionReference,
  ): Promise<AcquiredExtensionPackage>;
}

class LocalMarketplaceRegistry implements MarketplaceRegistry {}
class RemoteMarketplaceRegistry implements MarketplaceRegistry {}
class EnterpriseMarketplaceRegistry implements MarketplaceRegistry {}
```

### 3.3 Resolver

```typescript
interface MarketplaceResolver {
  resolve(assetId: string, version?: string): Promise<ResolvedAsset>;
  resolveDependencies(asset: ResolvedAsset): Promise<ResolvedDependency[]>;
  checkCompatibility(asset: ResolvedAsset): Promise<CompatibilityResult>;
}
```

### 3.4 Install Planner

```typescript
interface MarketplaceInstallPlanner {
  plan(request: MarketplaceInstallRequest): Promise<MarketplaceInstallPlan>;
}

interface MarketplaceInstallRequest {
  assetId: string;
  version?: string;
  scope: 'user' | 'workspace' | 'system';
  workspaceId?: string;
}

interface MarketplaceInstallPlan {
  // Identity
  operationId: string;
  schemaVersion: string;
  
  // Request
  request: MarketplaceInstallRequest;
  
  // Resolution
  asset: ResolvedAsset;
  dependencies: ResolvedDependency[];
  conflicts: DependencyConflict[];
  
  // Validation
  compatibility: CompatibilityResult;
  permissions: PermissionRequest[];
  integrity: IntegrityPlan;
  
  // Actions
  actions: InstallAction[];
  
  // Evidence
  evidence: InstallEvidence;
  
  // Attribution
  attribution: PlanAttribution;
  
  // Metadata
  createdAt: timestamp;
  expiresAt: timestamp;
}

interface PlanAttribution {
  userId: string;
  workspaceId?: string;
  source: 'marketplace-ui' | 'cli' | 'api' | 'programmatic';
  requestId?: string;
}

interface InstallEvidence {
  manifestVerified: boolean;
  signatureValid: boolean;
  compatibilityVerified: boolean;
  dependenciesResolved: boolean;
  permissionsAccepted: boolean;
  integrityHashVerified: boolean;
}
```

### 3.5 Extension Lifecycle Manager (Extension Runtime)

```typescript
interface ExtensionLifecycleManager {
  install(plan: MarketplaceInstallPlan): Promise<InstallationResult>;
  update(plan: MarketplaceInstallPlan): Promise<InstallationResult>;
  rollback(request: RollbackRequest): Promise<RollbackResult>;
  uninstall(request: UninstallRequest): Promise<UninstallResult>;
}
```

### 3.6 State Separation

```text
Catalog listing ≠ Installed version ≠ Workspace enablement ≠ Running process

Available ≠ Installed ≠ Enabled ≠ Running
```

---

## 4. State Models

### 4.1 Catalog State (Marketplace)

```typescript
interface LocalMarketplaceEntry {
  assetId: string;
  manifestPath: string;
  availableVersions: readonly string[];
  catalogMetadata: MarketplaceCatalogMetadata;
}
```

### 4.2 Installation State (Extension Runtime)

```typescript
interface InstalledExtensionProjection {
  assetId: string;
  installedVersions: readonly InstalledVersion[];
  activeVersion?: string;
  installationScope: 'user' | 'system';
}
```

### 4.3 Enablement State (Workspace Runtime)

```typescript
interface WorkspaceExtensionEnablement {
  workspaceId: string;
  assetId: string;
  version: string;
  enabled: boolean;
  configurationRevision: string;
}
```

### 4.4 Running State (App Runtime)

```typescript
interface AppProcessState {
  appId: string;
  pid: number;
  state: 'starting' | 'running' | 'stopping' | 'stopped' | 'crashed';
  healthCheck?: HealthCheckResult;
}
```

---

## 5. InstallPlan as Engineering Artifact

The InstallPlan is a first-class engineering artifact, not just a configuration object.

### 5.1 Engineering Artifact Properties

```text
Inspectable
    → Human-readable plan details
    → Machine-parseable structure

Replayable
    → Same inputs produce same plan
    → Deterministic resolution

Versioned
    → Plan schema versioned
    → Backward compatibility

Attributable
    → Plan linked to user and workspace
    → Plan linked to asset and version

Verifiable
    → Plan integrity verifiable
    → Plan execution auditable
```

### 5.2 InstallPlan Flow

```text
Resolve GitHub Module
    ↓
MarketplaceInstallPlan
    ↓
Review
    ↓
Approve
    ↓
Extension Runtime
```

---

## 6. Installation Evidence

Every installation should automatically produce evidence.

### 6.1 Evidence Package

```typescript
interface InstallationEvidencePackage {
  operationId: string;
  assetId: string;
  version: string;
  
  // Evidence items
  manifestVerified: EvidenceItem;
  signatureValid: EvidenceItem;
  compatibilityVerified: EvidenceItem;
  dependenciesResolved: EvidenceItem;
  permissionsAccepted: EvidenceItem;
  integrityHashVerified: EvidenceItem;
  activationSuccessful: EvidenceItem;
  contributionRegistrationSuccessful: EvidenceItem;
  
  // Summary
  overallResult: 'passed' | 'failed' | 'partial';
  timestamp: timestamp;
}

interface EvidenceItem {
  status: 'passed' | 'failed' | 'skipped';
  details?: string;
  timestamp: timestamp;
  duration?: number;
}
```

### 6.2 Evidence Collection

```text
Manifest verified
    ↓
Signature valid
    ↓
Compatibility verified
    ↓
Dependencies resolved
    ↓
Permissions accepted
    ↓
Integrity hash verified
    ↓
Activation successful
    ↓
Contribution registration successful
    ↓
Evidence package complete
```

---

## 7. Transaction Viewer

A transaction viewer provides visibility into installation operations.

### 7.1 Transaction View

```text
Operations

Install GitHub

──────────────

Resolve
✓

Compatibility
✓

Dependencies
✓

Permission Review
✓

Integrity
✓

Activation
✓

Sidebar Registered
✓

Completed
```

### 7.2 Transaction Structure

```typescript
interface InstallationTransaction {
  transactionId: string;
  operationId: string;
  plan: MarketplaceInstallPlan;
  
  // Steps
  steps: TransactionStep[];
  
  // State
  state: TransactionState;
  
  // Timing
  startedAt: timestamp;
  completedAt?: timestamp;
  duration?: number;
  
  // Evidence
  evidence: InstallationEvidencePackage;
}

interface TransactionStep {
  stepId: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  startedAt?: timestamp;
  completedAt?: timestamp;
  duration?: number;
  details?: string;
  error?: string;
}

type TransactionState = 
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'failed'
  | 'rolled-back';
```

---

## 8. Milestones

### MP-001 — Marketplace Contracts and Planning

**Objective:** Define core contracts and planning interfaces.

**Scope:**
- Asset catalog types
- Registry abstraction
- Manifest validation
- Compatibility checking
- Dependency resolution
- Dry-run install plans

**Package Structure:**
```text
packages/marketplace/
├── catalog/
│   ├── types.ts
│   └── index.ts
├── registry/
│   ├── types.ts
│   └── index.ts
├── search/
│   ├── types.ts
│   └── index.ts
├── resolver/
│   ├── types.ts
│   └── index.ts
├── compatibility/
│   ├── types.ts
│   └── index.ts
├── planning/
│   ├── types.ts
│   └── index.ts
└── index.ts
```

**Core Interfaces:**
```typescript
// Catalog
interface MarketplaceAsset { ... }
interface MarketplaceAssetVersion { ... }
interface MarketplaceCatalogMetadata { ... }

// Registry
interface MarketplaceRegistry { ... }
interface MarketplaceSearchResult { ... }
interface AcquiredExtensionPackage { ... }

// Resolver
interface ResolvedAsset { ... }
interface ResolvedDependency { ... }

// Compatibility
interface CompatibilityResult { ... }
interface CompatibilityIssue { ... }

// Planning
interface MarketplaceInstallRequest { ... }
interface MarketplaceInstallPlan { ... }
interface InstallAction { ... }
```

**Criteria:**
- [ ] Package structure created
- [ ] Core interfaces defined
- [ ] Manifest validation works
- [ ] Compatibility checking works
- [ ] Dependency resolution works
- [ ] Install plan generation works
- [ ] Unit tests pass

---

### MP-002 — Local Catalog

**Objective:** Build a local Marketplace catalog.

**Scope:**
- Read-only local registry
- Search and filtering
- Asset details and versions
- Malformed asset isolation
- Incremental rescanning

**Local Structure:**
```text
~/.vestara/
    marketplace/
        index.json
```

**Local Registry Implementation:**
```typescript
class LocalMarketplaceRegistry implements MarketplaceRegistry {
  readonly id: string;
  readonly kind: 'local' = 'local';
  
  private basePath: string;
  private index: LocalIndex;
  
  async search(query: MarketplaceQuery): Promise<MarketplaceSearchResult> { ... }
  async getAsset(assetId: string): Promise<MarketplaceAssetDetails> { ... }
  async getVersions(assetId: string): Promise<readonly MarketplaceAssetVersion[]> { ... }
  async acquire(reference: MarketplaceAssetVersionReference): Promise<AcquiredExtensionPackage> { ... }
}
```

**Malformed Asset Isolation:**
```text
Asset loaded
    ↓
Manifest parsed
    ↓
Validation failed
    ↓
Asset quarantined
    ↓
Error recorded
    ↓
Scan continues
```

**Criteria:**
- [ ] Local registry structure created
- [ ] Local registry loading works
- [ ] Search and filtering works
- [ ] Asset details work
- [ ] Malformed asset isolation works
- [ ] Incremental rescanning works
- [ ] Integration tests pass

---

### MP-003 — Lifecycle Integration

**Objective:** Connect Marketplace to Extension Runtime.

**Flow:**
```text
Marketplace discovers asset
    ↓
Resolver selects version
    ↓
Planner produces install plan
    ↓
Extension Runtime installs asset
    ↓
User enables in workspace
    ↓
Workspace Runtime activates module
    ↓
Contributions register
    ↓
Application shell updates
```

**Integration Points:**
```typescript
// Marketplace to Extension Runtime
interface MarketplaceToExtensionIntegration {
  extensionLifecycleManager: ExtensionLifecycleManager;
  
  // Delegate execution
  install(plan: MarketplaceInstallPlan): Promise<InstallationResult>;
  update(plan: MarketplaceInstallPlan): Promise<InstallationResult>;
  rollback(request: RollbackRequest): Promise<RollbackResult>;
  uninstall(request: UninstallRequest): Promise<UninstallResult>;
}

// Extension Runtime to Workspace Runtime
interface ExtensionToWorkspaceIntegration {
  workspaceRuntime: WorkspaceRuntime;
  
  // Enable/disable
  enableModule(moduleId: string, workspaceId: string): Promise<void>;
  disableModule(moduleId: string, workspaceId: string): Promise<void>;
}
```

**Contribution Registration (via Workspace Runtime):**
```text
Extension Runtime installs asset
    ↓
Workspace Runtime enables WorkspaceModule
    ↓
Module Registry loads manifest
    ↓
Contribution Registry registers:
    navigation
    routes
    commands
    search
    inspectors
    toolbar
    status
    ↓
Application shell recomputes projections
```

**Enablement Semantics:**
```text
Install module
    → files and installation state become available
    → no sidebar contribution yet

Enable module in workspace
    → Workspace Runtime activates module
    → contributions register
    → sidebar updates without restart

Disable module
    → contributions unregister immediately

Uninstall module
    → requires module disabled in all affected workspaces
      or an explicit coordinated disable operation
```

**Criteria:**
- [ ] Extension Runtime integration works
- [ ] Workspace Runtime integration works
- [ ] Install flow works
- [ ] Enable flow works
- [ ] Disable flow works
- [ ] Uninstall flow works
- [ ] Rollback flow works
- [ ] Sidebar auto-updates on enable
- [ ] Events emitted correctly
- [ ] Integration tests pass

---

### MP-004 — Marketplace Workspace Module

**Objective:** Create a dedicated Workspace module for the Marketplace.

**Scope:**
- Discover page
- Installed page
- Workspace Enabled page
- Updates page
- Operations page
- Asset details
- Install review
- Dynamic contribution activation

**Module Structure:**
```text
Platform
└── Marketplace
```

**Pages:**
```text
Discover
    → Browse available assets
    → Search and filter
    → View categories and bundles

Installed
    → View installed assets
    → Enable/disable per workspace
    → View versions

Workspace Enabled
    → View assets enabled in current workspace
    → Manage enablement

Updates
    → View available updates
    → Update assets

Operations
    → View install/update/rollback operations
    → Monitor progress
    → View history
```

**Asset Detail Pages:**
```text
Overview
Versions
Dependencies
Permissions
Capabilities
Compatibility
Publisher
Install History
```

**Contribution Registration:**
```typescript
// Marketplace module contributions
const marketplaceModule: WorkspaceModuleManifest = {
  navigation: {
    sidebar: {
      id: 'marketplace',
      label: 'Marketplace',
      icon: 'shopping-cart',
      children: [
        { id: 'discover', label: 'Discover', route: '/marketplace/discover' },
        { id: 'installed', label: 'Installed', route: '/marketplace/installed' },
        { id: 'updates', label: 'Updates', route: '/marketplace/updates' },
      ]
    }
  },
  routes: [
    { path: '/marketplace/discover', component: 'DiscoverPage' },
    { path: '/marketplace/installed', component: 'InstalledPage' },
    { path: '/marketplace/updates', component: 'UpdatesPage' },
    { path: '/marketplace/asset/:assetId', component: 'AssetDetailPage' },
  ],
  commands: [
    { id: 'marketplace.search', label: 'Search Marketplace', handler: 'openSearch' },
    { id: 'marketplace.install', label: 'Install Asset', handler: 'installAsset' },
  ],
  search: [
    { id: 'marketplace-assets', provider: 'MarketplaceSearchProvider' }
  ],
  inspector: [
    { id: 'marketplace-asset', section: 'Marketplace Asset' }
  ]
};
```

**Criteria:**
- [ ] Marketplace module created
- [ ] Navigation registered
- [ ] Routes registered
- [ ] Commands registered
- [ ] Discover page works
- [ ] Installed page works
- [ ] Updates page works
- [ ] Asset detail works
- [ ] Install review works
- [ ] UI tests pass

---

### MP-005 — Packaging and Local Publishing

**Objective:** Build the publishing pipeline for local registries.

**Scope:**
- Pack
- Validate
- Sign
- Verify
- Publish to local registry

**CLI Commands:**
```bash
vestara extension pack
vestara extension validate
vestara extension sign
vestara extension verify
vestara marketplace publish --registry local
```

**Archive Structure:**
```text
github.extension
├── manifest.yaml
├── signatures/
├── artifacts/
├── workspace-module.js
└── provider-runtime.js
```

**Publishing Pipeline:**
```typescript
interface ExtensionPublishingService {
  pack(manifest: ExtensionManifest): Promise<PackedExtension>;
  validate(asset: PackedExtension): Promise<ValidationResult>;
  sign(asset: PackedExtension, key: SigningKey): Promise<SignedExtension>;
  verify(asset: PackedExtension): Promise<VerificationResult>;
  publishToLocal(asset: SignedExtension, registry: LocalMarketplaceRegistry): Promise<PublishResult>;
}
```

**Key Distinction:**
```text
pack, validate, sign
    → operate on the distributable before it enters a Marketplace
    → belong under `vestara extension`

publish
    → registers the asset in a Marketplace registry
    → belongs under `vestara marketplace`
```

**Criteria:**
- [ ] Pack command works
- [ ] Validate command works
- [ ] Sign command works
- [ ] Verify command works
- [ ] Publish to local registry works
- [ ] Archive structure correct
- [ ] Signature verification works
- [ ] Publishing pipeline tests pass

---

### MP-006 — Remote Marketplace

**Objective:** Add remote registry support.

**Scope:**
- Remote registry
- Search service
- Downloads
- Publisher accounts
- Signature and trust services
- Moderation and governance

**Service Structure:**
```text
apps/
└── marketplace-service/
    ├── src/
    │   ├── registry/
    │   ├── search/
    │   ├── download/
    │   ├── version/
    │   ├── signature/
    │   ├── publisher/
    │   └── api/
    └── package.json
```

**Remote Registry Implementation:**
```typescript
class RemoteMarketplaceRegistry implements MarketplaceRegistry {
  readonly id: string;
  readonly kind: 'remote' = 'remote';
  
  private serviceUrl: string;
  
  async search(query: MarketplaceQuery): Promise<MarketplaceSearchResult> { ... }
  async getAsset(assetId: string): Promise<MarketplaceAssetDetails> { ... }
  async getVersions(assetId: string): Promise<readonly MarketplaceAssetVersion[]> { ... }
  async acquire(reference: MarketplaceAssetVersionReference): Promise<AcquiredExtensionPackage> { ... }
}
```

**Key Principle:**
A remote registry is not a specialized local registry. Both implement the same `MarketplaceRegistry` interface but with different storage and mutation semantics.

**CLI Addition:**
```bash
vestara marketplace publish --registry vestara-public
```

**Criteria:**
- [ ] Marketplace service created
- [ ] Remote registry works
- [ ] Search API works
- [ ] Download API works
- [ ] Version API works
- [ ] Signature API works
- [ ] Client integration works
- [ ] End-to-end remote flow works
- [ ] Integration tests pass

---

## 9. Marketplace Events

Define events before writing code.

### 9.1 Event Types

```text
MarketplaceAssetDiscovered
MarketplaceAssetUpdated
MarketplaceInstallPlanned
MarketplaceInstallApproved
MarketplaceInstallDelegated
MarketplaceInstallCompleted
MarketplaceInstallFailed
MarketplaceRollbackStarted
MarketplaceRollbackCompleted
MarketplaceAssetEnabled
MarketplaceAssetDisabled
```

### 9.2 Event Structure

```typescript
interface MarketplaceEvent {
  eventId: string;
  type: MarketplaceEventType;
  assetId: string;
  version: string;
  timestamp: timestamp;
  data: Record<string, unknown>;
  attribution: EventAttribution;
}

type MarketplaceEventType = 
  | 'marketplace-asset-discovered'
  | 'marketplace-asset-updated'
  | 'marketplace-install-planned'
  | 'marketplace-install-approved'
  | 'marketplace-install-delegated'
  | 'marketplace-install-completed'
  | 'marketplace-install-failed'
  | 'marketplace-rollback-started'
  | 'marketplace-rollback-completed'
  | 'marketplace-asset-enabled'
  | 'marketplace-asset-disabled';

interface EventAttribution {
  userId: string;
  workspaceId?: string;
  source: 'marketplace-ui' | 'cli' | 'api' | 'programmatic';
  correlationId?: string;
}
```

### 9.3 Event Integration

These events feed the Engineering Event Store and make Marketplace activity visible alongside the rest of the platform.

---

## 10. Metrics

Since Vestara is engineering-centric, Marketplace should expose operational metrics from day one.

### 10.1 Metrics Types

```text
Assets installed
Modules enabled
Apps running
Average install duration
Dependency resolution duration
Rollback count
Activation failures
Manifest validation failures
```

### 10.2 Metrics Structure

```typescript
interface MarketplaceMetrics {
  // Counts
  assetsInstalled: number;
  modulesEnabled: number;
  appsRunning: number;
  
  // Durations
  averageInstallDuration: number;
  averageResolutionDuration: number;
  averageActivationDuration: number;
  
  // Failures
  rollbackCount: number;
  activationFailureCount: number;
  manifestValidationFailureCount: number;
  dependencyResolutionFailureCount: number;
  
  // Timestamps
  lastCalculated: timestamp;
}
```

### 10.3 Metrics Collection

```text
Install operation
    ↓
Emit metrics events
    ↓
Aggregate metrics
    ↓
Expose via API
    ↓
Display in UI
```

---

## 11. First Vertical Slice

### 11.1 Metallic Gold Theme (Package)

```text
Local catalog contains Metallic Gold Theme
    ↓
Marketplace discovers it
    ↓
Resolver selects exact version
    ↓
Planner produces permission/integrity plan
    ↓
Extension Runtime installs immutable version
    ↓
User enables it in workspace
    ↓
Theme contribution registers
    ↓
Workspace appearance changes
    ↓
Disable
    ↓
Previous appearance returns
    ↓
Rollback
    ↓
Previous package version becomes active
```

**Validates:**
- Manifest parsing
- Registry discovery
- Resolution
- Planning
- Lifecycle delegation
- Enablement
- Contribution registration
- Events
- Rollback

### 11.2 Messages (Workspace Module)

```text
Install Messages module
    ↓
Enable in workspace
    ↓
Sidebar navigation registers
    ↓
Routes register
    ↓
Commands register
    ↓
Search providers register
    ↓
Inspector sections register
    ↓
Messages appears in sidebar
    ↓
Click Messages → Inbox view loads
```

**Validates:**
- Workspace Module activation
- Navigation contribution
- Route contribution
- Command contribution
- Search contribution
- Inspector contribution

### 11.3 Local Model Manager (App)

```text
Install Local Model Manager
    ↓
Enable in workspace
    ↓
App process launches
    ↓
Health check passes
    ↓
App appears in running processes
    ↓
Stop app
    ↓
Health check fails
    ↓
App removed from running processes
```

**Validates:**
- App Runtime isolation
- Process launch
- Health monitoring
- Graceful shutdown

---

## 12. Data Model

### 12.1 Initial Registry

A JSON index is enough initially.

```typescript
interface LocalIndex {
  version: string;
  assets: LocalAssetEntry[];
  lastUpdated: timestamp;
}

interface LocalAssetEntry {
  assetId: string;
  manifestPath: string;
  availableVersions: string[];
  catalogMetadata: MarketplaceCatalogMetadata;
}
```

### 12.2 Migration Path

```text
JSON Index (MVP)
    ↓
SQLite (Local)
    ↓
PostgreSQL (Service)
```

---

## 13. Repository Structure

### 13.1 Final Layout

```text
apps/
├── marketplace-service/
├── api/
├── workspace/
└── cli/

packages/
├── marketplace/
├── extension-contracts/
├── extension-runtime/
├── extension-security/
├── extension-publishing/
├── extension-sdk/
└── app-runtime/
```

### 13.2 Package Dependencies

```text
marketplace
    ├── extension-contracts
    ├── extension-runtime
    └── extension-sdk

extension-runtime
    ├── extension-contracts
    ├── extension-sdk
    └── shared

workspace
    ├── extension-sdk
    └── shared

cli
    ├── marketplace
    └── shared
```

---

## 14. Implementation Priority

### 14.1 This Week

1. `packages/marketplace` with core contracts and types
2. Registry abstraction and local implementation
3. Manifest loading and validation
4. Install plan generation
5. Basic Marketplace page that lists local assets
6. Install Metallic Gold Theme and see it apply
7. Install Messages and see it appear in sidebar

### 14.2 Expected Outcome

An end-to-end vertical slice—from discovery to activation—while keeping the implementation manageable.

---

## 15. Risk Mitigation

### 15.1 Incremental Delivery

Each milestone produces working software. No big-bang integration.

### 15.2 Vertical Slices

Each milestone includes tests. No untested code.

### 15.3 Local First

Network dependency is introduced only in MP-006. Earlier milestones work offline.

### 15.4 SDK Validation

The Marketplace itself proves the SDK works. No separate SDK validation needed.

### 15.5 Ownership Clarity

Marketplace plans, Extension Runtime executes, Workspace Runtime activates. No authority conflicts.

---

*This document defines the corrected incremental implementation plan for the Vestara Marketplace.*
*Build the platform first, then add capabilities. Respect ownership boundaries.*
