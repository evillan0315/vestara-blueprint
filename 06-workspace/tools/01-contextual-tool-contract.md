---
id: "contextual-tool-contract"
title: "Contextual Tool Contract — Shared Tool Interface"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui, tools)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "tools", "contract", "context"]
---

# Contextual Tool Contract

## Shared Tool Interface

> **Every contextual tool—Chat, Terminal, Browser, Editor, Explorer—must obey this contract. Tools are governed instruments within an Engineering Session, not independent surfaces.**

---

## 1. Tool Workspace Context

> **Workspace read model — not a domain contract.**

```typescript
// Every tool receives this context when activated
interface ToolWorkspaceContext {
  workspaceId: string;
  repositoryId: string;
  sessionId?: string;
  planId?: string;
  taskId?: string;
  executionId?: string;
  selectedEntityIds: string[];
  permissionContext: EffectivePermissionProjection;
  routingContext?: EffectiveRoutingProjection;
}
```

### 1.1 Context Properties

| Property | Description |
|----------|-------------|
| `workspaceId` | Current workspace identifier |
| `repositoryId` | Current repository identifier |
| `sessionId` | Active engineering session (if any) |
| `planId` | Active plan (if any) |
| `taskId` | Active task (if any) |
| `executionId` | Active execution (if any) |
| `selectedEntityIds` | Currently selected entities in the UI |
| `permissionContext` | Effective permissions for this context |
| `routingContext` | Effective routing decisions (if any) |

---

## 2. Tool Action Contract

Every tool action must produce or reference:

```typescript
interface ToolAction {
  // Command or intent
  command: string;
  intent?: string;
  
  // Actor and origin
  actor: string;
  origin: ToolOrigin;
  
  // Session correlation
  sessionId?: string;
  executionId?: string;
  
  // Governance
  capabilityDecision?: string;
  approvalDecision?: ApprovalDecision;
  
  // Side effects
  sideEffects: SideEffect[];
  
  // Engineering records
  engineeringEvents: EngineeringEventReference[];
  artifacts: ArtifactReference[];
  evidence: EvidenceReference[];
  verificationResults?: VerificationResultReference[];
}

type ToolOrigin = 
  | 'workspace-ui'
  | 'vestara-cli'
  | 'agent'
  | 'api'
  | 'system'
  | 'automation';

interface ApprovalDecision {
  required: boolean;
  status: 'pending' | 'approved' | 'denied';
  approver?: string;
  reason?: string;
}

interface SideEffect {
  type: SideEffectType;
  target: string;
  description: string;
  reversible: boolean;
}

type SideEffectType = 
  | 'file-create'
  | 'file-modify'
  | 'file-delete'
  | 'terminal-command'
  | 'browser-action'
  | 'api-call'
  | 'database-write'
  | 'notification';
```

---

## 3. Tool Lifecycle

### 3.1 Lifecycle States

```
Idle
    ↓
Activated
    ↓
├── Executing
├── Waiting for Approval
├── Paused
└── Error
    ↓
Completed
    ↓
Idle
```

### 3.2 Lifecycle Transitions

| From | To | Trigger |
|------|----|---------|
| Idle | Activated | User or agent activates tool |
| Activated | Executing | Tool begins work |
| Executing | Waiting for Approval | Approval required |
| Waiting for Approval | Executing | Approval granted |
| Waiting for Approval | Idle | Approval denied |
| Executing | Paused | User pauses tool |
| Paused | Executing | User resumes tool |
| Executing | Error | Tool encounters error |
| Error | Idle | Error resolved or dismissed |
| Executing | Completed | Tool finishes work |
| Completed | Idle | Tool resets |

---

## 4. Tool Categories

### 4.1 Terminal

**Purpose:** Governed command execution within the session context.

| Property | Value |
|----------|-------|
| Side effects | Terminal commands, file changes |
| Approval required | Yes, for destructive commands |
| Evidence produced | Command output, exit codes |
| Engineering events | `tool.terminal.command`, `tool.terminal.output` |

### 4.2 Explorer

**Purpose:** Repository projection and file navigation.

| Property | Value |
|----------|-------|
| Side effects | None (read-only) |
| Approval required | No |
| Evidence produced | None |
| Engineering events | `tool.explorer.navigate` |

### 4.3 Browser

**Purpose:** Governed browser automation within the session context.

| Property | Value |
|----------|-------|
| Side effects | Browser actions, screenshots |
| Approval required | Yes, for external navigation |
| Evidence produced | Screenshots, visual comparisons |
| Engineering events | `tool.browser.action`, `tool.browser.screenshot` |

### 4.4 Editor

**Purpose:** File and artifact editing surface.

| Property | Value |
|----------|-------|
| Side effects | File modifications |
| Approval required | Yes, for files outside session scope |
| Evidence produced | Diffs, change sets |
| Engineering events | `tool.editor.modify`, `tool.editor.save` |

### 4.5 Chat

**Purpose:** Session conversation and agent interaction.

| Property | Value |
|----------|-------|
| Side effects | Messages, agent invocations |
| Approval required | No (conversation is always allowed) |
| Evidence produced | Conversation history |
| Engineering events | `tool.chat.message`, `tool.chat.agent-invocation` |

---

## 5. Permission Context

### 5.1 Permission Projection

> **Workspace read model — not a domain contract.**

```typescript
interface EffectivePermissionProjection {
  fileRead: PermissionLevel;
  fileWrite: PermissionLevel;
  fileDelete: PermissionLevel;
  terminalExecute: PermissionLevel;
  browserNavigate: PermissionLevel;
  agentInvoke: PermissionLevel;
  approvalRequired: boolean;
  scope: PermissionScope;
}

type PermissionLevel = 'allowed' | 'approval-required' | 'denied';

type PermissionScope = 
  | 'session'        // Within current session
  | 'repository'     // Within current repository
  | 'workspace'      // Within current workspace
  | 'global';        // Across all workspaces
```

---

## 6. Routing Context

### 6.1 Routing Projection

> **Workspace read model — not a domain contract.**

```typescript
interface EffectiveRoutingProjection {
  provider: string;
  model: string;
  routingProfile: string;
  capabilityGates: CapabilityGate[];
  costEstimate?: CostEstimate;
}

interface CapabilityGate {
  capability: string;
  required: boolean;
  status: 'passed' | 'failed' | 'pending';
}
```

---

## 7. Evidence Production

### 7.1 Evidence Requirements

Every tool action must produce evidence when:

| Condition | Evidence Required |
|-----------|-------------------|
| Side effects occurred | Diff, change set, command output |
| Approval was required | Approval record |
| Error occurred | Error log, stack trace |
| Verification passed | Verification result |
| Agent was involved | Agent activity record |

### 7.2 Evidence Format

```typescript
interface ToolEvidence {
  id: string;
  type: string;
  toolId: string;
  actionId: string;
  sessionId: string;
  timestamp: string;
  content: unknown;
  integrity?: {
    hash: string;
    algorithm: string;
  };
}
```

---

## 8. Implementation Notes

### 8.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Tool Context | Partial | Basic context exists |
| Tool Actions | Partial | Basic actions exist |
| Tool Lifecycle | Partial | Basic lifecycle exists |
| Permission Context | Implemented | Permissions exist |
| Routing Context | Implemented | Routing exists |
| Evidence Production | Partial | Basic evidence exists |

### 8.2 Open Questions

1. How should tool state be persisted across sessions?
2. Should tools be shareable between sessions?
3. How should tool conflicts be resolved?
4. Should tool performance be tracked?

---

*This document defines the shared contract for all contextual tools in the Vestara Workspace.*
*Tools are governed instruments within an Engineering Session.*
