---
title: "Code execution with MCP: Building more efficient agents"
source: "https://www.anthropic.com/engineering/code-execution-with-mcp"
category: "insights"
author: "Anthropic"
date: "2025-11-04"
tags: ["mcp", "claude-code", "anthropic", "context-economy", "code-execution", "progressive-disclosure", "agents", "tool-use"]
---

# Code execution with MCP: Building more efficient agents

*Distilled from Anthropic Engineering — [Code execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp), November 4, 2025.*

MCP is a foundational protocol for connecting agents to tools and systems. The inefficiency appears at scale, in how an agent loads and uses those tools, not in the protocol itself.

## The two context costs

**Tool definitions.** Connecting an agent to many MCP servers loads every tool definition into the context window up front. Agents wired to thousands of tools can process hundreds of thousands of tokens before reading the request.

**Intermediate results.** Every tool result passes back through the model. A 50,000-token document fetched by one tool and passed to another flows through the context twice. Large results can exceed the window and break the run.

## Progressive disclosure via code

Present MCP tools as code on a filesystem instead of as direct tool calls. Each tool is a file, for example `servers/google-drive/getDocument.ts`. The agent lists `./servers/` to find servers, then reads only the tool files it needs. Definitions load on demand rather than all up front. An optional `search_tools` call returns names, descriptions, or full schemas by detail level.

The agent then calls tools in code:

```ts
await gdrive.getDocument({ documentId: 'abc123' })
```

## What this buys

- **Token reduction.** One reported case drops tool-definition overhead from 150,000 tokens to 2,000, a 98.7% cut.
- **Filtering before the model sees data.** A 10,000-row sheet is filtered in the execution environment; the model sees five rows.
- **Control flow.** Loops, conditionals, and error handling run as code rather than as model turns.
- **Privacy.** Intermediate results stay in the execution environment. Sensitive values can be tokenized (`[EMAIL_1]`, `[PHONE_1]`) and untokenized via a lookup in the MCP client, never passing through the model.
- **State and reuse.** Intermediate results persist to files; reusable functions are saved as skills.

## The tradeoff

Code execution adds its own complexity. Running model-generated code requires a secure sandbox with resource limits and monitoring, operational overhead that direct tool calls avoid. Anthropic frames it as a weighing: reduced token cost, lower latency, and better tool composition against that implementation cost.
