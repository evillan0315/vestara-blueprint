---
id: "dependency-resolution"
title: "Dependency Resolution — Extension Dependency Management"
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
tags: ["marketplace", "extension", "dependency", "resolution", "canonical"]
---

# Dependency Resolution

## Extension Dependency Management

> **Keep the resolver intentionally simpler than npm. Explicit conflict errors and deterministic install order over an npm-equivalent resolver.**

---

## 1. Architectural Position

```
ExtensionManifest
    ↓
Dependency Declaration
    ↓
Dependency Resolver
    ↓
Resolved Dependencies
    ↓
Lockfile
```

The dependency resolver is intentionally simpler than npm. It favors explicit conflict errors and deterministic install order.

---

## 2. Canonical Entities

### 2.1 DependencyResolution

```typescript
interface DependencyResolution {
  resolutionId: string;
  rootAsset: AssetReference;
  dependencies: ResolvedDependency[];
  conflicts: DependencyConflict[];
  cycles: DependencyCycle[];
  result: ResolutionResult;
  resolvedAt: timestamp;
}

interface AssetReference {
  id: string;
  version: string;
  source: AssetSource;
}

type AssetSource = 'marketplace' | 'local' | 'git' | 'url';

interface ResolvedDependency {
  id: string;
  version: string;
  source: AssetSource;
  assetKind: AssetKind;
  integrity: IntegrityDeclaration;
  alreadyInstalled: boolean;
  requiresUpdate: boolean;
  dependencies: ResolvedDependency[];
}

type AssetKind = 'package' | 'workspace-module' | 'app';

interface IntegrityDeclaration {
  algorithm: string;
  digest: string;
}
```

### 2.2 DependencyConflict

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

### 2.3 DependencyCycle

```typescript
interface DependencyCycle {
  cycleId: string;
  path: string[];
  severity: 'error' | 'warning';
  resolution: CycleResolution;
}

type CycleResolution = 'break' | 'error' | 'skip';
```

### 2.4 ResolutionResult

```typescript
interface ResolutionResult {
  success: boolean;
  dependencies: ResolvedDependency[];
  conflicts: DependencyConflict[];
  cycles: DependencyCycle[];
  warnings: string[];
  errors: string[];
}
```

---

## 3. Supported Dependency Types

### 3.1 Exact Version

```yaml
dependencies:
  "@vestara/git-runtime": "1.0.3"
```

### 3.2 SemVer Range

```yaml
dependencies:
  "@vestara/git-runtime": "^1.0.0"
  "@vestara/builder-runtime": "~2.1.0"
```

### 3.3 Latest Compatible Stable

```yaml
dependencies:
  "@vestara/git-runtime": "latest"
```

### 3.4 Optional Dependency

```yaml
optional:
  "@vestara/provider-openai": "^1.0.0"
```

### 3.5 Peer/Runtime Compatibility

```yaml
peer:
  "@vestara/workspace-sdk": "^1.0.0"
```

### 3.6 Platform-Specific Dependency

```yaml
platform:
  linux-x64:
    "@vestara/native-module": "^1.0.0"
  darwin-x64:
    "@vestara/native-module": "^1.0.0"
```

---

## 4. Rejected Patterns

### 4.1 Dependency Cycles

```text
A depends on B
B depends on C
C depends on A
    → ERROR: Circular dependency detected
```

### 4.2 Version Conflicts

```text
A requires B@^1.0.0
C requires B@^2.0.0
    → ERROR: Version conflict
```

### 4.3 Missing Runtime Capabilities

```text
A requires capability "filesystem.write"
Platform does not provide capability
    → ERROR: Missing capability
```

### 4.4 Unsupported Platform

```text
A requires platform "linux-x64"
Running on "darwin-x64"
    → ERROR: Unsupported platform
```

### 4.5 Incompatible Workspace SDK

```text
A requires SDK "@vestara/workspace-sdk": "^2.0.0"
Platform provides SDK "@vestara/workspace-sdk": "^1.0.0"
    → ERROR: Incompatible SDK
```

### 4.6 Conflicting Singleton Providers

```text
A requires provider "openai"
B requires provider "anthropic"
    → ERROR: Singleton provider conflict
```

---

## 5. Resolution Algorithm

### 5.1 Standard Resolution

```text
Start with root asset
    ↓
Read manifest dependencies
    ↓
For each dependency:
    ↓
    Check if already resolved
        ↓
        If not resolved:
            ↓
            Fetch manifest
            ↓
            Check compatibility
            ↓
            Resolve version
            ↓
            Add to resolved list
            ↓
            Recurse for sub-dependencies
        ↓
        If resolved:
            ↓
            Check version compatibility
            ↓
            If compatible: skip
            ↓
            If not compatible: conflict
    ↓
Check for cycles
    ↓
Check for conflicts
    ↓
Return resolution result
```

### 5.2 Deterministic Order

Dependencies are resolved in deterministic order:
1. Sort by dependency name
2. Sort by version (highest first)
3. Sort by source (marketplace first)

---

## 6. Relationships

### 6.1 Entity Relationships

```
DependencyResolution 1──1 AssetReference
DependencyResolution 1──* ResolvedDependency
DependencyResolution 1──* DependencyConflict
DependencyResolution 1──* DependencyCycle
DependencyResolution 1──1 ResolutionResult

ResolvedDependency 1──* ResolvedDependency (sub-dependencies)
```

### 6.2 Dependency Graph

```
Dependency Resolver
    ├── resolves: DependencyResolution[]
    ├── detects: DependencyConflict[]
    └── detects: DependencyCycle[]

ResolvedDependency
    ├── dependsOn: ResolvedDependency[]
    └── recordedIn: Lockfile
```

---

## 7. Runtime Ownership

### 7.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| DependencyResolution | ExtensionRuntime | Resolution management |
| ResolvedDependency | ExtensionRuntime | Dependency tracking |
| DependencyConflict | ExtensionRuntime | Conflict detection |
| DependencyCycle | ExtensionRuntime | Cycle detection |
| ResolutionResult | ExtensionRuntime | Result management |

### 7.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Deterministic Resolution**: Resolution is deterministic
3. **Explicit Conflicts**: Conflicts are explicitly reported
4. **No Silent Fallbacks**: No silent version fallbacks
5. **Lockfile Recording**: Results are recorded in lockfile

---

## 8. Events

### 8.1 Resolution Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ResolutionStarted | DependencyResolution | Resolution start |
| ResolutionCompleted | DependencyResolution, Result | Resolution success |
| ResolutionFailed | DependencyResolution, Failure | Resolution failure |
| ConflictDetected | DependencyConflict | Conflict detection |
| CycleDetected | DependencyCycle | Cycle detection |

---

## 9. Verification Requirements

### 9.1 Resolution Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | All manifests are valid |
| Version Validation | Versions are valid semver |
| Compatibility Validation | All dependencies are compatible |
| Integrity Validation | All dependencies have integrity |
| Cycle Detection | No circular dependencies |
| Conflict Detection | No version conflicts |

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Extension Runtime | Resolution execution | Runtime API |
| Marketplace Registry | Dependency lookup | Registry API |
| Lockfile Service | Result persistence | Lockfile API |
| Compatibility Service | Compatibility checking | Compatibility API |
| Integrity Service | Integrity verification | Integrity API |

---

## 11. Open Questions

1. How should parallel resolution be handled?
2. How should resolution caching work?
3. How should resolution performance be optimized?
4. How should resolution be extensible?
5. How should resolution be audited?

---

*This document defines the canonical Dependency Resolution for Vestara.*
*Intentionally simpler than npm with explicit conflict errors.*
