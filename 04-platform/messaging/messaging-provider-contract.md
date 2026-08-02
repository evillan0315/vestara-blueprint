---
id: "messaging-provider-contract"
title: "Messaging Provider Contract — Canonical Provider Interface"
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
tags: ["platform", "messaging", "provider", "canonical"]
---

# Messaging Provider Contract

## Canonical Provider Interface

> **This document defines the canonical interface that messaging providers must implement.**

---

## 1. Provider Adapter Interface

### 1.1 Core Interface

```typescript
interface MailProviderAdapter {
  providerId: string;
  capabilities: MailProviderCapabilities;

  // Account operations
  listAccounts(): Promise<MailAccountProjection[]>;
  getAccount(accountId: string): Promise<MailAccountProjection>;
  
  // Mailbox operations
  listMailboxes(accountId: string): Promise<MailboxProjection[]>;
  getMailbox(accountId: string, mailboxId: string): Promise<MailboxProjection>;
  
  // Thread operations
  listThreads(input: ThreadQuery): Promise<MailThreadProjection[]>;
  getThread(threadId: string): Promise<MailThreadProjection>;
  updateThread(input: ThreadMutation): Promise<void>;
  
  // Message operations
  getMessage(messageId: string): Promise<MailMessageProjection>;
  getMessageContent(messageId: string): Promise<MessageContentProjection>;
  
  // Draft operations
  createDraft(input: DraftInput): Promise<MailDraftProjection>;
  updateDraft(draftId: string, input: DraftInput): Promise<MailDraftProjection>;
  deleteDraft(draftId: string): Promise<void>;
  sendDraft(draftId: string): Promise<MessageDeliveryProjection>;
  
  // Label operations
  listLabels(accountId: string): Promise<LabelProjection[]>;
  createLabel(accountId: string, input: LabelInput): Promise<LabelProjection>;
  updateLabel(labelId: string, input: LabelInput): Promise<LabelProjection>;
  deleteLabel(labelId: string): Promise<void>;
  
  // Attachment operations
  getAttachment(attachmentId: string): Promise<AttachmentProjection>;
  downloadAttachment(attachmentId: string): Promise<AttachmentContent>;
  
  // Search operations
  searchMessages(input: SearchQuery): Promise<SearchResultProjection>;
  
  // Sync operations
  getSyncState(accountId: string): Promise<SyncStateProjection>;
  syncMailbox(accountId: string, mailboxId: string): Promise<SyncResultProjection>;
}
```

### 1.2 Capabilities Interface

```typescript
interface MailProviderCapabilities {
  // Authentication
  authFlows: AuthFlow[];
  tokenRefresh: boolean;
  multiAccount: boolean;
  
  // Message operations
  read: boolean;
  search: boolean;
  draft: boolean;
  send: boolean;
  forward: boolean;
  reply: boolean;
  replyAll: boolean;
  
  // Thread operations
  threadView: boolean;
  threadMerge: boolean;
  
  // Label operations
  labels: boolean;
  folders: boolean;
  customLabels: boolean;
  
  // Attachment operations
  attachments: boolean;
  largeAttachments: boolean;
  attachmentSize: DataSize;
  
  // Sync operations
  pushNotifications: boolean;
  deltaSync: boolean;
  fullSync: boolean;
  
  // Advanced features
  scheduling: boolean;
  templates: boolean;
  signatures: boolean;
  richText: boolean;
  plainText: boolean;
}
```

---

## 2. Projection Types

### 2.1 MailAccountProjection

```typescript
interface MailAccountProjection {
  id: string;
  email: string;
  displayName: string;
  providerId: string;
  capabilities: MailProviderCapabilities;
  syncState: SyncState;
  lastSynced: string;
  unreadCount: number;
  status: MailAccountStatus;
}
```

### 2.2 MailboxProjection

```typescript
interface MailboxProjection {
  id: string;
  name: string;
  type: MailboxType;
  accountId: string;
  parent?: string;
  special: boolean;
  syncable: boolean;
  messageCount: number;
  unreadCount: number;
  lastSynced: string;
  status: MailboxStatus;
}
```

### 2.3 MailThreadProjection

```typescript
interface MailThreadProjection {
  id: string;
  subject: string;
  accountId: string;
  mailboxId: string;
  participants: ParticipantProjection[];
  messageCount: number;
  lastMessage: MessageSummaryProjection;
  labels: LabelProjection[];
  flags: ThreadFlag[];
  unread: boolean;
  starred: boolean;
  archived: boolean;
  deleted: boolean;
  lastActivity: string;
  providerMetadata: ProviderMetadata;
  engineeringRelationships: EngineeringRelationships;
}
```

### 2.4 MailMessageProjection

```typescript
interface MailMessageProjection {
  id: string;
  threadId: string;
  accountId: string;
  messageId: string; // provider
  from: AddressProjection;
  to: AddressProjection[];
  cc: AddressProjection[];
  bcc: AddressProjection[];
  subject: string;
  body: MessageBodyProjection;
  attachments: AttachmentProjection[];
  headers: MessageHeaderProjection[];
  timestamp: string;
  read: boolean;
  starred: boolean;
  deleted: boolean;
  labels: LabelProjection[];
  folder: string;
  providerMetadata: ProviderMetadata;
  size: number;
  engineeringRelationships: EngineeringRelationships;
}
```

### 2.5 ParticipantProjection

```typescript
interface ParticipantProjection {
  id: string;
  name: string;
  email: string;
  addresses: AddressProjection[];
  contact?: string;
  organization?: string;
  lastSeen: string;
  frequency: InteractionFrequency;
}
```

### 2.6 AddressProjection

```typescript
interface AddressProjection {
  id: string;
  email: string;
  name: string;
  type: AddressType;
  primary: boolean;
  verified: boolean;
  lastUsed: string;
}
```

### 2.7 AttachmentProjection

```typescript
interface AttachmentProjection {
  id: string;
  messageId: string;
  filename: string;
  contentType: string;
  size: number;
  checksum: string;
  providerRef: string;
  downloadState: DownloadState;
  downloaded: boolean;
  scanned: boolean;
  clean: boolean;
  artifact?: string;
  engineeringRelationships: EngineeringRelationships;
}
```

### 2.8 MailDraftProjection

```typescript
interface MailDraftProjection {
  id: string;
  account: string;
  threadId?: string;
  providerDraftId?: string;
  to: AddressProjection[];
  cc: AddressProjection[];
  bcc: AddressProjection[];
  subject: string;
  body: MessageBodyProjection;
  attachments: AttachmentProjection[];
  signature?: string;
  schedule?: ScheduleDefinition;
  status: DraftStatus;
  syncState: DraftSyncState;
  lastEdited: string;
  version: number;
  engine: DraftEngine;
  engineeringRelationships: EngineeringRelationships;
}
```

### 2.9 MessageDeliveryProjection

```typescript
interface MessageDeliveryProjection {
  id: string;
  messageId: string;
  account: string;
  status: DeliveryStatus;
  recipients: DeliveryRecipient[];
  timestamp: string;
  providerResponse: ProviderResponse;
  delivered: boolean;
  bounced: boolean;
  failed: boolean;
  lastAttempt: string;
}
```

### 2.10 LabelProjection

```typescript
interface LabelProjection {
  id: string;
  name: string;
  account: string;
  type: LabelType;
  color?: string;
  parent?: string;
  system: boolean;
  visible: boolean;
  messageCount: number;
  unreadCount: number;
}
```

### 2.11 SearchResultProjection

```typescript
interface SearchResultProjection {
  threads: MailThreadProjection[];
  messages: MailMessageProjection[];
  total: number;
  hasMore: boolean;
  nextPageToken?: string;
}
```

---

## 3. Input Types

### 3.1 ThreadQuery

```typescript
interface ThreadQuery {
  account?: string;
  mailbox?: string;
  labels?: string[];
  unread?: boolean;
  starred?: boolean;
  hasAttachments?: boolean;
  participant?: string;
  dateRange?: DateRange;
  query?: string;
  limit?: number;
  pageToken?: string;
}
```

### 3.2 ThreadMutation

```typescript
interface ThreadMutation {
  threadId: string;
  addLabels?: string[];
  removeLabels?: string[];
  archive?: boolean;
  unarchive?: boolean;
  star?: boolean;
  unstar?: boolean;
  markRead?: boolean;
  markUnread?: boolean;
  delete?: boolean;
  undelete?: boolean;
}
```

### 3.3 DraftInput

```typescript
interface DraftInput {
  account: string;
  threadId?: string;
  to: AddressInput[];
  cc?: AddressInput[];
  bcc?: AddressInput[];
  subject: string;
  body: MessageBodyInput;
  attachments?: AttachmentInput[];
  signature?: string;
  schedule?: ScheduleInput;
}
```

### 3.4 AddressInput

```typescript
interface AddressInput {
  email: string;
  name?: string;
}
```

### 3.5 MessageBodyInput

```typescript
interface MessageBodyInput {
  content: string;
  mimeType: 'text/plain' | 'text/html';
}
```

### 3.6 AttachmentInput

```typescript
interface AttachmentInput {
  filename: string;
  contentType: string;
  content: Buffer | string;
  size: number;
}
```

### 3.7 LabelInput

```typescript
interface LabelInput {
  name: string;
  color?: string;
  parent?: string;
}
```

### 3.8 SearchQuery

```typescript
interface SearchQuery {
  account?: string;
  query: string;
  from?: string;
  to?: string;
  subject?: string;
  hasAttachment?: boolean;
  dateRange?: DateRange;
  labels?: string[];
  limit?: number;
  pageToken?: string;
}
```

### 3.9 ScheduleInput

```typescript
interface ScheduleInput {
  sendAt: string;
  timezone: string;
}
```

---

## 4. State Types

### 4.1 SyncState

```typescript
type SyncState = 
  | 'connected'
  | 'syncing'
  | 'up-to-date'
  | 'degraded'
  | 'authentication-required'
  | 'offline'
  | 'rate-limited'
  | 'provider-unavailable'
  | 'conflict';
```

### 4.2 MailAccountStatus

```typescript
type MailAccountStatus = 
  | 'active'
  | 'syncing'
  | 'error'
  | 'disconnected'
  | 'expired';
```

### 4.3 MailboxStatus

```typescript
type MailboxStatus = 
  | 'active'
  | 'syncing'
  | 'error'
  | 'paused';
```

### 4.4 ThreadStatus

```typescript
type ThreadStatus = 
  | 'active'
  | 'archived'
  | 'deleted';
```

### 4.5 MessageStatus

```typescript
type MessageStatus = 
  | 'received'
  | 'read'
  | 'archived'
  | 'deleted';
```

### 4.6 DraftStatus

```typescript
type DraftStatus = 
  | 'draft'
  | 'syncing'
  | 'ready'
  | 'sending'
  | 'sent'
  | 'error';
```

### 4.7 DraftSyncState

```typescript
type DraftSyncState = 
  | 'local'
  | 'syncing'
  | 'synced'
  | 'conflict'
  | 'error';
```

### 4.8 DeliveryStatus

```typescript
type DeliveryStatus = 
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'bounced'
  | 'failed';
```

### 4.9 DownloadState

```typescript
type DownloadState = 
  | 'available'
  | 'downloading'
  | 'downloaded'
  | 'error';
```

### 4.10 LabelType

```typescript
type LabelType = 
  | 'system'
  | 'user'
  | 'category';
```

### 4.11 MailboxType

```typescript
type MailboxType = 
  | 'inbox'
  | 'sent'
  | 'drafts'
  | 'trash'
  | 'spam'
  | 'archive'
  | 'custom';
```

---

## 5. Provider Implementations

### 5.1 Gmail Provider

```typescript
class GmailProvider implements MailProviderAdapter {
  providerId = 'gmail';
  
  capabilities: MailProviderCapabilities = {
    authFlows: ['oauth2'],
    tokenRefresh: true,
    multiAccount: true,
    read: true,
    search: true,
    draft: true,
    send: true,
    forward: true,
    reply: true,
    replyAll: true,
    threadView: true,
    threadMerge: true,
    labels: true,
    folders: false,
    customLabels: true,
    attachments: true,
    largeAttachments: true,
    attachmentSize: 25 * 1024 * 1024, // 25MB
    pushNotifications: true,
    deltaSync: true,
    fullSync: true,
    scheduling: true,
    templates: false,
    signatures: true,
    richText: true,
    plainText: true
  };
  
  // Implementation methods...
}
```

### 5.2 Microsoft Outlook Provider

```typescript
class OutlookProvider implements MailProviderAdapter {
  providerId = 'outlook';
  
  capabilities: MailProviderCapabilities = {
    authFlows: ['oauth2'],
    tokenRefresh: true,
    multiAccount: true,
    read: true,
    search: true,
    draft: true,
    send: true,
    forward: true,
    reply: true,
    replyAll: true,
    threadView: true,
    threadMerge: false,
    labels: false,
    folders: true,
    customLabels: false,
    attachments: true,
    largeAttachments: true,
    attachmentSize: 150 * 1024 * 1024, // 150MB
    pushNotifications: true,
    deltaSync: true,
    fullSync: true,
    scheduling: true,
    templates: true,
    signatures: true,
    richText: true,
    plainText: true
  };
  
  // Implementation methods...
}
```

### 5.3 Generic IMAP Provider

```typescript
class ImapProvider implements MailProviderAdapter {
  providerId = 'imap';
  
  capabilities: MailProviderCapabilities = {
    authFlows: ['password', 'oauth2'],
    tokenRefresh: false,
    multiAccount: true,
    read: true,
    search: true,
    draft: false,
    send: false,
    forward: false,
    reply: false,
    replyAll: false,
    threadView: false,
    threadMerge: false,
    labels: false,
    folders: true,
    customLabels: false,
    attachments: true,
    largeAttachments: false,
    attachmentSize: 10 * 1024 * 1024, // 10MB
    pushNotifications: false,
    deltaSync: false,
    fullSync: true,
    scheduling: false,
    templates: false,
    signatures: false,
    richText: false,
    plainText: true
  };
  
  // Implementation methods...
}
```

### 5.4 Generic SMTP Provider

```typescript
class SmtpProvider implements MailProviderAdapter {
  providerId = 'smtp';
  
  capabilities: MailProviderCapabilities = {
    authFlows: ['password'],
    tokenRefresh: false,
    multiAccount: true,
    read: false,
    search: false,
    draft: false,
    send: true,
    forward: false,
    reply: false,
    replyAll: false,
    threadView: false,
    threadMerge: false,
    labels: false,
    folders: false,
    customLabels: false,
    attachments: true,
    largeAttachments: false,
    attachmentSize: 10 * 1024 * 1024, // 10MB
    pushNotifications: false,
    deltaSync: false,
    fullSync: false,
    scheduling: false,
    templates: false,
    signatures: false,
    richText: false,
    plainText: true
  };
  
  // Implementation methods...
}
```

---

## 6. Future Providers

### 6.1 Planned Providers

| Provider | Status | Notes |
|----------|--------|-------|
| Proton Mail Bridge | Planned | Requires Proton Bridge |
| Fastmail | Planned | JMAP protocol |
| Zoho Mail | Planned | REST API |
| Custom Enterprise | Planned | Gateway integration |

### 6.2 Provider Registration

```typescript
interface ProviderRegistration {
  providerId: string;
  name: string;
  adapter: MailProviderAdapter;
  priority: number;
  enabled: boolean;
}
```

---

## 7. Security Considerations

### 7.1 Token Management

1. **Token Storage**: Tokens stored in encrypted credential storage
2. **Token Refresh**: Automatic token refresh before expiration
3. **Token Isolation**: Tokens isolated per account
4. **Token Revocation**: Support for token revocation

### 7.2 Capability Restrictions

```typescript
interface CapabilityRestriction {
  capability: string;
  requiresApproval: boolean;
  auditLog: boolean;
  rateLimit?: number;
}
```

### 7.3 Audit Requirements

1. **Send Operations**: All send operations logged
2. **Delete Operations**: All delete operations logged
3. **Forward Operations**: All forward operations logged
4. **External Recipients**: External recipient warnings
5. **Attachment Downloads**: Attachment download logging

---

## 8. Integration Points

### 8.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Connector Runtime | Sync coordination | Connector API |
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Artifact Storage | Attachment management | Storage API |
| Contact Service | Contact resolution | Contact API |

### 8.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Gmail API | Gmail access | Gmail API |
| Microsoft Graph | Outlook access | Graph API |
| IMAP Server | IMAP access | IMAP Protocol |
| SMTP Server | SMTP access | SMTP Protocol |

---

## 9. Open Questions

1. How should provider-specific features be exposed?
2. How should provider rate limits be managed?
3. How should provider outages be handled?
4. How should provider migrations be supported?
5. How should custom providers be registered?

---

*This document defines the canonical Messaging Provider Contract for Vestara.*
*Providers implement this interface to integrate with the Messaging domain.*
