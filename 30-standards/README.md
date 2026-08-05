---
title: "Standards — Volume Overview"
volume: "30-standards"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "draft"
owner: "@chief-architect"
created: "2026-08-05"
last-reviewed: "2026-08-05"
next-review: "2026-11-05"
tags: ["standards", "contracts", "products", "specifications"]
---

# Volume 30: Standards
## The Contracts Every Product Must Implement

> **Mission**: Define the platform specifications that every installable
> product must conform to. Standards answer **what**; roadmaps answer **when**.

---

## 📋 Volume Contents

```
30-standards/
│
├── README.md                              ← This file
├── VES-100-product-contract.md            ← Product Contract Specification (shared foundation)
├── VES-101-workspace-contract.md          ← Workspace Contract
├── VES-102-application-contract.md        ← Application Contract
├── VES-103-agent-contract.md              ← Agent Contract
├── VES-104-runtime-contract.md            ← Runtime Contract
└── VES-105-extension-contract.md          ← Extension Contract
```

---

## What Standards Are

A **standard** is a platform specification. It defines the contract a product
type must implement to be installable, executable, and integratable inside
Vestara. Standards are stable: they change only through the ADR process, not
through roadmap updates.

Every Marketplace product — Workspace, AI Agent, theme, runtime, plugin, or
business application — implements the same **Product Contract** (VES-100) and
then extends it with its own specialized interface.

This gives the platform a stable foundation similar to how OCI standardized
containers or how VS Code standardized extensions. The Marketplace, Product
Runtime, and Extension Platform all depend on the same contract instead of
defining overlapping requirements.

## Relationship to Roadmaps

| Concept | Answers | Lives In |
|---------|---------|----------|
| **Standards** | **What** must a product conform to? | `30-standards/` |
| **Roadmaps** | **When** is each capability built? | `20-roadmaps/` |

The roadmaps reference the standards. A milestone is "done" when it implements
the contract the standard defines.

## Contract Hierarchy

```text
VES-100 Product Contract (shared foundation)
        │
        ├── VES-101 Workspace Contract
        ├── VES-102 Application Contract
        ├── VES-103 Agent Contract
        ├── VES-104 Runtime Contract
        └── VES-105 Extension Contract
```

## Product-Centric Architecture

Everything in Vestara is converging on a single concept: **the Product**.

Not the Marketplace. Not the Runtime. Not even the VES standards. The Product
is the architectural center of gravity that everything else depends on.

```text
              Product
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
 Marketplace   Runtime   Standards
      │           │           │
      └───────────┼───────────┘
                  ▼
           Engineering Graph
                  │
                  ▼
        Evidence & Verification
```

Every capability is becoming a product:

| Product Kind | What It Is |
|--------------|-----------|
| Workspace | The user-facing surface |
| Application | An independently executable product |
| AI Agent | An AI-native task performer |
| Runtime | An execution environment |
| Extension | A capability contributor |
| Theme | A visual layer |
| Knowledge Pack | A knowledge resource |
| Model | An AI model provider |
| Service | A background capability |
| Automation | A workflow pack |
| OS Profile | An operating system configuration |

Workspace, Agent, Runtime, and Extension are **product kinds** — not separate
architectural concepts. They all follow the same lifecycle, governance model,
and distribution mechanism.

### Decision Framework

Every future architectural decision can be evaluated with one question:

> **"Is this a product, or is it part of the platform?"**

If it is a product, it naturally follows the VES contracts, Product Runtime,
Marketplace lifecycle, verification pipeline, and engineering governance.

### Terminology Evolution

The conceptual model should eventually adopt product-centric naming:

| Current Name | Product-Centric Name |
|--------------|---------------------|
| `VestaraPackageManifest` | `ProductManifest` / `VestaraProductManifest` |
| Extension Runtime | `ProductRuntime` |
| Extension Context | `ProductContext` |
| Package Registry | `ProductRegistry` |
| Dependency Graph | `ProductGraph` |
| Package Installer | `ProductInstaller` |
| Extension Verifier | `ProductVerifier` |
| Extension Lifecycle | `ProductLifecycle` |

This is a **conceptual** rename. Existing code names can remain for
compatibility while architecture and future APIs adopt the product-centric
terminology.

## The Four Eras of Vestara

The platform has evolved through distinct phases:

| Era | Focus | What Was Built |
|-----|-------|----------------|
| **1. Runtime** | Reliable execution | Lifecycle management, isolation, permissions |
| **2. Engineering** | AI engineering | Agents, verification, evidence, Engineering Graph |
| **3. Platform** | Standards & modularity | VES contracts, modular components |
| **4. Product** | Product-centricity | Every capability is a first-class product with common lifecycle, governance, and distribution |

The VES standards mark the transition into the **Product Era**. From here,
the platform has a single, consistent architectural language.

## Platform Direction

> **Vestara is not an AI application. It is a standards-driven operating
> platform for AI products.**

The VES standards are the center of a converging architecture. They are not
isolated documents — they connect every major platform system:

```text
Marketplace ───── distributes compliant products
      │
      ▼
VES Standards ──── define what "correct" means
      │
      ├── Product Runtime ── executes products per contract
      ├── Extension Platform ── integrates products per contract
      │
      ▼
Verifier ────────── evaluates standards compliance
      │
      ▼
Evidence Pipeline ─ proves engineering work
      │
      ▼
Engineering Graph ─ models relationships between products
```

A product in the Marketplace traces its compliance back to standards, its
verification back to evidence, and its dependencies back to the Engineering
Graph. These are no longer isolated systems — they reinforce each other.

## Architectural Hierarchy

The correct dependency order places the Marketplace at the **end**, not the
center. The Marketplace is one distribution channel among many. The Product
exists independently of it.

```text
Platform
    ↓
Product
    ↓
Contract
    ↓
Runtime
    ↓
Verification
    ↓
Marketplace
```

A Product can be distributed through channels that are not the Marketplace:

* An offline USB repository
* A custom OS image bundle
* An enterprise catalog
* Automatic organizational provisioning
* Local AI generation
* Direct user-to-user sharing

In every case, the Product exists even if the Marketplace does not. The
Marketplace is a **distribution channel**, not the architectural center.

This separation means each layer can evolve independently. The VES standards
define *what* a product is, the Product Runtime defines *how* it executes,
and the Marketplace defines *how* it is distributed — without forcing changes
into each other.

## Future Subsystems

The product-centric model gives every future subsystem a clear domain boundary
because each operates on the same core concept:

| Subsystem | Product-Centric Domain |
|-----------|----------------------|
| Identity | Product Identity (publisher, signature, ownership) |
| Security | Product Trust (permissions, provenance, verification) |
| Updates | Product Lifecycle Management |
| Analytics | Product Telemetry |
| Storage | Product State and Product Data |
| Licensing | Product Licensing |

## Validating the Architecture

From here, the work shifts from expanding the architecture to **validating**
it. As new features arise, test them against the model:

- **Fits naturally** → the architecture is holding.
- **Doesn't fit** → examine whether the feature needs reframing or the model
  genuinely needs to evolve.

That shift — from design exercise to durable engineering framework — is the
sign the architecture has matured.

## Future Evolution: Compliance

Today the VES standards define **contracts**. Eventually they will also define
**compliance** — a measurable, machine-readable declaration of how well a
product conforms:

```yaml
compliance:
  ves-100: compliant
  ves-101: compliant
  ves-104: partial
```

This unlocks two capabilities:

1. **Marketplace trust model** — products display measurable compliance badges
   (VES-100 ✓, VES-101 ✓, Evidence 97%) instead of manual review scores.
2. **Standards Compliance Engine** — the Verifier evolves from a testing
   system into a compliance engine that produces:
   ```
   Engineering Verification
   ✓ Build  ✓ Tests  ✓ Security  ✓ Evidence
   ✓ VES-100  ✓ VES-101  ✓ VES-104
   ```

"Verified" gains a measurable meaning.

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `20-roadmaps/` | Roadmaps implement these standards |
| `10-developer-platform/` | Existing extension specs being elevated to standards |
| `04-platform/` | Platform architecture these standards extend |
| `00-governance/` | ADR process governs standard changes |

**END OF STANDARDS VOLUME OVERVIEW**

*A platform without contracts is just a collection of features.*
