---
id: "platform-agent-harness-architecture"
title: "Agent Harness Runtime Architecture"
volume: "04-platform"
book: "Book 2: Platform Architecture"
version: "1.1.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "4a76027 (Harness Foundation); target runtime remains partial"
tags: ["agent-harness", "threads", "tools", "environments", "orchestration"]
---

# Agent Harness Runtime Architecture

## Purpose

Define Vestara's target execution model: a durable agent harness repeatedly
understands, inspects, acts, observes, verifies, and adjusts until a turn reaches
a terminal outcome.

## Architectural invariant

```text
User or supervisor intent
          ↓
Task and Thread Runtime
          ↓
Agent Harness Runtime
          ├─ assemble context
          ├─ request model inference
          ├─ interpret output
          ├─ propose tool call
          ├─ evaluate policy / approval
          ├─ execute in environment
          ├─ record observation and evidence
          ├─ verify
          └─ continue | complete | block | escalate
```

The harness coordinates this loop. It does not absorb tool implementation,
environment isolation, policy decisions, verification checks, or durable event
storage.

## Current implementation

`@vestara/agent-harness` is the single execution path for ordinary agent work
(ADR-120). `AgentRuntime.run()` is a thin adapter that delegates to the harness,
creating a durable thread and linked ExecutionSession for every run. Key
capabilities delivered:

- Multi-tool deterministic execution; invalid tool names/arguments produce
  structured failures the model can react to.
- Approval suspension with a restart-safe pending-call queue and idempotent
  approval resolution; `pendingApprovals(threadId)` is durable.
- Provider context compaction preserving instruction, steering, tool-call IDs,
  changed files, failed attempts, verification, and approvals.
- `harness.*` engineering-event bridge and `change.*` filesystem/diff
  projection (ADR-121) and the real-time workflow lifecycle (ADR-122).
- The legacy capability orchestrator loop is removed — there is no duplicate
  model→tool loop.

Authoritative history remains `@vestara/thread-runtime`; the engineering event
store and graph are projections. Environment provisioning, worktree leases,
browser demonstration, and remote/cloud execution remain future work.

## Harness state

```ts
type AgentRunState =
  | 'queued'
  | 'preparing'
  | 'reasoning'
  | 'awaiting-tool'
  | 'executing-tool'
  | 'awaiting-approval'
  | 'verifying'
  | 'blocked'
  | 'completed'
  | 'failed'
  | 'cancelled';
```

Transitions MUST be evented, attributable, cancellable where safe, and
recoverable from the durable thread/item log. `completed`, `failed`, and
`cancelled` are terminal. `blocked` preserves a resumable thread and names the
missing authority, input, or external state.

## Durable task and thread model

```text
Project
  └─ Task
      └─ Thread
          ├─ Turn
          │   ├─ user/supervisor input
          │   ├─ model output item
          │   ├─ tool call item
          │   ├─ tool result item
          │   ├─ approval item
          │   └─ verification item
          ├─ compacted context
          └─ outcome
```

Threads MUST support create, read, list, resume, fork, steer, interrupt,
compact, archive, and cross-surface subscription. The raw item/event sequence is
authoritative; summaries never replace it.

## Environment Runtime

Every harness run binds to one environment lease:

```ts
interface AgentEnvironment {
  readonly id: string;
  readonly kind: 'local' | 'sandbox' | 'container' | 'cloud' | 'remote';
  readonly workspaceRoot: string;
  readonly networkPolicy: NetworkPolicy;
  readonly filesystemPolicy: FilesystemPolicy;
  readonly processPolicy: ProcessPolicy;
}
```

The Environment Runtime owns provisioning, environment variables and secret
references, filesystem/process/network boundaries, snapshots, health, and
cleanup. Shell, filesystem, Docker, and Kubernetes are capabilities exposed
through tools; they are not automatically top-level runtimes.

## Unified Tool Runtime

Every tool provider registers through one envelope:

```ts
interface VestaraTool<TInput, TOutput> {
  readonly name: string;
  readonly description: string;
  readonly risk: 'low' | 'medium' | 'high' | 'critical';
  readonly inputSchema: unknown;

  execute(
    input: TInput,
    context: ToolExecutionContext,
  ): Promise<ToolExecutionResult<TOutput>>;
}
```

The Tool Runtime owns discovery, schema validation, authorization, invocation,
timeouts, cancellation, streaming, telemetry, and evidence capture. Providers
own operation-specific behavior. Initial namespaces include filesystem, shell,
Git, repository, browser, database, containers, GitHub, deployment, and external
integrations.

## Context Runtime

Context assembly is demand-driven and turn-specific. Sources include project
instructions, relevant repository files, Engineering Graph queries, thread
history, plans, tool descriptions, environment state, skills, preferences, and
retrieved memory. Selection MUST be budgeted and attributable; the entire
repository or complete history is not sent by default.

## Compaction and memory

| Layer | Authority | Purpose |
|-------|-----------|---------|
| Raw thread items/events | authoritative | exact instructions, actions, observations, outcomes |
| Compacted context | derived and replaceable | continue a long task within context budget |
| Durable engineering memory | derived and reusable | conventions, decisions, failure patterns, successful strategies |

Compaction preserves current objective, decisions, modified files, failed
attempts, remaining work, approvals, and verification state.

## Policy and approval

Every proposed tool call is evaluated using agent, task, tool risk,
environment, affected resources, and predicted impact. Outcomes are `allow`,
`allow-and-notify`, `require-approval`, `require-sandbox`, or `deny`.
Authorization is attributable and scoped; approval of one call does not grant
ambient authority to later calls.

## Verification and evidence

Verification is invoked throughout the turn, not only at completion. Structured
results include status, checks, evidence artifacts, uncovered risks, and bounded
confidence. The harness uses results to finish, repair, choose another strategy,
block, or escalate. Providers may propose checks; Vestara owns the verdict.

## Browser and computer use

Browser and computer use are Tool Runtime providers with two modes:

1. agent operation to accomplish work;
2. human-visible demonstration to prove behavior.

Evidence may include screenshots, video, DOM/accessibility snapshots, console
logs, network records, and interactions.

## Parallel work and worktree leases

Write-capable parallel agents SHOULD receive distinct worktree leases. A lease
binds task, agent, repository, worktree path, branch, base revision, and
environment. The runtime owns locks, conflicts, dependency tracking, integration
preparation, and cleanup. Agent threads do not share mutable execution state.

## Orchestration and automation

Orchestration decomposes goals, resolves task dependencies, assigns agents,
provisions environments, tracks outcomes, and integrates results. It does not
micromanage model/tool iterations.

Automation turns schedules or events into ordinary durable tasks and threads.
It MUST NOT create a parallel execution protocol.

## Event vocabulary

Minimum events include `task.created`, `task.started`, `agent.turn.started`,
`model.inference.completed`, `tool.call.proposed`, `approval.requested`,
`tool.call.started`, `tool.call.completed`, `verification.started`,
`evidence.created`, `task.completed`, and `task.failed`.

Telemetry answers what is happening. Evidence proves results. The event store
preserves sequence and authority. The Engineering Graph projects meaning and
relationships.

## Runtime qualification rule

A new top-level runtime requires durable lifecycle, state machine, recovery,
concurrency, resource ownership, isolation, and observability. Otherwise it is a
service, provider, strategy, policy, or projection.

Planning, simulation, learning, repository intelligence, browser use, Git,
containers, databases, memory retrieval, impact analysis, and risk scoring do
not currently qualify as independent runtimes.

## Current-to-target reconciliation

| Current implementation | Target owner | Migration status |
|------------------------|--------------|------------------|
| Kernel + `WorkspaceRuntime` | host/lifecycle composition | retained |
| `SessionOrchestrator`, planning, implementation services | Orchestration Runtime strategies | adapt |
| `AgentRuntime` (harness adapter) | Agent Harness Runtime | migrated — single execution path |
| `AgentHarnessRuntime` durable loop | Agent Harness Runtime | delivered (ADR-120) |
| conversation sessions/events | Task and Thread Runtime | consolidate durably |
| filesystem capability manager + tool packages | Tool + Policy Runtimes | unify contract |
| workspace fingerprint/understanding/knowledge | Context Runtime sources | adapt |
| verification/evaluation/screenshots | Verification and Evidence Runtime | consolidate |
| provider-runtime routing | harness model/provider selection | retain |
| scheduler/jobs/workers | Automation + Orchestration | adapt |
| Engineering Event Store + Graph | Event/Audit Runtime + projection | persist and extend — `harness.*` + `change.*` projections shipped (ADR-121) |
| workflow lifecycle + TUI rail | Workflow Runtime | shipped (ADR-122) |

## Delivery phases

1. Complete the harness ✅ — thread/item schemas, harness coordinator, unified
   tool envelope, policy evaluation, structured observations, cancellation,
   steering, resume, multi-tool ordering, restart-safe approvals, and context
   compaction (ADR-120).
2. Make results trustworthy: repeated verification, evidence artifacts, browser
   tools, demonstration mode, repair loop.
3. Enable safe parallel work: worktree leases, parallel tasks, supervisor,
   conflict detection, integration verification, agent swimlanes.
4. Support long-running work: cloud/remote environments, automation,
   cross-device steering, durable memory.
5. Improve from outcomes: failure-pattern extraction, skills, repository
   instructions, policy refinement, and agent evaluation.
6. Real-time workflow lifecycle: canonical projection, incremental push
   protocol, hybrid stage derivation, TUI rail (shipped, ADR-122); premium
   Workspace diagram + temporal replay remain.

## Strategic objective

Every agent action is contextualized, isolated, observable, interruptible,
verifiable, replayable, and connected to the Engineering Graph.
