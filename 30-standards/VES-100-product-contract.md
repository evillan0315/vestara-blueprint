---
id: "VES-100"
title: "VES-100 — Product Contract Specification"
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
tags: ["standard", "product-contract", "foundation", "canonical"]
---

# VES-100: Product Contract Specification

## The Shared Foundation

> **Every installable product in Vestara implements the Product Contract.**
> This is the single contract the Marketplace, Product Runtime, and Extension
> Platform all depend on. Specialized contracts (VES-101 through VES-105) extend
> it; they do not replace it.

---

## 1. Architectural Position

```
Product Contract (VES-100)
        │
        ├── Workspace Contract (VES-101)
        ├── Application Contract (VES-102)
        ├── Agent Contract (VES-103)
        ├── Runtime Contract (VES-104)
        └── Extension Contract (VES-105)
```

The Product Contract defines what every product has in common. Specialized
contracts define what is unique to each product type.

---

## 2. Contract Sections

Every product contract — regardless of type — includes these sections:

| Section | Purpose |
|---------|---------|
| **Manifest** | Identity, version, publisher, compatibility |
| **Lifecycle** | Load → activate → suspend → resume → shutdown → unload |
| **Capabilities** | What the product declares it can do |
| **Dependencies** | What other products this product requires |
| **Permissions** | What the product is allowed to access |
| **Services** | What the product provides to other products |
| **Routes** | Application routes the product contributes |
| **Navigation** | Navigation entries the product contributes |
| **Commands** | Commands the product registers |
| **Settings** | Configuration the product exposes |
| **Assets** | Static resources the product ships |
| **Documentation** | Product documentation |
| **Verification** | How the product is verified |
| **Evidence** | Trust and provenance evidence |
| **Telemetry** | Operational telemetry the product emits |
| **Health** | Health check the product exposes |
| **Updates** | How the product receives updates |

---

## 3. Canonical Entities

### 3.1 ProductManifest

The manifest is the single source of truth for a product's identity and
requirements. It is interpreted by the Marketplace and validated by the
Product Runtime.

```typescript
interface ProductManifest {
  schemaVersion: 1;
  id: string;                       // Unique product identifier
  name: string;                     // Human-readable name
  version: string;                  // Semantic version
  description: string;              // Product description
  type: ProductType;                // Product type discriminator
  publisher: {
    id: string;
    name: string;
  };
  compatibility: {
    vestara: string;                // Semver range for Vestara
    node?: string;
    operatingSystems?: string[];
    architectures?: string[];
  };
  entrypoints: {
    runtime?: string;               // Runtime entrypoint
    cli?: string;                   // CLI entrypoint
    workspace?: string;             // Workspace entrypoint
    setup?: string;                 // Setup entrypoint
  };
  capabilities: string[];           // Declared capabilities
  permissions: PermissionRequest[]; // Requested permissions
  dependencies: ProductDependency[]; // Product dependencies
  contributions: ProductContributions; // What the product contributes
  isolation: IsolationMode;         // Isolation mode
  integrity: {
    algorithm: 'sha256';
    digest: string;
    signature?: string;
  };
}
```

### 3.2 ProductType

Every product has a type. The type determines which specialized contract
applies.

```typescript
type ProductType =
  | 'workspace'
  | 'application'
  | 'agent'
  | 'runtime'
  | 'extension'
  | 'theme'
  | 'knowledge-pack'
  | 'automation-pack'
  | 'service';
```

### 3.3 ProductLifecycle

Every product follows the same lifecycle. The Product Runtime is the sole
authority for lifecycle transitions.

```typescript
type ProductLifecycleState =
  | 'discovered'
  | 'downloaded'
  | 'verified'
  | 'installed'
  | 'configured'
  | 'enabled'
  | 'active'
  | 'suspended'
  | 'disabled'
  | 'update-available'
  | 'updating'
  | 'rollback-available'
  | 'failed'
  | 'quarantined'
  | 'uninstalling'
  | 'removed';
```

### 3.4 ProductContributions

Products contribute capabilities to the platform through a controlled set of
contribution points.

```typescript
interface ProductContributions {
  providers?: ContributionReference[];
  agents?: ContributionReference[];
  commands?: ContributionReference[];
  workflows?: ContributionReference[];
  routes?: ContributionReference[];
  navigation?: ContributionReference[];
  settings?: ContributionReference[];
  views?: ContributionReference[];
  themes?: ContributionReference[];
  services?: ContributionReference[];
  hooks?: ContributionReference[];
}
```

### 3.5 PermissionRequest

Products declare what they need. The platform decides what they get.

```typescript
interface PermissionRequest {
  capability: string;
  scope: PermissionScope;
  resources?: string[];
  approval: 'automatic' | 'policy' | 'explicit';
  reason?: string;
}

type PermissionScope =
  | 'workspace'
  | 'repository'
  | 'user'
  | 'system'
  | 'network-domain'
  | 'provider-api';
```

### 3.6 ProductHealth

Every product exposes a health check.

```typescript
interface ProductHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  checkedAt: string;
  message?: string;
  metadata?: Record<string, unknown>;
}
```

---

## 4. Cross-Cutting Concerns

### 4.1 Verification

Every product must be verifiable before installation. Verification includes:
- Integrity check (digest validation)
- Signature validation (publisher identity)
- Compatibility check (Vestara version, OS, architecture)
- Permission review (user consent)

### 4.2 Evidence

Every product carries evidence of trust and provenance:
- Publisher identity and reputation
- Verification badges
- Audit history
- Source transparency

### 4.3 Telemetry

Every product emits operational telemetry:
- Lifecycle events
- Health status
- Error reports
- Usage metrics (opt-in)

### 4.4 Updates

Every product receives updates through the same mechanism:
- Update discovery (Marketplace)
- Update download (Package Manager)
- Update application (transactional, with rollback)
- Update verification (integrity + signature)

---

## 5. Relationship to Other Standards

| Standard | Extends Product Contract With |
|----------|-------------------------------|
| VES-101 Workspace | Route registration, layout system, navigation, workspace-specific capabilities |
| VES-102 Application | Process isolation, app lifecycle, multi-window support |
| VES-103 Agent | Agent policies, prompt packs, capability requirements |
| VES-104 Runtime | Runtime injection, service hosting, execution context |
| VES-105 Extension | Extension points, hooks, contribution registration |

---

## 6. Relationship to Roadmaps

| Roadmap | Implements These Standards |
|---------|----------------------------|
| Marketplace Workspace Roadmap | VES-100, VES-101, VES-102 |
| Product Runtime Roadmap | VES-100 (lifecycle, isolation, health) |
| Extension Platform Roadmap | VES-100, VES-105 |

---

## 7. Related

- [Marketplace-Driven Workspace Roadmap](../20-roadmaps/marketplace-workspace-roadmap.md)
- [Product Runtime Roadmap](../20-roadmaps/product-runtime-roadmap.md)
- [Extension Platform Roadmap](../20-roadmaps/extension-platform-roadmap.md)
- `10-developer-platform/extension-manifest.md`
- `10-developer-platform/marketplace-asset-model.md`
