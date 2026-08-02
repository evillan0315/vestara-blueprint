---
id: "workspace-module-installation"
title: "Workspace Module Installation — Interactive Workspace Extension"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
owner: "@chief-architect"
author: ["@chief-architect", "@frontend-engineer"]
last-reviewed: "2026-08-03"
next-review: "2027-02-03"
canonical: true
supersedes: []
tags: ["marketplace", "extension", "workspace-module", "installation", "canonical"]
---

# Workspace Module Installation

## Interactive Workspace Extension

> **Workspace modules contribute interactive Workspace experiences through `WorkspaceModule` and `WorkspaceSDK`. They are extension packages whose manifest declares a workspace entrypoint.**

---

## 1. Architectural Position

```
Workspace Module Package
    ↓
Extension Runtime
    ↓
Workspace Module Registry
    ↓
Workspace Runtime
    ↓
Navigation, routes, commands, search, inspector, docking
```

A workspace module is an extension package whose manifest declares:

```yaml
kind: workspace-module
entrypoints:
  workspace: ./dist/workspace-module.js
```

---

## 2. Canonical Entities

### 2.1 WorkspaceModuleInstallation

```typescript
interface WorkspaceModuleInstallation {
  installationId: string;
  moduleId: string;
  version: string;
  scope: InstallationScope;
  enabled: boolean;
  enabledIn: WorkspaceReference[];
  configuration: ModuleConfiguration;
  state: InstallationState;
  installedAt: timestamp;
  enabledAt?: timestamp;
  disabledAt?: timestamp;
}

type InstallationScope = 'user' | 'workspace' | 'system';
type InstallationState = 'installed' | 'enabled' | 'disabled' | 'error' | 'rolled-back';
```

### 2.2 WorkspaceReference

```typescript
interface WorkspaceReference {
  workspaceId: string;
  workspacePath: string;
  enabledAt: timestamp;
  configuration?: ModuleConfiguration;
}
```

### 2.3 ModuleConfiguration

```typescript
interface ModuleConfiguration {
  schemaVersion: string;
  settings: Record<string, unknown>;
  permissions: PermissionRecord[];
  lastModified: timestamp;
}
```

### 2.4 WorkspaceModuleActivation

```typescript
interface WorkspaceModuleActivation {
  activationId: string;
  installationId: string;
  moduleId: string;
  workspaceId: string;
  mode: ActivationMode;
  contributions: ModuleContribution[];
  state: ActivationState;
  activatedAt: timestamp;
  deactivatedAt?: timestamp;
}

type ActivationMode = 'eager' | 'on-demand' | 'event' | 'manual';
type ActivationState = 'active' | 'inactive' | 'error' | 'rolled-back';
```

### 2.5 ModuleContribution

```typescript
interface ModuleContribution {
  contributionId: string;
  type: ContributionType;
  definition: ContributionDefinition;
  state: ContributionState;
  registeredAt: timestamp;
  unregisteredAt?: timestamp;
}

type ContributionType = 
  | 'navigation'
  | 'route'
  | 'command'
  | 'search-provider'
  | 'inspector'
  | 'toolbar'
  | 'sidebar'
  | 'status';

type ContributionState = 'registered' | 'unregistered' | 'error';
```

---

## 3. Installation Scopes

### 3.1 User Installation

The module is available to the user but not automatically active everywhere.

```text
~/.vestara/extensions/
```

Conceptually:

```text
Installed for Eddie
Enabled only in selected workspaces
```

### 3.2 Workspace Enablement

The workspace selects an already installed version and configuration.

```text
<workspace>/.vestara/extensions.lock
<workspace>/.vestara/extensions.json
```

This stores references and enablement state, not duplicate package contents.

### 3.3 System Installation

Reserved for Vestara OS, administrators, or managed enterprise deployment.

```text
/opt/vestara/extensions/
```

System scope should be policy-controlled and generally read-only to ordinary users.

### 3.4 Scope Rules

```text
Install ≠ Enable
```

A module may be installed once and enabled in zero, one, or many workspaces.

---

## 4. Activation Flow

### 4.1 Standard Activation

```text
Module Package Installed
    ↓
Extension Runtime
    ↓
Workspace Module Registry
    ↓
Workspace Runtime
    ↓
Module Loaded
    ↓
Contributions Registered
    ↓
Navigation Added
    ↓
Routes Registered
    ↓
Commands Registered
    ↓
Search Providers Registered
    ↓
Inspector Sections Registered
    ↓
Module Active
```

### 4.2 Activation Modes

**Eager:**

```text
Module installed
    ↓
Immediate activation
    ↓
All contributions registered
```

**On-Demand:**

```text
Module installed
    ↓
Activation on route visit
    ↓
Contributions registered
```

**Event-Based:**

```text
Module installed
    ↓
Event listener registered
    ↓
Activation on event
```

**Manual:**

```text
Module installed
    ↓
Waiting for manual trigger
    ↓
Activation on user action
```

---

## 5. Contribution Registration

### 5.1 Navigation Contributions

```typescript
interface NavigationContribution {
  type: 'navigation';
  definition: {
    sidebar: SidebarNavigation;
    breadcrumbs: BreadcrumbDefinition[];
    tabs: TabDefinition[];
    quickLinks: QuickLinkDefinition[];
  };
}
```

### 5.2 Route Contributions

```typescript
interface RouteContribution {
  type: 'route';
  definition: {
    routes: RouteDefinition[];
    defaultRoute: string;
    notFoundRoute: string;
  };
}
```

### 5.3 Command Contributions

```typescript
interface CommandContribution {
  type: 'command';
  definition: {
    commands: CommandDefinition[];
    shortcuts: ShortcutDefinition[];
    categories: CommandCategory[];
  };
}
```

### 5.4 Search Provider Contributions

```typescript
interface SearchProviderContribution {
  type: 'search-provider';
  definition: {
    providers: SearchProviderDefinition[];
    facets: SearchFacetDefinition[];
    filters: SearchFilterDefinition[];
  };
}
```

### 5.5 Inspector Contributions

```typescript
interface InspectorContribution {
  type: 'inspector';
  definition: {
    sections: InspectorSectionDefinition[];
    actions: InspectorActionDefinition[];
    metadata: InspectorMetadataDefinition[];
  };
}
```

### 5.6 Toolbar Contributions

```typescript
interface ToolbarContribution {
  type: 'toolbar';
  definition: {
    toolbars: ToolbarDefinition[];
    items: ToolbarItemDefinition[];
  };
}
```

### 5.7 Sidebar Contributions

```typescript
interface SidebarContribution {
  type: 'sidebar';
  definition: {
    nodes: SidebarNodeDefinition[];
    order: number;
  };
}
```

### 5.8 Status Contributions

```typescript
interface StatusContribution {
  type: 'status';
  definition: {
    items: StatusItemDefinition[];
    priority: number;
  };
}
```

---

## 6. Relationships

### 6.1 Entity Relationships

```
WorkspaceModuleInstallation 1──* WorkspaceReference
WorkspaceModuleInstallation 1──1 ModuleConfiguration
WorkspaceModuleInstallation 1──* WorkspaceModuleActivation

WorkspaceModuleActivation 1──* ModuleContribution
WorkspaceModuleActivation 1──1 WorkspaceReference

ModuleContribution 1──1 ContributionDefinition
```

### 6.2 Dependency Graph

```
Extension Runtime
    ├── installs: WorkspaceModuleInstallation[]
    └── manages: WorkspaceModuleActivation[]

Workspace Runtime
    ├── loads: WorkspaceModule[]
    ├── activates: WorkspaceModuleActivation[]
    └── renders: WorkspaceUI

WorkspaceModule
    ├── contributes: ModuleContribution[]
    ├── registers: NavigationContribution
    ├── registers: RouteContribution
    ├── registers: CommandContribution
    ├── registers: SearchProviderContribution
    ├── registers: InspectorContribution
    ├── registers: ToolbarContribution
    ├── registers: SidebarContribution
    └── registers: StatusContribution
```

---

## 7. Runtime Ownership

### 7.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| WorkspaceModuleInstallation | ExtensionRuntime | Installation lifecycle |
| WorkspaceReference | ExtensionRuntime | Enablement management |
| ModuleConfiguration | WorkspaceRuntime | Configuration management |
| WorkspaceModuleActivation | WorkspaceRuntime | Activation lifecycle |
| ModuleContribution | WorkspaceRuntime | Contribution lifecycle |

### 7.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Reversibility**: All activations must be reversible

---

## 8. Events

### 8.1 Installation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleInstalled | WorkspaceModuleInstallation | Installation |
| ModuleUninstalled | WorkspaceModuleInstallation, Reason | Uninstallation |
| ModuleUpdated | WorkspaceModuleInstallation, UpdateResult | Update |
| ModuleRolledBack | WorkspaceModuleInstallation, RollbackResult | Rollback |

### 8.2 Enablement Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleEnabled | WorkspaceModuleInstallation, WorkspaceReference | Enablement |
| ModuleDisabled | WorkspaceModuleInstallation, WorkspaceReference, Reason | Disablement |

### 8.3 Activation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ModuleActivated | WorkspaceModuleActivation | Activation |
| ModuleDeactivated | WorkspaceModuleActivation, Reason | Deactivation |
| ModuleFailed | WorkspaceModuleActivation, Failure | Activation failure |

### 8.4 Contribution Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContributionRegistered | ModuleContribution | Registration |
| ContributionUnregistered | ModuleContribution, Reason | Unregistration |
| ContributionFailed | ModuleContribution, Failure | Registration failure |

---

## 9. Verification Requirements

### 9.1 Installation Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | Manifest is valid |
| Dependency Validation | Dependencies are met |
| Permission Validation | Permissions are granted |
| Integrity Validation | Integrity is verified |
| Workspace Compatibility | Module is workspace-compatible |
| SDK Compatibility | Module is SDK-compatible |

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
| Extension Runtime | Installation management | Runtime API |
| Workspace Module Registry | Module registration | Registry API |
| Workspace Runtime | Module activation | Module API |
| Navigation Service | Navigation registration | Navigation API |
| Route Service | Route registration | Route API |
| Command Service | Command registration | Command API |
| Search Service | Search registration | Search API |
| Inspector Service | Inspector registration | Inspector API |
| Toolbar Service | Toolbar registration | Toolbar API |
| Sidebar Service | Sidebar registration | Sidebar API |
| Status Service | Status registration | Status API |

---

## 11. Open Questions

1. How should module activation conflicts be resolved?
2. How should module activation dependencies be managed?
3. How should module activation performance be monitored?
4. How should module activation security be enforced?
5. How should module activation analytics be tracked?

---

*This document defines the canonical Workspace Module Installation for Vestara.*
*Interactive workspace extension through controlled contribution registration.*
