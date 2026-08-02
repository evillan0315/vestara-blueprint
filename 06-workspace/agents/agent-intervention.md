---
id: "agent-intervention"
title: "Agent Intervention — Governance Controls"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui, agent-harness)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "agents", "intervention", "governance"]
---

# Agent Intervention

## Governance Controls

> **The Workspace exposes intervention controls beyond simple permissions. Operators can pause, redirect, explain, verify, approve, rollback, and quarantine agent work.**

---

## 1. Intervention Contract

```typescript
interface InterventionAction {
  id: string;
  type: InterventionType;
  label: string;
  description: string;
  icon: string;
  availableIn: StageStatus[];
  requiresApproval: boolean;
  sideEffects: SideEffect[];
  reversible: boolean;
  handler: (context: InterventionContext) => Promise<InterventionResult>;
}

interface InterventionContext {
  sessionId: string;
  executionId: string;
  agentId: string;
  currentStage: string;
  hasSideEffects: boolean;
  approvalPolicy: ApprovalPolicy;
}

interface InterventionResult {
  success: boolean;
  message: string;
  newState?: SessionState;
  evidence?: EvidenceRecord;
}
```

---

## 2. Intervention Types

### 2.1 Pause Session

**Purpose:** Halt current execution while preserving state.

```typescript
interface PauseSessionIntervention {
  type: 'pause-session';
  description: 'Pause the current session execution';
  availableIn: ['executing'];
  requiresApproval: false;
  reversible: true;
  sideEffects: [];
}
```

**Behavior:**
- All active tool executions are suspended
- Agent state is preserved
- No new tools are started
- Session status changes to `paused`

---

### 2.2 Resume Session

**Purpose:** Continue paused execution.

```typescript
interface ResumeSessionIntervention {
  type: 'resume-session';
  description: 'Resume a paused session';
  availableIn: ['paused'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Suspended tool executions resume
- Session status changes to `executing`
- Agent continues from checkpoint

---

### 2.3 Cancel Session

**Purpose:** Stop execution permanently.

```typescript
interface CancelSessionIntervention {
  type: 'cancel-session';
  description: 'Cancel the current session';
  availableIn: ['executing', 'paused', 'verifying'];
  requiresApproval: true;
  reversible: false;
  sideEffects: ['file-changes', 'terminal-output'];
}
```

**Behavior:**
- All executions are stopped
- File changes are rolled back to last good state
- Terminal outputs are preserved as evidence
- Session status changes to `cancelled`

---

### 2.4 Pause Agent

**Purpose:** Pause a specific agent while others continue.

```typescript
interface PauseAgentIntervention {
  type: 'pause-agent';
  description: 'Pause a specific agent';
  availableIn: ['executing'];
  requiresApproval: false;
  reversible: true;
  sideEffects: [];
}
```

**Behavior:**
- Target agent's tools are suspended
- Other agents continue working
- Agent state is preserved
- Agent status changes to `paused`

---

### 2.5 Redirect Task

**Purpose:** Transfer task to a different agent.

```typescript
interface RedirectTaskIntervention {
  type: 'redirect-task';
  description: 'Redirect task to a different agent';
  availableIn: ['executing', 'paused'];
  requiresApproval: true;
  reversible: false;
  sideEffects: ['file-changes'];
}
```

**Behavior:**
- Current agent is paused
- Task is reassigned to new agent
- Context is transferred
- Original agent is released

---

### 2.6 Change Assignment

**Purpose:** Reassign tasks between agents.

```typescript
interface ChangeAssignmentIntervention {
  type: 'change-assignment';
  description: 'Reassign tasks between agents';
  availableIn: ['executing', 'paused'];
  requiresApproval: true;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Task graph is updated
- Agent assignments are changed
- Work is redistributed

---

### 2.7 Change Provider/Model

**Purpose:** Switch provider or model mid-execution.

```typescript
interface ChangeProviderModelIntervention {
  type: 'change-provider-model';
  description: 'Change provider or model';
  availableIn: ['executing'];
  requiresApproval: true;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Current execution is paused
- Provider/model is switched
- Execution resumes with new provider
- Quality may vary

---

### 2.8 Request Explanation

**Purpose:** Ask agent to explain its decision.

```typescript
interface RequestExplanationIntervention {
  type: 'request-explanation';
  description: 'Request explanation for a decision';
  availableIn: ['executing', 'verifying'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Agent pauses current work
- Agent provides explanation
- Explanation is recorded as evidence
- Execution continues

---

### 2.9 Request Evidence

**Purpose:** Ask agent to provide additional evidence.

```typescript
interface RequestEvidenceIntervention {
  type: 'request-evidence';
  description: 'Request additional evidence';
  availableIn: ['executing', 'verifying'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Agent pauses current work
- Agent captures additional evidence
- Evidence is added to session
- Execution continues

---

### 2.10 Require Re-verification

**Purpose:** Force re-verification of completed work.

```typescript
interface RequireReVerificationIntervention {
  type: 'require-re-verification';
  description: 'Require re-verification of completed work';
  availableIn: ['verifying'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Verification is reset
- Checks are re-run
- New evidence is collected
- Verification status updates

---

### 2.11 Reject Output

**Purpose:** Reject agent output and request changes.

```typescript
interface RejectOutputIntervention {
  type: 'reject-output';
  description: 'Reject output and request changes';
  availableIn: ['verifying'];
  requiresApproval: false;
  reversible: false;
  sideEffects: ['file-changes'];
}
```

**Behavior:**
- Output is marked as rejected
- Agent receives rejection reason
- Agent makes requested changes
- Verification restarts

---

### 2.12 Approve Operation

**Purpose:** Approve a gated operation.

```typescript
interface ApproveOperationIntervention {
  type: 'approve-operation';
  description: 'Approve a gated operation';
  availableIn: ['executing', 'verifying'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Operation is approved
- Execution continues
- Approval is recorded as evidence

---

### 2.13 Quarantine Artifact

**Purpose:** Isolate artifact for review.

```typescript
interface QuarantineArtifactIntervention {
  type: 'quarantine-artifact';
  description: 'Quarantine artifact for review';
  availableIn: ['executing', 'verifying'];
  requiresApproval: false;
  reversible: true;
  sideEffects: [];
}
```

**Behavior:**
- Artifact is marked as quarantined
- Artifact is excluded from deployment
- Review is required before release
- Artifact is isolated from other work

---

### 2.14 Rollback Change Set

**Purpose:** Revert file changes to previous state.

```typescript
interface RollbackChangeSetIntervention {
  type: 'rollback-change-set';
  description: 'Revert file changes to previous state';
  availableIn: ['executing', 'verifying', 'completed'];
  requiresApproval: true;
  reversible: false;
  sideEffects: ['file-changes'];
}
```

**Behavior:**
- File changes are reverted
- Git history is updated
- Session state is updated
- Evidence is captured

---

### 2.15 Open Affected Files

**Purpose:** Open files that were modified.

```typescript
interface OpenAffectedFilesIntervention {
  type: 'open-affected-files';
  description: 'Open files that were modified';
  availableIn: ['executing', 'verifying', 'completed'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- Modified files are opened in editor
- Changes are highlighted
- Diff view is available

---

### 2.16 Create Follow-up Task

**Purpose:** Create a new task for remaining work.

```typescript
interface CreateFollowUpTaskIntervention {
  type: 'create-follow-up-task';
  description: 'Create a follow-up task';
  availableIn: ['executing', 'verifying', 'completed'];
  requiresApproval: false;
  reversible: false;
  sideEffects: [];
}
```

**Behavior:**
- New task is created
- Task is linked to current session
- Task inherits context
- Task is added to queue

---

## 3. State-Dependent Availability

### 3.1 Availability Matrix

| Action | Created | Planning | Executing | Paused | Verifying | Completed |
|--------|---------|----------|-----------|--------|-----------|-----------|
| Pause Session | - | - | ✓ | - | ✓ | - |
| Resume Session | - | - | - | ✓ | - | - |
| Cancel Session | - | - | ✓ | ✓ | ✓ | - |
| Pause Agent | - | - | ✓ | - | - | - |
| Redirect Task | - | - | ✓ | ✓ | - | - |
| Change Assignment | - | - | ✓ | ✓ | - | - |
| Change Provider/Model | - | - | ✓ | - | - | - |
| Request Explanation | - | - | ✓ | - | ✓ | - |
| Request Evidence | - | - | ✓ | - | ✓ | - |
| Require Re-verification | - | - | - | - | ✓ | - |
| Reject Output | - | - | - | - | ✓ | - |
| Approve Operation | - | - | ✓ | - | ✓ | - |
| Quarantine Artifact | - | - | ✓ | - | ✓ | ✓ |
| Rollback Change Set | - | - | ✓ | - | ✓ | ✓ |
| Open Affected Files | - | - | ✓ | - | ✓ | ✓ |
| Create Follow-up Task | - | - | ✓ | - | ✓ | ✓ |

### 3.2 Side-Effect Rules

| Before Side Effects | After Side Effects |
|--------------------|--------------------|
| Reassignment may be automatic | Requires explicit approval |
| Provider/model change allowed | Requires approval + review |
| Cancel allowed with rollback | Requires approval |
| Redirect allowed | Requires approval |

---

## 4. Intervention UI

### 4.1 Intervention Panel

```
┌─────────────────────────────────────────────────────────────────┐
│  INTERVENTIONS                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Session: session-001                                           │
│  Agent: developer-01                                            │
│  Status: Executing                                             │
│  Duration: 2m 34s                                              │
│                                                                 │
│  Available Actions:                                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Pause Session]  [Redirect Task]  [Request Evidence]   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Quarantine Artifact]  [Rollback Changes]  [Cancel]    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Recent Interventions:                                          │
│  ├── 01:42:20 - Request Evidence (approved)                   │
│  ├── 01:41:50 - Pause Session (approved)                      │
│  └── 01:41:30 - Redirect Task (approved)                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Confirmation Dialog

```
┌─────────────────────────────────────────────────────────────────┐
│  CONFIRM INTERVENTION                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Action: Rollback Change Set                                   │
│  Session: session-001                                           │
│  Agent: developer-01                                            │
│                                                                 │
│  This will revert the following changes:                       │
│  ├── Modified: src/runtime.ts                                   │
│  └── Created: src/__tests__/test.ts                             │
│                                                                 │
│  Reason: [Enter reason for rollback...]                        │
│                                                                 │
│  [Cancel]  [Confirm Rollback]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Intervention Evidence

### 5.1 Evidence Capture

Every intervention produces evidence.

```typescript
interface InterventionEvidence {
  id: string;
  interventionType: InterventionType;
  sessionId: string;
  executionId: string;
  agentId: string;
  timestamp: string;
  actor: string;
  reason: string;
  result: InterventionResult;
  sideEffects: SideEffect[];
}
```

### 5.2 Evidence Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  INTERVENTION EVIDENCE                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ID: intervention-evidence-001                                 │
│  Type: Rollback Change Set                                     │
│  Session: session-001                                           │
│  Agent: developer-01                                            │
│  Actor: evillan0315                                             │
│  Timestamp: 01:42:30                                            │
│                                                                 │
│  Reason: Code changes introduced regression                    │
│                                                                 │
│  Result:                                                       │
│  ├── Files reverted: 2                                         │
│  ├── Evidence captured: rollback-evidence-001                 │
│  └── Session status: executing (resumed)                      │
│                                                                 │
│  Side Effects:                                                 │
│  ├── Reverted: src/runtime.ts                                  │
│  └── Reverted: src/__tests__/test.ts                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Implementation Notes

### 6.1 Current State

| Intervention | Status | Notes |
|-------------|--------|-------|
| Pause Session | Implemented | Pause/resume exists |
| Resume Session | Implemented | Pause/resume exists |
| Cancel Session | Implemented | Cancel exists |
| Pause Agent | Proposed | Not yet implemented |
| Redirect Task | Partial | Basic redirect exists |
| Change Assignment | Proposed | Not yet implemented |
| Change Provider/Model | Proposed | Not yet implemented |
| Request Explanation | Partial | Basic explanation exists |
| Request Evidence | Partial | Basic evidence request exists |
| Require Re-verification | Proposed | Not yet implemented |
| Reject Output | Proposed | Not yet implemented |
| Approve Operation | Implemented | Approval workflow exists |
| Quarantine Artifact | Proposed | Not yet implemented |
| Rollback Change Set | Partial | Basic rollback exists |
| Open Affected Files | Implemented | File opening exists |
| Create Follow-up Task | Proposed | Not yet implemented |

### 6.2 Open Questions

1. Should interventions be logged in the audit trail?
2. How should multiple simultaneous interventions be handled?
3. Should there be intervention rate limiting?
4. How should intervention conflicts be resolved?

---

*This document defines the agent intervention controls for the Vestara Workspace.*
*Operators can pause, redirect, explain, verify, approve, rollback, and quarantine agent work.*
