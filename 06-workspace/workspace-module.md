---
id: "workspace-module"
title: "Workspace Module — Canonical Extension Contract"
volume: "06-workspace"
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
tags: ["workspace", "module", "extension", "canonical"]
---

# Workspace Module

## Canonical Extension Contract

> **WorkspaceModule is the common abstraction that every workspace module implements. It provides one consistent extension model for the Workspace, makes modules discoverable, and simplifies future additions without changing the core application shell.**

---

## 1. Architectural Position

```
WorkspaceShell
    │
    ├── WorkspaceModule
    │       ├── Chat
    │       ├── Messages
    │       ├── Calendar
    │       ├── IDE
    │       ├── Explorer
    │       ├── Terminal
    │       ├── Browser
    │       ├── Knowledge
    │       ├── Documents
    │       └── Whiteboard
    │
    └── WorkspaceRuntime
            ├── Module Registration
            ├── Module Lifecycle
            ├── Module Discovery
            └── Module Orchestration
```

Every module is a projection of the same Engineering Session and the same underlying graph. None of them own business objects.

---

## 2. Canonical Entities

### 2.1 WorkspaceModule

```
WorkspaceModule
    ├── ModuleIdentity
    │   ├── id: ModuleId
    │   ├── name: string
    │   ├── version: string
    │   └── description: string
    ├── ModuleDefinition
    │   ├── navigation: NavigationDefinition
    │   ├── projectionSources: ProjectionSourceDefinition[]
    │   ├── runtimeDependencies: RuntimeDependencyDefinition[]
    │   ├── requiredCapabilities: CapabilityDefinition[]
    │   ├── inspectorIntegration: InspectorIntegrationDefinition
    │   ├── searchIntegration: SearchIntegrationDefinition
    │   ├── commandPaletteIntegration: CommandPaletteIntegrationDefinition
    │   ├── routing: RoutingDefinition
    │   └── deepLinking: DeepLinkingDefinition
    ├── ModuleState
    │   ├── status: ModuleStatus
    │   ├── loaded: boolean
    │   ├── active: boolean
    │   └── lastAccessed: timestamp
    └── ModuleMetadata
        ├── tags: string[]
        ├── author: string
        ├── license: string
        └── repository: string
```

### 2.2 NavigationDefinition

```typescript
interface NavigationDefinition {
  sidebar: SidebarNavigation;
  breadcrumbs: BreadcrumbDefinition[];
  tabs: TabDefinition[];
  quickLinks: QuickLinkDefinition[];
}

interface SidebarNavigation {
  section: string;
  icon: string;
  label: string;
  order: number;
  badge?: BadgeDefinition;
  children?: SidebarNavigation[];
}

interface BreadcrumbDefinition {
  label: string;
  path: string;
  dynamic?: boolean;
}

interface TabDefinition {
  id: string;
  label: string;
  icon: string;
  closable: boolean;
  pinned: boolean;
}

interface QuickLinkDefinition {
  id: string;
  label: string;
  icon: string;
  path: string;
  shortcut?: string;
}
```

### 2.3 ProjectionSourceDefinition

```typescript
interface ProjectionSourceDefinition {
  id: string;
  name: string;
  domain: DomainReference;
  runtime: RuntimeReference;
  entities: string[];
  events: string[];
  filters: FilterDefinition[];
  cache: CacheDefinition;
}

interface DomainReference {
  domainId: string;
  version: string;
  document: string;
}

interface RuntimeReference {
  runtimeId: string;
  version: string;
}

interface FilterDefinition {
  type: FilterType;
  field: string;
  operator: FilterOperator;
  value: any;
}

type FilterType = 'include' | 'exclude' | 'transform';
type FilterOperator = 'eq' | 'ne' | 'gt' | 'lt' | 'in' | 'contains';

interface CacheDefinition {
  enabled: boolean;
  ttl: Duration;
  strategy: CacheStrategy;
}

type CacheStrategy = 'none' | 'memory' | 'persistent' | 'hybrid';
```

### 2.4 RuntimeDependencyDefinition

```typescript
interface RuntimeDependencyDefinition {
  runtimeId: string;
  version: string;
  required: boolean;
  fallback?: string;
  capabilities: string[];
}
```

### 2.5 CapabilityDefinition

```typescript
interface CapabilityDefinition {
  id: string;
  name: string;
  version: string;
  required: boolean;
  fallback?: string;
}
```

### 2.6 InspectorIntegrationDefinition

```typescript
interface InspectorIntegrationDefinition {
  enabled: boolean;
  sections: InspectorSectionDefinition[];
  actions: InspectorActionDefinition[];
  metadata: InspectorMetadataDefinition[];
}

interface InspectorSectionDefinition {
  id: string;
  label: string;
  icon: string;
  component: string;
  order: number;
  required: boolean;
}

interface InspectorActionDefinition {
  id: string;
  label: string;
  icon: string;
  handler: string;
  confirmation?: ConfirmationDefinition;
  requiresApproval: boolean;
}

interface InspectorMetadataDefinition {
  key: string;
  label: string;
  type: MetadataType;
  source: string;
}

type MetadataType = 'string' | 'number' | 'boolean' | 'date' | 'reference' | 'list';
```

### 2.7 SearchIntegrationDefinition

```typescript
interface SearchIntegrationDefinition {
  enabled: boolean;
  indexable: boolean;
  searchable: boolean;
  facets: SearchFacetDefinition[];
  filters: SearchFilterDefinition[];
}

interface SearchFacetDefinition {
  id: string;
  name: string;
  type: FacetType;
  source: string;
}

type FacetType = 'text' | 'category' | 'date' | 'number' | 'boolean';

interface SearchFilterDefinition {
  id: string;
  name: string;
  type: FilterType;
  source: string;
  options?: FilterOptionDefinition[];
}

interface FilterOptionDefinition {
  value: string;
  label: string;
  count?: number;
}
```

### 2.8 CommandPaletteIntegrationDefinition

```typescript
interface CommandPaletteIntegrationDefinition {
  enabled: boolean;
  commands: CommandDefinition[];
  shortcuts: ShortcutDefinition[];
}

interface CommandDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
  handler: string;
  shortcut?: string;
  category: string;
  enabled: boolean;
}

interface ShortcutDefinition {
  id: string;
  keys: string;
  command: string;
  description: string;
}
```

### 2.9 RoutingDefinition

```typescript
interface RoutingDefinition {
  routes: RouteDefinition[];
  defaultRoute: string;
  notFoundRoute: string;
}

interface RouteDefinition {
  path: string;
  name: string;
  component: string;
  layout?: string;
  auth?: AuthDefinition;
  meta?: RouteMetaDefinition;
  children?: RouteDefinition[];
}

interface AuthDefinition {
  required: boolean;
  roles?: string[];
  permissions?: string[];
}

interface RouteMetaDefinition {
  title: string;
  description: string;
  icon: string;
  visible: boolean;
  order: number;
}
```

### 2.10 DeepLinkingDefinition

```typescript
interface DeepLinkingDefinition {
  enabled: boolean;
  schemes: DeepLinkSchemeDefinition[];
  patterns: DeepLinkPatternDefinition[];
}

interface DeepLinkSchemeDefinition {
  scheme: string;
  host: string;
  path: string;
}

interface DeepLinkPatternDefinition {
  pattern: string;
  route: string;
  params: ParamDefinition[];
}

interface ParamDefinition {
  name: string;
  source: string;
  type: ParamType;
  required: boolean;
}

type ParamType = 'string' | 'number' | 'boolean' | 'date';
```

---

## 3. Relationships

### 3.1 Entity Relationships

```
WorkspaceModule 1──* ProjectionSourceDefinition
WorkspaceModule 1──* RuntimeDependencyDefinition
WorkspaceModule 1──* CapabilityDefinition
WorkspaceModule 1──* InspectorIntegrationDefinition
WorkspaceModule 1──* SearchIntegrationDefinition
WorkspaceModule 1──* CommandPaletteIntegrationDefinition
WorkspaceModule 1──* RoutingDefinition
WorkspaceModule 1──* DeepLinkingDefinition
```

### 3.2 Dependency Graph

```
WorkspaceShell
    ├── discovers: WorkspaceModule[]
    ├── loads: WorkspaceModule[]
    └── orchestrates: WorkspaceModule[]

WorkspaceModule
    ├── defines: NavigationDefinition
    ├── projects: ProjectionSourceDefinition[]
    ├── requires: RuntimeDependencyDefinition[]
    ├── needs: CapabilityDefinition[]
    ├── integrates: InspectorIntegrationDefinition
    ├── integrates: SearchIntegrationDefinition
    ├── integrates: CommandPaletteIntegrationDefinition
    ├── routes: RoutingDefinition
    └── deepLinks: DeepLinkingDefinition
```

---

## 4. Runtime Ownership

### 4.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| WorkspaceModule | WorkspaceRuntime | Module lifecycle, discovery |
| NavigationDefinition | WorkspaceModule | Navigation structure |
| ProjectionSourceDefinition | WorkspaceModule | Projection configuration |
| RuntimeDependencyDefinition | WorkspaceModule | Dependency management |
| CapabilityDefinition | WorkspaceModule | Capability requirements |
| InspectorIntegrationDefinition | WorkspaceModule | Inspector integration |
| SearchIntegrationDefinition | WorkspaceModule | Search integration |
| CommandPaletteIntegrationDefinition | WorkspaceModule | Command palette integration |
| RoutingDefinition | WorkspaceModule | Route configuration |
| DeepLinkingDefinition | WorkspaceModule | Deep link configuration |

### 4.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle (create, update, delete)
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Projection Delegation**: Owner may delegate projection to Workspace

---

## 5. Lifecycle

### 5.1 WorkspaceModule Lifecycle

```
Registered
  ↓
Validated
  ↓
Loaded
  ↓
Initialized
  ↓
Active
  ↓
Paused
  ↓
Resumed
  ↓
Unloaded
  ↓
Unregistered
```

### 5.2 Module Registration Lifecycle

```
Discovered
  ↓
Manifest Validated
  ↓
Dependencies Resolved
  ↓
Capabilities Checked
  ↓
Registered
```

### 5.3 Module Loading Lifecycle

```
Requested
  ↓
Dependencies Loaded
  ↓
Components Loaded
  ↓
Routes Registered
  ↓
Commands Registered
  ↓
Ready
```

---

## 6. Events

### 6.1 Module Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleRegistered | WorkspaceModule | Registration |
| ModuleLoaded | WorkspaceModule | Loading |
| ModuleActivated | WorkspaceModule | Activation |
| ModuleDeactivated | WorkspaceModule, Reason | Deactivation |
| ModuleUnloaded | WorkspaceModule, Reason | Unload |
| ModuleUnregistered | WorkspaceModule, Reason | Unregistration |

### 6.2 Navigation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| NavigationChanged | NavigationChange | Navigation |
| RouteMatched | RouteMatch | Route match |
| RouteEnter | RouteEnterEvent | Route enter |
| RouteLeave | RouteLeaveEvent | Route leave |

### 6.3 Search Events

| Event | Payload | Trigger |
|-------|---------|---------|
| SearchQuery | SearchQuery | Search |
| SearchResult | SearchResult | Result |
| FacetSelected | FacetSelection | Facet |

### 6.4 Command Events

| Event | Payload | Trigger |
|-------|---------|---------|
| CommandExecuted | CommandExecution | Command |
| CommandPaletteOpened | CommandPalette | Open |
| ShortcutTriggered | ShortcutEvent | Shortcut |

---

## 7. Module Registry

### 7.1 Registry Interface

```typescript
interface WorkspaceModuleRegistry {
  // Registration
  register(manifest: WorkspaceModuleManifest): Promise<ModuleId>;
  unregister(moduleId: ModuleId): Promise<void>;
  
  // Discovery
  list(query?: ModuleQuery): Promise<ModuleSearchResult>;
  get(moduleId: ModuleId): Promise<WorkspaceModule>;
  
  // Lifecycle
  load(moduleId: ModuleId): Promise<void>;
  unload(moduleId: ModuleId): Promise<void>;
  activate(moduleId: ModuleId): Promise<void>;
  deactivate(moduleId: ModuleId): Promise<void>;
  
  // Events
  on(event: string, handler: Function): void;
  off(event: string, handler: Function): void;
}
```

### 7.2 Module Manifest

```typescript
interface WorkspaceModuleManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  
  // Identity
  author: string;
  license: string;
  repository: string;
  
  // Navigation
  navigation: NavigationDefinition;
  
  // Projections
  projections: ProjectionSourceDefinition[];
  
  // Dependencies
  runtimeDependencies: RuntimeDependencyDefinition[];
  capabilities: CapabilityDefinition[];
  
  // Integrations
  inspector: InspectorIntegrationDefinition;
  search: SearchIntegrationDefinition;
  commandPalette: CommandPaletteIntegrationDefinition;
  
  // Routing
  routing: RoutingDefinition;
  deepLinking: DeepLinkingDefinition;
  
  // Configuration
  configuration?: {
    schema: string;
    defaults: Record<string, any>;
  };
}
```

---

## 8. Module Examples

### 8.1 Messages Module Manifest

```typescript
const messagesModuleManifest: WorkspaceModuleManifest = {
  id: 'messages',
  name: 'Messages',
  version: '1.0.0',
  description: 'Provider-integrated communication projection',
  
  author: 'Vestara',
  license: 'MIT',
  repository: 'https://github.com/evillan0315/vestara-blueprint',
  
  navigation: {
    sidebar: {
      section: 'tools',
      icon: 'mail',
      label: 'Messages',
      order: 2,
    },
    breadcrumbs: [
      { label: 'Tools', path: '/tools' },
      { label: 'Messages', path: '/tools/messages' },
    ],
    tabs: [],
    quickLinks: [
      { id: 'inbox', label: 'Inbox', icon: 'inbox', path: '/tools/messages/inbox' },
      { id: 'drafts', label: 'Drafts', icon: 'file-text', path: '/tools/messages/drafts' },
    ],
  },
  
  projections: [
    {
      id: 'messages-projection',
      name: 'Messages Projection',
      domain: { domainId: 'messaging', version: '1.0.0', document: '04-platform/messaging/messaging-domain.md' },
      runtime: { runtimeId: 'messaging-connector', version: '1.0.0' },
      entities: ['MailAccount', 'MailThread', 'MailMessage', 'Draft', 'Attachment', 'Delivery', 'Label'],
      events: ['MessageReceived', 'MessageRead', 'DraftCreated', 'DraftSent'],
      filters: [],
      cache: { enabled: true, ttl: '5m', strategy: 'memory' },
    },
  ],
  
  runtimeDependencies: [
    { runtimeId: 'messaging-connector', version: '1.0.0', required: true, capabilities: ['mail.read', 'mail.search'] },
  ],
  
  capabilities: [
    { id: 'mail.read', name: 'Mail Read', version: '1.0.0', required: true },
    { id: 'mail.search', name: 'Mail Search', version: '1.0.0', required: true },
  ],
  
  inspector: {
    enabled: true,
    sections: [
      { id: 'overview', label: 'Overview', icon: 'info', component: 'MessageOverview', order: 1, required: true },
      { id: 'participants', label: 'Participants', icon: 'users', component: 'MessageParticipants', order: 2, required: false },
      { id: 'attachments', label: 'Attachments', icon: 'paperclip', component: 'MessageAttachments', order: 3, required: false },
      { id: 'engineering', label: 'Engineering', icon: 'link', component: 'MessageEngineering', order: 4, required: false },
    ],
    actions: [
      { id: 'reply', label: 'Reply', icon: 'reply', handler: 'replyToMessage', confirmation: undefined, requiresApproval: false },
      { id: 'forward', label: 'Forward', icon: 'forward', handler: 'forwardMessage', confirmation: undefined, requiresApproval: false },
      { id: 'create-task', label: 'Create Task', icon: 'plus', handler: 'createTaskFromMessage', confirmation: { title: 'Create Task', message: 'Create a task from this message?' }, requiresApproval: false },
    ],
    metadata: [
      { key: 'from', label: 'From', type: 'reference', source: 'participant' },
      { key: 'subject', label: 'Subject', type: 'string', source: 'message' },
      { key: 'date', label: 'Date', type: 'date', source: 'message' },
    ],
  },
  
  search: {
    enabled: true,
    indexable: true,
    searchable: true,
    facets: [
      { id: 'provider', name: 'Provider', type: 'category', source: 'account.provider' },
      { id: 'unread', name: 'Unread', type: 'boolean', source: 'thread.unread' },
      { id: 'hasAttachments', name: 'Has Attachments', type: 'boolean', source: 'thread.hasAttachments' },
    ],
    filters: [
      { id: 'dateRange', name: 'Date Range', type: 'date', source: 'message.timestamp' },
      { id: 'participant', name: 'Participant', type: 'text', source: 'participant.email' },
    ],
  },
  
  commandPalette: {
    enabled: true,
    commands: [
      { id: 'new-message', label: 'New Message', description: 'Compose a new message', icon: 'edit', handler: 'composeNewMessage', category: 'Messages', enabled: true },
      { id: 'search-messages', label: 'Search Messages', description: 'Search through messages', icon: 'search', handler: 'searchMessages', shortcut: 'Cmd+Shift+M', category: 'Messages', enabled: true },
    ],
    shortcuts: [
      { id: 'new-message', keys: 'Cmd+N', command: 'new-message', description: 'New Message' },
      { id: 'search-messages', keys: 'Cmd+Shift+M', command: 'search-messages', description: 'Search Messages' },
    ],
  },
  
  routing: {
    routes: [
      { path: '/tools/messages', name: 'messages', component: 'MessagesLayout', children: [
        { path: 'inbox', name: 'inbox', component: 'UnifiedInbox', meta: { title: 'Inbox', description: 'Unified Inbox', icon: 'inbox', visible: true, order: 1 } },
        { path: 'thread/:threadId', name: 'thread', component: 'ThreadView', meta: { title: 'Thread', description: 'Message Thread', icon: 'message-square', visible: false, order: 2 } },
        { path: 'drafts', name: 'drafts', component: 'DraftsView', meta: { title: 'Drafts', description: 'Draft Messages', icon: 'file-text', visible: true, order: 3 } },
      ]},
    ],
    defaultRoute: '/tools/messages/inbox',
    notFoundRoute: '/404',
  },
  
  deepLinking: {
    enabled: true,
    schemes: [
      { scheme: 'vestara', host: 'messages', path: '/tools/messages' },
    ],
    patterns: [
      { pattern: '/thread/:threadId', route: 'thread', params: [{ name: 'threadId', source: 'threadId', type: 'string', required: true }] },
    ],
  },
};
```

---

## 9. Verification Requirements

### 9.1 Module Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | Module manifest conforms to schema |
| Dependency Validation | All dependencies available |
| Capability Validation | Required capabilities available |
| Route Validation | Routes do not conflict |
| Command Validation | Commands do not conflict |

### 9.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Workspace Runtime | Module lifecycle | Runtime API |
| Engineering Event Store | Event persistence | Event API |
| Engineering Graph | Relationship tracking | Graph API |
| Search Service | Search integration | Search API |
| Command Service | Command integration | Command API |

---

## 11. Open Questions

1. How should module conflicts be resolved?
2. How should module dependencies be versioned?
3. How should module configurations be managed?
4. How should module performance be monitored?
5. How should module security be enforced?

---

*This document defines the canonical Workspace Module contract for Vestara.*
*Every workspace module implements this contract for one consistent extension model.*
