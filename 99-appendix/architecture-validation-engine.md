# Architecture Validation Engine

## Purpose

Validate engineering consistency across the entire Vestara platform. Every
failure is an engineering issue, not a documentation issue. The validator
checks that capabilities, architectures, packages, evidence, and documents
form a coherent, dependency-resolved graph.

## Rule categories

Rules are classified into five categories. Each category answers a different
question about the engineering system.

```text
Structural    — Does the graph exist and reference correctly?
Behavioral    — Do the data flows make sense?
Governance    — Is everything owned and authorized?
Evidence      — Is everything proven?
Historical    — Is everything versioned and traceable?
```

## Structural rules

These validate that the graph has no dangling references, orphan nodes,
or impossible cycles.

### S1: Capability existence

```
Every capability in the catalog
  ↓
must have a unique ID
  ↓
must have an owner
  ↓
must have a status
```

### S2: Reference integrity

```
Every capability
  ↓
depends_on references must exist in the catalog
  ↓
required_by references must be consistent
  ↓
owns references must exist
  ↓
implemented_by references must exist
```

### S3: No cycles

```
The dependency graph
  ↓
must be a directed acyclic graph (DAG)
  ↓
no capability may depend on itself, directly or transitively
```

### S4: Document references

```
Every capability
  ↓
documents.blueprint references must exist in vestara-blueprint
  ↓
documents.core references must exist in vestara-ai-core/docs
  ↓
no broken links
```

## Behavioral rules

These validate that the data flows between capabilities make sense.

### B1: Produces/consumes consistency

```
Every capability
  ↓
if it produces an artifact
  ↓
some other capability must consume it (or it's a terminal artifact)
  ↓
if it consumes an artifact
  ↓
some capability must produce it (or it's an external input)
```

### B2: Reads/writes consistency

```
Every capability
  ↓
if it writes to a data store
  ↓
it must also read from it (or it's a write-only store, which is suspicious)
  ↓
if it reads from a data store
  ↓
some capability must write to it (or it's an external store)
```

### B3: Event consistency

```
Every capability
  ↓
if it emits an event
  ↓
the event type must be defined in the event schema
  ↓
if it consumes an event
  ↓
some capability must emit it
```

### B4: Data flow completeness

```
Every capability
  ↓
must have at least one input (consumes, reads, or depends_on)
  ↓
must have at least one output (produces, writes, or emits)
  ↓
except leaf capabilities that only transform
```

## Governance rules

These validate that everything is owned, authorized, and canonical.

### G1: Owner existence

```
Every capability
  ↓
must have an owner
  ↓
the owner must be a valid role or team
```

### G2: ADR authorization

```
Every capability
  ↓
must be introduced by an ADR
  ↓
the ADR must exist
  ↓
the ADR must be accepted or proposed (not deprecated)
```

### G3: Canonical uniqueness

```
Every architectural concern
  ↓
must have exactly one canonical document
  ↓
no two documents may claim canonicality for the same concern
```

### G4: Supersession integrity

```
Every document
  ↓
if supersededBy is set
  ↓
the superseding document must exist
  ↓
if supersedes is set
  ↓
the superseded documents must exist
```

## Evidence rules

These validate that everything is proven and mature.

### E1: Maturity justification

```
Every capability
  ↓
maturity.implementation must match actual package status
  ↓
maturity.verification must match actual evidence status
  ↓
if maturity is "implemented" but verification is "unverified" → WARNING
```

### E2: Verification requirements

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

### E3: Implementation traceability

```
Every capability with status "implemented" or "verified"
  ↓
implemented_by must reference at least one package
  ↓
the referenced package must exist in vestara-ai-core
  ↓
the package must have a package.json
```

## Historical rules

These validate that everything is versioned and traceable.

### H1: Version consistency

```
Every capability
  ↓
version must follow semver
  ↓
if status is "implemented", version must be >= 1.0.0
  ↓
if status is "proposed", version must be < 1.0.0
```

### H2: History integrity

```
Every capability
  ↓
history entries must reference valid commits
  ↓
history must be chronologically ordered
  ↓
first history entry must match introduced.commit
```

### H3: Change traceability

```
Every commit that changes a capability
  ↓
must be recorded in the capability's history
  ↓
or flagged as undocumented
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
