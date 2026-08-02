---
id: "marketplace-asset-model"
title: "Marketplace Asset Model — Unified Extension Taxonomy"
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
tags: ["marketplace", "extension", "asset-model", "taxonomy", "canonical"]
---

# Marketplace Asset Model

## Unified Extension Taxonomy

> **Vestara distributes packages, Workspace modules, and applications as unified extension packages. One Marketplace, one installer, three distinct asset kinds.**

---

## 1. Architectural Position

```
Marketplace
    ├── Discovery
    ├── Trust Metadata
    ├── Distribution
    ├── Updates
    └── Installation Planning

Extension Runtime
    ├── Transactional Lifecycle
    ├── Activation
    ├── Rollback
    ├── Permissions
    ├── Durable State
    └── Graph Projection

Asset Kinds
    ├── Package
    ├── Workspace Module
    └── App
```

The Marketplace owns discovery and install planning. The Extension Runtime remains the sole authority for installation, activation, rollback, uninstall, permissions, durable state, and graph projection.

---

## 2. Asset Taxonomy

### 2.1 Three Asset Kinds

```
Marketplace Asset
├── Package
├── Workspace Module
└── App
```

All three share:
- Identity and versioning
- Integrity verification
- Dependency resolution
- Permissions model
- Transactional install
- Rollback capability
- Event emission
- Engineering Graph projection

They differ only in:
- Activation model
- Runtime boundary
- Execution context

### 2.2 Package

A package adds capabilities to existing Vestara runtimes but does not create a standalone Workspace surface.

**Examples:**

```text
Provider adapter
Agent capability
Verification rule pack
Theme
Language support
Builder domain pack
Tool adapter
Standards pack
Connector
```

**Activation:**

```text
Package
    ↓
Extension Runtime
    ↓
Controlled contribution points
    ↓
Existing runtime or registry
```

**Package Identifiers:**

```text
@vestara/provider-openai
@vestara/verifier-playwright
@vestara/theme-metallic-gold
@vestara/standards-typescript
```

Packages never mutate core registries directly. They register contributions through controlled extension points so activation can be reversed cleanly.

### 2.3 Workspace Module

A module contributes an interactive Workspace experience through `WorkspaceModule` and `WorkspaceSDK`.

**Examples:**

```text
Messages
Calendar
IDE
GitHub
GitLab
Jira
Linear
Slack
Azure DevOps
Database Builder
Infrastructure Builder
```

**Activation:**

```text
Workspace Module Package
    ↓
Extension Runtime
    ↓
Workspace Module Registry
    ↓
Workspace Runtime
    ↓
Navigation, routes, commands, search, inspector, docking
```

A module is an extension package whose manifest declares:

```yaml
kind: workspace-module
entrypoints:
  workspace: ./dist/workspace-module.js
```

### 2.4 App

An app is a larger independently executable product with its own process, runtime lifecycle, storage boundary, and potentially multiple Workspace modules.

**Examples:**

```text
Vestara IDE Desktop
Local Model Manager
Database Administration Studio
Deployment Control Center
Visual Testing Studio
Data Pipeline Studio
Onboarding Lab
```

**Activation:**

```text
App Package
    ↓
App Runtime / Process Supervisor
    ↓
Isolated process or container
    ↓
Registered services and Workspace modules
```

Apps must not be loaded as arbitrary in-process code.

---

## 3. Trust Boundaries

### 3.1 Execution Trust

```text
Trusted package/module
    → in-process may be permitted

Third-party app
    → process, worker, container, or VM isolation required
```

### 3.2 Trust Levels

| Trust Level | Description | Execution Boundary |
|-------------|-------------|-------------------|
| First-party | Vestara core packages | In-process permitted |
| Verified | Signed by verified publisher | In-process with approval |
| Community | Unsigned third-party | Process isolation required |
| Untrusted | Unknown source | Blocked |

---

## 4. Canonical Identifiers

### 4.1 Naming Conventions

```text
MarketplaceAsset      = physical distributable
ExtensionManifest     = canonical manifest
ExtensionPackage      = physical distribution unit
WorkspaceModule       = interactive workspace contribution
VestaraApp            = standalone application
ExtensionRuntime      = lifecycle authority
AppRuntime            = application execution authority
MarketplaceRegistry   = discovery and catalog
MarketplaceInstallPlan = transactional plan
WorkspaceExtensionLockfile = resolved versions
```

### 4.2 Asset Kind vs Package Kind

```text
Extension Package
    = physical distributable

Asset Kind
    = package | workspace-module | app
```

A single extension package may contain multiple asset kinds. For example, Messages may be distributed as one extension package with multiple contributions:

```text
messages.extension
├── Messaging connector package
├── Messages Workspace module
└── Optional background sync app/service
```

---

## 5. Relationships

### 5.1 Entity Relationships

```
MarketplaceRegistry 1──* MarketplaceAsset
MarketplaceAsset 1──1 ExtensionManifest
MarketplaceAsset 1──* ResolvedDependency
MarketplaceAsset 1──* PermissionRequest
MarketplaceAsset 1──1 IntegrityPlan
MarketplaceAsset 1──1 MarketplaceInstallPlan

MarketplaceInstallPlan 1──* InstallAction
MarketplaceInstallPlan 1──1 CompatibilityResult

ExtensionRuntime 1──* ExtensionPackage
ExtensionRuntime 1──* ActivationRecord

WorkspaceRuntime 1──* WorkspaceModule
WorkspaceRuntime 1──* WorkspaceExtensionLockfile

AppRuntime 1──* VestaraApp
AppRuntime 1──* ProcessRecord
```

### 5.2 Dependency Graph

```
Marketplace
    ├── discovers: MarketplaceAsset[]
    ├── plans: MarketplaceInstallPlan[]
    └── distributes: ExtensionPackage[]

Extension Runtime
    ├── installs: ExtensionPackage[]
    ├── activates: ActivationRecord[]
    ├── manages: PermissionRecord[]
    └── projects: EngineeringEvent[]

Workspace Runtime
    ├── loads: WorkspaceModule[]
    ├── activates: ModuleActivation[]
    └── renders: WorkspaceUI

App Runtime
    ├── spawns: ProcessRecord[]
    ├── monitors: HealthStatus[]
    └── isolates: ContainerRecord[]
```

---

## 6. Runtime Ownership

### 6.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| MarketplaceAsset | MarketplaceRegistry | Discovery, catalog, trust metadata |
| ExtensionManifest | ExtensionRuntime | Validation, interpretation |
| ExtensionPackage | ExtensionRuntime | Installation, integrity |
| MarketplaceInstallPlan | MarketplaceRegistry | Planning, dry-run |
| ActivationRecord | ExtensionRuntime | Activation, deactivation |
| WorkspaceModule | WorkspaceRuntime | Module lifecycle, UI |
| VestaraApp | AppRuntime | Process lifecycle, isolation |

### 6.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Graph Projection**: Owner projects state into Engineering Graph

---

## 7. Events

### 7.1 Asset Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AssetDiscovered | MarketplaceAsset | Discovery |
| AssetIndexed | MarketplaceAsset, IndexResult | Indexing |
| AssetUpdated | MarketplaceAsset, UpdateResult | Update |
| AssetRemoved | MarketplaceAsset, Reason | Removal |

### 7.2 Installation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| InstallPlanCreated | MarketplaceInstallPlan | Planning |
| InstallStarted | MarketplaceInstallPlan | Install start |
| InstallCompleted | MarketplaceInstallPlan, Result | Install success |
| InstallFailed | MarketplaceInstallPlan, Failure | Install failure |
| InstallRolledBack | MarketplaceInstallPlan, RollbackResult | Rollback |

### 7.3 Activation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| PackageActivated | ActivationRecord | Package activation |
| PackageDeactivated | ActivationRecord, Reason | Package deactivation |
| ModuleActivated | ModuleActivation | Module activation |
| ModuleDeactivated | ModuleActivation, Reason | Module deactivation |
| AppStarted | ProcessRecord | App start |
| AppStopped | ProcessRecord, Reason | App stop |

---

## 8. Verification Requirements

### 8.1 Asset Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | Manifest conforms to schema |
| Identity Validation | ID follows naming conventions |
| Version Validation | Version follows semver |
| Dependency Validation | All dependencies resolvable |
| Permission Validation | Permissions are valid |
| Integrity Validation | Checksum matches |
| Signature Validation | Signature is valid |

### 8.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 9. Integration Points

### 9.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Extension Runtime | Lifecycle management | Runtime API |
| Workspace Runtime | Module activation | Module API |
| App Runtime | Process management | Process API |
| Engineering Graph | Relationship tracking | Graph API |
| Engineering Events | Event persistence | Event API |
| Security Service | Trust verification | Security API |

---

## 10. Open Questions

1. How should cross-asset-kind dependencies be resolved?
2. How should mixed-asset packages be versioned?
3. How should app sandboxing be enforced?
4. How should marketplace trust be propagated?
5. How should asset kind migration be handled?

---

*This document defines the canonical Marketplace Asset Model for Vestara.*
*One Marketplace, one installer, three distinct asset kinds.*
