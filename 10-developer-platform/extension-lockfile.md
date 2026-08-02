---
id: "extension-lockfile"
title: "Extension Lockfile — Resolved Version Pins"
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
tags: ["marketplace", "extension", "lockfile", "canonical"]
---

# Extension Lockfile

## Resolved Version Pins

> **Each workspace resolves exact versions. The lockfile records the exact resolved installation, not version ranges.**

---

## 1. Architectural Position

```
ExtensionManifest
    ↓
Dependency Resolution
    ↓
WorkspaceExtensionLockfile
    ↓
Exact Version Pins
```

Do not store `latest` or version ranges in the lockfile. Those belong in the requested manifest; the lockfile records the exact resolved installation.

---

## 2. Canonical Entities

### 2.1 WorkspaceExtensionLockfile

```typescript
interface WorkspaceExtensionLockfile {
  lockfileVersion: string;
  workspaceId: string;
  resolvedAt: timestamp;
  extensions: LockfileExtension[];
  integrity: string;
}

interface LockfileExtension {
  id: string;
  version: string;
  integrity: string;
  enabled: boolean;
  assetKind: AssetKind;
  permissionsRevision: string;
  configurationRevision?: string;
  resolvedAt: timestamp;
  dependencies: LockfileDependency[];
}

type AssetKind = 'package' | 'workspace-module' | 'app';

interface LockfileDependency {
  id: string;
  version: string;
  integrity: string;
}
```

### 2.2 LockfileOperation

```typescript
interface LockfileOperation {
  operationId: string;
  type: LockfileOperationType;
  extensions: string[];
  startedAt: timestamp;
  completedAt?: timestamp;
  result: LockfileOperationResult;
}

type LockfileOperationType = 'install' | 'update' | 'remove' | 'enable' | 'disable';

interface LockfileOperationResult {
  success: boolean;
  changes: LockfileChange[];
  errors: string[];
}

interface LockfileChange {
  extensionId: string;
  type: ChangeType;
  previousVersion?: string;
  newVersion?: string;
  previousEnabled?: boolean;
  newEnabled?: boolean;
}

type ChangeType = 'add' | 'update' | 'remove' | 'enable' | 'disable';
```

---

## 3. Lockfile Structure

### 3.1 YAML Format

```yaml
lockfileVersion: "1"
workspaceId: "vestara-ai-core"
resolvedAt: "2026-08-03T12:00:00Z"
integrity: "sha256-abc123..."

extensions:
  com.vestara.github:
    version: "1.2.0"
    integrity: "sha256-def456..."
    enabled: true
    assetKind: "workspace-module"
    permissionsRevision: "3"
    configurationRevision: "5"
    resolvedAt: "2026-08-03T12:00:00Z"
    dependencies:
      - id: "@vestara/git-runtime"
        version: "1.0.3"
        integrity: "sha256-ghi789..."

  com.vestara.api-builder:
    version: "2.1.4"
    integrity: "sha256-jkl012..."
    enabled: true
    assetKind: "workspace-module"
    permissionsRevision: "1"
    resolvedAt: "2026-08-03T12:00:00Z"
    dependencies:
      - id: "@vestara/builder-runtime"
        version: "1.0.0"
        integrity: "sha256-mno345..."
```

### 3.2 JSON Format

```json
{
  "lockfileVersion": "1",
  "workspaceId": "vestara-ai-core",
  "resolvedAt": "2026-08-03T12:00:00Z",
  "integrity": "sha256-abc123...",
  "extensions": {
    "com.vestara.github": {
      "version": "1.2.0",
      "integrity": "sha256-def456...",
      "enabled": true,
      "assetKind": "workspace-module",
      "permissionsRevision": "3",
      "configurationRevision": "5",
      "resolvedAt": "2026-08-03T12:00:00Z",
      "dependencies": [
        {
          "id": "@vestara/git-runtime",
          "version": "1.0.3",
          "integrity": "sha256-ghi789..."
        }
      ]
    }
  }
}
```

---

## 4. Lockfile Rules

### 4.1 Version Pinning

- Lockfile stores exact versions, not ranges
- Version ranges belong in the manifest
- Lockfile is deterministic and reproducible

### 4.2 Integrity Storage

- Each extension has its integrity hash
- Each dependency has its integrity hash
- Lockfile itself has an integrity hash

### 4.3 Enablement State

- Each extension has an enabled flag
- Enablement is per-workspace
- Enablement changes update the lockfile

### 4.4 Revision Tracking

- Permissions revision tracks permission changes
- Configuration revision tracks configuration changes
- Revisions enable change detection

---

## 5. Lockfile Operations

### 5.1 Install Operation

```text
Install Request
    ↓
Dependency Resolution
    ↓
Version Pinning
    ↓
Integrity Calculation
    ↓
Lockfile Update
    ↓
Lockfile Integrity Update
```

### 5.2 Update Operation

```text
Update Request
    ↓
Version Comparison
    ↓
Dependency Re-resolution
    ↓
Integrity Recalculation
    ↓
Lockfile Update
    ↓
Lockfile Integrity Update
```

### 5.3 Remove Operation

```text
Remove Request
    ↓
Dependency Check
    ↓
Extension Removal
    ↓
Lockfile Update
    ↓
Lockfile Integrity Update
```

### 5.4 Enable/Disable Operation

```text
Enable/Disable Request
    ↓
State Change
    ↓
Lockfile Update
    ↓
Lockfile Integrity Update
```

---

## 6. Relationships

### 6.1 Entity Relationships

```
WorkspaceExtensionLockfile 1──* LockfileExtension
LockfileExtension 1──* LockfileDependency
WorkspaceExtensionLockfile 1──* LockfileOperation
```

### 6.2 Dependency Graph

```
Workspace
    ├── has: WorkspaceExtensionLockfile
    └── resolves: LockfileExtension[]

LockfileExtension
    ├── dependsOn: LockfileDependency[]
    └── recordedBy: LockfileOperation
```

---

## 7. Runtime Ownership

### 7.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| WorkspaceExtensionLockfile | ExtensionRuntime | Lockfile management |
| LockfileExtension | ExtensionRuntime | Extension resolution |
| LockfileDependency | ExtensionRuntime | Dependency resolution |
| LockfileOperation | ExtensionRuntime | Operation management |

### 7.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Atomic Updates**: Lockfile updates are atomic
3. **Integrity Preservation**: Lockfile integrity is preserved
4. **Deterministic Resolution**: Resolution is deterministic
5. **Reproducible Builds**: Lockfile enables reproducible builds

---

## 8. Events

### 8.1 Lockfile Events

| Event | Payload | Trigger |
|-------|---------|---------|
| LockfileCreated | WorkspaceExtensionLockfile | Creation |
| LockfileUpdated | WorkspaceExtensionLockfile, LockfileChange[] | Update |
| LockfileCorrupted | WorkspaceExtensionLockfile, Failure | Corruption |
| LockfileRestored | WorkspaceExtensionLockfile | Restoration |

### 8.2 Operation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| LockfileOperationStarted | LockfileOperation | Operation start |
| LockfileOperationCompleted | LockfileOperation, Result | Operation success |
| LockfileOperationFailed | LockfileOperation, Failure | Operation failure |

---

## 9. Verification Requirements

### 9.1 Lockfile Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Schema Validation | Lockfile conforms to schema |
| Integrity Validation | Lockfile integrity matches |
| Version Validation | Versions are exact |
| Dependency Validation | Dependencies are resolved |
| Enablement Validation | Enablement state is valid |

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Extension Runtime | Lockfile management | Runtime API |
| Workspace Runtime | Workspace context | Workspace API |
| Dependency Resolver | Version resolution | Resolver API |
| Integrity Service | Integrity verification | Integrity API |
| Filesystem Service | Lockfile persistence | Filesystem API |

---

## 11. Open Questions

1. How should lockfile conflicts be resolved?
2. How should lockfile migration work?
3. How should lockfile backup work?
4. How should lockfile validation be extensible?
5. How should lockfile performance be optimized?

---

*This document defines the canonical Extension Lockfile for Vestara.*
*Resolved version pins for deterministic and reproducible installations.*
