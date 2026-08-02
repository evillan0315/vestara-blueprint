---
id: "agent-center"
title: "Agent Center — Agent Management and Assignment"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui, agent-runtime)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "agents", "management", "assignment"]
---

# Agent Center

## Agent Management and Assignment

> **The Agent Center provides visibility into agent status, capabilities, assignments, and collaboration. It is the control surface for managing AI agents within engineering sessions.**

---

## 1. Agent Center Projection

> **All contracts in this document are Workspace read projections, not domain contracts. They project runtime state into the UI without redefining `AgentRuntime`.**

```typescript
// Workspace read model — not a domain contract
interface AgentCenterProjection {
  agent: AgentIdentity;
  runtimeState: AgentRuntimeState;
  activeAssignment?: AgentAssignmentSummary;
  capabilitySummary: CapabilityProjection[];
  performance?: AgentPerformanceProjection;
  recentEvents: EngineeringEventReference[];
}

interface AgentIdentity {
  id: string;
  name: string;
  type: AgentType;
  agentType: 'workspace' | 'registry';
}

interface AgentRuntimeState {
  status: AgentStatus;
  currentSession?: string;
  currentExecution?: string;
  provider: string;
  model: string;
}

type AgentStatus = 
  | 'idle'
  | 'busy'
  | 'paused'
  | 'error'
  | 'offline';

// Capability levels (not numerical confidence)
type CapabilityLevel = 
  | 'primary'        // Main capability, frequently used
  | 'secondary'      // Supporting capability, used occasionally
  | 'declared'       // Advertised but not yet demonstrated
  | 'observed'       // Demonstrated in past executions
  | 'verified'       // Validated through evidence
  | 'insufficient';  // Not enough data to assess

interface CapabilityProjection {
  id: string;
  name: string;
  description: string;
  level: CapabilityLevel;
  evidenceCount: number;
  lastUsed?: string;
}

interface AgentPerformanceProjection {
  totalExecutions: number;
  successRate: number;
  averageDuration: number;
  lastActive: string;
}

interface AgentAssignmentSummary {
  sessionId: string;
  executionId?: string;
  task: string;
  startedAt: string;
}

interface EngineeringEventReference {
  eventId: string;
  timestamp: string;
  type: string;
}
```

---

## 2. Agent Types

### 2.1 Built-in Agents

| Agent | Role | Capabilities |
|-------|------|--------------|
| architect | Planning and architecture | Planning, design, review |
| developer | Code implementation | Coding, testing, debugging |
| verifier | Verification and testing | Testing, verification, evidence |
| reviewer | Code review | Review, feedback, approval |
| debugger | Debugging and diagnosis | Diagnosis, debugging, fix |
| planner | Task planning | Planning, estimation, scheduling |
| researcher | Research and analysis | Research, analysis, documentation |
| documenter | Documentation | Documentation, writing, editing |
| tester | Testing | Testing, test generation, coverage |
| optimizer | Performance optimization | Performance, optimization, profiling |
| security | Security review | Security, audit, vulnerability |
| devops | DevOps and deployment | Deployment, infrastructure, CI/CD |

### 2.2 Custom Agents

```typescript
// Workspace read model — not a domain contract
interface CustomAgentProjection extends AgentCenterProjection {
  agentType: 'workspace' | 'registry';
  source: string;
  version?: string;
  configuration: Record<string, unknown>;
}
```

---

## 3. Agent Views

### 3.1 Agent List View

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT CENTER                                    [Filter] [Search]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Total Agents: 12                                              │
│  Active: 2 | Idle: 8 | Error: 1 | Offline: 1                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● developer-01                         [Busy]           │   │
│  │   Type: workspace | Provider: selected provider        │   │
│  │   Session: session-001 | Execution: execution-001      │   │
│  │   Task: Edit runtime.ts                                 │   │
│  │   Success Rate: 95% | Avg Duration: 2m 30s             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● architect-01                         [Idle]           │   │
│  │   Type: workspace | Provider: selected provider        │   │
│  │   Session: - | Execution: -                            │   │
│  │   Capabilities: Planning, Design, Review               │   │
│  │   Success Rate: 98% | Avg Duration: 1m 45s             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✗ debugger-01                          [Error]          │   │
│  │   Type: workspace | Provider: selected provider        │   │
│  │   Session: session-002 | Error: Provider timeout       │   │
│  │   Success Rate: 85% | Avg Duration: 3m 15s             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Agent Detail Inspector

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT: developer-01                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Identity                                                      │
│  ├── ID: developer-01                                          │
│  ├── Type: workspace                                           │
│  ├── Provider: selected provider                               │
│  └── Model: resolved routing assignment                         │
│                                                                 │
│  Capabilities                                                  │
│  ├── Coding (primary)                                          │
│  ├── Testing (primary)                                         │
│  ├── Debugging (secondary)                                     │
│  └── Review (secondary)                                        │
│                                                                 │
│  Current State                                                 │
│  ├── Status: Busy                                              │
│  ├── Session: session-001                                      │
│  ├── Execution: execution-001                                  │
│  └── Task: Edit runtime.ts                                     │
│                                                                 │
│  Metrics                                                       │
│  ├── Total Executions: 45                                      │
│  ├── Success Rate: 95%                                         │
│  ├── Average Duration: 2m 30s                                  │
│  └── Last Active: 01:42:10                                     │
│                                                                 │
│  History                                                       │
│  ├── 01:42:10 - Started execution (session-001)               │
│  ├── 01:41:50 - Completed execution (session-001)             │
│  ├── 01:41:30 - Started execution (session-002)               │
│  └── 01:41:15 - Completed execution (session-002)             │
│                                                                 │
│  Actions:                                                      │
│  [Pause] [Redirect] [View Session] [View History]             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Agent Assignment

### 4.1 Assignment Contract

```typescript
interface AgentAssignment {
  id: string;
  agentId: string;
  sessionId: string;
  taskId: string;
  assignedAt: string;
  assignedBy: string;
  status: AssignmentStatus;
  responsibilities: string[];
}

type AssignmentStatus = 
  | 'assigned'
  | 'active'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'unassigned';
```

### 4.2 Assignment View

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT ASSIGNMENTS                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Session: session-001                                          │
│                                                                 │
│  Assigned Agents:                                              │
│  ├── developer-01 → Edit runtime.ts                           │
│  │   Status: Active | Started: 01:42:08                       │
│  │   Provider: selected provider | Model: resolved routing  │
│  │                                                             │
│  └── architect-01 → Review plan                               │
│      Status: Completed | Duration: 1m 30s                     │
│      Provider: openai/gpt-4 | Model: gpt-4                   │
│                                                                 │
│  Unassigned Tasks:                                             │
│  ├── Write tests for auth module                              │
│  └── Update documentation                                      │
│                                                                 │
│  Actions:                                                      │
│  [Assign Agent] [Reassign] [Add Agent]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Agent Collaboration

### 5.1 Collaboration Contract

```typescript
interface AgentCollaboration {
  id: string;
  agents: string[];
  session: string;
  type: CollaborationType;
  status: CollaborationStatus;
  messages: CollaborationMessage[];
}

type CollaborationType = 
  | 'handoff'
  | 'review'
  | 'delegation'
  | 'discussion';

type CollaborationStatus = 
  | 'active'
  | 'completed'
  | 'failed';
```

### 5.2 Collaboration View

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT COLLABORATION                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Session: session-001                                          │
│  Type: Handoff                                                 │
│  Status: Active                                                │
│                                                                 │
│  Participants:                                                 │
│  ├── developer-01 (sender)                                    │
│  └── reviewer-01 (receiver)                                   │
│                                                                 │
│  Messages:                                                     │
│  ├── 01:42:20 - developer-01: "Code changes complete,        │
│  │   ready for review"                                         │
│  ├── 01:42:25 - reviewer-01: "Reviewing changes..."          │
│  └── 01:42:30 - reviewer-01: "Approved with minor suggestions"│
│                                                                 │
│  Actions:                                                      │
│  [View Messages] [View Artifacts] [Complete Collaboration]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Agent Capabilities

### 6.1 Capability Contract

> **Workspace read model — not a domain contract.**

```typescript
interface AgentCapabilityProjection {
  id: string;
  name: string;
  description: string;
  level: CapabilityLevel;
  evidenceCount: number;
  lastUsed?: string;
  requirements: string[];
  limitations: string[];
}

// Capability levels (not numerical confidence)
type CapabilityLevel = 
  | 'primary'        // Main capability, frequently used
  | 'secondary'      // Supporting capability, used occasionally
  | 'declared'       // Advertised but not yet demonstrated
  | 'observed'       // Demonstrated in past executions
  | 'verified'       // Validated through evidence
  | 'insufficient';  // Not enough data to assess
```

### 6.2 Capability Matrix

| Capability | architect | developer | verifier | reviewer | debugger |
|------------|-----------|-----------|----------|----------|----------|
| Planning | primary | secondary | secondary | secondary | secondary |
| Coding | secondary | primary | secondary | secondary | secondary |
| Testing | secondary | primary | primary | secondary | secondary |
| Review | primary | secondary | secondary | primary | secondary |
| Debugging | secondary | primary | secondary | secondary | primary |
| Documentation | primary | secondary | secondary | primary | secondary |
| Security | secondary | secondary | primary | primary | secondary |
| Performance | secondary | primary | primary | secondary | primary |

---

## 7. Implementation Notes

### 7.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Agent List | Implemented | Agent listing exists |
| Agent Detail | Partial | Basic detail view exists |
| Agent Assignment | Implemented | Assignment exists |
| Agent Collaboration | Partial | Basic collaboration exists |
| Agent Metrics | Partial | Basic metrics exist |
| Agent History | Partial | Basic history exists |
| Agent Capabilities | Partial | Basic capabilities exist |

### 7.2 Open Questions

1. How should agent capabilities be discovered?
2. Should agents be shareable across workspaces?
3. How should agent performance be measured?
4. Should agent configurations be versioned?

---

*This document defines the Agent Center for the Vestara Workspace.*
*It provides visibility into agent status, capabilities, assignments, and collaboration.*
