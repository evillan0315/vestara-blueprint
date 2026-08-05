---
id: "VES-103"
title: "VES-103 — Agent Contract"
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
tags: ["standard", "agent-contract", "canonical"]
---

# VES-103: Agent Contract

## What an Agent Is

> **An Agent is an AI-native product that performs tasks on behalf of users
> using models, tools, and workflows. It operates within the platform's
> trust and permission model.**

An Agent implements the Product Contract (VES-100) and extends it with
agent-specific capabilities: agent policies, prompt packs, capability
requirements, and execution constraints.

---

## 1. Architectural Position

```
Product Contract (VES-100)
        │
        ▼
Agent Contract (VES-103)
        │
        ├── Agent Policies
        ├── Prompt Packs
        ├── Capability Requirements
        ├── Execution Constraints
        └── Model Configuration
```

---

## 2. Agent-Specific Contract Sections

### 2.1 Agent Policies

Agents operate under policies that constrain their behavior.

```typescript
interface AgentPolicies {
  readonly maxTokens?: number;
  readonly allowedTools?: string[];
  readonly deniedTools?: string[];
  readonly allowedModels?: string[];
  readonly requireApproval: boolean;
  readonly sandboxExecution: boolean;
  readonly maxExecutionTime?: number;
}
```

### 2.2 Prompt Packs

Agents ship with prompt packs that define their behavior.

```typescript
interface PromptPack {
  readonly id: string;
  readonly name: string;
  readonly systemPrompt: string;
  readonly contextPrompts?: string[];
  readonly toolDescriptions?: Record<string, string>;
}
```

### 2.3 Capability Requirements

Agents declare what they need to function.

```typescript
interface AgentCapabilityRequirements {
  readonly models?: string[];        // Required model providers
  readonly tools?: string[];         // Required tools
  readonly permissions: string[];    // Required permissions
  readonly services?: string[];      // Required platform services
}
```

### 2.4 Execution Constraints

Agents run within execution constraints.

```typescript
interface AgentExecutionConstraints {
  readonly isolation: 'in-process' | 'worker' | 'process' | 'sandbox';
  readonly timeout?: number;
  readonly retryPolicy?: {
    readonly maxRetries: number;
    readonly backoff: 'linear' | 'exponential';
  };
}
```

---

## 3. Agent Manifest Extension

```typescript
interface AgentManifest extends ProductManifest {
  type: 'agent';
  policies: AgentPolicies;
  promptPacks: PromptPack[];
  capabilityRequirements: AgentCapabilityRequirements;
  executionConstraints: AgentExecutionConstraints;
}
```

---

## 4. Related

- [VES-100 Product Contract](VES-100-product-contract.md)
- [VES-105 Extension Contract](VES-105-extension-contract.md)
- `05-ai-core/AI_CONSTITUTION.md`
- `05-ai-core/engineering-orchestration.md`
