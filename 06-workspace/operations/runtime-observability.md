---
id: "runtime-observability"
title: "Runtime Observability — Service Health and Metrics"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
architecture-status: "accepted"
implementation-status: "partial"
verification-status: "partial"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "local main (workspace-ui, kernel)"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "operations", "observability", "metrics"]
---

# Runtime Observability

## Service Health and Metrics

> **Runtime Observability provides visibility into service health, performance metrics, and system status. It distinguishes live operational state from persisted historical truth.**

---

## 1. Observability Contract

```typescript
interface RuntimeObservability {
  services: ServiceHealth[];
  metrics: SystemMetrics;
  alerts: Alert[];
  healthChecks: HealthCheck[];
  uptime: UptimeRecord;
}
```

---

## 2. Service Health

### 2.1 Service Health Contract

```typescript
interface ServiceHealth {
  id: string;
  name: string;
  type: ServiceType;
  status: HealthStatus;
  uptime: number;
  lastHealthCheck: string;
  metrics: ServiceMetrics;
  incidents: Incident[];
}

type ServiceType = 
  | 'api'
  | 'workspace'
  | 'kernel'
  | 'agent-runtime'
  | 'verification'
  | 'event-store'
  | 'graph'
  | 'database'
  | 'websocket'
  | 'provider';

type HealthStatus = 
  | 'healthy'
  | 'degraded'
  | 'unhealthy'
  | 'unknown';
```

### 2.2 Service Health Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  SERVICE HEALTH                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● API Server          healthy    uptime: 2h 34m              │
│  │ ├── Response time: 45ms (avg)                               │
│  │ ├── Requests/sec: 12.5                                      │
│  │ └── Error rate: 0.1%                                        │
│  │                                                             │
│  ● Workspace UI        healthy    uptime: 2h 34m              │
│  │ ├── Load time: 1.2s                                         │
│  │ ├── Active connections: 3                                   │
│  │ └── Memory usage: 45 MB                                     │
│  │                                                             │
│  ● Kernel              healthy    uptime: 2h 34m              │
│  │ ├── Active services: 8                                      │
│  │ ├── State: running                                          │
│  │ └── Last health check: 01:42:30                            │
│  │                                                             │
│  ● Agent Runtime       degraded   uptime: 2h 34m              │
│  │ ├── Active agents: 2                                        │
│  │ ├── Memory usage: 1.2 GB (warning)                         │
│  │ └── CPU usage: 23%                                          │
│  │                                                             │
│  ● Verification        healthy    uptime: 2h 34m              │
│  │ ├── Checks executed: 24                                     │
│  │ ├── Success rate: 95%                                       │
│  │ └── Average duration: 2.3s                                  │
│  │                                                             │
│  ● Event Store         healthy    uptime: 2h 34m              │
│  │ ├── Events stored: 156                                      │
│  │ ├── Storage size: 2.4 MB                                    │
│  │ └── Write latency: 1.2ms                                    │
│  │                                                             │
│  ● Engineering Graph   healthy    uptime: 2h 34m              │
│  │ ├── Entities: 45                                            │
│  │ ├── Relationships: 128                                      │
│  │ └── Query latency: 3.4ms                                    │
│  │                                                             │
│  ● Database            healthy    uptime: 2h 34m              │
│  │ ├── Connections: 5                                           │
│  │ ├── Queries/sec: 8.2                                        │
│  │ └── Storage size: 12.8 MB                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. System Metrics

### 3.1 Metrics Contract

```typescript
interface SystemMetrics {
  timestamp: string;
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  network: NetworkMetrics;
  disk: DiskMetrics;
  process: ProcessMetrics;
}

interface CpuMetrics {
  usage: number;
  cores: number;
  temperature?: number;
  loadAverage: number[];
}

interface MemoryMetrics {
  used: number;
  total: number;
  heap: number;
  external: number;
  arrayBuffers: number;
}

interface NetworkMetrics {
  bytesIn: number;
  bytesOut: number;
  connections: number;
  requestsPerSecond: number;
}

interface DiskMetrics {
  readSpeed: number;
  writeSpeed: number;
  iops: number;
  usage: number;
}

interface ProcessMetrics {
  activeHandles: number;
  activeRequests: number;
  eventLoopLag: number;
  gcDuration: number;
}
```

### 3.2 Metrics Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  SYSTEM METRICS (LIVE)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CPU Usage                                                      │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 23%        │
│  Load Average: 1.2, 1.1, 1.0                                  │
│                                                                 │
│  Memory Usage                                                   │
│  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░ 1.2 GB      │
│  Heap: 856 MB | External: 128 MB | ArrayBuffers: 64 MB        │
│                                                                 │
│  Network I/O                                                    │
│  In:  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ 45 MB/s     │
│  Out: ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 22 MB/s     │
│  Connections: 15 | Requests/sec: 12.5                          │
│                                                                 │
│  Disk I/O                                                       │
│  Read:  ████████████████████████░░░░░░░░░░░░░░░░░ 234 MB/s    │
│  Write: ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 89 MB/s     │
│  IOPS: 1250 | Usage: 45%                                       │
│                                                                 │
│  Process                                                        │
│  Active Handles: 45 | Active Requests: 8                      │
│  Event Loop Lag: 2.3 ms | GC Duration: 1.2 ms                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Health Checks

### 4.1 Health Check Contract

```typescript
interface HealthCheck {
  id: string;
  name: string;
  type: HealthCheckType;
  status: HealthCheckStatus;
  lastRun: string;
  duration: number;
  result: HealthCheckResult;
}

type HealthCheckType = 
  | 'readiness'
  | 'liveness'
  | 'startup'
  | 'custom';

type HealthCheckStatus = 
  | 'passing'
  | 'failing'
  | 'unknown';

interface HealthCheckResult {
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
}
```

### 4.2 Health Check Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  HEALTH CHECKS                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Readiness Checks:                                             │
│  ├── ✓ Database connection                                    │
│  │   Last run: 01:42:30 | Duration: 12ms                     │
│  ├── ✓ API server                                             │
│  │   Last run: 01:42:30 | Duration: 45ms                     │
│  ├── ✓ WebSocket server                                       │
│  │   Last run: 01:42:30 | Duration: 23ms                     │
│  └── ✓ Provider connectivity                                  │
│      Last run: 01:42:30 | Duration: 156ms                    │
│                                                                 │
│  Liveness Checks:                                              │
│  ├── ✓ Process memory                                         │
│  │   Last run: 01:42:30 | Duration: 8ms                      │
│  ├── ✓ Event loop                                             │
│  │   Last run: 01:42:30 | Duration: 5ms                      │
│  └── ✓ Disk space                                             │
│      Last run: 01:42:30 | Duration: 15ms                     │
│                                                                 │
│  Startup Checks:                                               │
│  ├── ✓ Database initialized                                   │
│  │   Last run: 01:40:00 | Duration: 234ms                    │
│  └── ✓ Services registered                                    │
│      Last run: 01:40:01 | Duration: 123ms                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Alerts

### 5.1 Alert Contract

```typescript
interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
  resolution?: string;
}

type AlertType = 
  | 'service-degraded'
  | 'service-unhealthy'
  | 'agent-error'
  | 'execution-failed'
  | 'verification-failed'
  | 'memory-warning'
  | 'cpu-warning'
  | 'disk-warning'
  | 'network-warning'
  | 'error-rate-warning';

type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';
```

### 5.2 Alert Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  ALERTS                                         [Acknowledge All]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ⚠ Warning: Agent Runtime memory usage high (1.2 GB)          │
│     Source: agent-runtime                                       │
│     Time: 01:42:20                                              │
│     Severity: warning                                          │
│     [Acknowledge] [Investigate]                                 │
│                                                                 │
│  ✗ Error: Provider timeout for debugger-01                     │
│     Source: agent-runtime                                       │
│     Time: 01:41:30                                              │
│     Severity: error                                            │
│     [Acknowledge] [Retry] [Reassign]                           │
│                                                                 │
│  ℹ Info: Verification completed with warnings                 │
│     Source: verification                                        │
│     Time: 01:42:15                                              │
│     Severity: info                                             │
│     [Acknowledge] [View Details]                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Uptime

### 6.1 Uptime Contract

```typescript
interface UptimeRecord {
  serviceId: string;
  uptime: number;
  downtime: number;
  availability: number;
  incidents: Incident[];
  lastIncident?: string;
}

interface Incident {
  id: string;
  type: string;
  severity: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  resolution?: string;
}
```

### 6.2 Uptime Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  UPTIME                                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Service Uptime (Last 24 Hours):                               │
│  ├── API Server: 99.9% (8.64s downtime)                       │
│  ├── Workspace UI: 100% (0s downtime)                         │
│  ├── Kernel: 100% (0s downtime)                               │
│  ├── Agent Runtime: 99.5% (43.2s downtime)                    │
│  ├── Verification: 100% (0s downtime)                         │
│  ├── Event Store: 100% (0s downtime)                          │
│  ├── Engineering Graph: 100% (0s downtime)                    │
│  └── Database: 100% (0s downtime)                             │
│                                                                 │
│  Overall Availability: 99.95%                                  │
│  Total Downtime: 51.84s                                        │
│                                                                 │
│  Recent Incidents:                                             │
│  ├── 01:41:30 - Agent Runtime timeout (43.2s)                 │
│  └── 01:40:15 - API Server latency spike (8.64s)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Notes

### 7.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Service Health | Implemented | Health checks exist |
| System Metrics | Partial | Basic metrics exist |
| Health Checks | Implemented | Health checks exist |
| Alerts | Partial | Basic alerting exists |
| Uptime | Partial | Basic uptime tracking exists |

### 7.2 Open Questions

1. How should metrics be aggregated for analysis?
2. Should alerts be routed to different notification channels?
3. How should uptime be calculated across service restarts?
4. Should metrics be stored in the event store or separately?

---

*This document defines Runtime Observability for the Vestara Workspace.*
*It provides visibility into service health, performance metrics, and system status.*
