---
id: "marketplace-implementation"
title: "Marketplace Implementation — Incremental Build Plan"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
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
supersedes: []
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
Platform Foundation
    ↓
Local Marketplace
    ↓
Marketplace UI
    ↓
Extension Runtime Integration
    ↓
Publishing
    ↓
Online Marketplace
```

Each milestone builds on the previous one. No milestone depends on future work.

---

## 2. Milestone MP-001 — Marketplace Platform Foundation

### 2.1 Objective

The backend that everything else depends on.

### 2.2 Package Structure

```text
packages/
└── marketplace/
    ├── asset-registry/
    ├── installer/
    ├── resolver/
    ├── signatures/
    ├── integrity/
    ├── activation/
    ├── publishing/
    └── types/
```

### 2.3 Core Interfaces

```typescript
interface MarketplaceRuntime {
  registry: MarketplaceRegistry;
  installer: MarketplaceInstaller;
  resolver: MarketplaceResolver;
  publisher: MarketplacePublisher;
}

interface MarketplaceRegistry {
  getAsset(id: string): Promise<MarketplaceAsset>;
  listAssets(query: AssetQuery): Promise<AssetSearchResult>;
  getVersions(assetId: string): Promise<AssetVersion[]>;
}

interface MarketplaceInstaller {
  plan(assetId: string, options: InstallOptions): Promise<InstallPlan>;
  execute(plan: InstallPlan): Promise<InstallTransaction>;
  rollback(transaction: InstallTransaction): Promise<void>;
}

interface MarketplaceResolver {
  resolve(assetId: string, version?: string): Promise<ResolvedAsset>;
  resolveDependencies(asset: ResolvedAsset): Promise<ResolvedDependency[]>;
  checkCompatibility(asset: ResolvedAsset): Promise<CompatibilityResult>;
}

interface MarketplacePublisher {
  pack(manifest: ExtensionManifest): Promise<PackedAsset>;
  validate(asset: PackedAsset): Promise<ValidationResult>;
  publish(asset: PackedAsset): Promise<PublishResult>;
}

interface MarketplaceAsset {
  id: string;
  name: string;
  kind: AssetKind;
  versions: AssetVersion[];
  manifest: ExtensionManifest;
}

interface ExtensionManifest {
  schemaVersion: string;
  id: string;
  name: string;
  version: string;
  kind: AssetKind;
  publisher: PublisherIdentity;
  compatibility: CompatibilityConstraints;
  entrypoints: Entrypoints;
  dependencies: Dependencies;
  permissions: PermissionDeclaration;
  contributions?: ContributionDeclaration;
  integrity: IntegrityDeclaration;
  signatures?: SignatureDeclaration;
  lifecycle?: LifecycleDeclaration;
}

interface InstallPlan {
  operationId: string;
  asset: ResolvedAsset;
  dependencies: ResolvedDependency[];
  conflicts: DependencyConflict[];
  compatibility: CompatibilityResult;
  permissions: PermissionRequest[];
  integrity: IntegrityPlan;
  actions: InstallAction[];
}

interface InstallTransaction {
  transactionId: string;
  plan: InstallPlan;
  state: TransactionState;
  startedAt: timestamp;
  completedAt?: timestamp;
  rollback?: RollbackRecord;
}
```

### 2.4 Initial Operations

```text
Load local registry
Resolve asset
Generate install plan
```

No downloads yet.

### 2.5 Milestone Criteria

- [ ] Package structure created
- [ ] Core interfaces defined
- [ ] Local registry loading works
- [ ] Asset resolution works
- [ ] Install plan generation works
- [ ] Unit tests pass

---

## 3. Milestone MP-002 — Local Marketplace

### 3.1 Objective

Build a local Marketplace without networking.

### 3.2 Local Structure

```text
~/.vestara/
    marketplace/
        index.json

extensions/
    github/
    ide/
    messages/
```

### 3.3 Local Registry

```typescript
interface LocalRegistry {
  path: string;
  index: LocalIndex;
  
  load(): Promise<void>;
  save(): Promise<void>;
  
  getAsset(id: string): Promise<MarketplaceAsset>;
  listAssets(query: AssetQuery): Promise<AssetSearchResult>;
  addAsset(asset: MarketplaceAsset): Promise<void>;
  removeAsset(assetId: string): Promise<void>;
}

interface LocalIndex {
  version: string;
  assets: LocalAsset[];
  lastUpdated: timestamp;
}

interface LocalAsset {
  id: string;
  path: string;
  version: string;
  installedAt: timestamp;
  enabled: boolean;
  enabledIn: string[];
}
```

### 3.4 Validated Operations

```text
Registry management
Discovery
Dependency resolution
Manifest loading
Activation
```

### 3.5 Milestone Criteria

- [ ] Local registry structure created
- [ ] Local registry loading works
- [ ] Asset discovery works
- [ ] Dependency resolution works
- [ ] Manifest validation works
- [ ] Activation works
- [ ] Integration tests pass

---

## 4. Milestone MP-003 — Marketplace UI

### 4.1 Objective

Create a dedicated Workspace module for the Marketplace.

### 4.2 Module Structure

```text
Platform
└── Marketplace
```

### 4.3 Pages

```text
Discover
Installed
Updates
Workspace Enabled
Operations
Publish
```

### 4.4 Asset Page

```text
Overview
Versions
Dependencies
Permissions
Capabilities
Compatibility
Publisher
Reviews (future)
Install History
```

### 4.5 UI Components

```typescript
interface MarketplaceUI {
  // Pages
  DiscoverPage: Component;
  InstalledPage: Component;
  UpdatesPage: Component;
  WorkspaceEnabledPage: Component;
  OperationsPage: Component;
  PublishPage: Component;
  
  // Asset Detail
  AssetDetailPage: Component;
  AssetOverview: Component;
  AssetVersions: Component;
  AssetDependencies: Component;
  AssetPermissions: Component;
  AssetCapabilities: Component;
  AssetCompatibility: Component;
  AssetPublisher: Component;
  AssetInstallHistory: Component;
  
  // Actions
  InstallButton: Component;
  UpdateButton: Component;
  UninstallButton: Component;
  EnableButton: Component;
  DisableButton: Component;
}
```

### 4.6 Milestone Criteria

- [ ] Marketplace module created
- [ ] Navigation registered
- [ ] Routes registered
- [ ] Commands registered
- [ ] Discover page works
- [ ] Installed page works
- [ ] Asset detail works
- [ ] Install flow works
- [ ] UI tests pass

---

## 5. Milestone MP-004 — Extension Runtime Integration

### 5.1 Objective

Connect Marketplace to existing runtimes.

### 5.2 Install Flow

```text
Marketplace
    ↓
Install Plan
    ↓
Extension Runtime
    ↓
Workspace Runtime
    ↓
Module Registry
    ↓
Sidebar updates
```

### 5.3 Integration Points

```typescript
interface MarketplaceExtensionIntegration {
  // Extension Runtime
  extensionRuntime: ExtensionRuntime;
  
  // Workspace Runtime
  workspaceRuntime: WorkspaceRuntime;
  
  // Module Registry
  moduleRegistry: ModuleRegistry;
  
  // Sidebar Service
  sidebarService: SidebarService;
  
  // Navigation Service
  navigationService: NavigationService;
}

interface ExtensionRuntime {
  install(plan: InstallPlan): Promise<Installation>;
  activate(installation: Installation): Promise<Activation>;
  deactivate(activation: Activation): Promise<void>;
  uninstall(installation: Installation): Promise<void>;
  rollback(installation: Installation, targetVersion: string): Promise<void>;
}

interface WorkspaceRuntime {
  loadModule(moduleId: string): Promise<WorkspaceModule>;
  activateModule(moduleId: string): Promise<void>;
  deactivateModule(moduleId: string): Promise<void>;
  registerNavigation(navigation: NavigationDefinition): void;
  registerRoutes(routes: RouteDefinition[]): void;
  registerCommands(commands: CommandDefinition[]): void;
}
```

### 5.4 Automatic Sidebar Update

After installing a Workspace Module, the sidebar should update automatically without restarting the application.

### 5.5 Milestone Criteria

- [ ] Extension Runtime integration works
- [ ] Workspace Runtime integration works
- [ ] Module Registry integration works
- [ ] Sidebar auto-updates on install
- [ ] Navigation auto-updates on install
- [ ] Commands auto-register on install
- [ ] End-to-end install flow works
- [ ] Integration tests pass

---

## 6. Milestone MP-005 — Publishing

### 6.1 Objective

Build the publishing pipeline.

### 6.2 CLI Commands

```bash
vestara marketplace pack
vestara marketplace validate
vestara marketplace publish
vestara marketplace verify
```

### 6.3 Archive Structure

```text
github.extension
├── manifest.yaml
├── signatures/
├── artifacts/
├── workspace-module.js
└── provider-runtime.js
```

### 6.4 Publishing Pipeline

```typescript
interface PublishingPipeline {
  pack(manifest: ExtensionManifest): Promise<PackedAsset>;
  validate(asset: PackedAsset): Promise<ValidationResult>;
  sign(asset: PackedAsset, key: SigningKey): Promise<SignedAsset>;
  publish(asset: SignedAsset): Promise<PublishResult>;
  verify(assetId: string, version: string): Promise<VerificationResult>;
}

interface PackedAsset {
  id: string;
  version: string;
  archive: ArchiveReference;
  manifest: ExtensionManifest;
  signatures: SignatureRecord[];
}

interface SignedAsset extends PackedAsset {
  signatures: SignatureRecord[];
}

interface PublishResult {
  success: boolean;
  assetId: string;
  version: string;
  publishedAt: timestamp;
  issues: PublishingIssue[];
}
```

### 6.5 Milestone Criteria

- [ ] Pack command works
- [ ] Validate command works
- [ ] Publish command works
- [ ] Verify command works
- [ ] Archive structure correct
- [ ] Signature verification works
- [ ] Publishing pipeline tests pass

---

## 7. Milestone MP-006 — Online Marketplace

### 7.1 Objective

Add remote registry support.

### 7.2 Service Structure

```text
apps/
└── marketplace-service/
    ├── src/
    │   ├── registry/
    │   ├── search/
    │   ├── download/
    │   ├── version/
    │   ├── signature/
    │   └── api/
    └── package.json
```

### 7.3 Service APIs

```typescript
interface MarketplaceService {
  // Registry
  getAsset(id: string): Promise<MarketplaceAsset>;
  listAssets(query: AssetQuery): Promise<AssetSearchResult>;
  
  // Search
  search(query: string, options: SearchOptions): Promise<SearchResult>;
  
  // Download
  download(assetId: string, version: string): Promise<DownloadResult>;
  
  // Version
  getVersions(assetId: string): Promise<AssetVersion[]>;
  getLatestVersion(assetId: string): Promise<AssetVersion>;
  
  // Signature
  verifySignature(assetId: string, version: string): Promise<SignatureVerification>;
}
```

### 7.4 Client Changes

The client implementation should barely change because it already works against a registry.

```typescript
interface RemoteRegistry extends LocalRegistry {
  serviceUrl: string;
  
  // Override remote operations
  getAsset(id: string): Promise<MarketplaceAsset>;
  listAssets(query: AssetQuery): Promise<AssetSearchResult>;
  download(assetId: string, version: string): Promise<DownloadResult>;
}
```

### 7.5 Milestone Criteria

- [ ] Marketplace service created
- [ ] Registry API works
- [ ] Search API works
- [ ] Download API works
- [ ] Version API works
- [ ] Signature API works
- [ ] Client integration works
- [ ] End-to-end remote flow works
- [ ] Integration tests pass

---

## 8. Repository Structure

### 8.1 Recommended Layout

```text
apps/
├── marketplace-service/
├── api/
├── workspace/
└── cli/

packages/
├── marketplace/
├── extension-runtime/
├── extension-sdk/
├── publishing/
├── signatures/
└── installer/
```

### 8.2 Package Dependencies

```text
marketplace
    ├── extension-runtime
    ├── extension-sdk
    ├── publishing
    ├── signatures
    └── installer

extension-runtime
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

## 9. First Assets

### 9.1 Package — Metallic Gold Theme

```text
Manifest Kind: package
Activation: eager
Contributions: theme.register
Runtime Boundary: in-process
```

**Tests:**
- install
- enable
- disable
- rollback

### 9.2 Workspace Module — Messages

```text
Manifest Kind: workspace-module
Activation: on-demand
Contributions: navigation, routes, commands, search, inspector
Runtime Boundary: Workspace Runtime
```

**Tests:**
- sidebar registration
- routes
- commands
- search
- inspector

### 9.3 App — Local Model Manager

```text
Manifest Kind: app
Activation: manual
Contributions: workspace-module, service
Runtime Boundary: isolated process
```

**Tests:**
- install
- process launch
- health
- shutdown

---

## 10. Data Model

### 10.1 Initial Registry

A JSON index is enough initially.

```typescript
interface Registry {
  assets: Asset[];
  versions: Version[];
  dependencies: Dependency[];
  publishers: Publisher[];
  categories: Category[];
  bundles: Bundle[];
}

interface Asset {
  id: string;
  name: string;
  kind: AssetKind;
  publisherId: string;
  categoryId: string;
  description: string;
  manifest: ExtensionManifest;
}

interface Version {
  assetId: string;
  version: string;
  integrity: IntegrityDeclaration;
  publishedAt: timestamp;
  changelog?: string;
}

interface Dependency {
  assetId: string;
  version: string;
  dependencyId: string;
  dependencyVersion: string;
  optional: boolean;
}

interface Publisher {
  id: string;
  name: string;
  verified: boolean;
  trustLevel: TrustLevel;
}

interface Category {
  id: string;
  name: string;
  capability?: string;
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  assets: string[];
}
```

### 10.2 Migration Path

```text
JSON Index (MVP)
    ↓
SQLite (Local)
    ↓
PostgreSQL (Service)
```

---

## 11. Engineering Integration

### 11.1 Marketplace Events

Every Marketplace operation should become an Engineering Event.

```text
Install Requested
    ↓
Dependency Resolution
    ↓
Permission Review
    ↓
Downloaded
    ↓
Verified
    ↓
Activated
    ↓
Health Checked
    ↓
Completed
```

### 11.2 Event Types

```typescript
interface MarketplaceEvent {
  eventId: string;
  type: MarketplaceEventType;
  assetId: string;
  version: string;
  timestamp: timestamp;
  data: Record<string, unknown>;
}

type MarketplaceEventType = 
  | 'install-requested'
  | 'dependency-resolution'
  | 'permission-review'
  | 'downloaded'
  | 'verified'
  | 'activated'
  | 'health-checked'
  | 'completed'
  | 'failed'
  | 'rolled-back';
```

### 11.3 Replay Capability

The user should be able to replay an installation exactly like an engineering session.

---

## 12. Marketplace as Workspace Module

### 12.1 Self-Implementation

The Marketplace itself should be implemented using the same Workspace SDK as any third-party module.

### 12.2 Contributions

```text
Navigation
Routes
Commands
Search Providers
Inspector Integrations
Toolbar Actions
```

### 12.3 Validation

If your own Marketplace can run purely through the Workspace SDK, you've proven the SDK is capable enough for external developers.

---

## 13. Implementation Priority

### 13.1 This Week

1. `packages/marketplace` with core contracts and runtime
2. Local JSON registry
3. Manifest loading and validation
4. Install plan generation
5. Basic Marketplace page that lists local assets
6. Install a single Theme package
7. Install the Messages Workspace Module and watch it appear in the sidebar

### 13.2 Expected Outcome

An end-to-end vertical slice—from discovery to activation—while keeping the implementation manageable.

---

## 14. Milestone Dependencies

```text
MP-001 (Platform Foundation)
    ↓
MP-002 (Local Marketplace)
    ↓
MP-003 (Marketplace UI)
    ↓
MP-004 (Extension Runtime Integration)
    ↓
MP-005 (Publishing)
    ↓
MP-006 (Online Marketplace)
```

---

## 15. Risk Mitigation

### 15.1 Incremental Delivery

Each milestone produces working software. No big-bang integration.

### 15.1 Vertical Slices

Each milestone includes tests. No untested code.

### 15.3 Local First

Network dependency is introduced only in MP-006. Earlier milestones work offline.

### 15.4 SDK Validation

The Marketplace itself proves the SDK works. No separate SDK validation needed.

---

*This document defines the incremental implementation plan for the Vestara Marketplace.*
*Build the platform first, then add capabilities.*
