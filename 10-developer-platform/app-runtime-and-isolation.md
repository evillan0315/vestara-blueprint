---
id: "app-runtime-and-isolation"
title: "App Runtime and Isolation — Standalone Application Execution"
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
tags: ["marketplace", "extension", "app", "isolation", "runtime", "canonical"]
---

# App Runtime and Isolation

## Standalone Application Execution

> **Apps are larger independently executable products with their own process, runtime lifecycle, storage boundary, and potentially multiple Workspace modules. They must not be loaded as arbitrary in-process code.**

---

## 1. Architectural Position

```
App Package
    ↓
App Runtime / Process Supervisor
    ↓
Isolated process or container
    ↓
Registered services and Workspace modules
```

Apps must not be loaded as arbitrary in-process code. Third-party apps require process, worker, container, or VM isolation.

---

## 2. Canonical Entities

### 2.1 AppInstallation

```typescript
interface AppInstallation {
  installationId: string;
  appId: string;
  version: string;
  scope: InstallationScope;
  state: InstallationState;
  configuration: AppConfiguration;
  process?: ProcessRecord;
  installedAt: timestamp;
  startedAt?: timestamp;
  stoppedAt?: timestamp;
}

type InstallationScope = 'user' | 'workspace' | 'system';
type InstallationState = 'installed' | 'running' | 'stopped' | 'error' | 'rolled-back';
```

### 2.2 AppConfiguration

```typescript
interface AppConfiguration {
  schemaVersion: string;
  settings: Record<string, unknown>;
  permissions: PermissionRecord[];
  isolation: IsolationConfiguration;
  healthCheck?: HealthCheckConfiguration;
  lastModified: timestamp;
}

interface IsolationConfiguration {
  type: IsolationType;
  resources?: ResourceLimits;
  network?: NetworkPolicy;
  filesystem?: FilesystemPolicy;
}

type IsolationType = 'none' | 'worker' | 'process' | 'container' | 'vm';

interface ResourceLimits {
  cpu?: string;
  memory?: string;
  disk?: string;
}

interface NetworkPolicy {
  allowed: string[];
  denied: string[];
}

interface FilesystemPolicy {
  readable: string[];
  writable: string[];
  denied: string[];
}

interface HealthCheckConfiguration {
  command: string[];
  intervalMs: number;
  timeoutMs: number;
  retries: number;
}
```

### 2.3 ProcessRecord

```typescript
interface ProcessRecord {
  processId: string;
  installationId: string;
  appId: string;
  pid: number;
  state: ProcessState;
  isolation: IsolationType;
  resources: ProcessResources;
  startedAt: timestamp;
  stoppedAt?: timestamp;
  exitCode?: number;
}

type ProcessState = 'starting' | 'running' | 'stopping' | 'stopped' | 'crashed';

interface ProcessResources {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}
```

### 2.4 AppActivation

```typescript
interface AppActivation {
  activationId: string;
  installationId: string;
  appId: string;
  workspaceId?: string;
  mode: ActivationMode;
  contributions: AppContribution[];
  state: ActivationState;
  activatedAt: timestamp;
  deactivatedAt?: timestamp;
}

type ActivationMode = 'eager' | 'on-demand' | 'event' | 'manual';
type ActivationState = 'active' | 'inactive' | 'error' | 'rolled-back';
```

### 2.5 AppContribution

```typescript
interface AppContribution {
  contributionId: string;
  type: ContributionType;
  definition: ContributionDefinition;
  state: ContributionState;
  registeredAt: timestamp;
  unregisteredAt?: timestamp;
}

type ContributionType = 'workspace-module' | 'service' | 'api' | 'background-task';
type ContributionState = 'registered' | 'unregistered' | 'error';
```

---

## 3. Isolation Models

### 3.1 No Isolation

First-party trusted apps only — in-process may be permitted.

### 3.2 Worker Isolation

Web Worker or Node Worker — separate thread with message passing.

### 3.3 Process Isolation

Separate OS process — IPC communication with resource limits.

### 3.4 Container Isolation

Docker container — namespace isolation with resource limits and network policy.

### 3.5 VM Isolation

Virtual machine — full hardware isolation with complete resource isolation.

---

## 4. Trust Boundaries

### 4.1 Execution Trust

```text
Trusted package/module
    → in-process may be permitted

Third-party app
    → process, worker, container, or VM isolation required
```

### 4.2 Trust Levels

| Trust Level | Description | Execution Boundary |
|-------------|-------------|-------------------|
| First-party | Vestara core apps | In-process permitted |
| Verified | Signed by verified publisher | Worker or process isolation |
| Community | Unsigned third-party | Container isolation required |
| Untrusted | Unknown source | Blocked |

---

## 5. Activation Flow

### 5.1 Standard Activation

```text
App Package Installed
    ↓
Extension Runtime
    ↓
App Runtime / Process Supervisor
    ↓
Process Spawned
    ↓
Health Check Passed
    ↓
Services Registered
    ↓
Workspace Modules Registered
    ↓
App Running
```

### 5.2 Activation Modes

**Eager:** Immediate process start on installation.

**On-Demand:** Process start on first use.

**Event-Based:** Process start on event trigger.

**Manual:** Process start on user action.

---

## 6. Process Management

### 6.1 Process Lifecycle

Starting → Running → Stopping → Stopped

### 6.2 Health Monitoring

Health check commands executed at intervals with response analysis and state update.

### 6.3 Resource Monitoring

CPU, memory, disk, and network usage monitored with resource limits enforcement.

---

## 7. Events

### 7.1 Installation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AppInstalled | AppInstallation | Installation |
| AppUninstalled | AppInstallation, Reason | Uninstallation |
| AppUpdated | AppInstallation, UpdateResult | Update |
| AppRolledBack | AppInstallation, RollbackResult | Rollback |

### 7.2 Process Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ProcessStarted | ProcessRecord | Process start |
| ProcessStopped | ProcessRecord, Reason | Process stop |
| ProcessCrashed | ProcessRecord, Failure | Process crash |
| HealthCheckPassed | ProcessRecord | Health check success |
| HealthCheckFailed | ProcessRecord, Failure | Health check failure |

### 7.3 Activation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| AppActivated | AppActivation | Activation |
| AppDeactivated | AppActivation, Reason | Deactivation |
| AppFailed | AppActivation, Failure | Activation failure |

---

## 8. Verification Requirements

### 8.1 Installation Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | Manifest is valid |
| Dependency Validation | Dependencies are met |
| Permission Validation | Permissions are granted |
| Integrity Validation | Integrity is verified |
| Isolation Validation | Isolation is configured |
| Health Check | App is healthy |

---

## 9. Integration Points

### 9.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Extension Runtime | Installation management | Runtime API |
| App Runtime | Process management | Process API |
| Process Supervisor | Process supervision | Supervisor API |
| Container Runtime | Container management | Container API |
| Health Service | Health monitoring | Health API |
| Resource Service | Resource monitoring | Resource API |
| Workspace Runtime | Module registration | Module API |

---

## 10. Open Questions

1. How should app sandboxing be enforced?
2. How should app resource limits be managed?
3. How should app health monitoring work?
4. How should app updates be handled?
5. How should app rollback work?

---

*This document defines the canonical App Runtime and Isolation for Vestara.*
*Standalone application execution with proper isolation boundaries.*
