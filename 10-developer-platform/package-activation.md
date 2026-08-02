---
id: "package-activation"
title: "Package Activation — Controlled Contribution Registration"
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
tags: ["marketplace", "extension", "package", "activation", "canonical"]
---

# Package Activation

## Controlled Contribution Registration

> **Packages add capabilities to existing Vestara runtimes through controlled extension points. Activation is reversible and does not create standalone Workspace surfaces.**

---

## 1. Architectural Position

```
Package
    ↓
Extension Runtime
    ↓
Controlled contribution points
    ↓
Existing runtime or registry
```

Packages never mutate core registries directly. They register contributions through controlled extension points so activation can be reversed cleanly.

---

## 2. Canonical Entities

### 2.1 PackageActivation

```typescript
interface PackageActivation {
  activationId: string;
  packageId: string;
  version: string;
  scope: ActivationScope;
  mode: ActivationMode;
  contributions: ContributionRegistration[];
  state: ActivationState;
  activatedAt: timestamp;
  deactivatedAt?: timestamp;
}

type ActivationScope = 'user' | 'workspace' | 'system';
type ActivationMode = 'eager' | 'on-demand' | 'event' | 'manual';
type ActivationState = 'active' | 'inactive' | 'error' | 'rolled-back';
```

### 2.2 ContributionRegistration

```typescript
interface ContributionRegistration {
  contributionId: string;
  type: ContributionType;
  target: string;
  state: RegistrationState;
  registeredAt: timestamp;
  unregisteredAt?: timestamp;
}

type ContributionType = 
  | 'provider'
  | 'agent-capability'
  | 'verification-rule'
  | 'theme'
  | 'language-support'
  | 'builder-domain'
  | 'tool-adapter'
  | 'standards-pack'
  | 'connector';

type RegistrationState = 'registered' | 'unregistered' | 'error';
```

### 2.3 ActivationRecord

```typescript
interface ActivationRecord {
  recordId: string;
  packageId: string;
  version: string;
  activationId: string;
  previousVersion?: string;
  previousActivationId?: string;
  integrity: IntegrityDeclaration;
  activatedAt: timestamp;
  deactivatedAt?: timestamp;
}
```

---

## 3. Package Types

### 3.1 Provider Adapter

```text
Provider adapter
    ↓
Extension Runtime
    ↓
Provider Registry
    ↓
AI Runtime
```

**Examples:**

```text
@vestara/provider-openai
@vestara/provider-anthropic
@vestara/provider-ollama
```

**Contributions:**

```typescript
interface ProviderContribution {
  type: 'provider';
  provider: ProviderDefinition;
  models: ModelDefinition[];
  capabilities: ProviderCapability[];
}
```

### 3.2 Agent Capability

```text
Agent capability
    ↓
Extension Runtime
    ↓
Capability Registry
    ↓
Agent Runtime
```

**Examples:**

```text
@vestara/agent-code-generation
@vestara/agent-testing
@vestara/agent-deployment
```

**Contributions:**

```typescript
interface AgentCapabilityContribution {
  type: 'agent-capability';
  capability: AgentCapabilityDefinition;
  handlers: CapabilityHandler[];
  requirements: CapabilityRequirement[];
}
```

### 3.3 Verification Rule Pack

```text
Verification rule pack
    ↓
Extension Runtime
    ↓
Verification Registry
    ↓
Verification Engine
```

**Examples:**

```text
@vestara/verifier-playwright
@vestara/verifier-eslint
@vestara/verifier-typescript
```

**Contributions:**

```typescript
interface VerificationRuleContribution {
  type: 'verification-rule';
  rules: VerificationRule[];
 ollectors: EvidenceCollector[];
  strategies: VerificationStrategy[];
}
```

### 3.4 Theme

```text
Theme
    ↓
Extension Runtime
    ↓
Theme Registry
    ↓
Design System
```

**Examples:**

```text
@vestara/theme-metallic-gold
@vestara/theme-dark
@vestara/theme-light
```

**Contributions:**

```typescript
interface ThemeContribution {
  type: 'theme';
  theme: ThemeDefinition;
  tokens: DesignToken[];
  components: ComponentTheme[];
}
```

### 3.5 Language Support

```text
Language support
    ↓
Extension Runtime
    ↓
Language Registry
    ↓
IDE Runtime
```

**Examples:**

```text
@vestara/lang-typescript
@vestara/lang-python
@vestara/lang-rust
```

**Contributions:**

```typescript
interface LanguageSupportContribution {
  type: 'language-support';
  language: LanguageDefinition;
  grammar: GrammarDefinition;
  extensions: LanguageExtension[];
}
```

### 3.6 Builder Domain Pack

```text
Builder domain pack
    ↓
Extension Runtime
    ↓
Builder Registry
    ↓
Builder Runtime
```

**Examples:**

```text
@vestara/builder-react
@vestara/builder-node
@vestara/builder-docker
```

**Contributions:**

```typescript
interface BuilderDomainContribution {
  type: 'builder-domain';
  domain: BuilderDomainDefinition;
  templates: BuilderTemplate[];
  workflows: BuilderWorkflow[];
}
```

### 3.7 Tool Adapter

```text
Tool adapter
    ↓
Extension Runtime
    ↓
Tool Registry
    ↓
Tool Runtime
```

**Examples:**

```text
@vestara/tool-git
@vestara/tool-docker
@vestara/tool-kubernetes
```

**Contributions:**

```typescript
interface ToolAdapterContribution {
  type: 'tool-adapter';
  tool: ToolDefinition;
  commands: ToolCommand[];
  handlers: ToolHandler[];
}
```

### 3.8 Standards Pack

```text
Standards pack
    ↓
Extension Runtime
    ↓
Standards Registry
    ↓
Verification Engine
```

**Examples:**

```text
@vestara/standards-typescript
@vestara/standards-react
@vestara/standards-node
```

**Contributions:**

```typescript
interface StandardsPackContribution {
  type: 'standards-pack';
  standards: StandardsDefinition;
  rules: StandardsRule[];
  configurations: StandardsConfiguration[];
}
```

### 3.9 Connector

```text
Connector
    ↓
Extension Runtime
    ↓
Connector Registry
    ↓
Integration Runtime
```

**Examples:**

```text
@vestara/connector-github
@vestara/connector-jira
@vestara/connector-slack
```

**Contributions:**

```typescript
interface ConnectorContribution {
  type: 'connector';
  connector: ConnectorDefinition;
  endpoints: ConnectorEndpoint[];
  mappings: ConnectorMapping[];
}
```

---

## 4. Activation Modes

### 4.1 Eager Activation

```text
Package installed
    ↓
Extension Runtime
    ↓
Immediate activation
    ↓
Contributions registered
```

**Use cases:**

```text
Theme
    → eager

Language support
    → eager
```

### 4.2 On-Demand Activation

```text
Package installed
    ↓
Extension Runtime
    ↓
Activation on first use
    ↓
Contributions registered
```

**Use cases:**

```text
IDE module
    → on-demand when route opens

Provider adapter
    → on-demand when model selected
```

### 4.3 Event-Based Activation

```text
Package installed
    ↓
Extension Runtime
    ↓
Event listener registered
    ↓
Activation on event
```

**Use cases:**

```text
GitHub module
    → on event: workspace.repository.opened

Jira module
    → on event: workspace.project.created
```

### 4.4 Manual Activation

```text
Package installed
    ↓
Extension Runtime
    ↓
Waiting for manual trigger
    ↓
Activation on user action
```

**Use cases:**

```text
Database studio app
    → manual process start

Deployment center
    → manual process start
```

---

## 5. Relationships

### 5.1 Entity Relationships

```
PackageActivation 1──* ContributionRegistration
PackageActivation 1──1 ActivationRecord
PackageActivation 1──1 IntegrityDeclaration

ActivationRecord 1──1 PackageActivation
ActivationRecord 1──* ActivationRecord (previous)
```

### 5.2 Dependency Graph

```
Extension Runtime
    ├── activates: PackageActivation[]
    ├── registers: ContributionRegistration[]
    └── manages: ActivationRecord[]

PackageActivation
    ├── belongsTo: ExtensionPackage
    ├── contributes: ContributionRegistration[]
    └── recordedAs: ActivationRecord
```

---

## 6. Runtime Ownership

### 6.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| PackageActivation | ExtensionRuntime | Activation lifecycle |
| ContributionRegistration | ExtensionRuntime | Contribution lifecycle |
| ActivationRecord | ExtensionRuntime | Record management |

### 6.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Lifecycle Control**: Owner controls entity lifecycle
3. **State Authority**: Owner is the authoritative source for entity state
4. **Event Emission**: Owner emits domain events for state changes
5. **Reversibility**: All activations must be reversible

---

## 7. Events

### 7.1 Activation Events

| Event | Payload | Trigger |
|-------|---------|---------|
| PackageActivated | PackageActivation | Activation |
| PackageDeactivated | PackageActivation, Reason | Deactivation |
| PackageReactivated | PackageActivation | Reactivation |
| ActivationFailed | PackageActivation, Failure | Activation failure |

### 7.2 Contribution Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ContributionRegistered | ContributionRegistration | Registration |
| ContributionUnregistered | ContributionRegistration, Reason | Unregistration |
| ContributionFailed | ContributionRegistration, Failure | Registration failure |

---

## 8. Verification Requirements

### 8.1 Activation Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | Manifest is valid |
| Dependency Validation | Dependencies are met |
| Permission Validation | Permissions are granted |
| Integrity Validation | Integrity is verified |
| Contribution Validation | Contributions are valid |

### 8.2 Verification Events

| Event | Payload | Trigger |
|-------|---------|---------|
| VerificationStarted | Verification | Verification start |
| VerificationPassed | Verification, Evidence | Verification success |
| VerificationFailed | Verification, Failure[] | Verification failure |
| VerificationCompleted | Verification, Result | Verification complete |

---

## 9. Integration Points

### 9.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Extension Runtime | Activation management | Runtime API |
| Provider Registry | Provider registration | Registry API |
| Capability Registry | Capability registration | Registry API |
| Verification Registry | Verification registration | Registry API |
| Theme Registry | Theme registration | Registry API |
| Language Registry | Language registration | Registry API |
| Builder Registry | Builder registration | Registry API |
| Tool Registry | Tool registration | Registry API |
| Standards Registry | Standards registration | Registry API |
| Connector Registry | Connector registration | Registry API |

---

## 10. Open Questions

1. How should package activation conflicts be resolved?
2. How should package activation dependencies be managed?
3. How should package activation performance be monitored?
4. How should package activation security be enforced?
5. How should package activation analytics be tracked?

---

*This document defines the canonical Package Activation for Vestara.*
*Controlled contribution registration for packages.*
