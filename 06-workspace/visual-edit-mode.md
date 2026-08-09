---
id: "visual-edit-mode"
title: "Vestara Visual Edit Mode — Human–AI Interaction Model for Visual Software Modification"
volume: "06-workspace"
book: "Book 2: Platform Architecture"
version: "0.1.0"
status: "proposed"
architecture-status: "proposed"
implementation-status: "proposed"
verification-status: "unverified"
implementation-repository: "evillan0315/vestara-ai-core"
implementation-ref: "pending"
tags: ["visual-edit", "design-intent", "human-ai-interaction", "ux", "experiment"]
---

# Vestara Visual Edit Mode — Blueprint Plan

A proposed human–AI interaction model for visual software modification,
derived from a failed convergence experiment on the Activity Room. Recorded as
an **experimental direction with explicit falsification points**, not as an
architectural mandate.

## Experiment log

### VE-1 — Selection and Inspection (COMPLETE)

**Hypothesis under test:** can Vestara reliably identify what the human is
pointing at in the rendered application?

**Mechanism (smallest):** the four initial semantic targets declare their
identity on the rendered element (`data-ve-target` / `data-ve-name` — Activity
Composer, Activity Stream, Activity Message, Organizational Event). A
read-only overlay highlights the hovered target's actual rendered bounding
rect and identifies it on click. No manipulation, no persistence, no source
mutation; normal behavior untouched when disabled.

**Result — PASS:**

| What you perceive | What Vestara understands |
|---|---|
| Activity stream | Activity Stream |
| Message | Activity Message |
| Composer | Activity Composer |
| Nested message UI (action icon) | Activity Message |

- Technical verification: PASS (real-browser hover → boundary matches the
  visible element; click → correct semantic component; nested controls resolve
  to the nearest semantic target; toggle-off preserves normal behavior).
- Director perceptual verification: PASS ("It's perfect!").
- Visual grounding hypothesis: **SUPPORTED** for the initial Activity Room
  semantic targets.

**Qualification:** grounding is proven for the initial Activity Room targets,
not universal arbitrary-component grounding. That is exactly enough evidence
for this phase.

**Implication:** the translation loss from the failed convergence experiment
has a demonstrated alternative — humans can point at the object they mean, and
Vestara understands it directly.

### VE-2 — Preview Manipulation (COMPLETE)

**Hypothesis under test:** can the human manipulate the visible UI directly
and get materially closer to the intended result without translating intent
into engineering language?

**Mechanism:** the selected element (from VE-1 grounding) gains three
human-level controls — Alignment (Left/Center/Right), Density
(Compact/Comfortable/Spacious), Presentation (Bubble/Minimal). All changes are
preview-only runtime DOM styles on the selected instance; never source, never
persisted. Reset restores the original rendered state.

**Result — PASS with minor preview-mechanism limitations.**

- Director perceptual verification: PASS — "I think I like it very much";
  controls visibly change the rendered experience immediately, with
  dramatically lower cognitive effort than describe → interpret → code →
  inspect.
- Contrast with the failed experiment: yesterday "describe → interpret → code
  → inspect → describe again"; today "select → click Right → see it move".

**Recorded preview limitations (not implementation defects; preserve for
later):**

1. Director message does not move fully to the right in preview.
2. Bubble presentation does not behave exactly as expected in preview.

These are preview-fidelity limitations, not evidence against the interaction
model. Do not mistake preview fidelity for perfect implementation.

### VE-3 — Structured Design Intent (TECHNICAL PASS)

**Hypothesis under test:** can Vestara turn a visual manipulation into an
accurate, implementation-neutral statement of intent?

**Mechanism:** the preview operations performed in VE-2 are captured as
structured, implementation-neutral intent — Target, exact Instance (record
id), Operations (alignment, density, presentation), Scope: instance,
Provenance (Director visual manipulation · VE-2 preview) — rendered for human
inspection. No generated code, no persistence.

**Result — TECHNICAL PASS** (automated E2E performs the actual sequence:
select Developer message → Left → Compact → Minimal → inspect intent → the
intent corresponds to those operations). Director perceptual test pending:
use Visual Edit, make changes, open "View intent", and confirm *"is that an
accurate description of what I just asked Vestara to change?"*

**The pipeline is now separated architecturally:**

```text
VE-1 Grounding     "What am I pointing at?"
VE-2 Manipulation  "What do I want changed?"
VE-3 Intent        "What does Vestara believe I asked for?"
VE-4 Implementation "How should verified intent modify the application?"
```

### Future Design Intent scope model (recorded, not expanded)

Scope will become one of the most important concepts in Visual Edit. Selecting
one message could mean *this message*, *all Activity Messages*, *all Developer
messages*, or *all agent messages in Activity Room* — radically different
implementation requests from identical visual manipulation.

```text
Future Design Intent scope model

instance
component
semantic-group
page
workspace
```

Future example:

```text
Target:   Activity Message
Instance: activity:msg:123
Operations:
  alignment:    left
  density:      compact
  presentation: minimal

Scope:
  kind: semantic-group
  selector:
    actorType: agent

Provenance:
  source: visual-manipulation
  actor:  Director
```

**This is the beginning of a UI modification language** — not CSS, Tailwind,
React props, or DOM mutations, but a human-intent representation for
presentation. The same Design Intent could be consumed by different
implementations (React Web UI, Desktop UI, Marketplace UI); the implementation
layer decides whether that means Tailwind classes, CSS variables, component
props, theme configuration, or something else.

### Configuration-first direction (recorded, not implemented)

For safe presentation-level changes, a future Intent Classifier could route
declarative-configuration targets directly:

```text
Visual Intent
      ↓
Intent Classifier
      ↓
Declarative configuration?  ── Yes ──→ Apply safely
      │ No
      ▼
Implementation required
      ↓
Developer
      ↓
Verifier
```

Alignment, spacing, density, typography, visibility, presentation variants,
component sizing could become **configuration rather than generated code** —
making Visual Edit a native capability of the Vestara UI runtime rather than an
AI coding feature. Recorded as direction, not yet an experiment.

### VE-4 — Implementation Proposal (COMPLETE)

**Hypothesis under test:** can Vestara resolve a confirmed Design Intent into
the actual component architecture without mutating source?

**Mechanism (smallest):** a semantic-target → source manifest resolves what the
Director pointed at into the component architecture (Activity Composer →
`ActivityComposer.tsx`; Activity Message / Organizational Event →
`ActivityItem.tsx` variant; Activity Stream → `ActivityStream.tsx`), and a
proposal builder renders: Resolved target, Affected source, Proposed
implementation, Expected visual outcome, Scope: instance, Risk, Unrelated
behavior, Verification. Inspection only — no code generated, no source
mutation.

**Result — PASS.**

- Director perceptual verification: PASS — **"I can see the intent and
  proposal. This is good and I like it. With this feature, it makes the app
  alive."**
- The controlled bridge (`Rendered UI → Semantic Target → Design Intent →
  Architecture Resolution → Implementation Proposal`) avoids the dangerous
  shortcut of DOM-element → arbitrary source editing.

### Presentational vs behavioral safety boundary (recorded)

Visual Edit's first safety boundary:

```text
PRESENTATIONAL
alignment, spacing, density, size, visibility,
typography, presentation variant
        ↓
potentially direct/config-driven

BEHAVIORAL
events, data fetching, business logic, routing,
permissions, state transitions
        ↓
Developer / engineering workflow
```

The Intent Classifier routes presentation-only intents to configuration; the
rest goes to the engineering workflow. This matters enormously if Visual Edit
ever extends beyond Activity Room.

### VE-5 — Apply (design only, not implemented)

**The first write boundary.** VE-5 asks:

> Can Vestara safely apply one confirmed presentation change and make the
> running application match the preview?

**Design — configuration-first, minimal scope.**

- Introduce a small declarative presentation configuration consumed by the
  Activity components:

  ```text
  ActivityMessage:
    alignment: left
    density: compact
    presentation: minimal

  OrganizationalEvent:
    alignment: center
    density: compact
    presentation: minimal
  ```

- When the Director visually edits, the Intent Classifier checks whether the
  change is presentation-only. If yes, it produces a **Visual Configuration**
  update that React renders directly — no TSX rewrite.

- **Constraint:** the first VE-5 experiment applies exactly **one confirmed
  presentation intent to one target/property set** (e.g., Activity Message
  alignment on the instance or a config-level variant). Reversible. Before/
  after preview evidence retained. Behavioral changes are explicitly out of
  scope.

### VE-6 — Verify (design, the loop closer)

After VE-5 applies something, the verifier compares the intended preview
against the running UI and must be able to say:

```text
Target        Organizational Event          MATCH
Alignment     expected center / observed    MATCH
Density       expected compact / observed   MATCH
Presentation  expected minimal / observed   MATCH
Scope         expected organizational-event; unrelated Activity Messages changed: 0

Result: VERIFIED
```

"Did anything else change?" is as important as verifying the requested thing
changed. This closes the epistemic loop:

> I know what you pointed at. I know what you changed. I can explain what I
> think you mean. I know where that belongs architecturally. I can apply it
> through an appropriate mechanism. And I can demonstrate that the resulting
> application matches what you asked for without unexpectedly changing
> something else.

### Revised phase sequence

```text
VE-1 Ground   → VE-2 Manipulate → VE-3 Understand Intent
→ VE-4 Resolve Architecture + Propose → VE-5 Apply → VE-6 Verify
```

### VE-5 — Apply (COMPLETE)

**The first write boundary.** Hypothesis: can Vestara safely and reversibly
cross from confirmed human intent into a real application mutation?

**Mechanism (configuration-first):** a tiny declarative visual configuration
(`visual-config.ts`) keyed by instance id, consumed by the Activity components
through React (`overrideStyle`) — **no TSX rewrite**. Apply preserves Design
Intent scope exactly: instance scope is representable; any other scope is
**refused** ("Cannot safely apply this scope yet") rather than broadened. The
previous value is retained as an `AppliedChange` record (target, instance,
property, before, after, scope, appliedBy, mechanism) and **Undo** restores it.

**Result — the write boundary is proven.**

- The running React UI reflects the configuration (the applied alignment
  persists after Visual Edit is toggled off — it is config-driven, not a
  transient preview mutation).
- Source component TSX is not rewritten (the message's variant class is
  unchanged).
- Undo restores the previous rendered state.
- Refusal is exercised: a component without an instance (Activity Composer)
  cannot be applied with instance scope — Vestara refuses rather than
  broadening.
- The acceptance criteria (1–10) from review are met.

**VE-6 — Verify (next, not implemented):** compare intended preview vs running
UI per dimension, including "did anything else change?".

## 1. Problem Statement

Current AI-driven UI modification relies heavily on natural-language
translation:

```text
Human visual perception
        ↓
Natural-language description
        ↓
AI interpretation
        ↓
Source-code modification
        ↓
Rendered application
        ↓
Human visual judgment
        ↺
```

The Activity Room experiment demonstrated that this loop can be expensive and
imprecise even when:

- the human provides screenshots;
- a reference UI is supplied;
- the model supports image understanding;
- implementation requirements are explicit;
- structural/E2E tests pass;
- visual fixtures pass.

The resulting interface can still fail to represent the user's intended
experience.

### Experimental finding

**Status: Failed experiment / useful evidence**

> Natural-language instructions plus screenshots did not converge on the
> intended Activity Room UI with acceptable precision, cost, and human effort.

This does **not** establish that AI cannot perform UI work. It establishes
that natural language and screenshots alone are an insufficiently precise
interaction mechanism for some visual modifications.

### Product hypothesis

Vestara should allow humans to manipulate the interface directly and convert
those manipulations into structured design intent that agents can implement,
verify, and preserve.

The goal is not:

> AI generates whatever UI it thinks the human wants.

The goal is:

> **The human edits the experience. Vestara handles the engineering.**

## 2. Core Principle

Visual Edit Mode must not require the user to understand frontend
implementation.

The human should work with concepts such as:

```text
Move        Resize      Align        Hide        Show
Compact     Spacious    Quiet       Prominent
Icon only   Apply to similar   Match this   Undo
Preview     Accept
```

Not:

```text
display: flex
justify-content: flex-end
max-width: 65%
padding-inline
Tailwind classes
React component props
CSS selectors
DOM hierarchy
```

Those remain implementation concerns for Developer.

## 3. Architectural Boundary

The most important architectural decision:

> **Direct visual manipulation must produce Design Intent, not arbitrary
> permanent CSS mutations.**

Example:

```text
Human action
    │
    ▼
Resize ActivityComposer
    │
    ▼
Visual Edit Interpreter
    │
    ▼
Design Intent

target:     ActivityComposer
property:   density
desired:    compact
evidence:   previousHeight: 138  previewHeight: 82
scope:      component
    │
    ▼
Developer
    │
    ▼
Source implementation
    │
    ▼
Verification
    │
    ▼
Human approval
```

The visual editor therefore communicates intent to the engineering system
rather than becoming an alternative source-code editor.

## 4. Sources of Truth

Visual Edit Mode should maintain clear epistemic boundaries.

| Layer | Authority |
|---|---|
| Source code | Authoritative for the implemented application. |
| Design Intent | Authoritative for what the human requested. |
| Preview state | Temporary and disposable. |
| Rendered evidence | Evidence of what the implementation actually produced. |
| Human approval | Evidence that the implementation satisfied the intended experience. |

This avoids turning temporary browser manipulation into permanent
organizational truth.

## 5. Phase 0 — Preserve the Experiment

This should happen before implementation.

Create a Blueprint finding documenting the Activity Room experiment.

Record:

- original UI problem;
- screenshots/references provided;
- DeepSeek iterations;
- multimodal Luna experiment;
- significant token-cost difference;
- structural verification passing despite visual dissatisfaction;
- Director rejection of the resulting visual experience;
- conclusion;
- proposed Visual Edit hypothesis.

The important conclusion should be something close to:

> **Visual intent is not equivalent to visual reference, and structural visual
> verification is not equivalent to perceptual satisfaction.**

And:

> **Human effort must be considered part of AI-assisted UI modification
> success.**

Do not generalize beyond the evidence.

Status:

**Observation / hypothesis — not yet an architectural mandate.**

## 6. Phase 1 — Selection and Inspection

This should be the first implementation experiment.

Do **not** allow editing yet.

The purpose is to prove that Vestara can connect something the human sees to
something Developer understands.

When Visual Edit Mode is enabled, hovering over an editable region highlights
its boundary.

Clicking it selects the semantic component (e.g. `ActivityComposer`). Vestara
should resolve enough context to identify:

- semantic component;
- rendered element;
- component type;
- source ownership if available;
- parent/child relationship;
- current dimensions;
- applicable design tokens;
- editable capabilities.

The normal user should **not** see source paths by default. A technical-details
disclosure may show them.

### Phase 1 acceptance criterion

A human can point at a visible Activity Room element and Vestara can
unambiguously identify what they selected.

No source modification. No AI implementation. No persistence.

This phase proves **visual grounding**.

## 7. Phase 2 — Safe Preview Manipulation

Once selection works, introduce a very small manipulation vocabulary.

Initially support only:

- alignment;
- size;
- visibility;
- density;
- presentation.

Example controls:

```text
Alignment:      [ Left ] [ Center ] [ Right ]
Density:        [ Compact ] [ Comfortable ] [ Spacious ]
Presentation:   [ Text ] [ Icon + Text ] [ Icon Only ]
Visibility:     [ Visible ] [ Hidden ]
```

Resize handles may be introduced where appropriate.

Changes affect **preview state only**. Nothing modifies source code.

A prominent distinction should exist:

```text
PREVIEW MODE
Not yet applied
```

The human can:

```text
Undo      Reset      Apply
```

### Phase 2 acceptance criterion

The Director can visually manipulate the problematic Activity Room elements
into a substantially closer approximation of the desired interface without
describing CSS or implementation details.

This is the first critical hypothesis test.

## 8. Phase 3 — Structured Design Intent

Once the user selects **Apply**, Vestara should convert the preview delta into
structured intent.

Conceptually:

```ts
interface DesignIntent {
  target: DesignTarget;
  operation: DesignOperation;
  scope: DesignScope;
  before: DesignState;
  desired: DesignState;
  provenance: DesignProvenance;
}
```

Possible operations initially:

```text
align
resize
set-density
set-presentation
set-visibility
```

Possible scopes:

```text
instance
component
semantic-variant
```

If the Director moves one message right, Vestara should be able to ask:

> Apply only to this message, or all Director messages?

That becomes `instance` versus `semantic-variant: human-message`. The human
answers a human-level question; Vestara determines the engineering
implications.

### Phase 3 acceptance criterion

A visual manipulation can be represented without storing arbitrary CSS or
implementation-specific instructions.

## 9. Phase 4 — Developer Handoff

Only now does AI implementation enter the loop.

Developer receives:

```text
Design Intent
+ component context
+ current implementation
+ before screenshot
+ preview target
```

Instead of receiving "make this cleaner", Developer might receive:

```text
Target:    ActivityMessage
Variant:   human-message
Current:   alignment=start  presentation=bubble  maxWidth=current
Desired:   alignment=end    presentation=bubble  width=content  maxWidth=65%
Scope:     all human-message variants
```

Developer decides how that intent should correctly map into React/Tailwind /
component architecture.

This preserves the role boundary:

> **Director determines desired experience. Developer determines
> implementation.**

### Important constraint

Vestara must not require the human's preview manipulation to map one-to-one to
generated CSS. Developer may determine that the correct implementation
requires changing component variants, extracting shared behavior, modifying
design tokens, adjusting responsive behavior, or changing component
composition.

The preview communicates **desired outcome**, not implementation.

## 10. Phase 5 — Visual Verification

This phase connects directly to Vestara's existing evidence philosophy.

After Developer implements the intent:

```text
Implementation
      ↓
Launch application
      ↓
Navigate to target
      ↓
Render same viewport/state
      ↓
Capture screenshot
      ↓
Compare with intended preview
```

Verification should combine multiple evidence types.

### Structural evidence

Bounding rectangles, alignment, dimensions, visibility, computed layout,
semantic variant.

### Rendered evidence

Before and after screenshots.

### Behavioral evidence

Interaction still works (Send still sends, Inspect still opens, correction
still works, scrolling remains correct).

### Human evidence

The Director can approve:

```text
Accept            Needs adjustment            Reject
```

> A passing Playwright test does not establish visual acceptance.

## 11. Phase 6 — Correction Loop

If the Director selects `Needs adjustment`, Vestara should not restart from
zero. The existing Design Intent remains available; the human selects the
remaining problem and adjusts it.

```text
Previous intent: Human messages → right
Result: Correct alignment, but bubble too wide.
New adjustment: Width → content-sized
```

Vestara now has:

```text
Intent A: alignment=end
Intent B: width=content
```

Developer receives the delta — much more precise than another paragraph.

## 12. Phase 7 — Apply to Similar

The human modifies one object (e.g. a Developer message). Vestara recognizes
its semantic class (`agent-message`) and asks:

> Apply this appearance to all Agent messages?

Likewise: Director message → all Human messages; Verifier event → all
Organizational events; Send button → this component only.

The user manipulates an example. Vestara generalizes the intent. Developer
implements the generalized rule.

## 13. Phase 8 — Vestara Design Knowledge

Deliberately postponed until the earlier experiment succeeds.

Approved visual decisions can eventually become organizational design
knowledge:

```text
Activity Room
  Human messages       → align end, content-sized, max width 65%
  Agent messages       → align start, content-sized, max width 65%
  Organizational events → centered, muted, minimal presentation
  Composer             → compact, inline send action
```

Future agents retrieve those approved rules so Developer doesn't reinvent the
visual grammar. This creates a durable Vestara Design Language derived from
approved experience — but only from repeated evidence, not one experiment.

## 14. Phase 9 — Natural Language + Direct Manipulation

Natural language becomes much more powerful when grounded by selection.

- Select `ActivityComposer` and say "Make this smaller" — Vestara knows what
  *this* means.
- Select component A and reference component B, say "Make this look like that"
  — two concrete targets.

Combined multimodal interaction:

```text
Selection + Direct manipulation + Natural language
+ Screenshot/reference + Component semantics
```

## 15. Phase 10 — Broader Application Editing

Only after Activity Room proves the concept should Visual Edit Mode become
workspace-wide.

Potential future capabilities: reorder sections, resize panels, change
component variants, responsive previews, mobile/tablet adjustments, typography
controls, design-token changes, reusable style propagation, accessibility
feedback, component replacement, layout templates.

**Out of scope for the initial experiment.** Activity Room remains the
laboratory.

## 16. Safety and Engineering Guardrails

Visual Edit Mode should never bypass normal engineering controls. A visual
request may have consequences the human cannot see (e.g. hiding a field could
affect accessibility, validation, workflow completion, or compliance).

```text
Human intent → Design Intent → Engineering analysis
→ Implementation → Verification → Human approval
```

Not:

```text
Human drags thing → Production CSS changed
```

Undo must always be available before acceptance. Existing source control,
verification, evidence, approval, and recovery mechanisms remain intact.

## 17. Resource and Model Strategy

The model experiment should influence — but not dictate — the architecture.

Visual Edit Mode reduces dependence on expensive multimodal reasoning because
much of the visual intent becomes structured. A cheaper Developer could receive
`target / desired geometry / semantic scope / component context / preview
evidence` rather than needing to infer everything from pixels.

Expensive visual models are reserved for tasks where visual reasoning adds
value: perceptual review, reference interpretation, accessibility/contrast
analysis, ambiguous visual comparison.

This aligns model cost with required capability.

## 18. Success Metrics

Do not measure success only by tests passing.

For the Activity Room experiment, capture:

```text
Director interactions
Developer iterations
Screenshots required
Natural-language corrections
Elapsed time
Token/model cost
Visual acceptance
Behavioral regressions
```

The most important metric:

> **Human effort to reach an accepted visual result.**

The baseline already exists: today's screenshot/prompt/model-switching
experiment. Visual Edit Mode should beat it materially.

## 19. First Real Experiment

After Phases 0–5 exist, use the **current Activity Room**. Do not manufacture
another test interface.

The Director should attempt to fix the exact unresolved problems:

1. Agent messages left.
2. Director messages right.
3. Organizational activity centered and quiet.
4. Message bubbles content-sized.
5. Composer reduced.
6. Send icon-only and correctly positioned.

This time, accomplish those primarily through Visual Edit Mode.

A/B experiment:

```text
Experiment A: Natural language + screenshots   → FAILED convergence target
Experiment B: Direct manipulation + structured intent → ?
```

If B materially reduces human effort and produces an accepted result, Visual
Edit Mode has earned further investment. If it doesn't, we revise the
hypothesis.

## Recommended implementation sequence

Do **not** send this entire architecture as one implementation task.

- **VE-0 — Preserve experiment and ratify boundaries.** No implementation.
- **VE-1 — Selection/inspection prototype.** Prove browser element → semantic
  component grounding. Stop and review.
- **VE-2 — Preview manipulation.** Alignment, density, visibility,
  presentation, basic resize. No source mutation. Stop and conduct the human
  test.
- **VE-3 — Design Intent contract.** Convert approved preview delta into
  structured intent. Stop and inspect the resulting data ourselves.
- **VE-4 — Developer handoff.** Let Developer translate one Activity Room
  intent into real source changes. Stop.
- **VE-5 — Evidence and approval loop.** Before/after render + structural
  evidence + behavior + Director acceptance.

Then — and only then — decide whether `Apply to similar`, durable design
knowledge, or broader Visual Edit capabilities have earned implementation.

**VE-2 is the decisive experiment.** If a human can enter Visual Edit Mode,
select the Activity Room pieces, manipulate them naturally, and feel "yes, this
is much easier", we have something. If not, we stop before building an entire
visual engineering subsystem around a hypothesis.

## Status

**Proposed — experimental direction with explicit falsification points.**

Recorded before implementation. This is **not** an implementation mandate and
**not** an architectural decision. It is the next hypothesis to test, grounded
in a failed convergence experiment and the human-effort metric it exposed.
