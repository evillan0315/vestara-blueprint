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
title: Human-readable name
owner: "@role or package"
status: proposed | accepted | implemented | verified | operationally-proven

introduced:
  adr: "ADR-XXX"
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

dependencies:
  - capability.<domain>.<name>

used-by:
  - agent.<name>

documents:
  blueprint:
    - 00-governance/adr/ADR-XXX-<name>.md
  core:
    - docs/Architecture/<Name>.md
    - docs/ADR/ADR-XXX-<name>.md

gaps: []
future-adr: null
```

## Catalog

### Core Runtime

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.runtime.workspace` | Workspace Runtime | WorkspaceRuntime | implemented | accepted | implemented | verified |
| `capability.runtime.kernel` | Kernel | Kernel | implemented | accepted | implemented | verified |
| `capability.runtime.agent` | Agent Runtime | AgentRuntime | implemented | accepted | implemented | verified |

### Agent Harness

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.harness.foundation` | Agent Harness Foundation | AgentHarness | implemented | accepted | partial | partial |
| `capability.harness.turn-lifecycle` | Turn Lifecycle | AgentHarness | proposed | accepted | partial | partial |
| `capability.harness.tool-execution` | Tool Execution | AgentHarness | proposed | accepted | partial | partial |
| `capability.harness.approval-gate` | Approval Gate | AgentHarness | proposed | accepted | partial | partial |
| `capability.harness.steer` | Steering and Interruption | AgentHarness | proposed | accepted | not-started | unverified |
| `capability.harness.durable-thread` | Durable Thread | AgentHarness | proposed | accepted | partial | partial |

### Capability System

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.system.permission-gate` | Permission-Gated Access | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.filesystem` | Filesystem Capabilities | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.approval-flow` | Approval Flow | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.audit` | Audit Events | AgentCapabilityManager | implemented | accepted | implemented | verified |
| `capability.system.registry` | Capability Registry | AgentCapabilityManager | proposed | accepted | partial | partial |

### Filesystem Runtime

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.filesystem.read` | File Read | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.write` | File Write | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.update` | File Update (Patch) | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.delete` | File Delete | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.copy` | File Copy | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.stat` | File Stat | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.sandbox` | Path Containment | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.deny-list` | Deny List | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.dry-run` | Dry Run | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.history` | Operation History | FilesystemRuntime | implemented | accepted | implemented | verified |
| `capability.filesystem.observation` | Structured Observations | FilesystemRuntime | implemented | accepted | implemented | verified |

### Engineering Graph

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.graph.entities` | Entity Registry | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.relationships` | Relationship Edges | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.backlinks` | Backlink Resolution | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.search` | Graph Search | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.insights` | Graph Insights | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.health` | Graph Health | EngineeringGraph | implemented | accepted | implemented | verified |
| `capability.graph.temporal` | Temporal Snapshot | EngineeringGraph | proposed | accepted | partial | partial |
| `capability.graph.replay` | Event Replay | EngineeringGraph | proposed | accepted | not-started | unverified |

### Event Store

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.event-store.append` | Append Events | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.state-at` | State-at-Time | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.diff` | State Diff | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.replay` | Event Replay | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.checkpoint` | Checkpoints | EngineeringEventStore | implemented | accepted | implemented | verified |
| `capability.event-store.persistence` | Durable Persistence | EngineeringEventStore | proposed | proposed | not-started | unverified |

### Provider Architecture

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.provider.definition` | Provider Definition | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.adapter` | Provider Adapter | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.instance` | Provider Instance | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.routing` | Health-Aware Routing | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.fallback` | Fallback Boundaries | ProviderRouter | implemented | accepted | implemented | verified |
| `capability.provider.installable` | Installable Packages | ProviderRouter | proposed | proposed | not-started | unverified |

### Extension Platform

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.extension.contracts` | Extension Contracts | ExtensionRuntime | implemented | accepted | implemented | verified |
| `capability.extension.local-pkg` | Local Package Manager | ExtensionRuntime | implemented | accepted | implemented | verified |
| `capability.extension.marketplace` | Marketplace Catalog | Marketplace | implemented | accepted | implemented | verified |
| `capability.extension.install` | Install Orchestration | Marketplace | implemented | accepted | implemented | verified |
| `capability.extension.remote-registry` | Remote Registries | Marketplace | proposed | proposed | not-started | unverified |
| `capability.extension.publishing` | Publishing | Marketplace | proposed | proposed | not-started | unverified |

### Host and Boot Runtime

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.os-0.host-observation` | Host Observation | OS-0 | implemented | accepted | implemented | verified |
| `capability.os-0.boot-runtime` | Boot Runtime | OS-0 | implemented | accepted | implemented | verified |
| `capability.os-0.systemd` | systemd Integration | OS-0 | implemented | accepted | implemented | verified |
| `capability.os-0.installer` | Installer | OS-0 | proposed | proposed | not-started | unverified |
| `capability.os-0.iso` | Bootable ISO | OS-0 | proposed | proposed | not-started | unverified |
| `capability.os-0.immutable-ab` | Immutable A/B Updates | OS-0 | proposed | proposed | not-started | unverified |
| `capability.os-0.secure-boot` | Secure Boot | OS-0 | proposed | accepted-target | not-started | unverified |

### UI Surfaces

| ID | Title | Owner | Status | Architecture | Implementation | Verification |
|----|-------|-------|--------|--------------|----------------|--------------|
| `capability.ui.workspace` | Workspace UI | WorkspaceUI | implemented | accepted | implemented | verified |
| `capability.ui.tui` | Native TUI | TUI | implemented | accepted | implemented | verified |
| `capability.ui.cli` | CLI | CLI | implemented | accepted | implemented | verified |
| `capability.ui.inspector` | Inspector | WorkspaceUI | implemented | accepted | implemented | verified |
| `capability.ui.execution-center` | Execution Center | WorkspaceUI | implemented | accepted | partial | partial |
| `capability.ui.diagnostic-center` | Diagnostic Center | WorkspaceUI | implemented | accepted | implemented | verified |
| `capability.ui.marketplace-ui` | Marketplace UI | WorkspaceUI | implemented | accepted | implemented | verified |
