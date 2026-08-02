---
id: "messages-workspace"
title: "Messages Workspace — Provider-Integrated Projection"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: []
tags: ["workspace", "tools", "messages", "projection"]
---

# Messages Workspace

## Provider-Integrated Projection

> **The Vestara Messages Workspace is a provider-integrated, session-aware projection of mail accounts, threads, messages, drafts, attachments, and delivery state. It connects communication to projects and engineering sessions without becoming an independent owner of mailbox truth.**

---

## 1. Architectural Rule

```
Messages Workspace ≠ mail domain owner
```

The provider remains authoritative for mailbox state. Vestara may persist normalized indexes, local drafts, presentation preferences, and engineering relationships, but it must not create a second independent mailbox source of truth.

---

## 2. Projection Chain

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

---

## 3. Projection Sources

### 3.1 Resolved Contracts

| Domain Contract | Canonical Document | Runtime Owner | Status |
|----------------|-------------------|---------------|--------|
| Engineering Session | `14-engineering/engineering-principles.md` | WorkspaceRuntime | Implemented |
| Project | `14-engineering/engineering-principles.md` | WorkspaceRuntime | Implemented |
| Task | `14-engineering/engineering-principles.md` | PlanningService | Implemented |
| Artifact | `14-engineering/evidence-based-verification.md` | ArtifactStorage | Implemented |
| Approval | `14-engineering/evidence-based-verification.md` | VerificationRuntime | Implemented |

### 3.2 Pending Canonical Contracts

| Domain Contract | Canonical Document | Runtime Owner | Status |
|----------------|-------------------|---------------|--------|
| MailAccount | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| MailThread | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| MailMessage | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| Draft | `04-platform/messaging/messaging-domain.md` | Provider (synced) / Vestara (local) | Proposed |
| Attachment | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| Delivery | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| Label | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| Folder | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| Participant | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |
| Address | `04-platform/messaging/messaging-domain.md` | Provider | Proposed |

---

## 4. Workspace Structure

```
Messages
├── Unified Inbox
├── Accounts
├── Threads
├── Sent
├── Drafts
├── Scheduled
├── Archived
├── Starred
├── Labels
├── Attachments
├── Contacts
└── Settings
```

---

## 5. Projection Sections

### 5.1 Unified Inbox

> **Projection of: MailThread, MailMessage, Label, Participant**

```
Unified Inbox
    ├── ThreadIdentity (from MailThread)
    ├── AccountIdentity (from MailAccount)
    ├── Sender (from Participant)
    ├── Subject (from MailThread)
    ├── ThreadSummary (from MailThread)
    ├── UnreadState (from MailThread)
    ├── Priority (from MailMessage)
    ├── Labels (from Label)
    ├── Attachments (from Attachment)
    ├── Provider (from MailAccount)
    ├── ReceivedTime (from MailMessage)
    └── EngineeringRelationships (from EngineeringGraph)
```

#### Filter Capabilities

| Filter | Source | Type |
|--------|--------|------|
| Provider | MailAccount | Select |
| Account | MailAccount | Select |
| Unread | MailThread | Boolean |
| Starred | MailThread | Boolean |
| Has Attachments | Attachment | Boolean |
| Project | EngineeringGraph | Select |
| Engineering Session | EngineeringGraph | Select |
| Task | EngineeringGraph | Select |
| Participant | Participant | Select |
| Date Range | MailMessage | DateRange |

### 5.2 Thread View

> **Projection of: MailThread, MailMessage, Participant, Attachment, Label**

```
Message Thread
    ├── ThreadIdentity (from MailThread)
    ├── Participants (from Participant)
    ├── Subject (from MailThread)
    ├── Messages (from MailMessage)
    ├── Attachments (from Attachment)
    ├── ProviderMetadata (from MailAccount)
    ├── DeliveryState (from Delivery)
    ├── LabelsAndFolders (from Label, Folder)
    ├── RelatedProject (from EngineeringGraph)
    ├── RelatedSession (from EngineeringGraph)
    ├── RelatedTasks (from EngineeringGraph)
    └── AvailableActions (from Policy)
```

### 5.3 Accounts

> **Projection of: MailAccount, SyncState**

```
Accounts
    ├── AccountIdentity (from MailAccount)
    ├── Email (from MailAccount)
    ├── DisplayName (from MailAccount)
    ├── Provider (from MailAccount)
    ├── Capabilities (from MailProviderCapabilities)
    ├── SyncState (from SyncState)
    ├── LastSynced (from MailAccount)
    ├── UnreadCount (from MailAccount)
    └── Status (from MailAccount)
```

### 5.4 Drafts

> **Projection of: Draft, Attachment, Participant**

```
Drafts
    ├── DraftIdentity (from Draft)
    ├── Account (from MailAccount)
    ├── Thread (from MailThread)
    ├── To (from Participant)
    ├── Subject (from Draft)
    ├── Body (from Draft)
    ├── Attachments (from Attachment)
    ├── SyncState (from DraftSyncState)
    ├── LastEdited (from Draft)
    ├── Version (from Draft)
    └── EngineeringRelationships (from EngineeringGraph)
```

### 5.5 Sent

> **Projection of: MailMessage, Delivery**

```
Sent
    ├── MessageIdentity (from MailMessage)
    ├── To (from Participant)
    ├── Subject (from MailMessage)
    ├── DeliveryState (from Delivery)
    ├── Timestamp (from MailMessage)
    └── EngineeringRelationships (from EngineeringGraph)
```

### 5.6 Scheduled

> **Projection of: Draft, ScheduleDefinition**

```
Scheduled
    ├── DraftIdentity (from Draft)
    ├── SendAt (from ScheduleDefinition)
    ├── Timezone (from ScheduleDefinition)
    ├── To (from Participant)
    ├── Subject (from Draft)
    └── Status (from DraftStatus)
```

### 5.7 Archived

> **Projection of: MailThread, MailMessage**

```
Archived
    ├── ThreadIdentity (from MailThread)
    ├── Subject (from MailThread)
    ├── LastActivity (from MailThread)
    ├── MessageCount (from MailThread)
    └── EngineeringRelationships (from EngineeringGraph)
```

### 5.8 Starred

> **Projection of: MailThread, MailMessage**

```
Starred
    ├── ThreadIdentity (from MailThread)
    ├── Subject (from MailThread)
    ├── LastActivity (from MailThread)
    ├── UnreadState (from MailThread)
    └── EngineeringRelationships (from EngineeringGraph)
```

### 5.9 Labels

> **Projection of: Label**

```
Labels
    ├── LabelIdentity (from Label)
    ├── Name (from Label)
    ├── Color (from Label)
    ├── Type (from Label)
    ├── MessageCount (from Label)
    ├── UnreadCount (from Label)
    └── Parent (from Label)
```

### 5.10 Attachments

> **Projection of: Attachment, MailMessage**

```
Attachments
    ├── AttachmentIdentity (from Attachment)
    ├── Filename (from Attachment)
    ├── ContentType (from Attachment)
    ├── Size (from Attachment)
    ├── Message (from MailMessage)
    ├── DownloadState (from Attachment)
    ├── Scanned (from Attachment)
    ├── Artifact (from ArtifactStorage)
    └── EngineeringRelationships (from EngineeringGraph)
```

### 5.11 Contacts

> **Projection of: Participant, Address**

```
Contacts
    ├── ParticipantIdentity (from Participant)
    ├── Name (from Participant)
    ├── Email (from Address)
    ├── Addresses (from Address)
    ├── Contact (from ContactService)
    ├── Organization (from OrganizationService)
    ├── LastSeen (from Participant)
    └── Frequency (from Participant)
```

### 5.12 Settings

> **Projection of: MailAccount, SyncConfiguration**

```
Settings
    ├── AccountSettings (from MailAccount)
    ├── SyncConfiguration (from SyncConfiguration)
    ├── SignatureSettings (from MailAccount)
    ├── NotificationSettings (from NotificationConfiguration)
    ├── SecuritySettings (from SecurityConfiguration)
    └── AppearanceSettings (from PresentationPreferences)
```

---

## 6. Inspector Sections

Each thread and message opens through the Universal Inspector:

```
Message/Thread Entity
        ↓
Universal Inspector
    ├── Overview
    ├── Participants
    ├── ProviderMetadata
    ├── Attachments
    ├── EngineeringRelationships
    ├── Activity
    ├── History
    ├── Delivery
    └── AvailableActions
```

---

## 7. Action Projections

> **Actions are projected from the policy/action system, not defined by the Workspace.**

```typescript
interface MessageActionProjection {
  actionId: string;
  labelToken: string;
  availability: 'available' | 'disabled' | 'hidden';
  decisionSource: string;
  approvalRequired: boolean;
  denialReason?: string;
}
```

### 7.1 Available Actions

| Context | Available Actions |
|---------|-------------------|
| Thread | Reply, Reply All, Forward, Archive, Delete, Star, Label, Create Task, Create Session |
| Message | Reply, Forward, Download Attachment, Link to Project |
| Draft | Edit, Send, Delete, Schedule |
| Attachment | Download, Import as Artifact, Link to Project |
| Contact | Open in Contacts, Link to Organization |

---

## 8. Compose and Drafts

### 8.1 Compose Experience

```
New Message
    ├── Reply
    ├── Reply All
    ├── Forward
    ├── Draft Autosave
    ├── Multiple Accounts
    ├── Attachments
    ├── Scheduling
    ├── Signatures
    ├── Templates
    ├── Rich Text
    └── Plain Text
```

### 8.2 Draft Synchronization

```
Local Draft State
        ↓
Provider Draft Synchronization
        ↓
Canonical Provider Draft
```

The Workspace may temporarily persist unsynced editing state, but once synchronized, the provider draft becomes authoritative.

---

## 9. AI Assistance

### 9.1 AI Actions

```
Summarize Thread
Draft Reply
Rewrite Tone
Extract Action Items
Identify Commitments
Detect Deadlines
Link to Project
Create Task from Message
Create Engineering Session
Explain Attachment
```

### 9.2 AI Safety Rules

1. **No Automatic Send**: AI actions must never send messages automatically
2. **Explicit User Action**: Send requires explicit user action or approved automation
3. **Human Review Required**: Drafts generated by agents require human review
4. **Audit Trail**: All AI actions logged for audit

### 9.3 AI Draft Metadata

```
Generated By
Source Messages
Context Used
Related Project
Related Session
Confidence Unavailable
Human Review Required
```

---

## 10. Engineering Integration

### 10.1 Message as Engineering Input

```
Incoming Message
        ↓
User Links or Classifies It
        ↓
Project / Engineering Session
        ↓
Requirement / Task / Approval / Incident
        ↓
Execution and Evidence
```

### 10.2 Available Integration Actions

```
Create Task
Create Engineering Session
Attach to Existing Session
Convert to Requirement
Create Approval Request
Link Attachment as Artifact
Open Sender in Contacts
```

### 10.3 Integration Rules

1. **Canonical Commands**: Use canonical domain commands
2. **No Domain Ownership**: Messages does not define task or session behavior
3. **Relationship Projection**: Relationships exist in Engineering Graph
4. **Provider Independence**: Integration does not affect provider state

---

## 11. Attachments

### 11.1 Attachment Projection

```
Attachment
    ├── Filename
    ├── ContentType
    ├── Size
    ├── Provider Reference
    ├── Integrity Hash
    ├── Download State
    ├── Malware Scan State
    ├── Related Artifact
    └── Related Session
```

### 11.2 Attachment Promotion

```
Mail Attachment
        ↓
Import as Artifact
        ↓
ArtifactStorage
        ↓
Engineering Event
        ↓
Engineering Graph
```

Attachments should not automatically become engineering artifacts. Promotion must be explicit.

---

## 12. Sync and Offline Behavior

### 12.1 Sync States

```
Connected
Syncing
Up to Date
Degraded
Authentication Required
Offline
Rate Limited
Provider Unavailable
Conflict
```

### 12.2 UI State Distinction

```
Provider State
Local Cached State
Pending Outbound Operations
Failed Synchronization
```

### 12.3 Semantic Token Mapping

Sync states map to Volume 13 semantic tokens for consistent UI presentation.

---

## 13. Security Requirements

### 13.1 Security Features

```
Secret Masking
Attachment Scanning
Provider Token Isolation
Encrypted Credential Storage
Account-Level Permissions
Read/Send Capability Separation
Audit History
Explicit Send Confirmation
External-Recipient Warnings
Restricted Attachment Warnings
```

### 13.2 Capability Model

```typescript
type MailCapability = 
  | 'mail.read'
  | 'mail.search'
  | 'mail.draft'
  | 'mail.send'
  | 'mail.forward'
  | 'mail.delete'
  | 'mail.archive'
  | 'mail.label'
  | 'mail.download-attachment';
```

### 13.3 Risk Levels

| Capability | Risk Level |
|------------|------------|
| mail.read | Low |
| mail.search | Low |
| mail.draft | Medium |
| mail.send | High |
| mail.forward | High |
| mail.delete | High |
| mail.archive | Medium |
| mail.label | Low |
| mail.download-attachment | Medium |

---

## 14. Routes

### 14.1 Standard Routes

```
/tools/messages
/tools/messages/inbox
/tools/messages/thread/:threadId
/tools/messages/drafts
/tools/messages/accounts
```

### 14.2 Session-Bound Routes

```
/sessions/:sessionId/messages
/sessions/:sessionId/messages/thread/:threadId
```

---

## 15. Implementation Notes

### 15.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Unified Inbox | Proposed | Canonical contract pending |
| Accounts | Proposed | Canonical contract pending |
| Threads | Proposed | Canonical contract pending |
| Drafts | Proposed | Canonical contract pending |
| Sent | Proposed | Canonical contract pending |
| Scheduled | Proposed | Canonical contract pending |
| Archived | Proposed | Canonical contract pending |
| Starred | Proposed | Canonical contract pending |
| Labels | Proposed | Canonical contract pending |
| Attachments | Proposed | Canonical contract pending |
| Contacts | Proposed | Canonical contract pending |
| Settings | Proposed | Canonical contract pending |

### 15.2 Open Questions

1. How should cross-account search be optimized?
2. How should large attachments be handled?
3. How should provider rate limits be managed?
4. How should offline drafts be synchronized?
5. How should email templates be versioned?

---

*This document defines the Messages Workspace projection for Vestara.*
*The Workspace projects mail accounts, threads, messages, drafts, attachments, and delivery state from connected providers.*
*The provider remains authoritative for mailbox state.*
