---
id: "calendar-domain"
title: "Calendar Domain — Canonical Time Projection Contract"
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
tags: ["platform", "calendar", "canonical"]
---

# Calendar Domain

## Canonical Time Projection Contract

> **Calendar is a provider-integrated projection of time-based events connected to the Engineering Operating System.**

---

## 1. Architectural Position

```
Calendar Provider
        ↓
Calendar Runtime
        ↓
Calendar Domain
        ↓
Engineering Graph
        ↓
Calendar Workspace
```

Calendar enables:
- Milestone planning
- Deployment windows
- Sprint timelines
- Customer meetings
- Approval deadlines
- Verification reminders

All connected to Engineering Sessions.

---

## 2. Canonical Entities

### 2.1 CalendarAccount

```
CalendarAccount
    ├── CalendarAccountIdentity
    │   ├── id: CalendarAccountId
    │   ├── email: string
    │   ├── displayName: string
    │   └── provider: ProviderId
    ├── CalendarAccountDefinition
    │   ├── capabilities: CalendarCapability[]
    │   ├── syncConfig: SyncConfiguration
    │   ├── defaults: AccountDefaults
    │   └── timeZone: string
    ├── CalendarAccountState
    │   ├── status: CalendarAccountStatus
    │   ├── syncState: SyncState
    │   ├── lastSynced: timestamp
    │   └── eventCount: number
    └── CalendarAccountMetadata
        ├── tags: string[]
        ├── environment: Environment
        └── security: SecurityConfiguration
```

### 2.2 Calendar

```
Calendar
    ├── CalendarIdentity
    │   ├── id: CalendarId
    │   ├── name: string
    │   ├── type: CalendarType
    │   └── account: CalendarAccountId
    ├── CalendarDefinition
    │   ├── color: string
    │   ├── visible: boolean
    │   ├── editable: boolean
    │   ├── defaultEventDuration: Duration
    │   └── workingHours: WorkingHoursDefinition
    ├── CalendarState
    │   ├── status: CalendarStatus
    │   ├── eventCount: number
    │   ├── lastSynced: timestamp
    │   └── lastModified: timestamp
    └── CalendarMetadata
        ├── tags: string[]
        ├── provider: ProviderMetadata
        └── sharing: SharingDefinition
```

### 2.3 CalendarEvent

```
CalendarEvent
    ├── CalendarEventIdentity
    │   ├── id: CalendarEventId
    │   ├── calendarId: CalendarId
    │   ├── account: CalendarAccountId
    │   └── providerEventId: string
    ├── CalendarEventDefinition
    │   ├── subject: string
    │   ├── description: string
    │   ├── location: string
    │   ├── startTime: timestamp
    │   ├── endTime: timestamp
    │   ├── timeZone: string
    │   ├── allDay: boolean
    │   ├── recurrence: RecurrenceDefinition
    │   ├── attendees: Attendee[]
    │   ├── organizer: OrganizerDefinition
    │   ├── attachments: Attachment[]
    │   ├── reminders: ReminderDefinition[]
    │   └── categories: string[]
    ├── CalendarEventState
    │   ├── status: CalendarEventStatus
    │   ├── response: ResponseStatus
    │   ├── isRecurring: boolean
    │   ├── isCancelled: boolean
    │   └── lastModified: timestamp
    └── CalendarEventMetadata
        ├── tags: string[]
        ├── provider: ProviderMetadata
        ├── engineering: EngineeringRelationships
        └── visibility: EventVisibility
```

### 2.4 Attendee

```
Attendee
    ├── AttendeeIdentity
    │   ├── id: AttendeeId
    │   ├── eventId: CalendarEventId
    │   └── contactId: ContactId (optional)
    ├── AttendeeDefinition
    │   ├── emailAddress: string
    │   ├── displayName: string
    │   ├── type: AttendeeType
    │   ├── role: AttendeeRole
    │   └── response: ResponseStatus
    ├── AttendeeState
    │   ├── status: AttendeeStatus
    │   ├── responseTime: timestamp
    │   └── lastModified: timestamp
    └── AttendeeMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.5 Recurrence

```
Recurrence
    ├── RecurrenceIdentity
    │   ├── id: RecurrenceId
    │   ├── eventId: CalendarEventId
    │   └── type: RecurrenceType
    ├── RecurrenceDefinition
    │   ├── frequency: RecurrenceFrequency
    │   ├── interval: number
    │   ├── count: number (optional)
    │   ├── until: timestamp (optional)
    │   ├── byDay: DayOfWeek[]
    │   ├── byMonth: number[]
    │   └── exceptions: timestamp[]
    ├── RecurrenceState
    │   ├── status: RecurrenceStatus
    │   ├── nextOccurrence: timestamp
    │   └── occurrenceCount: number
    └── RecurrenceMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.6 Reminder

```
Reminder
    ├── ReminderIdentity
    │   ├── id: ReminderId
    │   ├── eventId: CalendarEventId
    │   └── type: ReminderType
    ├── ReminderDefinition
    │   ├── trigger: ReminderTrigger
    │   ├── action: ReminderAction
    │   └── acknowledged: boolean
    ├── ReminderState
    │   ├── status: ReminderStatus
    │   └── lastTriggered: timestamp
    └── ReminderMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.7 WorkingHours

```
WorkingHours
    ├── WorkingHoursIdentity
    │   ├── id: WorkingHoursId
    │   ├── account: CalendarAccountId
    │   └── name: string
    ├── WorkingHoursDefinition
    │   ├── days: WorkingDay[]
    │   ├── timezone: string
    │   └── holidays: HolidayDefinition[]
    ├── WorkingHoursState
    │   ├── status: WorkingHoursStatus
    │   └── lastUpdated: timestamp
    └── WorkingHoursMetadata
        ├── tags: string[]
        └── provider: ProviderMetadata
```

### 2.8 Meeting

```
Meeting
    ├── MeetingIdentity
    │   ├── id: MeetingId
    │   ├── eventId: CalendarEventId
    │   └── organizer: ContactId
    ├── MeetingDefinition
    │   ├── title: string
    │   ├── description: string
    │   ├── agenda: AgendaItem[]
    │   ├── participants: ContactId[]
    │   ├── duration: Duration
    │   ├── location: string
    │   └── virtualMeeting: VirtualMeetingDefinition
    ├── MeetingState
    │   ├── status: MeetingStatus
    │   ├── startedAt: timestamp
    │   ├── endedAt: timestamp
    │   └── actualDuration: Duration
    └── MeetingMetadata
        ├── tags: string[]
        ├── engineering: EngineeringRelationships
        └── outcome: MeetingOutcome
```

### 2.9 Sprint

```
Sprint
    ├── SprintIdentity
    │   ├── id: SprintId
    │   ├── name: string
    │   └── project: ProjectId
    ├── SprintDefinition
    │   ├── startDate: timestamp
    │   ├── endDate: timestamp
    │   ├── goals: string[]
    │   ├── capacity: Duration
    │   └── velocity: number
    ├── SprintState
    │   ├── status: SprintStatus
    │   ├── completedPoints: number
    │   ├── totalPoints: number
    │   └── burndownData: BurndownDataPoint[]
    └── SprintMetadata
        ├── tags: string[]
        └── engineering: EngineeringRelationships
```

### 2.10 Milestone

```
Milestone
    ├── MilestoneIdentity
    │   ├── id: MilestoneId
    │   ├── name: string
    │   └── project: ProjectId
    ├── MilestoneDefinition
    │   ├── dueDate: timestamp
    │   ├── description: string
    │   ├── deliverables: string[]
    │   └── dependencies: MilestoneId[]
    ├── MilestoneState
    │   ├── status: MilestoneStatus
    │   ├── completedAt: timestamp
    │   └── progress: number
    └── MilestoneMetadata
        ├── tags: string[]
        └── engineering: EngineeringRelationships
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
CalendarAccount 1──* Calendar
CalendarAccount 1──* CalendarEvent
Calendar 1──* CalendarEvent
CalendarEvent 1──* Attendee
CalendarEvent 1──* Recurrence
CalendarEvent 1──* Reminder
CalendarEvent 1──* Meeting
CalendarEvent *──* CalendarEvent (recurring instances)
Attendee *──* Contact
Meeting *──* Contact
Sprint *──* CalendarEvent
Milestone *──* CalendarEvent
```

### 3.2 Engineering Relationships

```
CalendarEvent *──* EngineeringSession
CalendarEvent *──* Project
CalendarEvent *──* Task
CalendarEvent *──* Approval
CalendarEvent *──* Deployment
Meeting *──* EngineeringSession
Meeting *──* Project
Meeting *──* Approval
Sprint *──* Project
Milestone *──* Project
```

### 2.3 Dependency Graph

```
CalendarAccount
    ├── contains: Calendar[]
    ├── contains: CalendarEvent[]
    ├── defines: WorkingHours
    └── syncs: SyncState

Calendar
    ├── belongsTo: CalendarAccount
    ├── contains: CalendarEvent[]
    └── defines: CalendarConfiguration

CalendarEvent
    ├── belongsTo: Calendar
    ├── hasAttendee: Attendee[]
    ├── hasRecurrence: Recurrence
    ├── hasReminder: Reminder[]
    ├── mayBecome: Meeting
    └── engineering: EngineeringRelationships

Attendee
    ├── belongsTo: CalendarEvent
    └── mayLinkTo: Contact

Meeting
    ├── belongsTo: CalendarEvent
    ├── hasParticipant: Contact[]
    └── engineering: EngineeringRelationships

Sprint
    ├── belongsTo: Project
    ├── contains: CalendarEvent[]
    └── engineering: EngineeringRelationships

Milestone
    ├── belongsTo: Project
    ├── contains: CalendarEvent[]
    └── engineering: EngineeringRelationships
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| CalendarAccount | Provider | Account state, authentication |
| Calendar | Provider | Calendar state, configuration |
| CalendarEvent | Provider | Event state, scheduling |
| Attendee | Provider | Attendee state, responses |
| Recurrence | Provider | Recurrence rules |
| Reminder | Provider | Reminder scheduling |
| WorkingHours | Provider | Working hours definition |
| Meeting | Vestara | Meeting tracking, outcomes |
| Sprint | Vestara | Sprint management |
| Milestone | Vestara | Milestone tracking |

### 4.2 Ownership Rules

1. **Provider Authority**: Provider is authoritative for calendar state
2. **Vestara Extensions**: Vestara owns meetings, sprints, milestones
3. **Local Drafts**: Vestara may persist unsynced events temporarily
4. **Presentation Preferences**: Vestara owns UI preferences
5. **Engineering Relationships**: Vestara owns project/session links

---

## 5. Lifecycle

### 5.1 CalendarAccount Lifecycle

```
Connected
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
```

### 5.2 Calendar Lifecycle

```
Discovered
  ↓
Syncing
  ↓
Active
  ↓
Monitoring
  ↓
Archived
```

### 5.3 CalendarEvent Lifecycle

```
Created
  ↓
Confirmed
  ↓
InProgress
  ↓
Completed
  ↓
Cancelled
  ↓
Archived
```

### 5.4 Meeting Lifecycle

```
Scheduled
  ↓
InProgress
  ↓
Completed
  ↓
FollowUp
  ↓
Archived
```

### 5.5 Sprint Lifecycle

```
Planned
  ↓
Active
  ↓
Review
  ↓
Completed
  ↓
Archived
```

### 5.6 Milestone Lifecycle

```
Defined
  ↓
InProgress
  ↓
AtRisk
  ↓
Completed
  ↓
Archived
```

---

## 6. Events

### 6.1 CalendarAccount Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AccountConnected | CalendarAccount | Connection |
| AccountSynced | CalendarAccount, SyncState | Sync |
| AccountDisconnected | CalendarAccount, Reason | Disconnection |

### 6.2 CalendarEvent Events

| Event | Payload | Trigger |
|-------|---------|---------|
| EventCreated | CalendarEvent | Creation |
| EventUpdated | CalendarEvent, ChangeSet | Update |
| EventCancelled | CalendarEvent, Reason | Cancellation |
| EventCompleted | CalendarEvent | Completion |

### 6.3 Meeting Events

| Event | Payload | Trigger |
|-------|---------|---------|
| MeetingScheduled | Meeting | Schedule |
| MeetingStarted | Meeting | Start |
| MeetingCompleted | Meeting | Completion |
| MeetingCancelled | Meeting, Reason | Cancellation |

### 6.4 Sprint Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SprintPlanned | Sprint | Planning |
| SprintStarted | Sprint | Start |
| SprintCompleted | Sprint | Completion |

### 6.5 Milestone Events

| Event | Payload | Trigger |
|-------|---------|---------|
| MilestoneDefined | Milestone | Definition |
| MilestoneReached | Milestone | Completion |
| MilestoneMissed | Milestone, Reason | Miss |

---

## 7. Projection Points

### 7.1 Workspace Projections

| Entity | Projection | Workspace Document |
|--------|------------|-------------------|
| CalendarAccount | Account List | `06-workspace/tools/04-calendar-workspace.md` |
| Calendar | Calendar List | `06-workspace/tools/04-calendar-workspace.md` |
| CalendarEvent | Event List | `06-workspace/tools/04-calendar-workspace.md` |
| Meeting | Meeting View | `06-workspace/tools/04-calendar-workspace.md` |
| Sprint | Sprint View | `06-workspace/tools/04-calendar-workspace.md` |
| Milestone | Milestone View | `06-workspace/tools/04-calendar-workspace.md` |

### 7.2 Projection Rules

1. **Provider Authority**: Provider is authoritative for calendar state
2. **Read-Only Projections**: Workspace projections are read-only views
3. **State Synchronization**: Projections update via provider sync
4. **Lazy Loading**: Projections load on demand
5. **Caching**: Projections may cache for performance

---

## 8. Verification Requirements

### 8.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| CalendarAccount | Connection Testing | Account connects correctly |
| CalendarEvent | Event Testing | Events display correctly |
| Meeting | Meeting Testing | Meetings track correctly |
| Sprint | Sprint Testing | Sprints manage correctly |
| Milestone | Milestone Testing | Milestones track correctly |

### 8.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 8.3 Evidence Requirements

1. **Sync Evidence**: Sync operation logs
2. **Event Evidence**: Event creation logs
3. **Meeting Evidence**: Meeting tracking logs
4. **Sprint Evidence**: Sprint management logs
5. **Milestone Evidence**: Milestone tracking logs

---

## 9. Integration Points

### 9.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Contacts Domain | Contact association | Contact API |
| Messaging Domain | Message association | Messaging API |
| Project Domain | Project association | Project API |

### 9.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Google Calendar | Calendar access | Calendar API |
| Microsoft Outlook | Calendar access | Graph API |
| CalDAV Server | Calendar access | CalDAV Protocol |
| Virtual Meeting | Meeting integration | Meeting API |

---

## 10. Open Questions

1. How should recurring events be handled?
2. How should timezone conflicts be resolved?
3. How should calendar conflicts be detected?
4. How should meeting outcomes be tracked?
5. How should sprint velocity be calculated?

---

*This document defines the canonical Calendar domain contract for Vestara.*
*Calendar is a provider-integrated projection of time-based events connected to the Engineering Operating System.*
