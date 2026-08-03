---
id: "developer-platform-marketplace-creator-ecosystem"
title: "Marketplace Creator Ecosystem"
volume: "10-developer-platform"
book: "Book 2: Platform Architecture"
version: "1.0.0"
status: "approved"
owner: "@chief-architect"
created: "2026-08-04"
last-reviewed: "2026-08-04"
next-review: "2026-11-04"
architecture-status: "accepted"
implementation-status: "proposed"
verification-status: "not-verified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "future"
tags: ["marketplace", "publishers", "commerce", "offline", "self-hosting", "creator-economy", "industry-solutions"]
---

# Marketplace Creator Ecosystem

## Purpose

Define the Vestara Marketplace as the primary post-onboarding experience, the operating center for assembling a personal or organizational Vestara platform, and a controlled distribution economy where individuals and organizations can publish free or paid products.

The Marketplace is broader than an extension store. It manages the lifecycle of applications, services, microservices, workspace modules, AI capabilities, industry solutions, infrastructure providers, learning products, operating-system integrations, and complete solution bundles.

## Product principle

> Official Vestara-built products are free to install and operate when users self-host their models, databases, storage, and infrastructure. Premium services sell managed operation, assurance, collaboration, distribution, certification, and support—not artificial restrictions on the self-hosted foundation.

This includes official capabilities such as:

- IDE and TUI;
- Workspace UI;
- FileSystem Explorer;
- AI Stack and local-model integration;
- agents and workflows;
- verification and evidence;
- engineering graph and event infrastructure;
- local SQLite and self-hosted database providers;
- official workspace templates and domain foundations.

A user running Ollama or another local provider should not pay Vestara merely to invoke their own compute.

## Marketplace-first experience

After onboarding, the Marketplace is the default operating center.

```text
Onboarding
    ↓
Marketplace Operating Center
    ├── Continue existing workspace
    ├── Install a complete solution
    ├── Assemble a custom platform
    ├── Configure installed products
    ├── Review updates and health
    ├── Discover learning and industry products
    └── Publish a product
```

The first question is not "Which extension do you want?" It is:

> What do you want to build, learn, operate, or improve?

## Audiences and domains

The Marketplace must serve technical and non-technical users.

```text
Engineering
Education
Business
Personal Learning
Research
Creative Work
Healthcare
Hospitality
Agriculture
Manufacturing
Government
Finance
Organization-Private Solutions
```

Examples:

- an engineer installs an IDE, AI Stack, terminal, verification pipeline, and agent team;
- a learner installs a personal AI tutor, mathematics curriculum, language practice, and knowledge workspace;
- a school installs Vestara LMS, teacher tools, student workspaces, assessments, attendance, and AI tutors;
- a retail business installs POS, inventory, purchasing, analytics, customer management, and a business assistant;
- a consultant publishes a reusable solution originally built for one client;
- an individual discovers that a personal application has commercial value and publishes it.

## Product model

Marketplace products may be:

- free and open source;
- free with paid support;
- one-time purchases;
- subscriptions;
- usage-based services;
- organization-licensed products;
- private organization packages;
- certified solution bundles;
- managed cloud services.

A product may contain one or more unified Marketplace assets defined by ADR-124:

```text
Solution Product
├── Packages
├── Workspace Modules
├── Apps
├── Services or Microservices
├── Workspaces or Templates
├── AI Agents and Tools
├── Database or Storage Providers
├── Verification Profiles
└── Documentation and Onboarding
```

## Provenance and catalog sections

The user interface must make product origin visible.

```text
Official Vestara
Certified Partners
Verified Publishers
Community Publishers
Organization-Private
Local / Unverified Imports
```

A listing must show:

- publisher identity;
- ownership and license;
- price and offline-use terms;
- signature and integrity status;
- requested capabilities;
- supported platforms and Vestara versions;
- verification evidence;
- security review state;
- maintenance and support policy;
- release history;
- data retention and uninstall behavior.

## Offline and online behavior

### Offline catalog

Offline users see:

- bundled official Vestara products;
- installed official products;
- locally cached official catalog metadata;
- organization packages provisioned for offline use;
- locally imported packages in a clearly separated, unverified section.

Offline mode must remain useful for portable SSDs, air-gapped environments, recovery systems, schools with limited connectivity, and low-resource personal installations.

The interface must state when remote catalog, prices, reviews, entitlement refresh, or updates are unavailable.

### Online catalog

Online users additionally see:

- third-party free and paid products;
- verified and certified publishers;
- organization-private catalogs;
- cloud services and managed infrastructure;
- ratings, support channels, update streams, and publisher profiles;
- purchasing, subscriptions, entitlements, and payout-backed listings.

## Publisher model

Publisher is a first-class entity.

```text
Publisher
├── Individual
├── Organization
├── School or Research Institution
├── Certified Partner
└── Vestara
```

A publisher owns products and releases, not user installations or user-created data.

Suggested publisher progression:

```text
Community Publisher
    ↓ identity verified
Verified Publisher
    ↓ quality and operational review
Certified Publisher
    ↓ contractual and support requirements
Trusted / Enterprise Publisher
```

Publisher level must not replace per-release verification. A trusted publisher can still ship a defective release.

## Creator journey

```text
Build privately in Vestara
    ↓
Recognize reusable value
    ↓
Package product
    ↓
Declare license, price, capabilities, and support
    ↓
Run local publishing checks
    ↓
Submit release and evidence
    ↓
Automated security and policy pipeline
    ↓
Human review where required
    ↓
Publish
    ↓
Manage updates, support, analytics, and revenue
```

Vestara minions may generate manifests, tests, documentation, migrations, screenshots, onboarding, and release notes, but they cannot certify their own work without independent verification.

## Controlled generation and certification

The Marketplace is the control plane for AI-generated software.

Every publishable release must pass applicable checks:

```text
Manifest and schema validation
Dependency and compatibility resolution
Capability and permission review
Secret and personal-data scanning
Malware and vulnerability scanning
License and intellectual-property declarations
Database migration validation
Design-system compliance
Accessibility validation
API and contract testing
UI and visual verification
Install / configure / enable / disable testing
Update / rollback testing
Uninstall / purge testing
Evidence bundle generation
```

Release maturity labels:

```text
Generated
Built but not independently verified

Verified
Core claims are supported by reproducible evidence

Certified
Meets Vestara security, lifecycle, design, and quality requirements

Production-ready
Adds operational, migration, backup, recovery, support, and performance assurance
```

## Trust and ranking

Trust must not be reduced to stars or download counts.

Marketplace discovery should keep these signals separate:

- relevance to the user's goal;
- compatibility with the current platform;
- trust and provenance;
- verification quality;
- maintenance health;
- user reviews;
- popularity;
- sponsored placement.

Sponsored products must be visibly labeled and must not receive higher trust or certification scores because they paid for placement.

## Commerce and entitlement

First-class commercial entities:

```text
Product
Release
Listing
Price Plan
License
Purchase
Subscription
Entitlement
Refund
Payout
Tax Record
Support Policy
```

Entitlements must be signed and cacheable for declared offline periods. Paid listings must disclose:

- whether the application runs offline;
- entitlement refresh requirements;
- what happens when a subscription expires;
- whether existing data remains accessible;
- which cloud services incur separate usage costs;
- refund and support terms.

License expiration or revocation must never silently delete user data or workspaces.

## Vestara premium services

Premium services may include:

- managed Vestara hosting;
- managed models and inference;
- managed databases and object storage;
- synchronization and backups;
- enterprise identity and policy;
- organization-private registries;
- publisher verification and certification;
- payment processing and payouts;
- managed deployment and updates;
- compliance reporting;
- priority support and service-level commitments;
- advanced collaboration and governance.

The premium business model should make self-hosting optional, not intentionally painful.

## Required platform services

```text
Marketplace Catalog Service
Publisher Service
Publishing Pipeline
Trust and Signature Service
Policy and Moderation Service
Commerce and Billing Service
Entitlement Service
Payout Service
Tax and Regional Policy Service
Review and Reputation Service
Support and Dispute Service
Offline Catalog Service
Organization Registry Service
Release Verification Service
```

These services may be implemented as modular services or microservices, but they share canonical domain contracts and evidence requirements.

## Security boundaries

Third-party products must execute according to asset type, trust level, and capability risk. Marketplace approval does not imply unrestricted access.

```text
Package request
    ↓
Declared capability
    ↓
Policy and compatibility evaluation
    ↓
User or organization approval
    ↓
Sandbox / process / container boundary
    ↓
Observed execution
    ↓
Evidence and audit record
```

Sensitive categories may require manual review, verified publisher identity, stronger isolation, or may be prohibited entirely.

## Data ownership

- Publishers own their product intellectual property according to the declared license.
- Users and organizations own their operational data.
- Vestara does not gain ownership merely by hosting, verifying, or distributing a product.
- Products must declare collected data, storage locations, retention, export, deletion, and telemetry behavior.
- Uninstall preserves user data by default unless the user explicitly chooses purge.

## Success criteria

The Marketplace succeeds when:

1. A fully offline user can operate a useful official Vestara platform.
2. A self-hosted user can use official Vestara products and local AI without license fees.
3. A non-technical user can select an outcome rather than infrastructure components.
4. An individual can turn a useful Vestara-built application into a free or paid listing.
5. Third-party products are clearly separated by provenance and assurance level.
6. Paid products can operate under understandable online and offline license terms.
7. Generated products cannot publish without evidence and policy checks.
8. Publisher revenue does not weaken user ownership, uninstall safety, or platform trust.
9. Schools, businesses, individuals, and organizations can compose domain solutions through the same platform lifecycle.

## Related decisions

- `../00-governance/adr/ADR-112-extension-platform-and-local-package-manager.md`
- `../00-governance/adr/ADR-115-marketplace-foundation-and-workspace-experience.md`
- `../00-governance/adr/ADR-124-unified-marketplace-asset-model.md`
- `../00-governance/adr/ADR-125-marketplace-creator-economy-and-offline-catalog.md`

## Related specifications

- `extension-platform.md`
- `marketplace-asset-model.md`
- `publishing.md`
- `trust-and-signing.md`
- `install-lifecycle.md`
