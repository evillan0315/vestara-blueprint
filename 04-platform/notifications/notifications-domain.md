---
id: "notifications-domain"
title: "Notifications Domain — Canonical Unified Notification Contract"
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
tags: ["platform", "notifications", "canonical"]
---

# Notifications Domain

## Canonical Unified Notification Contract

> **Notifications is a unified system that aggregates alerts from all Vestara domains into one projection.**

---

## 1. Architectural Position

```
Engineering Events
        ↓
Notification Runtime
        ↓
Notification Projection
```

Sources include:
- Messages
- Calendar
- BuilderRuntime
- Verification
- AgentRuntime
- Operations
- Marketplace

Everything flows through one notification system.

---

## 2. Canonical Entities

### 2.1 Notification

```
Notification
    ├── NotificationIdentity
    │   ├── id: NotificationId
    │   ├── type: NotificationType
    │   ├── source: NotificationSource
    │   └── timestamp: timestamp
    ├── NotificationDefinition
    │   ├── title: string
    │   ├── body: string
    │   ├── severity: NotificationSeverity
    │   ├── category: NotificationCategory
    │   ├── actions: NotificationAction[]
    │   └── metadata: NotificationMetadata
    ├── NotificationState
    │   ├── status: NotificationStatus
    │   ├── read: boolean
    │   ├── dismissed: boolean
    │   ├── archived: boolean
    │   └── lastModified: timestamp
    └── NotificationMetadata
        ├── tags: string[]
        ├── sourceEntity: EntityReference
        ├── engineering: EngineeringRelationships
        └── delivery: DeliveryConfiguration
```

### 2.2 NotificationSource

```
NotificationSource
    ├── NotificationSourceIdentity
    │   ├── id: NotificationSourceId
    │   ├── name: string
    │   ├── type: SourceType
    │   └── description: string
    ├── NotificationSourceDefinition
    │   ├── capabilities: SourceCapability[]
    │   ├── configuration: SourceConfiguration
    │   └── filters: SourceFilter[]
    ├── NotificationSourceState
    │   ├── status: SourceStatus
    │   ├── enabled: boolean
    │   └── lastEvent: timestamp
    └── NotificationSourceMetadata
        ├── tags: string[]
        └── version: string
```

### 2.3 NotificationAction

```
NotificationAction
    ├── NotificationActionIdentity
    │   ├── id: NotificationActionId
    │   ├── notificationId: NotificationId
    │   └── type: ActionType
    ├── NotificationActionDefinition
    │   ├── label: string
    │   ├── description: string
    │   ├── handler: string
    │   ├── parameters: ParameterDefinition[]
    │   └── confirmation: ConfirmationDefinition (optional)
    ├── NotificationActionState
    │   ├── status: NotificationActionStatus
    │   └── executedAt: timestamp
    └── NotificationActionMetadata
        ├── tags: string[]
        └── requiresApproval: boolean
```

### 2.4 NotificationSubscription

```
NotificationSubscription
    ├── NotificationSubscriptionIdentity
    │   ├── id: NotificationSubscriptionId
    │   ├── userId: UserId
    │   └── source: NotificationSourceId
    ├── NotificationSubscriptionDefinition
    │   ├── channels: NotificationChannel[]
    │   ├── filters: SubscriptionFilter[]
    │   ├── schedule: SubscriptionSchedule
    │   └── preferences: SubscriptionPreferences
    ├── NotificationSubscriptionState
    │   ├── status: SubscriptionStatus
    │   ├── active: boolean
    │   └── lastNotified: timestamp
    └── NotificationSubscriptionMetadata
        ├── tags: string[]
        └── createdAt: timestamp
```

### 2.5 NotificationChannel

```
NotificationChannel
    ├── NotificationChannelIdentity
    │   ├── id: NotificationChannelId
    │   ├── type: ChannelType
    │   └── name: string
    ├── NotificationChannelDefinition
    │   ├── configuration: ChannelConfiguration
    │   ├── capabilities: ChannelCapability[]
    │   └── rateLimit: RateLimitDefinition
    ├── NotificationChannelState
    │   ├── status: ChannelStatus
    │   ├── enabled: boolean
    │   └── lastDelivered: timestamp
    └── NotificationChannelMetadata
        ├── tags: string[]
        └── provider: string
```

### 2.6 NotificationPreference

```
NotificationPreference
    ├── NotificationPreferenceIdentity
    │   ├── id: NotificationPreferenceId
    │   ├── userId: UserId
    │   └── source: NotificationSourceId
    ├── NotificationPreferenceDefinition
    │   ├── enabled: boolean
    │   ├── channels: ChannelType[]
    │   ├── severity: NotificationSeverity[]
    │   ├── categories: NotificationCategory[]
    │   ├── quietHours: QuietHoursDefinition
    │   └── digest: DigestDefinition
    ├── NotificationPreferenceState
    │   ├── status: PreferenceStatus
    │   └── lastUpdated: timestamp
    └── NotificationPreferenceMetadata
        ├── tags: string[]
        └── default: boolean
```

### 2.7 NotificationDigest

```
NotificationDigest
    ├── NotificationDigestIdentity
    │   ├── id: NotificationDigestId
    │   ├── userId: UserId
    │   └── period: DigestPeriod
    ├── NotificationDigestDefinition
    │   ├── notifications: NotificationSummary[]
    │   ├── statistics: DigestStatistics
    │   └── generatedAt: timestamp
    ├── NotificationDigestState
    │   ├── status: DigestStatus
    │   └── delivered: boolean
    └── NotificationDigestMetadata
        ├── tags: string[]
        └── format: DigestFormat
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
NotificationSource 1──* Notification
Notification 1──* NotificationAction
NotificationSubscription *──* NotificationSource
NotificationSubscription *──* NotificationChannel
NotificationSubscription *──* NotificationPreference
NotificationChannel *──* NotificationSubscription
NotificationPreference *──* NotificationSource
NotificationDigest 1──* Notification
```

### 3.2 Engineering Relationships

```
Notification *──* EngineeringSession
Notification *──* Project
Notification *──* Task
Notification *──* Approval
Notification *──* Deployment
Notification *──* Message
Notification *──* CalendarEvent
Notification *──* Artifact
```

### 3.3 Dependency Graph

```
NotificationSource
    ├── produces: Notification[]
    ├── configuredBy: NotificationSourceDefinition
    └── subscribedTo: NotificationSubscription[]

Notification
    ├── belongsTo: NotificationSource
    ├── hasAction: NotificationAction[]
    ├── linkedTo: EntityReference
    └── engineering: EngineeringRelationships

NotificationSubscription
    ├── belongsTo: NotificationSource
    ├── deliversTo: NotificationChannel[]
    ├── configuredBy: NotificationPreference
    └── generates: NotificationDigest

NotificationChannel
    ├── usedBy: NotificationSubscription[]
    ├── delivers: Notification[]
    └── configuredBy: ChannelConfiguration

NotificationPreference
    ├── belongsTo: NotificationSubscription
    ├── filters: NotificationSource
    └── configures: NotificationChannel[]

NotificationDigest
    ├── belongsTo: NotificationSubscription
    └── contains: Notification[]
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| Notification | NotificationRuntime | Notification lifecycle, delivery |
| NotificationSource | NotificationRuntime | Source registration, event handling |
| NotificationAction | NotificationRuntime | Action execution |
| NotificationSubscription | NotificationRuntime | Subscription management |
| NotificationChannel | NotificationRuntime | Channel management, delivery |
| NotificationPreference | NotificationRuntime | Preference management |
| NotificationDigest | NotificationRuntime | Digest generation |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner may delegate projection to Workspace

---

## 5. Lifecycle

### 5.1 Notification Lifecycle

```
Created
  ↓
Queued
  ↓
Delivered
  ↓
Read
  ↓
Actioned
  ↓
Archived
```

### 5.2 NotificationSource Lifecycle

```
Registered
  ↓
Configured
  ↓
Active
  ↓
Monitoring
  ↓
Disabled
  ↓
Unregistered
```

### 5.3 NotificationSubscription Lifecycle

```
Created
  ↓
Confirmed
  ↓
Active
  ↓
Paused
  ↓
Cancelled
  ↓
Archived
```

### 5.4 NotificationChannel Lifecycle

```
Created
  ↓
Configured
  ↓
Active
  ↓
RateLimited
  ↓
Disabled
  ↓
Removed
```

### 5.5 NotificationDigest Lifecycle

```
Generated
  ↓
Queued
  ↓
Delivered
  ↓
Read
  ↓
Archived
```

---

## 6. Events

### 6.1 Notification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| NotificationCreated | Notification | Creation |
| NotificationDelivered | Notification | Delivery |
| NotificationRead | Notification | Read |
| NotificationActioned | Notification, NotificationAction | Action |
| NotificationDismissed | Notification, Reason | Dismiss |
| NotificationArchived | Notification, Reason | Archive |

### 6.2 NotificationSource Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SourceRegistered | NotificationSource | Registration |
| SourceEnabled | NotificationSource | Enable |
| SourceDisabled | NotificationSource, Reason | Disable |
| SourceEventReceived | NotificationSource, Event | Event |

### 6.3 NotificationSubscription Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SubscriptionCreated | NotificationSubscription | Creation |
| SubscriptionConfirmed | NotificationSubscription | Confirmation |
| SubscriptionPaused | NotificationSubscription, Reason | Pause |
| SubscriptionCancelled | NotificationSubscription, Reason | Cancel |

### 6.4 NotificationChannel Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ChannelCreated | NotificationChannel | Creation |
| ChannelEnabled | NotificationChannel | Enable |
| ChannelDisabled | NotificationChannel, Reason | Disable |
| ChannelRateLimited | NotificationChannel | Rate limit |

---

## 7. Notification Types

### 7.1 Source Types

```typescript
type SourceType = 
  | 'messages'
  | 'calendar'
  | 'builderruntime'
  | 'verification'
  | 'agentruntime'
  | 'operations'
  | 'marketplace'
  | 'custom';
```

### 7.2 Notification Types

```typescript
type NotificationType = 
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'reminder'
  | 'approval'
  | 'assignment'
  | 'update'
  | 'alert'
  | 'system';
```

### 7.3 Notification Severity

```typescript
type NotificationSeverity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';
```

### 7.4 Notification Categories

```typescript
type NotificationCategory = 
  | 'engineering'
  | 'communication'
  | 'calendar'
  | 'approval'
  | 'deployment'
  | 'verification'
  | 'security'
  | 'system';
```

### 7.5 Channel Types

```typescript
type ChannelType = 
  | 'in-app'
  | 'email'
  | 'sms'
  | 'push'
  | 'webhook'
  | 'slack'
  | 'teams'
  | 'custom';
```

### 7.6 Action Types

```typescript
type ActionType = 
  | 'open'
  | 'approve'
  | 'reject'
  | 'dismiss'
  | 'snooze'
  | 'archive'
  | 'custom';
```

---

## 8. Projection Points

### 8.1 Workspace Projections

| Entity | Projection | Workspace Document |
|--------|------------|-------------------|
| Notification | Notification List | `06-workspace/01-workspace-overview.md` |
| NotificationSource | Source List | `06-workspace/01-workspace-overview.md` |
| NotificationSubscription | Subscription View | `06-workspace/01-workspace-overview.md` |
| NotificationPreference | Preference View | `06-workspace/01-workspace-overview.md` |
| NotificationDigest | Digest View | `06-workspace/01-workspace-overview.md` |

### 8.2 Projection Rules

1. **Unified Projection**: All notifications projected into one view
2. **Read-Only Projections**: Workspace projections are read-only views
3. **State Synchronization**: Projections update via domain events
4. **Lazy Loading**: Projections load on demand
5. **Caching**: Projections may cache for performance

---

## 9. Verification Requirements

### 9.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| Notification | Delivery Testing | Notifications deliver correctly |
| NotificationSource | Source Testing | Sources emit events correctly |
| NotificationAction | Action Testing | Actions execute correctly |
| NotificationSubscription | Subscription Testing | Subscriptions manage correctly |
| NotificationChannel | Channel Testing | Channels deliver correctly |
| NotificationPreference | Preference Testing | Preferences filter correctly |
| NotificationDigest | Digest Testing | Digests generate correctly |

### 9.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 9.3 Evidence Requirements

1. **Delivery Evidence**: Notification delivery logs
2. **Source Evidence**: Source event logs
3. **Action Evidence**: Action execution logs
4. **Channel Evidence**: Channel delivery logs
5. **Preference Evidence**: Preference configuration logs

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Messaging Domain | Message notifications | Messaging API |
| Calendar Domain | Calendar notifications | Calendar API |
| BuilderRuntime | Builder notifications | Runtime API |
| Verification Runtime | Verification notifications | Verification API |

### 10.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Email Service | Email delivery | SMTP API |
| SMS Service | SMS delivery | SMS API |
| Push Service | Push delivery | Push API |
| Chat Service | Chat delivery | Chat API |

---

## 11. Open Questions

1. How should notification deduplication be handled?
2. How should notification rate limiting be enforced?
3. How should notification preferences be managed across devices?
4. How should notification digests be personalized?
5. How should notification history be retained?

---

*This document defines the canonical Notifications domain contract for Vestara.*
*Notifications is a unified system that aggregates alerts from all Vestara domains into one projection.*
