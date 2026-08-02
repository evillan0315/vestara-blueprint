---
id: "workspace-module-context"
title: "Workspace Module Context — Canonical Module Context API"
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
tags: ["platform", "workspace", "module-context", "canonical"]
---

# Workspace Module Context

## Canonical Module Context API

> **Every module receives exactly one WorkspaceModuleContext. Instead of every module requesting session, project, selection, user, graph individually, give them one context that contains everything they need.**

---

## 1. Architectural Position

```
WorkspaceModuleContext
        │
        ├── Current Workspace
        ├── Current Session
        ├── Current Project
        ├── Current Repository
        ├── Selected Entities
        ├── Selection History
        ├── Active Plan
        ├── Permissions
        ├── Capabilities
        ├── Theme
        ├── Workspace Preferences
        ├── Search API
        ├── Command Palette
        ├── Inspector API
        ├── Telemetry
        ├── Navigation
        └── Routing
```

This becomes one of the most important APIs in Vestara.

---

## 2. Canonical Interface

### 2.1 WorkspaceModuleContext

```typescript
interface WorkspaceModuleContext {
  // Workspace
  workspace: WorkspaceReference;
  
  // Session
  session: EngineeringSessionReference;
  
  // Project
  project: ProjectReference;
  
  // Repository
  repository: RepositoryReference;
  
  // Selection
  selection: SelectionReference;
  selectionHistory: SelectionHistoryReference;
  
  // Plan
  activePlan: PlanReference;
  
  // Security
  permissions: Permission[];
  capabilities: Capability[];
  
  // UI
  theme: Theme;
  preferences: WorkspacePreferences;
  
  // APIs
  search: SearchAPI;
  commandPalette: CommandPaletteAPI;
  inspector: InspectorAPI;
  telemetry: TelemetryAPI;
  navigation: NavigationAPI;
  routing: RoutingAPI;
}
```

### 2.2 WorkspaceReference

```typescript
interface WorkspaceReference {
  id: string;
  name: string;
  version: string;
  description: string;
  status: WorkspaceStatus;
  configuration: WorkspaceConfiguration;
  modules: ModuleReference[];
  createdAt: string;
  lastModified: string;
}

type WorkspaceStatus = 
  | 'initializing'
  | 'ready'
  | 'processing'
  | 'error'
  | 'shutdown';

interface WorkspaceConfiguration {
  maxModules: number;
  defaultTimeout: number;
  logging: LoggingConfiguration;
  telemetry: TelemetryConfiguration;
}
```

### 2.3 EngineeringSessionReference

```typescript
interface EngineeringSessionReference {
  id: string;
  name: string;
  description: string;
  status: SessionStatus;
  project: ProjectReference;
  repository: RepositoryReference;
  agents: AgentReference[];
  artifacts: ArtifactReference[];
  timeline: TimelineReference;
  graph: GraphReference;
  createdAt: string;
  lastModified: string;
}

type SessionStatus = 
  | 'created'
  | 'planning'
  | 'executing'
  | 'reviewing'
  | 'completed'
  | 'archived';
```

### 2.4 ProjectReference

```typescript
interface ProjectReference {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  repositories: RepositoryReference[];
  sessions: EngineeringSessionReference[];
  milestones: MilestoneReference[];
  createdAt: string;
  lastModified: string;
}

type ProjectStatus = 
  | 'planning'
  | 'active'
  | 'on-hold'
  | 'completed'
  | 'archived';
```

### 2.5 RepositoryReference

```typescript
interface RepositoryReference {
  id: string;
  name: string;
  url: string;
  branch: string;
  status: RepositoryStatus;
  files: FileReference[];
  commits: CommitReference[];
  branches: BranchReference[];
  createdAt: string;
  lastModified: string;
}

type RepositoryStatus = 
  | 'cloning'
  | 'ready'
  | 'syncing'
  | 'error';
```

### 2.6 SelectionReference

```typescript
interface SelectionReference {
  entities: EntityReference[];
  count: number;
  types: string[];
  lastChanged: string;
}

interface EntityReference {
  id: string;
  type: string;
  name: string;
  source: string;
  metadata?: Record<string, any>;
}
```

### 2.7 SelectionHistoryReference

```typescript
interface SelectionHistoryReference {
  entries: SelectionEntry[];
  maxEntries: number;
}

interface SelectionEntry {
  selection: SelectionReference;
  timestamp: string;
  context: string;
}
```

### 2.8 PlanReference

```typescript
interface PlanReference {
  id: string;
  name: string;
  description: string;
  status: PlanStatus;
  tasks: TaskReference[];
  milestones: MilestoneReference[];
  createdAt: string;
  lastModified: string;
}

type PlanStatus = 
  | 'draft'
  | 'active'
  | 'completed'
  | 'archived';
```

### 2.9 Permission

```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  actions: string[];
  granted: boolean;
  reason?: string;
}
```

### 2.10 Capability

```typescript
interface Capability {
  id: string;
  name: string;
  version: string;
  required: boolean;
  available: boolean;
  reason?: string;
}
```

### 2.11 Theme

```typescript
interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  animations: ThemeAnimations;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  text: string;
  textSecondary: string;
  border: string;
  divider: string;
}

interface ThemeFonts {
  primary: string;
  secondary: string;
  monospace: string;
  sizes: FontSizes;
  weights: FontWeights;
}

interface FontSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface FontWeights {
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
}

interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface ThemeBorders {
  radius: BorderRadius;
  width: BorderWidth;
}

interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

interface BorderWidth {
  thin: string;
  medium: string;
  thick: string;
}

interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface ThemeAnimations {
  duration: AnimationDuration;
  easing: AnimationEasing;
}

interface AnimationDuration {
  fast: string;
  normal: string;
  slow: string;
}

interface AnimationEasing {
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
}
```

### 2.12 WorkspacePreferences

```typescript
interface WorkspacePreferences {
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  notifications: NotificationPreferences;
  modules: ModulePreferences;
  advanced: AdvancedPreferences;
}

interface NotificationPreferences {
  enabled: boolean;
  channels: string[];
  quietHours: QuietHoursPreferences;
}

interface QuietHoursPreferences {
  enabled: boolean;
  start: string;
  end: string;
}

interface ModulePreferences {
  [moduleId: string]: Record<string, any>;
}

interface AdvancedPreferences {
  developerMode: boolean;
  telemetry: boolean;
  analytics: boolean;
}
```

---

## 3. API Interfaces

### 3.1 SearchAPI

```typescript
interface SearchAPI {
  search(query: string, options?: SearchOptions): Promise<SearchResult>;
  getSuggestions(query: string): Promise<Suggestion[]>;
  getFacets(): Promise<Facet[]>;
  getFilters(): Promise<Filter[]>;
}

interface SearchOptions {
  filters?: SearchFilter[];
  facets?: string[];
  limit?: number;
  offset?: number;
}

interface SearchResult {
  items: SearchResultItem[];
  total: number;
  hasMore: boolean;
  facets?: FacetResult[];
}

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  type: string;
  icon: string;
  url: string;
  score: number;
  highlights?: Highlight[];
  metadata?: Record<string, any>;
}

interface Suggestion {
  id: string;
  text: string;
  type: string;
  icon: string;
}

interface Facet {
  id: string;
  name: string;
  type: string;
  options: FacetOption[];
}

interface FacetOption {
  value: string;
  label: string;
  count: number;
  selected: boolean;
}

interface Filter {
  id: string;
  name: string;
  type: string;
  options: FilterOption[];
}

interface FilterOption {
  value: string;
  label: string;
  selected: boolean;
}
```

### 3.2 CommandPaletteAPI

```typescript
interface CommandPaletteAPI {
  open(options?: CommandPaletteOptions): Promise<void>;
  close(): Promise<void>;
  execute(commandId: string, args?: any): Promise<void>;
  getCommands(): Promise<Command[]>;
  getRecentCommands(): Promise<Command[]>;
  getFavoriteCommands(): Promise<Command[]>;
}

interface CommandPaletteOptions {
  initialQuery?: string;
  category?: string;
}

interface Command {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: string;
  shortcut?: string;
  enabled: boolean;
}
```

### 3.3 InspectorAPI

```typescript
interface InspectorAPI {
  open(entity: EntityReference): Promise<void>;
  close(): Promise<void>;
  getState(): Promise<InspectorState>;
  setState(state: InspectorState): Promise<void>;
  getSections(): Promise<InspectorSection[]>;
  getActions(): Promise<InspectorAction[]>;
  getMetadata(): Promise<InspectorMetadata[]>;
}

interface InspectorState {
  entity: EntityReference | null;
  activeSection: string;
  expandedSections: string[];
}

interface InspectorSection {
  id: string;
  label: string;
  icon: string;
  component: string;
  order: number;
  required: boolean;
}

interface InspectorAction {
  id: string;
  label: string;
  icon: string;
  handler: string;
  confirmation?: ConfirmationDefinition;
  requiresApproval: boolean;
}

interface InspectorMetadata {
  key: string;
  label: string;
  type: string;
  source: string;
  value?: any;
}
```

### 3.4 TelemetryAPI

```typescript
interface TelemetryAPI {
  track(event: TelemetryEvent): Promise<void>;
  error(error: Error, context?: any): Promise<void>;
  performance(name: string, duration: number, metadata?: any): Promise<void>;
  getSession(): Promise<TelemetrySession>;
}

interface TelemetryEvent {
  name: string;
  properties?: Record<string, any>;
  measurements?: Record<string, number>;
  severity?: string;
}

interface TelemetrySession {
  id: string;
  startTime: string;
  duration: number;
  events: TelemetryEvent[];
}
```

### 3.5 NavigationAPI

```typescript
interface NavigationAPI {
  navigate(path: string, options?: NavigationOptions): Promise<void>;
  back(): Promise<void>;
  forward(): Promise<void>;
  getCurrentRoute(): Promise<Route>;
  getHistory(): Promise<Route[]>;
  getBookmarks(): Promise<Bookmark[]>;
  addBookmark(bookmark: BookmarkDefinition): Promise<BookmarkId>;
  removeBookmark(bookmarkId: BookmarkId): Promise<void>;
}

interface NavigationOptions {
  replace?: boolean;
  preserveScroll?: boolean;
  state?: any;
}

interface Route {
  path: string;
  name: string;
  params: Record<string, any>;
  query: Record<string, any>;
  hash: string;
  meta: RouteMeta;
}

interface RouteMeta {
  title: string;
  description: string;
  icon: string;
  visible: boolean;
}

interface Bookmark {
  id: string;
  label: string;
  path: string;
  icon: string;
  createdAt: string;
}
```

### 3.6 RoutingAPI

```typescript
interface RoutingAPI {
  getRoutes(): Promise<Route[]>;
  getRoute(name: string): Promise<Route | null>;
  matchRoute(path: string): Promise<RouteMatch | null>;
  getParams(): Promise<Record<string, any>>;
  getQuery(): Promise<Record<string, any>>;
}

interface RouteMatch {
  route: Route;
  params: Record<string, any>;
  query: Record<string, any>;
}
```

---

## 4. Context Lifecycle

### 4.1 Context Lifecycle

```
Created
  ↓
Populated
  ↓
Active
  ↓
Updated
  ↓
Paused
  ↓
Resumed
  ↓
Destroyed
```

### 4.2 Context Updates

```typescript
interface ContextUpdate {
  type: ContextUpdateType;
  field: string;
  oldValue: any;
  newValue: any;
  timestamp: string;
}

type ContextUpdateType = 
  | 'workspace'
  | 'session'
  | 'project'
  | 'repository'
  | 'selection'
  | 'plan'
  | 'permissions'
  | 'capabilities'
  | 'theme'
  | 'preferences';
```

### 4.3 Context Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContextCreated | WorkspaceModuleContext | Creation |
| ContextUpdated | WorkspaceModuleContext, ContextUpdate | Update |
| ContextPaused | WorkspaceModuleContext, Reason | Pause |
| ContextResumed | WorkspaceModuleContext | Resume |
| ContextDestroyed | WorkspaceModuleContext, Reason | Destruction |

---

## 5. Implementation Notes

### 5.1 Context Injection

```typescript
// Module receives context during initialization
class MyModule implements WorkspaceModule {
  async initialize(context: WorkspaceModuleContext) {
    // Store context
    this.context = context;
    
    // Subscribe to context changes
    context.subscribe((changes) => {
      this.onContextChanged(changes);
    });
  }
  
  private onContextChanged(changes: ContextChanges) {
    if (changes.selection) {
      this.onSelectionChanged();
    }
    if (changes.session) {
      this.onSessionChanged();
    }
  }
}
```

### 5.2 Context Access

```typescript
// Access context properties
const session = this.context.session;
const project = this.context.project;
const selection = this.context.selection;

// Use APIs
const results = await this.context.search.search('query');
await this.context.commandPalette.execute('command-id');
await this.context.inspector.open(entity);
```

### 5.3 Context Subscription

```typescript
// Subscribe to specific changes
this.context.subscribe((changes) => {
  if (changes.session) {
    this.loadSessionData();
  }
  if (changes.selection) {
    this.updateSelectionUI();
  }
  if (changes.theme) {
    this.applyTheme();
  }
});
```

---

## 6. Verification Requirements

### 6.1 Context Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Context Creation | Context created correctly |
| Context Population | All fields populated |
| Context Updates | Updates propagate correctly |
| Context Subscription | Subscriptions receive updates |
| Context APIs | All APIs accessible |

### 6.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 7. Integration Points

### 7.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Workspace Runtime | Context management | Runtime API |
| Module Registry | Module context | Registry API |
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |

---

## 8. Open Questions

1. How should context updates be batched?
2. How should context subscriptions be optimized?
3. How should context state be persisted?
4. How should context be restored after restart?
5. How should context be shared between modules?

---

*This document defines the canonical Workspace Module Context API for Vestara.*
*Every module receives exactly one context containing everything it needs.*
