---
title: "Vestara Website Implementation Plan"
volume: "17-marketing"
book: "Book 6: Future Technologies"
version: "0.1.0"
status: "draft"
owner: "@chief-architect"
last-reviewed: "2026-08-02"
next-review: "2027-02-02"
tags: ["website", "marketing", "workspace-ui", "design-system", "api", "architecture"]
---

# Vestara Website Implementation Plan

> Build a public-facing Vestara website that presents Vestara as an observable, verifiable autonomous engineering platform while remaining visually and technically consistent with the existing Workspace UI.

---

## 1. Objective

The Vestara website must not become a disconnected marketing application. It must reuse the same design language, theme contracts, shared packages, API infrastructure, authentication boundaries, telemetry conventions, and engineering standards already used by the Vestara Workspace.

The website should feel like the public entrance to the same system rather than a separate brand implementation.

```text
Vestara Monorepo
├── apps/
│   ├── api/                  Existing backend and platform API
│   ├── workspace/            Existing authenticated engineering workspace
│   └── website/              New public Vestara website
│
├── packages/
│   ├── website-ui/           Public-site-specific sections and components
│   ├── workspace-ui/         Reusable workspace visual primitives
│   ├── theme/                Shared design tokens and theme contracts
│   ├── sdk/                  Typed API client
│   ├── config/               Environment and runtime configuration
│   ├── types/                Shared DTOs and domain types
│   ├── validation/           Shared request and form schemas
│   ├── analytics/            Website analytics abstraction
│   └── telemetry/            Vestara event and observability integration
```

---

## 2. Product Scope

The first release should:

1. Explain what Vestara is.
2. Demonstrate how Vestara works.
3. Establish technical credibility.
4. Direct users into the Workspace, documentation, or onboarding flow.
5. Collect structured interest from users, contributors, and partners.

The website should support two operating modes:

```text
Public mode
└── Marketing, platform explanation, documentation entry, demos, contact

Connected mode
└── Live platform status, public demonstrations, authentication, onboarding,
    workspace deep links, API-backed forms, and selected telemetry
```

The first implementation should support connected mode architecturally even when some sections initially use static content.

---

## 3. Application Boundary

Create a dedicated application:

```text
apps/website
```

Recommended stack:

```text
React 19
TypeScript
Vite
Tailwind CSS v4
React Router
Vestara shared theme package
Vestara SDK
Existing API application
```

The website should remain independently deployable from `apps/workspace`.

Recommended development commands:

```bash
pnpm dev:website
pnpm build:website
pnpm test:website
pnpm lint:website
pnpm typecheck:website
```

Possible local ports:

```text
Website:   5174
Workspace: 5173
API:       3001
```

Recommended production routing:

```text
vestara.dev                 Public website
app.vestara.dev             Workspace
api.vestara.dev             API
docs.vestara.dev            Documentation, when separated
status.vestara.dev          Platform status, when introduced
```

Subdomains are preferred for production because the website and Workspace have different caching, security, authentication, SEO, and release requirements.

---

## 4. Design-System Strategy

The website must inherit the current Workspace UI identity rather than recreate it.

### 4.1 Shared visual language

Preserve the established Vestara characteristics:

```text
Dark engineering interface
Metallic gold primary accent
Graphite and zinc surfaces
Subtle luminous borders
Layered technical backgrounds
High information density where appropriate
Clear operational status indicators
Controlled animation
Strong typography hierarchy
```

The website should be more spacious and narrative-driven than the Workspace, but both surfaces must visibly belong to the same platform.

### 4.2 Theme architecture

Extract or formalize the Workspace theme into a shared package:

```text
packages/theme
├── src/
│   ├── tokens.ts
│   ├── semantic-tokens.ts
│   ├── themes.ts
│   ├── theme-provider.tsx
│   ├── use-theme.ts
│   ├── storage.ts
│   └── index.ts
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── animations.css
│   └── utilities.css
└── package.json
```

The theme package should define semantic contracts rather than only raw colors.

Shared CSS custom properties should include:

```css
--vestara-background;
--vestara-surface;
--vestara-surface-elevated;
--vestara-text;
--vestara-text-muted;
--vestara-border;
--vestara-accent;
--vestara-accent-strong;
--vestara-success;
--vestara-warning;
--vestara-danger;
--vestara-focus;
```

Theme values must not be copied into `apps/website`. Theme ownership remains centralized.

### 4.3 Layout relationship

```text
Workspace
└── Sidebar + command surface + inspectors + operational panels

Website
└── Top navigation + narrative sections + interactive product demonstrations
```

Shared elements may include:

```text
Vestara logo treatment
Typography
Button hierarchy
Status badges
Panel surfaces
Code blocks
Command palette styling
Telemetry indicators
Timeline styling
Graph visualization language
Cards and borders
Motion curves
Focus states
```

---

## 5. Recommended Website Structure

```text
apps/website/src
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── routes.ts
├── components/
│   ├── navigation/
│   ├── footer/
│   ├── sections/
│   ├── demonstrations/
│   ├── forms/
│   ├── seo/
│   └── common/
├── pages/
│   ├── HomePage.tsx
│   ├── PlatformPage.tsx
│   ├── AgentsPage.tsx
│   ├── EngineeringGraphPage.tsx
│   ├── VerificationPage.tsx
│   ├── SecurityPage.tsx
│   ├── DocumentationPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── StatusPage.tsx
│   └── NotFoundPage.tsx
├── features/
│   ├── platform-status/
│   ├── contact/
│   ├── newsletter/
│   ├── demo-session/
│   ├── repository-analysis/
│   └── authentication/
├── content/
├── hooks/
├── lib/
├── styles/
├── main.tsx
└── vite-env.d.ts
```

Page components should remain thin. Product demonstrations, forms, API behavior, and data loading belong under `features`.

---

## 6. Initial Sitemap

### Home

The homepage should include:

```text
Navigation
Hero
Live system signal
Core platform pillars
How Vestara works
Observable agent execution
Engineering graph
Verification and evidence
Workspace preview
Architecture overview
Use cases
Current development state
Call to action
Footer
```

Suggested hero direction:

```text
Vestara
Autonomous engineering you can observe, inspect, and verify.

Build with AI agents without surrendering visibility or control.
```

Primary actions:

```text
Open Workspace
Explore the Platform
View Architecture
Read Documentation
```

### Platform

Explain the complete Vestara operating model:

```text
Intent
Planning
Agent assignment
Execution
Filesystem operations
Telemetry
Verification
Evidence
Knowledge graph
Human governance
```

### Agents

Explain agent roles and collaboration:

```text
Developer
Architect
Analyst
Verifier
Security
Documentation
Operations
Custom agents
```

Show how agents receive scoped capabilities, execute work, emit telemetry, and verify results.

### Engineering Graph

Explain entities, relationships, events, historical state, impact analysis, backlinks, closures, insights, and agent context. Provide an interactive or simulated graph demonstration.

### Verification

Verification should be a major product page and should explain:

```text
Claim
Action
Observation
Test
Artifact
Visual verification
Conclusion
Replay
```

Core principle:

> Tests are evidence, not the whole truth. Agent completion is not accepted without observable verification, and verification itself remains inspectable.

### Security and Governance

Cover capability boundaries, workspace containment, risk classification, approval policies, pre-action interception, audit events, operation history, secret handling, agent isolation, and rollback strategy.

### Documentation

Initially provide a curated entry page linking to approved public documentation. Long-term documentation may move to a dedicated `apps/docs` application.

### Status

Expose only safe operational information:

```text
Website
API
Workspace connectivity
Authentication
Event stream
Documentation
Current release
```

Internal infrastructure details and sensitive telemetry must never be exposed.

---

## 7. Homepage Experience

### 7.1 Boot signal

Use a restrained Vestara boot sequence:

```text
VESTARA RUNTIME
INITIALIZING ENGINEERING GRAPH
REGISTERING CAPABILITIES
CONNECTING TELEMETRY
VERIFICATION ONLINE
```

Animations must respect `prefers-reduced-motion`.

### 7.2 Hero

Use the metallic gold Vestara mark, a strong headline, supporting statement, and focused calls to action.

### 7.3 Live execution strip

Present a compact simulated or API-backed execution stream:

```text
14:22:08  Intent accepted
14:22:09  Plan created
14:22:09  Developer assigned
14:22:11  filesystem.read
14:22:13  filesystem.update
14:22:16  verifier started
14:22:21  visual evidence captured
14:22:22  execution verified
```

### 7.4 Platform loop

```text
Understand → Plan → Execute → Observe → Verify → Learn
```

### 7.5 Workspace preview

Render an interactive approximation of the current Workspace UI using shared components. It should show navigation, an active session, assigned agents, execution timeline, filesystem activity, verification evidence, and an inspector.

### 7.6 Trust through evidence

Contrast conventional agent output with Vestara:

```text
Conventional
“Task completed successfully.”

Vestara
Files changed
Commands executed
Tests observed
Visual state captured
Artifacts linked
Verifier conclusion recorded
Timeline replayable
```

### 7.7 Engineering graph

Show a small graph containing:

```text
Intent
Plan
Agent
Execution
File
Test
Artifact
Verification
```

Selecting a node should open an inspector-style panel consistent with the Workspace interaction model.

### 7.8 Architecture

Show these platform layers:

```text
Experience Layer
Collaboration Layer
Agent Runtime
Capability Runtime
Engineering Graph
Event Store
Knowledge and Memory
Telemetry and Evidence
Governance
Infrastructure
```

---

## 8. Shared UI Packages

Do not directly import arbitrary internal components from `apps/workspace`.

Move broadly reusable visual primitives into a stable package:

```text
packages/workspace-ui
├── Panel
├── Surface
├── StatusBadge
├── Timeline
├── EntityBadge
├── InspectorShell
├── ExecutionStep
├── TelemetryRow
├── CodeBlock
├── EmptyState
├── LoadingState
├── ErrorState
└── VestaraLogo
```

Website-specific components belong in:

```text
packages/website-ui
├── MarketingContainer
├── Hero
├── FeatureSection
├── ArchitectureDiagram
├── ProductPreview
├── CallToAction
└── PublicNavigation
```

A component should move to a package only when it has a stable responsibility, typed inputs, no application-specific routing assumptions, no direct global-state dependency, no private API coupling, and a documented public export.

---

## 9. API Integration

The website should connect to the existing `apps/api` rather than introducing an independent backend.

Recommended public endpoints:

```text
GET  /api/public/platform
GET  /api/public/releases/latest
GET  /api/public/status
GET  /api/public/capabilities
GET  /api/public/demo/session
GET  /api/public/demo/graph
POST /api/public/contact
POST /api/public/waitlist
POST /api/public/newsletter
POST /api/public/demo/request
```

All public endpoints require explicit DTOs, runtime validation, rate limiting, CORS policy, request-size limits, bot protection where necessary, structured audit events, safe error handling, and removal of sensitive platform metadata.

Recommended response contract:

```typescript
interface ApiResponse<T> {
  readonly data: T;
  readonly meta: {
    readonly requestId: string;
    readonly timestamp: string;
  };
}
```

Recommended error contract:

```typescript
interface ApiErrorResponse {
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly requestId: string;
  };
}
```

---

## 10. Shared SDK

The website should consume the API through a typed shared client in `packages/sdk`. Raw `fetch()` calls must not be scattered across page components.

Suggested SDK methods:

```text
public.getPlatform()
public.getStatus()
public.getCapabilities()
public.getDemoSession()
public.getDemoGraph()
public.submitContact()
public.joinWaitlist()
auth.getSession()
auth.beginLogin()
```

The SDK should support `AbortSignal`, request IDs, typed errors, runtime response validation, base URL configuration, credentials policy, safe retry rules, and telemetry hooks.

---

## 11. Authentication and Workspace Handoff

```text
Website
  ↓
Sign in or request access
  ↓
API authentication
  ↓
Session established
  ↓
Redirect to Workspace
  ↓
Workspace resolves user and organization
```

Requirements:

```text
Preserve intended destination
Use secure HTTP-only cookies where possible
Prevent open redirects
Share identity types through packages/types
Keep auth UI reusable
Support GitHub initially
Allow additional providers later
```

Example deep links:

```text
app.vestara.dev/
app.vestara.dev/sessions/:sessionId
app.vestara.dev/executions/:executionId
app.vestara.dev/entities/:entityId
app.vestara.dev/projects/:projectId
```

Public demonstrations must never use real private Workspace sessions.

---

## 12. Content Architecture

Avoid embedding large amounts of marketing copy directly in TSX. Use typed content modules initially, then move long-form content to Markdown or MDX when editorial volume increases.

Only approved public content may be published. Internal repository documentation must not be exposed automatically.

---

## 13. Workspace Theme Compatibility

Acceptance criteria:

```text
Website consumes the same semantic token names as Workspace.
Theme changes do not require duplicate website edits.
Logo, typography, surfaces, borders, and status colors remain consistent.
Website can initialize from the same stored theme preference.
System theme is supported.
Reduced motion is supported.
High-contrast states remain legible.
```

Theme initialization should happen before React renders:

```text
Inline theme bootstrap
  ↓
Resolve stored preference
  ↓
Resolve system preference
  ↓
Apply data-theme to document root
  ↓
Mount React
```

The first release may support Vestara Dark and System themes. Additional themes should be enabled only after their Workspace implementations are stable.

---

## 14. Responsive Design

Supported ranges:

```text
Mobile:      320–767px
Tablet:      768–1023px
Desktop:     1024–1439px
Wide:        1440px+
```

Mobile behavior must collapse navigation, simplify graph presentations, convert workspace previews into focused flows, avoid tiny operational tables, preserve scrollable code samples, maintain suitable touch targets, and reduce costly background effects.

---

## 15. Accessibility

Target WCAG 2.2 AA.

Required practices include semantic landmarks, keyboard navigation, visible focus states, skip navigation, correct heading hierarchy, accessible dialogs and drawers, sufficient contrast, reduced-motion support, non-color status communication, meaningful alternative text, and correctly associated form errors.

Animated terminal and telemetry streams must provide a static textual equivalent.

---

## 16. Performance

Homepage targets:

```text
LCP: less than 2.5 seconds
CLS: less than 0.1
INP: less than 200 milliseconds
```

Implementation requirements:

```text
Route-level code splitting
Lazy-loaded demonstrations
Deferred graph rendering
Optimized brand assets
Modern image formats
Minimal font preloading
Static-first hero content
Cached public API responses
Build-time metadata generation
```

The initial hero must not depend on API availability.

---

## 17. SEO and Discovery

Each route should provide a unique title, description, canonical URL, Open Graph metadata, social image, robots directives, and sitemap entry.

Recommended structured data:

```text
Organization
SoftwareApplication
WebSite
BreadcrumbList
Article for documentation content
```

Create and maintain:

```text
robots.txt
sitemap.xml
manifest.webmanifest
favicon set
Open Graph assets
```

Placeholder routes must not be included in the sitemap.

---

## 18. Security

Public website security should include a strict Content Security Policy, frame restrictions, referrer policy, permissions policy, HTTPS enforcement, CSRF protection for authenticated writes, rate limiting, input validation, output encoding, dependency auditing, secret isolation, secure cookies, and origin validation.

Interactive demos must use sanitized predefined data.

Never expose:

```text
Private repository paths
Host filesystem paths
Agent secrets
Provider keys
Internal prompts
Private execution payloads
User identifiers
Raw error traces
Infrastructure topology
```

---

## 19. Observability

Useful website events:

```text
website.page-viewed
website.cta-selected
website.demo-started
website.demo-completed
website.contact-submitted
website.waitlist-joined
website.workspace-opened
website.api-failed
website.client-error
```

Product analytics and engineering telemetry should remain conceptually separate even when they share infrastructure.

Every API-backed interaction should include a request ID correlatable across browser, website, API, telemetry, and logs.

---

## 20. Testing Strategy

### Unit tests

Cover theme resolution, content mappings, SDK serialization, validation schemas, metadata generation, navigation rules, and status transformations.

### Component tests

Cover navigation, mobile menu, hero actions, forms, Workspace preview, inspector demonstrations, theme switching, reduced-motion behavior, loading states, and error states.

### Integration tests

Cover website-to-API requests, contact and waitlist submission, status loading, authentication redirects, and Workspace handoff.

### End-to-end tests

Cover homepage navigation, product exploration, interactive demos, form submission, API failure handling, theme switching, keyboard-only navigation, Workspace entry, and authentication handoff.

### Visual verification

Capture evidence for major routes at:

```text
375 × 812
768 × 1024
1440 × 900
1920 × 1080
```

Evidence should include screenshots, DOM state, console errors, network failures, accessibility violations, active theme, viewport, commit SHA, and timestamp.

These outputs should become structured verification artifacts rather than untracked screenshots.

---

## 21. Delivery Phases

### Phase 0 — Repository and Design Audit

Inspect the Workspace theme implementation, global styles, Tailwind configuration, reusable components, API routing, shared packages, brand assets, deployment topology, and current dependency direction.

Deliverables:

```text
Website architecture decision record
Theme compatibility matrix
Reusable component inventory
API integration map
Initial sitemap
```

Exit condition: no duplicate theme system is required to start the website.

### Phase 1 — Application Foundation

Create `apps/website`, routing, provider composition, environment validation, Tailwind integration, shared theme integration, test configuration, build scripts, and build-order integration.

Exit condition: the website builds and runs independently while using the Workspace theme.

### Phase 2 — Shared Theme Extraction

Extract semantic tokens, reusable base styles, theme provider, pre-render theme bootstrap, and migrate both Workspace and Website to the shared theme package without visually redesigning the Workspace.

Exit condition: Workspace and Website render from one theme contract.

### Phase 3 — Shared UI Primitives

Extract stable logo, button, panel, badge, status, code, timeline, inspector, loading, and error primitives.

Exit condition: Website does not import private files from `apps/workspace`.

### Phase 4 — Homepage

Implement navigation, boot signal, hero, execution stream, platform loop, Workspace preview, verification comparison, graph preview, architecture, CTA, and footer using deterministic content.

Exit condition: the homepage communicates Vestara's value without requiring API availability.

### Phase 5 — Product Pages

Implement Platform, Agents, Engineering Graph, Verification, Security, About, Contact, and Documentation entry pages.

Exit condition: every major Vestara capability has a stable public explanation and URL.

### Phase 6 — API Connectivity

Add public API modules, typed SDK methods, validation, live status, release data, contact, waitlist, demo sessions, and demo graph support.

Exit condition: the website consumes safe live data without direct backend coupling.

### Phase 7 — Workspace Integration

Implement authentication handoff, destination preservation, deep links, shared identity types, and public-demo-to-Workspace conversion paths.

Exit condition: visitors can move securely from the website to the Workspace.

### Phase 8 — Verification and Evidence

Add browser verification, responsive screenshots, accessibility scans, console inspection, network inspection, link verification, SEO checks, performance budgets, and artifact generation.

Exit condition: every release includes inspectable website evidence, not only passing test counts.

### Phase 9 — Production Readiness

Complete CSP, rate limiting, analytics, telemetry, error reporting, caching, compression, sitemap, robots, social metadata, deployment, rollback, health checks, and release documentation.

Exit condition: the website can be deployed, monitored, and rolled back independently.

---

## 22. Suggested Milestones

### v0.1 — Website Foundation

```text
New application
Routing
Shared theme
Header
Footer
Core page shell
Build integration
```

### v0.2 — Public Identity

```text
Homepage
Platform story
Vestara visuals
Responsive implementation
SEO foundation
```

### v0.3 — Observable Product Demo

```text
Execution stream
Workspace preview
Inspector demo
Engineering graph preview
Verification evidence
```

### v0.4 — Connected Website

```text
Public API
SDK integration
Status
Release data
Contact
Waitlist
```

### v0.5 — Workspace Gateway

```text
Authentication
Workspace handoff
Deep links
Public demo conversion
```

### v1.0 — Production Website

```text
Complete product pages
Security hardening
Accessibility
Performance
Analytics
Telemetry
Automated visual verification
Production deployment
```

---

## 23. Dependency Rules

Required dependency direction:

```text
apps/website
  ├── packages/website-ui
  ├── packages/workspace-ui
  ├── packages/theme
  ├── packages/sdk
  ├── packages/types
  ├── packages/validation
  └── packages/config
```

The website must not import API internals, Workspace internals, server-only packages, filesystem runtime implementations, agent runtime implementations, or private event-store persistence.

Shared packages must not depend on applications.

---

## 24. Architectural Decisions

### Decision 1: Separate application

Use `apps/website`, not public routes inside `apps/workspace`, because the audience, authentication requirements, performance profile, deployment cadence, security boundary, and SEO requirements differ.

### Decision 2: Shared theme, separate layout

Website and Workspace share tokens and stable primitives, not the complete Workspace shell.

### Decision 3: API-backed, static-first

Core content renders without the API. Dynamic status, forms, demonstrations, and authentication progressively connect to `apps/api`.

### Decision 4: Typed SDK boundary

All browser-to-API communication goes through a shared typed SDK and validated DTOs.

### Decision 5: Demonstrations use safe data

Public demos use deterministic fixtures or explicitly public demo sessions and never expose private Workspace activity.

### Decision 6: Evidence is part of delivery

Visual and behavioral verification artifacts are first-class release outputs.

---

## 25. Definition of Done

The first production website is ready when:

```text
It uses the current Workspace theme contract.
It introduces no duplicate design-token system.
It is independently buildable and deployable.
Critical content works without API availability.
Connected features use the existing API through a typed SDK.
It has no direct dependency on Workspace application internals.
It supports desktop, tablet, and mobile layouts.
It meets the agreed accessibility baseline.
Public endpoints are validated and rate-limited.
Authentication handoff is secure.
SEO metadata and sitemap are complete.
Critical flows have end-to-end tests.
Major routes have visual verification artifacts.
Browser console and network verification are clean.
Production health and rollback procedures are documented.
```

---

## 26. Recommended First Implementation Sequence

```text
1. Audit apps/workspace theme implementation and global styles.
2. Define the shared semantic theme contract.
3. Create packages/theme.
4. Migrate Workspace to packages/theme without visual change.
5. Scaffold apps/website.
6. Connect Tailwind v4 to the shared CSS variables.
7. Build the website shell, navigation, and footer.
8. Build the homepage using deterministic content.
9. Extract only the Workspace primitives needed by the website.
10. Add the public API namespace.
11. Add typed SDK methods.
12. Build live status and demo integrations.
13. Add authentication and Workspace handoff.
14. Add browser, visual, accessibility, and performance verification.
15. Deploy the Website independently from the Workspace.
```

The most important constraint is Step 4: the current Workspace appearance must remain unchanged while its theme implementation becomes reusable. This prevents the website from creating a parallel Vestara identity that will drift over time.

---

## Cross-References

| Volume | Relationship |
|--------|--------------|
| `03-product` | Product positioning and website conversion goals |
| `04-platform` | Platform boundaries and API architecture |
| `06-workspace` | Workspace UI, sessions, projects, and deep-link targets |
| `10-developer-platform` | SDK and public platform integration |
| `11-security` | Public endpoint, authentication, and data exposure controls |
| `13-design-system` | Canonical theme, visual language, tokens, and accessibility |
| `14-engineering` | Engineering standards and evidence-based verification |
| `15-devops` | Build, deployment, monitoring, and rollback |
| `20-roadmaps` | Website delivery milestones and release sequencing |

---

**Status:** Draft blueprint proposal. Implementation must not begin until the shared theme boundary and public API exposure model have been validated against the current `vestara-ai-core` implementation.
