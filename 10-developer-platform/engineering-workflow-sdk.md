---
title: "Engineering Workflow SDK"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "0.1.0"
status: "draft"
owner: "@chief-architect"
last-reviewed: "2026-08-02"
next-review: "2026-11-02"
tags: ["workflow", "sdk", "observability", "agents", "marketplace", "events", "visualization"]
---

# Engineering Workflow SDK

> **Vision**: Provide a vendor-neutral, installable engineering orchestration and visualization layer that turns AI-agent activity, tool execution, filesystem changes, verification, evidence, and knowledge updates into an understandable live workflow.

---

## 1. Strategic Position

Most AI coding assistants expose conversations, terminal output, or logs. CI systems such as GitHub Actions expose jobs, steps, and build state. Vestara will expose the complete cognitive engineering lifecycle.

The operator must always be able to answer:

- What is happening now?
- Which agent or human is responsible?
- Which tools are running?
- Which files and artifacts changed?
- What evidence has been collected?
- What is blocking progress?
- What happens next?

The product category is **Engineering Orchestration**: a live command surface for observing, understanding, replaying, and governing AI-driven engineering work.

Vestara will be the flagship implementation, but the SDK must remain usable by external runtimes, CI systems, coding agents, and custom engineering platforms.

---

## 2. Engineering Lifecycle

```text
Human Request
      │
      ▼
Intent
      │
      ▼
Context Assembly
      │
      ▼
Investigation
      │
      ▼
Planning
      │
      ▼
Execution
      │
      ▼
Verification
      │
      ▼
Review
      │
      ▼
Evidence and Knowledge
      │
      ▼
Completed Engineering Artifact
```

Unlike job-centric CI visualization, the workflow is engineering-centric and preserves semantic layers from goal to evidence.

```text
Goal
  ↓
Workflow
  ↓
Agent
  ↓
Turn
  ↓
Tool
  ↓
Artifact
  ↓
Diff
  ↓
Verification
  ↓
Evidence
  ↓
Knowledge
```

---

## 3. Canonical Workflow Stages

| Stage | Responsibilities | Primary Outputs |
|---|---|---|
| Intent | Goal, constraints, acceptance criteria, risk | Structured intent |
| Context Assembly | Repository, graph, memory, history, architecture, workspace | Files, entities, relationships, plans |
| Investigation | Filesystem, search, references, diagnostics, terminal, browser | Findings, observations, evidence |
| Planning | Task DAG, dependencies, execution plan, agent assignment | Ordered plan, cost estimate, risk |
| Execution | Filesystem, Git, terminal, browser, Docker, API, database | Changes, commands, artifacts |
| Verification | Build, lint, tests, browser, API, visual, security | Evidence, confidence, coverage |
| Review | Git diff, changed files, summary, risks, comments | Approval, continue, retry |
| Complete | Summary, metrics, artifacts, knowledge, lessons | Durable engineering outcome |

Stages are defaults, not hard-coded product assumptions. External integrations may extend or map their own lifecycle stages onto the canonical model.

---

## 4. Operator Experience

The primary interface combines:

- Stage progression with immediately understandable state transitions
- Expandable event timeline with duration and ownership
- Agent and system swimlanes for concurrent work
- Real-time tool, filesystem, Git, and verification events
- Node-level metrics, progress, confidence, model, tokens, and cost
- Git diff inspection and artifact provenance
- Evidence and verification status
- Blocking approvals and retry paths
- Historical playback and time travel

### 4.1 Node States

```text
○ Pending
● Running
✓ Complete
✕ Failed
? Waiting Approval
↻ Retrying
⊘ Cancelled
```

### 4.2 Expandable Node Contract

Each workflow node presents a stable summary:

```text
Actor       Developer Agent
Status      Running
Started     20:41:22
Duration    3.2s
Files       8
Tools       14
Commands    5
Tokens      12,000
Cost        $0.13
Confidence  94%
```

Expanded nodes may expose:

- Commands
- Files
- Unified diff
- Evidence
- Logs
- Events
- Diagnostics
- Approvals
- Verification results

### 4.3 Swimlanes

Recommended lanes include:

```text
Planning
Developer
Architect
Security
Reviewer
Verifier
Knowledge
Telemetry
Human Operator
```

Swimlanes reveal concurrency, handoffs, idle periods, blockers, and collaboration between agents and humans.

---

## 5. Event-Driven Architecture

The UI must not depend on polling. It is a projection of durable workflow events.

```text
Engineering Workflow
        │
        ▼
Workflow Runtime
        │
        ▼
Execution Session
        │
        ▼
Harness Thread
        │
        ▼
Harness Turns
        │
        ▼
Tool Calls
        │
        ▼
Filesystem and Artifact Events
        │
        ▼
Git Diff
        │
        ▼
Verification
        │
        ▼
Evidence and Knowledge
```

Representative native events:

```text
workflow.started
stage.started
agent.assigned
harness.turn.started
harness.tool.started
filesystem.read
filesystem.changed
git.diff.updated
verification.started
verification.completed
evidence.recorded
knowledge.updated
approval.requested
workflow.completed
```

These events are projected into nodes, edges, timelines, metrics, diffs, evidence, and historical state.

---

## 6. Vendor-Neutral Event Contract

The public SDK must expose a stable event envelope that separates transport and presentation from provider-specific payloads.

```typescript
export type WorkflowStage =
  | "intent"
  | "context"
  | "investigation"
  | "planning"
  | "execution"
  | "verification"
  | "review"
  | "complete"
  | (string & {});

export type WorkflowEventKind =
  | "started"
  | "progressed"
  | "completed"
  | "failed"
  | "cancelled"
  | "approval-requested"
  | "tool"
  | "artifact"
  | "diff"
  | "evidence"
  | "knowledge"
  | (string & {});

export interface WorkflowActor {
  id: string;
  type: "agent" | "human" | "system";
  name: string;
  role?: string;
}

export interface WorkflowEvent<TPayload = unknown> {
  id: string;
  workflowId: string;
  sessionId: string;
  sequence: number;
  timestamp: string;
  stage: WorkflowStage;
  kind: WorkflowEventKind;
  actor: WorkflowActor;
  nodeId?: string;
  parentId?: string;
  correlationId?: string;
  payload: TPayload;
  metadata?: Readonly<Record<string, unknown>>;
}
```

Requirements:

- Globally unique event identity
- Monotonic ordering per workflow session
- Correlation across agents, turns, tools, files, diffs, and evidence
- Forward-compatible event kinds and stages
- Serializable payloads
- Provider-specific extensions without breaking canonical projections
- Sensitive-data redaction before transport or persistence

---

## 7. Package Architecture

The capability must be decomposed so Vestara Workspace is one consumer rather than the owner of the implementation.

```text
@vestara/engineering-events
        │
        ▼
@vestara/workflow-runtime
        │
        ├── @vestara/workflow-react
        ├── @vestara/workflow-theme
        ├── @vestara/workflow-adapters
        └── @vestara/workflow-devtools
                    │
                    ▼
             Vestara Workspace
```

### 7.1 `@vestara/engineering-events`

Owns:

- Canonical event types
- Schemas and validation
- Event versioning
- Redaction contracts
- Serialization
- Compatibility policies

### 7.2 `@vestara/workflow-runtime`

Framework-neutral TypeScript runtime containing:

- Workflow sessions
- Nodes and edges
- Event ingestion
- Projections
- Snapshots
- History
- Playback
- Filtering
- Search
- Metrics
- State reconstruction
- Streaming adapters

This package must not depend on React.

### 7.3 `@vestara/workflow-react`

React integration containing:

- Providers and contexts
- Typed hooks
- Workflow canvas
- Timeline
- Swimlanes
- Inspector
- Metrics
- Evidence view
- Artifact view
- Diff view
- Execution map

### 7.4 `@vestara/workflow-theme`

Owns:

- Design tokens
- Theme contracts
- Animations
- State styling
- Icon mappings
- Light and dark modes
- Reduced-motion support
- Embeddable branding overrides

### 7.5 `@vestara/workflow-adapters`

Adapter contracts and optional integrations for:

- Vestara Runtime
- OpenAI Codex
- Claude Code
- GitHub Actions
- GitLab CI
- Cursor
- Aider
- Continue
- Roo Code
- Docker
- Custom agent runtimes

Adapters convert external telemetry into the canonical workflow event contract.

### 7.6 `@vestara/workflow-devtools`

Owns:

- Recording
- Playback controls
- Event inspection
- Timeline scrubbing
- Snapshot comparison
- Performance profiling
- Export and import
- Diagnostic overlays

---

## 8. Rendering Architecture

```text
Workflow Runtime
      │
      ▼
Projection Layer
      │
      ▼
Layout Engine
      │
      ▼
Animation Engine
      │
      ▼
Renderer
      │
      ▼
Composable Widgets
```

The runtime and projection model must not be coupled to one rendering technology. Initial delivery may use DOM and SVG, while preserving the option for Canvas or WebGL renderers for large workflows.

The React UI is data-driven. It receives workflow state and events and must not contain provider-specific execution logic.

---

## 9. Replay and Time Travel

Because workflow state is derived from an event stream, the SDK must support deterministic historical inspection.

Capabilities:

- Play, pause, step, and variable-speed replay
- Jump to event or timestamp
- Reconstruct workflow state at any event sequence
- Compare two workflow states
- Inspect agent, graph, file, metric, and verification state over time
- Export a portable execution recording
- Replay without contacting the original model or tools

Example:

```text
09:12  Planning completed
09:13  Developer edited runtime.ts
09:14  Verification failed
09:15  Developer retried
09:16  Tests passed
09:17  Reviewer approved
```

Replay is not merely a visual feature. It is an audit, debugging, learning, governance, and trust mechanism.

---

## 10. Marketplace Product Model

The Engineering Workflow SDK may be distributed independently from Vestara AI OS.

Possible installation model:

```bash
pnpm add @vestara/workflow-runtime @vestara/workflow-react
```

Potential product layers:

| Layer | Distribution |
|---|---|
| Event schema | Open or broadly available interoperability layer |
| Core runtime | Installable package |
| React visualization | Installable UI package |
| Vestara themes | Default and premium theme packages |
| Provider adapters | Free, paid, or partner-maintained |
| DevTools and replay | Premium package or hosted capability |
| Enterprise governance | Commercial licensing |
| Hosted workflow service | Managed Vestara offering |

The commercial boundary must remain flexible until licensing, support, telemetry, and ecosystem strategy are approved.

---

## 11. Differentiation

GitHub Actions presents:

```text
Workflow → Jobs → Steps → Logs
```

The Vestara Engineering Workflow SDK presents:

```text
Goal → Workflow → Agent → Turn → Tool → Artifact → Diff → Verification → Evidence → Knowledge
```

The primary differentiation is not visual polish. It is semantic information hierarchy backed by a durable event architecture.

This transforms the interface from a build monitor into a live engineering command center.

---

## 12. Integration with Existing Vestara Architecture

This specification builds on existing platform concepts:

- Engineering Event Store
- Engineering Graph
- Durable harness threads and turns
- Agent Runtime
- Filesystem Runtime
- Git diff tracking
- Verification pipeline
- Evidence model
- Telemetry streaming
- Knowledge and memory systems

Vestara Workspace will consume the same public contracts intended for external developers. Internal privileged data may use extensions, but the primary runtime and UI must exercise the public SDK path to prevent architectural divergence.

---

## 13. Non-Goals for the Initial Implementation

The first implementation does not require:

- A hosted multi-tenant workflow service
- Every external provider adapter
- WebGL rendering
- Marketplace monetization
- Public event-schema standardization
- Full enterprise governance
- Exact cost estimation for every provider

The initial goal is to prove the event contract, projection model, live workflow UI, inspection model, and deterministic replay inside Vestara.

---

## 14. Initial Delivery Sequence

```text
1. Canonical event schema
2. Workflow runtime and projections
3. Vestara event adapter
4. Stage and timeline interface
5. Node inspector and live metrics
6. Artifact, diff, and evidence panels
7. Swimlanes and multi-agent execution map
8. Recording and replay
9. Theme and embedding contracts
10. External adapter SDK
11. Package publication
12. Marketplace and enterprise evaluation
```

Each stage must be verified using real workflow events rather than static demonstrations.

---

## 15. Success Criteria

The capability is successful when:

- An operator can understand current execution state without reading raw logs
- Every visible state can be traced to durable events
- Files, diffs, commands, evidence, and verification are correlated
- Multi-agent concurrency and handoffs are understandable
- A completed execution can be deterministically replayed
- Vestara Workspace consumes the public SDK contracts
- An external runtime can integrate through an adapter without modifying the renderer
- The packages can be installed independently in a TypeScript application

---

## 16. Governance Status

This document records the architectural direction only. It does not authorize immediate package publication, public API stability guarantees, licensing commitments, or marketplace launch.

Before implementation becomes a committed milestone, the following require dedicated review:

- Public naming and package namespace
- Event-schema versioning policy
- Open-source versus commercial boundaries
- Security and redaction model
- Adapter certification requirements
- Performance limits and large-workflow rendering strategy
- Compatibility with the Vestara Design System
- Roadmap placement and release criteria

---

**The workflow view is not a decorative dashboard. It is the observable projection of Vestara's engineering runtime.**
