---
title: "Claude Managed Agents overview"
source: "https://platform.claude.com/docs/en/managed-agents/overview"
category: "managed-agents"
generated: true
---
# Claude Managed Agents overview

Pre-built, configurable agent harness that runs in managed infrastructure. Best for long-running tasks and asynchronous work.

---

Anthropic offers two ways to build with Claude, each suited to different use cases:

|                | Messages API                                                          | Claude Managed Agents                                                     |
| -------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **What it is** | Direct model prompting access                                         | Pre-built, configurable agent harness that runs in managed infrastructure |
| **Best for**   | Custom agent loops and fine-grained control                           | Long-running tasks and asynchronous work                                  |
| **Learn more** | [Messages API docs](../build-with-claude/build-with-claude-working-with-messages.md) | [Claude Managed Agents docs](./managed-agents-overview.md)            |

Claude Managed Agents provides the harness and infrastructure for running Claude as an autonomous agent. Instead of building your own agent loop, tool execution, and runtime, you get a fully managed environment where Claude can read files, run commands, browse the web, and run code securely. The harness supports built-in prompt caching, compaction, and other performance optimizations for high-quality, efficient agent outputs.

<Note>
  Claude Managed Agents is also available on Claude Platform on AWS, with some differences in feature availability and session behavior. See [Claude Managed Agents](../build-with-claude/build-with-claude-claude-platform-on-aws.md#claude-managed-agents) in the Claude Platform on AWS guide.
</Note>

<CardGroup cols={3}>
  <Card title="Quickstart" icon="play" href="./managed-agents-quickstart.md">
    Create your first agent session
  </Card>

  <Card title="Start a session" icon="code-brackets" href="./managed-agents-sessions.md">
    Create a session and send your first event
  </Card>

  <Card title="Reference" icon="book" href="./managed-agents-reference.md">
    Event types, rate limits, CLI flags, and other lookup tables
  </Card>
</CardGroup>

## Core concepts

Claude Managed Agents is built around four concepts:

| Concept         | Description                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Agent**       | The model, system prompt, tools, MCP servers, and skills                                                                      |
| **Environment** | Configuration for where sessions run: an Anthropic-managed cloud sandbox, or a self-hosted sandbox on your own infrastructure |
| **Session**     | A running agent instance within an environment, performing a specific task and generating outputs                             |
| **Events**      | Messages exchanged between your application and the agent (user turns, tool results, status updates)                          |

## How it works

<Steps>
  <Step title="Create an agent">
    Define the model, system prompt, tools, MCP servers, and skills. Create the agent once and reference it by ID across sessions.
  </Step>

  <Step title="Create an environment">
    Configure where the agent runs: a cloud sandbox, or a [self-hosted sandbox](./managed-agents-self-hosted-sandboxes.md) on your own infrastructure.
  </Step>

  <Step title="Start a session">
    Launch a session that references your agent and environment configuration.
  </Step>

  <Step title="Send events and stream responses">
    Send user messages as events. Claude autonomously runs tools and streams back results through server-sent events (SSE). Event history is persisted server-side and can be fetched in full.
  </Step>

  <Step title="Steer or interrupt">
    Send additional user events to guide the agent mid-execution, or interrupt it to change direction.
  </Step>
</Steps>

## When to use Claude Managed Agents

Claude Managed Agents is best for workloads that need:

* **Long-running execution:** Tasks that run for minutes or hours with multiple tool calls
* **Cloud infrastructure:** Secure sandboxes with pre-installed packages and network access
* **Self-hosted execution:** Sandboxes on infrastructure you control for compliance or data-residency requirements
* **Minimal infrastructure:** No need to build your own agent loop, sandbox, or tool execution layer
* **Stateful sessions:** Persistent filesystems and conversation history across multiple interactions
* **Scheduled execution:** Recurring agent runs on a cron schedule through [scheduled deployments](./managed-agents-scheduled-deployments.md)

## Supported tools

Claude Managed Agents gives Claude access to a set of built-in tools:

* **Bash:** Run shell commands in the sandbox
* **File operations:** Read, write, edit, glob, and grep files in the sandbox
* **Web search and fetch:** Search the web and retrieve content from URLs
* **MCP servers:** Connect to external tool providers

See [Tools](./managed-agents-tools.md) for the full list and configuration options.

## Beta access

<Note>
  Claude Managed Agents is in beta. All Managed Agents endpoints require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically. Behaviors may be refined between releases to improve outputs.
</Note>

To get started, you need:

1. A [Claude API key](/settings/keys)
2. The `managed-agents-2026-04-01` beta header on all requests
3. Access to Claude Managed Agents (enabled by default for all API accounts)

Within the beta, [MCP tunnels](../agents-and-tools/agents-and-tools-mcp-tunnels-overview.md) and [dreaming](./managed-agents-dreams.md) are in a more limited research preview. [Request access](https://claude.com/form/claude-managed-agents) to enable them.

Claude Managed Agents is stateful by design: sessions are long-running, resume cleanly after pauses, and store conversation history, sandbox state, and outputs server-side. Because of this, Managed Agents is not currently eligible for [Zero Data Retention](../manage-claude/manage-claude-api-and-data-retention.md#zero-data-retention-zdr-scope) or HIPAA Business Associate Agreement (BAA) coverage. You retain control over this data: you can [delete sessions](./managed-agents-session-operations.md#deleting-a-session), and separately delete any [files](../build-with-claude/build-with-claude-files.md#delete-a-file) you uploaded, at any time through the API. For eligibility across all features, see [API and data retention](../manage-claude/manage-claude-api-and-data-retention.md#feature-eligibility).

See [Rate limits](./managed-agents-reference.md#rate-limits) and [Branding guidelines](./managed-agents-reference.md#branding-guidelines) in the reference.
