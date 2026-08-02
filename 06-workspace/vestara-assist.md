---
title: "Vestara Assist"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "0.1.0"
status: "draft"
owner: "@team/workspace"
last-reviewed: "2026-08-02"
next-review: "2026-09-02"
tags: ["assist", "workspace", "conversation", "agents", "database", "local-first", "docker", "cloud"]
---

# Vestara Assist

Vestara Assist is the conversational control surface for the Vestara engineering workspace. It is not an isolated chatbot. It provides an operator-facing interface for inspecting a workspace, coordinating agents, executing governed tools, reviewing file changes, observing live evidence, and persisting engineering sessions across local, Docker, and cloud environments.

The implementation must be wired into existing Vestara packages and workspace runtimes. Assist must not duplicate filesystem, agent, provider, graph, telemetry, verification, or permission logic already implemented elsewhere in `vestara-ai-core`.

## Product responsibilities

Vestara Assist must support:

- Persistent conversations and execution sessions.
- Direct interaction with Vestara agents.
- Repository, workspace, file, graph, runtime, and telemetry context.
- Governed tool execution.
- Live shell and tool-call output.
- File changes and diff inspection.
- Plans, tasks, approvals, verification, and evidence.
- Configurable AI providers and models.
- Local, Docker, and cloud database deployments.
- Desktop-style multi-tab workspace behavior.
- Session recovery after browser, API, or machine restart.

The primary product rule is:

> Assist consumes Vestara runtime capabilities through stable contracts. It does not create parallel implementations of those capabilities.

## Proposed workspace structure

```text
vestara-ai-core/
├── apps/
│   ├── api/
│   ├── cli/
│   ├── workspace/
│   └── assist/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── features/
│       │   │   ├── chat/
│       │   │   ├── sessions/
│       │   │   ├── context/
│       │   │   ├── changes/
│       │   │   ├── terminal/
│       │   │   ├── plans/
│       │   │   ├── approvals/
│       │   │   ├── evidence/
│       │   │   └── settings/
│       │   ├── layouts/
│       │   ├── routes/
│       │   ├── stores/
│       │   └── main.tsx
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── packages/
│   ├── assist-contracts/
│   ├── assist-runtime/
│   ├── assist-storage/
│   ├── database/
│   ├── database-sqlite/
│   ├── database-postgres/
│   ├── database-migrations/
│   ├── secret-redaction/
│   ├── workspace-client/
│   └── ui-assist/
│
├── docker/
│   └── assist/
│       ├── compose.yml
│       ├── compose.dev.yml
│       └── postgres-init/
│
└── migrations/
    └── assist/
```

Assist may initially be developed as `apps/assist` to isolate runtime and database work. Once stable, it should be mounted into `apps/workspace` as a native route, panel, or tab while preserving shared navigation, theme, command palette, inspector, graph, and authentication state.

## Package boundaries

### `@vestara/assist-contracts`

Contains transport-independent DTOs, commands, events, and domain types.

```typescript
export interface AssistSession {
  id: string;
  workspaceId: string;
  title: string;
  status:
    | "idle"
    | "running"
    | "waiting-approval"
    | "failed"
    | "completed";
  providerId: string;
  modelId: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
}
```

This package must not depend on React, HTTP, a database driver, or the filesystem.

### `@vestara/assist-runtime`

Coordinates a conversational execution.

Responsibilities:

- Create, resume, cancel, and retry sessions.
- Build context through Vestara context providers.
- Resolve the selected agent, provider, and model.
- Run the provider tool loop.
- Route tool requests through the governed action runtime.
- Publish normalized timeline events.
- Request and resolve approvals.
- Trigger verification profiles.
- Persist messages, events, changes, and evidence through storage ports.

Expected integrations include the existing Vestara agent runtime, context system, conversation runtime, engineering graph, event bus, provider packages, tool runtime, verification runtime, and workspace packages. Exact package names and exports must be verified against the implementation repository before coding begins.

### `@vestara/assist-storage`

Defines storage ports without selecting a database implementation.

```typescript
export interface AssistStorage {
  sessions: AssistSessionRepository;
  messages: AssistMessageRepository;
  events: AssistEventRepository;
  approvals: AssistApprovalRepository;
  artifacts: AssistArtifactRepository;
  checkpoints: AssistCheckpointRepository;
  transactions: AssistTransactionManager;
}
```

### `@vestara/database`

Provides database configuration, lifecycle management, migrations, health checks, and capability detection.

```typescript
export type DatabaseConfig =
  | {
      mode: "local";
      driver: "sqlite";
      filePath: string;
      enableWal: boolean;
    }
  | {
      mode: "docker";
      driver: "postgres";
      host: string;
      port: number;
      database: string;
      username: string;
      passwordSecretId: string;
      ssl: false;
    }
  | {
      mode: "cloud";
      driver: "postgres";
      connectionSecretId: string;
      ssl: true;
      poolMin: number;
      poolMax: number;
    };
```

### `@vestara/database-sqlite`

Provides local, single-user persistence.

Requirements:

- `better-sqlite3` adapter.
- WAL mode.
- Foreign keys enabled.
- Configurable busy timeout.
- Migration locking.
- Backup and restore support.
- Database files outside the implementation source tree by default.

Recommended global path:

```text
~/.vestara/assist/assist.db
```

A workspace-scoped database may be supported when explicitly configured, but runtime data must not be accidentally tracked by Git.

### `@vestara/database-postgres`

Used by Docker and cloud deployment modes.

Responsibilities:

- Connection pooling.
- TLS configuration.
- Transactions.
- Advisory migration locking.
- Connectivity and latency health checks.
- Sanitized errors.
- Pool telemetry.

Docker and cloud use the same PostgreSQL adapter. Provisioning and configuration differ, but persistence semantics must remain identical.

### `@vestara/secret-redaction`

Redacts secrets before storage, telemetry publication, model context assembly, and UI rendering.

It must detect at minimum:

- OpenAI and OpenCode keys.
- GitHub tokens.
- AWS credentials.
- Database connection strings.
- JWT secrets.
- OAuth secrets.
- Private keys.
- Generic high-entropy environment values.

Redaction must happen server-side. Client-only masking is insufficient.

## Database deployment modes

### Local mode

Local mode is the default for a single user and one machine.

```yaml
database:
  mode: local
  driver: sqlite
  filePath: ${VESTARA_HOME}/assist/assist.db
  enableWal: true
```

Expected behavior:

- No external service required.
- Automatic creation on first launch.
- Automatic migration.
- Export and backup through Settings.
- Offline operation.
- Restart-safe session persistence.

### Docker mode

Docker mode supports reproducible development, evaluation, and team deployments.

```yaml
database:
  mode: docker
  driver: postgres
  host: postgres
  port: 5432
  database: vestara_assist
  username: vestara
  passwordSecretId: database/docker/password
```

```text
assist-ui
    ↓
vestara-api
    ↓
postgres
```

Optional Docker services may include Redis for transient presence or streams and object storage for large artifacts. PostgreSQL remains the source of truth for sessions, execution events, approvals, plans, and evidence.

### Cloud mode

Cloud mode supports remote and multi-machine access through managed PostgreSQL.

```yaml
database:
  mode: cloud
  driver: postgres
  connectionSecretId: database/cloud/url
  ssl: true
  poolMin: 1
  poolMax: 10
```

Cloud mode must remain provider-neutral and support standards-compliant managed PostgreSQL services.

Required controls:

- Full TLS verification.
- Secret references instead of raw connection strings.
- Connection testing before saving.
- Migration status display.
- Bounded retry with exponential backoff.
- Readiness and liveness health checks.
- Backup-state metadata.
- Optional read-only diagnostic mode.

## Initial data model

```text
assist_workspaces
assist_sessions
assist_messages
assist_message_parts
assist_events
assist_tool_calls
assist_tool_results
assist_approvals
assist_plans
assist_plan_tasks
assist_artifacts
assist_file_changes
assist_verifications
assist_evidence
assist_context_snapshots
assist_session_checkpoints
assist_provider_usage
assist_settings
database_migrations
```

Relationships:

```text
workspace
  └── sessions
       ├── messages
       │    └── message_parts
       ├── events
       ├── tool_calls
       │    └── tool_results
       ├── approvals
       ├── plans
       │    └── plan_tasks
       ├── file_changes
       ├── verifications
       │    └── evidence
       └── context_snapshots
```

`assist_events` is append-only and provides deterministic session replay.

```typescript
export interface AssistEventRecord {
  id: string;
  sessionId: string;
  sequence: number;
  eventType: string;
  timestamp: string;
  actorType: "user" | "agent" | "runtime" | "tool" | "verifier";
  actorId?: string;
  payload: unknown;
  correlationId?: string;
  causationId?: string;
}
```

A unique constraint must exist on `(session_id, sequence)`.

## User interface architecture

The UI should follow a desktop engineering workspace model.

```text
┌───────────────────────────────────────────────────────────┐
│ Workspace tabs                                      +     │
├─────────────────┬─────────────────────────────────────────┤
│ Conversation    │ Session workspace                       │
│ timeline        │                                         │
│                 │ Context / Changes / Evidence / Terminal │
│                 │                                         │
├─────────────────┴─────────────────────────────────────────┤
│ Composer · Agent · Provider · Model · Mode · Run/Stop     │
└───────────────────────────────────────────────────────────┘
```

### Session tabs

Each open conversation is represented by a persisted session tab.

Tab states include:

- Running.
- Waiting for approval.
- Failed.
- Completed.
- Unsaved draft.

Sessions must restore after browser reload or API restart.

### Conversation pane

Message blocks support:

- Markdown and code.
- Shell commands.
- Tool invocation summaries.
- Expandable output.
- File edits.
- Approval requests.
- Verification results.
- Model reasoning summaries, but never private raw chain-of-thought.
- Running, cancelled, failed, and completed states.

### Session workspace

Primary tabs:

```text
Overview
Context
Files Changed
Timeline
Plan
Evidence
Terminal
Graph
```

The Overview tab displays session identity, provider, model, context usage, token breakdown, cost, message counts, timestamps, agent identity, verification status, and database persistence status.

### Files Changed

The Files Changed interface uses a three-pane pattern:

```text
file tree | before diff | after diff
```

Required capabilities:

- Filter files.
- Group files by package.
- Added, modified, renamed, and deleted states.
- Inline and side-by-side diff modes.
- Server-side secret redaction.
- Deep link to the workspace inspector.
- Link each change to its responsible tool call.
- Link each change to verification evidence.
- Governed revert operations.

### Settings

Recommended settings hierarchy:

```text
General
Appearance
Shortcuts

Workspace
Repositories
Database

AI
Providers
Models
Agents

Runtime
Permissions
Tools
Verification

System
Telemetry
Storage
Advanced
```

The Database page includes deployment mode, driver, connection fields, secret references, connection test, migration status, schema version, latency, backup/export, local reset, and database migration controls.

## Configuration workflow

First launch:

```text
Select database mode
        ↓
Enter or detect configuration
        ↓
Test connection
        ↓
Inspect compatibility
        ↓
Preview migrations
        ↓
Apply migrations
        ↓
Create initial workspace
        ↓
Open Vestara Assist
```

Routine database configuration must not require manual `.env` editing.

## API surface

```text
GET    /api/assist/config
PUT    /api/assist/config

GET    /api/assist/database/status
POST   /api/assist/database/test
POST   /api/assist/database/migrate
POST   /api/assist/database/backup

GET    /api/assist/sessions
POST   /api/assist/sessions
GET    /api/assist/sessions/:sessionId
PATCH  /api/assist/sessions/:sessionId
DELETE /api/assist/sessions/:sessionId

GET    /api/assist/sessions/:sessionId/messages
POST   /api/assist/sessions/:sessionId/messages

GET    /api/assist/sessions/:sessionId/events
GET    /api/assist/sessions/:sessionId/changes
GET    /api/assist/sessions/:sessionId/evidence
GET    /api/assist/sessions/:sessionId/context

POST   /api/assist/sessions/:sessionId/cancel
POST   /api/assist/sessions/:sessionId/retry

POST   /api/assist/approvals/:approvalId/approve
POST   /api/assist/approvals/:approvalId/reject
```

Live session updates use WebSocket or Server-Sent Events:

```text
/api/assist/sessions/:sessionId/stream
```

Normalized events include:

```text
session.started
message.delta
message.completed
tool.requested
tool.started
tool.output
tool.completed
file.changed
approval.requested
approval.resolved
verification.started
verification.completed
session.completed
session.failed
```

## Runtime integration

```text
User message
    ↓
Assist API
    ↓
AssistRuntime
    ↓
Workspace context assembly
    ├── Repository state
    ├── Engineering graph
    ├── Session history
    ├── Active plan
    ├── Agent capabilities
    └── Current diagnostics
    ↓
Provider router
    ↓
Selected model
    ↓
Requested tool call
    ↓
Governed tool/action runtime
    ├── Risk classification
    ├── Permission check
    ├── Approval if necessary
    ├── Execution
    ├── Telemetry
    └── Evidence
    ↓
Verifier
    ↓
Persist event
    ↓
Publish to Assist UI
```

No route handler may invoke a filesystem, shell, Git, or other engineering tool directly. Every operation must pass through Vestara governance, capability, telemetry, and verification layers.

## Session modes

### Ask

Read-only inspection and explanation.

Allowed activities include reading files, searching, inspecting the graph, reading diagnostics, explaining architecture, and generating proposals.

### Plan

Creates a structured plan without modifying implementation files.

Outputs include tasks, dependencies, agent assignments, risk levels, expected files, and verification strategy.

### Build

Allows governed modifications.

Build mode requires an active plan, assigned agent, change tracking, approval policy, and verification profile.

### Verify

Runs read-only inspection and approved verification commands such as builds, tests, browser checks, or runtime probes.

Outputs include claims, evidence, reproduction steps, confidence, and remaining uncertainty.

### Observe

Displays the work of another agent or execution without initiating modifications. Observe mode supports the Vestara principle that humans and agents should inspect actual work rather than trust completion statements alone.

## Security requirements

Secret protection is a release blocker.

- `.env` files are never displayed as ordinary source text.
- Values are redacted before persistence.
- Diff events contain sanitized patches.
- Model context receives placeholders instead of raw secrets.
- Tool output is scanned before publication.
- The browser never receives raw credentials.
- Configuration APIs never return database passwords.
- Sensitive reveal operations require explicit operator action.
- Secret access is audited without storing secret values.

Secrets are addressed by stable identifiers:

```text
openai/default/api-key
database/cloud/url
github/workspace/token
```

## Delivery phases

### Phase 0 — Repository and security audit

- Confirm existing package names and exports.
- Map current session, event, provider, tool, graph, and verification APIs.
- Remove tracked `.env` files.
- Rotate exposed credentials.
- Add server-side redaction tests.

Exit criteria: no raw secret is rendered in diffs, telemetry, events, or model context.

### Phase 1 — Contracts and database foundation

Build:

```text
@vestara/assist-contracts
@vestara/assist-storage
@vestara/database
@vestara/database-sqlite
@vestara/database-postgres
@vestara/database-migrations
```

Exit criteria:

- Shared storage contract tests pass against SQLite and PostgreSQL.
- Migrations run from an empty database.
- Re-running migrations is idempotent.

### Phase 2 — Assist runtime

Deliver session lifecycle, persistence, provider integration, agent selection, context assembly, governed tools, approvals, verification, and checkpoints.

Exit criteria:

- Sessions survive API restart.
- Tool calls correlate with messages, file changes, and evidence.
- Cancellation reaches active tools where supported.

### Phase 3 — API and live stream

Deliver REST routes, event streaming, reconnection, backpressure policy, pagination, and sanitized errors.

Exit criteria:

- Clients recover missed events by sequence.
- Duplicate events are not rendered.
- Completed session state survives API restart.

### Phase 4 — Core Assist UI

Deliver application shell, session tabs, conversation timeline, composer, selectors, run controls, overview, context, and responsive layouts.

Exit criteria:

- A complete Ask session works end to end.
- Sessions restore after browser refresh.
- Runtime state is visible without reading raw logs.

### Phase 5 — Changes, terminal, and evidence

Deliver Files Changed, terminal output, plan tasks, evidence, verification status, and deep links to Inspector and Engineering Graph.

Exit criteria:

- Every changed file identifies its responsible operation.
- Every completion claim links to verification evidence.
- Secrets remain redacted in all views.

### Phase 6 — Database provisioning

Deliver local initialization, Docker Compose provisioning, cloud PostgreSQL configuration, connection tests, migration preview, backup/export, and local-to-PostgreSQL migration.

Exit criteria:

- Users can change database mode without editing source files.
- Migration verifies record counts and checksums.
- Failure leaves the source database intact.

### Phase 7 — Deployment hardening

Deliver production images, health checks, non-root containers, persistent volume documentation, TLS, graceful shutdown, pool tuning, and backup runbooks.

Exit criteria:

- Docker starts from an empty volume.
- Cloud deployment passes migration and reconnect tests.
- Images contain no embedded credentials.

### Phase 8 — Workspace integration

Mount Assist inside `apps/workspace` and share authentication, navigation, theme, inspector, graph, command palette, agent registry, providers, and settings.

Exit criteria:

- Contextual navigation works in both directions.
- No provider, agent, permission, or settings state is duplicated.

## Verification matrix

| Area | Required verification |
|---|---|
| SQLite | WAL, restart recovery, locking, migration, backup |
| PostgreSQL | Pooling, transactions, TLS, reconnect, migration lock |
| Docker | Empty-volume boot, restart, upgrade, volume persistence |
| Cloud | SSL, latency, credentials, migration, transient outage |
| Sessions | Create, resume, cancel, retry, archive |
| Streaming | Reconnect, ordering, duplicate prevention, backpressure |
| Tools | Permission, approval, cancellation, telemetry |
| Files | Diff accuracy, attribution, revert, secret redaction |
| Providers | Selection, fallback, usage, context limits |
| Verification | Evidence attached to claims and changes |
| Recovery | API crash, browser refresh, interrupted tool call |
| Portability | Local to Docker to cloud migration |

## First usable milestone

The first usable release must demonstrate this complete scenario:

1. Launch Assist with local SQLite.
2. Select a workspace, agent, provider, and model.
3. Ask Assist to inspect a repository issue.
4. Assemble context through Vestara packages.
5. Create a structured implementation plan.
6. Switch to Build mode.
7. Request permission for a modification.
8. Approve the operation.
9. Display the file change live in Files Changed.
10. Run the configured verification profile.
11. Display command, result, affected files, and evidence.
12. Restart the API.
13. Restore the complete session.
14. Configure Docker PostgreSQL.
15. Migrate the local Assist database.
16. Restore the same session under the new database mode.

This milestone proves that Vestara Assist is not merely a chat interface. It proves persistent execution, observable action, database portability, governance, verification, and evidence-based completion.
