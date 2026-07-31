---
id: "adr-106"
adr: "ADR-106"
title: "Provider-Neutral Engineering Provider Runtime"
category: "foundation"
version: 1.0
date: "2026-08-01"
status: "accepted"
author: "@chief-architect"
deciders: ["@chief-architect"]
consulted: ["@ai-engineer", "@backend-engineer"]
informed: ["@team"]
tags: ["providers", "provider-neutral", "architecture"]
referenced_by:
  - type: "blueprint"
    target: "05-ai-core/provider-architecture.md"
  - type: "runtime"
    target: "ProviderRuntime"
---

## Context

Vestara must not be locked to a single model vendor. Earlier Blueprint
documents named OpenCode as the architecture's provider, which conflates a
default distribution choice with the architecture.

## Decision

Vestara core is **provider-neutral**. A distribution may ship with a default
provider. Users may install, remove, enable, disable, and prioritize providers.
Providers are replaceable engineering workers governed by Vestara. Vestara owns
intent, planning, assignment, permissions, execution identity, events,
evidence, verification, trust, and history; the provider owns only
provider-specific reasoning, tool loop, and implementation execution. Provider
types are distinguished (API model provider, engineering execution provider,
interactive CLI provider, local inference provider, MCP-connected provider).

## Consequences

### Positive
- No vendor lock-in; providers compete on quality.
- Cross-provider verification becomes possible.

### Negative
- More surface area: provider health, routing, lifecycle, security.

### Risks
- Provider adapter drift (risk; mitigation: stable provider contract).

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Single default provider as the architecture | simple | lock-in | rejected |
| Plugin providers only | isolated | heavier | adopted as future extension |

## Implementation Notes
- Migration required? No.
- Implemented: provider manager + default provider; installable providers are
  proposed.
