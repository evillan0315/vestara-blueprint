# Capability Catalog

## Purpose

The central registry of every Vestara capability. Every commit map entry,
document registry entry, maturity matrix row, and evidence record points
**to** a capability in this catalog. It is the hub of the engineering
knowledge graph.

```text
Commits         ↘
Architecture     ↘
                  Capabilities (this catalog)
Documents       ↗
Evidence        ↗
```

## Schema

```yaml
id: capability.<domain>.<name>
version: <semver>
title: Human-readable name
owner: "@role or package"
status: proposed | accepted | implemented | verified | operationally-proven

introduced:
  adr: "ADR-XXX"
  commit: "<sha>"
  date: "YYYY-MM-DD"

implemented:
  repository: evillan0315/vestara-ai-core
  packages:
    - packages/<name>
  paths:
    - src/<path>

verification:
  runId: "verification-<sha>-<seq>"
  commands:
    - pnpm test -- <path>
  evidence:
    - type: test
      reference: packages/<name>/__tests__

maturity:
  architecture: accepted | proposed
  implementation: implemented | partial | not-started
  verification: verified | partial | unverified

# Relationships — the dependency graph
depends_on: []        # capabilities this one requires
required_by: []       # capabilities that require this one
produces: []          # artifacts this capability creates
consumes: []          # artifacts this capability reads
emits: []             # events this capability emits
reads: []             # data stores this capability reads
writes: []            # data stores this capability writes

documents:
  blueprint:
    - 00-governance/adr/ADR-XXX-<name>.md
  core:
    - docs/Architecture/<Name>.md
    - docs/ADR/ADR-XXX-<name>.md

history:
  - commit: "<sha>"
    date: "YYYY-MM-DD"
    change: "<description>"

gaps: []
future-adr: null
```

## Relationship types

| Relation | Meaning | Example |
|----------|---------|---------|
| `depends_on` | This capability requires another to function | `filesystem.write` depends on `policy.approval` |
| `required_by` | Other capabilities that depend on this one | `filesystem.read` is required by `code-generation` |
| `produces` | Artifacts this capability creates | `filesystem.write` produces `FsObservation` |
| `consumes` | Artifacts this capability reads | `verification` consumes `ExecutionResult` |
| `emits` | Events this capability emits to the event bus | `filesystem.write` emits `filesystem.operation` |
| `reads` | Data stores this capability reads from | `graph.search` reads from `engineering-graph` |
| `writes` | Data stores this capability writes to | `filesystem.write` writes to `repository` |

## Catalog

### Core Runtime

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.runtime.workspace` | 1.0.0 | WorkspaceRuntime | implemented | accepted | implemented | verified |
| `capability.runtime.kernel` | 1.0.0 | Kernel | implemented | accepted | implemented | verified |
| `capability.runtime.agent` | 1.0.0 | AgentRuntime | implemented | accepted | implemented | verified |

### Agent Harness

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.harness.foundation` | 0.3.0 | AgentHarness | implemented | accepted | partial | partial |
| `capability.harness.turn-lifecycle` | 0.2.0 | AgentHarness | proposed | accepted | partial | partial |
| `capability.harness.tool-execution` | 0.2.0 | AgentHarness | proposed | accepted | partial | partial |
| `capability.harness.approval-gate` | 0.2.0 | AgentHarness | proposed | accepted | partial | partial |
| `capability.harness.steer` | 0.1.0 | AgentHarness | proposed | accepted | not-started | unverified |
| `capability.harness.durable-thread` | 0.2.0 | AgentHarness | proposed | accepted | partial | partial |

### Capability System

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.system.permission-gate` | 1.0.0 | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.filesystem` | 1.0.0 | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.approval-flow` | 1.0.0 | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.audit` | 1.0.0 | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.registry` | 0.1.0 | AgentCapabilityManager | proposed | accepted | partial | partial |

### Filesystem Runtime

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.filesystem.read` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.write` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.update` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.delete` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.copy` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.stat` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.sandbox` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.deny-list` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.dry-run` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.history` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.observation` | 1.0.0 | FilesystemRuntime | implemented | accepted | implemented | verified |

### Engineering Graph

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.graph.entities` | 1.0.0 | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.relationships` | 1.0.0 | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.backlinks` | 1.0.0 | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.search` | 1.0.0 | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.insights` | 1.0.0 | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.health` | 1.0.0 | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.temporal` | 0.1.0 | EngineeringGraph | proposed | accepted | partial | partial |
| `capability.graph.replay` | 0.1.0 | EngineeringGraph | proposed | accepted | not-started | unverified |

### Event Store

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.event-store.append` | 1.0.0 | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.state-at` | 1.0.0 | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.diff` | 1.0.0 | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.replay` | 1.0.0 | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.checkpoint` | 1.0.0 | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.persistence` | 0.1.0 | EngineeringEventStore | proposed | proposed | not-started | unverified |

### Provider Architecture

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.provider.definition` | 1.0.0 | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.adapter` | 1.0.0 | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.instance` | 1.0.0 | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.routing` | 1.0.0 | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.fallback` | 1.0.0 | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.installable` | 0.1.0 | ProviderRouter | proposed | proposed | not-started | unverified |

### Extension Platform

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.extension.contracts` | 1.0.0 | ExtensionRuntime | implemented | accepted | implemented | verified |
| `capability.extension.local-pkg` | 1.0.0 | ExtensionRuntime | implemented | accepted | implemented | verified |
| `capability.extension.marketplace` | 1.0.0 | Marketplace | implemented | accepted | implemented | verified |
| `capability.extension.install` | 1.0.0 | Marketplace | implemented | accepted | implemented | verified |
| `capability.extension.remote-registry` | 0.1.0 | Marketplace | proposed | proposed | not-started | unverified |
| `capability.extension.publishing` | 0.1.0 | Marketplace | proposed | proposed | not-started | unverified |

### Host and Boot Runtime

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.os-0.host-observation` | 1.0.0 | OS-0 | implemented | accepted | implemented | verified |
| `capability.os-0.boot-runtime` | 1.0.0 | OS-0 | implemented | accepted | implemented | verified |
| `capability.os-0.systemd` | 1.0.0 | OS-0 | implemented | accepted | implemented | verified |
| `capability.os-0.installer` | 0.1.0 | OS-0 | proposed | proposed | not-started | unverified |
| `capability.os-0.iso` | 0.1.0 | OS-0 | proposed | proposed | not-started | unverified |
| `capability.os-0.immutable-ab` | 0.1.0 | OS-0 | proposed | proposed | not-started | unverified |
| `capability.os-0.secure-boot` | 0.1.0 | OS-0 | proposed | accepted-target | not-started | unverified |

### UI Surfaces

| ID | Version | Owner | Status | Arch | Impl | Verify |
|----|---------|-------|--------|------|------|--------|
| `capability.ui.workspace` | 1.0.0 | WorkspaceUI | implemented | accepted | implemented | verified |
| `capability.ui.tui` | 1.0.0 | TUI | implemented | accepted | implemented | verified |
| `capability.ui.cli` | 1.0.0 | CLI | implemented | accepted | implemented | verified |
| `capability.ui.inspector` | 1.0.0 | WorkspaceUI | implemented | accepted | implemented | verified |
| `capability.ui.execution-center` | 0.3.0 | WorkspaceUI | implemented | accepted | partial | partial |
| `capability.ui.diagnostic-center` | 1.0.0 | WorkspaceUI | implemented | accepted | implemented | verified |
| `capability.ui.marketplace-ui` | 1.0.0 | WorkspaceUI | implemented | accepted | implemented | verified |

## Dependency graph (key relationships)

### Filesystem write — full relationship map

```yaml
id: capability.filesystem.write
version: 1.0.0
owner: FilesystemRuntime
status: implemented

depends_on:
  - capability.filesystem.read
  - capability.filesystem.sandbox
  - capability.filesystem.deny-list
  - capability.system.permission-gate
  - capability.system.approval-flow

required_by:
  - capability.harness.tool-execution

produces:
  - FsObservation
  - engineering-event

consumes:
  - AgentCapabilityInput
  - FilePatch

emits:
  - filesystem.operation
  - capability.executed

reads:
  - repository

writes:
  - repository
  - engineering-event-store

documents:
  blueprint:
    - 00-governance/adr/ADR-117-filesystem-runtime.md
  core:
    - docs/ADR/ADR-003-filesystem-runtime.md

history:
  - commit: eb3fd3d
    date: 2026-08-02
    change: "Initial implementation with 25 tests"
```

### Agent Harness — full relationship map

```yaml
id: capability.harness.foundation
version: 0.3.0
owner: AgentHarness
status: implemented

depends_on:
  - capability.runtime.agent
  - capability.system.permission-gate
  - capability.system.filesystem
  - capability.provider.routing
  - capability.graph.entities

required_by:
  - capability.ui.execution-center

produces:
  - ExecutionResult
  - VerificationOutcome
  - TrustRecord

consumes:
  - AgentDefinition
  - ToolCall
  - CapabilityRequest

emits:
  - harness.turn.started
  - harness.turn.completed
  - harness.tool.invoked
  - harness.verification.completed

reads:
  - agent-definitions
  - capability-catalog

writes:
  - thread-runtime
  - engineering-event-store

documents:
  blueprint:
    - 04-platform/agent-harness-architecture.md
  core:
    - docs/Architecture/Agent-Orchestration.md
    - docs/ADR/ADR-001-runtime.md

history:
  - commit: 4a76027
    date: 2026-08-01
    change: "Agent Harness foundation"
  - commit: eb3fd3d
    date: 2026-08-02
    change: "Integration with WorkspaceRuntime"
```

### Capability System — full relationship map

```yaml
id: capability.system.permission-gate
version: 1.0.0
owner: AgentCapabilityManager
status: implemented

depends_on:
  - capability.runtime.agent

required_by:
  - capability.filesystem.read
  - capability.filesystem.write
  - capability.filesystem.update
  - capability.filesystem.delete
  - capability.harness.tool-execution

produces:
  - PermissionResult
  - AuditEvent

consumes:
  - AgentDefinition
  - CapabilityRequest

emits:
  - capability.requested
  - capability.granted
  - capability.denied

reads:
  - agent-definitions
  - permission-model

writes:
  - audit-log

documents:
  blueprint:
    - 00-governance/adr/ADR-116-capability-system.md
  core:
    - docs/ADR/ADR-002-capability-system.md

history:
  - commit: eb3fd3d
    date: 2026-08-02
    change: "12 filesystem capabilities, 43 tests"
```
