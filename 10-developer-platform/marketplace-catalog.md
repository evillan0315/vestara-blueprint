---
id: "marketplace-catalog"
title: "Marketplace Catalog — Intent-Based Module Taxonomy"
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
tags: ["marketplace", "catalog", "taxonomy", "intent", "canonical"]
---

# Marketplace Catalog

## Intent-Based Module Taxonomy

> **A good Marketplace catalog groups installable modules by user intent, not by implementation type.**

---

## 1. Architectural Position

```
Marketplace
    ├── Catalog
    │   ├── Categories (user intent)
    │   ├── Listings (modules)
    │   ├── Filters (asset kind, trust, etc.)
    │   └── Search (full-text, faceted)
    ├── Discovery
    ├── Distribution
    └── Lifecycle
```

The catalog is the user-facing discovery interface. It groups modules by what users want to do, not how they are implemented.

---

## 2. Category Taxonomy

### 2.1 Development

```text
IDE
Code Editor
File Explorer
Terminal
Debugger
Git Client
Pull Request Review
Test Explorer
API Client
Database Studio
Container Manager
Kubernetes Console
Cloud Resource Explorer
Package Manager
Dependency Inspector
Performance Profiler
Security Scanner
Visual Testing Studio
Documentation Generator
```

### 2.2 Communication

```text
Messages
Gmail
Outlook
Slack
Microsoft Teams
Discord
Mattermost
Chat
Contacts
Calendar
Meetings
Notifications
Voice Calls
Video Conferencing
Team Announcements
```

### 2.3 Project Management

```text
Projects
Tasks
Kanban Board
Roadmaps
Milestones
Sprint Planning
Backlog
Time Tracking
Issue Tracker
Approval Center
Decision Log
Risk Register
Resource Planning
Release Planning
```

### 2.4 Builders

```text
Application Builder
API Builder
Database Builder
Workflow Builder
Agent Builder
Integration Builder
Infrastructure Builder
Plugin Builder
Mobile App Builder
Desktop App Builder
Website Builder
Microservice Builder
Automation Builder
Dashboard Builder
Form Builder
Report Builder
```

### 2.5 AI and Agents

```text
Agent Center
Agent Registry
Agent Builder
Agent Orchestration
Prompt Studio
Model Registry
Provider Manager
Routing Manager
Memory Explorer
Knowledge Graph
Context Inspector
Evaluation Studio
AI Safety Center
Agent Telemetry
Conversation Studio
Voice Assistant
```

### 2.6 Engineering Intelligence

```text
Engineering Graph
Engineering Timeline
Evidence Center
Verification Center
Artifact Center
Execution Center
Planning Workspace
Repository Intelligence
Dependency Graph
Impact Analysis
Architecture Explorer
Code Ownership
Technical Debt Explorer
Change Risk Analysis
Build Intelligence
```

### 2.7 Operations

```text
Operations Center
Runtime Monitor
Telemetry
Event Stream
Logs
Diagnostics
System Health
Service Manager
Process Manager
Network Monitor
Storage Monitor
Filesystem Activity
Incident Management
Alert Manager
Deployment Monitor
Backup and Recovery
```

### 2.8 Cloud and DevOps

```text
AWS Console
Azure Console
Google Cloud Console
Docker
Kubernetes
Terraform
Ansible
GitHub Actions
GitLab CI
Jenkins
Vercel
Netlify
Cloudflare
Nginx Manager
DNS Manager
Secrets Manager
Certificate Manager
```

### 2.9 Data

```text
Database Explorer
SQL Studio
PostgreSQL
MySQL
MongoDB
Redis
SQLite
Data Pipeline
ETL Builder
Data Catalog
Schema Registry
Data Quality
Query Analytics
Data Visualization
Spreadsheet
CSV Explorer
```

### 2.10 Business

```text
CRM
Customer Support
Sales Pipeline
Leads
Contracts
Invoices
Expenses
Billing
Subscriptions
Inventory
Orders
Procurement
HR
Recruitment
Payroll
Business Analytics
```

### 2.11 Productivity

```text
Documents
Notes
Whiteboard
Spreadsheet
Presentations
PDF Viewer
Forms
Clipboard Manager
Bookmark Manager
Personal Tasks
Focus Timer
Search
Command Center
File Transfer
Archive Manager
```

### 2.12 Knowledge

```text
Knowledge Base
Documentation Center
Wiki
Research Workspace
Reference Library
Semantic Search
RAG Explorer
Learning Center
Glossary
Decision Records
Architecture Records
Standards Library
```

### 2.13 Design

```text
UI Designer
Design System
Theme Studio
Icon Manager
Asset Library
Prototype Builder
Wireframing
Diagram Editor
Mermaid Studio
Image Editor
Brand Manager
Accessibility Inspector
```

### 2.14 Security

```text
Security Center
Vulnerability Scanner
Dependency Audit
Secret Scanner
Permission Manager
Access Control
Audit Log
Policy Center
Threat Modeling
Compliance Center
Certificate Manager
Identity Manager
Authentication Manager
```

### 2.15 Integrations

```text
GitHub
GitLab
Bitbucket
Jira
Linear
Trello
Asana
Notion
Google Drive
OneDrive
Dropbox
Box
Figma
Sentry
Datadog
Grafana
Prometheus
Stripe
Twilio
Zapier
```

---

## 3. Listing Classification

Every Marketplace listing has a practical classification:

```text
Module
Package
App
Connector
Builder
Theme
Agent
Provider
Verification Pack
Standards Pack
```

### 3.1 Classification Definitions

| Classification | Description |
|----------------|-------------|
| Module | Interactive Workspace experience |
| Package | Capability added to existing runtime |
| App | Standalone executable product |
| Connector | Integration with external service |
| Builder | Visual construction tool |
| Theme | Visual customization |
| Agent | AI agent configuration |
| Provider | AI model provider adapter |
| Verification Pack | Verification rules and strategies |
| Standards Pack | Coding standards and rules |

---

## 4. Filter Taxonomy

The Marketplace exposes filters for discovery:

```text
Development
Communication
Builders
AI
Operations
Cloud
Data
Business
Productivity
Knowledge
Design
Security
Integrations
```

### 4.1 Filter Dimensions

```text
Category (user intent)
    → Development
    → Communication
    → Project Management
    → Builders
    → AI and Agents
    → Engineering Intelligence
    → Operations
    → Cloud and DevOps
    → Data
    → Business
    → Productivity
    → Knowledge
    → Design
    → Security
    → Integrations

Asset Kind
    → Package
    → Workspace Module
    → App

Trust Level
    → First-party
    → Verified
    → Community

Status
    → Active
    → Deprecated
    → New

Platform
    → Linux
    → macOS
    → Windows

Publisher
    → Vestara
    → Verified Publishers
    → Community
```

---

## 5. Recommended First-Party Launch Set

For the initial Marketplace, keep the catalog focused:

```text
IDE
Messages
Calendar
Contacts
GitHub
GitLab
Jira
Linear
Application Builder
API Builder
Database Builder
Engineering Graph
Evidence Center
Verification Center
Operations Center
Runtime Monitor
Knowledge Base
Documents
Whiteboard
Marketplace Manager
```

### 5.1 Launch Set Rationale

| Category | Launch Modules | Rationale |
|----------|---------------|-----------|
| Development | IDE | Core development experience |
| Communication | Messages, Calendar, Contacts | Essential communication |
| Integrations | GitHub, GitLab, Jira, Linear | Most-requested integrations |
| Builders | Application Builder, API Builder, Database Builder | Core builder capabilities |
| Engineering | Engineering Graph, Evidence Center, Verification Center | Engineering intelligence |
| Operations | Operations Center, Runtime Monitor | System visibility |
| Knowledge | Knowledge Base, Documents, Whiteboard | Knowledge management |
| Platform | Marketplace Manager | Self-management |

---

## 6. Relationships

### 6.1 Entity Relationships

```
MarketplaceCatalog 1──* CatalogCategory
CatalogCategory 1──* CatalogListing
CatalogListing 1──1 AssetKind
CatalogListing 1──1 TrustLevel
CatalogListing 1──* CatalogFilter
```

### 6.2 Dependency Graph

```
Marketplace
    ├── organizes: MarketplaceCatalog
    ├── exposes: CatalogCategory[]
    ├── displays: CatalogListing[]
    └── filters: CatalogFilter[]

CatalogCategory
    ├── groups: CatalogListing[]
    └── describedBy: UserIntent

CatalogListing
    ├── classifiedAs: AssetKind
    ├── trustedBy: TrustLevel
    └── filterableBy: CatalogFilter[]
```

---

## 7. Runtime Ownership

### 7.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| MarketplaceCatalog | MarketplaceRegistry | Catalog management |
| CatalogCategory | MarketplaceRegistry | Category management |
| CatalogListing | MarketplaceRegistry | Listing management |
| CatalogFilter | MarketplaceRegistry | Filter management |

### 7.2 Ownership Rules

1. **Single Owner**: Each entity has exactly one runtime owner
2. **Intent-Based Grouping**: Categories are based on user intent
3. **Classification Transparency**: Implementation type is visible but secondary
4. **Filter Composability**: Filters can be combined
5. **Search Integration**: Full-text search across all listings

---

## 8. Events

### 8.1 Catalog Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ListingPublished | CatalogListing | Publication |
| ListingUpdated | CatalogListing, ChangeSet | Update |
| ListingRemoved | CatalogListing, Reason | Removal |
| CategoryCreated | CatalogCategory | Creation |
| CategoryUpdated | CatalogCategory, ChangeSet | Update |
| CategoryRemoved | CatalogCategory, Reason | Removal |

---

## 9. Verification Requirements

### 9.1 Catalog Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Listing Validation | Listing conforms to schema |
| Category Validation | Category follows taxonomy |
| Classification Validation | Classification is valid |
| Filter Validation | Filters are composable |
| Search Validation | Search is functional |

---

## 10. Integration Points

### 10.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Marketplace Registry | Catalog management | Registry API |
| Search Service | Full-text search | Search API |
| Analytics Service | Usage analytics | Analytics API |
| Recommendation Service | Personalized recommendations | Recommendation API |
| Notification Service | Update notifications | Notification API |

---

## 11. Asset State Model

The Marketplace UI distinguishes three concepts:

### 11.1 Installed

```text
Asset bytes and version exist locally
Location: ~/.vestara/extensions/
```

### 11.2 Enabled

```text
Asset is active in this workspace
Location: <workspace>/.vestara/extensions.lock
```

### 11.3 Running

```text
App or runtime process is currently executing
Location: Process table
```

### 11.4 State Examples

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

### 11.5 State Rules

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

## 12. Open Questions

1. How should category evolution be managed?
2. How should cross-category modules be handled?
3. How should personalized recommendations work?
4. How should catalog analytics be used?
5. How should community contributions to taxonomy be managed?

---

*This document defines the canonical Marketplace Catalog for Vestara.*
*Intent-based grouping, not implementation type.*
