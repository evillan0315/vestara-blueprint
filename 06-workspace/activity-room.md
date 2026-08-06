---
id: "activity-room"
title: "Vestara Agent Activity Room Implementation Plan"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "0.1.0"
status: "proposed"
architecture-status: "proposed"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
priority: "high"
capability-id: "AAR-001"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
created: "2026-08-06"
last-reviewed: "2026-08-06"
next-review: "2026-11-06"
tags: ["workspace", "activity", "agents", "real-time", "conversation", "proposal"]
---

# Vestara Agent Activity Room Implementation Plan

## Status

**Status:** Proposed
**Priority:** High
**Capability ID:** `AAR-001`
**Implementation Target:** `apps/workspace` and `apps/api`
**Future Improvements:** TBD

## Objective

Build a real-time Workspace page that presents workflow, session, plan, task, verification, test, agent, and system activity in a chatroom-style interface.

The user must be able to:

- observe all active workflow activity in real time;
- distinguish messages, logs, events, tests, evidence, and system decisions;
- inspect the agent or subsystem responsible for each activity;
- open a detailed modal for the complete structured activity record;
- send a message to all participating agents;
- select an individual agent and send a direct message;
- understand which agents are active, idle, blocked, waiting, verifying, or offline;
- retain the current Workspace visual theme and interaction patterns.

The first version must be observational and conversational. It must not silently grant new execution authority to agents.

---

# Product Name

Recommended page name:

> **Activity Room**

Alternative internal names:

- Agent Activity Room
- Workflow Room
- Operations Room
- Engineering Room

Recommended route:

```text
/activity
```

Recommended navigation label:

```text
Activity Room
```

---

# Core Layout

Use a two-column application layout.

```text
┌─────────────────────────────────────────────────────────────────────┐
│ Workspace Header / Page Toolbar                                   │
├───────────────────┬─────────────────────────────────────────────────┤
│                   │                                                 │
│ Agent Sidebar     │ Activity Stream                                 │
│                   │                                                 │
│ Agent statuses    │ Workflow events                                 │
│ Agent filters     │ Agent messages                                  │
│ Direct messages   │ Logs                                            │
│ Presence          │ Plans                                           │
│                   │ Tasks                                           │
│                   │ Tests                                           │
│                   │ Verification                                    │
│                   │ Evidence                                        │
│                   │                                                 │
│                   ├─────────────────────────────────────────────────┤
│                   │ Fixed Message Composer                          │
└───────────────────┴─────────────────────────────────────────────────┘
```

Desktop proportions:

```text
Sidebar: 280–320px
Main activity column: remaining width
```

The sidebar should remain visible while the activity stream scrolls.

On smaller screens, the sidebar may collapse into a drawer, but mobile optimization is not required for the first implementation slice unless existing Workspace conventions make it inexpensive.

---

# Page Header

The header should contain:

- page title;
- connection state;
- active workflow or session selector;
- stream pause/resume;
- filters;
- search;
- clear local view;
- jump-to-latest control.

Example:

```text
Activity Room


Workflow: WFO-001F
Session: Engineering Session 42


● Live
[Pause] [Filters] [Search]
```

The connection state must clearly show:

- Live
- Reconnecting
- Offline
- Paused locally

Pausing the UI stream must not pause workflow execution. It only stops automatic rendering until resumed.

---

# Left Agent Sidebar

The left sidebar is the agent directory and presence panel.

## Agent Row

Each agent row should show:

- avatar or role icon;
- agent display name;
- role;
- current status;
- current task summary;
- model or provider badge when available;
- unread direct-message count;
- last activity time.

Example:

```text
● Engineer
  DeepSeek V4 Flash
  Editing workflow-runner.ts
  12s ago
```

## Agent Statuses

Use the existing Workspace status system where possible.

Recommended statuses:

```text
online
idle
planning
reviewing
executing
waiting
awaiting-approval
verifying
blocked
budget-paused
draining
offline
failed
```

Status must represent observed or authoritative agent state. Do not infer emotional or human-like states.

## Sidebar Sections

Recommended organization:

```text
All Agents
Active
Waiting
Offline
System Participants
```

System participants may include:

- Workflow Observer
- Coordinator
- Verifier
- Budget Governor
- Opportunity Registry
- Worker Scheduler

These are not necessarily model-backed agents, so the UI should distinguish:

```text
Agent
System
Human
```

## Agent Selection

Clicking an agent should:

1. select the agent;
2. filter or highlight its activity;
3. change the composer target to that agent;
4. show a compact details panel or popover;
5. allow sending a direct message.

The selected-agent state should be visible.

Example composer target:

```text
Message to: Engineer
```

The user must be able to return to:

```text
Message to: All Agents
```

## Agent Details

The agent details surface should show:

- identity;
- role;
- current workflow;
- current task;
- current state;
- provider and model;
- execution start time;
- token or cost usage when available;
- current permissions;
- last observation;
- recent messages;
- direct-message action.

Do not expose provider secrets or hidden reasoning.

---

# Main Activity Stream

The main panel should visually resemble a professional chatroom, but it must support structured engineering events.

The stream must interleave:

- human messages;
- agent messages;
- system messages;
- workflow events;
- plan activity;
- task activity;
- filesystem operations;
- tool calls;
- test execution;
- verification events;
- evidence events;
- approvals;
- warnings;
- failures;
- opportunity discoveries.

The stream should be chronological and real time.

---

# Activity Item Types

Use a discriminated activity model.

```ts
type ActivityKind =
  | 'human-message'
  | 'agent-message'
  | 'system-message'
  | 'workflow-event'
  | 'session-event'
  | 'plan-event'
  | 'review-event'
  | 'task-event'
  | 'tool-call'
  | 'filesystem-event'
  | 'test-event'
  | 'verification-event'
  | 'evidence-event'
  | 'approval-event'
  | 'budget-event'
  | 'worker-event'
  | 'opportunity-event'
  | 'warning'
  | 'error';
```

Every activity record should share a common envelope.

```ts
interface ActivityRecord {
  id: string;
  kind: ActivityKind;
  timestamp: string;

  workflowId?: string;
  sessionId?: string;
  planId?: string;
  taskId?: string;
  executionId?: string;
  agentId?: string;
  workerNodeId?: string;

  actor: ActivityActor;
  title: string;
  summary: string;
  severity: 'info' | 'success' | 'warning' | 'error';

  details: Record<string, unknown>;
  evidenceRefs: readonly string[];
  correlationId?: string;
}
```

```ts
interface ActivityActor {
  type: 'human' | 'agent' | 'system';
  id: string;
  displayName: string;
  role?: string;
  modelId?: string;
  providerId?: string;
}
```

Avoid `any`. Narrow `details` by activity kind where practical.

---

# Activity Card Design

Each activity item should show:

- actor avatar or icon;
- actor name;
- role or subsystem;
- timestamp;
- activity type;
- concise title;
- short summary;
- relevant status badge;
- related workflow, plan, or task;
- expandable indicator;
- evidence or attachment count.

Example:

```text
[Verifier Icon] Verifier · Verification
2:41:18 PM


Targeted tests completed
23 passed, 0 failed


Workflow WFO-E2E-001F · Task verify-3
[Comparable] [View details]
```

## Visual Language

Human and agent messages may use chat bubbles.

Structured events should use compact timeline cards.

Recommended distinction:

```text
Human message     → aligned right or emphasized user bubble
Agent message     → aligned left with agent identity
System event      → full-width compact event card
Warning/error     → full-width alert-style event card
```

Do not make test logs or workflow transitions look exactly like conversational messages. They must remain visibly structured.

## Grouping

Consecutive records from the same actor may be grouped when:

- they occur close together;
- they belong to the same task or correlation ID;
- grouping does not hide important transitions.

Examples:

```text
Engineer
  • Read src/routes/workers.ts
  • Updated scheduling handler
  • Added test fixture
```

High-value events such as approval requests, verification conclusions, failures, and workflow transitions must not be hidden inside collapsed groups by default.

---

# Filters

Provide filters for:

- All
- Messages
- Workflow
- Plans
- Tasks
- Agents
- Tools
- Files
- Tests
- Verification
- Evidence
- Approvals
- Warnings
- Errors

Additional filters:

- workflow;
- session;
- agent;
- task;
- severity;
- time range.

Filters should be represented in the URL where practical so the view is shareable or restorable.

Example:

```text
/activity?workflow=wfo-001f&agent=verifier&kind=verification-event
```

---

# Search

Search should inspect:

- titles;
- summaries;
- actor names;
- task IDs;
- workflow IDs;
- file paths;
- test names;
- failure fingerprints;
- evidence references.

Initial implementation may search loaded records locally.

Server-side or indexed search can be added later.

---

# Real-Time Transport

Use the existing Workspace WebSocket infrastructure.

Recommended event envelope:

```ts
interface ActivityStreamEvent {
  type: 'activity.created' | 'activity.updated';
  sequence: number;
  activity: ActivityRecord;
}
```

The client should:

- subscribe after connection;
- resume from the last sequence number;
- deduplicate by activity ID;
- preserve event ordering;
- reconnect with backoff;
- request missed records after reconnect;
- avoid duplicating optimistic human messages;
- show connection status.

Recommended resume protocol:

```text
Client connects
  ↓
Sends lastSequence
  ↓
API returns missed activity records
  ↓
Live stream continues
```

WebSocket events should be treated as delivery notifications, not the sole source of truth. The API should support history retrieval.

---

# API Surface

Recommended endpoints:

```text
GET /api/activity
GET /api/activity/:activityId
GET /api/workflows/:workflowId/activity
GET /api/sessions/:sessionId/activity
GET /api/agents
GET /api/agents/:agentId
POST /api/messages
POST /api/agents/:agentId/messages
```

Possible query parameters:

```text
workflowId
sessionId
agentId
taskId
kind
severity
afterSequence
beforeTimestamp
limit
```

## Send Message to All Agents

```http
POST /api/messages
```

```json
{
  "workflowId": "workflow-42",
  "sessionId": "session-18",
  "target": {
    "type": "all-agents"
  },
  "content": "Pause implementation and review the current verification failure."
}
```

## Send Direct Message

```http
POST /api/agents/:agentId/messages
```

```json
{
  "workflowId": "workflow-42",
  "sessionId": "session-18",
  "content": "Please explain the reason for the failing repository evidence comparison."
}
```

---

# Message Authority and Safety

A human message must not automatically become an authorized action.

Messages should be treated as conversation input.

The system must distinguish:

```text
Message
Instruction
Approval
Policy Change
Cancellation
```

A chat message such as:

> Delete the current implementation.

must not bypass the normal approval and capability system.

Recommended handling:

```text
Human message
  ↓
Conversation event
  ↓
Agent interpretation
  ↓
Proposed action
  ↓
Existing policy and approval gates
```

Explicit approvals should continue through dedicated approval actions, not plain chat text.

---

# Message Composer

The composer must remain fixed at the bottom of the main panel.

## Structure

```text
┌──────────────────────────────────────────────┐
│ To: All Agents                              │
│                                              │
│ Type a message…                              │
│                                              │
│ [Attach context] [Reference]        [Send]   │
└──────────────────────────────────────────────┘
```

The composer should include:

- target indicator;
- multiline text input;
- send button;
- keyboard shortcut;
- workflow/session context;
- optional reference insertion;
- optional activity attachment;
- character or payload limit;
- sending state;
- failed-send recovery.

## Keyboard Behavior

Recommended:

```text
Enter          → send
Shift + Enter  → newline
Escape         → clear selected agent or close mention menu
```

## Target Modes

```text
All Agents
Selected Agent
Selected Role
Selected Task
```

Only `All Agents` and `Selected Agent` are required initially.

## Agent Mentions

Support agent mentions:

```text
@planner
@engineer
@reviewer
@verifier
@observer
```

Mentioning an agent should add an explicit target reference, not depend only on plain text parsing.

Example message DTO:

```ts
interface SendActivityMessageRequest {
  workflowId?: string;
  sessionId?: string;
  content: string;
  targets: readonly MessageTarget[];
  referencedActivityIds: readonly string[];
}
```

---

# Referencing Activity Records

The user should be able to click an action such as:

```text
Reply
Reference
Ask agent
```

This attaches an activity record to the composer.

Example:

```text
Referencing:
Verification failure — repository scope mismatch
```

The resulting message should contain a structured reference:

```ts
interface ActivityReference {
  activityId: string;
  kind: ActivityKind;
  title: string;
}
```

This avoids forcing the user to copy logs manually.

---

# Activity Details Modal

Clicking an activity record opens a modal or large dialog.

The dialog should show all structured information available for that event.

## Modal Sections

```text
Overview
Actor
Workflow Context
Execution Context
Structured Details
Evidence
Raw Payload
Related Activity
```

## Overview

Show:

- title;
- type;
- severity;
- timestamp;
- actor;
- workflow;
- session;
- plan;
- task;
- execution attempt;
- correlation ID.

## Structured Details

Render based on event type.

Examples:

### Test Event

- command requested;
- actual command;
- verification scope;
- passed;
- failed;
- skipped;
- duration;
- failure fingerprints;
- output excerpt.

### Filesystem Event

- operation;
- path;
- risk level;
- approval state;
- before hash;
- after hash;
- result.

### Workflow Event

- previous state;
- current state;
- transition reason;
- authoritative or observed;
- applied or shadow mode.

### Agent Invocation

- role;
- provider;
- model;
- input tokens;
- output tokens;
- estimated cost;
- duration;
- material progress;
- produced artifacts.

## Evidence References

Evidence references should be clickable where a corresponding evidence detail page exists.

## Raw Payload

Raw JSON should:

- be collapsed by default;
- be formatted;
- exclude secrets;
- support copy;
- clearly indicate redaction.

## Modal Actions

Recommended actions:

```text
Reference in message
Copy activity ID
Open workflow
Open task
Open evidence
Close
```

---

# Workflow and Session Context

The page should support both:

```text
Global Activity Room
Workflow-specific Activity Room
Session-specific Activity Room
```

Recommended routes:

```text
/activity
/workflows/:workflowId/activity
/sessions/:sessionId/activity
```

The global room can show multiple workflows.

A workflow-specific room should automatically scope:

- agents;
- tasks;
- plans;
- tests;
- verification;
- messages;
- opportunities.

---

# Data Sources

The Activity Room should normalize events from existing Vestara systems.

Activity records are projections of those events, never the authoritative event source; each owning subsystem remains the source of truth.

Potential sources:

```text
Engineering Event Store
Telemetry Runtime
Workflow Orchestrator
Agent Harness
Worker Cluster
Filesystem Runtime
Verification Evidence
Repository Evidence
Workflow Observer
Approval Runtime
Budget Governance
Opportunity Registry
Conversation Runtime
```

Do not make the Workspace independently interpret every subsystem event.

Add an API-side activity projection layer.

---

# Activity Projection Layer

Recommended new package or API module:

```text
packages/activity-projection/
```

or, if a new package is premature:

```text
apps/api/src/activity/
```

Responsibilities:

- consume subsystem events;
- normalize them into `ActivityRecord`;
- assign sequence numbers;
- persist recent activity;
- correlate records;
- expose history;
- broadcast WebSocket events;
- redact sensitive fields.

Recommended contract:

```ts
interface ActivityProjector<TEvent> {
  supports(event: TEvent): boolean;
  project(event: TEvent): readonly ActivityRecord[];
}
```

Each subsystem should contribute an adapter rather than changing the UI for every new event shape.

---

# Persistence

The Activity Room needs history, not only transient WebSocket messages.

The first implementation may use:

- existing engineering event persistence;
- a dedicated activity projection table;
- an in-memory store for tests.

Recommended stored fields:

```text
id
sequence
kind
timestamp
actor
workflowId
sessionId
planId
taskId
executionId
title
summary
severity
detailsJson
evidenceRefsJson
correlationId
```

Retention and archival policy may be defined later.

---

# Ordering and Deduplication

The stream must not rely only on client timestamps.

Use:

```text
sequence
timestamp
activityId
```

Ordering precedence:

```text
sequence first
timestamp second
activityId as deterministic tie-breaker
```

The client must deduplicate reconnect deliveries by activity ID.

---

# Optimistic Messaging

Human messages may be rendered optimistically.

Use a temporary client ID:

```ts
interface PendingHumanMessage {
  clientMessageId: string;
  status: 'sending' | 'sent' | 'failed';
}
```

When acknowledged by the server, replace the temporary record with the authoritative activity record.

Do not optimistically display agent responses or workflow transitions.

---

# Read and Unread State

Track:

- last viewed global sequence;
- last viewed sequence per agent;
- unread direct messages;
- unseen warnings and errors.

Initial state may be local to the client.

Persistent cross-device read state can be a future enhancement.

---

# Empty States

## No Active Workflow

```text
No active workflow activity.


Start a workflow or select a previous session to inspect its activity.
```

## No Matching Filter

```text
No activity matches the current filters.
```

## Offline

```text
Live updates are unavailable.


Previously loaded activity remains available.
```

---

# Loading States

Use:

- sidebar skeletons;
- activity-card skeletons;
- composer disabled until session context is known;
- progressive history loading;
- bottom-loading indicator for latest records.

Avoid replacing the entire page with a spinner during reconnect.

---

# Accessibility

Include:

- keyboard navigation through agents and activity items;
- descriptive activity labels;
- visible focus states;
- status text in addition to color;
- modal focus trapping;
- screen-reader announcements for high-severity real-time events;
- reduced-motion support;
- accessible timestamps.

Do not announce every filesystem read or telemetry heartbeat to screen readers.

---

# Performance

The stream may become large.

Use virtualization when the list exceeds a practical threshold.

Recommended:

```text
Initial page: latest 100 records
Load older: cursor pagination
Live buffer: append in sequence order
Maximum in-memory default: configurable
```

Avoid rerendering the entire stream on every WebSocket event.

Normalize state by activity ID and maintain a stable ordered ID list.

---

# Suggested Frontend Structure

```text
apps/workspace/src/pages/activity/
├── ActivityRoomPage.tsx
├── ActivityRoomHeader.tsx
├── ActivitySidebar.tsx
├── AgentList.tsx
├── AgentListItem.tsx
├── AgentDetailsPanel.tsx
├── ActivityStream.tsx
├── ActivityItem.tsx
├── ActivityGroup.tsx
├── ActivityFilters.tsx
├── ActivitySearch.tsx
├── ActivityComposer.tsx
├── ActivityReferenceChip.tsx
├── ActivityDetailsDialog.tsx
├── activity-types.ts
├── activity-formatters.ts
└── __tests__/
```

Recommended client:

```text
apps/workspace/src/lib/activity.ts
```

Recommended hooks:

```text
useActivityStream
useActivityHistory
useAgents
useSendActivityMessage
useActivityFilters
```

---

# Suggested Backend Structure

```text
apps/api/src/routes/activity.ts
apps/api/src/activity/
├── activity-service.ts
├── activity-store.ts
├── activity-projector.ts
├── activity-redactor.ts
├── activity-stream.ts
├── projectors/
│   ├── workflow-projector.ts
│   ├── task-projector.ts
│   ├── telemetry-projector.ts
│   ├── verification-projector.ts
│   ├── filesystem-projector.ts
│   ├── worker-projector.ts
│   └── opportunity-projector.ts
└── __tests__/
```

---

# Current Theme Integration

The page must use the existing Workspace theme tokens and design system.

Requirements:

- no new independent color system;
- use current panel, surface, border, text, muted-text, status, and focus tokens;
- use existing buttons, dialogs, badges, tooltips, inputs, and empty states;
- follow current spacing and radius conventions;
- preserve metallic-gold accents where currently used;
- support current dark and light themes if both exist;
- do not introduce MUI when the current Workspace implementation is plain Tailwind;
- do not add a parallel component library.

The activity stream should look like a natural Workspace capability, not a separate chat application embedded inside it.

---

# Testing Strategy

## Unit Tests

Test:

- activity projection;
- activity grouping;
- message targeting;
- event ordering;
- deduplication;
- filter behavior;
- activity detail rendering;
- secret redaction;
- composer keyboard behavior.

## API Integration Tests

Test:

- activity history;
- workflow filtering;
- agent filtering;
- sequence resume;
- send-to-all;
- direct agent message;
- missing agent;
- unauthorized workflow access;
- redacted payloads.

## WebSocket Tests

Test:

- initial connection;
- live event delivery;
- reconnect;
- missed-event replay;
- duplicate delivery;
- out-of-order arrival;
- offline transition.

## Workspace Component Tests

Test:

- agent sidebar statuses;
- agent selection;
- direct-message target;
- all-agent target;
- activity-card rendering;
- modal details;
- filtering;
- unread badges;
- failed-send recovery.

## Playwright End-to-End Test

Primary scenario:

1. Open Activity Room.
2. Select an active workflow.
3. Observe Planner activity.
4. Receive plan-created event.
5. Receive review event.
6. Send message to all agents.
7. Select Engineer.
8. Send direct message.
9. Receive task and filesystem activity.
10. Receive test result.
11. Open test activity modal.
12. Inspect full structured data.
13. Receive verification conclusion.
14. Confirm Observer recommendation shows shadow mode.
15. Confirm workflow completion is separately authoritative.
16. Reconnect and recover missed activity without duplicates.

---

# Security and Privacy

The activity projection must redact:

- API keys;
- authorization headers;
- tokens;
- passwords;
- environment secret values;
- raw provider credentials;
- sensitive prompt context when policy requires;
- protected file contents.

Allow safe metadata such as:

```text
credentialEnvVar: OPENCODE_GO_API_KEY
credentialResolved: true
```

Never expose the credential value.

---

# Implementation Sequence

## AAR-001A — Activity Contracts and Projection

Implement:

- `ActivityRecord`;
- actor model;
- activity kinds;
- projection service;
- in-memory store;
- sequence ordering;
- secret redaction;
- projector tests.

Acceptance:

- workflow, task, test, verification, and agent events normalize into one activity stream.

## AAR-001B — History API and WebSocket Stream

Implement:

- activity routes;
- pagination;
- filters;
- WebSocket event;
- sequence resume;
- reconnect recovery;
- integration tests.

Acceptance:

- the client can load history and continue receiving real-time records without duplication.

## AAR-001C — Workspace Layout and Agent Sidebar

Implement:

- page route;
- two-column layout;
- agent list;
- presence statuses;
- selection;
- active-agent filtering;
- theme integration.

Acceptance:

- user can inspect current participants and select an individual agent.

## AAR-001D — Activity Stream and Detail Modal

Implement:

- activity cards;
- message bubbles;
- structured event cards;
- grouping;
- filters;
- search;
- full-details dialog;
- evidence links.

Acceptance:

- every visible event can be opened and inspected in structured form.

## AAR-001E — Human Messaging

Implement:

- fixed composer;
- all-agent messages;
- direct messages;
- agent mentions;
- activity references;
- optimistic human message state;
- error recovery.

Acceptance:

- user can communicate with all agents or one selected agent without bypassing workflow governance.

## AAR-001F — Workflow and Session Scoping

Implement:

- global activity;
- workflow activity;
- session activity;
- URL filters;
- workflow/session selectors;
- historical loading.

Acceptance:

- the room can serve both a global operations view and a focused workflow conversation.

## AAR-001G — Real-Time Hardening

Implement:

- reconnect backoff;
- missed-message replay;
- deduplication;
- list virtualization;
- unread state;
- pause/resume rendering;
- offline behavior.

Acceptance:

- stream remains reliable during connection interruption and high event volume.

## AAR-001H — E2E and Visual Verification

Implement:

- Playwright scenario;
- visual baseline;
- accessibility assertions;
- screenshot evidence;
- workflow E2E integration.

Acceptance:

- the full plan-review-execution-verification lifecycle is visibly observable through the Activity Room.

---

# Acceptance Criteria

The capability is complete when:

- the page uses the current Workspace theme;
- the layout has a persistent left agent sidebar and main activity panel;
- agent state updates in real time;
- the user can select an agent;
- the user can message all agents;
- the user can message one agent;
- workflow, session, plan, task, test, verification, and evidence activity appears in one ordered stream;
- messages and structured events remain visually distinct;
- clicking an activity opens complete structured details;
- activity history survives reconnects;
- events are deduplicated and ordered;
- sensitive values are redacted;
- human messages do not bypass policy or approval controls;
- observer recommendations remain visibly separate from authoritative workflow transitions;
- the stream is verified through API, WebSocket, component, and Playwright tests.

---

# Final Product Experience

The intended experience should feel like entering the engineering room where Vestara is operating.

The user should be able to see:

```text
Planner is preparing the plan.


Reviewer requested a correction.


Engineer started Task 3.


Worker Node 2 acquired the lease.


A protected action is awaiting approval.


Targeted tests completed.


Verifier detected an added failure fingerprint.


Engineer is repairing the implementation.


Observer recommends continuing.


Verification passed.


Coordinator completed the workflow.


An out-of-scope opportunity was recorded.
```

The Activity Room should make Vestara's internal engineering organization observable, interactive, and understandable without presenting logs as an unreadable terminal dump.

The guiding principle is:

> The user should not merely watch output. The user should understand who acted, what happened, why it happened, what evidence exists, and what the workflow will do next.
