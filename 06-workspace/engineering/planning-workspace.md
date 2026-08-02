---
id: "planning-workspace"
title: "Planning Workspace — Intent to Executable Session"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui, planning-service)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "planning", "intent", "session"]
---

# Planning Workspace

## Intent to Executable Session

> **The Planning Workspace transforms human intent into an executable engineering session. It is the upstream domain that feeds execution, verification, and evidence.**

---

## 1. Planning Lifecycle

```
Intent
  ↓
Context Used
  ↓
Plan Proposal
  ↓
Requirements
  ↓
Task Graph
  ↓
Dependencies
  ↓
Risk Assessment
  ↓
Agent Recommendations
  ↓
Human Review or Approval
  ↓
Executable Session
```

---

## 2. Planning Contract

> **Workspace read model — not a domain contract.**

```typescript
// Workspace read model — projects planning state into the UI
interface PlanningProjection {
  session: SessionReference;
  intent: IntentProjection;
  context: ContextProjection;
  plan: PlanProjection;
  taskGraph: TaskGraphProjection;
  riskAssessment: RiskAssessmentProjection;
  agentRecommendations: AgentRecommendationProjection[];
  approvalStatus: ApprovalStatusProjection;
}

interface SessionReference {
  id: string;
  status: string;
}

interface IntentProjection {
  raw: string;
  parsed: ParsedIntent;
  confidence: IntentConfidence;
  clarifications?: string[];
}

interface ParsedIntent {
  goal: string;
  scope: string;
  constraints: string[];
  successCriteria: string[];
}

type IntentConfidence = 
  | 'clear'           // Intent is unambiguous
  | 'ambiguous'       // Intent needs clarification
  | 'incomplete'      // Intent is missing information
  | 'conflicting';    // Intent has contradictions

interface ContextProjection {
  repository: RepositoryContext;
  project: ProjectContext;
  recentChanges: FileChangeReference[];
  relevantHistory: EngineeringEventReference[];
  activeSessions: SessionReference[];
}

interface PlanProjection {
  id: string;
  steps: PlanStepProjection[];
  estimatedDuration: number;
  requiredApprovals: ApprovalRequirement[];
  status: PlanStatus;
}

type PlanStatus = 
  | 'draft'
  | 'proposed'
  | 'approved'
  | 'rejected'
  | 'executing'
  | 'completed';

interface PlanStepProjection {
  id: string;
  description: string;
  agent?: string;
  estimatedDuration: number;
  dependencies: string[];
  sideEffects: SideEffect[];
  verificationCriteria: string[];
}

interface TaskGraphProjection {
  tasks: TaskProjection[];
  dependencies: TaskDependencyProjection[];
  criticalPath: string[];
  parallelizable: string[];
}

interface TaskProjection {
  id: string;
  description: string;
  status: TaskStatus;
  assignedAgent?: string;
  estimatedDuration: number;
  actualDuration?: number;
}

type TaskStatus = 
  | 'pending'
  | 'ready'
  | 'executing'
  | 'completed'
  | 'failed'
  | 'blocked';

interface TaskDependencyProjection {
  from: string;
  to: string;
  type: 'finish-to-start' | 'start-to-start' | 'finish-to-finish';
}

interface RiskAssessmentProjection {
  risks: RiskProjection[];
  overallRisk: RiskLevel;
  mitigations: MitigationProjection[];
}

type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface RiskProjection {
  id: string;
  description: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  mitigation?: string;
}

interface MitigationProjection {
  riskId: string;
  strategy: string;
  owner?: string;
}

interface AgentRecommendationProjection {
  agentId: string;
  agentName: string;
  role: string;
  suitability: CapabilityLevel;
  reasons: string[];
  alternatives: string[];
}

// Capability levels (not numerical confidence)
type CapabilityLevel = 
  | 'primary'
  | 'secondary'
  | 'declared'
  | 'observed'
  | 'verified'
  | 'insufficient';

interface ApprovalStatusProjection {
  required: boolean;
  status: ApprovalStatus;
  approver?: string;
  requestedAt?: string;
  resolvedAt?: string;
  reason?: string;
}

type ApprovalStatus = 
  | 'not-required'
  | 'pending'
  | 'approved'
  | 'rejected';
```

---

## 3. Planning Views

### 3.1 Intent Input View

```
┌─────────────────────────────────────────────────────────────────┐
│  NEW ENGINEERING SESSION                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Intent:                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Add user authentication with JWT tokens and role-based │   │
│  │  access control to the API                              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Context:                                                      │
│  ├── Repository: vestara-ai-core                               │
│  ├── Project: API server                                       │
│  ├── Recent changes: 3 files modified today                    │
│  └── Active sessions: 1                                       │
│                                                                 │
│  [Analyze Intent]  [Cancel]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Plan Review View

```
┌─────────────────────────────────────────────────────────────────┐
│  PLAN REVIEW                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Intent: Add user authentication with JWT tokens              │
│  Status: Proposed                                             │
│  Estimated Duration: 45 minutes                                │
│                                                                 │
│  Steps:                                                       │
│  ├── 1. Create auth middleware (10 min)                       │
│  │   Agent: developer-01 | Dependencies: none                │
│  │   Side effects: Create src/middleware/auth.ts              │
│  │                                                             │
│  ├── 2. Add JWT validation (10 min)                           │
│  │   Agent: developer-01 | Dependencies: step 1              │
│  │   Side effects: Modify src/routes/api.ts                  │
│  │                                                             │
│  ├── 3. Implement role-based access (15 min)                  │
│  │   Agent: developer-01 | Dependencies: step 2              │
│  │   Side effects: Create src/middleware/rbac.ts              │
│  │                                                             │
│  └── 4. Write tests (10 min)                                  │
│      Agent: developer-01 | Dependencies: step 3              │
│      Side effects: Create src/__tests__/auth.test.ts         │
│                                                                 │
│  Risks:                                                       │
│  ├── Medium: JWT secret management                            │
│  └── Low: Token expiration handling                           │
│                                                                 │
│  Required Approvals:                                          │
│  └── Security review for auth implementation                  │
│                                                                 │
│  [Approve Plan] [Reject Plan] [Modify Plan]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Task Graph View

```
┌─────────────────────────────────────────────────────────────────┐
│  TASK GRAPH                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     │
│  │ Step 1      │────▶│ Step 2      │────▶│ Step 3      │     │
│  │ Auth        │     │ JWT         │     │ RBAC        │     │
│  │ Middleware  │     │ Validation  │     │ Access      │     │
│  └─────────────┘     └─────────────┘     └─────────────┘     │
│         │                   │                   │               │
│         └───────────────────┴───────────────────┘               │
│                                 │                               │
│                                 ▼                               │
│                         ┌─────────────┐                        │
│                         │ Step 4      │                        │
│                         │ Tests       │                        │
│                         └─────────────┘                        │
│                                                                 │
│  Critical Path: Step 1 → Step 2 → Step 3 → Step 4            │
│  Parallelizable: None                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Context Assembly

### 4.1 Context Sources

| Source | Description |
|--------|-------------|
| Repository | Structure, files, configuration |
| Project | Dependencies, scripts, settings |
| Recent Changes | Files modified today/this week |
| Relevant History | Related engineering events |
| Active Sessions | Other sessions in this project |
| Agent Capabilities | Available agents and their skills |
| Provider Routing | Current provider and model assignments |

### 4.2 Context Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  CONTEXT ASSEMBLY                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Repository: vestara-ai-core                                   │
│  ├── Structure: 81 packages, 12 apps                          │
│  ├── Language: TypeScript (strict)                             │
│  └── Framework: Node.js + React                                │
│                                                                 │
│  Project: API Server                                           │
│  ├── Dependencies: 45 packages                                 │
│  ├── Scripts: build, test, lint                                │
│  └── Configuration: tsconfig.json                             │
│                                                                 │
│  Recent Changes (Today):                                       │
│  ├── src/runtime.ts (modified)                                │
│  ├── src/api/routes.ts (modified)                             │
│  └── src/__tests__/test.ts (created)                          │
│                                                                 │
│  Relevant History:                                             │
│  ├── 3 previous auth implementations                          │
│  ├── 2 security reviews                                        │
│  └── 5 test failures in auth module                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Risk Assessment

### 5.1 Risk Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  RISK ASSESSMENT                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Overall Risk: Medium                                         │
│                                                                 │
│  Risks:                                                       │
│  ├── ⚠ Medium: JWT secret management                         │
│  │   Likelihood: Medium | Impact: High                        │
│  │   Mitigation: Use environment variables, not hardcoded    │
│  │                                                             │
│  ├── ⚠ Medium: Token expiration handling                     │
│  │   Likelihood: Medium | Impact: Medium                     │
│  │   Mitigation: Implement refresh token rotation            │
│  │                                                             │
│  └── ✅ Low: Role-based access complexity                     │
│      Likelihood: Low | Impact: Medium                        │
│      Mitigation: Start with simple roles, iterate            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Agent Recommendations

### 6.1 Recommendation Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT RECOMMENDATIONS                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Primary Agent:                                               │
│  ├── developer-01                                             │
│  │   Role: Code implementation                                │
│  │   Suitability: primary                                     │
│  │   Reasons: Strong coding, authentication experience       │
│  │   Alternatives: developer-02                               │
│                                                                 │
│  Supporting Agents:                                           │
│  ├── architect-01                                             │
│  │   Role: Architecture review                                │
│  │   Suitability: primary                                     │
│  │   Reasons: Security architecture expertise                │
│  │                                                             │
│  └── reviewer-01                                              │
│      Role: Code review                                        │
│      Suitability: primary                                     │
│      Reasons: Security review experience                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Notes

### 7.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Intent Parsing | Partial | Basic parsing exists |
| Context Assembly | Partial | Basic context gathering exists |
| Plan Generation | Partial | Basic plan generation exists |
| Task Graph | Proposed | Not yet implemented |
| Risk Assessment | Proposed | Not yet implemented |
| Agent Recommendations | Partial | Basic recommendations exist |
| Approval Flow | Implemented | Approval workflow exists |

### 7.2 Open Questions

1. How should plan revisions be tracked?
2. Should plans be versioned?
3. How should plan conflicts be resolved?
4. Should plans be shareable across sessions?

---

*This document defines the Planning Workspace for the Vestara Workspace.*
*It transforms human intent into an executable engineering session.*
