---
id: "marketplace-release-catalog"
title: "Marketplace Release Catalog — First-Party Asset Inventory"
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
tags: ["marketplace", "catalog", "release", "first-party", "canonical"]
---

# Marketplace Release Catalog

## First-Party Asset Inventory

> **The first-party catalog formalizes the three asset kinds with specific implementations. The first release keeps the catalog deliberately small to prove all three activation models without overwhelming the Marketplace.**

---

## 1. Architectural Position

```
Marketplace
    ├── Catalog
    │   ├── Workspace Modules (interactive surfaces)
    │   ├── Packages (runtime extensions)
    │   └── Apps (isolated execution)
    ├── Distribution
    └── Lifecycle
```

The catalog is organized by asset kind, then by category within each kind.

---

## 2. Workspace Modules

These contribute interactive Workspace surfaces:

### 2.1 Development

```text
Vestara IDE
API Client
Database Studio
Git Explorer
Test Explorer
Visual Testing Studio
Container Explorer
```

### 2.2 Communication

```text
Messages
Calendar
Contacts
Meetings
Slack
Microsoft Teams
Discord
```

### 2.3 Builders

```text
Application Builder
API Builder
Database Builder
Workflow Builder
Infrastructure Builder
Integration Builder
Agent Builder
Plugin Builder
```

### 2.4 Engineering

```text
Planning Workspace
Execution Center
Artifact Explorer
Evidence Explorer
Verification Center
Engineering Timeline
Engineering Graph
Architecture Explorer
```

### 2.5 Operations

```text
Operations Center
Runtime Monitor
Telemetry Explorer
Event Stream
Log Explorer
Diagnostics
Deployment Monitor
Incident Center
```

### 2.6 Productivity

```text
Documents
Knowledge Base
Whiteboard
Notes
Spreadsheet
Presentations
PDF Workspace
```

### 2.7 Integrations

```text
GitHub
GitLab
Bitbucket
Jira
Linear
Azure DevOps
Notion
Google Drive
OneDrive
Figma
```

---

## 3. Packages

These extend existing runtimes without creating full Workspace surfaces:

### 3.1 AI Providers

```text
OpenAI Provider
Anthropic Provider
Gemini Provider
Ollama Provider
OpenAI-Compatible Provider
```

### 3.2 Agent Capabilities

```text
TypeScript Development Pack
React Development Pack
DevOps Pack
Security Review Pack
Documentation Pack
Database Engineering Pack
```

### 3.3 Verification Packs

```text
Playwright Verification
API Contract Verification
Accessibility Verification
Security Verification
Performance Verification
Visual Regression Verification
```

### 3.4 Connectors

```text
Gmail Connector
Outlook Connector
IMAP Connector
GitHub Connector
Jira Connector
PostgreSQL Connector
AWS Connector
```

### 3.5 Themes

```text
Vestara Metallic Gold
High Contrast
Minimal Dark
Enterprise Light
```

### 3.6 Standards Packs

```text
TypeScript Standards
React Standards
API Design Standards
Security Standards
Documentation Standards
```

---

## 4. Apps

These run with independent lifecycle and isolation:

```text
Vestara IDE Desktop
Local Model Manager
Database Administration Studio
Deployment Control Center
Visual Testing Studio
Data Pipeline Studio
Infrastructure Control Center
Security Analysis Studio
Onboarding Lab
Portable Workspace Manager
Container Management Studio
Local Cloud Emulator
```

---

## 5. First Release Catalog

Keep the first catalog deliberately small:

### 5.1 Workspace Modules (10)

```text
IDE
Messages
Calendar
GitHub
Application Builder
API Builder
Database Studio
Engineering Graph
Verification Center
Operations Center
```

### 5.2 Packages (6)

```text
OpenAI Provider
Ollama Provider
Playwright Verification
TypeScript Standards
React Standards
Metallic Gold Theme
```

### 5.3 Apps (3)

```text
Local Model Manager
Visual Testing Studio
Database Administration Studio
```

### 5.4 Release Rationale

| Kind | Count | Rationale |
|------|-------|-----------|
| Workspace Module | 10 | Prove interactive surface activation |
| Package | 6 | Prove runtime extension activation |
| App | 3 | Prove isolated process activation |
| **Total** | **19** | Broad enough to prove all models, small enough to manage |

---

## 6. Reference Implementments

The architecture is ready for implementation planning. The next practical milestone should be one reference asset of each kind:

### 6.1 Package → Metallic Gold Theme

```text
Manifest Kind: package
Activation: eager
Contributions: theme.register
Runtime Boundary: in-process
```

### 6.2 Workspace Module → Messages

```text
Manifest Kind: workspace-module
Activation: on-demand
Contributions: navigation, routes, commands, search, inspector
Runtime Boundary: Workspace Runtime
```

### 6.3 App → Local Model Manager

```text
Manifest Kind: app
Activation: manual
Contributions: workspace-module, service
Runtime Boundary: isolated process
```

### 6.4 Validation Scope

These three implementations would validate:

- Manifest schema
- Dependency resolver
- Installer
- Activation boundaries
- Rollback
- Permissions
- Signing
- Marketplace UX

---

## 7. Asset State Model

The Marketplace UI distinguishes three concepts:

### 7.1 Installed

```text
Asset bytes and version exist locally
Location: ~/.vestara/extensions/
```

### 7.2 Enabled

```text
Asset is active in this workspace
Location: <workspace>/.vestara/extensions.lock
```

### 7.3 Running

```text
App or runtime process is currently executing
Location: Process table
```

### 7.4 State Examples

```text
IDE Module
    Installed: Yes
    Enabled in vestara-ai-core: Yes
    Running: Loaded on demand

Local Model Manager
    Installed: Yes
    Enabled in vestara-ai-core: Yes
    Running: No

Metallic Gold Theme
    Installed: Yes
    Enabled in vestara-ai-core: Yes
    Running: N/A (eager activation)
```

### 7.5 State Rules

```text
Installed ≠ Enabled ≠ Running

A module may be:
- Installed but not enabled in any workspace
- Enabled but not yet loaded (on-demand)
- Loaded but not actively running

An app may be:
- Installed but not started
- Started but not healthy
- Healthy but not serving requests
```

---

## 8. Relationships

### 8.1 Entity Relationships

```
MarketplaceReleaseCatalog 1──* WorkspaceModuleListing
MarketplaceReleaseCatalog 1──* PackageListing
MarketplaceReleaseCatalog 1──* AppListing

WorkspaceModuleListing 1──1 AssetKind
PackageListing 1──1 AssetKind
AppListing 1──1 AssetKind

WorkspaceModuleListing 1──* CatalogCategory
PackageListing 1──* CatalogCategory
AppListing 1──* CatalogCategory
```

---

## 9. Runtime Ownership

### 9.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| MarketplaceReleaseCatalog | MarketplaceRegistry | Catalog management |
| WorkspaceModuleListing | MarketplaceRegistry | Listing management |
| PackageListing | MarketplaceRegistry | Listing management |
| AppListing | MarketplaceRegistry | Listing management |

---

## 10. Events

### 10.1 Catalog Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ListingPublished | CatalogListing | Publication |
| ListingUpdated | CatalogListing, ChangeSet | Update |
| ListingRemoved | CatalogListing, Reason | Removal |
| FirstReleaseReady | MarketplaceReleaseCatalog | Release readiness |

---

## 11. Verification Requirements

### 11.1 Release Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Manifest Validation | All manifests valid |
| Dependency Resolution | All dependencies resolved |
| Installation Testing | All assets installable |
| Activation Testing | All activation models work |
| Rollback Testing | All rollbacks succeed |
| Permission Testing | All permissions enforceable |
| Signing Testing | All signatures verifiable |

---

## 12. Integration Points

### 12.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Marketplace Registry | Catalog management | Registry API |
| Extension Runtime | Installation | Runtime API |
| Workspace Runtime | Module activation | Module API |
| App Runtime | Process management | Process API |
| Security Service | Trust verification | Security API |

---

## 13. Open Questions

1. How should release versioning work?
2. How should release notes be managed?
3. How should release rollback work?
4. How should release analytics be tracked?
5. How should release feedback be collected?

---

*This document defines the canonical Marketplace Release Catalog for Vestara.*
*First-party asset inventory with three reference implementations.*
