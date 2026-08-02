# Document Registry

## Purpose

Canonical registry of all architecture-level documents across both repositories.
Each document declares its authority layer, canonicality, and supersession
relationships. Only one document may be canonical for a specific architectural
concern.

## Registry

### Purpose layer

| ID | Title | Repository | Path | Authority | Canonical |
|----|-------|------------|------|-----------|-----------|
| purpose-natural-laws | Natural Laws | blueprint | `00-governance/01-ai-constitution.md` (section) | purpose | yes |
| purpose-vestara-principle | The Vestara Principle | blueprint | `00-governance/01-ai-constitution.md` (section) | purpose | yes |

### Governance layer

| ID | Title | Repository | Path | Authority | Canonical |
|----|-------|------------|------|-----------|-----------|
| governance-constitution | AI Constitution | blueprint | `00-governance/01-ai-constitution.md` | governance | yes |
| governance-engineering-rules | Engineering Rules | blueprint | `00-governance/02-engineering-rules.md` | governance | yes |
| governance-aidl | AI Development Lifecycle | blueprint | `00-governance/03-ai-development-lifecycle.md` | governance | yes |
| governance-decision-log | Architectural Decision Log | blueprint | `00-governance/04-decision-log.md` | governance | yes |
| governance-compatibility | Agent Compatibility | blueprint | `00-governance/05-compatibility.md` | governance | yes |

### Architecture layer

| ID | Title | Repository | Path | Authority | Canonical | Supersedes |
|----|-------|------------|------|-----------|-----------|------------|
| arch-engineering-os | Engineering Operating System | blueprint | `04-platform/engineering-operating-system.md` | architecture | yes | `04-platform/01-platform-overview.md` |
| arch-agent-harness | Agent Harness Runtime | blueprint | `04-platform/agent-harness-architecture.md` | architecture | yes | — |
| arch-capability-system | Capability System | blueprint | `00-governance/adr/ADR-116-capability-system.md` | architecture | yes | — |
| arch-filesystem-runtime | Filesystem Runtime | blueprint | `00-governance/adr/ADR-117-filesystem-runtime.md` | architecture | yes | — |
| arch-multi-agent | Multi-Agent Workflow | blueprint | `00-governance/adr/ADR-118-multi-agent-workflow-orchestration.md` | architecture | yes | — |
| arch-event-store | Engineering Event Store | blueprint | `00-governance/adr/ADR-105-event-sourced-engineering-graph.md` | architecture | yes | — |
| arch-provider-routing | Provider-Neutral Routing | blueprint | `00-governance/adr/ADR-106-provider-neutral-engineering-provider-runtime.md` | architecture | yes | — |
| arch-extension-platform | Extension Platform | blueprint | `00-governance/adr/ADR-112-extension-platform-and-local-package-manager.md` | architecture | yes | — |
| arch-marketplace | Marketplace Foundation | blueprint | `00-governance/adr/ADR-115-marketplace-foundation-and-workspace-experience.md` | architecture | yes | — |
| arch-tui | Native TUI | blueprint | `00-governance/adr/ADR-113-native-tui-as-canonical-interactive-interface.md` | architecture | yes | — |
| arch-host-runtime | OS-0 Host Integration | blueprint | `00-governance/adr/ADR-114-linux-host-integration-foundation.md` | architecture | yes | — |

### Implementation layer (vestara-ai-core)

| ID | Title | Repository | Path | Authority | Canonical |
|----|-------|------------|------|-----------|-----------|
| impl-architecture-agent-orchestration | Agent Orchestration | core | `docs/Architecture/Agent-Orchestration.md` | implementation | yes |
| impl-architecture-engineering-os | Engineering OS | core | `docs/Architecture/Engineering-OS.md` | implementation | yes |
| impl-adr-001-runtime | Runtime ADR | core | `docs/ADR/ADR-001-runtime.md` | implementation | yes |
| impl-adr-002-capability | Capability System ADR | core | `docs/ADR/ADR-002-capability-system.md` | implementation | yes |
| impl-adr-003-filesystem | Filesystem Runtime ADR | core | `docs/ADR/ADR-003-filesystem-runtime.md` | implementation | yes |
| impl-adr-004-multi-agent | Multi-Agent Workflow ADR | core | `docs/ADR/ADR-004-multi-agent-workflow.md` | implementation | yes |
| impl-pcs-024 | Agent Filesystem Capabilities | core | `docs/PCS-024-agent-filesystem-capabilities.md` | implementation | yes |
| impl-pcs-025 | Multi-Agent Project Management | core | `docs/PCS-025-multi-agent-project-management.md` | implementation | yes |
| impl-pcs-026 | Engineering Evidence Pipeline | core | `docs/PCS-026-engineering-evidence-pipeline.md` | implementation | yes |
| impl-pcs-027 | Distributed Worker Cluster | core | `docs/PCS-027-distributed-worker-cluster.md` | implementation | yes |

### Evidence layer

| ID | Title | Repository | Path | Authority | Canonical |
|----|-------|------------|------|-----------|-----------|
| evidence-maturity-matrix | Capability Maturity Matrix | blueprint | `99-appendix/capability-maturity-matrix.md` | evidence | yes |
| evidence-implementation-alignment | Implementation Alignment | blueprint | `99-appendix/implementation-alignment.md` | evidence | yes |
| evidence-commit-map | Commit-to-Capability Map | blueprint | `99-appendix/commit-capability-map.md` | evidence | yes |

## Supersession rules

1. Only one document may be canonical for a specific architectural concern.
2. Superseded documents must have `supersededBy` pointing to the canonical document.
3. The canonical document must have `supersedes` listing replaced documents.
4. Historical documents retain their content but lose canonical authority.
5. Generated documents are never canonical — they reflect canonical sources.

## Authority layer precedence

When documents conflict, authority layers resolve:

```text
purpose > governance > architecture > delivery > implementation > operations > evidence > reference > historical
```
