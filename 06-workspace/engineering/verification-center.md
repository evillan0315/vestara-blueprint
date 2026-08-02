---
id: "verification-center"
title: "Verification Center — Claims, Checks, Confidence"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "ratified"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "verification", "claims", "confidence"]
implementation-ref: "local main (workspace-ui, verification-center)"
---

# Verification Center

## Claims, Checks, Confidence

> **Verification sits between execution and evidence. It validates claims against checks, produces confidence scores, and determines completion eligibility.**

---

## 1. Verification Contract

```typescript
interface Verification {
  id: string;
  sessionId: string;
  executionId: string;
  
  // Claims
  claims: Claim[];
  
  // Checks
  checks: VerificationCheck[];
  profile: VerificationProfile;
  
  // Results
  results: VerificationResult[];
  score: number;
  confidence: ConfidenceScore;
  
  // Status
  status: VerificationStatus;
  
  // Evidence
  evidence: EvidenceRecord[];
  
  // History
  history: VerificationEvent[];
  
  // Eligibility
  completionEligible: boolean;
  blockingIssues: BlockingIssue[];
}
```

---

## 2. Claims

### 2.1 Claim Contract

```typescript
interface Claim {
  id: string;
  type: ClaimType;
  assertion: string;
  subject: string;
  confidence: number;
  supportingEvidence: string[];
  contradictingEvidence: string[];
  status: ClaimStatus;
}

type ClaimType = 
  | 'correctness'      // Code is correct
  | 'completeness'     // Task is complete
  | 'quality'          // Code meets quality standards
  | 'performance'      // Performance meets requirements
  | 'security'         // Security requirements met
  | 'functionality'    // Feature works as expected
  | 'accessibility'    // Accessibility requirements met
  | 'documentation';   // Documentation is complete

type ClaimStatus = 
  | 'proposed'
  | 'supported'
  | 'contradicted'
  | 'verified'
  | 'rejected';
```

### 2.2 Claim Examples

| Claim | Type | Assertion | Subject |
|-------|------|-----------|---------|
| C-001 | correctness | All tests pass | `src/runtime.ts` |
| C-002 | completeness | Feature implements requirements | `auth-module` |
| C-003 | quality | Code follows style guidelines | `src/api/` |
| C-004 | performance | Response time < 200ms | `GET /api/projects` |
| C-005 | security | No SQL injection vulnerabilities | `src/db/` |

---

## 3. Verification Checks

### 3.1 Check Contract

```typescript
interface VerificationCheck {
  id: string;
  type: CheckType;
  name: string;
  description: string;
  runner: string;
  command?: string;
  timeout?: number;
  retries?: number;
  required: boolean;
  gate: CheckGate;
}

type CheckType = 
  | 'typecheck'
  | 'build'
  | 'test'
  | 'lint'
  | 'security'
  | 'performance'
  | 'accessibility'
  | 'visual'
  | 'custom';

type CheckGate = 
  | 'blocking'      // Must pass to proceed
  | 'warning'       // Should pass, but not blocking
  | 'informational'; // For visibility only
```

### 3.2 Check Profiles

```typescript
interface VerificationProfile {
  id: string;
  name: string;
  description: string;
  checks: string[];
  requiredScore: number;
  autoVerify: boolean;
}
```

**Standard Profiles:**

| Profile | Checks | Required Score |
|---------|--------|----------------|
| `minimal` | typecheck, build | 80% |
| `standard` | typecheck, build, test, lint | 90% |
| `strict` | typecheck, build, test, lint, security | 95% |
| `comprehensive` | all checks | 100% |

---

## 4. Verification Results

### 4.1 Result Contract

```typescript
interface VerificationResult {
  checkId: string;
  status: CheckStatus;
  duration: number;
  output: string;
  errors: string[];
  warnings: string[];
  evidence: EvidenceRecord[];
  timestamp: string;
}

type CheckStatus = 
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'timeout'
  | 'error';
```

### 4.2 Result Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  VERIFICATION RESULTS                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Profile: standard                                             │
│  Score: 95% (19/20 checks passed)                              │
│  Status: ✓ Passed                                              │
│                                                                 │
│  Checks:                                                       │
│  ├── ✓ typecheck      passed    2.3s                          │
│  ├── ✓ build          passed    12.1s                         │
│  ├── ✓ test           passed    8.7s                          │
│  ├── ✗ lint           failed    1.2s                          │
│  │   └── Error: Unused variable 'temp' in runtime.ts:42      │
│  ├── ✓ security       passed    0.8s                          │
│  ├── ✓ performance    passed    3.4s                          │
│  ├── ✓ accessibility  passed    1.1s                          │
│  └── ✓ visual         passed    5.6s                          │
│                                                                 │
│  Blocking Issues:                                               │
│  └── Lint error must be fixed before completion                │
│                                                                 │
│  Actions:                                                      │
│  [Re-run Failed] [View Details] [Require Re-verification]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Confidence Score

### 5.1 Confidence Contract

```typescript
interface ConfidenceScore {
  overall: number;
  breakdown: ConfidenceBreakdown;
  factors: ConfidenceFactor[];
  trend: ConfidenceTrend;
}

interface ConfidenceBreakdown {
  correctness: number;
  completeness: number;
  quality: number;
  performance: number;
  security: number;
}

interface ConfidenceFactor {
  type: 'check-pass-rate' | 'evidence-quality' | 'claim-support' | 'history';
  score: number;
  weight: number;
  description: string;
}

type ConfidenceTrend = 'improving' | 'stable' | 'declining';
```

### 5.2 Confidence Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  CONFIDENCE SCORE                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Overall: 92%  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Trend: Improving ↑                                            │
│                                                                 │
│  Breakdown:                                                    │
│  ├── Correctness:   95%  ████████████████████░░░░░░░░░░░░░░  │
│  ├── Completeness:  88%  █████████████████░░░░░░░░░░░░░░░░░  │
│  ├── Quality:       90%  ██████████████████░░░░░░░░░░░░░░░░  │
│  ├── Performance:   94%  ████████████████████░░░░░░░░░░░░░░  │
│  └── Security:      96%  ████████████████████░░░░░░░░░░░░░░  │
│                                                                 │
│  Factors:                                                      │
│  ├── Check pass rate: 95% (weight: 40%)                       │
│  ├── Evidence quality: 88% (weight: 30%)                      │
│  ├── Claim support: 92% (weight: 20%)                         │
│  └── History: 90% (weight: 10%)                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Completion Eligibility

### 6.1 Eligibility Rules

```typescript
interface CompletionEligibility {
  eligible: boolean;
  requiredScore: number;
  currentScore: number;
  blockingIssues: BlockingIssue[];
  warnings: Warning[];
}

interface BlockingIssue {
  id: string;
  type: 'check-failure' | 'claim-contradicted' | 'evidence-missing' | 'approval-required';
  description: string;
  severity: 'blocking' | 'warning';
  resolution: string;
}
```

### 6.2 Eligibility Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  COMPLETION ELIGIBILITY                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Status: NOT ELIGIBLE                                          │
│                                                                 │
│  Required Score: 90%                                           │
│  Current Score: 92%  ✓                                         │
│                                                                 │
│  Blocking Issues:                                               │
│  ├── ✗ Lint error in runtime.ts:42                            │
│  │   Resolution: Fix unused variable                           │
│  └── ⚠ Missing test coverage for auth module                  │
│      Resolution: Add test coverage                             │
│                                                                 │
│  Warnings:                                                     │
│  └── ⚠ Performance test skipped                               │
│                                                                 │
│  Actions:                                                      │
│  [Fix Issues] [Request Override] [Cancel]                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Re-verification

### 7.1 Re-verification Contract

```typescript
interface ReVerification {
  id: string;
  originalVerificationId: string;
  reason: string;
  requestedBy: string;
  requestedAt: string;
  checks: string[];
  status: 'pending' | 'in-progress' | 'completed';
  results?: VerificationResult[];
}
```

### 7.2 Re-verification Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  RE-VERIFICATION REQUEST                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Original Verification: verification-001                       │
│  Reason: Agent made changes after initial verification         │
│                                                                 │
│  Checks to Re-run:                                             │
│  ├── [x] typecheck                                            │
│  ├── [x] build                                                │
│  ├── [x] test                                                 │
│  └── [ ] lint (skipped)                                       │
│                                                                 │
│  [Cancel]  [Start Re-verification]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Conflicting Evidence

### 8.1 Conflict Detection

```typescript
interface VerificationConflict {
  id: string;
  claimId: string;
  evidenceA: string;
  evidenceB: string;
  type: 'contradiction' | 'temporal' | 'source';
  description: string;
  resolution?: ConflictResolution;
}

interface ConflictResolution {
  type: 'manual' | 'automatic' | 'superseded';
  resolvedBy: string;
  resolvedAt: string;
  winningEvidence: string;
  reason: string;
}
```

### 8.2 Conflict Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠ VERIFICATION CONFLICT DETECTED                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Claim: C-001 (correctness)                                   │
│                                                                 │
│  Conflicting Evidence:                                         │
│  ├── Evidence A: test-result-001 (passed)                     │
│  └── Evidence B: test-result-002 (failed)                     │
│                                                                 │
│  Analysis:                                                     │
│  ├── Evidence A: Captured at 01:42:15                         │
│  └── Evidence B: Captured at 01:43:20 (newer)                 │
│                                                                 │
│  Resolution Required:                                          │
│  [Investigate] [Accept Newer] [Request Manual Review]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Verification History

### 9.1 History Contract

```typescript
interface VerificationEvent {
  id: string;
  type: VerificationEventType;
  timestamp: string;
  actor: string;
  data: Record<string, unknown>;
}

type VerificationEventType = 
  | 'verification.started'
  | 'check.started'
  | 'check.completed'
  | 'verification.completed'
  | 're-verification.requested'
  | 're-verification.completed'
  | 'conflict.detected'
  | 'conflict.resolved'
  | 'override.requested'
  | 'override.approved';
```

---

## 10. Implementation Notes

### 10.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Verification Pipeline | Implemented | Typecheck/build/test/lint runners exist |
| Claims | Partial | Claims exist via plan/goal |
| Checks | Implemented | Check runners exist |
| Profiles | Proposed | Not yet implemented |
| Results | Implemented | Result aggregation exists |
| Confidence | Proposed | Not yet implemented |
| Completion Eligibility | Partial | Basic gating exists |
| Re-verification | Proposed | Not yet implemented |
| Conflicting Evidence | Proposed | Not yet implemented |
| History | Partial | Basic history exists |

### 10.2 Open Questions

1. How should verification profiles be configured?
2. Should confidence scores be persisted in the event store?
3. How should verification conflicts be resolved automatically?
4. Should verification be re-run on every code change?

---

*This document defines the Verification Center for the Vestara Workspace.*
*It validates claims against checks, produces confidence scores, and determines completion eligibility.*
