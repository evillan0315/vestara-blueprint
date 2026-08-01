---
title: "Security — Volume Overview"
volume: "11-security"
book: "Book 5: Operations"
version: "1.1.0"
status: "approved"
owner: "@security-engineer"
last-reviewed: "2026-08-01"
next-review: "2026-11-01"
tags: ["security", "threat-model", "encryption", "compliance", "audit"]
---

# Volume 11: Security
## Security is Not a Feature — It's a Foundation

> **Mission**: Define and enforce a comprehensive security model that protects user data, ensures system integrity, and maintains user trust — from the bootloader to the application layer.

---

## 📋 Volume Contents

```
11-security/
│
├── README.md                              ← This file
├── SECURITY_MODEL.md                      ← Overall security philosophy & architecture
├── THREAT_MODEL.md                        ← STRIDE threat model per component
├── AUTHORIZATION.md                       ← RBAC, permissions, scopes
├── AUTHENTICATION.md                      ← OS auth, JWT, SSO, MFA
├── ENCRYPTION.md                          ← At-rest, in-transit, end-to-end
├── SECRETS.md                             ← Key management, rotation, vault
├── COMPLIANCE.md                          ← SOC2, HIPAA, GDPR, FedRAMP
├── INCIDENT_RESPONSE.md                   ← Security incident handling
├── SECURITY_CHECKLIST.md                  ← Pre-release security verification
└── AUDITING.md                            ← Audit logging & monitoring
```

---

## 🛡️ Security Principles

| Principle | Implementation |
|-----------|----------------|
| **Defense in Depth** | Multiple independent security layers |
| **Least Privilege** | Minimal permissions by default, explicit grant |
| **Zero Trust** | Verify every request, regardless of origin |
| **Privacy by Default** | No telemetry, no data collection without consent |
| **Secure by Design** | Security reviewed at architecture phase, not after |
| **Supply Chain Security** | Signed artifacts, SBOM, dependency auditing |
| **User Controlled** | Users own their keys, data, and encryption |

## OS-0 security boundary

OS-0 Host Runtime observes machine state without an agent-controlled shell.
Power operations are disabled by default and require explicit enablement,
per-request authorization, and policy permission; no OS-0 API or CLI route
exposes them. Supplied systemd units use a dedicated identity,
`NoNewPrivileges`, private temporary storage, read-only system protection, and
narrow writable paths.

These controls do not constitute Secure Boot, measured boot, encrypted portable
storage, signed updates, or an immutable root filesystem. Those remain
unimplemented distribution-layer security requirements.

---

## 🔗 Cross-References

| Volume | Relationship |
|--------|--------------|
| `04-platform` | Security enforced at every platform boundary |
| `05-ai-core` | AI safety, prompt injection prevention |
| `07-operating-system` | Secure Boot, disk encryption, TPM |
| `08-cloud` | Cloud security, E2E encryption |
| `12-data` | Data encryption, retention, deletion |
| `14-engineering` | Security coding standards |
| `15-devops` | CI/CD security, artifact signing |

---

**END OF SECURITY VOLUME OVERVIEW**

*Trust is earned through consistent security, not compliance checklists.*
