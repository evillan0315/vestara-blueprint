---
id: "messaging-domain"
title: "Messaging Domain — Canonical Contract"
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
tags: ["platform", "messaging", "canonical"]
---

# Messaging Domain

## Canonical Contract

> **This document defines the canonical entities, relationships, and lifecycle for messaging in Vestara.**

---

## 1. Architectural Rule

```
Messages Workspace ≠ mail domain owner
```

The provider remains authoritative for mailbox state. Vestara may persist normalized indexes, local drafts, presentation preferences, and engineering relationships, but it must not create a second independent mailbox source of truth.

---

## 2. Canonical Entities

### 2.1 MailAccount

```
MailAccount
    ├── MailAccountIdentity
    │   ├── id: MailAccountId
    │   ├── email: string
    │   ├── displayName: string
    │   └── provider: ProviderId
    ├── MailAccountDefinition
    │   ├── capabilities: MailCapability[]
    │   ├── syncConfig: SyncConfiguration
    │   ├── signature: SignatureDefinition
    │   └── defaults: AccountDefaults
    ├── MailAccountState
    │   ├── status: MailAccountStatus
    │   ├── syncState: SyncState
    │   ├── lastSynced: timestamp
    │   └── unreadCount: number
    └── MailAccountMetadata
        ├── tags: string[]
        ├── environment: Environment
        └── security: SecurityConfiguration
```

### 2.2 Mailbox

```
Mailbox
    ├── MailboxIdentity
    │   ├── id: MailboxId
    │   ├── name: string
    │   ├── type: MailboxType
    │   └── account: MailAccountId
    ├── MailboxDefinition
    │   ├── folder: FolderDefinition
    │   ├── flags: MailboxFlag[]
    │   ├── permissions: PermissionDefinition
    │   └── syncPolicy: SyncPolicyDefinition
    ├── MailboxState
    │   ├── status: MailboxStatus
    │   ├── messageCount: number
    │   ├── unreadCount: number
    │   └── lastSynced: timestamp
    └── MailboxMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.3 MailThread

```
MailThread
    ├── MailThreadIdentity
    │   ├── id: MailThreadId
    │   ├── subject: string
    │   ├── account: MailAccountId
    │   └── mailbox: MailboxId
    ├── MailThreadDefinition
    │   ├── participants: Participant[]
    │   ├── messageCount: number
    │   ├── lastMessage: MessageSummary
    │   ├── labels: Label[]
    │   └── flags: ThreadFlag[]
    ├── MailThreadState
    │   ├── status: ThreadStatus
    │   ├── unread: boolean
    │   ├── starred: boolean
    │   ├── archived: boolean
    │   ├── deleted: boolean
    │   └── lastActivity: timestamp
    └── MailThreadMetadata
        ├── tags: string[]
        ├── provider: ProviderMetadata
        └── engineering: EngineeringRelationships
```

### 2.4 MailMessage

```
MailMessage
    ├── MailMessageIdentity
    │   ├── id: MailMessageId
    │   ├── threadId: MailThreadId
    │   ├── account: MailAccountId
    │   └── messageId: string (provider)
    ├── MailMessageDefinition
    │   ├── from: Address
    │   ├── to: Address[]
    │   ├── cc: Address[]
    │   ├── bcc: Address[]
    │   ├── subject: string
    │   ├── body: MessageBody
    │   ├── attachments: Attachment[]
    │   ├── headers: MessageHeader[]
    │   └── timestamp: timestamp
    ├── MailMessageState
    │   ├── status: MessageStatus
    │   ├── read: boolean
    │   ├── starred: boolean
    │   ├── deleted: boolean
    │   ├── labels: Label[]
    │   └── folder: FolderId
    └── MailMessageMetadata
        ├── tags: string[]
        ├── provider: ProviderMetadata
        ├── size: DataSize
        └── engineering: EngineeringRelationships
```

### 2.5 Participant

```
Participant
    ├── ParticipantIdentity
    │   ├── id: ParticipantId
    │   ├── name: string
    │   └── email: string
    ├── ParticipantDefinition
    │   ├── addresses: Address[]
    │   ├── contact: ContactReference
    │   └── organization: OrganizationReference
    ├── ParticipantState
    │   ├── status: ParticipantStatus
    │   └── lastSeen: timestamp
    └── ParticipantMetadata
        ├── tags: string[]
        └── frequency: InteractionFrequency
```

### 2.6 Address

```
Address
    ├── AddressIdentity
    │   ├── id: AddressId
    │   ├── email: string
    │   └── name: string
    ├── AddressDefinition
    │   ├── type: AddressType
    │   ├── primary: boolean
    │   └── verified: boolean
    ├── AddressState
    │   ├── status: AddressStatus
    │   └── lastUsed: timestamp
    └── AddressMetadata
        ├── tags: string[]
        └── source: AddressSource
```

### 2.7 Attachment

```
Attachment
    ├── AttachmentIdentity
    │   ├── id: AttachmentId
    │   ├── messageId: MailMessageId
    │   ├── filename: string
    │   └── contentType: string
    ├── AttachmentDefinition
    │   ├── size: DataSize
    │   ├── checksum: string
    │   ├── providerRef: string
    │   └── downloadState: DownloadState
    ├── AttachmentState
    │   ├── status: AttachmentStatus
    │   ├── downloaded: boolean
    │   ├── scanned: boolean
    │   └── clean: boolean
    └── AttachmentMetadata
        ├── tags: string[]
        ├── artifact: ArtifactReference
        └── engineering: EngineeringRelationships
```

### 2.8 Draft

```
Draft
    ├── DraftIdentity
    │   ├── id: DraftId
    │   ├── account: MailAccountId
    │   ├── threadId: MailThreadId (optional)
    │   └── providerDraftId: string (optional)
    ├── DraftDefinition
    │   ├── to: Address[]
    │   ├── cc: Address[]
    │   ├── bcc: Address[]
    │   ├── subject: string
    │   ├── body: MessageBody
    │   ├── attachments: Attachment[]
    │   ├── signature: SignatureDefinition
    │   └── schedule: ScheduleDefinition
    ├── DraftState
    │   ├── status: DraftStatus
    │   ├── syncState: DraftSyncState
    │   ├── lastEdited: timestamp
    │   └── version: number
    └── DraftMetadata
        ├── tags: string[]
        ├── engine: DraftEngine
        └── engineering: EngineeringRelationships
```

### 2.9 Delivery

```
Delivery
    ├── DeliveryIdentity
    │   ├── id: DeliveryId
    │   ├── messageId: MailMessageId
    │   └── account: MailAccountId
    ├── DeliveryDefinition
    │   ├── status: DeliveryStatus
    │   ├── recipients: DeliveryRecipient[]
    │   ├── timestamp: timestamp
    │   └── providerResponse: ProviderResponse
    ├── DeliveryState
    │   ├── status: DeliveryStatus
    │   ├── delivered: boolean
    │   ├── bounced: boolean
    │   ├── failed: boolean
    │   └── lastAttempt: timestamp
    └── DeliveryMetadata
        ├── tags: string[]
        ├── provider: ProviderMetadata
        └── engineering: EngineeringRelationships
```

### 2.10 Label

```
Label
    ├── LabelIdentity
    │   ├── id: LabelId
    │   ├── name: string
    │   ├── account: MailAccountId
    │   └── type: LabelType
    ├── LabelDefinition
    │   ├── color: string
    │   ├── parent: LabelId (optional)
    │   ├── system: boolean
    │   └── visible: boolean
    ├── LabelState
    │   ├── status: LabelStatus
    │   ├── messageCount: number
    │   └── unreadCount: number
    └── LabelMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.11 Folder

```
Folder
    ├── FolderIdentity
    │   ├── id: FolderId
    │   ├── name: string
    │   ├── account: MailAccountId
    │   └── type: FolderType
    ├── FolderDefinition
    │   ├── parent: FolderId (optional)
    │   ├── special: boolean
    │   ├── syncable: boolean
    │   └── permissions: PermissionDefinition
    ├── FolderState
    │   ├── status: FolderStatus
    │   ├── messageCount: number
    │   ├── unreadCount: number
    │   └── lastSynced: timestamp
    └── FolderMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.12 SyncState

```
SyncState
    ├── SyncStateIdentity
    │   ├── id: SyncStateId
    │   ├── account: MailAccountId
    │   └── mailbox: MailboxId
    ├── SyncStateDefinition
    │   ├── syncToken: string
    │   ├── lastSync: timestamp
    │   ├── syncPolicy: SyncPolicyDefinition
    │   └── conflicts: ConflictDefinition[]
    ├── SyncStateState
    │   ├── status: SyncStatus
    │   ├── progress: SyncProgress
    │   └── error: SyncError
    └── SyncStateMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
MailAccount 1──* Mailbox
MailAccount 1──* MailThread
MailAccount 1──* Draft
MailAccount 1──* Label
Mailbox 1──* MailThread
MailThread 1──* MailMessage
MailThread *──* Label
MailMessage 1──* Attachment
MailMessage *──* Participant
MailMessage *──* Label
MailMessage 1──* Delivery
Draft *──* Attachment
Draft *──* Participant
Participant *──* Address
MailAccount 1──* SyncState
Mailbox 1──* SyncState
```

### 3.2 Dependency Graph

```
MailAccount
    ├── contains: Mailbox[]
    ├── contains: MailThread[]
    ├── contains: Draft[]
    ├── contains: Label[]
    ├── hasCapability: MailCapability[]
    └── syncs: SyncState

Mailbox
    ├── belongsTo: MailAccount
    ├── contains: MailThread[]
    └── syncs: SyncState

MailThread
    ├── belongsTo: MailAccount
    ├── belongsTo: Mailbox
    ├── contains: MailMessage[]
    ├── hasParticipant: Participant[]
    ├── hasLabel: Label[]
    └── engineering: EngineeringRelationships

MailMessage
    ├── belongsTo: MailThread
    ├── hasAttachment: Attachment[]
    ├── hasParticipant: Participant[]
    ├── hasLabel: Label[]
    ├── hasDelivery: Delivery
    └── engineering: EngineeringRelationships

Participant
    ├── belongsTo: MailMessage
    ├── belongsTo: MailThread
    └── hasAddress: Address[]

Attachment
    ├── belongsTo: MailMessage
    ├── belongsTo: Draft
    └── mayBecome: ArtifactReference

Draft
    ├── belongsTo: MailAccount
    ├── hasAttachment: Attachment[]
    ├── hasParticipant: Participant[]
    └── engineering: EngineeringRelationships

Delivery
    ├── belongsTo: MailMessage
    └── hasRecipient: DeliveryRecipient[]

Label
    ├── belongsTo: MailAccount
    ├── appliedTo: MailThread[]
    └── appliedTo: MailMessage[]

SyncState
    ├── belongsTo: MailAccount
    └── belongsTo: Mailbox
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| MailAccount | Provider | Account state, authentication |
| Mailbox | Provider | Mailbox state, folder structure |
| MailThread | Provider | Thread state, message grouping |
| MailMessage | Provider | Message content, delivery |
| Participant | Provider | Participant state |
| Address | Provider | Address validation |
| Attachment | Provider | Attachment storage, download |
| Draft | Provider (synced) / Vestara (local) | Draft state |
| Delivery | Provider | Delivery state, bounces |
| Label | Provider | Label state |
| Folder | Provider | Folder structure |
| SyncState | ConnectorRuntime | Sync coordination |

### 4.2 Ownership Rules

1. **Provider Authority**: Provider is authoritative for mailbox state
2. **Local Drafts**: Vestara may persist unsynced drafts temporarily
3. **Normalized Indexes**: Vestara may persist normalized search indexes
4. **Presentation Preferences**: Vestara owns UI preferences
5. **Engineering Relationships**: Vestara owns project/session links

---

## 5. Lifecycle

### 5.1 MailAccount Lifecycle

```
Connected
  ↓
Authenticating
  ↓
Syncing
  ↓
Active
  ↓
Monitoring
  ↓
TokenRefresh
  ↓
Disconnected
  ↓
Removed
```

### 5.2 Mailbox Lifecycle

```
Discovered
  ↓
Syncing
  ↓
Active
  ↓
Monitoring
  ↓
Pausing
  ↓
Resuming
  ↓
Archived
```

### 5.3 MailThread Lifecycle

```
Received
  ↓
Active
  ↓
Replied
  ↓
Archived
  ↓
Deleted
```

### 5.4 MailMessage Lifecycle

```
Received
  ↓
Read
  ↓
Archived
  ↓
Deleted
```

### 5.5 Draft Lifecycle

```
Created
  ↓
Editing
  ↓
Syncing
  ↓
Ready
  ↓
Sending
  ↓
Sent
  ↓
Archived
```

### 5.6 Delivery Lifecycle

```
Pending
  ↓
Sending
  ↓
Delivered
  ↓
Opened
  ↓
Replied
```

### 5.7 SyncState Lifecycle

```
Initial
  ↓
Syncing
  ↓
UpToDate
  ↓
DeltaSync
  ↓
Conflict
  ↓
Resolving
  ↓
UpToDate
```

---

## 6. Events

### 6.1 MailAccount Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AccountConnected | MailAccount | Connection |
| AccountAuthenticated | MailAccount | Authentication |
| AccountSynced | MailAccount, SyncState | Sync |
| AccountTokenRefreshed | MailAccount | Token refresh |
| AccountDisconnected | MailAccount, Reason | Disconnection |

### 6.2 MailThread Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ThreadReceived | MailThread | Receipt |
| ThreadUpdated | MailThread, ChangeSet | Update |
| ThreadArchived | MailThread | Archive |
| ThreadDeleted | MailThread, Reason | Deletion |

### 6.3 MailMessage Events

| Event | Payload | Trigger |
|-------|---------|---------|
| MessageReceived | MailMessage | Receipt |
| MessageRead | MailMessage | Read |
| MessageArchived | MailMessage | Archive |
| MessageDeleted | MailMessage, Reason | Deletion |

### 6.4 Draft Events

| Event | Payload | Trigger |
|-------|---------|---------|
| DraftCreated | Draft | Creation |
| DraftUpdated | Draft, ChangeSet | Update |
| DraftSynced | Draft | Sync |
| DraftSent | Draft, Delivery | Send |
| DraftDeleted | Draft, Reason | Deletion |

### 6.5 Delivery Events

| Event | Payload | Trigger |
|-------|---------|---------|
| DeliveryPending | Delivery | Pending |
| DeliverySent | Delivery | Send |
| DeliveryDelivered | Delivery | Delivery |
| DeliveryBounced | Delivery, Bounce | Bounce |
| DeliveryFailed | Delivery, Failure | Failure |

### 6.6 SyncState Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SyncStarted | SyncState | Start |
| SyncProgress | SyncState, Progress | Progress |
| SyncCompleted | SyncState | Completion |
| SyncConflict | SyncState, Conflict | Conflict |
| SyncFailed | SyncState, Failure | Failure |

---

## 7. Projection Points

### 7.1 Workspace Projections

| Entity | Projection | Workspace Document |
|--------|------------|-------------------|
| MailAccount | Account List | `06-workspace/tools/02-messages-workspace.md` |
| Mailbox | Mailbox List | `06-workspace/tools/02-messages-workspace.md` |
| MailThread | Thread List | `06-workspace/tools/02-messages-workspace.md` |
| MailMessage | Message View | `06-workspace/tools/02-messages-workspace.md` |
| Participant | Participant List | `06-workspace/tools/02-messages-workspace.md` |
| Attachment | Attachment List | `06-workspace/tools/02-messages-workspace.md` |
| Draft | Draft List | `06-workspace/tools/02-messages-workspace.md` |
| Delivery | Delivery Status | `06-workspace/tools/02-messages-workspace.md` |
| Label | Label List | `06-workspace/tools/02-messages-workspace.md` |
| Folder | Folder List | `06-workspace/tools/02-messages-workspace.md` |

### 7.2 Projection Rules

1. **Provider Authority**: Provider is authoritative for mailbox state
2. **Read-Only Projections**: Workspace projections are read-only views
3. **State Synchronization**: Projections update via provider sync
4. **Lazy Loading**: Projections load on demand
5. **Caching**: Projections may cache for performance

---

## 8. Verification Requirements

### 8.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| MailAccount | Authentication Testing | Account connects correctly |
| Mailbox | Sync Testing | Mailbox syncs correctly |
| MailThread | Thread Testing | Threads group correctly |
| MailMessage | Message Testing | Messages display correctly |
| Participant | Participant Testing | Participants resolve correctly |
| Attachment | Attachment Testing | Attachments download correctly |
| Draft | Draft Testing | Drafts sync correctly |
| Delivery | Delivery Testing | Delivery tracks correctly |

### 8.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 8.3 Evidence Requirements

1. **Connection Evidence**: Account connection logs
2. **Sync Evidence**: Sync operation logs
3. **Delivery Evidence**: Delivery status logs
4. **Security Evidence**: Token handling logs
5. **Performance Evidence**: Sync performance metrics

---

## 9. Integration Points

### 9.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Artifact Storage | Artifact management | Storage API |
| Verification Runtime | Verification execution | Verification API |
| Contact Service | Contact resolution | Contact API |

### 9.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Gmail API | Gmail access | Gmail API |
| Microsoft Graph | Outlook access | Graph API |
| IMAP Server | IMAP access | IMAP Protocol |
| SMTP Server | SMTP access | SMTP Protocol |

---

## 10. Open Questions

1. How should cross-account search be optimized?
2. How should large attachments be handled?
3. How should provider rate limits be managed?
4. How should offline drafts be synchronized?
5. How should email templates be versioned?

---

*This document defines the canonical Messaging domain contract for Vestara.*
*The Workspace projects this domain without becoming an independent owner of mailbox truth.*
