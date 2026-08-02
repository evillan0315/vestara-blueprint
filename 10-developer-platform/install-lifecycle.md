---
id: "install-lifecycle"
title: "Install Lifecycle — Transactional Extension Installation"
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
tags: ["marketplace", "extension", "install", "lifecycle", "canonical"]
---

# Install Lifecycle

## Transactional Extension Installation

> **The same transactional lifecycle for all three asset types: package, workspace-module, and app. Failure at any stage produces clean rollback.**

---

## 1. Architectural Position

```
Marketplace
    ├── Discover
    ├── Resolve
    ├── Plan
    └── Review

Extension Runtime
    ├── Acquire
    ├── Verify
    ├── Stage
    ├── Activate
    ├── Health Check
    └── Commit

Failure Handling
    ├── Deactivate Partial
    ├── Restore Previous
    ├── Remove Staged
    └── Record Evidence
```

The Marketplace owns discovery and planning. The Extension Runtime owns the transactional lifecycle. Failure at any stage triggers automatic rollback.

---

## 2. Canonical Entities

### 2.1 MarketplaceInstallPlan

```typescript
interface MarketplaceInstallPlan {
  operationId: string;
  requestedAsset: AssetReference;
  assetKind: AssetKind;
  targetScope: InstallationScope;
  
  resolvedVersion: string;
  dependencies: ResolvedDependency[];
  conflicts: DependencyConflict[];
  compatibility: CompatibilityResult;
  permissions: PermissionRequest[];
  integrity: IntegrityPlan;
  signature: SignaturePlan;
  isolation: IsolationPlan;
  
  diskImpact: {
    downloadBytes: number;
    installedBytes: number;
  };
  
  actions: InstallAction[];
  restartRequirement: RestartRequirement;
  rollbackAvailable: boolean;
}

type AssetKind = 'package' | 'workspace-module' | 'app';
type InstallationScope = 'user' | 'workspace' | 'system';
type RestartRequirement = 'none' | 'module' | 'workspace' | 'runtime' | 'system';
```

### 2.2 AssetReference

```typescript
interface AssetReference {
  id: string;
  version?: string;
  source: AssetSource;
}

type AssetSource = 'marketplace' | 'local' | 'git' | 'url';
```

### 2.3 ResolvedDependency

```typescript
interface ResolvedDependency {
  id: string;
  version: string;
  source: AssetSource;
  assetKind: AssetKind;
  integrity: IntegrityDeclaration;
  alreadyInstalled: boolean;
  requiresUpdate: boolean;
}
```

### 2.4 DependencyConflict

```typescript
interface DependencyConflict {
  type: ConflictType;
  dependency: string;
  required: string;
  existing: string;
  resolution: ConflictResolution;
}

type ConflictType = 
  | 'version-mismatch'
  | 'missing-dependency'
  | 'circular-dependency'
  | 'platform-incompatible'
  | 'capability-missing'
  | 'singleton-conflict';

type ConflictResolution = 
  | 'error'
  | 'upgrade'
  | 'downgrade'
  | 'replace'
  | 'skip';
```

### 2.5 CompatibilityResult

```typescript
interface CompatibilityResult {
  compatible: boolean;
  workspace: boolean;
  platform: boolean;
  sdk: boolean;
  node: boolean;
  issues: CompatibilityIssue[];
}

interface CompatibilityIssue {
  type: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}
```

### 2.6 PermissionRequest

```typescript
interface PermissionRequest {
  id: string;
  description: string;
  reason?: string;
  risk: PermissionRisk;
  required: boolean;
  previouslyGranted: boolean;
  newPermission: boolean;
}

type PermissionRisk = 'low' | 'medium' | 'high' | 'critical';
```

### 2.7 IntegrityPlan

```typescript
interface IntegrityPlan {
  algorithm: string;
  expectedDigest: string;
  downloadVerification: boolean;
  installedVerification: boolean;
}
```

### 2.8 SignaturePlan

```typescript
interface SignaturePlan {
  required: boolean;
  algorithm?: string;
  keyId?: string;
  verificationRequired: boolean;
}
```

### 2.9 IsolationPlan

```typescript
interface IsolationPlan {
  required: boolean;
  type: IsolationType;
  reason: string;
}

type IsolationType = 
  | 'none'
  | 'worker'
  | 'process'
  | 'container'
  | 'vm';
```

### 2.10 InstallAction

```typescript
interface InstallAction {
  id: string;
  type: ActionType;
  description: string;
  target?: string;
  reversible: boolean;
  requiresRestart: boolean;
  estimatedDurationMs?: number;
}

type ActionType = 
  | 'download'
  | 'verify'
  | 'stage'
  | 'install-dependency'
  | 'register-contribution'
  | 'start-isolated-process'
  | 'run-health-check'
  | 'enable-module'
  | 'restart-runtime'
  | 'commit-lockfile';
```

---

## 3. Installation Lifecycle

### 3.1 Standard Lifecycle

```text
Discover
    ↓
Resolve
    ↓
Plan
    ↓
Review permissions
    ↓
Acquire
    ↓
Verify integrity/signature
    ↓
Stage immutable version
    ↓
Run compatibility checks
    ↓
Activate
    ↓
Health check
    ↓
Commit durable state
    ↓
Enable in workspace
    ↓
Emit events and graph projection
```

### 3.2 Lifecycle States

```typescript
interface InstallLifecycleState {
  phase: InstallPhase;
  startedAt: timestamp;
  completedAt?: timestamp;
  actions: InstallActionResult[];
  rollback?: RollbackRecord;
}

type InstallPhase = 
  | 'discovered'
  | 'resolved'
  | 'planned'
  | 'permissions-reviewed'
  | 'acquiring'
  | 'verifying'
  | 'staging'
  | 'compatibility-checked'
  | 'activating'
  | 'health-checked'
  | 'committed'
  | 'enabled'
  | 'completed'
  | 'failed'
  | 'rolled-back';
```

### 3.3 Action Execution

```typescript
interface InstallActionResult {
  actionId: string;
  status: ActionStatus;
  startedAt: timestamp;
  completedAt?: timestamp;
  error?: string;
  evidence?: string;
}

type ActionStatus = 
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'failed'
  | 'skipped'
  | 'rolled-back';
```

---

## 4. Failure Handling

### 4.1 Failure Rollback

```text
Activation failure
    ↓
Deactivate partial contributions
    ↓
Restore previous version
    ↓
Remove staged current pointer
    ↓
Record failure evidence
```

### 4.2 Rollback Record

```typescript
interface RollbackRecord {
  reason: string;
  failedAction: string;
  error: string;
  restoredVersion?: string;
  removedFiles: string[];
  deactivatedContributions: string[];
  evidence: string;
  timestamp: timestamp;
}
```

### 4.3 Partial Failure

```typescript
interface PartialFailure {
  completedActions: string[];
  failedAction: string;
  rolledBackActions: string[];
  state: 'partial' | 'rolled-back' | 'requires-manual-intervention';
}
```

---

## 5. Installation Scopes

### 5.1 User Installation

The asset is available to the user but not automatically active everywhere.

```text
~/.vestara/extensions/
```

Conceptually:

```text
Installed for Eddie
Enabled only in selected workspaces
```

### 5.2 Workspace Enablement

The workspace selects an already installed version and configuration.

```text
<workspace>/.vestara/extensions.lock
<workspace>/.vestara/extensions.json
```

This stores references and enablement state, not duplicate package contents.

### 5.3 System Installation

Reserved for Vestara OS, administrators, or managed enterprise deployment.

```text
/opt/vestara/extensions/
```

System scope should be policy-controlled and generally read-only to ordinary users.

### 5.4 Scope Rules

```text
Install ≠ Enable
```

A package may be installed once and enabled in zero, one, or many workspaces.

---

## 6. Immutable Storage Model

### 6.1 Storage Structure

```text
extensions/
├── store/
│   ├── sha256-abc123/
│   ├── sha256-def456/
│   └── ...
├── packages/
│   └── com.vestara.github/
│       ├── 1.1.0 -> ../../store/sha256-abc123
│       └── 1.2.0 -> ../../store/sha256-def456
└── active/
    └── com.vestara.github -> ../packages/com.vestara.github/1.2.0
```

### 6.2 Storage Benefits

- Atomic activation
- Retained rollback versions
- Deduplication
- Integrity verification
- No partial mutable installs

---

## 7. Events

### 7.1 Lifecycle Events

| Event | Payload | Trigger |
|-------|---------|---------|
| InstallPlanCreated | MarketplaceInstallPlan | Planning |
| InstallStarted | MarketplaceInstallPlan | Install start |
| InstallActionStarted | InstallAction | Action start |
| InstallActionCompleted | InstallAction, ActionResult | Action success |
| InstallActionFailed | InstallAction, Failure | Action failure |
| InstallCompleted | MarketplaceInstallPlan, Result | Install success |
| InstallFailed | MarketplaceInstallPlan, Failure | Install failure |
| InstallRolledBack | MarketplaceInstallPlan, RollbackRecord | Rollback |

### 7.2 Scope Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AssetInstalled | AssetReference, InstallationScope | Installation |
| AssetEnabled | AssetReference, WorkspaceReference | Enablement |
| AssetDisabled | AssetReference, WorkspaceReference, Reason | Disablement |
| AssetUninstalled | AssetReference, Reason | Uninstallation |

---

## 8. Verification Requirements

### 8.1 Lifecycle Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Plan Validation | Plan is complete and valid |
| Permission Review | Permissions are reviewed and approved |
| Integrity Verification | Checksum matches |
| Signature Verification | Signature is valid |
| Compatibility Verification | Asset is compatible |
| Health Check | Asset is healthy |
| State Commit | Durable state is committed |

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
| Extension Runtime | Lifecycle execution | Runtime API |
| MarketplaceRegistry | Planning, dry-run | Marketplace API |
| Workspace Runtime | Module enablement | Module API |
| App Runtime | Process management | Process API |
| Security Service | Trust verification | Security API |
| Engineering Graph | Relationship projection | Graph API |
| Engineering Events | Event persistence | Event API |

---

## 10. Open Questions

1. How should parallel installations be handled?
2. How should installation queuing work?
3. How should installation progress be reported?
4. How should installation cancellation be handled?
5. How should installation retry work?

---

*This document defines the canonical Install Lifecycle for Vestara.*
*Transactional installation for all asset kinds.*
