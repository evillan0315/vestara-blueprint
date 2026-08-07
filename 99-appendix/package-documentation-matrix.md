---
title: "Package Documentation Matrix"
---

# Package Documentation Matrix

## Purpose

Auto-derived from `package.json` manifests. Each package declares its purpose,
public exports, dependencies, and architecture reference. Humans edit only
rationale, examples, and caveats.

## Schema

```yaml
package: "@vestara/<name>"
description: <from package.json>
path: packages/<name>
purpose: <one-sentence purpose>
architecture-ref: <canonical architecture document>
maturity: implemented | partial | not-started
verification: verified | partial | unverified
dependencies: [<list of @vestara/* deps>]
exports: [<public exports>]
tests:
  path: packages/<name>/__tests__
  count: <number>
gaps: []
```

## Registry

### Core Infrastructure

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/types` | Immutable domain contracts, branded IDs, shared value types | ADR-004 | implemented | verified |
| `@vestara/shared` | Shared utilities and base classes | — | implemented | verified |
| `@vestara/logger` | Structured logging with levels | — | implemented | verified |
| `@vestara/event-bus` | In-process publish/subscribe event bus | ADR-006 | implemented | verified |
| `@vestara/configuration` | Configuration loader and file-based config source | — | implemented | verified |
| `@vestara/service-registry` | Service registration and discovery | — | implemented | verified |

### Runtime Layer

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/runtime` | Generic runtime lifecycle (state machine, health, events) | ADR-023 | implemented | verified |
| `@vestara/kernel` | Boot orchestration, service lifecycle, health, scheduling | ADR-030 | implemented | verified |
| `@vestara/subsystem` | Standard subsystem base class and directory convention | ADR-022 | implemented | verified |
| `@vestara/workspace` | Workspace runtime pipeline and product services | ADR-017 | implemented | verified |

### Agent Layer

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/agent-harness` | Durable model, tool, observation, approval, verification loop | ADR-111 | partial | partial |
| `@vestara/thread-runtime` | Durable task, thread, turn, item history for Agent Harness | ADR-111 | partial | partial |
| `@vestara/tool-runtime` | Unified schema, policy, invocation, cancellation, evidence | — | partial | partial |
| `@vestara/action` | Permission-gated tool execution runtime | ADR-034 | implemented | verified |
| `@vestara/worker` | Worker abstraction — execution endpoint with capability advertisement | ADR-025 | implemented | verified |
| `@vestara/job` | Job model — standard operation lifecycle | ADR-024 | implemented | verified |

### Capability and Permission Layer

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/capabilities` | Canonical capability taxonomy, matching, catalog | ADR-033 | implemented | verified |
| `@vestara/permission` | Permission model — role-based access control | ADR-034 | implemented | verified |
| `@vestara/policy-types` | Pure policy contracts — PolicyDefinition, PolicyCondition, PolicyAction | ADR-036 | implemented | verified |
| `@vestara/policy-engine` | Policy evaluation engine — condition trees, conflict resolution | ADR-036 | implemented | verified |

### Filesystem and Storage

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/filesystem-runtime` | Sandboxed, approval-gated filesystem executor | ADR-117 | implemented | verified |
| `@vestara/worktree-runtime` | Durable Git worktree leases and file ownership | — | not-started | unverified |

### Engineering Graph and Events

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/engineering-event-store` | Durable append-only engineering truth, evidence, projections | ADR-105 | implemented | verified |
| `@vestara/engineering-graph` | Engineering knowledge graph — entities, relationships, search | ADR-105 | implemented | verified |
| `@vestara/architecture-runtime` | Architecture Knowledge Graph — parse, validate, query ADRs | — | implemented | verified |
| `@vestara/telemetry` | Unified event stream for agent observability | — | implemented | verified |
| `@vestara/activity-log` | Domain activity log with SQLite persistence and event streaming | — | implemented | verified |

### Verification and Trust

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/verification` | Composable verification pipeline — evaluate outcomes against criteria | ADR-035 | implemented | verified |
| `@vestara/trust` | Trust Engine — probabilistic trust from verification outcomes | ADR-037 | implemented | verified |

### Conversation and Understanding

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/conversation` | Conversation service with in-memory message store | — | implemented | verified |
| `@vestara/conversation-runtime` | Conversation engine with user profile enrichment | — | implemented | verified |
| `@vestara/context` | Context assembler with system prompt and message window | — | implemented | verified |
| `@vestara/memory` | Short-term, long-term, episodic memory with consolidation | — | implemented | verified |
| `@vestara/knowledge` | RAG pipeline with FTS + vector search | — | implemented | verified |
| `@vestara/understanding` | Workspace observation, understanding, planning context | ADR-043 | implemented | verified |
| `@vestara/cognitive` | Five-stage cognitive pipeline: perception through action | — | implemented | verified |

### UI Layer

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/tui` | Native full-screen terminal presentation runtime | ADR-113 | implemented | verified |
| `@vestara/tui-protocol` | TUI protocol types and message format | ADR-113 | implemented | verified |
| `@vestara/tui-projections` | TUI projections from event store and thread runtime | ADR-113 | implemented | verified |
| `@vestara/widget-runtime` | Widget manifest system, lifecycle, Dashboard Runtime | ADR-021 | implemented | verified |
| `@vestara/diff-engine` | Diff engine for TUI rendering | — | implemented | verified |

### Extension and Marketplace

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/extension-contracts` | Extension contracts — manifest, permissions, lifecycle | ADR-112 | implemented | verified |
| `@vestara/extension-runtime` | Extension install, rollback, permissions lifecycle | ADR-112 | implemented | verified |
| `@vestara/marketplace` | Marketplace catalog, local registry, search, resolution | ADR-115 | implemented | verified |

### Audio and Voice

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/audio` | Audio capture and Voice Activity Detection (VAD) | — | implemented | verified |
| `@vestara/stt` | Speech-to-Text abstraction | — | implemented | verified |
| `@vestara/tts` | Text-to-Speech abstraction with Piper support | — | implemented | verified |

### OS and Boot

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/boot-runtime` | Durable boot-stage coordination and recovery state | ADR-114 | implemented | verified |
| `@vestara/host-runtime` | OS-0 host observation — read-only Linux host inspection | ADR-114 | implemented | verified |

### Documentation

| Package | Description | Architecture | Maturity | Verification |
|---------|-------------|--------------|----------|--------------|
| `@vestara/documentation` | Documentation center — browsing and search | — | implemented | verified |

## Missing READMEs

The following packages lack a dedicated README:

| Package | Priority |
|---------|----------|
| `@vestara/agent-harness` | high |
| `@vestara/thread-runtime` | high |
| `@vestara/tool-runtime` | high |
| `@vestara/filesystem-runtime` | high |
| `@vestara/engineering-event-store` | high |
| `@vestara/engineering-graph` | high |
| `@vestara/capabilities` | high |
| `@vestara/policy-types` | medium |
| `@vestara/policy-engine` | medium |
| `@vestara/verification` | medium |
| `@vestara/trust` | medium |
| `@vestara/understanding` | medium |
| `@vestara/extension-contracts` | medium |
| `@vestara/extension-runtime` | medium |
| `@vestara/marketplace` | medium |
