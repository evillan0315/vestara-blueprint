---
id: "docking-api"
title: "Docking API — Canonical Docking Framework"
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
tags: ["platform", "workspace", "docking", "canonical"]
---

# Docking API

## Canonical Docking Framework

> **Every module should support docking without changing module code. The Docking API provides one consistent framework for layout management.**

---

## 1. Architectural Position

```
Docking API
    │
    ├── Dock Left
    ├── Dock Right
    ├── Dock Bottom
    ├── Float
    ├── Fullscreen
    ├── Split Horizontal
    ├── Split Vertical
    └── Pop-out Window
```

Modules declare their docking preferences. The Docking API handles the layout.

---

## 2. Canonical Entities

### 2.1 DockingManager

```
DockingManager
    ├── ManagerIdentity
    │   ├── id: ManagerId
    │   ├── version: string
    │   └── description: string
    ├── ManagerState
    │   ├── status: ManagerStatus
    │   ├── layouts: Layout[]
    │   ├── activeLayout: LayoutId
    │   └── health: ManagerHealth
    └── ManagerConfiguration
        ├── defaultLayout: string
        ├── persistence: PersistenceConfiguration
        ├── constraints: ConstraintConfiguration
        └── animations: AnimationConfiguration
```

### 2.2 Layout

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
    │   ├── lastModified: string
    │   └── savedAt: string
    └── LayoutMetadata
        ├── tags: string[]
        ├── author: string
        └── version: string
```

### 2.3 LayoutRegion

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
    │   ├── modules: ModuleReference[]
    │   └── defaultModule: ModuleReference
    ├── RegionState
    │   ├── status: RegionStatus
    │   ├── visible: boolean
    │   ├── collapsed: boolean
    │   ├── expanded: boolean
    │   └── lastModified: string
    └── RegionMetadata
        ├── tags: string[]
        ├── dockable: boolean
        ├── resizable: boolean
        └── collapsible: boolean
```

### 2.4 DockingState

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
    │   ├── resizable: boolean
    │   ├── closable: boolean
    │   ├── pinned: boolean
    │   └── order: number
    ├── DockingState
    │   ├── status: DockingStatus
    │   ├── visible: boolean
    │   ├── collapsed: boolean
    │   ├── active: boolean
    │   ├── lastModified: string
    │   └── lastAccessed: string
    └── DockingMetadata
        ├── tags: string[]
        ├── default: boolean
        └── persistent: boolean
```

### 2.5 SplitState

```
SplitState
    ├── SplitIdentity
    │   ├── id: SplitId
    │   └── regionId: RegionId
    ├── SplitDefinition
    │   ├── direction: SplitDirection
    │   ├── ratio: number
    │   ├── first: DockingReference
    │   ├── second: DockingReference
    │   ├── minRatio: number
    │   ├── maxRatio: number
    │   └── draggable: boolean
    ├── SplitState
    │   ├── status: SplitStatus
    │   ├── lastModified: string
    │   └── lastResized: string
    └── SplitMetadata
        ├── tags: string[]
        └── persistent: boolean
```

### 2.6 FloatingState

```
FloatingState
    ├── FloatingIdentity
    │   ├── id: FloatingId
    │   └── dockingId: DockingId
    ├── FloatingDefinition
    │   ├── position: PositionDefinition
    │   ├── size: SizeDefinition
    │   ├── constraints: FloatingConstraint[]
    │   ├── draggable: boolean
    │   ├── resizable: boolean
    │   ├── alwaysOnTop: boolean
    │   └── minimized: boolean
    ├── FloatingState
    │   ├── status: FloatingStatus
    │   ├── lastModified: string
    │   └── lastMoved: string
    └── FloatingMetadata
        ├── tags: string[]
        └── persistent: boolean
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
DockingManager 1──* Layout
Layout 1──* LayoutRegion
LayoutRegion 1──* DockingState
DockingState *──* SplitState
DockingState *──* FloatingState
```

### 3.2 Dependency Graph

```
DockingManager
    ├── manages: Layout[]
    ├── coordinates: DockingState[]
    └── persists: LayoutConfiguration

Layout
    ├── belongsTo: DockingManager
    ├── contains: LayoutRegion[]
    └── defines: LayoutConstraint[]

LayoutRegion
    ├── belongsTo: Layout
    ├── hosts: DockingState[]
    ├── mayContain: SplitState
    └── defines: RegionConstraint[]

DockingState
    ├── belongsTo: LayoutRegion
    ├── binds: ModuleReference
    ├── mayHave: SplitState
    └── mayHave: FloatingState

SplitState
    ├── belongsTo: DockingState
    ├── references: DockingReference[]
    └── defines: SplitConstraint[]

FloatingState
    ├── belongsTo: DockingState
    ├── defines: FloatingConstraint[]
    └── positions: PositionDefinition
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| DockingManager | WorkspaceRuntime | Docking lifecycle, orchestration |
| Layout | WorkspaceRuntime | Layout management |
| LayoutRegion | WorkspaceRuntime | Region management |
| DockingState | WorkspaceRuntime | Docking management |
| SplitState | WorkspaceRuntime | Split management |
| FloatingState | WorkspaceRuntime | Floating management |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Persistence**: Owner persists state for restoration

---

## 5. Lifecycle

### 5.1 DockingManager Lifecycle

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

### 5.2 Layout Lifecycle

```
Created
  ↓
Configured
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

### 5.3 DockingState Lifecycle

```
Created
  ↓
Docked
  ↓
Active
  ↓
Inactive
  ↓
Undocked
  ↓
Removed
```

### 5.4 SplitState Lifecycle

```
Created
  ↓
Configured
  ↓
Active
  ↓
Resized
  ↓
Merged
  ↓
Removed
```

### 5.5 FloatingState Lifecycle

```
Created
  ↓
Floated
  ↓
Active
  ↓
Moved
  ↓
Resized
  ↓
Docked
  ↓
Removed
```

---

## 6. Events

### 6.1 Manager Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ManagerInitialized | DockingManager | Initialization |
| ManagerConfigured | DockingManager, Configuration | Configuration |
| ManagerReady | DockingManager | Ready |
| ManagerShutdown | DockingManager, Reason | Shutdown |

### 6.2 Layout Events

| Event | Payload | Trigger |
|-------|---------|---------|
| LayoutCreated | Layout | Creation |
| LayoutApplied | Layout | Application |
| LayoutModified | Layout, ChangeSet | Modification |
| LayoutSaved | Layout | Save |
| LayoutRestored | Layout | Restoration |

### 6.3 Docking Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleDocked | DockingState | Docking |
| ModuleUndocked | DockingState, Reason | Undocking |
| ModuleMoved | DockingState, RegionReference | Move |
| ModuleResized | DockingState, SizeDefinition | Resize |
| ModuleActivated | DockingState | Activation |
| ModuleDeactivated | DockingState, Reason | Deactivation |

### 6.4 Split Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SplitCreated | SplitState | Creation |
| SplitResized | SplitState, number | Resize |
| SplitMerged | SplitState, Reason | Merge |
| SplitRemoved | SplitState, Reason | Removal |

### 6.5 Floating Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleFloated | FloatingState | Float |
| ModuleMoved | FloatingState, PositionDefinition | Move |
| ModuleResized | FloatingState, SizeDefinition | Resize |
| ModuleMinimized | FloatingState | Minimize |
| ModuleMaximized | FloatingState | Maximize |
| ModuleDocked | FloatingState, RegionReference | Dock |

---

## 7. Dock Positions

### 7.1 Position Types

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

### 7.2 Position Properties

```typescript
interface DockPositionProperties {
  position: DockPosition;
  resizable: boolean;
  closable: boolean;
  collapsible: boolean;
  draggable: boolean;
  pinnable: boolean;
  order: number;
}
```

### 7.3 Position Constraints

```typescript
interface DockConstraint {
  type: ConstraintType;
  value: any;
  reason: string;
}

type ConstraintType = 
  | 'min-width'
  | 'max-width'
  | 'min-height'
  | 'max-height'
  | 'min-ratio'
  | 'max-ratio'
  | 'fixed-size'
  | 'aspect-ratio';
```

---

## 8. Split Operations

### 8.1 Split Directions

```typescript
type SplitDirection = 
  | 'horizontal'
  | 'vertical';
```

### 8.2 Split Operations

```typescript
interface SplitOperation {
  direction: SplitDirection;
  ratio: number;
  first: ModuleReference;
  second: ModuleReference;
  minRatio?: number;
  maxRatio?: number;
  draggable?: boolean;
}
```

### 8.3 Split Constraints

```typescript
interface SplitConstraint {
  type: SplitConstraintType;
  value: any;
  reason: string;
}

type SplitConstraintType = 
  | 'min-ratio'
  | 'max-ratio'
  | 'min-size'
  | 'max-size'
  | 'fixed-ratio';
```

---

## 9. Layout Persistence

### 9.1 Persistence Strategy

```typescript
interface LayoutPersistence {
  enabled: boolean;
  storage: PersistenceStorage;
  key: string;
  ttl?: number;
  compression?: boolean;
  encryption?: boolean;
}

type PersistenceStorage = 
  | 'local'
  | 'session'
  | 'indexeddb'
  | 'server';
```

### 9.2 Layout Serialization

```typescript
interface LayoutSerialization {
  version: string;
  layout: Layout;
  timestamp: string;
  checksum: string;
}
```

### 9.3 Layout Restoration

```typescript
interface LayoutRestoration {
  strategy: RestorationStrategy;
  fallback?: string;
  validation: ValidationDefinition;
}

type RestorationStrategy = 
  | 'exact'
  | 'compatible'
  | 'fallback'
  | 'default';
```

---

## 10. Responsive Design

### 10.1 Responsive Breakpoints

```typescript
interface ResponsiveBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}
```

### 10.2 Responsive Layouts

```typescript
interface ResponsiveLayout {
  breakpoint: string;
  layout: Layout;
  priority: number;
}
```

### 10.3 Responsive Behavior

```typescript
interface ResponsiveBehavior {
  collapseThreshold: number;
  hideThreshold: number;
  stackThreshold: number;
  transitionDuration: number;
}
```

---

## 11. Verification Requirements

### 11.1 Entity Verification

| Entity | Verification Type | Requirements |
|--------|-------------------|--------------|
| DockingManager | Manager Testing | Manager initializes correctly |
| Layout | Layout Testing | Layout applies correctly |
| LayoutRegion | Region Testing | Region manages correctly |
| DockingState | Docking Testing | Docking works correctly |
| SplitState | Split Testing | Split works correctly |
| FloatingState | Floating Testing | Floating works correctly |

### 11.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 12. Integration Points

### 12.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Workspace Runtime | Layout management | Runtime API |
| Module Registry | Module binding | Registry API |
| Engineering Event Store | Event persistence | Event API |
| State Persistence | Layout persistence | Storage API |

---

## 13. Open Questions

1. How should layout conflicts be resolved?
2. How should layout transitions be animated?
3. How should layout be restored after crash?
4. How should layout be shared between users?
5. How should layout be versioned?

---

*This document defines the canonical Docking API for Vestara.*
*Every module supports docking without changing module code.*
