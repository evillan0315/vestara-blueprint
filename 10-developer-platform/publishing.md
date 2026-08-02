---
id: "publishing"
title: "Publishing — Extension Distribution Model"
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
tags: ["marketplace", "extension", "publishing", "distribution", "canonical"]
---

# Publishing

## Extension Distribution Model

> **Publishing is the process of making extensions available through the Marketplace. It includes validation, signing, distribution, and lifecycle management.**

---

## 1. Architectural Position

```
Publisher
    ↓
Extension Package
    ↓
Publishing Pipeline
    ↓
Marketplace Registry
    ↓
Distribution
```

The Marketplace owns distribution. The Extension Runtime owns installation. Publishing is the entry point to the distribution pipeline.

---

## 2. Canonical Entities

### 2.1 PublishingRequest

```typescript
interface PublishingRequest {
  requestId: string;
  publisherId: string;
  asset: AssetSubmission;
  metadata: PublishingMetadata;
  submittedAt: timestamp;
}

interface AssetSubmission {
  id: string;
  version: string;
  kind: AssetKind;
  archive: ArchiveReference;
  manifest: ExtensionManifest;
  signatures: SignatureRecord[];
}

type AssetKind = 'package' | 'workspace-module' | 'app';

interface ArchiveReference {
  uri: string;
  integrity: IntegrityDeclaration;
  size: number;
}

interface IntegrityDeclaration {
  algorithm: string;
  digest: string;
}

interface PublishingMetadata {
  changelog?: string;
  documentation?: string;
  screenshots?: string[];
  category?: string;
  tags?: string[];
}
```

### 2.2 PublishingResult

```typescript
interface PublishingResult {
  requestId: string;
  assetId: string;
  version: string;
  status: PublishingStatus;
  publishedAt?: timestamp;
  rejection?: RejectionReason;
  issues: PublishingIssue[];
}

type PublishingStatus = 'pending' | 'approved' | 'rejected' | 'published' | 'removed';

interface RejectionReason {
  code: string;
  message: string;
  details?: string;
}

interface PublishingIssue {
  type: IssueType;
  severity: IssueSeverity;
  message: string;
  details?: string;
}

type IssueType = 
  | 'manifest-invalid'
  | 'signature-invalid'
  | 'integrity-mismatch'
  | 'dependency-missing'
  | 'permission-excessive'
  | 'vulnerability-found'
  | 'license-violation'
  | 'naming-violation'
  | 'category-missing';

type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';
```

### 2.3 PublishingPipeline

```typescript
interface PublishingPipeline {
  pipelineId: string;
  requestId: string;
  stages: PublishingStage[];
  startedAt: timestamp;
  completedAt?: timestamp;
  result: PublishingResult;
}

interface PublishingStage {
  stageId: string;
  name: string;
  status: StageStatus;
  startedAt: timestamp;
  completedAt?: timestamp;
  issues: PublishingIssue[];
}

type StageStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
```

### 2.4 AssetRecord

```typescript
interface AssetRecord {
  assetId: string;
  id: string;
  name: string;
  kind: AssetKind;
  publisherId: string;
  versions: AssetVersion[];
  currentVersion: string;
  status: AssetStatus;
  publishedAt: timestamp;
  updatedAt: timestamp;
}

type AssetStatus = 'active' | 'deprecated' | 'removed';

interface AssetVersion {
  version: string;
  status: VersionStatus;
  integrity: IntegrityDeclaration;
  publishedAt: timestamp;
  changelog?: string;
}

type VersionStatus = 'active' | 'deprecated' | 'removed';
```

---

## 3. Publishing Pipeline

### 3.1 Standard Pipeline

```text
Submission
    ↓
Manifest Validation
    ↓
Signature Verification
    ↓
Integrity Verification
    ↓
Dependency Check
    ↓
Permission Review
    ↓
Vulnerability Scan
    ↓
License Compliance
    ↓
Category Assignment
    ↓
Approval
    ↓
Publication
    ↓
Indexing
    ↓
Distribution
```

### 3.2 Pipeline Stages

```typescript
const PUBLISHING_STAGES = [
  'manifest-validation',
  'signature-verification',
  'integrity-verification',
  'dependency-check',
  'permission-review',
  'vulnerability-scan',
  'license-compliance',
  'category-assignment',
  'approval',
  'publication',
  'indexing',
  'distribution'
];
```

### 3.3 Stage Execution

Each stage:
- Validates specific aspect
- Records issues
- Passes or fails
- May be skipped for trusted publishers

---

## 4. Version Management

### 4.1 Semantic Versioning

```text
Major.Minor.Patch

Major: Breaking changes
Minor: New features (backward compatible)
Patch: Bug fixes (backward compatible)
```

### 4.2 Version Lifecycle

```text
Active
    ↓
Deprecated (with successor)
    ↓
Removed (after deprecation period)
```

### 4.3 Version Compatibility

```text
Asset Version → Platform Version Range
    ↓
Compatibility Check
    ↓
Compatible: allow installation
    ↓
Incompatible: block installation
```

---

## 5. Distribution

### 5.1 Distribution Channels

```text
Marketplace Registry
    ↓
CLI Installation
    ↓
API Installation
    ↓
UI Installation
```

### 5.2 Distribution Rules

```text
Active Version
    → Available for installation

Deprecated Version
    → Available with warning

Removed Version
    → Not available
```

### 5.3 Distribution Events

```text
Asset Published
    → Indexed in registry
    → Available for installation
    → Events emitted

Asset Updated
    → New version indexed
    → Update notification sent

Asset Removed
    → Version marked removed
    → Installation blocked
```

---

## 6. Relationships

### 6.1 Entity Relationships

```
PublishingRequest 1──1 AssetSubmission
PublishingRequest 1──1 PublishingResult
PublishingRequest 1──1 PublishingPipeline

PublishingPipeline 1──* PublishingStage
PublishingPipeline 1──1 PublishingResult

AssetRecord 1──* AssetVersion
AssetRecord 1──1 PublishingResult
```

### 6.2 Dependency Graph

```
Publisher
    └── submits: PublishingRequest

Marketplace Registry
    ├── processes: PublishingPipeline
    ├── records: AssetRecord
    └── distributes: AssetVersion
```

---

## 7. Runtime Ownership

### 7.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| PublishingRequest | MarketplaceRegistry | Request management |
| PublishingResult | MarketplaceRegistry | Result management |
| PublishingPipeline | MarketplaceRegistry | Pipeline management |
| AssetRecord | MarketplaceRegistry | Asset management |
| AssetVersion | MarketplaceRegistry | Version management |

### 7.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Pipeline Execution**: Pipeline is executed atomically
3. **Validation Required**: All submissions must be validated
4. **Approval Required**: All publications require approval
5. **Audit Trail**: All operations are audited

---

## 8. Events

### 8.1 Publishing Events

| Event | Payload | Trigger |
|-------|---------|---------|
| PublishingRequested | PublishingRequest | Submission |
| PublishingApproved | PublishingResult | Approval |
| PublishingRejected | PublishingResult, RejectionReason | Rejection |
| PublishingPublished | PublishingResult | Publication |
| PublishingRemoved | PublishingResult, Reason | Removal |

### 8.2 Pipeline Events

| Event | Payload | Trigger |
|-------|---------|---------|
| PipelineStarted | PublishingPipeline | Pipeline start |
| PipelineStageCompleted | PublishingStage | Stage completion |
| PipelineStageFailed | PublishingStage, Failure | Stage failure |
| PipelineCompleted | PublishingPipeline, Result | Pipeline completion |

### 8.3 Version Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VersionPublished | AssetVersion | Publication |
| VersionDeprecated | AssetVersion, Successor | Deprecation |
| VersionRemoved | AssetVersion, Reason | Removal |

---

## 9. Verification Requirements

### 9.1 Publishing Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | Manifest is valid |
| Signature Verification | Signature is valid |
| Integrity Verification | Integrity is valid |
| Dependency Check | Dependencies are met |
| Permission Review | Permissions are appropriate |
| Vulnerability Scan | No critical vulnerabilities |
| License Compliance | License is compliant |

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Marketplace Registry | Distribution | Registry API |
| Security Service | Trust verification | Security API |
| Signature Service | Signature verification | Signature API |
| Vulnerability Service | Vulnerability scanning | Vulnerability API |
| License Service | License compliance | License API |
| Extension Runtime | Installation | Runtime API |

---

## 11. Open Questions

1. How should automated publishing work?
2. How should publishing pipelines be customized?
3. How should publishing performance be optimized?
4. How should publishing be audited?
5. How should publishing disputes be resolved?

---

*This document defines the canonical Publishing for Vestara.*
*Making extensions available through the Marketplace.*
