---
title: "Engineering — Volume Overview"
volume: "14-engineering"
book: "Book 4: Engineering"
version: "1.1.0"
status: "approved"
owner: "@engineering-manager"
last-reviewed: "2026-08-04"
next-review: "2027-02-04"
tags: ["engineering", "standards", "handbook", "conventions", "agent-continuity", "artifacts"]
---

# Volume 14: Engineering
## The Vestara Engineering Handbook — Standards, Practices, Quality

> **Mission**: Define and enforce engineering standards that ensure every line of code and every engineering artifact in the Vestara ecosystem is maintainable, testable, secure, transferable, and consistent — regardless of which AI agent, model, provider, or human engineer produced it.

---

## 📋 Volume Contents

```text
14-engineering/
│
├── README.md                              ← This file
├── artifact-centered-agent-continuity.md  ← Model-independent engineering handoffs and agent-domain CI/CD
├── evidence-based-verification.md         ← Evidence architecture (claims, evidence, checks)
└── visual-verification.md                 ← Playwright screenshot regression + Visual Evidence
```

> Other files listed in earlier revisions of this README (e.g.
> `ENGINEERING_PRINCIPLES.md`, `CODING_STANDARDS.md`, `TESTING.md`) are not
> present in the local repository. Engineering rules live in
> `00-governance/02-engineering-rules.md`.

---

## 🔧 Engineering Principles

| Principle | Description |
|-----------|-------------|
| **Architecture Before Implementation** | ADR before code for architectural decisions |
| **Documentation Before Coding** | Specs in Blueprint before PR |
| **Artifact-Centered Continuity** | Project continuity belongs to governed artifacts and evidence, not one conversation or model |
| **Models Are Replaceable Executors** | Stages declare inputs, outputs, gates, and evidence so qualified agents can continue the work |
| **Strict TypeScript** | `strict: true`, zero `any`, Zod at boundaries |
| **Reusable Modules** | Shared packages in `@vestara/*` |
| **Composition Over Inheritance** | Small, focused, composable units |
| **Tested by Default** | Tests alongside source, real SQLite |
| **Feature-First** | Colocate by domain, not by layer |
| **Backward Compatible** | Additive migrations, API versioning |
| **Security Review Required** | Every PR reviewed for security |

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `00-governance` | Engineering rules and AIDL stage governance |
| `04-platform` | Architecture patterns and engineering event infrastructure |
| `05-ai-core` | Agent, provider, reasoning, and model-routing architecture |
| `10-developer-platform` | Marketplace-distributed workflows, packages, and engineering capabilities |
| `15-devops` | Traditional CI/CD enforces engineering release gates; agent-domain CI/CD governs intelligence artifacts |

---

**END OF ENGINEERING VOLUME OVERVIEW**

*Engineering standards are the shared language that makes the ecosystem coherent, even when the humans, agents, models, and providers change.*
