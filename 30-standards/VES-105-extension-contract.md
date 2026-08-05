---
id: "VES-105"
title: "VES-105 — Extension Contract"
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
tags: ["standard", "extension-contract", "canonical"]
---

# VES-105: Extension Contract

## What an Extension Is

> **An Extension is a product that adds capabilities to existing Vestara
> runtimes through controlled extension points. Activation is reversible and
> does not create standalone surfaces.**

An Extension implements the Product Contract (VES-100) and extends it with
extension-specific capabilities: hooks, APIs, events, dependency injection,
capability registration, sandboxing, and version compatibility.

---

## 1. Architectural Position

```
Product Contract (VES-100)
        │
        ▼
Extension Contract (VES-105)
        │
        ├── Extension Points / Hooks
        ├── Plugin APIs
        ├── Events
        ├── Dependency Injection
        ├── Capability Registration
        ├── Sandboxing
        └── Version Compatibility
```

---

## 2. Extension-Specific Contract Sections

### 2.1 Extension Points / Hooks

Extensions hook into platform extension points.

```typescript
interface ExtensionPoint {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly hookSignature: string;
  readonly phase: 'before' | 'after' | 'around';
}

interface ExtensionHook {
  readonly extensionPointId: string;
  readonly entrypoint: string;
  readonly priority: number;
}
```

### 2.2 Plugin APIs

Extensions consume and provide plugin APIs.

```typescript
interface PluginAPI {
  readonly id: string;
  readonly version: string;
  readonly methods: APIMethod[];
}

interface APIMethod {
  readonly name: string;
  readonly parameters: Parameter[];
  readonly returnType: string;
}
```

### 2.3 Events

Extensions can subscribe to and emit events.

```typescript
interface ExtensionEvent {
  readonly type: string;
  readonly payload: unknown;
  readonly source: string;
  readonly timestamp: string;
}
```

### 2.4 Dependency Injection

Extensions can register services into the platform's dependency injection
container.

```typescript
interface ExtensionServiceRegistration {
  readonly serviceId: string;
  readonly factory: string;
  readonly lifecycle: 'singleton' | 'transient' | 'scoped';
  readonly dependencies?: string[];
}
```

### 2.5 Capability Registration

Extensions register capabilities the platform can discover.

```typescript
interface ExtensionCapabilityRegistration {
  readonly capabilityId: string;
  readonly provider: string;
  readonly version: string;
  readonly metadata?: Record<string, unknown>;
}
```

### 2.6 Sandboxing

Extensions run within sandbox boundaries.

```typescript
interface ExtensionSandbox {
  readonly mode: IsolationMode;
  readonly allowedAPIs: string[];
  readonly allowedResources: string[];
  readonly resourceLimits: {
    readonly memory?: number;
    readonly cpu?: number;
    readonly network?: boolean;
    readonly filesystem?: 'none' | 'readonly' | 'scoped' | 'full';
  };
}
```

### 2.7 Version Compatibility

Extensions declare compatibility with platform versions.

```typescript
interface ExtensionCompatibility {
  readonly vestara: string;       // Semver range
  readonly node?: string;
  readonly operatingSystems?: string[];
  readonly architectures?: string[];
  readonly dependencies?: Record<string, string>;  // extensionId → semver range
}
```

---

## 3. Extension Manifest Extension

```typescript
interface ExtensionManifest extends ProductManifest {
  type: 'extension';
  hooks: ExtensionHook[];
  sandbox: ExtensionSandbox;
  compatibility: ExtensionCompatibility;
}
```

---

## 4. Extension Trust Levels

Extensions operate at different trust levels:

```typescript
type ExtensionTrustLevel =
  | 'vestara-built-in'
  | 'verified-publisher'
  | 'community-verified'
  | 'community'
  | 'private-organization'
  | 'local-development'
  | 'untrusted';
```

Higher trust levels grant broader API access and fewer sandbox restrictions.

---

## 5. Related

- [VES-100 Product Contract](VES-100-product-contract.md)
- [VES-103 Agent Contract](VES-103-agent-contract.md)
- [Extension Platform Roadmap](../20-roadmaps/extension-platform-roadmap.md)
- `10-developer-platform/extension-platform.md`
- `10-developer-platform/extension-manifest.md`
- `10-developer-platform/package-activation.md`
