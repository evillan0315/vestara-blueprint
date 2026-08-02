---
id: "agent-center"
title: "Agent Center — Agent Management and Assignment"
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
tags: ["workspace", "agents", "management", "assignment"]
implementation-ref: "local main (workspace-ui, agent-runtime)"
---

# Agent Center

## Agent Management and Assignment

> **The Agent Center provides visibility into agent status, capabilities, assignments, and collaboration. It is the control surface for managing AI agents within engineering sessions.**

---

## 1. Agent Contract

```typescript
interface Agent {
  id: string;
  name: string;
  type: AgentType;
  agentType: 'workspace' | 'registry';
  
  // Capabilities
  capabilities: AgentCapability[];
  specializations: string[];
  
  // State
  status: AgentStatus;
  currentSession?: string;
  currentExecution?: string;
  
  // Configuration
  provider: string;
  model: string;
  
  // Metrics
  metrics: AgentMetrics;
  
  // History
  history: AgentEvent[];
}

type AgentStatus = 
  | 'idle'
  | 'busy'
  | 'paused'
  | 'error'
  | 'offline';

interface AgentCapability {
  id: string;
  name: string;
  description: string;
  confidence: number;
}

interface AgentMetrics {
  totalExecutions: number;
  successRate: number;
  averageDuration: number;
  lastActive: string;
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
interface CustomAgent extends Agent {
  type: 'custom';
  source: 'workspace' | 'registry';
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
│  │   Type: workspace | Provider: openai/gpt-4             │   │
│  │   Session: session-001 | Execution: execution-001      │   │
│  │   Task: Edit runtime.ts                                 │   │
│  │   Success Rate: 95% | Avg Duration: 2m 30s             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ● architect-01                         [Idle]           │   │
│  │   Type: workspace | Provider: openai/gpt-4             │   │
│  │   Session: - | Execution: -                            │   │
│  │   Capabilities: Planning, Design, Review               │   │
│  │   Success Rate: 98% | Avg Duration: 1m 45s             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✗ debugger-01                          [Error]          │   │
│  │   Type: workspace | Provider: openai/gpt-4             │   │
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
│  ├── Provider: openai/gpt-4                                    │
│  └── Model: gpt-4                                              │
│                                                                 │
│  Capabilities                                                  │
│  ├── Coding (confidence: 95%)                                  │
│  ├── Testing (confidence: 90%)                                 │
│  ├── Debugging (confidence: 85%)                               │
│  └── Review (confidence: 80%)                                  │
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
│  │   Provider: openai/gpt-4 | Model: gpt-4                   │
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

```typescript
interface AgentCapability {
  id: string;
  name: string;
  description: string;
  confidence: number;
  requirements: string[];
  limitations: string[];
}
```

### 6.2 Capability Matrix

| Capability | architect | developer | verifier | reviewer | debugger |
|------------|-----------|-----------|----------|----------|----------|
| Planning | ✓ | ○ | ○ | ○ | ○ |
| Coding | ○ | ✓ | ○ | ○ | ○ |
| Testing | ○ | ✓ | ✓ | ○ | ○ |
| Review | ✓ | ○ | ○ | ✓ | ○ |
| Debugging | ○ | ✓ | ○ | ○ | ✓ |
| Documentation | ✓ | ○ | ○ | ✓ | ○ |
| Security | ○ | ○ | ✓ | ✓ | ○ |
| Performance | ○ | ✓ | ✓ | ○ | ✓ |

Legend: ✓ = primary, ○ = secondary

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
