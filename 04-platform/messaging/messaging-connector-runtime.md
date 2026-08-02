---
id: "messaging-connector-runtime"
title: "Messaging Connector Runtime — Canonical Sync Orchestration"
volume: "04-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@chief-architect"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: []
tags: ["platform", "messaging", "connector", "canonical"]
---

# Messaging Connector Runtime

## Canonical Sync Orchestration

> **This document defines the canonical runtime that orchestrates provider synchronization and normalizes mailbox state for Workspace projection.**

---

## 1. Architectural Position

```
Mail Provider Contracts
        ↓
Messaging Connector Runtime
        ↓
Normalized Message Projection
        ↓
Engineering Events
        ↓
Workspace Messages Projection
        ↓
Messages UI
```

The Messaging Connector Runtime owns:
- Provider connection management
- Authentication and token lifecycle
- Synchronization orchestration
- Conflict resolution
- Normalization and projection
- Rate limiting and retry logic

---

## 2. Canonical Entities

### 2.1 ConnectorRuntime

```
ConnectorRuntime
    ├── RuntimeIdentity
    │   ├── id: RuntimeId
    │   ├── version: string
    │   └── capabilities: RuntimeCapability[]
    ├── RuntimeState
    │   ├── status: RuntimeStatus
    │   ├── activeConnections: ConnectionId[]
    │   └── health: RuntimeHealth
    └── RuntimeConfiguration
        ├── maxConcurrentConnections: number
        ├── defaultTimeout: Duration
        ├── retryPolicy: RetryPolicyDefinition
        ├── rateLimiting: RateLimitConfiguration
        └── logging: LoggingConfiguration
```

### 2.2 ProviderConnection

```
ProviderConnection
    ├── ConnectionIdentity
    │   ├── id: ConnectionId
    │   ├── providerId: string
    │   ├── accountId: string
    │   └── createdAt: timestamp
    ├── ConnectionDefinition
    │   ├── adapter: MailProviderAdapter
    │   ├── credentials: CredentialReference
    │   ├── configuration: ConnectionConfiguration
    │   └── capabilities: MailProviderCapabilities
    ├── ConnectionState
    │   ├── status: ConnectionStatus
    │   ├── syncState: SyncState
    │   ├── lastSync: timestamp
    │   └── error: ConnectionError
    └── ConnectionMetadata
        ├── tags: string[]
        ├── environment: Environment
        └── security: SecurityConfiguration
```

### 2.3 SyncJob

```
SyncJob
    ├── SyncJobIdentity
    │   ├── id: SyncJobId
    │   ├── connectionId: ConnectionId
    │   ├── accountId: string
    │   └── createdAt: timestamp
    ├── SyncJobDefinition
    │   ├── syncType: SyncType
    │   ├── targets: SyncTarget[]
    │   ├── priority: SyncPriority
    │   └── timeout: Duration
    ├── SyncJobState
    │   ├── status: SyncJobStatus
    │   ├── progress: SyncProgress
    │   ├── startedAt: timestamp
    │   └── completedAt: timestamp
    └── SyncJobMetadata
        ├── tags: string[]
        ├── trigger: SyncTrigger
        └── retryCount: number
```

### 2.4 NormalizedMessage

```
NormalizedMessage
    ├── NormalizedMessageIdentity
    │   ├── id: NormalizedMessageId
    │   ├── providerMessageId: string
    │   ├── accountId: string
    │   └── providerId: string
    ├── NormalizedMessageDefinition
    │   ├── threadId: string
    │   ├── from: NormalizedAddress
    │   ├── to: NormalizedAddress[]
    │   ├── cc: NormalizedAddress[]
    │   ├── bcc: NormalizedAddress[]
    │   ├── subject: string
    │   ├── body: NormalizedBody
    │   ├── attachments: NormalizedAttachment[]
    │   ├── headers: NormalizedHeader[]
    │   └── timestamp: string
    ├── NormalizedMessageState
    │   ├── status: NormalizedMessageStatus
    │   ├── read: boolean
    │   ├── starred: boolean
    │   ├── deleted: boolean
    │   ├── labels: string[]
    │   └── folder: string
    └── NormalizedMessageMetadata
        ├── tags: string[]
        ├── providerMetadata: ProviderMetadata
        ├── size: number
        └── engineering: EngineeringRelationships
```

### 2.5 NormalizedThread

```
NormalizedThread
    ├── NormalizedThreadIdentity
    │   ├── id: NormalizedThreadId
    │   ├── providerThreadId: string
    │   ├── accountId: string
    │   └── providerId: string
    ├── NormalizedThreadDefinition
    │   ├── subject: string
    │   ├── participants: NormalizedParticipant[]
    │   ├── messageCount: number
    │   ├── lastMessage: NormalizedMessageSummary
    │   ├── labels: string[]
    │   └── flags: string[]
    ├── NormalizedThreadState
    │   ├── status: NormalizedThreadStatus
    │   ├── unread: boolean
    │   ├── starred: boolean
    │   ├── archived: boolean
    │   ├── deleted: boolean
    │   └── lastActivity: string
    └── NormalizedThreadMetadata
        ├── tags: string[]
        ├── providerMetadata: ProviderMetadata
        └── engineering: EngineeringRelationships
```

### 2.6 ConflictResolution

```
ConflictResolution
    ├── ConflictResolutionIdentity
    │   ├── id: ConflictResolutionId
    │   ├── syncJobId: SyncJobId
    │   ├── entityType: string
    │   └── entityId: string
    ├── ConflictResolutionDefinition
    │   ├── conflictType: ConflictType
    │   ├── localState: EntityState
    │   ├── remoteState: EntityState
    │   ├── resolution: ResolutionStrategy
    │   └── resolvedAt: timestamp
    ├── ConflictResolutionState
    │   ├── status: ConflictResolutionStatus
    │   └── resolvedBy: string
    └── ConflictResolutionMetadata
        ├── tags: string[]
        └── audit: AuditEntry[]
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
ConnectorRuntime 1──* ProviderConnection
ProviderConnection 1──* SyncJob
SyncJob 1──* NormalizedMessage
SyncJob 1──* NormalizedThread
SyncJob 1──* ConflictResolution
NormalizedThread 1──* NormalizedMessage
NormalizedMessage *──* ConflictResolution
```

### 3.2 Dependency Graph

```
ConnectorRuntime
    ├── manages: ProviderConnection[]
    ├── orchestrates: SyncJob[]
    └── resolves: ConflictResolution[]

ProviderConnection
    ├── belongsTo: ConnectorRuntime
    ├── executes: SyncJob[]
    ├── uses: MailProviderAdapter
    └── authenticates: CredentialReference

SyncJob
    ├── belongsTo: ProviderConnection
    ├── produces: NormalizedMessage[]
    ├── produces: NormalizedThread[]
    └── resolves: ConflictResolution[]

NormalizedMessage
    ├── belongsTo: SyncJob
    ├── belongsTo: NormalizedThread
    └── mayHave: ConflictResolution[]

NormalizedThread
    ├── belongsTo: SyncJob
    └── contains: NormalizedMessage[]

ConflictResolution
    ├── belongsTo: SyncJob
    └── resolves: NormalizedMessage | NormalizedThread
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| ConnectorRuntime | ConnectorRuntime | Runtime lifecycle, capability management |
| ProviderConnection | ConnectorRuntime | Connection lifecycle, authentication |
| SyncJob | ConnectorRuntime | Sync orchestration, progress tracking |
| NormalizedMessage | ConnectorRuntime | Normalization, projection |
| NormalizedThread | ConnectorRuntime | Normalization, projection |
| ConflictResolution | ConnectorRuntime | Conflict detection, resolution |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner delegates projection to Workspace

---

## 5. Lifecycle

### 5.1 ConnectorRuntime Lifecycle

```
Initialized
  ↓
Configured
  ↓
Ready
  ↓
Processing
  ↓
Monitoring
  ↓
Optimizing
  ↓
Shutdown
```

### 5.2 ProviderConnection Lifecycle

```
Created
  ↓
Authenticating
  ↓
Connected
  ↓
Syncing
  ↓
Active
  ↓
TokenRefresh
  ↓
Reconnecting
  ↓
Disconnected
  ↓
Removed
```

### 5.3 SyncJob Lifecycle

```
Created
  ↓
Queued
  ↓
Running
  ↓
Progressing
  ↓
Completing
  ↓
Completed
  ↓
Failed
```

### 5.4 NormalizedMessage Lifecycle

```
Created
  ↓
Synced
  ↓
Active
  ↓
Updated
  ↓
Archived
  ↓
Deleted
```

### 5.5 NormalizedThread Lifecycle

```
Created
  ↓
Synced
  ↓
Active
  ↓
Updated
  ↓
Archived
  ↓
Deleted
```

### 5.6 ConflictResolution Lifecycle

```
Detected
  ↓
Analyzing
  ↓
Resolving
  ↓
Resolved
  ↓
Applied
  ↓
Archived
```

---

## 6. Events

### 6.1 ConnectorRuntime Events

| Event | Payload | Trigger |
|-------|---------|---------|
| RuntimeInitialized | ConnectorRuntime | Initialization |
| RuntimeConfigured | ConnectorRuntime, Configuration | Configuration |
| RuntimeReady | ConnectorRuntime | Ready |
| RuntimeShutdown | ConnectorRuntime, Reason | Shutdown |

### 6.2 ProviderConnection Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ConnectionCreated | ProviderConnection | Creation |
| ConnectionAuthenticated | ProviderConnection | Authentication |
| ConnectionConnected | ProviderConnection | Connection |
| ConnectionSynced | ProviderConnection, SyncState | Sync |
| ConnectionTokenRefreshed | ProviderConnection | Token refresh |
| ConnectionDisconnected | ProviderConnection, Reason | Disconnection |
| ConnectionFailed | ProviderConnection, Failure | Failure |

### 6.3 SyncJob Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SyncJobCreated | SyncJob | Creation |
| SyncJobStarted | SyncJob | Start |
| SyncJobProgress | SyncJob, Progress | Progress |
| SyncJobCompleted | SyncJob | Completion |
| SyncJobFailed | SyncJob, Failure | Failure |
| SyncJobRetried | SyncJob, Attempt | Retry |

### 6.4 NormalizedMessage Events

| Event | Payload | Trigger |
|-------|---------|---------|
| MessageNormalized | NormalizedMessage | Normalization |
| MessageUpdated | NormalizedMessage, ChangeSet | Update |
| MessageArchived | NormalizedMessage | Archive |
| MessageDeleted | NormalizedMessage, Reason | Deletion |

### 6.5 NormalizedThread Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ThreadNormalized | NormalizedThread | Normalization |
| ThreadUpdated | NormalizedThread, ChangeSet | Update |
| ThreadArchived | NormalizedThread | Archive |
| ThreadDeleted | NormalizedThread, Reason | Deletion |

### 6.6 ConflictResolution Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ConflictDetected | ConflictResolution | Detection |
| ConflictAnalyzing | ConflictResolution | Analysis |
| ConflictResolving | ConflictResolution | Resolution |
| ConflictResolved | ConflictResolution | Resolution |
| ConflictFailed | ConflictResolution, Failure | Failure |

---

## 7. Sync Orchestration

### 7.1 Sync Types

```typescript
type SyncType = 
  | 'full'          // Complete mailbox sync
  | 'delta'         // Incremental sync
  | 'push'          // Push notification triggered
  | 'manual'        // User triggered
  | 'scheduled';    // Scheduled sync
```

### 7.2 Sync Targets

```typescript
type SyncTarget = 
  | 'accounts'      // Account list
  | 'mailboxes'     // Mailbox list
  | 'threads'       // Thread list
  | 'messages'      // Message list
  | 'labels'        // Label list
  | 'attachments';  // Attachment metadata
```

### 7.3 Sync Priorities

```typescript
type SyncPriority = 
  | 'critical'      // Authentication required
  | 'high'          // User triggered
  | 'normal'        // Scheduled
  | 'low'           // Background
  | 'idle';         // When idle
```

### 7.4 Sync Strategies

```typescript
interface SyncStrategy {
  type: SyncType;
  targets: SyncTarget[];
  priority: SyncPriority;
  timeout: Duration;
  retryPolicy: RetryPolicyDefinition;
  conflictResolution: ConflictResolutionStrategy;
}
```

---

## 8. Conflict Resolution

### 8.1 Conflict Types

```typescript
type ConflictType = 
  | 'version'       // Version mismatch
  | 'state'         // State mismatch
  | 'concurrent'    // Concurrent modification
  | 'provider'      // Provider-side change
  | 'local';        // Local-side change
```

### 8.2 Resolution Strategies

```typescript
type ResolutionStrategy = 
  | 'provider-wins'    // Provider is authoritative
  | 'local-wins'       // Local changes preserved
  | 'merge'            // Merge changes
  | 'manual'           // User resolves
  | 'discard-local';   // Discard local changes
```

### 8.3 Resolution Rules

1. **Provider Authority**: Provider is authoritative for mailbox state
2. **Local Drafts**: Local draft changes preserved until synced
3. **Engineering Relationships**: Vestara-owned relationships preserved
4. **Presentation Preferences**: UI preferences preserved
5. **User Override**: User can manually resolve conflicts

---

## 9. Normalization

### 9.1 Normalization Rules

1. **Provider Abstraction**: Provider-specific formats normalized
2. **ID Mapping**: Provider IDs mapped to normalized IDs
3. **Address Normalization**: Email addresses normalized
4. **Timestamp Normalization**: Timestamps normalized to UTC
5. **Header Normalization**: Headers normalized to standard format

### 9.2 Projection Rules

1. **Read-Only Projections**: Normalized entities are read-only
2. **Event-Driven Updates**: Projections update via events
3. **Lazy Loading**: Projections load on demand
4. **Caching**: Projections may cache for performance
5. **Versioning**: Projections versioned for consistency

---

## 10. Verification Requirements

### 10.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| ConnectorRuntime | Runtime Testing | Runtime initializes correctly |
| ProviderConnection | Connection Testing | Connection authenticates correctly |
| SyncJob | Sync Testing | Sync completes correctly |
| NormalizedMessage | Normalization Testing | Messages normalize correctly |
| NormalizedThread | Normalization Testing | Threads normalize correctly |
| ConflictResolution | Resolution Testing | Conflicts resolve correctly |

### 10.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 10.3 Evidence Requirements

1. **Connection Evidence**: Connection test results
2. **Sync Evidence**: Sync operation logs
3. **Normalization Evidence**: Normalization test results
4. **Conflict Evidence**: Conflict resolution logs
5. **Performance Evidence**: Sync performance metrics

---

## 11. Integration Points

### 11.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Artifact Storage | Attachment management | Storage API |
| Verification Runtime | Verification execution | Verification API |
| Credential Store | Credential management | Credential API |

### 11.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Gmail API | Gmail access | Gmail API |
| Microsoft Graph | Outlook access | Graph API |
| IMAP Server | IMAP access | IMAP Protocol |
| SMTP Server | SMTP access | SMTP Protocol |

---

## 12. Open Questions

1. How should sync conflicts be prioritized?
2. How should large mailboxes be synced efficiently?
3. How should push notifications be handled?
4. How should rate limits be managed across providers?
5. How should sync failures be recovered?

---

*This document defines the canonical Messaging Connector Runtime for Vestara.*
*The runtime orchestrates provider synchronization and normalizes mailbox state for Workspace projection.*
