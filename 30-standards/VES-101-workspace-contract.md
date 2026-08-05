---
id: "VES-101"
title: "VES-101 — Workspace Contract"
volume: "30-standards"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "draft"
owner: "@chief-architect"
created: "2026-08-05"
last-reviewed: "2026-08-05"
next-review: "2026-11-05"
architecture-status: "proposed"
implementation-status: "not-started"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
canonical: true
supersedes: []
tags: ["standard", "workspace-contract", "canonical"]
---

# VES-101: Workspace Contract

## What a Workspace Is

> **A Workspace is an executable product that projects governed engineering
> work performed by humans, agents, runtimes, and tools. It is the primary
> user-facing surface of Vestara.**

A Workspace implements the Product Contract (VES-100) and extends it with
workspace-specific capabilities: route registration, layout system, navigation,
and workspace-scoped permissions.

---

## 1. Architectural Position

```
Product Contract (VES-100)
        │
        ▼
Workspace Contract (VES-101)
        │
        ├── Route Registration
        ├── Layout System
        ├── Navigation Contract
        ├── Sidebar API
        ├── Toolbar API
        ├── Status Bar API
        └── Workspace Permissions
```

The Workspace is a projection layer. It does not own, define, or persist domain
objects. Every entity displayed in the Workspace is a projection of a canonical
domain contract defined elsewhere.

---

## 2. Workspace-Specific Contract Sections

In addition to the VES-100 sections, a Workspace defines:

### 2.1 Route Registration

A Workspace contributes application routes to the platform router.

```typescript
interface WorkspaceRouteRegistration {
  readonly path: string;
  readonly component: string;
  readonly title: string;
  readonly icon?: string;
  readonly permissions?: string[];
  readonly children?: WorkspaceRouteRegistration[];
}
```

### 2.2 Layout System

A Workspace defines its layout structure.

```typescript
interface WorkspaceLayout {
  readonly regions: {
    readonly header?: LayoutRegion;
    readonly sidebar?: LayoutRegion;
    readonly main: LayoutRegion;
    readonly toolbar?: LayoutRegion;
    readonly statusbar?: LayoutRegion;
    readonly panels?: LayoutRegion[];
  };
}
```

### 2.3 Navigation Contract

A Workspace contributes navigation entries.

```typescript
interface WorkspaceNavigation {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly route: string;
  readonly children?: WorkspaceNavigation[];
  readonly permissions?: string[];
}
```

### 2.4 Surface APIs

A Workspace exposes APIs for its surfaces:

```typescript
interface WorkspaceSurfaceAPIs {
  readonly sidebar: SidebarAPI;
  readonly toolbar: ToolbarAPI;
  readonly statusbar: StatusBarAPI;
}
```

### 2.5 Workspace Permissions

Workspace-scoped permissions extend the base permission model:

```typescript
type WorkspacePermissionScope =
  | 'workspace.view'
  | 'workspace.edit'
  | 'workspace.admin'
  | 'workspace.install-products';
```

---

## 3. Workspace Manifest Extension

A Workspace manifest extends the base ProductManifest:

```typescript
interface WorkspaceManifest extends ProductManifest {
  type: 'workspace';
  entrypoints: {
    workspace: string;  // Required for workspaces
  };
  contributions: ProductContributions & {
    routes: ContributionReference[];
    navigation: ContributionReference[];
    views: ContributionReference[];
  };
}
```

---

## 4. Workspace Lifecycle

The Workspace lifecycle extends the base product lifecycle with workspace-specific states:

```
installed → configured → enabled → active → suspended → disabled → removed
```

A Workspace can be **active** (currently displayed), **suspended** (loaded but
not displayed), or **disabled** (not loaded).

---

## 5. Multiple Workspaces

The platform supports multiple Workspace products installed simultaneously.
Only one Workspace is active at a time. Users can switch between installed
Workspaces. The default Workspace is user-configurable.

---

## 6. Related

- [VES-100 Product Contract](VES-100-product-contract.md)
- [VES-102 Application Contract](VES-102-application-contract.md)
- `06-workspace/01-workspace-ux-contract.md`
- `06-workspace/02-workspace-architecture.md`
