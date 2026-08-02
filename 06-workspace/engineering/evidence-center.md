---
id: "evidence-center"
title: "Evidence Center — First-Class Evidence Entity"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui, verification-center)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "evidence", "verification", "provenance"]
---

# Evidence Center

## First-Class Evidence Entity

> **Evidence is not embedded inside execution cards. Every evidence item has identity, provenance, claims, verification status, and retention policy.**

---

## 1. Evidence Entity Contract

```typescript
interface EvidenceRecord {
  id: string;
  type: EvidenceType;
  
  // Provenance
  subjectId: string;
  sessionId: string;
  executionId?: string;
  producedBy: string;
  capturedAt: string;
  source: string;
  
  // Claims
  claimIds: string[];
  
  // Status
  status: EvidenceStatus;
  
  // Integrity
  integrity?: {
    hash: string;
    algorithm: string;
  };
  
  // Retention
  retention?: {
    policy: RetentionPolicy;
    expiresAt?: string;
  };
}
```

### 1.1 Evidence Types

| Type | Description | Producer |
|------|-------------|----------|
| `test` | Test execution results | Test runner |
| `build` | Build output and status | Build system |
| `terminal` | Terminal command output | Terminal tool |
| `screenshot` | Visual capture | Browser tool |
| `visual-comparison` | Before/after comparison | Visual verification |
| `browser` | Browser automation output | Browser tool |
| `filesystem` | File system changes | File operations |
| `telemetry` | System metrics | Runtime |
| `log` | Application logs | Logger |
| `review` | Human review observation | Human |
| `manual-observation` | Manual note or observation | Human or agent |

### 1.2 Evidence Status

| Status | Description |
|--------|-------------|
| `captured` | Evidence has been captured |
| `validated` | Evidence has been validated |
| `rejected` | Evidence has been rejected |
| `expired` | Evidence has exceeded retention |

---

## 2. Evidence Properties

### 2.1 Provenance

```typescript
interface EvidenceProvenance {
  producer: string;        // Agent or process that created this
  subject: string;         // What this evidence is about
  timestamp: string;       // When this was created
  source: string;          // Where this evidence came from
  executionId?: string;    // Execution that produced this
  sessionId: string;       // Session this belongs to
}
```

### 2.2 Claims

```typescript
interface EvidenceClaim {
  id: string;
  evidenceId: string;
  type: ClaimType;
  assertion: string;
  confidence: number;
  supportingEvidence: string[];
  contradictingEvidence: string[];
}

type ClaimType = 
  | 'correctness'      // Code is correct
  | 'completeness'     // Task is complete
  | 'quality'          // Code meets quality standards
  | 'performance'      // Performance meets requirements
  | 'security'         // Security requirements met
  | 'functionality';   // Feature works as expected
```

### 2.3 Integrity

```typescript
interface EvidenceIntegrity {
  hash: string;
  algorithm: 'sha256' | 'sha512';
  verifiedAt?: string;
  verifiedBy?: string;
}
```

### 2.4 Retention

```typescript
interface RetentionPolicy {
  type: RetentionType;
  duration?: number;      // Days to retain
  expiresAt?: string;     // Absolute expiration
}

type RetentionType = 
  | 'session'            // Retain for session duration
  | 'permanent'          // Retain indefinitely
  | 'temporary'          // Retain for specified duration
  | 'regulatory';        // Retain for regulatory compliance
```

---

## 3. Evidence-to-Claim Relationships

### 3.1 Relationship Model

```
EvidenceRecord
    │
    ├── supports → Claim[]
    ├── contradicts → Claim[]
    ├── relatesTo → EvidenceRecord[]
    └── producedBy → Agent | Process | Human
```

### 3.2 Evidence Confidence

```typescript
interface EvidenceConfidence {
  evidenceId: string;
  overallConfidence: number;
  factors: ConfidenceFactor[];
}

interface ConfidenceFactor {
  type: 'source-reliability' | 'freshness' | 'corroboration' | 'integrity';
  score: number;
  weight: number;
}
```

---

## 4. Evidence Navigation

### 4.1 Evidence List View

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CENTER                              [Filter] [Search]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Session: engineer-session-001                                  │
│  Total Evidence: 24                                             │
│  Validated: 18 | Pending: 4 | Rejected: 2                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● test-result-001                        [Validated]    │   │
│  │   Type: test | Source: vitest                          │   │
│  │   Captured: 01:42:15 | Producer: agent-executor-01    │   │
│  │   Claims: correctness, completeness                   │   │
│  │   Confidence: 95%                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● screenshot-001                         [Pending]      │   │
│  │   Type: screenshot | Source: playwright                │   │
│  │   Captured: 01:42:20 | Producer: agent-executor-01    │   │
│  │   Claims: functionality                               │   │
│  │   Confidence: pending validation                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✗ build-log-001                         [Rejected]      │   │
│  │   Type: build | Source: tsc                            │   │
│  │   Captured: 01:41:50 | Producer: build-system         │   │
│  │   Claims: completeness                                │   │
│  │   Confidence: 0% (build failed)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Evidence Detail Inspector

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE: test-result-001                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Identity                                                      │
│  ├── ID: test-result-001                                       │
│  ├── Type: test                                                │
│  ├── Status: Validated                                         │
│  └── Session: engineer-session-001                             │
│                                                                 │
│  Provenance                                                    │
│  ├── Producer: agent-executor-01                               │
│  ├── Source: vitest                                            │
│  ├── Captured: 01:42:15                                        │
│  └── Execution: execution-001                                  │
│                                                                 │
│  Claims                                                        │
│  ├── Correctness: All tests pass (confidence: 95%)            │
│  └── Completeness: 12/12 tests executed (confidence: 100%)   │
│                                                                 │
│  Integrity                                                     │
│  ├── Hash: sha256:abc123...                                    │
│  └── Verified: 01:42:16                                        │
│                                                                 │
│  Retention                                                     │
│  ├── Policy: permanent                                         │
│  └── Expires: never                                            │
│                                                                 │
│  Relationships                                                 │
│  ├── Supports: session-001 verification                       │
│  ├── Related: screenshot-001                                   │
│  └── Produced by: execution-001                                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Actions:                                                      │
│  [View Raw] [Download] [Compare] [Request Re-verification]    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Conflicting Evidence

### 5.1 Conflict Detection

```typescript
interface EvidenceConflict {
  id: string;
  evidenceA: string;
  evidenceB: string;
  type: ConflictType;
  description: string;
  resolution?: ConflictResolution;
}

type ConflictType = 
  | 'contradiction'     // Evidence asserts opposite claims
  | 'temporal'          // Evidence timestamps conflict
  | 'source'            // Evidence from same source conflicts
  | 'integrity';        // Evidence integrity check failed

interface ConflictResolution {
  type: 'manual' | 'automatic' | 'superseded';
  resolvedBy: string;
  resolvedAt: string;
  winningEvidence: string;
  reason: string;
}
```

### 5.2 Conflict Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠ EVIDENCE CONFLICT DETECTED                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Conflict: test-result-001 vs screenshot-001                   │
│  Type: Contradiction                                           │
│                                                                 │
│  test-result-001 claims:                                       │
│  └── Functionality: Feature works correctly                    │
│                                                                 │
│  screenshot-001 claims:                                        │
│  └── Functionality: UI element not visible                     │
│                                                                 │
│  Resolution Required:                                          │
│  [Investigate] [Reject Evidence] [Request Manual Review]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Evidence Freshness

### 6.1 Freshness Indicators

| Age | Indicator | Color |
|-----|-----------|-------|
| < 5 minutes | Fresh | Green |
| 5-30 minutes | Recent | Yellow |
| 30-60 minutes | Aging | Orange |
| > 60 minutes | Stale | Red |

### 6.2 Freshness Rules

```typescript
interface FreshnessRule {
  evidenceType: EvidenceType;
  maxAge: number;        // milliseconds
  refreshOn?: string[];  // Events that refresh freshness
}
```

---

## 7. Evidence Retention

### 7.1 Retention Policies

| Policy | Duration | Use Case |
|--------|----------|----------|
| Session | Session duration | Temporary evidence |
| Permanent | Indefinite | Critical evidence |
| Temporary | 30 days | Non-critical evidence |
| Regulatory | 1 year | Compliance evidence |

### 7.2 Retention Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  RETENTION STATUS                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Total Evidence: 24                                             │
│  ├── Permanent: 12                                              │
│  ├── Session: 8                                                 │
│  ├── Temporary: 3 (expires in 28 days)                        │
│  └── Regulatory: 1 (expires in 364 days)                      │
│                                                                 │
│  Storage Used: 2.4 MB                                           │
│  Estimated Growth: 0.5 MB/session                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Human Observations

### 8.1 Manual Evidence Capture

```typescript
interface ManualObservation {
  id: string;
  type: 'note' | 'screenshot' | 'recording';
  content: string;
  attachments: Attachment[];
  capturedBy: string;
  capturedAt: string;
  sessionId: string;
  tags: string[];
}
```

### 8.2 Observation Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  ADD OBSERVATION                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Type: [Note ▼]                                                │
│                                                                 │
│  Content:                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Attachments: [Choose Files]                                   │
│                                                                 │
│  Tags: [ui] [bug] [critical]                                  │
│                                                                 │
│  [Save Observation]                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Implementation Notes

### 9.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Evidence Collection | Partial | Basic evidence captured |
| Evidence Provenance | Partial | Producer tracking exists |
| Evidence Claims | Proposed | Not yet implemented |
| Evidence Integrity | Proposed | Hash verification pending |
| Evidence Conflicts | Proposed | Not yet implemented |
| Evidence Retention | Proposed | Not yet implemented |
| Manual Observations | Partial | Basic notes exist |

### 9.2 Open Questions

1. Should evidence be stored in the event store or separately?
2. How should large evidence items (screenshots, recordings) be handled?
3. Should evidence be encrypted at rest?
4. How should evidence be shared between sessions?

---

*This document defines the first-class evidence entity for the Vestara Workspace.*
*Every evidence item has identity, provenance, claims, and verification status.*
