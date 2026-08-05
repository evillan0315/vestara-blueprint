---
id: "VES-102"
title: "VES-102 — Application Contract"
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
tags: ["standard", "application-contract", "canonical"]
---

# VES-102: Application Contract

## What an Application Is

> **An Application is an independently executable product with its own
> process, runtime lifecycle, storage boundary, and potentially multiple
> Workspace modules. It must not be loaded as arbitrary in-process code.**

An Application implements the Product Contract (VES-100) and extends it with
application-specific capabilities: process isolation, app lifecycle, and
multi-window support.

---

## 1. Architectural Position

```
Product Contract (VES-100)
        │
        ▼
Application Contract (VES-102)
        │
        ├── Process Isolation
        ├── App Lifecycle
        ├── Multi-Window Support
        ├── Storage Boundary
        └── Service Registration
```

Apps are larger, independently executable products. Third-party apps require
process, worker, container, or VM isolation.

---

## 2. Application-Specific Contract Sections

### 2.1 Process Isolation

Applications run in isolated processes. The platform enforces isolation
boundaries.

```typescript
type ApplicationIsolationMode =
  | 'process'       // Separate OS process
  | 'worker'        // Web Worker
  | 'container'     // Container/VM
  | 'sandbox';      // Sandboxed in-process (trusted apps only)
```

### 2.2 App Lifecycle

The application lifecycle extends the base product lifecycle:

```typescript
type ApplicationLifecycleState =
  | ProductLifecycleState
  | 'launching'
  | 'running'
  | 'minimized'
  | 'background'
  | 'terminating'
  | 'terminated';
```

### 2.3 Storage Boundary

Each application has its own storage boundary. Applications cannot access
another application's storage without explicit permission.

```typescript
interface ApplicationStorage {
  readonly appId: string;
  readonly dataDirectory: string;
  readonly cacheDirectory: string;
  readonly tempDirectory: string;
}
```

### 2.4 Multi-Window Support

Applications can create and manage multiple windows.

```typescript
interface ApplicationWindow {
  readonly id: string;
  readonly title: string;
  readonly route: string;
  readonly state: 'normal' | 'minimized' | 'maximized' | 'fullscreen';
}
```

---

## 3. Application Manifest Extension

```typescript
interface ApplicationManifest extends ProductManifest {
  type: 'application';
  entrypoints: {
    runtime: string;  // Required for applications
  };
  isolation: ApplicationIsolationMode;
  contributions: ProductContributions & {
    routes: ContributionReference[];
    services: ContributionReference[];
  };
}
```

---

## 4. Related

- [VES-100 Product Contract](VES-100-product-contract.md)
- [VES-101 Workspace Contract](VES-101-workspace-contract.md)
- [VES-104 Runtime Contract](VES-104-runtime-contract.md)
- `10-developer-platform/app-runtime-and-isolation.md`
