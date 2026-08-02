---
id: "workspace-modes"
title: "Workspace Modes — Adaptive Interface Contexts"
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
tags: ["workspace", "modes", "ui", "adaptive"]
implementation-ref: "local main (workspace-ui)"
---

# Workspace Modes

## Adaptive Interface Contexts

> **The Workspace adapts its layout, tools, and focus based on the current engineering context. Modes are not pages—they are projection states of the same session.**

---

## 1. Mode Model

```typescript
type WorkspaceMode = 
  | 'overview'      // High-level session dashboard
  | 'planning'      // Plan creation and review
  | 'execution'     // Active agent work monitoring
  | 'verification'  // Evidence review and approval
  | 'exploration'   // Code and file exploration
  | 'operations';   // System health and telemetry

interface WorkspaceState {
  mode: WorkspaceMode;
  session: EngineeringSession;
  activePanel: PanelId;
  inspector: InspectorState;
  history: ModeHistory;
}
```

---

## 2. Mode Definitions

### 2.1 Overview Mode

**Purpose:** High-level session dashboard showing status, progress, and key metrics.

```typescript
interface OverviewMode {
  mode: 'overview';
  panels: {
    sessionSummary: SessionSummaryPanel;
    progress: ProgressPanel;
    recentActivity: ActivityPanel;
    quickActions: QuickActionsPanel;
  };
  focus: 'status';
}
```

| Panel | Content |
|-------|---------|
| Session Summary | Title, objective, status, timeline |
| Progress | Workflow stage, completion percentage |
| Recent Activity | Latest events and changes |
| Quick Actions | Common operations (pause, resume, cancel) |

**When to Use:**
- First view when opening a session
- Checking session status
- Quick interventions

---

### 2.2 Planning Mode

**Purpose:** Creating, reviewing, and approving execution plans.

```typescript
interface PlanningMode {
  mode: 'planning';
  panels: {
    planEditor: PlanEditorPanel;
    riskAssessment: RiskPanel;
    approvalFlow: ApprovalPanel;
    estimate: EstimatePanel;
  };
  focus: 'plan';
}
```

| Panel | Content |
|-------|---------|
| Plan Editor | Step-by-step plan creation |
| Risk Assessment | Identified risks and mitigations |
| Approval Flow | Required approvals and status |
| Estimate | Time and resource estimates |

**When to Use:**
- Defining task breakdown
- Reviewing agent-generated plans
- Requesting plan approval

---

### 2.3 Execution Mode

**Purpose:** Monitoring active agent work, viewing real-time progress.

```typescript
interface ExecutionMode {
  mode: 'execution';
  panels: {
    agentStatus: AgentStatusPanel;
    liveProgress: ProgressPanel;
    toolOutput: ToolOutputPanel;
    interventions: InterventionPanel;
  };
  focus: 'agents';
}
```

| Panel | Content |
|-------|---------|
| Agent Status | Running agents, their tasks, status |
| Live Progress | Real-time execution updates |
| Tool Output | Terminal, browser, file changes |
| Interventions | Pause, resume, redirect controls |

**When to Use:**
- Monitoring active execution
- Intervening in agent work
- Watching tool output

---

### 2.4 Verification Mode

**Purpose:** Reviewing evidence, approving or rejecting work.

```typescript
interface VerificationMode {
  mode: 'verification';
  panels: {
    evidenceList: EvidenceListPanel;
    evidenceDetail: EvidenceDetailPanel;
    verificationChecks: ChecksPanel;
    approvalDecision: ApprovalPanel;
  };
  focus: 'evidence';
}
```

| Panel | Content |
|-------|---------|
| Evidence List | All collected evidence items |
| Evidence Detail | Detailed evidence inspection |
| Verification Checks | Test results, quality checks |
| Approval Decision | Approve/reject workflow |

**When to Use:**
- Reviewing completed work
- Verifying evidence
- Making approval decisions

---

### 2.5 Exploration Mode

**Purpose:** Browsing code, files, and project structure.

```typescript
interface ExplorationMode {
  mode: 'exploration';
  panels: {
    fileExplorer: FileExplorerPanel;
    codeViewer: CodeViewerPanel;
    searchResults: SearchPanel;
    graphView: GraphPanel;
  };
  focus: 'files';
}
```

| Panel | Content |
|-------|---------|
| File Explorer | Project file tree |
| Code Viewer | File content with syntax highlighting |
| Search Results | Code and file search |
| Graph View | File and entity relationships |

**When to Use:**
- Browsing project structure
- Reading code files
- Searching for specific code

---

### 2.6 Operations Mode

**Purpose:** System health, telemetry, and runtime monitoring.

```typescript
interface OperationsMode {
  mode: 'operations';
  panels: {
    systemHealth: HealthPanel;
    telemetry: TelemetryPanel;
    eventStream: EventStreamPanel;
    runtimeMetrics: MetricsPanel;
  };
  focus: 'system';
}
```

| Panel | Content |
|-------|---------|
| System Health | Service status, errors |
| Telemetry | Performance metrics |
| Event Stream | Real-time event log |
| Runtime Metrics | CPU, memory, network |

**When to Use:**
- Monitoring system health
- Investigating performance issues
- Debugging runtime problems

---

## 3. Mode Transitions

### 3.1 Transition Rules

| From | To | Trigger |
|------|----|---------|
| Any | Overview | Session open / Home button |
| Overview | Planning | Start planning |
| Overview | Execution | Start execution |
| Planning | Execution | Plan approved |
| Execution | Verification | Execution complete |
| Verification | Execution | Verification failed |
| Verification | Overview | Verification passed |
| Any | Exploration | Open file explorer |
| Any | Operations | Open operations center |

### 3.2 Mode History

```typescript
interface ModeHistory {
  current: WorkspaceMode;
  previous: WorkspaceMode | null;
  stack: WorkspaceMode[];
  canGoBack: boolean;
  canGoForward: boolean;
}
```

---

## 4. Layout Per Mode

### 4.1 Overview Layout

```
┌─────────────────────────────────────────────────────┐
│  Header: Session Title + Status + Quick Actions     │
├───────────────┬─────────────────────────────────────┤
│               │                                     │
│   Session     │          Progress                   │
│   Summary     │          Timeline                   │
│               │                                     │
├───────────────┼─────────────────────────────────────┤
│               │                                     │
│   Recent      │          Inspector                  │
│   Activity    │          (Context Panel)            │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

### 4.2 Execution Layout

```
┌─────────────────────────────────────────────────────┐
│  Header: Execution Status + Intervention Controls   │
├───────────────┬─────────────────────────────────────┤
│               │                                     │
│   Agent       │          Tool Output                │
│   Status      │          (Terminal/Browser)         │
│               │                                     │
├───────────────┼─────────────────────────────────────┤
│               │                                     │
│   Live        │          Inspector                  │
│   Progress    │          (Agent/Execution)          │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

### 4.3 Verification Layout

```
┌─────────────────────────────────────────────────────┐
│  Header: Verification Status + Decision Controls    │
├───────────────┬─────────────────────────────────────┤
│               │                                     │
│   Evidence    │          Evidence Detail            │
│   List        │          (Inspector)                │
│               │                                     │
├───────────────┼─────────────────────────────────────┤
│               │                                     │
│   Verification│          Approval                   │
│   Checks      │          Decision                   │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

---

## 5. Mode Persistence

### 5.1 State Storage

```typescript
interface ModePersistence {
  save(state: WorkspaceState): Promise<void>;
  load(sessionId: string): Promise<WorkspaceState | null>;
  clear(sessionId: string): Promise<void>;
}
```

### 5.2 Restoration Rules

| Scenario | Behavior |
|----------|----------|
| Session reopened | Restore last mode |
| New session | Start in Overview |
| Error occurred | Switch to Operations |
| Verification complete | Switch to Overview |

---

## 6. Implementation Notes

### 6.1 Current State

| Mode | Status | Notes |
|------|--------|-------|
| Overview | Implemented | Dashboard exists |
| Planning | Partial | Plan panel exists |
| Execution | Implemented | Execution pipeline exists |
| Verification | Partial | Verification center exists |
| Exploration | Implemented | File explorer exists |
| Operations | Partial | Operations center exists |

### 6.2 Open Questions

1. Should modes be URL-addressable?
2. How should mode transitions be animated?
3. Can multiple modes be visible simultaneously?
4. How should mode state be shared between users?

---

*This document defines the adaptive interface contexts for the Vestara Workspace.*
*Modes are projection states, not separate pages.*
