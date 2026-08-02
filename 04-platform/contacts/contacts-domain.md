---
id: "contacts-domain"
title: "Contacts Domain — Canonical Relationship Graph Contract"
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
tags: ["platform", "contacts", "canonical"]
---

# Contacts Domain

## Canonical Relationship Graph Contract

> **Contacts is not an address book. It is a relationship graph that connects people, organizations, projects, and engineering activities.**

---

## 1. Architectural Position

```
Project
    ↓
Stakeholders
    ↓
Messages
    ↓
Meetings
    ↓
Approvals
```

Contacts becomes the navigable relationship layer across the entire Engineering Operating System.

---

## 2. Canonical Entities

### 2.1 Contact

```
Contact
    ├── ContactIdentity
    │   ├── id: ContactId
    │   ├── type: ContactType
    │   ├── name: string
    │   └── description: string
    ├── ContactDefinition
    │   ├── person: PersonDefinition (optional)
    │   ├── organization: OrganizationDefinition (optional)
    │   ├── team: TeamDefinition (optional)
    │   └── role: RoleDefinition (optional)
    ├── ContactState
    │   ├── status: ContactStatus
    │   ├── lastSeen: timestamp
    │   └── interactionCount: number
    └── ContactMetadata
        ├── tags: string[]
        ├── source: ContactSource
        └── confidence: ConfidenceLevel
```

### 2.2 Person

```
Person
    ├── PersonIdentity
    │   ├── id: PersonId
    │   ├── contactId: ContactId
    │   ├── firstName: string
    │   ├── lastName: string
    │   └── displayName: string
    ├── PersonDefinition
    │   ├── emailAddresses: EmailAddress[]
    │   ├── phoneNumbers: PhoneNumber[]
    │   ├── socialProfiles: SocialProfile[]
    │   ├── organization: OrganizationReference
    │   ├── team: TeamReference
    │   └── role: RoleReference
    ├── PersonState
    │   ├── status: PersonStatus
    │   ├── lastContacted: timestamp
    │   └── relationship: RelationshipLevel
    └── PersonMetadata
        ├── tags: string[]
        ├── avatar: AvatarReference
        └── timezone: string
```

### 2.3 Organization

```
Organization
    ├── OrganizationIdentity
    │   ├── id: OrganizationId
    │   ├── contactId: ContactId
    │   ├── name: string
    │   ├── type: OrganizationType
    │   └── domain: string
    ├── OrganizationDefinition
    │   ├── parent: OrganizationReference (optional)
    │   ├── subsidiaries: OrganizationReference[]
    │   ├── teams: TeamReference[]
    │   ├── people: PersonReference[]
    │   ├── projects: ProjectReference[]
    │   └── addresses: AddressDefinition[]
    ├── OrganizationState
    │   ├── status: OrganizationStatus
    │   ├── size: OrganizationSize
    │   └── lastInteraction: timestamp
    └── OrganizationMetadata
        ├── tags: string[]
        ├── industry: string
        └── website: string
```

### 2.4 Team

```
Team
    ├── TeamIdentity
    │   ├── id: TeamId
    │   ├── contactId: ContactId
    │   ├── name: string
    │   └── description: string
    ├── TeamDefinition
    │   ├── organization: OrganizationReference
    │   ├── members: PersonReference[]
    │   ├── leads: PersonReference[]
    │   ├── projects: ProjectReference[]
    │   └── channels: ChannelReference[]
    ├── TeamState
    │   ├── status: TeamStatus
    │   ├── activeMembers: number
    │   └── lastActivity: timestamp
    └── TeamMetadata
        ├── tags: string[]
        ├── type: TeamType
        └── timezone: string
```

### 2.5 Role

```
Role
    ├── RoleIdentity
    │   ├── id: RoleId
    │   ├── name: string
    │   ├── type: RoleType
    │   └── description: string
    ├── RoleDefinition
    │   ├── organization: OrganizationReference
    │   ├── department: string
    │   ├── responsibilities: string[]
    │   ├── authority: AuthorityDefinition
    │   └── reportsTo: RoleReference (optional)
    ├── RoleState
    │   ├── status: RoleStatus
    │   ├── filledBy: PersonReference (optional)
    │   └── vacantSince: timestamp
    └── RoleMetadata
        ├── tags: string[]
        ├── level: RoleLevel
        └── compensation: CompensationRange
```

### 2.6 EmailAddress

```
EmailAddress
    ├── EmailAddressIdentity
    │   ├── id: EmailAddressId
    │   ├── contactId: ContactId
    │   └── email: string
    ├── EmailAddressDefinition
    │   ├── type: EmailAddressType
    │   ├── primary: boolean
    │   ├── verified: boolean
    │   └── provider: string
    ├── EmailAddressState
    │   ├── status: EmailAddressStatus
    │   ├── lastUsed: timestamp
    │   └── deliverability: DeliverabilityStatus
    └── EmailAddressMetadata
        ├── tags: string[]
        └── source: string
```

### 2.7 PhoneNumber

```
PhoneNumber
    ├── PhoneNumberIdentity
    │   ├── id: PhoneNumberId
    │   ├── contactId: ContactId
    │   └── number: string
    ├── PhoneNumberDefinition
    │   ├── type: PhoneNumberType
    │   ├── primary: boolean
    │   ├── verified: boolean
    │   └── countryCode: string
    ├── PhoneNumberState
    │   ├── status: PhoneNumberStatus
    │   └── lastUsed: timestamp
    └── PhoneNumberMetadata
        ├── tags: string[]
        └── source: string
```

### 2.8 SocialProfile

```
SocialProfile
    ├── SocialProfileIdentity
    │   ├── id: SocialProfileId
    │   ├── contactId: ContactId
    │   ├── platform: string
    │   └── handle: string
    ├── SocialProfileDefinition
    │   ├── url: string
    │   ├── verified: boolean
    │   └── primary: boolean
    ├── SocialProfileState
    │   ├── status: SocialProfileStatus
    │   └── lastActive: timestamp
    └── SocialProfileMetadata
        ├── tags: string[]
        └── source: string
```

### 2.9 ContactRelationship

```
ContactRelationship
    ├── RelationshipIdentity
    │   ├── id: RelationshipId
    │   ├── source: ContactId
    │   ├── target: ContactId
    │   └── type: RelationshipType
    ├── RelationshipDefinition
    │   ├── strength: RelationshipStrength
    │   ├── context: string
    │   ├── startedAt: timestamp
    │   └── endedAt: timestamp (optional)
    ├── RelationshipState
    │   ├── status: RelationshipStatus
    │   ├── lastInteraction: timestamp
    │   └── interactionCount: number
    └── RelationshipMetadata
        ├── tags: string[]
        └── source: string
```

### 2.10 ContactEvent

```
ContactEvent
    ├── ContactEventIdentity
    │   ├── id: ContactEventId
    │   ├── contactId: ContactId
    │   ├── type: ContactEventType
    │   └── timestamp: timestamp
    ├── ContactEventDefinition
    │   ├── description: string
    │   ├── context: string
    │   ├── participants: ContactId[]
    │   └── relatedEntity: EntityReference (optional)
    ├── ContactEventState
    │   ├── status: ContactEventStatus
    │   └── recordedAt: timestamp
    └── ContactEventMetadata
        ├── tags: string[]
        └── source: string
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
Contact 1──* Person
Contact 1──* Organization
Contact 1──* Team
Contact 1──* Role
Person *──* EmailAddress
Person *──* PhoneNumber
Person *──* SocialProfile
Person *──* Organization
Person *──* Team
Person *──* Role
Organization 1──* Team
Organization 1──* Person
Organization 1──* Role
Team 1──* Person
Role *──* Person
Contact *──* ContactRelationship
Contact *──* ContactEvent
```

### 3.2 Engineering Relationships

```
Contact *──* Project
Contact *──* EngineeringSession
Contact *──* Message
Contact *──* Meeting
Contact *──* Approval
Contact *──* Task
Contact *──* Artifact
```

### 3.3 Dependency Graph

```
Contact
    ├── hasType: ContactType
    ├── hasPerson: Person
    ├── hasOrganization: Organization
    ├── hasTeam: Team
    ├── hasRole: Role
    ├── relatedTo: ContactRelationship[]
    ├── participatesIn: ContactEvent[]
    ├── associatedWith: Project[]
    ├── communicatesIn: Message[]
    ├── attends: Meeting[]
    ├── approves: Approval[]
    └── assignedTo: Task[]
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| Contact | ContactRuntime | Contact lifecycle, deduplication |
| Person | ContactRuntime | Person lifecycle, profile management |
| Organization | ContactRuntime | Organization lifecycle |
| Team | ContactRuntime | Team lifecycle |
| Role | ContactRuntime | Role lifecycle |
| EmailAddress | ContactRuntime | Email validation, deduplication |
| PhoneNumber | ContactRuntime | Phone validation, formatting |
| SocialProfile | ContactRuntime | Profile synchronization |
| ContactRelationship | ContactRuntime | Relationship tracking |
| ContactEvent | ContactRuntime | Event recording |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner may delegate projection to Workspace

---

## 5. Lifecycle

### 5.1 Contact Lifecycle

```
Created
  ↓
Enriched
  ↓
Active
  ↓
Engaged
  ↓
Inactive
  ↓
Archived
```

### 5.2 Person Lifecycle

```
Created
  ↓
Verified
  ↓
Active
  ↓
Engaged
  ↓
Inactive
  ↓
Archived
```

### 5.3 Organization Lifecycle

```
Created
  ↓
Verified
  ↓
Active
  ↓
Partner
  ↓
Inactive
  ↓
Archived
```

### 5.4 Team Lifecycle

```
Created
  ↓
Formed
  ↓
Active
  ↓
Performing
  ↓
Reorganized
  ↓
Archived
```

### 5.5 Role Lifecycle

```
Defined
  ↓
Posted
  ↓
Filled
  ↓
Active
  ↓
Vacated
  ↓
Archived
```

### 5.6 ContactRelationship Lifecycle

```
Created
  ↓
Strengthening
  ↓
Stable
  ↓
Weakening
  ↓
Ended
  ↓
Archived
```

### 5.7 ContactEvent Lifecycle

```
Recorded
  ↓
Verified
  ↓
Archived
```

---

## 6. Events

### 6.1 Contact Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContactCreated | Contact | Creation |
| ContactUpdated | Contact, ChangeSet | Update |
| ContactMerged | Contact, Contact[] | Merge |
| ContactArchived | Contact, Reason | Archive |

### 6.2 Person Events

| Event | Payload | Trigger |
|-------|---------|---------|
| PersonCreated | Person | Creation |
| PersonUpdated | Person, ChangeSet | Update |
| PersonVerified | Person | Verification |
| PersonArchived | Person, Reason | Archive |

### 6.3 Organization Events

| Event | Payload | Trigger |
|-------|---------|---------|
| OrganizationCreated | Organization | Creation |
| OrganizationUpdated | Organization, ChangeSet | Update |
| OrganizationVerified | Organization | Verification |
| OrganizationArchived | Organization, Reason | Archive |

### 6.4 Team Events

| Event | Payload | Trigger |
|-------|---------|---------|
| TeamCreated | Team | Creation |
| TeamUpdated | Team, ChangeSet | Update |
| TeamMemberAdded | Team, Person | Add member |
| TeamMemberRemoved | Team, Person, Reason | Remove member |
| TeamArchived | Team, Reason | Archive |

### 6.5 Relationship Events

| Event | Payload | Trigger |
|-------|---------|---------|
| RelationshipCreated | ContactRelationship | Creation |
| RelationshipStrengthened | ContactRelationship | Strengthening |
| RelationshipWeakened | ContactRelationship | Weakening |
| RelationshipEnded | ContactRelationship, Reason | End |

### 6.6 ContactEvent Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContactEventRecorded | ContactEvent | Record |
| ContactEventVerified | ContactEvent | Verification |

---

## 7. Projection Points

### 7.1 Workspace Projections

| Entity | Projection | Workspace Document |
|--------|------------|-------------------|
| Contact | Contact List | `06-workspace/tools/03-contacts-workspace.md` |
| Person | Person View | `06-workspace/tools/03-contacts-workspace.md` |
| Organization | Organization View | `06-workspace/tools/03-contacts-workspace.md` |
| Team | Team View | `06-workspace/tools/03-contacts-workspace.md` |
| Role | Role View | `06-workspace/tools/03-contacts-workspace.md` |
| ContactRelationship | Relationship Graph | `06-workspace/tools/03-contacts-workspace.md` |
| ContactEvent | Activity Timeline | `06-workspace/tools/03-contacts-workspace.md` |

### 7.2 Projection Rules

1. **Provider Authority**: External providers are authoritative for contact data
2. **Read-Only Projections**: Workspace projections are read-only views
3. **State Synchronization**: Projections update via domain events
4. **Lazy Loading**: Projections load on demand
5. **Caching**: Projections may cache for performance

---

## 8. Verification Requirements

### 8.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| Contact | Deduplication Testing | Contacts deduplicated correctly |
| Person | Profile Testing | Person profiles resolve correctly |
| Organization | Verification Testing | Organizations verified correctly |
| Team | Membership Testing | Team memberships correct |
| Role | Role Testing | Roles defined correctly |
| ContactRelationship | Relationship Testing | Relationships tracked correctly |
| ContactEvent | Event Testing | Events recorded correctly |

### 8.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

### 8.3 Evidence Requirements

1. **Deduplication Evidence**: Contact merge logs
2. **Verification Evidence**: Contact verification logs
3. **Relationship Evidence**: Relationship tracking logs
4. **Event Evidence**: Event recording logs
5. **Privacy Evidence**: Privacy compliance logs

---

## 9. Integration Points

### 9.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Messaging Domain | Message association | Messaging API |
| Calendar Domain | Meeting association | Calendar API |
| Project Domain | Project association | Project API |

### 9.2 External Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Contact Providers | Contact sync | Provider API |
| CRM Systems | CRM sync | CRM API |
| Directory Services | Directory sync | LDAP API |
| Social Networks | Profile sync | Social API |

---

## 10. Open Questions

1. How should contact deduplication be handled?
2. How should contact privacy be enforced?
3. How should cross-platform identities be resolved?
4. How should contact relationships be scored?
5. How should contact history be retained?

---

*This document defines the canonical Contacts domain contract for Vestara.*
*Contacts is a relationship graph that connects people, organizations, projects, and engineering activities.*
