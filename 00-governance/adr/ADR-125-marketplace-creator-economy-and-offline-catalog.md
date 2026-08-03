---
id: "adr-125"
adr: "ADR-125"
title: "Marketplace Creator Economy, Official-Free Distribution, and Offline Catalog"
category: "architecture"
version: 1.0
date: "2026-08-04"
status: "accepted"
author: "@chief-architect"
deciders: ["@chief-architect"]
consulted: ["@platform-engineer", "@security-engineer", "@product-lead", "@marketplace-operator"]
informed: ["@team"]
tags: ["marketplace", "publishers", "commerce", "offline", "self-hosting", "ecosystem", "trust"]
depends_on: ["adr-112", "adr-115", "adr-124"]
referenced_by:
  - type: "blueprint"
    target: "10-developer-platform/marketplace-creator-ecosystem.md"
  - type: "blueprint"
    target: "10-developer-platform/extension-platform.md"
---

## Context

Vestara is evolving from an engineering-only platform into a composable AI platform for individuals, schools, businesses, organizations, and domain-specific solutions. The Marketplace is intended to be the first major experience after onboarding and the primary surface for discovering, installing, configuring, operating, and removing Vestara capabilities.

The platform must support two goals simultaneously:

1. Official Vestara products remain available without license fees when users self-host their runtime, models, databases, and infrastructure.
2. Individuals and organizations can publish free or paid products, including applications they originally built for themselves and later discover are valuable to others.

The Marketplace must also remain useful when completely offline. Offline users cannot depend on remote publisher identity, payments, ratings, or catalog services, but they still require a safe and complete official Vestara experience.

## Decision

Vestara SHALL implement a mixed official, partner, and community Marketplace with explicit provenance, trust, licensing, and connectivity modes.

### Official Vestara distribution

- Official Vestara-built products SHALL be free to install and operate when self-hosted.
- Local AI providers, including Ollama-compatible and other user-operated models, SHALL not require a Vestara usage license.
- Official products MAY integrate with optional paid managed services such as hosting, synchronization, backups, enterprise identity, support, publishing, certification, and managed infrastructure.
- Premium value SHALL primarily come from managed operation, assurance, distribution, collaboration, governance, and support rather than disabling core self-hosted product capability.

### Third-party publishing

- Individuals, schools, consultants, businesses, and organizations MAY publish free or paid Marketplace products.
- A publisher MAY convert a private Vestara-built solution into a distributable Marketplace asset after passing packaging, security, policy, verification, and evidence requirements.
- Publisher, product, release, listing, license, entitlement, payout, support, and verification records SHALL be first-class Marketplace entities.
- Vestara SHALL mediate distribution and commerce without claiming ownership of publisher intellectual property.

### Connectivity modes

- **Offline mode:** only bundled or locally available official Vestara products are shown by default. Locally imported packages MAY be displayed separately with explicit unverified provenance.
- **Online mode:** the catalog expands to official Vestara, verified partners, certified publishers, community publishers, organization-private products, and locally imported products.
- The UI SHALL clearly indicate when catalog results are incomplete because the system is offline.

### Trust levels

Marketplace listings SHALL visibly distinguish at least:

1. Official Vestara
2. Certified Partner
3. Verified Publisher
4. Community Publisher
5. Local or Unverified Import

Trust SHALL be based on provenance, signatures, verification evidence, security review, publisher identity, maintenance status, and policy compliance—not download count alone.

### Commercial model

- Third-party products MAY be free, one-time purchase, subscription, usage-based, organization-licensed, or commercially supported.
- Vestara MAY collect platform, payment-processing, certification, hosting, or managed-service fees.
- Installation rights SHALL be represented by signed entitlements that can be cached for defined offline use.
- Paid products SHALL declare offline-license behavior before purchase.
- Revocation SHALL not silently delete user data or installed workspaces; it SHALL affect future activation, updates, or service access according to the license contract.

### Governance and controlled generation

AI-generated products SHALL not bypass Marketplace controls. The publishing pipeline SHALL require:

- manifest and dependency validation;
- capability and permission review;
- malware and vulnerability scanning;
- secret and personal-data scanning;
- license and intellectual-property declarations;
- design-system and accessibility validation for UI products;
- install, update, rollback, disable, uninstall, and purge verification;
- behavioral tests and evidence bundles;
- publisher identity and payout validation for paid listings.

Marketplace releases SHALL expose maturity labels such as generated, verified, certified, and production-ready. These labels describe evidence and operational assurance, not marketing preference.

## Consequences

### Positive

- Self-hosted users retain a complete free Vestara foundation.
- Creators can turn useful personal or client-built solutions into sustainable products.
- Schools, businesses, and domain specialists can participate without becoming infrastructure experts.
- Offline installations remain useful, predictable, and secure.
- Marketplace provenance and verification become a stronger trust signal than popularity alone.
- Vestara can fund development through managed services, certification, commerce, and enterprise operations while preserving broad access.

### Negative

- Commerce introduces taxation, refunds, fraud, chargebacks, licensing, regional restrictions, payouts, and support obligations.
- Certification and review can become a publishing bottleneck.
- Offline entitlements and revocation require careful policy and cryptographic design.
- Third-party products create support, compatibility, quality, and reputation risks for Vestara.

### Risks

- Low-quality generated products could overwhelm discovery. Mitigation: evidence-backed maturity labels, ranking controls, review queues, publisher reputation, and category curation.
- Malicious publishers could abuse permissions. Mitigation: sandboxing, capability mediation, signatures, scanning, human review for sensitive capabilities, and rapid revocation.
- Premium services could drift into artificial product restrictions. Mitigation: preserve the official self-hosted-free principle in product and governance policy.
- Revenue incentives could distort ranking. Mitigation: separate sponsored placement from trust and quality ranking, with explicit disclosure.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| Official products only | Prevents ecosystem growth and creator opportunity. |
| Fully open, unreviewed publishing | Unacceptable security, quality, and trust risk. |
| Paid core platform features for self-hosted users | Conflicts with accessibility, local-first operation, and ecosystem adoption. |
| Online-only Marketplace | Breaks portable, recovery, air-gapped, and low-connectivity deployments. |
| Popularity-first ranking | Downloads and ratings do not prove safety, correctness, or maintainability. |

## Implementation Notes

- Add Publisher, Product, Release, Listing, License, Entitlement, Purchase, Payout, VerificationRecord, Review, and SupportPolicy domain models.
- Add offline catalog snapshots and signed entitlement caching.
- Separate trust ranking, quality ranking, relevance ranking, and sponsored placement.
- Add organization-private registries and private product distribution.
- Add publishing workflows driven by Vestara agents but gated by independent verification and policy enforcement.
- Preserve package data on uninstall by default; destructive deletion remains an explicit purge or workspace operation.

## Related

- ADR-112: Extension Platform and Local Package Manager
- ADR-115: Marketplace Foundation and Workspace Experience
- ADR-124: Unified Marketplace Asset and Installation Model
- `10-developer-platform/marketplace-creator-ecosystem.md`
