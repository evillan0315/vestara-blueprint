---
title: "VDS Conversation UI"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "conversation", "chat", "ui"]
---

# VDS Conversation UI

Visual specification for chat surfaces: message bubbles (human vs. agent), code blocks, artifact previews, typing indicators, streaming text presentation, and input composer design.

## Transcript semantics

Conversation is an attributable ordered transcript, not necessarily bubbles.
Each entry carries participant label, content, and error/cancelled/streaming
state. Streaming chunks coalesce into one response. Code and commands remain
copyable. The composer supports multiline input and safe paste. Submission is
explicit; paste never triggers execution.

For engineering prompts, conversation MAY transition into a routing preflight
or governed confirmation. That transition MUST be visible and MUST preserve the
original prompt in history.
