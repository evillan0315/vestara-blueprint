---
title: "DevOps — Volume Overview"
volume: "15-devops"
book: "Book 4: Engineering"
version: "1.1.0"
status: "approved"
owner: "@devops-engineer"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
tags: ["devops", "ci-cd", "docker", "infrastructure", "monitoring"]
---

# Volume 15: DevOps
## Infrastructure — Build, Deploy, Observe, Recover

> **Mission**: Build reliable, automated infrastructure that delivers Vestarta software from commit to production with minimal manual intervention, maximum observability, and instant recovery.

---

## 📋 Volume Contents

```
15-devops/
│
├── README.md                              ← This file
├── CI_CD.md                               ← CI/CD pipeline specifications
├── DOCKER.md                              ← Docker build & image management
├── KUBERNETES.md                          ← K8s deployment (Gen 3+)
├── OBSERVABILITY.md                       ← Metrics, tracing, logging
├── MONITORING.md                          ← Alerting, dashboards, SLOs
├── LOGGING.md                             ← Structured logging, aggregation
├── DEPLOYMENT.md                          ← Deployment strategies & rollback
├── DISASTER_RECOVERY.md                   ← Backup, restore, business continuity
└── INFRASTRUCTURE.md                      ← Cloud & on-prem infrastructure
```

---

## ⚙️ DevOps Principles

| Principle | Implementation |
|-----------|----------------|
| **Automated Everything** | CI/CD from commit to deployment |
| **Immutable Artifacts** | Build once, deploy many, never modify |
| **Observability by Default** | Every service emits metrics, traces, logs |
| **Security in Pipeline** | SAST, dependency scan, container scan |
| **Environment Parity** | Dev = Staging = Production |
| **Self-Healing** | Automatic rollback on failure |
| **Disaster Recovery Tested** | Regular DR drills |

## OS-0 deployment status

Reviewed systemd templates are implemented under `vestara-ai-core/os/systemd`
at reference `579df3f`. They provide host preflight, API/runtime hosting,
workspace readiness, and a target unit. Installation and enablement are
explicit administrator actions. Image production, unattended installation,
signed update delivery, and automatic rollback remain future work.

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `07-operating-system` | OS image build & update pipeline |
| `08-cloud` | Cloud infrastructure deployment |
| `11-security` | Supply chain security, SBOM |
| `14-engineering` | CI/CD enforces engineering gates |

---

**END OF DEVOPS VOLUME OVERVIEW**

*If it hurts, do it more often and automate it.*
