---
id: "workspace-runtime"
title: "Workspace Runtime — Canonical Platform Runtime"
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
tags: ["platform", "workspace", "runtime", "canonical"]
---

# Workspace Runtime

## Canonical Platform Runtime

> **Workspace Runtime is the platform runtime that owns module lifecycle, docking, layout, navigation, deep linking, focus, context switching, state restoration, and preferences. None of these concerns belong inside individual modules.**

---

## 1. Architectural Position

```
WorkspaceRuntime
        │
        ├── Module Registry
        ├── Module Lifecycle
        ├── Module Loading
        ├── Docking
        ├── Layout
        ├── Window Management
        ├── Navigation
        ├── Deep Linking
        ├── Focus
        ├── Context Switching
        ├── State Restoration
        └── Preferences
```

WorkspaceRuntime is to the Workspace what BuilderRuntime is to Builders. It owns the platform concerns that every module depends on.

---

## 2. Canonical Entities

### 2.1 WorkspaceRuntime

```
WorkspaceRuntime
    ├── RuntimeIdentity
    │   ├── id: RuntimeId
    │   ├── version: string
    │   └── capabilities: RuntimeCapability[]
    ├── RuntimeState
    │   ├── status: RuntimeStatus
    │   ├── activeModules: ModuleId[]
    │   ├── activeLayout: LayoutId
    │   └── health: RuntimeHealth
    └── RuntimeConfiguration
        ├── maxConcurrentModules: number
        ├── defaultTimeout: Duration
        ├── retryPolicy: RetryPolicyDefinition
        ├── logging: LoggingConfiguration
        └── telemetry: TelemetryConfiguration
```

### 2.2 ModuleRegistry

```
ModuleRegistry
    ├── RegistryIdentity
    │   ├── id: RegistryId
    │   ├── version: string
    │   └── description: string
    ├── RegistryState
    │   ├── status: RegistryStatus
    │   ├── modules: ModuleEntry[]
    │   └── health: RegistryHealth
    └── RegistryConfiguration
        ├── autoDiscovery: boolean
        ├── validation: ValidationConfiguration
        ├── caching: CachingConfiguration
        └── security: SecurityConfiguration
```

### 2.3 ModuleEntry

```
ModuleEntry
    ├── EntryIdentity
    │   ├── id: ModuleId
    │   ├── name: string
    │   ├── version: string
    │   └── description: string
    ├── EntryDefinition
    │   ├── manifest: WorkspaceModuleManifest
    │   ├── source: ModuleSource
    │   ├── dependencies: DependencyDefinition[]
    │   └── capabilities: CapabilityDefinition[]
    ├── EntryState
    │   ├── status: ModuleStatus
    │   ├── loaded: boolean
    │   ├── active: boolean
    │   ├── lastAccessed: timestamp
    │   └── error: ModuleError
    └── EntryMetadata
        ├── tags: string[]
        ├── author: string
        ├── license: string
        └── repository: string
```

### 2.4 ModuleLifecycle

```
ModuleLifecycle
    ├── LifecycleIdentity
    │   ├── id: LifecycleId
    │   ├── moduleId: ModuleId
    │   └── createdAt: timestamp
    ├── LifecycleDefinition
    │   ├── states: LifecycleState[]
    │   ├── transitions: LifecycleTransition[]
    │   ├── hooks: LifecycleHook[]
    │   └── timeout: Duration
    ├── LifecycleState
    │   ├── current: ModuleStatus
    │   ├── previous: ModuleStatus
    │   ├── enteredAt: timestamp
    │   └── context: LifecycleContext
    └── LifecycleMetadata
        ├── tags: string[]
        └── audit: AuditEntry[]
```

### 2.5 Layout

```
Layout
    ├── LayoutIdentity
    │   ├── id: LayoutId
    │   ├── name: string
    │   └── description: string
    ├── LayoutDefinition
    │   ├── regions: LayoutRegion[]
    │   ├── constraints: LayoutConstraint[]
    │   ├── responsive: ResponsiveDefinition
    │   └── defaults: LayoutDefaults
    ├── LayoutState
    │   ├── status: LayoutStatus
    │   ├── activeRegions: RegionId[]
    │   └── lastModified: timestamp
    └── LayoutMetadata
        ├── tags: string[]
        └── author: string
```

### 2.6 LayoutRegion

```
LayoutRegion
    ├── RegionIdentity
    │   ├── id: RegionId
    │   ├── name: string
    │   └── type: RegionType
    ├── RegionDefinition
    │   ├── position: PositionDefinition
    │   ├── size: SizeDefinition
    │   ├── constraints: RegionConstraint[]
    │   └── modules: ModuleReference[]
    ├── RegionState
    │   ├── status: RegionStatus
    │   ├── visible: boolean
    │   ├── collapsed: boolean
    │   └── lastModified: timestamp
    └── RegionMetadata
        ├── tags: string[]
        └── dockable: boolean
```

### 2.7 DockingState

```
DockingState
    ├── DockingIdentity
    │   ├── id: DockingId
    │   ├── moduleId: ModuleId
    │   └── regionId: RegionId
    ├── DockingDefinition
    │   ├── position: DockPosition
    │   ├── size: SizeDefinition
    │   ├── constraints: DockConstraint[]
    │   └── resizable: boolean
    ├── DockingState
    │   ├── status: DockingStatus
    │   ├── visible: boolean
    │   ├── collapsed: boolean
    │   ├── split: SplitDefinition (optional)
    │   └── lastModified: timestamp
    └── DockingMetadata
        ├── tags: string[]
        └── default: boolean
```

### 2.8 NavigationState

```
NavigationState
    ├── NavigationIdentity
    │   ├── id: NavigationId
    │   └── timestamp: timestamp
    ├── NavigationDefinition
    │   ├── currentRoute: string
    │   ├── previousRoute: string
    │   ├── params: Record<string, any>
    │   ├── query: Record<string, any>
    │   └── hash: string
    ├── NavigationState
    │   ├── status: NavigationStatus
    │   ├── history: NavigationEntry[]
    │   └── bookmarks: NavigationBookmark[]
    └── NavigationMetadata
        ├── tags: string[]
        └── timestamp: timestamp
```

### 2.9 FocusState

```
FocusState
    ├── FocusIdentity
    │   ├── id: FocusId
    │   └── timestamp: timestamp
    ├── FocusDefinition
    │   ├── moduleId: ModuleId
    │   ├── elementId: string
    │   ├── reason: FocusReason
    │   └── context: FocusContext
    ├── FocusState
    │   ├── status: FocusStatus
    │   ├── previousFocus: FocusReference
    │   └── lastModified: timestamp
    └── FocusMetadata
        ├── tags: string[]
        └── timestamp: timestamp
```

### 2.10 ContextSwitch

```
ContextSwitch
    ├── ContextSwitchIdentity
    │   ├── id: ContextSwitchId
    │   └── timestamp: timestamp
    ├── ContextSwitchDefinition
    │   ├── from: ContextReference
    │   ├── to: ContextReference
    │   ├── reason: ContextSwitchReason
    │   └── preserveState: boolean
    ├── ContextSwitchState
    │   ├── status: ContextSwitchStatus
    │   ├── progress: number
    │   └── completedAt: timestamp
    └── ContextSwitchMetadata
        ├── tags: string[]
        └── timestamp: timestamp
```

### 2.11 StateRestoration

```
StateRestoration
    ├── StateRestorationIdentity
    │   ├── id: StateRestorationId
    │   ├── moduleId: ModuleId
    │   └── timestamp: timestamp
    ├── StateRestorationDefinition
    │   ├── state: any
    │   ├── version: string
    │   ├── checksum: string
    │   └── expiresAt: timestamp
    ├── StateRestorationState
    │   ├── status: StateRestorationStatus
    │   ├── lastSaved: timestamp
    │   └── lastRestored: timestamp
    └── StateRestorationMetadata
        ├── tags: string[]
        └── size: DataSize
```

### 2.12 Preferences

```
Preferences
    ├── PreferencesIdentity
    │   ├── id: PreferencesId
    │   ├── userId: UserId
    │   └── scope: PreferenceScope
    ├── PreferencesDefinition
    │   ├── theme: ThemeDefinition
    │   ├── layout: LayoutPreferences
    │   ├── keybindings: KeybindingDefinition[]
    │   ├── modules: ModulePreferences
    │   └── advanced: AdvancedPreferences
    ├── PreferencesState
    │   ├── status: PreferencesStatus
    │   └── lastModified: timestamp
    └── PreferencesMetadata
        ├── tags: string[]
        └── version: string
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
WorkspaceRuntime 1──* ModuleRegistry
ModuleRegistry 1──* ModuleEntry
ModuleEntry 1──* ModuleLifecycle
WorkspaceRuntime 1──* Layout
Layout 1──* LayoutRegion
LayoutRegion *──* DockingState
DockingState *──* ModuleEntry
WorkspaceRuntime 1──* NavigationState
WorkspaceRuntime 1──* FocusState
WorkspaceRuntime 1──* ContextSwitch
WorkspaceRuntime 1──* StateRestoration
WorkspaceRuntime 1──* Preferences
```

### 3.2 Dependency Graph

```
WorkspaceRuntime
    ├── manages: ModuleRegistry
    ├── orchestrates: Layout
    ├── tracks: NavigationState
    ├── manages: FocusState
    ├── coordinates: ContextSwitch
    ├── preserves: StateRestoration
    └── configures: Preferences

ModuleRegistry
    ├── belongsTo: WorkspaceRuntime
    ├── contains: ModuleEntry[]
    └── validates: ModuleManifest

ModuleEntry
    ├── belongsTo: ModuleRegistry
    ├── hasLifecycle: ModuleLifecycle
    ├── docksTo: DockingState
    └── receives: WorkspaceModuleContext

Layout
    ├── belongsTo: WorkspaceRuntime
    ├── contains: LayoutRegion[]
    └── defines: DockingState[]

LayoutRegion
    ├── belongsTo: Layout
    ├── hosts: DockingState[]
    └── positions: ModuleReference[]

DockingState
    ├── belongsTo: LayoutRegion
    ├── binds: ModuleEntry
    └── defines: PositionDefinition

NavigationState
    ├── belongsTo: WorkspaceRuntime
    └── tracks: NavigationEntry[]

FocusState
    ├── belongsTo: WorkspaceRuntime
    └── tracks: FocusReference

ContextSwitch
    ├── belongsTo: WorkspaceRuntime
    └── coordinates: ContextReference[]

StateRestoration
    ├── belongsTo: WorkspaceRuntime
    ├── preserves: ModuleEntry
    └── stores: StateDefinition

Preferences
    ├── belongsTo: WorkspaceRuntime
    └── configures: WorkspaceRuntime
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| WorkspaceRuntime | WorkspaceRuntime | Runtime lifecycle, orchestration |
| ModuleRegistry | WorkspaceRuntime | Module registration, discovery |
| ModuleEntry | WorkspaceRuntime | Module state, loading |
| ModuleLifecycle | WorkspaceRuntime | Lifecycle management |
| Layout | WorkspaceRuntime | Layout management |
| LayoutRegion | WorkspaceRuntime | Region management |
| DockingState | WorkspaceRuntime | Docking management |
| NavigationState | WorkspaceRuntime | Navigation tracking |
| FocusState | WorkspaceRuntime | Focus management |
| ContextSwitch | WorkspaceRuntime | Context switching |
| StateRestoration | WorkspaceRuntime | State preservation |
| Preferences | WorkspaceRuntime | Preference management |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner may delegate projection to Workspace

---

## 5. Lifecycle

### 5.1 WorkspaceRuntime Lifecycle

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

### 5.2 Module Lifecycle

```
Installed
  ↓
Registered
  ↓
Loaded
  ↓
Initialized
  ↓
Running
  ↓
Background
  ↓
Suspended
  ↓
Resumed
  ↓
Unloaded
  ↓
Removed
```

### 5.3 Layout Lifecycle

```
Defined
  ↓
Applied
  ↓
Active
  ↓
Modified
  ↓
Saved
  ↓
Restored
  ↓
Archived
```

### 5.4 Navigation Lifecycle

```
Navigated
  ↓
Matched
  ↓
Entered
  ↓
Active
  ↓
Left
  ↓
Archived
```

### 5.5 Focus Lifecycle

```
Requested
  ↓
Granted
  ↓
Active
  ↓
Lost
  ↓
Restored
```

### 5.6 ContextSwitch Lifecycle

```
Requested
  ↓
Preparing
  ↓
Switching
  ↓
Completed
  ↓
Failed
```

### 5.7 StateRestoration Lifecycle

```
Saved
  ↓
Stored
  ↓
Restoring
  ↓
Restored
  ↓
Expired
  ↓
Archived
```

---

## 6. Events

### 6.1 Runtime Events

| Event | Payload | Trigger |
|-------|---------|---------|
| RuntimeInitialized | WorkspaceRuntime | Initialization |
| RuntimeConfigured | WorkspaceRuntime, Configuration | Configuration |
| RuntimeReady | WorkspaceRuntime | Ready |
| RuntimeShutdown | WorkspaceRuntime, Reason | Shutdown |

### 6.2 Module Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleInstalled | ModuleEntry | Installation |
| ModuleRegistered | ModuleEntry | Registration |
| ModuleLoaded | ModuleEntry | Loading |
| ModuleInitialized | ModuleEntry | Initialization |
| ModuleActivated | ModuleEntry | Activation |
| ModuleDeactivated | ModuleEntry, Reason | Deactivation |
| ModuleSuspended | ModuleEntry, Reason | Suspension |
| ModuleResumed | ModuleEntry | Resumption |
| ModuleUnloaded | ModuleEntry, Reason | Unload |
| ModuleUnregistered | ModuleEntry, Reason | Unregistration |
| ModuleRemoved | ModuleEntry, Reason | Removal |

### 6.3 Layout Events

| Event | Payload | Trigger |
|-------|---------|---------|
| LayoutCreated | Layout | Creation |
| LayoutApplied | Layout | Application |
| LayoutModified | Layout, ChangeSet | Modification |
| LayoutSaved | Layout | Save |
| LayoutRestored | Layout | Restoration |

### 6.4 Navigation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| NavigationStarted | NavigationState | Navigation |
| NavigationMatched | NavigationState, Route | Match |
| NavigationEntered | NavigationState | Entry |
| NavigationLeft | NavigationState, Reason | Leave |

### 6.5 Focus Events

| Event | Payload | Trigger |
|-------|---------|---------|
| FocusRequested | FocusState | Request |
| FocusGranted | FocusState | Grant |
| FocusLost | FocusState, Reason | Loss |
| FocusRestored | FocusState | Restoration |

### 6.6 ContextSwitch Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContextSwitchRequested | ContextSwitch | Request |
| ContextSwitchStarted | ContextSwitch | Start |
| ContextSwitchCompleted | ContextSwitch | Completion |
| ContextSwitchFailed | ContextSwitch, Failure | Failure |

### 6.7 StateRestoration Events

| Event | Payload | Trigger |
|-------|---------|---------|
| StateSaved | StateRestoration | Save |
| StateRestored | StateRestoration | Restoration |
| StateExpired | StateRestoration, Reason | Expiration |

---

## 7. Module Loading

### 7.1 Loading Strategy

```typescript
interface ModuleLoadingStrategy {
  eager: ModuleReference[];
  lazy: ModuleReference[];
  preload: ModuleReference[];
  background: ModuleReference[];
}
```

### 7.2 Loading Phases

```
1. Discovery
    ↓
2. Manifest Validation
    ↓
3. Dependency Resolution
    ↓
4. Capability Check
    ↓
5. Source Loading
    ↓
6. Component Registration
    ↓
7. Route Registration
    ↓
8. Command Registration
    ↓
9. Search Registration
    ↓
10. Inspector Registration
    ↓
11. Initialization
    ↓
12. Ready
```

### 7.3 Loading States

```typescript
type ModuleLoadingStatus = 
  | 'discovered'
  | 'validating'
  | 'resolving'
  | 'loading'
  | 'registering'
  | 'initializing'
  | 'ready'
  | 'error';
```

---

## 8. Docking Framework

### 8.1 Dock Positions

```typescript
type DockPosition = 
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'center'
  | 'floating'
  | 'fullscreen'
  | 'pop-out';
```

### 8.2 Dock Operations

```typescript
interface DockOperation {
  type: DockOperationType;
  source: ModuleReference;
  target: RegionReference;
  position: DockPosition;
  size?: SizeDefinition;
  constraints?: DockConstraint[];
}

type DockOperationType = 
  | 'dock'
  | 'undock'
  | 'move'
  | 'resize'
  | 'split'
  | 'merge'
  | 'float'
  | 'fullscreen';
```

### 8.3 Split Operations

```typescript
type SplitDirection = 
  | 'horizontal'
  | 'vertical';

interface SplitOperation {
  direction: SplitDirection;
  ratio: number;
  first: ModuleReference;
  second: ModuleReference;
}
```

---

## 9. Contribution APIs

### 9.1 Command Contribution

```typescript
interface CommandContribution {
  moduleId: ModuleId;
  commands: CommandDefinition[];
  shortcuts: ShortcutDefinition[];
}
```

### 9.2 Search Contribution

```typescript
interface SearchContribution {
  moduleId: ModuleId;
  providers: SearchProviderDefinition[];
  facets: SearchFacetDefinition[];
  filters: SearchFilterDefinition[];
}
```

### 9.3 Inspector Contribution

```typescript
interface InspectorContribution {
  moduleId: ModuleId;
  sections: InspectorSectionDefinition[];
  actions: InspectorActionDefinition[];
  metadata: InspectorMetadataDefinition[];
}
```

### 9.4 Sidebar Contribution

```typescript
interface SidebarContribution {
  moduleId: ModuleId;
  nodes: SidebarNodeDefinition[];
  order: number;
}
```

---

## 10. Verification Requirements

### 10.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| WorkspaceRuntime | Runtime Testing | Runtime initializes correctly |
| ModuleRegistry | Registry Testing | Registry manages modules correctly |
| ModuleEntry | Module Testing | Module loads and runs correctly |
| ModuleLifecycle | Lifecycle Testing | Lifecycle transitions correctly |
| Layout | Layout Testing | Layout applies correctly |
| DockingState | Docking Testing | Docking works correctly |
| NavigationState | Navigation Testing | Navigation tracks correctly |
| FocusState | Focus Testing | Focus manages correctly |
| ContextSwitch | ContextSwitch Testing | Context switches correctly |
| StateRestoration | StateRestoration Testing | State restores correctly |
| Preferences | Preferences Testing | Preferences manage correctly |

### 10.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 11. Integration Points

### 11.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| BuilderRuntime | Builder execution | Runtime API |
| AgentRuntime | Agent execution | Runtime API |
| VerificationRuntime | Verification execution | Verification API |

---

## 12. Open Questions

1. How should module conflicts be resolved?
2. How should module dependencies be versioned?
3. How should module performance be monitored?
4. How should module security be enforced?
5. How should module updates be managed?

---

*This document defines the canonical Workspace Runtime contract for Vestara.*
*Workspace Runtime owns the platform concerns that every module depends on.*
