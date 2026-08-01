---
title: "VDS Terminal Console"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.2.0"
status: "approved"
owner: "@frontend-engineer"
created: "2026-08-01"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "terminal", "tui", "console", "routing", "accessibility"]
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "502b078, db3f498; packages/tui"
---

# VDS Terminal Console

## Five questions

| Question | Answer |
|----------|--------|
| What am I? | The VDS interpretation for interactive character-cell applications. |
| Why do I exist? | To make Vestara usable over SSH, recovery shells, low-resource devices, and keyboard-first engineering workflows. |
| Who owns me? | VDS owns presentation semantics; the Workspace Runtime owns commands and policy. |
| What do I depend on? | Conversation, routing, permissions, events, and terminal capabilities. |
| What do I produce? | An accessible transcript, explicit user intent, visible runtime state, and governed confirmations. |

## Surface anatomy

```text
┌ Vestara ───────── Workspace ───────── Runtime status ┐
├ Navigation ┬ Conversation / active view ┬ Agents     ┤
│ views      │ tool cards and overlays     │ progress   │
├────────────┴──────────────────────────────┴────────────┤
│ Multiline composer                                   │
├───────────────────────────────────────────────────────┤
│ Workspace · branch · provider · agents · memory      │
└───────────────────────────────────────────────────────┘
```

The Console MUST remain useful at 80×24. It SHOULD preserve transcript,
composer, and status at smaller sizes by reducing decoration before content.
Terminal dimensions MUST be treated as live input, not fixed configuration.

## Input contract

- `Enter` submits; `Shift+Enter` inserts a newline.
- Bracketed paste MUST preserve pasted text and MUST NOT execute it implicitly.
- Up/down SHOULD traverse command history when the composer is active.
- Page Up/Page Down SHOULD scroll transcript history.
- `Ctrl+C` cancels active work before it exits an idle Console.
- Help and command discovery MUST be reachable without a pointer.
- An overlay or confirmation MUST capture input until dismissed.

## Conversation and streaming

User input is appended to an attributable transcript before execution. Streaming
provider output updates one active response entry; chunks MUST NOT appear as
separate messages. Cancellation preserves output already received and reports a
cancelled state. Errors are transcript entries, not transient notifications.

## Routing preflight

Before governed engineering execution, the surface SHOULD show the effective
task, role/agent, provider-scoped model, routing profile, permissions,
verification route, and fallback boundary. Automatic decisions MUST be
explainable through reason codes. Provider availability and task compatibility
MUST remain separate concepts.

## Confirmation contract

Confirmation is required for reassignment and other governed operations. A
confirmation MUST identify the task, target participant, provider/model, and
consequence. If side effects have been recorded, approval MUST be a distinct
second step. Reassignment MUST NOT imply that paused work resumed.

## Degradation

- Without color: labels, borders, and wording carry all meaning.
- Without Unicode: ASCII borders and text labels replace glyphs.
- Without alternate-screen support: the Console MAY use inline mode.
- Without mouse support: every operation remains keyboard accessible.
- On disconnect: preserve local transcript and expose reconnection state.

## Implementation reconciliation

`@vestara/tui` is the canonical interactive terminal surface. It implements
alternate-screen rendering, responsive navigation and agent panes, streaming
conversation updates, visible tool cards, telemetry and graph views, multiline
editing, history, cursor movement, undo/redo, bracketed paste, command palette,
toasts, confirmations, and persistent status. `apps/console` is only a
compatibility launcher.

`TuiController` consumes Workspace Runtime HTTP and WebSocket contracts.
`normalizeRuntimeEvent` is the mandatory provider-protocol boundary: raw tool
arguments, DSML/XML, provider envelopes, and provider metadata never enter
conversation state. Runtime events update application state in place; the UI
does not poll while connected.

Explorer, sessions, and plans are backed by Engineering Graph and runtime API
data. `TuiExtensionRegistry` accepts declarative view descriptors with disposal
hooks; extensions cannot inject arbitrary Ink components into the trusted TUI
process. Rich file-tree previews, bounded list navigation, resizable pane
handles, and full Marketplace-driven view discovery remain partial.
