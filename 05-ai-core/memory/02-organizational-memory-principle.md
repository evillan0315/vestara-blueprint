---
title: "Organizational Memory Principle — State Transitions and Relationships"
volume: "05-ai-core"
book: "Book 3: AI Architecture"
version: "0.1.0"
status: "proposed"
owner: "@ai-engineer"
last-reviewed: "2026-08-08"
tags: ["memory", "state", "relationships", "provenance", "principle"]
---

# Organizational Memory Principle

> **Don't store only memories. Store state transitions and relationships between them.**

## Principle

Vestara should not treat organizational memory as a collection of historical
messages, summaries, or retrieved facts.

A durable organization must preserve **how its state changed over time** and
**how those changes relate to one another**.

Examples of what must be preserved as transitions and relationships:

- a decision **superseding** an earlier decision;
- an authorization **scoped to** a specific experiment;
- an authorization **expiring** when that experiment ends;
- a finding **supported by** evidence;
- a recommendation **receiving** a Director disposition;
- an assignment **resumed from** a durable checkpoint;
- an implementation **producing** an artifact;
- a Reviewer finding **causing** completion to be withheld;
- a recovery operation **restoring** a previous trusted state.

## The distinction

```text
Memory            "What happened before?"
State transition "What changed?"
Relationship     "Why does this record matter to the current state?"
```

A participant should not need to retrieve every historical statement and
infer which one remains valid. Vestara should instead be capable of
reconstructing the **effective organizational state**.

```text
Decision A          ↓ superseded_by   Decision B
Authorization X     ↓ scoped_to       Experiment 17
Experiment 17       ↓ ended           Authorization X → EXPIRED
Finding F           ↓ supported_by    Evidence E
Recommendation R    ↓ disposition     ACCEPTED
Assignment T        ↓ resumed_from    Checkpoint C
```

This allows future participants and replacement models to distinguish:

- historical truth from current truth;
- active authority from expired authority;
- findings from conclusions;
- recommendations from decisions;
- observations from verified outcomes;
- previous state from effective state.

## Design intent

The goal is not to give every AI participant perfect memory. The goal is to
make the organization capable of reconstructing the relevant current context
even when:

- models change;
- participants restart;
- conversations become very long;
- context windows are finite;
- months of history accumulate;
- some conversations remain private;
- decisions are superseded;
- authorization changes;
- autonomous work occurs while humans are offline.

## Guiding rule

> **Models may retrieve and interpret memory for navigation. Durable
> organizational state remains the authority for what is currently true.**

This separates **AI recollection** from **organizational truth**: recollection
helps a participant navigate; durable state decides what is currently true.

## Status

**Blueprint principle / architectural direction.**

This does not yet prescribe a storage engine, graph schema, event model,
context-assembly algorithm, or implementation milestone. Those decisions
should emerge from further experiments and evidence.

This is **not authorization to implement** an organizational graph, a new
event schema, or a memory subsystem. It is the concept Vestara should preserve
while experiments continue producing evidence.
