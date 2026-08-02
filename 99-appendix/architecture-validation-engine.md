# Architecture Validation Engine

## Purpose

Validate engineering consistency across the entire Vestara platform. Every
failure is an engineering issue, not a documentation issue. The validator
checks that capabilities, architectures, packages, evidence, and documents
form a coherent, dependency-resolved graph.

## Validation rules

### Rule 1: Capability existence

```
Every capability in the catalog
  ↓
must have a unique ID
  ↓
must have an owner
  ↓
must have a status
```

### Rule 2: Architecture completeness

```
Every capability
  ↓
must reference an architecture (ADR or document)
  ↓
the referenced architecture must exist
  ↓
the architecture must be accepted or proposed (not deprecated)
```

### Rule 3: Implementation traceability

```
Every capability with status "implemented" or "verified"
  ↓
must reference at least one package
  ↓
the referenced package must exist in vestara-ai-core
  ↓
the package must have a package.json
```

### Rule 4: Evidence requirements

```
Every capability with status "verified"
  ↓
must have a verification runId
  ↓
the runId must reference an evidence bundle
  ↓
the evidence bundle must contain metadata.json
  ↓
the evidence bundle must contain verification.json
```

### Rule 5: Maturity justification

```
Every capability
  ↓
maturity.implementation must match actual package status
  ↓
maturity.verification must match actual evidence status
  ↓
if maturity is "implemented" but verification is "unverified" → WARNING
```

### Rule 6: Dependency resolution

```
Every capability
  ↓
depends_on references must exist in the catalog
  ↓
no circular dependencies
  ↓
required_by references must be consistent (if A depends_on B, then B.required_by contains A)
```

### Rule 7: Document references

```
Every capability
  ↓
documents.blueprint references must exist in vestara-blueprint
  ↓
documents.core references must exist in vestara-ai-core/docs
  ↓
no broken links
```

### Rule 8: Version consistency

```
Every capability
  ↓
version must follow semver
  ↓
if status is "implemented", version must be >= 1.0.0
  ↓
if status is "proposed", version must be < 1.0.0
```

### Rule 9: History integrity

```
Every capability
  ↓
history entries must reference valid commits
  ↓
history must be chronologically ordered
  ↓
first history entry must match introduced.commit
```

### Rule 10: Relationship consistency

```
Every capability
  ↓
produces/consumes/emits/reads/writes must reference valid artifact types
  ↓
emits events must match event schema in event store
  ↓
reads/writes data stores must reference valid entities
```

## Output format

### Success

```json
{
  "status": "passed",
  "capabilities": 70,
  "rules-checked": 10,
  "violations": 0,
  "warnings": 0,
  "duration": "2.3s"
}
```

### Failure

```json
{
  "status": "failed",
  "capabilities": 70,
  "rules-checked": 10,
  "violations": 3,
  "warnings": 2,
  "duration": "2.3s",
  "issues": [
    {
      "rule": "Rule 3: Implementation traceability",
      "severity": "error",
      "capability": "capability.harness.steer",
      "message": "Status is 'not-started' but maturity.implementation is 'partial'",
      "fix": "Set maturity.implementation to 'not-started'"
    },
    {
      "rule": "Rule 4: Evidence requirements",
      "severity": "error",
      "capability": "capability.harness.foundation",
      "message": "Status is 'partial' but no verification runId",
      "fix": "Add verification.runId or set status to 'proposed'"
    },
    {
      "rule": "Rule 6: Dependency resolution",
      "severity": "warning",
      "capability": "capability.filesystem.write",
      "message": "depends_on capability.policy.approval not found in catalog",
      "fix": "Add capability.policy.approval to catalog or remove dependency"
    }
  ]
}
```

## Commands

```bash
# Full validation
pnpm docs:validate

# Specific rules
pnpm docs:validate --rule capability-existence
pnpm docs:validate --rule architecture-completeness
pnpm docs:validate --rule dependency-resolution

# Drift detection
pnpm docs:drift

# Generate report
pnpm docs:validate --output json > validation-report.json
```

## Integration

The Architecture Validation Engine runs:

1. **On every commit** — lightweight check (rules 1-3, 6-7)
2. **On every PR** — full validation (all rules)
3. **On every release** — evidence verification (rules 4-5, 8-10)
4. **Manually** — `pnpm docs:validate`

## Relationship to CI

```
Git Push
  ↓
CI Pipeline
  ↓
pnpm build
  ↓
pnpm test
  ↓
pnpm docs:validate
  ↓
Gate: must pass all rules
```
