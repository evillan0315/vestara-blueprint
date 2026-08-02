---
id: "marketplace-catalog"
title: "Marketplace Catalog — Intent-Based Discovery System"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "2.0.0"
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
supersedes: ["marketplace-catalog-v1"]
tags: ["marketplace", "catalog", "taxonomy", "intent", "discovery", "canonical"]
---

# Marketplace Catalog

## Intent-Based Discovery System

> **Discover by intent, understand by implementation.**

Users rarely think "I need a Workspace Module." They think:
- "I need GitHub."
- "I need an IDE."
- "I need Messages."
- "I need Kubernetes."
- "I need PostgreSQL."

The asset kind becomes relevant only when Vestara decides how to install and activate it.

---

## 1. Architectural Position

```
Marketplace
    ├── Discovery Layer
    │   ├── Capability Layer (what you want to accomplish)
    │   ├── Categories (domain grouping)
    │   ├── Solution Bundles (curated sets)
    │   ├── Featured Collections (discovery mechanisms)
    │   └── Badges (quick understanding)
    ├── Catalog
    │   ├── Listings (modules)
    │   ├── Compatibility Matrix
    │   ├── Capability Matrix
    │   └── Engineering Readiness
    ├── Analytics
    │   ├── Usage Metrics
    │   ├── Quality Metrics
    │   └── Publisher Reputation
    ├── Distribution
    └── Lifecycle
```

---

## 2. Capability Layer

Instead of only categories, allow users to browse by what they want to accomplish:

### 2.1 Capability Capabilities

```text
I want to...

Build Applications
Build APIs
Build Databases
Review Code
Debug
Deploy
Monitor
Communicate
Manage Projects
Generate Documentation
Design UI
Test Applications
Manage Infrastructure
Train Agents
Analyze Repositories
```

### 2.2 Capability to Module Mapping

#### Build Applications

```text
→ Application Builder
→ IDE
→ GitHub
→ Verification Center
→ Evidence Center
```

#### Build APIs

```text
→ API Builder
→ API Client
→ PostgreSQL
→ Verification Center
→ Documentation Generator
```

#### Build Databases

```text
→ Database Builder
→ Database Studio
→ PostgreSQL
→ MySQL
→ MongoDB
```

#### Review Code

```text
→ IDE
→ Git Explorer
→ Pull Request Review
→ Security Scanner
→ Code Ownership
```

#### Debug

```text
→ IDE
→ Debugger
→ Log Explorer
→ Diagnostics
→ Runtime Monitor
```

#### Deploy

```text
→ Deployment Monitor
→ Docker
→ Kubernetes
→ GitHub Actions
→ GitLab CI
```

#### Monitor

```text
→ Operations Center
→ Runtime Monitor
→ Telemetry Explorer
→ Event Stream
→ Alert Manager
```

#### Communicate

```text
→ Messages
→ Calendar
→ Contacts
→ Slack
→ Microsoft Teams
```

#### Manage Projects

```text
→ Projects
→ Tasks
→ Kanban Board
→ Roadmaps
→ Sprint Planning
```

#### Generate Documentation

```text
→ Documentation Generator
→ Knowledge Base
→ Wiki
→ API Documentation
→ Architecture Records
```

#### Design UI

```text
→ UI Designer
→ Design System
→ Theme Studio
→ Wireframing
→ Prototype Builder
```

#### Test Applications

```text
→ Test Explorer
→ Playwright Verification
→ Visual Testing Studio
→ API Contract Verification
→ Accessibility Verification
```

#### Manage Infrastructure

```text
→ Infrastructure Builder
→ Container Manager
→ Kubernetes Console
→ Terraform
→ Ansible
```

#### Train Agents

```text
→ Agent Center
→ Prompt Studio
→ Model Registry
→ Evaluation Studio
→ Memory Explorer
```

#### Analyze Repositories

```text
→ Repository Intelligence
→ Dependency Graph
→ Impact Analysis
→ Technical Debt Explorer
→ Code Ownership
```

---

## 3. Solution Bundles

Instead of installing one extension at a time, offer curated solution bundles:

### 3.1 Node.js Development

```text
Node.js Development

contains

✓ IDE
✓ GitHub
✓ Terminal
✓ TypeScript Standards
✓ Playwright Verification
✓ Documentation Generator
```

### 3.2 Fullstack React

```text
Fullstack React

contains

✓ IDE
✓ Application Builder
✓ API Builder
✓ PostgreSQL
✓ Docker
✓ GitHub
✓ Playwright
✓ Engineering Graph
```

### 3.3 AI Engineering

```text
AI Engineering

contains

✓ Agent Center
✓ Prompt Studio
✓ Model Registry
✓ Ollama Provider
✓ Evaluation Studio
✓ Memory Explorer
```

### 3.4 DevOps Pipeline

```text
DevOps Pipeline

contains

✓ Docker
✓ Kubernetes
✓ GitHub Actions
✓ GitLab CI
✓ Terraform
✓ Deployment Monitor
✓ Operations Center
```

### 3.5 Enterprise Security

```text
Enterprise Security

contains

✓ Security Scanner
✓ Vulnerability Scanner
✓ Dependency Audit
✓ Secret Scanner
✓ Permission Manager
✓ Audit Log
✓ Compliance Center
```

### 3.6 Data Engineering

```text
Data Engineering

contains

✓ Database Builder
✓ PostgreSQL
✓ MongoDB
✓ Redis
✓ Data Pipeline
✓ ETL Builder
✓ Data Catalog
```

### 3.7 Bundle Installation

```text
Bundle Manifest
    ↓
Dependency Resolution
    ↓
Single Transaction Install
    ↓
Bulk Enable in Workspace
    ↓
Emit Bundle Events
```

---

## 4. Featured Collections

Discovery mechanisms beyond categories:

### 4.1 Collection Types

```text
Featured
Trending
Recently Updated
Verified
Enterprise Ready
Made by Vestara
Community Picks
Starter Kits
New Releases
```

### 4.2 Collection Definitions

#### Featured

```text
Curated by Vestara team
High quality, well-integrated
Regularly updated
```

#### Trending

```text
Most installs this week
Most active development
Growing community
```

#### Recently Updated

```text
Updated in last 30 days
Active maintenance
Bug fixes and features
```

#### Verified

```text
Publisher verified
Signature valid
Security scanned
```

#### Enterprise Ready

```text
Enterprise support
SLA guarantees
Compliance features
```

#### Made by Vestara

```text
First-party modules
Highest integration
Guaranteed compatibility
```

#### Community Picks

```text
Highly rated by users
Active community
Good documentation
```

#### Starter Kits

```text
Pre-configured bundles
Quick start guides
Best practices included
```

#### New Releases

```text
Published in last 7 days
New features
Fresh capabilities
```

---

## 5. Marketplace Badges

Every listing exposes badges for quick understanding:

### 5.1 Trust Badges

```text
Verified Publisher
Open Source
Official
Enterprise
```

### 5.2 Capability Badges

```text
Offline Ready
Supports Local Models
Session Aware
Builder Compatible
```

### 5.3 Requirement Badges

```text
Requires Docker
Requires GPU
Requires Network
```

### 5.4 Asset Kind Badges

```text
Workspace Module
App
Package
Connector
Builder
Theme
Agent
Provider
```

### 5.5 Badge Rendering

```text
┌─────────────────────────────────────┐
│ GitHub                              │
│                                     │
│ [Verified] [Official] [Open Source] │
│                                     │
│ Connect to GitHub repositories,     │
│ pull requests, and issues.          │
│                                     │
│ [Workspace Module]                  │
└─────────────────────────────────────┘
```

---

## 6. Compatibility Matrix

Expose compatibility directly:

### 6.1 Platform Compatibility

```text
Workspace SDK
    1.0

Builder Runtime
    1.x

Agent Runtime
    2.x

Linux
Windows
macOS

Vestara Desktop
Vestara Server
```

### 6.2 Compatibility Display

```text
┌─────────────────────────────────────┐
│ Compatibility                       │
│                                     │
│ ✓ Workspace SDK 1.0                 │
│ ✓ Builder Runtime 1.x               │
│ ✓ Linux, macOS, Windows             │
│ ✓ Vestara Desktop                   │
│ ✗ Vestara Server (not supported)    │
└─────────────────────────────────────┘
```

### 6.3 Compatibility Rules

```text
Compatible
    → All requirements met

Partially Compatible
    → Some features unavailable

Incompatible
    → Cannot install

Unknown
    → Not yet tested
```

---

## 7. Builder Compatibility

Since builders are canonical, every listing can declare builder compatibility:

### 7.1 Builder Compatibility Declaration

```text
Works with

Application Builder
API Builder
Database Builder
Workflow Builder
Infrastructure Builder
Integration Builder
Agent Builder
Plugin Builder
```

### 7.2 Builder Compatibility Display

```text
┌─────────────────────────────────────┐
│ Builder Compatibility               │
│                                     │
│ ✓ Application Builder               │
│ ✓ API Builder                       │
│ ✓ Database Builder                  │
│ ✗ Workflow Builder (not supported)  │
└─────────────────────────────────────┘
```

### 7.3 Builder Compatibility Benefits

```text
For Users
    → Know which builders work together
    → Understand integration points
    → Make informed decisions

For Publishers
    → Declare integration capabilities
    → Target specific builders
    → Build compatible extensions
```

---

## 8. Capability Matrix

Instead of only permissions, show what the extension contributes:

### 8.1 Capability Contributions

```text
Provides

Search
Commands
Inspector
Navigation
Verification
Telemetry
Timeline
Artifacts
```

### 8.2 Capability Display

```text
┌─────────────────────────────────────┐
│ Capabilities                        │
│                                     │
│ ✓ Search (repositories)             │
│ ✓ Commands (open, clone, create)    │
│ ✓ Inspector (repository details)    │
│ ✓ Navigation (sidebar)              │
│ ✓ Verification (PR checks)          │
│ ✗ Telemetry (not provided)          │
│ ✗ Timeline (not provided)           │
│ ✓ Artifacts (PR reviews)            │
└─────────────────────────────────────┘
```

### 8.3 Capability Categories

```text
User Interface
    → Navigation
    → Commands
    → Search
    → Inspector
    → Toolbar
    → Sidebar
    → Status

Engineering
    → Verification
    → Evidence
    → Artifacts
    → Timeline
    → Graph

System
    → Telemetry
    → Logging
    → Notifications
    → Background Tasks
```

---

## 9. Marketplace Analytics

### 9.1 Usage Metrics

```text
Downloads
Active Installs
Verified Installations
```

### 9.2 Quality Metrics

```text
Crash Rate
Memory Usage
CPU Usage
Average Startup
```

### 9.3 Maintenance Metrics

```text
Latest Update
Publisher Reputation
Response Time
Issue Resolution
```

### 9.4 Analytics Display

```text
┌─────────────────────────────────────┐
│ Analytics                           │
│                                     │
│ Downloads: 15,000                   │
│ Active Installs: 8,500              │
│ Crash Rate: 0.1%                    │
│ Memory Usage: 12 MB avg             │
│ CPU Usage: 2% avg                   │
│ Average Startup: 250ms              │
│ Latest Update: 2 days ago           │
│ Publisher Reputation: 4.8/5.0       │
└─────────────────────────────────────┘
```

---

## 10. Engineering Readiness

Since Vestara is engineering-centric, expose integration quality:

### 10.1 Engineering Metrics

```text
Verification Coverage
Evidence Support
Engineering Graph Integration
Session Aware
Agent Compatible
Builder Compatible
Offline Support
```

### 10.2 Engineering Display

```text
┌─────────────────────────────────────┐
│ Engineering Readiness               │
│                                     │
│ ✓ Verification Coverage: 85%        │
│ ✓ Evidence Support: Full            │
│ ✓ Engineering Graph: Integrated     │
│ ✓ Session Aware: Yes                │
│ ✓ Agent Compatible: Yes             │
│ ✓ Builder Compatible: Yes           │
│ ✓ Offline Support: Full             │
└─────────────────────────────────────┘
```

### 10.3 Engineering Benefits

```text
Unique to Vestara
    → Not just functional
    → Platform integration quality
    → Engineering workflow support

For Users
    → Understand integration depth
    → Make informed decisions
    → Know what to expect

For Publishers
    → Declare integration quality
    → Target engineering workflows
    → Build better extensions
```

---

## 11. Marketplace as an Engineering Graph

Model the Marketplace itself as a graph:

### 11.1 Graph Relationships

```text
Application Builder
        │
        ├── depends on Builder Runtime
        ├── recommends IDE
        ├── compatible with GitHub
        ├── produces Application Specification
        ├── verified by Verification Center
        └── visualized by Engineering Graph
```

### 11.2 Graph Queries

```text
What should I install next?
    → Analyze dependencies and recommendations

What depends on this module?
    → Reverse dependency lookup

If I uninstall this package, what breaks?
    → Impact analysis

What modules work together?
    → Compatibility analysis

What starter kits include this?
    → Bundle membership lookup
```

### 11.3 Graph Visualization

```text
┌─────────────────────────────────────┐
│ Dependency Graph                    │
│                                     │
│        ┌─────────┐                  │
│        │ IDE     │                  │
│        └────┬────┘                  │
│             │                       │
│    ┌────────┼────────┐              │
│    │        │        │              │
│ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐            │
│ │GitHub│ │Build│ │Test │            │
│ └─────┘ └─────┘ └─────┘            │
│                                     │
│ [Expand] [Collapse] [Filter]        │
└─────────────────────────────────────┘
```

### 11.4 Graph Benefits

```text
Discovery
    → "What should I install next?"

Impact Analysis
    → "If I uninstall this, what breaks?"

Compatibility
    → "What modules work together?"

Bundles
    → "What starter kits include this?"

Visualization
    → See relationships visually
```

---

## 12. Category Taxonomy

### 12.1 Development

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

### 12.2 Communication

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

### 12.3 Project Management

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

### 12.4 Builders

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

### 12.5 AI and Agents

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

### 12.6 Engineering Intelligence

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

### 12.7 Operations

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

### 12.8 Cloud and DevOps

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

### 12.9 Data

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

### 12.10 Business

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

### 12.11 Productivity

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

### 12.12 Knowledge

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

### 12.13 Design

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

### 12.14 Security

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

### 12.15 Integrations

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

## 13. Asset State Model

### 13.1 Installed

```text
Asset bytes and version exist locally
Location: ~/.vestara/extensions/
```

### 13.2 Enabled

```text
Asset is active in this workspace
Location: <workspace>/.vestara/extensions.lock
```

### 13.3 Running

```text
App or runtime process is currently executing
Location: Process table
```

### 13.4 State Examples

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

### 13.5 State Rules

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

## 14. Filter Taxonomy

### 14.1 Filter Dimensions

```text
Capability (what you want to accomplish)
Category (domain grouping)
Asset Kind (package, workspace-module, app)
Trust Level (first-party, verified, community)
Status (active, deprecated, new)
Platform (linux, macOS, windows)
Publisher (Vestara, verified publishers, community)
Builder Compatibility (which builders work)
Engineering Readiness (integration quality)
```

---

## 15. Relationships

### 15.1 Entity Relationships

```
MarketplaceCatalog 1──* CapabilityLayer
CapabilityLayer 1──* CatalogCategory
CatalogCategory 1──* CatalogListing
CatalogListing 1──1 AssetKind
CatalogListing 1──* CatalogFilter
CatalogListing 1──* MarketplaceBadge
CatalogListing 1──1 CompatibilityMatrix
CatalogListing 1──1 CapabilityMatrix
CatalogListing 1──1 EngineeringReadiness

SolutionBundle 1──* CatalogListing
FeaturedCollection 1──* CatalogListing

MarketplaceGraph 1──* GraphNode
GraphNode 1──* GraphEdge
```

---

## 16. Runtime Ownership

### 16.1 Ownership Map

| Entity | Runtime Owner | Responsibility |
|--------|---------------|----------------|
| MarketplaceCatalog | MarketplaceRegistry | Catalog management |
| CapabilityLayer | MarketplaceRegistry | Capability mapping |
| CatalogCategory | MarketplaceRegistry | Category management |
| CatalogListing | MarketplaceRegistry | Listing management |
| SolutionBundle | MarketplaceRegistry | Bundle management |
| FeaturedCollection | MarketplaceRegistry | Collection management |
| MarketplaceGraph | MarketplaceRegistry | Graph management |

---

## 17. Events

### 17.1 Catalog Events

| Event | Payload | Trigger |
|-------|---------|---------|
| ListingPublished | CatalogListing | Publication |
| ListingUpdated | CatalogListing, ChangeSet | Update |
| ListingRemoved | CatalogListing, Reason | Removal |
| BundleCreated | SolutionBundle | Creation |
| BundleInstalled | SolutionBundle, InstallationRecord | Installation |
| CapabilityMapped | CapabilityLayer, CatalogListing[] | Mapping |
| GraphUpdated | MarketplaceGraph, ChangeSet | Graph update |

---

## 18. Verification Requirements

### 18.1 Catalog Verification

| Verification Type | Requirements |
|-------------------|--------------|
| Listing Validation | Listing conforms to schema |
| Capability Mapping | Capabilities map to listings |
| Bundle Validation | Bundle dependencies resolvable |
| Compatibility Matrix | Compatibility is accurate |
| Capability Matrix | Capabilities are accurate |
| Engineering Readiness | Metrics are accurate |

---

## 19. Integration Points

### 19.1 Platform Integrations

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Marketplace Registry | Catalog management | Registry API |
| Search Service | Full-text search | Search API |
| Analytics Service | Usage analytics | Analytics API |
| Recommendation Service | Personalized recommendations | Recommendation API |
| Notification Service | Update notifications | Notification API |
| Engineering Graph | Relationship tracking | Graph API |

---

## 20. Open Questions

1. How should capability mappings evolve?
2. How should bundle curation work?
3. How should graph queries be optimized?
4. How should analytics be privacy-preserving?
5. How should engineering readiness be measured?

---

*This document defines the canonical Marketplace Catalog for Vestara.*
*Discover by intent, understand by implementation.*
