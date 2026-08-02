---
id: "contribution-apis"
title: "Contribution APIs — Canonical Module Contribution System"
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
tags: ["platform", "workspace", "contribution", "canonical"]
---

# Contribution APIs

## Canonical Module Contribution System

> **Every module contributes commands, search providers, inspector sections, and sidebar nodes. The Workspace merges them into one unified experience.**

---

## 1. Architectural Position

```
IDE
    ├── Go to Definition
    ├── Rename Symbol

Messages
    ├── Compose
    ├── Reply

Calendar
    ├── Create Meeting

Builder
    ├── Build Application
```

WorkspaceRuntime merges them into one command palette.

---

## 2. Canonical Entities

### 2.1 ContributionManager

```
ContributionManager
    ├── ManagerIdentity
    │   ├── id: ManagerId
    │   ├── version: string
    │   └── description: string
    ├── ManagerState
    │   ├── status: ManagerStatus
    │   ├── contributions: Contribution[]
    │   └── health: ManagerHealth
    └── ManagerConfiguration
        ├── autoDiscovery: boolean
        ├── validation: ValidationConfiguration
        ├── caching: CachingConfiguration
        └── security: SecurityConfiguration
```

### 2.2 CommandContribution

```
CommandContribution
    ├── ContributionIdentity
    │   ├── id: ContributionId
    │   ├── moduleId: ModuleId
    │   └── timestamp: string
    ├── ContributionDefinition
    │   ├── commands: CommandDefinition[]
    │   ├── shortcuts: ShortcutDefinition[]
    │   └── categories: CommandCategory[]
    ├── ContributionState
    │   ├── status: ContributionStatus
    │   ├── active: boolean
    │   └── lastModified: string
    └── ContributionMetadata
        ├── tags: string[]
        └── priority: number
```

### 2.3 SearchContribution

```
SearchContribution
    ├── ContributionIdentity
    │   ├── id: ContributionId
    │   ├── moduleId: ModuleId
    │   └── timestamp: string
    ├── ContributionDefinition
    │   ├── providers: SearchProviderDefinition[]
    │   ├── facets: SearchFacetDefinition[]
    │   └── filters: SearchFilterDefinition[]
    ├── ContributionState
    │   ├── status: ContributionStatus
    │   ├── active: boolean
    │   └── lastModified: string
    └── ContributionMetadata
        ├── tags: string[]
        └── priority: number
```

### 2.4 InspectorContribution

```
InspectorContribution
    ├── ContributionIdentity
    │   ├── id: ContributionId
    │   ├── moduleId: ModuleId
    │   └── timestamp: string
    ├── ContributionDefinition
    │   ├── sections: InspectorSectionDefinition[]
    │   ├── actions: InspectorActionDefinition[]
    │   └── metadata: InspectorMetadataDefinition[]
    ├── ContributionState
    │   ├── status: ContributionStatus
    │   ├── active: boolean
    │   └── lastModified: string
    └── ContributionMetadata
        ├── tags: string[]
        └── priority: number
```

### 2.5 SidebarContribution

```
SidebarContribution
    ├── ContributionIdentity
    │   ├── id: ContributionId
    │   ├── moduleId: ModuleId
    │   └── timestamp: string
    ├── ContributionDefinition
    │   ├── nodes: SidebarNodeDefinition[]
    │   └── order: number
    ├── ContributionState
    │   ├── status: ContributionStatus
    │   ├── active: boolean
    │   └── lastModified: string
    └── ContributionMetadata
        ├── tags: string[]
        └── priority: number
```

### 2.6 ToolbarContribution

```
ToolbarContribution
    ├── ContributionIdentity
    │   ├── id: ContributionId
    │   ├── moduleId: ModuleId
    │   └── timestamp: string
    ├── ContributionDefinition
    │   ├── toolbars: ToolbarDefinition[]
    │   └── items: ToolbarItemDefinition[]
    ├── ContributionState
    │   ├── status: ContributionStatus
    │   ├── active: boolean
    │   └── lastModified: string
    └── ContributionMetadata
        ├── tags: string[]
        └── priority: number
```

### 2.7 StatusContribution

```
StatusContribution
    ├── ContributionIdentity
    │   ├── id: ContributionId
    │   ├── moduleId: ModuleId
    │   └── timestamp: string
    ├── ContributionDefinition
    │   ├── items: StatusItemDefinition[]
    │   └── priority: number
    ├── ContributionState
    │   ├── status: ContributionStatus
    │   ├── active: boolean
    │   └── lastModified: string
    └── ContributionMetadata
        ├── tags: string[]
        └── priority: number
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
ContributionManager 1──* CommandContribution
ContributionManager 1──* SearchContribution
ContributionManager 1──* InspectorContribution
ContributionManager 1──* SidebarContribution
ContributionManager 1──* ToolbarContribution
ContributionManager 1──* StatusContribution
```

### 3.2 Dependency Graph

```
ContributionManager
    ├── manages: CommandContribution[]
    ├── manages: SearchContribution[]
    ├── manages: InspectorContribution[]
    ├── manages: SidebarContribution[]
    ├── manages: ToolbarContribution[]
    └── manages: StatusContribution[]

CommandContribution
    ├── belongsTo: ContributionManager
    ├── provides: CommandDefinition[]
    └── defines: ShortcutDefinition[]

SearchContribution
    ├── belongsTo: ContributionManager
    ├── provides: SearchProviderDefinition[]
    ├── defines: SearchFacetDefinition[]
    └── defines: SearchFilterDefinition[]

InspectorContribution
    ├── belongsTo: ContributionManager
    ├── provides: InspectorSectionDefinition[]
    ├── defines: InspectorActionDefinition[]
    └── defines: InspectorMetadataDefinition[]

SidebarContribution
    ├── belongsTo: ContributionManager
    └── provides: SidebarNodeDefinition[]

ToolbarContribution
    ├── belongsTo: ContributionManager
    ├── provides: ToolbarDefinition[]
    └── defines: ToolbarItemDefinition[]

StatusContribution
    ├── belongsTo: ContributionManager
    └── provides: StatusItemDefinition[]
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| ContributionManager | WorkspaceRuntime | Contribution lifecycle, merging |
| CommandContribution | WorkspaceRuntime | Command registration, execution |
| SearchContribution | WorkspaceRuntime | Search registration, federation |
| InspectorContribution | WorkspaceRuntime | Inspector registration, rendering |
| SidebarContribution | WorkspaceRuntime | Sidebar registration, rendering |
| ToolbarContribution | WorkspaceRuntime | Toolbar registration, rendering |
| StatusContribution | WorkspaceRuntime | Status registration, rendering |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Merging**: Owner merges contributions from all modules

---

## 5. Lifecycle

### 5.1 ContributionManager Lifecycle

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
Shutdown
```

### 5.2 Contribution Lifecycle

```
Registered
  ↓
Validated
  ↓
Active
  ↓
Updated
  ↓
Deactivated
  ↓
Unregistered
```

---

## 6. Events

### 6.1 Manager Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ManagerInitialized | ContributionManager | Initialization |
| ManagerConfigured | ContributionManager, Configuration | Configuration |
| ManagerReady | ContributionManager | Ready |
| ManagerShutdown | ContributionManager, Reason | Shutdown |

### 6.2 Command Events

| Event | Payload | Trigger |
|-------|---------|---------|
| CommandRegistered | CommandContribution | Registration |
| CommandExecuted | CommandContribution, CommandId | Execution |
| CommandUnregistered | CommandContribution, Reason | Unregistration |

### 6.3 Search Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SearchProviderRegistered | SearchContribution | Registration |
| SearchExecuted | SearchContribution, Query | Search |
| SearchProviderUnregistered | SearchContribution, Reason | Unregistration |

### 6.4 Inspector Events

| Event | Payload | Trigger |
|-------|---------|---------|
| InspectorSectionRegistered | InspectorContribution | Registration |
| InspectorActionRegistered | InspectorContribution | Registration |
| InspectorUnregistered | InspectorContribution, Reason | Unregistration |

### 6.5 Sidebar Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SidebarNodeRegistered | SidebarContribution | Registration |
| SidebarNodeUpdated | SidebarContribution, NodeId | Update |
| SidebarNodeUnregistered | SidebarContribution, Reason | Unregistration |

### 6.6 Toolbar Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ToolbarRegistered | ToolbarContribution | Registration |
| ToolbarItemRegistered | ToolbarContribution | Registration |
| ToolbarUnregistered | ToolbarContribution, Reason | Unregistration |

### 6.7 Status Events

| Event | Payload | Trigger |
|-------|---------|---------|
| StatusItemRegistered | StatusContribution | Registration |
| StatusItemUpdated | StatusContribution, ItemId | Update |
| StatusItemUnregistered | StatusContribution, Reason | Unregistration |

---

## 7. Command System

### 7.1 Command Definition

```typescript
interface CommandDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
  handler: string;
  shortcut?: string;
  category: string;
  enabled: boolean;
  when?: string; // Conditional visibility
}
```

### 7.2 Command Categories

```typescript
interface CommandCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
}
```

### 7.3 Command Execution

```typescript
interface CommandExecution {
  commandId: string;
  args?: any;
  context: WorkspaceModuleContext;
  timestamp: string;
}
```

### 7.4 Command Merging

```typescript
interface CommandMerging {
  strategy: MergingStrategy;
  conflictResolution: ConflictResolution;
  priority: PriorityDefinition;
}

type MergingStrategy = 
  | 'merge'
  | 'override'
  | 'skip'
  | 'error';

type ConflictResolution = 
  | 'first'
  | 'last'
  | 'highest-priority'
  | 'user-choice';
```

---

## 8. Search Federation

### 8.1 Search Provider Definition

```typescript
interface SearchProviderDefinition {
  id: string;
  name: string;
  search: (query: string, options?: SearchOptions) => Promise<SearchResultItem[]>;
  getSuggestions?: (query: string) => Promise<Suggestion[]>;
  getFacets?: () => Promise<Facet[]>;
}
```

### 8.2 Search Merging

```typescript
interface SearchMerging {
  strategy: MergingStrategy;
  deduplication: DeduplicationStrategy;
  ranking: RankingStrategy;
  limit: number;
}

type DeduplicationStrategy = 
  | 'exact'
  | 'fuzzy'
  | 'none';

type RankingStrategy = 
  | 'relevance'
  | 'recency'
  | 'popularity'
  | 'priority';
```

### 8.3 Search Federation

```typescript
interface SearchFederation {
  providers: SearchProviderDefinition[];
  parallel: boolean;
  timeout: number;
  fallback: FallbackStrategy;
}

type FallbackStrategy = 
  | 'partial'
  | 'error'
  | 'cached';
```

---

## 9. Inspector Federation

### 9.1 Inspector Section Definition

```typescript
interface InspectorSectionDefinition {
  id: string;
  label: string;
  icon: string;
  component: string;
  order: number;
  required: boolean;
  when?: string; // Conditional visibility
}
```

### 9.2 Inspector Action Definition

```typescript
interface InspectorActionDefinition {
  id: string;
  label: string;
  icon: string;
  handler: string;
  confirmation?: ConfirmationDefinition;
  requiresApproval: boolean;
  when?: string; // Conditional visibility
}
```

### 9.3 Inspector Metadata Definition

```typescript
interface InspectorMetadataDefinition {
  key: string;
  label: string;
  type: MetadataType;
  source: string;
  when?: string; // Conditional visibility
}
```

### 9.4 Inspector Merging

```typescript
interface InspectorMerging {
  sections: MergingStrategy;
  actions: MergingStrategy;
  metadata: MergingStrategy;
  ordering: OrderingStrategy;
}

type OrderingStrategy = 
  | 'by-order'
  | 'by-priority'
  | 'by-name'
  | 'by-module';
```

---

## 10. Sidebar Federation

### 10.1 Sidebar Node Definition

```typescript
interface SidebarNodeDefinition {
  id: string;
  label: string;
  icon: string;
  path?: string;
  command?: string;
  children?: SidebarNodeDefinition[];
  order: number;
  visible: boolean;
  when?: string; // Conditional visibility
}
```

### 10.2 Sidebar Merging

```typescript
interface SidebarMerging {
  strategy: MergingStrategy;
  ordering: OrderingStrategy;
  nesting: NestingStrategy;
}

type NestingStrategy = 
  | 'flat'
  | 'hierarchical'
  | 'grouped';
```

---

## 11. Toolbar Federation

### 11.1 Toolbar Definition

```typescript
interface ToolbarDefinition {
  id: string;
  name: string;
  position: ToolbarPosition;
  items: ToolbarItemDefinition[];
}

type ToolbarPosition = 
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';
```

### 11.2 Toolbar Item Definition

```typescript
interface ToolbarItemDefinition {
  id: string;
  type: ToolbarItemType;
  label?: string;
  icon?: string;
  command?: string;
  dropdown?: DropdownDefinition;
  separator?: boolean;
}

type ToolbarItemType = 
  | 'button'
  | 'dropdown'
  | 'separator'
  | 'spacer'
  | 'custom';
```

### 11.3 Toolbar Merging

```typescript
interface ToolbarMerging {
  strategy: MergingStrategy;
  ordering: OrderingStrategy;
  grouping: GroupingStrategy;
}

type GroupingStrategy = 
  | 'none'
  | 'by-category'
  | 'by-module';
```

---

## 12. Status Federation

### 12.1 Status Item Definition

```typescript
interface StatusItemDefinition {
  id: string;
  label: string;
  icon?: string;
  value: string | number;
  type: StatusItemType;
  tooltip?: string;
  command?: string;
  priority: number;
}

type StatusItemType = 
  | 'text'
  | 'number'
  | 'icon'
  | 'progress'
  | 'badge';
```

### 12.2 Status Merging

```typescript
interface StatusMerging {
  strategy: MergingStrategy;
  ordering: OrderingStrategy;
  grouping: GroupingStrategy;
}
```

---

## 13. Verification Requirements

### 13.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| ContributionManager | Manager Testing | Manager initializes correctly |
| CommandContribution | Command Testing | Commands register and execute correctly |
| SearchContribution | Search Testing | Search providers register and work correctly |
| InspectorContribution | Inspector Testing | Inspector sections register correctly |
| SidebarContribution | Sidebar Testing | Sidebar nodes register correctly |
| ToolbarContribution | Toolbar Testing | Toolbar items register correctly |
| StatusContribution | Status Testing | Status items register correctly |

### 13.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 14. Integration Points

### 14.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Workspace Runtime | Contribution management | Runtime API |
| Module Registry | Module contributions | Registry API |
| Engineering Event Store | Event persistence | Event API |
| Command Service | Command execution | Command API |
| Search Service | Search federation | Search API |

---

## 15. Open Questions

1. How should contribution conflicts be resolved?
2. How should contribution priorities be managed?
3. How should contribution performance be monitored?
4. How should contribution security be enforced?
5. How should contribution analytics be tracked?

---

*This document defines the canonical Contribution APIs for Vestara.*
*Every module contributes commands, search, inspector, sidebar, toolbar, and status items.*
*The Workspace merges them into one unified experience.*
