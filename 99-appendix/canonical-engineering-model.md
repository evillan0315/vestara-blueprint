---
title: "Canonical Engineering Model"
---

# Canonical Engineering Model

## Template

Every architecture domain follows this exact template. The validator checks
all fields are present and consistent.

```yaml
domain: <domain-id>
title: <Human-readable name>
owner: "@role"

purpose:
  statement: <one-sentence purpose>
  canonical-document: <path to canonical blueprint doc>
  core-document: <path to canonical core doc>

architecture:
  current: <what exists now>
  target: <what is accepted but not yet implemented>
  constraints:
    - <architectural constraint 1>
    - <architectural constraint 2>
  adr:
    accepted:
      - "ADR-XXX"
    proposed:
      - "ADR-YYY"

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: <package-name>
      path: packages/<name>
      status: implemented | partial | not-started
  routes: []        # API routes if applicable
  commands: []      # CLI commands if applicable
  surfaces: []      # UI surfaces if applicable

evidence:
  verification:
    run-id: "verification-<sha>-<seq>"
    date: "YYYY-MM-DD"
    status: passed | failed | partial
    commands:
      - <verification command>
  tests:
    - path: <test file path>
      count: <number>
  screenshots: []   # if applicable
  walkthroughs: []  # if applicable

maturity:
  architecture: accepted | proposed
  implementation: implemented | partial | not-started
  verification: verified | partial | unverified

known-gaps:
  - <gap description>

future-adrs:
  - <ADR that would advance this domain>
```

## Domains

### 1. Agent Harness

```yaml
domain: agent-harness
title: Agent Harness
owner: "@ai-engineer"

purpose:
  statement: "Durable single-turn agent loop that governs model invocation, tool execution, approval, verification, and evidence collection."
  canonical-document: "04-platform/agent-harness-architecture.md"
  core-document: "docs/Architecture/Agent-Orchestration.md"

architecture:
  current: >
    Foundation implemented: harness runtime, turn lifecycle, tool request,
    capability check, observation, steering interface, durable thread target.
    Revision loops for verification-driven self-correction. Interruptive steering
    that aborts active inference. Integration with WorkspaceRuntime via thin
    adapter in agent-runtime.ts.
  target: >
    Complete agent harness with streaming, concurrent tool execution,
    durable execution sessions, cross-provider verification, and correlation envelope.
  constraints:
    - Agent never self-authorizes or self-verifies
    - All filesystem access through AgentCapabilityManager
    - Approval gates enforced before destructive operations
    - Evidence collected as FsObservation events
  adr:
    accepted:
      - "ADR-111"
    proposed: []

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: agent-harness
      path: packages/agent-harness
      status: partial
    - name: workspace (agent-runtime adapter)
      path: packages/workspace/src/agent-runtime.ts
      status: implemented
  routes:
    - POST /api/agents/:agentId/runs
    - GET|POST /api/agent-threads/:threadId
    - POST /api/agent-threads/:threadId/approvals/:approvalId/resolve
  commands: []
  surfaces:
    - Execution Center timeline
    - Harness Timeline component

evidence:
  verification:
    run-id: "verification-eb3fd3d-001"
    date: "2026-08-02"
    status: partial
    commands:
      - pnpm test -- packages/agent-harness
      - pnpm test -- packages/workspace/__tests__/agent-runtime-harness.test.ts
  tests:
    - path: packages/agent-harness/__tests__/vertical.test.ts
      count: 1
    - path: packages/workspace/__tests__/agent-runtime-harness.test.ts
      count: 1
    - path: packages/workspace/__tests__/harness-session.test.ts
      count: 1
    - path: apps/api/__tests__/agent-harness-routes.test.ts
      count: 1
  screenshots: []
  walkthroughs: []

maturity:
  architecture: accepted
  implementation: partial
  verification: partial

known-gaps:
  - Streaming not implemented
  - Concurrent tool execution not implemented
  - Durable execution sessions partially implemented
  - Cross-provider verification not implemented
  - Correlation envelope not implemented

future-adrs:
  - "ADR for streaming inference"
  - "ADR for durable execution sessions"
```

### 2. Capability System

```yaml
domain: capability-system
title: Capability System
owner: "@ai-engineer"

purpose:
  statement: "Permission-gated execution boundary that governs agent access to resources, with approval gates, audit events, and structured observations."
  canonical-document: "00-governance/adr/ADR-116-capability-system.md"
  core-document: "docs/ADR/ADR-002-capability-system.md"

architecture:
  current: >
    AgentCapabilityManager executes filesystem capabilities with permission
    gates, approval flows, deny-list enforcement, and structured FsObservation
    recording. 12 filesystem capabilities mapped to (resource, action) tuples.
  target: >
    Expanded capability domains beyond filesystem: network, database, process,
    service-to-service. Capability versioning and evolution. Dynamic capability
    registration.
  constraints:
    - Capability request must pass permission check before execution
    - Approval required for destructive operations
    - All capability executions produce audit events
    - Capability registry is the single source of truth
  adr:
    accepted:
      - "ADR-116"
      - "ADR-025"
      - "ADR-033"
      - "ADR-034"
    proposed: []

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: workspace (agent-capability-manager)
      path: packages/workspace/src/agent-capability-manager.ts
      status: implemented
    - name: workspace (agent-capability)
      path: packages/workspace/src/agent-capability.ts
      status: implemented
    - name: workspace (capability-tool-provider)
      path: packages/workspace/src/capability-tool-provider.ts
      status: implemented
  routes:
    - POST /api/agents/:id/capabilities
  commands: []
  surfaces:
    - Agent capability list in Agents page

evidence:
  verification:
    run-id: "verification-eb3fd3d-002"
    date: "2026-08-02"
    status: passed
    commands:
      - pnpm test -- packages/workspace/__tests__/agent-capability.test.ts
  tests:
    - path: packages/workspace/__tests__/agent-capability.test.ts
      count: 43
  screenshots: []
  walkthroughs: []

maturity:
  architecture: accepted
  implementation: implemented
  verification: verified

known-gaps:
  - Only filesystem capabilities implemented
  - No capability versioning
  - No dynamic capability registration
  - Capability catalog not yet machine-readable

future-adrs:
  - "ADR for capability versioning and evolution"
  - "ADR for non-filesystem capability domains"
```

### 3. Filesystem Runtime

```yaml
domain: filesystem-runtime
title: Filesystem Runtime
owner: "@backend-engineer"

purpose:
  statement: "Sandboxed, approval-gated filesystem executor with path containment, deny-list, dry-run, operation history, and structured observations."
  canonical-document: "00-governance/adr/ADR-117-filesystem-runtime.md"
  core-document: "docs/ADR/ADR-003-filesystem-runtime.md"

architecture:
  current: >
    FilesystemRuntime provides read/write/update/delete/copy/stat with path
    traversal protection, deny-list enforcement, dry-run mode, bounded
    operation history, and FsObservation results. 25 tests passing.
  target: >
    Recursive directory operations, file locking, concurrent access
    management, integration with Engineering Event Store for mutation tracking.
  constraints:
    - All paths resolved relative to workspace root
    - Path traversal outside root is rejected
    - Deny-list files (.env, credentials.json) are rejected
    - Dry-run mode produces no mutations
    - All operations produce FsObservation records
  adr:
    accepted:
      - "ADR-117"
    proposed: []

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: filesystem-runtime
      path: packages/filesystem-runtime
      status: implemented
  routes: []
  commands: []
  surfaces: []

evidence:
  verification:
    run-id: "verification-eb3fd3d-003"
    date: "2026-08-02"
    status: passed
    commands:
      - pnpm test -- packages/filesystem-runtime
  tests:
    - path: packages/filesystem-runtime/__tests__/filesystem-runtime.test.ts
      count: 25
  screenshots: []
  walkthroughs: []

maturity:
  architecture: accepted
  implementation: implemented
  verification: verified

known-gaps:
  - No recursive directory operations
  - No file locking
  - No concurrent access management
  - No Engineering Event Store integration for mutations

future-adrs:
  - "ADR for file locking and concurrent access"
  - "ADR for filesystem event integration"
```

### 4. Engineering Graph

```yaml
domain: engineering-graph
title: Engineering Graph
owner: "@backend-engineer"

purpose:
  statement: "Temporal knowledge graph of engineering entities, relationships, and their evolution over time. Provides search, insights, health, and graph snapshots."
  canonical-document: "00-governance/adr/ADR-105-event-sourced-engineering-graph.md"
  core-document: "docs/Architecture/Agent-Orchestration.md"

architecture:
  current: >
    Snapshot graph with entities, relationships, backlinks, search, insights,
    and health. Temporal event store with append, state-at, diff, replay,
    and checkpoints. Graph UI with inspector, diagnostics, and execution center.
  target: >
    Full temporal engineering graph with causal envelopes, screenshot evidence,
    cross-session reconstruction, and graph consumption by agents for planning.
  constraints:
    - Graph is derived from event store, not authored directly
    - Entities have exactly one producer per semantic field
    - Graph snapshots are immutable
    - Temporal reconstruction requires complete event history
  adr:
    accepted:
      - "ADR-105"
    proposed: []

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: engineering-event-store
      path: packages/engineering-event-store
      status: implemented
    - name: workspace (graph queries)
      path: packages/workspace/src
      status: implemented
  routes: []
  commands: []
  surfaces:
    - Engineering Graph Inspector
    - Diagnostics Center

evidence:
  verification:
    run-id: "verification-eb3fd3d-004"
    date: "2026-08-02"
    status: passed
    commands:
      - pnpm test -- packages/engineering-event-store
  tests:
    - path: packages/engineering-event-store/__tests__
      count: 1
  screenshots: []
  walkthroughs: []

maturity:
  architecture: accepted
  implementation: implemented
  verification: verified

known-gaps:
  - Event store is memory-resident (no durable persistence)
  - No causal envelope in events
  - No screenshot evidence integration
  - Graph not yet consumed by agents for planning

future-adrs:
  - "ADR for durable event persistence"
  - "ADR for causal envelope specification"
  - "ADR for agent graph consumption"
```

### 5. Provider Architecture

```yaml
domain: provider-architecture
title: Provider Architecture
owner: "@ai-engineer"

purpose:
  statement: "Provider-neutral routing layer that separates provider definition, adapter, and instance. Supports health-aware routing, fallback boundaries, and governed task assignments."
  canonical-document: "00-governance/adr/ADR-106-provider-neutral-engineering-provider-runtime.md"
  core-document: "docs/Architecture/Provider-Routing.md"

architecture:
  current: >
    Provider-neutral domain with named routing profiles, health-aware
    candidate resolution, versioned routing state, governed task assignments,
    side-effect-aware reassignment, and API/CLI/Workspace UI surfaces.
  target: >
    Installable provider packages, OpenAI Codex adapter, Claude Code adapter,
    cross-provider verification, provider-scoped trust scores.
  constraints:
    - Provider definition, adapter, and instance are separate concepts
    - Provider never owns permissions, history, intent, or evidence
    - Health state determines routing eligibility
    - Side-effect-aware reassignment prevents duplicate mutations
  adr:
    accepted:
      - "ADR-106"
      - "ADR-014"
    proposed: []

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: kernel (provider orchestration)
      path: packages/kernel
      status: implemented
  routes: []
  commands: []
  surfaces:
    - Provider management in Agents page
    - Settings provider configuration

evidence:
  verification:
    run-id: "verification-eb3fd3d-005"
    date: "2026-08-02"
    status: passed
    commands:
      - pnpm test -- packages/kernel
  tests:
    - path: packages/kernel/__tests__
      count: 1
  screenshots: []
  walkthroughs: []

maturity:
  architecture: accepted
  implementation: implemented
  verification: verified

known-gaps:
  - No installable provider packages
  - No OpenAI Codex adapter
  - No Claude Code adapter
  - No cross-provider verification
  - No provider-scoped trust scores

future-adrs:
  - "ADR for installable provider packages"
  - "ADR for cross-provider verification"
```

### 7. Agent Type Selection

```yaml
domain: agent-type-selection
title: Agent Type Selection — Workspace vs Registry
owner: "@ai-engineer"

purpose:
  statement: "Distinguish between workspace-created agents and marketplace-installed agents with type-specific configuration and lifecycle management."
  canonical-document: "00-governance/adr/ADR-119-agent-type-selection.md"
  core-document: "00-governance/adr/ADR-119-agent-type-selection.md"

architecture:
  current: >
    AgentDefinition includes an agentType field ('workspace' | 'registry') that
    distinguishes local agents from marketplace-installed agents. The Agent
    Registry Modal provides a radio selector for type, with conditional fields
    for registry agents (source, version). All built-in agents default to workspace type.
  target: >
    Registry agents will have version tracking, update notifications, and
    automatic lifecycle management via marketplace integration. Workspace agents
    remain fully local.
  constraints:
    - agentType field is required on AgentDefinition
    - Default value is 'workspace' for backward compatibility
    - Registry agents require source and version fields
    - Workspace agents use provider/model from local configuration
  adr:
    accepted:
      - "ADR-119"
      - "ADR-116"
    proposed: []

implementation:
  repository: evillan0315/vestara-ai-core
  packages:
    - name: workspace (types)
      path: packages/workspace/src/types.ts
      status: implemented
    - name: workspace (agent-storage)
      path: packages/workspace/src/agent-storage.ts
      status: implemented
  ui:
    - name: AgentRegistryModal
      path: apps/workspace/src/pages/Agents/AgentRegistryModal.tsx
      status: implemented
  routes:
    - POST /api/agents
    - PUT /api/agents/:id
  commands: []
  surfaces:
    - Agent type selector in Agent Registry Modal
    - Agent type displayed in agent list (future)

evidence:
  verification:
    run-id: "verification-pending"
    date: "2026-08-02"
    status: pending
    commands:
      - pnpm test -- packages/workspace
  tests: []
  screenshots: []
  walkthroughs: []

maturity:
  architecture: accepted
  implementation: implemented
  verification: pending

known-gaps:
  - No agent type filter in agent list UI
  - No marketplace integration for auto-setting registry type
  - No version tracking for registry agents
  - No update notifications for registry agents

future-adrs:
  - "ADR for registry agent version tracking"
  - "ADR for marketplace auto-install integration"
```
