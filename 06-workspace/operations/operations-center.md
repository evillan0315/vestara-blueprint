---
id: "operations-center"
title: "Operations Center — Live Telemetry vs Historical Truth"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "ratified"
owner: "@frontend-engineer"
author: ["@frontend-engineer", "@chief-architect"]
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
canonical: true
supersedes: []
tags: ["workspace", "operations", "telemetry", "monitoring"]
implementation-ref: "local main (workspace-ui, kernel)"
---

# Operations Center

## Live Telemetry vs Historical Truth

> **The Operations Center clearly separates ephemeral operational state from persisted engineering history. Users should never confuse what is happening now with what actually happened.**

---

## 1. Dual-State Model

```typescript
interface OperationsState {
  live: LiveOperationalState;
  historical: HistoricalTruth;
}
```

### 1.1 Live Operational State

```typescript
interface LiveOperationalState {
  services: ServiceStatus[];
  agents: AgentStatus[];
  executions: ActiveExecution[];
  connections: ConnectionStatus[];
  metrics: RealtimeMetrics;
  alerts: ActiveAlert[];
}
```

### 1.2 Historical Truth

```typescript
interface HistoricalTruth {
  events: EngineeringEvent[];
  completedExecutions: CompletedExecution[];
  auditTrail: AuditEvent[];
  incidentHistory: Incident[];
  performanceHistory: PerformanceSnapshot[];
}
```

---

## 2. Visual Distinction

### 2.1 Live State Indicators

| Indicator | Value |
|-----------|-------|
| Color | Dynamic, animated (green pulse) |
| Timestamp | Relative ("2m ago", "just now") |
| Mutability | Can change at any time |
| Source | WebSocket, telemetry stream |
| Badge | "Live" badge |
| Animation | Pulsing, breathing |

### 2.2 Historical Truth Indicators

| Indicator | Value |
|-----------|-------|
| Color | Static, muted (gray/blue) |
| Timestamp | Absolute ("01:42:08") |
| Mutability | Immutable once recorded |
| Source | Engineering Event Store |
| Badge | "Recorded" badge |
| Animation | None, static |

---

## 3. Operations Center Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  OPERATIONS CENTER                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ LIVE STATE                                    [Live ●]  │   │
│  │                                                         │   │
│  │ Services: 5/5 healthy                                   │   │
│  │ Agents: 2 active, 1 idle                               │   │
│  │ Executions: 1 running (2m 34s)                         │   │
│  │ Connections: 3 WebSocket, 12 HTTP                       │   │
│  │                                                         │   │
│  │ Metrics:                                               │   │
│  │ ├── CPU: 23%                                           │   │
│  │ ├── Memory: 1.2 GB                                     │   │
│  │ ├── Network: 45 MB/s                                   │   │
│  │ └── Disk: 234 MB/s                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ HISTORICAL TRUTH                          [Recorded ●]  │   │
│  │                                                         │   │
│  │ Today: 24 events | 8 executions | 12 evidence items   │   │
│  │ This Week: 156 events | 42 executions | 89 evidence   │   │
│  │                                                         │   │
│  │ Recent Events:                                          │   │
│  │ ├── 01:42:15 - execution.completed (test-result-001)  │   │
│  │ ├── 01:42:08 - execution.started (execution-001)       │   │
│  │ ├── 01:41:50 - verification.passed (verification-001) │   │
│  │ └── 01:41:30 - session.created (session-001)           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Service Status

### 4.1 Service Health Model

```typescript
interface ServiceStatus {
  id: string;
  name: string;
  type: ServiceType;
  status: ServiceHealth;
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
  | 'database';

type ServiceHealth = 
  | 'healthy'
  | 'degraded'
  | 'unhealthy'
  | 'unknown';
```

### 4.2 Service Status Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  SERVICE STATUS                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● API Server          healthy    uptime: 2h 34m              │
│  ● Workspace UI        healthy    uptime: 2h 34m              │
│  ● Kernel              healthy    uptime: 2h 34m              │
│  ● Agent Runtime       degraded   uptime: 2h 34m              │
│  │ └── Warning: High memory usage (1.2 GB)                    │
│  ● Verification        healthy    uptime: 2h 34m              │
│  ● Event Store         healthy    uptime: 2h 34m              │
│  ● Engineering Graph   healthy    uptime: 2h 34m              │
│  ● Database            healthy    uptime: 2h 34m              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Agent Status

### 5.1 Agent Status Model

```typescript
interface AgentStatus {
  id: string;
  name: string;
  type: AgentType;
  status: AgentHealth;
  currentTask?: string;
  sessionId?: string;
  executionId?: string;
  metrics: AgentMetrics;
  lastActivity: string;
}

type AgentHealth = 
  | 'active'
  | 'idle'
  | 'busy'
  | 'error'
  | 'offline';
```

### 5.2 Agent Status Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT STATUS                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● architect-01        active     session-001 (planning)      │
│  ● developer-01        active     session-001 (executing)     │
│  │ └── Task: Edit runtime.ts                                   │
│  │ └── Provider: openai/gpt-4                                  │
│  │ └── Duration: 2m 34s                                        │
│  ○ verifier-01         idle       -                            │
│  ○ reviewer-01         idle       -                            │
│  ✗ debugger-01         error      session-002 (failed)         │
│  │ └── Error: Provider timeout                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Telemetry

### 6.1 Realtime Metrics

```typescript
interface RealtimeMetrics {
  timestamp: string;
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  network: NetworkMetrics;
  disk: DiskMetrics;
  process: ProcessMetrics;
}

interface CpuMetrics {
  usage: number;          // Percentage
  cores: number;
  temperature?: number;   // Celsius
}

interface MemoryMetrics {
  used: number;           // Bytes
  total: number;
  heap: number;
  external: number;
}

interface NetworkMetrics {
  bytesIn: number;
  bytesOut: number;
  connections: number;
}

interface DiskMetrics {
  readSpeed: number;      // Bytes/sec
  writeSpeed: number;
  iops: number;
}

interface ProcessMetrics {
  activeHandles: number;
  activeRequests: number;
  eventLoopLag: number;   // milliseconds
}
```

### 6.2 Telemetry Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  TELEMETRY (LIVE)                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CPU Usage                                                      │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 23%        │
│                                                                 │
│  Memory Usage                                                   │
│  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░ 1.2 GB      │
│                                                                 │
│  Network I/O                                                    │
│  In:  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░ 45 MB/s     │
│  Out: ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 22 MB/s     │
│                                                                 │
│  Disk I/O                                                       │
│  Read:  ████████████████████████░░░░░░░░░░░░░░░░░ 234 MB/s    │
│  Write: ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 89 MB/s     │
│                                                                 │
│  Event Loop Lag                                                 │
│  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 2.3 ms     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Event Stream

### 7.1 Event Stream Model

```typescript
interface EventStreamEntry {
  id: string;
  type: EngineeringEventType;
  timestamp: string;
  source: string;
  sessionId?: string;
  executionId?: string;
  agentId?: string;
  subject: string;
  data: Record<string, unknown>;
  severity: EventSeverity;
}

type EventSeverity = 'info' | 'warning' | 'error' | 'critical';
```

### 7.2 Event Stream Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENT STREAM                                    [Filter] [Search]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  01:42:15 ● execution.completed     session-001  [info]       │
│  01:42:14 ● verification.passed     session-001  [info]       │
│  01:42:12 ● evidence.captured       session-001  [info]       │
│  01:42:10 ● tool.execution          session-001  [info]       │
│  01:42:08 ● execution.started       session-001  [info]       │
│  01:42:05 ● agent.assigned          session-001  [info]       │
│  01:42:00 ● session.created         session-001  [info]       │
│  01:41:55 ● provider.routed         session-001  [info]       │
│  01:41:50 ● plan.approved           session-001  [info]       │
│  01:41:45 ● intent.parsed           session-001  [info]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Alerts and Incidents

### 8.1 Alert Model

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
  | 'disk-warning';

type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';
```

### 8.2 Alert Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│  ALERTS                                         [Acknowledge All]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ⚠ Warning: Agent Runtime memory usage high (1.2 GB)          │
│     Source: agent-runtime                                       │
│     Time: 01:42:20                                              │
│     [Acknowledge] [Investigate]                                 │
│                                                                 │
│  ✗ Error: Provider timeout for debugger-01                     │
│     Source: agent-runtime                                       │
│     Time: 01:41:30                                              │
│     [Acknowledge] [Retry] [Reassign]                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Historical Analysis

### 9.1 Historical Truth Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│  HISTORICAL TRUTH                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Time Range: [Last Hour] [Last 24 Hours] [Last Week] [Custom] │
│                                                                 │
│  Events: 24                                                     │
│  Executions: 8                                                  │
│  Evidence: 12                                                   │
│  Alerts: 2                                                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 01:42:15 - execution.completed                         │   │
│  │   Session: session-001                                  │   │
│  │   Agent: developer-01                                   │   │
│  │   Duration: 2m 34s                                      │   │
│  │   Evidence: test-result-001, screenshot-001             │   │
│  │   Status: success                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 01:41:50 - verification.passed                         │   │
│  │   Session: session-001                                  │   │
│  │   Checks: 5/5 passed                                   │   │
│  │   Score: 95%                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Implementation Notes

### 10.1 Current State

| Component | Status | Notes |
|-----------|--------|-------|
| Service Status | Implemented | Health checks exist |
| Agent Status | Implemented | Agent monitoring exists |
| Telemetry | Partial | Basic metrics exist |
| Event Stream | Partial | Event logging exists |
| Alerts | Partial | Basic alerting exists |
| Historical Analysis | Partial | Event store exists |

### 10.2 Open Questions

1. How should historical data be aggregated for analysis?
2. Should telemetry be stored in the event store or separately?
3. How should alerts be routed to different notification channels?
4. Should historical analysis support custom time ranges?

---

*This document defines the Operations Center for the Vestara Workspace.*
*It clearly separates live operational state from persisted engineering history.*
