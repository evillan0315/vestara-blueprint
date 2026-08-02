---
id: "platform-vestara-engineering-ide"
title: "Vestara Engineering IDE"
volume: "04-platform"
book: "Book 2: Platform Architecture"
version: "0.1.0"
status: "draft"
owner: "@chief-architect"
created: "2026-08-02"
last-reviewed: "2026-08-02"
next-review: "2026-11-02"
architecture-status: "proposed"
implementation-status: "not-started"
verification-status: "unverified"
canonical: true
supersedes: []
conflict-policy: "extend"
tags: ["ide", "workbench", "editor", "terminal", "agents", "verification", "engineering-os"]
---

# Vestara Engineering IDE

## Purpose

Define the architecture, layout, design direction, implementation structure, and staged delivery plan for the Vestara Engineering IDE.

The IDE uses the familiar workbench model popularized by VS Code—activity bar, primary sidebar, editor groups, secondary sidebar, bottom panel, command palette, integrated terminal, source control, and status bar—while remaining an original Vestara product centered on governed AI engineering, observable execution, verification, evidence, architecture intelligence, and the Engineering Graph.

Vestara must not become a generic editor with chat added beside it. The IDE is the interactive engineering surface of the Vestara Engineering Operating System.

---

## Product Definition

Vestara Engineering IDE combines:

- source editing;
- filesystem navigation;
- integrated terminal execution;
- source control;
- agent collaboration;
- workflow orchestration;
- capability governance;
- Engineering Graph intelligence;
- architecture awareness;
- verification;
- evidence;
- engineering history.

```text
Traditional IDE
  Editor
  Terminal
  Explorer
  Source Control
  Extensions

Vestara Engineering IDE
  Editor
  Terminal
  Explorer
  Source Control
  Extensions
  Agents
  Workflows
  Capabilities
  Engineering Graph
  Verification
  Evidence
  Architecture
  Execution History
```

The user must always be able to answer:

- What is happening now?
- Which participant is responsible?
- Which capability is being used?
- Which files are affected?
- What changed?
- What evidence exists?
- What remains unverified?
- What is blocked?
- What happens next?

---

## Design Goals

### Familiar workbench

Developers should immediately understand the activity bar, sidebar, editor area, panels, tabs, terminal, command palette, and keyboard-driven workflow.

### Engineering-centric experience

The defining experience is not editing alone. It is the complete lifecycle:

```text
Repository Files
      +
Engineering Lifecycle
      +
AI Participants
      +
Observable Execution
      +
Evidence-Backed Completion
```

### Local-first

Core editing, filesystem, terminal, Git, graph, documentation, and verification workflows must operate locally without mandatory cloud services.

### Provider-neutral

AI surfaces consume Vestara provider-routing contracts and must not assume one provider.

### Capability-governed

Agents and extensions must not mutate files, execute commands, access the network, install packages, or access secrets outside declared and evaluated capabilities.

### Evidence-first

Completion must expose changed files, commands, test inventory, screenshots, verification reports, unresolved risks, evidence bundles, responsible participants, and execution history.

---

## Workbench Layout

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Menu / Command Center / Project / Branch / Provider / Agent Status          │
├────┬──────────────────┬──────────────────────────────────┬───────────────────┤
│    │                  │                                  │                   │
│ A  │ Primary Sidebar  │ Editor Groups                    │ Secondary Sidebar │
│ c  │                  │                                  │                   │
│ t  │ Explorer         │ Source Editor                    │ Agent Inspector   │
│ i  │ Search           │ Diff Editor                      │ Capability Detail │
│ v  │ Source Control   │ Markdown Preview                 │ Evidence          │
│ i  │ Run              │ Graph View                       │ Architecture      │
│ t  │ Extensions       │ Workflow Editor                  │ Context           │
│ y  │ Agents           │                                  │                   │
│    │ Workflows        │                                  │                   │
│ B  │ Architecture     │                                  │                   │
│ a  │ Verification     │                                  │                   │
│ r  │                  │                                  │                   │
├────┴──────────────────┴──────────────────────────────────┴───────────────────┤
│ Bottom Panel: Terminal | Problems | Output | Debug | Events | Verification  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Status Bar: Branch | Sync | Runtime | Agent | Provider | Trust | Diagnostics│
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Workbench Regions

### Title Bar and Command Center

Contains:

- application menu;
- command center;
- current project and repository path;
- Git branch and sync status;
- provider selection and health;
- active workflow;
- agent activity;
- notifications;
- identity and account menu.

The command center supports file navigation, commands, capability inspection, workflow actions, verification, graph queries, and agent assignment.

### Activity Bar

Recommended entries:

1. Explorer
2. Search
3. Source Control
4. Run and Debug
5. Extensions
6. Agents
7. Workflows
8. Engineering Graph
9. Verification
10. Marketplace
11. Documentation
12. Settings

The first entries preserve editor familiarity. The remaining entries expose Vestara-native engineering capabilities.

### Primary Sidebar

The primary sidebar hosts navigation and activity-specific views such as repository files, search results, source-control state, agents, workflow tasks, architecture health, and verification summaries.

### Editor Area

The editor area supports multiple editor types:

- source editor;
- diff and merge editor;
- Markdown editor and preview;
- JSON and YAML editor;
- image viewer;
- architecture viewer;
- ADR viewer;
- workflow graph;
- Engineering Graph viewer;
- execution timeline;
- verification report;
- evidence bundle viewer;
- capability inspector;
- package inspector;
- agent session;
- terminal editor;
- browser preview.

### Secondary Sidebar

The secondary sidebar provides contextual inspection:

- agent details;
- file history;
- capability requirements;
- architecture constraints;
- related ADRs;
- evidence;
- symbols and references;
- task context;
- impact analysis;
- approval requests.

### Bottom Panel

Tabs include:

- Terminal
- Problems
- Output
- Debug Console
- Ports
- Engineering Events
- Agent Operations
- Verification
- Evidence
- Test Results
- Approvals

### Status Bar

Displays branch, synchronization, language, workspace health, active agents, provider health, capability governance, verification state, and live-event status.

---

## Core Functional Modules

### File Explorer

Features:

- repository tree;
- multi-root workspaces;
- create, rename, move, copy, and delete;
- drag and drop;
- context menus;
- active-file reveal;
- compact folders;
- Git decorations;
- agent-operation decorations;
- diagnostics badges;
- capability-governed mutations;
- file timeline;
- architecture and capability relationships.

Each file should expose who changed it, which capability and task relate to it, verification state, impact, and evidence.

### Source Editor

The initial editor should use Monaco Editor.

Required features include syntax highlighting, IntelliSense, hover, definitions, references, rename, formatting, diagnostics, minimap, breadcrumbs, folding, multiple cursors, split editors, sticky scroll, diff, code actions, keyboard shortcuts, and persistent tabs.

Vestara-specific editor features:

- agent operation presence;
- change provenance;
- architecture annotations;
- capability warnings;
- verification annotations;
- evidence gutter markers;
- task-linked file state;
- architecture-impact analysis;
- targeted verification;
- agent assignment;
- change explanation.

### Integrated Terminal

Use xterm.js and existing Vestara terminal/runtime boundaries where possible.

Features:

- terminal tabs and splits;
- shell profiles;
- command history and timestamps;
- persistent sessions;
- working-directory tracking;
- governed command execution;
- human-versus-agent attribution;
- risk classification;
- approval requirements;
- execution correlation;
- output capture as evidence;
- interruption and cancellation.

### Search

Support file-name search, full-text search, regex, include/exclude patterns, replace previews, symbols, references, graph search, and semantic architecture search.

Unified search domains:

- Files
- Text
- Symbols
- Commands
- Capabilities
- ADRs
- Executions
- Evidence
- Agents
- Documentation

### Source Control

Features:

- working-tree and staged changes;
- diffs;
- commits;
- branches;
- conflict resolution;
- hunk staging;
- history and blame;
- stash.

Vestara additions:

- map changed files to capabilities;
- map commits to workflows;
- identify required evidence;
- show affected architecture;
- detect stale documentation;
- suggest reconciliation actions;
- invalidate stale evidence after relevant changes.

### Run and Debug

Initial scope includes governed task execution, package scripts, tests, API launch, Workspace launch, and later debug-adapter integration.

### Problems and Diagnostics

Aggregate compiler, lint, build, test, architecture-validation, documentation-drift, security, capability, graph, and evidence findings with explicit origin metadata.

---

## Vestara-Specific Modules

### Agent Center

Displays available and active agents, current task, lifecycle state, provider, capabilities, files touched, latest observation, blockers, approvals, and verification state.

Agent lifecycle:

```text
Idle
Assigned
Planning
Waiting for Approval
Executing
Observing
Verifying
Blocked
Completed
Failed
Cancelled
```

### Workflow Center

Visualizes:

```text
Human Request
      ↓
Plan
      ↓
Task Graph
      ↓
Assignment
      ↓
Execution
      ↓
Verification
      ↓
Evidence
      ↓
Completion
```

Each node exposes ownership, state, dependencies, inputs, outputs, files, events, duration, retries, verification, and evidence.

### Capability Inspector

Displays capability identity, version, owner, lifecycle status, maturity, dependencies, dependents, implementations, ADRs, documents, artifacts, events, data stores, history, and known gaps.

### Engineering Graph

Supports entity, capability, dependency, file-impact, execution, workflow, architecture, and evidence graph views.

### Verification Center

Displays claims, checks, test inventory, build/lint/test/visual/accessibility results, screenshots, artifacts, unresolved risks, verifier identity, and evidence bundles.

### Evidence Viewer

Native evidence tabs:

- Summary
- Metadata
- Commands
- Tests
- Files Changed
- Screenshots
- Events
- Graph
- Confidence
- Artifacts

### Architecture Center

Displays canonical documents, ADRs, capability catalog, document registry, package matrix, architecture health, implementation alignment, maturity, and documentation drift.

### Approval Center

Centralizes approval requests for filesystem mutation, command execution, deletion, network access, credentials, installation, provider fallback, and workflow escalation.

---

## Frontend Architecture

### Application

Proposed application:

```text
apps/ide
```

Recommended stack:

- React 19;
- Vite;
- TypeScript;
- Tailwind CSS v4;
- Material icons where appropriate;
- Monaco Editor;
- xterm.js;
- React Router;
- TanStack Query;
- a small domain-focused workbench store;
- WebSocket transport;
- existing Vestara runtime clients.

The existing `apps/workspace` remains the current product surface. `apps/ide` should be introduced behind a deliberate migration boundary and may later absorb or replace Workspace after feature parity.

### Initial Package Boundaries

```text
packages/workbench
  core
  layout
  commands
  views
  editors
  services
  storage

packages/editor-runtime
packages/terminal-runtime
packages/ide-protocol
```

Do not create a package for every feature before boundaries stabilize.

### Core Contracts

The workbench requires typed contracts for views, editors, editor groups, commands, menus, keybindings, context keys, services, and persisted layout.

---

## Service Architecture

```text
Workbench
   ↓
IDE Client Services
   ↓
Vestara API / WebSocket
   ↓
Workspace Runtime
   ↓
Engineering Runtime Subsystems
```

Recommended client services:

- FileService
- EditorService
- TerminalService
- SearchService
- SourceControlService
- CommandService
- KeybindingService
- WorkspaceService
- AgentService
- WorkflowService
- CapabilityService
- GraphService
- VerificationService
- EvidenceService
- ArchitectureService
- ExtensionService
- NotificationService
- LayoutService
- StorageService

Frontend features must consume typed service interfaces rather than arbitrary endpoints.

---

## State Architecture

Use three state classes.

### Server state

Managed through TanStack Query for files, search, executions, agents, workflows, capabilities, graph entities, verification, evidence, and Git state.

### Workbench state

Local state for activity selection, sidebar/panel visibility, dimensions, editor groups, open editors, selected tabs, layout, command palette, and focus.

### Durable user state

Persist layout, open editors, recent projects, panel sizes, theme, keybindings, terminal profiles, sidebar sections, and saved graph queries with versioned migration.

---

## Command and Context Architecture

Every meaningful IDE action should be addressable as a command.

Examples:

```text
workbench.action.openFile
workbench.action.togglePrimarySidebar
workbench.action.togglePanel
editor.action.formatDocument
terminal.action.create
agent.action.assign
workflow.action.start
verification.action.run
graph.action.inspectCapability
evidence.action.openLatest
architecture.action.validate
```

Commands support command-palette registration, menus, toolbars, keybindings, context conditions, agent invocation, and extension contribution.

Context keys should include editor focus, terminal focus, file/directory state, workspace trust, agent state, workflow state, verification availability, and capability approval state.

---

## Extension Architecture

Vestara should not initially target VS Code extension compatibility.

Vestara-native contribution points:

```yaml
contributes:
  commands:
  views:
  editors:
  panels:
  agents:
  capabilities:
  workflows:
  verifiers:
  providers:
  themes:
  keybindings:
```

Extensions operate behind capability declarations, lifecycle management, version compatibility, audit events, and later signature enforcement. Unrestricted browser execution is not permitted.

---

## IDE Protocol and Events

Create a typed protocol package:

```text
packages/ide-protocol
```

The protocol covers files, documents, text changes, terminals, processes, search, Git, diagnostics, agents, workflows, capabilities, graph, verification, evidence, and architecture.

Suggested events:

```text
workspace.changed
filesystem.changed
document.changed
terminal.output
terminal.exited
diagnostic.updated
git.status.changed
agent.state.changed
agent.operation.started
agent.operation.completed
workflow.state.changed
workflow.task.changed
capability.requested
capability.granted
capability.denied
verification.updated
evidence.created
graph.updated
architecture.validation.updated
```

Events should carry event ID, timestamp, correlation ID, causation ID, actor, workspace, resource, payload version, and typed payload.

The editor document model must support open, read, version, edit, dirty, save, conflict, external change, recovery, and close semantics.

---

## Design System

### Visual Direction

Use neutral dark workbench surfaces optimized for long engineering sessions. Metallic gold should identify brand, focus, active state, and important execution without overwhelming source-editing surfaces.

Use semantic states for diagnostics, workflow state, approvals, verification, evidence, and agent activity.

### Surface Hierarchy

```text
Application Background
Workbench Surface
Sidebar Surface
Editor Surface
Panel Surface
Popover Surface
Modal Surface
Overlay Surface
```

### Semantic Tokens

Define tokens for active, focused, selected, hover, modified, added, deleted, warning, error, success, blocked, awaiting approval, agent active, verifying, unverified, and evidence available.

### Density

Support compact, standard, and comfortable density. Compact is the default IDE mode.

### Accessibility

Require keyboard navigation, visible focus, ARIA landmarks, screen-reader labels, high contrast, reduced motion, scalable typography, accessible editor/terminal handling, and minimum interaction targets.

---

## Proposed Repository Structure

```text
apps/
  ide/
    src/
      app/
      workbench/
      features/
        explorer/
        search/
        source-control/
        run/
        extensions/
        agents/
        workflows/
        graph/
        verification/
        evidence/
        architecture/
        marketplace/
        settings/
      editors/
        code/
        diff/
        markdown/
        graph/
        workflow/
        verification/
        evidence/
      services/
      stores/
      hooks/
      components/
      styles/
      types/

packages/
  ide-protocol/
  workbench/
  editor-runtime/
  terminal-runtime/
```

Feature folders own their components, hooks, services, types, commands, views, and tests.

---

## Delivery Roadmap

### IDE-0 — Architecture and Specification

Deliver product definition, ADR, capability entries, engineering model, package boundaries, protocol, wireframes, design tokens, and acceptance criteria.

Proposed future ADR:

```text
ADR-120 — Vestara Engineering IDE Workbench Architecture
```

Proposed capabilities:

```text
capability.ide.workbench
capability.ide.editor
capability.ide.explorer
capability.ide.terminal
capability.ide.commands
capability.ide.keybindings
capability.ide.panels
```

### IDE-1 — Workbench Shell

Build application shell, title bar, activity bar, sidebars, editor area, bottom panel, status bar, resizing, visibility controls, keyboard accessibility, and persistent layout.

### IDE-2 — Command and Contribution System

Build command registry, command palette, context keys, menus, toolbars, and keybindings.

### IDE-3 — Explorer and File Operations

Build file tree, file operations, file watching, context menus, Git decorations, and capability approval.

### IDE-4 — Monaco Editor

Build editor tabs, dirty/save/close semantics, split editors, breadcrumbs, diagnostics, diff, recovery, and external-conflict handling.

### IDE-5 — Terminal and Problems

Build xterm integration, terminal tabs, process lifecycle, output capture, and aggregated problems.

### IDE-6 — Search and Source Control

Build repository search, replace preview, Git status, staging, diff, commits, branches, and history.

### IDE-7 — Agent and Workflow Center

Build agent lifecycle views, operation stream, workflow graph, blockers, approvals, changed files, and evidence linkage.

### IDE-8 — Graph and Architecture Intelligence

Build Capability Inspector, graph editor, architecture relationships, impact analysis, ADR viewer, documentation registry, and validation results.

### IDE-9 — Verification and Evidence

Build Verification Center, test inventory, verification timeline, evidence viewer, screenshots, evidence links, and maturity state.

### IDE-10 — Extension and Marketplace Integration

Build contribution registry, local extension installation, extension commands/views, permission controls, and Marketplace integration.

### IDE-11 — Stabilization

Complete performance, accessibility, keyboard navigation, visual regression, crash recovery, memory testing, large-repository testing, documentation, and Workspace migration.

---

## First Release Scope

The first useful release includes:

- workbench shell;
- file explorer;
- Monaco editor;
- integrated terminal;
- Problems panel;
- repository search;
- Git status and diff;
- command palette;
- agent activity;
- workflow timeline;
- capability approvals;
- verification summary;
- Engineering Events.

Deferred from the first release:

- full debugger protocol;
- remote development;
- VS Code extension compatibility;
- collaborative editing;
- notebook editor;
- complete merge editor;
- cloud workspaces;
- distributed agents;
- advanced language refactoring;
- every language server.

---

## Risks and Mitigations

### Rebuilding VS Code

Risk: reproducing all VS Code functionality creates years of work.

Mitigation: build only the workbench primitives Vestara needs. Use VS Code as a layout and interaction reference, not an implementation checklist.

### Oversized frontend state

Mitigation: separate server state, workbench state, editor state, and durable preferences.

### Direct filesystem coupling

Mitigation: all mutations pass through capability governance and the Filesystem Runtime.

### Chat-centric agent UX

Mitigation: agents appear in files, workflows, timelines, operations, graph relationships, approvals, verification, and evidence—not only chat.

### Excessive density

Mitigation: progressive disclosure, contextual secondary views, customizable activities, and compact defaults.

### Premature extension compatibility

Mitigation: begin with Vestara-native contribution points.

---

## Acceptance Criteria

The IDE is successful when a developer can:

1. Open a Vestara workspace.
2. Browse and edit files.
3. Run governed terminal commands.
4. Search the repository.
5. Inspect Git changes.
6. Assign work to an agent.
7. Observe every agent operation.
8. Approve or deny risky actions.
9. Inspect affected files and architecture.
10. Inspect capability dependencies.
11. Run verification.
12. Inspect actual tests and evidence.
13. Understand why work is considered complete.
14. Trace results to participants, events, files, capabilities, ADRs, and evidence.

The first implementation milestone should stop after Monaco editing and governed file operations are stable.

```text
Open Workspace
  → Browse File
  → Open Editor
  → Modify Document
  → Save Through Capability Boundary
  → Emit Engineering Event
  → Update Graph
  → Verify Change
```

---

## Relationship to Existing Architecture

This proposal extends:

- the Engineering Operating System;
- Workspace Runtime;
- Agent Harness;
- capability governance;
- Filesystem Runtime;
- Engineering Event Store;
- Engineering Graph;
- verification and evidence;
- provider routing;
- extension platform;
- Marketplace;
- Vestara Design System.

The document is canonical for the proposed IDE workbench concern but does not mark any IDE capability as implemented or verified.
