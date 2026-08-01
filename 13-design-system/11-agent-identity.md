---
title: "VDS Agent Identity"
volume: "13-design-system"
book: "Book 4: Engineering"
version: "1.1.0"
status: "draft"
owner: "@frontend-engineer"
last-reviewed: "2026-08-01"
next-review: "2027-02-01"
tags: ["vds", "agent", "identity", "presence"]
---

# VDS Agent Identity

How AI agents present themselves visually — avatar styles, status indicators, typing indicators, name display, and agent-to-agent visual differentiation.

VDS MUST distinguish role, participant/agent definition, active agent instance,
provider, and model. A provider logo or model name MUST NOT stand in for agent
identity. Terminal surfaces use attributable text such as:

```text
Role       Developer
Agent      developer-07
Provider   opencode
Model      gpt-5.6-sol
State      Paused — approval required
```

Concurrent agents require distinct instance identifiers. State labels MUST
remain meaningful without avatar, color, or animation.
