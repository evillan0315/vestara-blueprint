---
id: "trust-and-signing"
title: "Trust and Signing — Extension Security Model"
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
author: ["@chief-architect", "@security-engineer"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: []
tags: ["marketplace", "extension", "trust", "signing", "security", "canonical"]
---

# Trust and Signing

## Extension Security Model

> **Trust is earned, never assumed. Every participant starts with limited authority. Authority grows through demonstrated capability.**

---

## 1. Architectural Position

```
ExtensionManifest
    ↓
Signature Declaration
    ↓
Trust Verification
    ↓
Trust Level Assignment
    ↓
Execution Boundary
```

Trust levels determine execution boundaries. Higher trust permits more permissive execution.

---

## 2. Canonical Entities

### 2.1 TrustRecord

```typescript
interface TrustRecord {
  trustId: string;
  assetId: string;
  publisherId: string;
  trustLevel: TrustLevel;
  verificationResult: TrustVerificationResult;
  grantedAt: timestamp;
  expiresAt?: timestamp;
  revokedAt?: timestamp;
  reason?: string;
}

type TrustLevel = 'first-party' | 'verified' | 'community' | 'untrusted';
```

### 2.2 TrustVerificationResult

```typescript
interface TrustVerificationResult {
  signatureValid: boolean;
  publisherVerified: boolean;
  integrityValid: boolean;
  permissionsReviewed: boolean;
  vulnerabilitiesChecked: boolean;
  issues: TrustIssue[];
}

interface TrustIssue {
  type: IssueType;
  severity: IssueSeverity;
  message: string;
  details?: string;
}

type IssueType = 
  | 'signature-invalid'
  | 'publisher-unverified'
  | 'integrity-mismatch'
  | 'permissions-excessive'
  | 'vulnerability-found'
  | 'license-violation'
  | 'malware-detected';

type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';
```

### 2.3 SignatureRecord

```typescript
interface SignatureRecord {
  signatureId: string;
  assetId: string;
  version: string;
  algorithm: string;
  keyId: string;
  signature: string;
  signedAt: timestamp;
  verifiedAt?: timestamp;
  valid?: boolean;
}
```

### 2.4 PublisherRecord

```typescript
interface PublisherRecord {
  publisherId: string;
  name: string;
  verified: boolean;
  verificationDate?: timestamp;
  trustLevel: TrustLevel;
  assets: string[];
  reputation: PublisherReputation;
}

interface PublisherReputation {
  totalAssets: number;
  verifiedAssets: number;
  averageRating: number;
  downloads: number;
  issues: number;
}
```

---

## 3. Trust Levels

### 3.1 First-Party

```text
Vestara core packages
    → in-process may be permitted
    → full system access
    → no isolation required
```

### 3.2 Verified

```text
Signed by verified publisher
    → in-process with approval
    → limited system access
    → basic isolation recommended
```

### 3.3 Community

```text
Unsigned third-party
    → process isolation required
    → minimal system access
    → strict isolation required
```

### 3.4 Untrusted

```text
Unknown source
    → blocked
    → no execution permitted
    → quarantine for analysis
```

---

## 4. Signature Verification

### 4.1 Signature Algorithm

```text
Ed25519
    → recommended for new signatures
    → fast and secure

RSA-SHA256
    → legacy support
    → widely supported

ECDSA-SHA256
    → alternative
    → good performance
```

### 4.2 Signature Process

```text
Publisher
    ↓
Sign asset with private key
    ↓
Include signature in manifest
    ↓
Distribute asset
    ↓
Extension Runtime
    ↓
Verify signature with public key
    ↓
Record verification result
```

### 4.3 Key Management

```text
Key Generation
    ↓
Key Storage (secure)
    ↓
Key Distribution (trusted channels)
    ↓
Key Rotation (periodic)
    ↓
Key Revocation (if compromised)
```

---

## 5. Permission Model

### 5.1 Package Permissions

```text
provider.register
agent.capability.register
verification.rule.register
theme.register
network.access
credentials.read
filesystem.read
```

### 5.2 Workspace Module Permissions

```text
workspace.navigation.contribute
workspace.command.contribute
workspace.search.contribute
workspace.inspector.contribute
workspace.route.contribute
workspace.docking.use
notifications.publish
```

### 5.3 App Permissions

```text
process.spawn
network.listen
filesystem.workspace.read
filesystem.workspace.write
credentials.read
service.register
background.run
container.run
```

### 5.4 Permission Review UI

```text
Install GitHub 1.2.0

Type: Workspace Module
Scope: User
Enable in: vestara-ai-core

Dependencies:
  @vestara/git-runtime 1.0.3

Permissions:
  ✓ Network access to github.com
  ✓ Read GitHub credentials
  ✓ Add commands and navigation
  ? Publish notifications (optional)

Runtime:
  On-demand, in-process
  Publisher: Vestara, verified
  Signature: valid

[Cancel] [Install and Enable]
```

### 5.5 Permission Changes

Any update that adds permissions must require renewed approval.

---

## 6. Vulnerability Management

### 6.1 Vulnerability Scanning

```text
Asset Submitted
    ↓
Static Analysis
    ↓
Dependency Scanning
    ↓
Malware Detection
    ↓
License Compliance
    ↓
Vulnerability Report
```

### 6.2 Vulnerability Response

```text
Critical Vulnerability
    → Immediate quarantine
    → Notify all users
    → Force update

High Vulnerability
    → Mark as vulnerable
    → Notify users
    → Require update

Medium Vulnerability
    → Mark as vulnerable
    → Notify users
    → Recommend update

Low Vulnerability
    → Mark as vulnerable
    → Log for awareness
```

---

## 7. Relationships

### 7.1 Entity Relationships

```
TrustRecord 1──1 TrustVerificationResult
TrustRecord 1──1 PublisherRecord
SignatureRecord 1──1 TrustRecord
PublisherRecord 1──* TrustRecord
```

### 7.2 Dependency Graph

```
Extension Runtime
    ├── verifies: TrustRecord[]
    ├── validates: SignatureRecord[]
    └── manages: PublisherRecord[]

TrustRecord
    ├── belongsTo: ExtensionPackage
    ├── verifiedBy: SignatureRecord
    └── publishedBy: PublisherRecord
```

---

## 8. Runtime Ownership

### 8.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| TrustRecord | SecurityService | Trust management |
| TrustVerificationResult | SecurityService | Verification management |
| SignatureRecord | SecurityService | Signature management |
| PublisherRecord | MarketplaceRegistry | Publisher management |

### 8.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Trust Verification**: All assets must be verified
3. **Signature Validation**: All signatures must be validated
4. **Publisher Verification**: All publishers must be verified
5. **Vulnerability Scanning**: All assets must be scanned

---

## 9. Events

### 9.1 Trust Events

| Event | Payload | Trigger |
|-------|---------|---------|
| TrustGranted | TrustRecord | Trust grant |
| TrustRevoked | TrustRecord, Reason | Trust revocation |
| TrustExpired | TrustRecord | Trust expiration |
| TrustUpdated | TrustRecord, TrustLevel | Trust update |

### 9.2 Signature Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SignatureVerified | SignatureRecord, Result | Verification |
| SignatureInvalid | SignatureRecord, Failure | Invalid signature |
| SignatureRevoked | SignatureRecord, Reason | Key revocation |

### 9.3 Vulnerability Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VulnerabilityDetected | Vulnerability | Detection |
| VulnerabilityPatched | Vulnerability, Patch | Patch |
| AssetQuarantined | AssetReference, Reason | Quarantine |

---

## 10. Verification Requirements

### 10.1 Trust Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Signature Verification | Signature is valid |
| Publisher Verification | Publisher is verified |
| Integrity Verification | Integrity is valid |
| Permission Review | Permissions are reviewed |
| Vulnerability Scan | No critical vulnerabilities |
| License Compliance | License is compliant |

---

## 11. Integration Points

### 11.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Security Service | Trust management | Security API |
| Signature Service | Signature verification | Signature API |
| Publisher Service | Publisher verification | Publisher API |
| Vulnerability Service | Vulnerability scanning | Vulnerability API |
| License Service | License compliance | License API |
| Marketplace Registry | Trust metadata | Registry API |

---

## 12. Open Questions

1. How should trust propagation work?
2. How should trust delegation work?
3. How should trust revocation work?
4. How should trust recovery work?
5. How should trust be audited?

---

*This document defines the canonical Trust and Signing for Vestara.*
*Trust is earned, never assumed.*
