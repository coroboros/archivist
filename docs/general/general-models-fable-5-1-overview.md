---
title: "Overview"
source: "https://platform.claude.com/docs/en/models/fable-5-1/overview"
category: "general"
generated: true
---
---
title: Claude Fable 5.1
url: https://platform.claude.com/docs/en/models/fable-5-1/overview
description: "Claude Fable 5.1 at a glance: what it's for, model IDs on every platform, context window, output limits, pricing, availability, and resources for building with it."
---

**Latest.** Released September 1, 2026.

For demanding reasoning and long-horizon agentic work

Model ID: `claude-fable-5-1`

Context window: 1M tokens · Max output: 128K tokens · Input pricing: $10 / MTok · Output pricing: $50 / MTok

[Announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1) · [What’s new](./general-models-fable-5-1-whats-new-fable-5-1.md) · [Migration guide](./general-models-fable-5-1-migration-guide.md)

## Overview

Claude Fable 5.1 extends Claude Fable 5 at the same input and output prices, with cache reads at a quarter of the cost, and brings stronger long-running agentic coding, multistep research, and document, spreadsheet, and slide work. For most workloads, start with Claude Opus 5 (see [Choosing a model](../about-claude/about-claude-models-choosing-a-model.md)). Use Claude Fable 5.1 for demanding reasoning and long-horizon agentic work, or when your evals on Claude Opus 5 at higher effort still fall short. Claude Mythos 5.1 offers the same capabilities to [Project Glasswing](https://anthropic.com/glasswing) participants only.

If you already call Claude Fable 5, three changes are breaking: [forced tool use returns an error](./general-models-fable-5-1-whats-new-fable-5-1.md#forced-tool-use-is-not-supported), [earlier models can't read its thinking blocks](./general-models-fable-5-1-whats-new-fable-5-1.md#thinking-blocks-are-tied-to-the-model-that-produced-them), and [editing earlier turns invalidates thinking blocks](./general-models-fable-5-1-whats-new-fable-5-1.md#editing-earlier-turns-invalidates-thinking-blocks). Five are additive: [per-message effort](./general-models-fable-5-1-whats-new-fable-5-1.md#change-effort-mid-conversation-beta) (beta), [turn-scoped system messages](./general-models-fable-5-1-whats-new-fable-5-1.md#turn-scoped-system-messages-beta) (beta), [readable progress updates between tool calls](./general-models-fable-5-1-whats-new-fable-5-1.md#progress-updates-between-tool-calls-beta) (`display: "updates"`, beta), a [lower cache read price](./general-models-fable-5-1-whats-new-fable-5-1.md#pricing), and [content provenance](./general-models-fable-5-1-whats-new-fable-5-1.md#content-provenance).

[What's new in Claude Fable 5.1](./general-models-fable-5-1-whats-new-fable-5-1.md)

## Claude Fable 5.1 and Claude Mythos 5.1

[Claude Mythos 5.1](./general-models-mythos-5-1-overview.md) offers the same capabilities by invitation only, as part of [Project Glasswing](https://anthropic.com/glasswing). It shares Claude Fable 5.1's specifications and pricing. For access, contact your Anthropic, AWS, or Google Cloud account team.

## How it compares

| Model                                                                             | Context | Max output | Price / MTok | Latency  | Thinking             | Default effort | Knowledge cutoff |
| :-------------------------------------------------------------------------------- | :------ | :--------- | :----------- | :------- | :------------------- | :------------- | :--------------- |
| **Claude Fable 5.1** (this model)                                                 | 1M      | 128K       | $10 / $50    | Slower   | Adaptive (always on) | `high`         | Jun 2026         |
| [Claude Opus 5](./general-models-opus-5-overview.md)       | 1M      | 128K       | $5 / $25     | Moderate | Adaptive             | `high`         | May 2026         |
| [Claude Sonnet 5](./general-models-sonnet-5-overview.md)   | 1M      | 128K       | $2 / $10     | Fast     | Adaptive             | `high`         | Jan 2026         |
| [Claude Haiku 4.5](./general-models-haiku-4-5-overview.md) | 200K    | 64K        | $1 / $5      | Fastest  | Extended             | —              | Feb 2025         |

* **Context:** 1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words in 1M tokens. 200k tokens is roughly 150k words.
* **Max output:** Synchronous Messages API limit. On the Message Batches API, Claude Opus 5, Claude Sonnet 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 support up to 300k output tokens with the output-300k-2026-03-24 beta header.
* **Price / MTok:** Input / output, base price per million tokens. Batch API requests are 50% off; prompt caching reads cost 10% of the base input price. See Pricing for the full list.
* **Latency:** Comparative latency, relative to the current lineup, as published in the models overview. Actual latency depends on prompt length, output length, and thinking effort.
* **Thinking:** Adaptive thinking lets the model decide how much to think, steered by effort. Extended thinking is the manual budget\_tokens mode on earlier models.
* **Default effort:** The effort parameter’s default on the Claude API. Models without a value don’t support the parameter.
* **Knowledge cutoff:** Reliable knowledge cutoff: the date through which the model’s knowledge is most extensive and reliable.

## Specifications

### Model IDs

| Platform                                                                                               | Model ID                     |
| :----------------------------------------------------------------------------------------------------- | :--------------------------- |
| Claude API                                                                                             | `claude-fable-5-1`           |
| [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md)       | `anthropic.claude-fable-5-1` |
| [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md)              | `claude-fable-5-1`           |
| [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md) | `claude-fable-5-1`           |
| [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md) | `claude-fable-5-1`           |

### Pricing

| Feature                                                                                | Value                                                               |
| :------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| Input                                                                                  | $10 / MTok                                                          |
| Output                                                                                 | $50 / MTok                                                          |
| [5m cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $12.50 / MTok                                                       |
| [1h cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $20 / MTok                                                          |
| [Cache read](../build-with-claude/build-with-claude-prompt-caching.md)     | $0.25 / MTok                                                        |
| [Batch API](../build-with-claude/build-with-claude-batch-processing.md)    | 50% discount on input and output                                    |
| Full price list                                                                        | [Pricing](../about-claude/about-claude-pricing.md) |

### Capabilities

| Feature                                                                                 | Value                  |
| :-------------------------------------------------------------------------------------- | :--------------------- |
| [Context window](../build-with-claude/build-with-claude-context-windows.md) | 1M tokens              |
| Max output                                                                              | 128K tokens            |
| [Thinking](../build-with-claude/build-with-claude-thinking.md)              | Adaptive (always on)   |
| [Default effort](../build-with-claude/build-with-claude-effort.md)          | `high`                 |
| Comparative latency                                                                     | Slower                 |
| Input → output                                                                          | Text and images → text |
| Reliable knowledge cutoff                                                               | Jun 2026               |
| Training data cutoff                                                                    | Jun 2026               |

### Availability

| Feature                                                                       | Value                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Status](../about-claude/about-claude-model-deprecations.md) | Active (latest)                                                                                                                                                                                                                                                                                                                                                                                                         |
| Released                                                                      | September 1, 2026                                                                                                                                                                                                                                                                                                                                                                                                       |
| Retirement                                                                    | Not sooner than September 1, 2027                                                                                                                                                                                                                                                                                                                                                                                       |
| Platforms                                                                     | Claude API, [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md), [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md), [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md) |

## Resources

<CardGroup cols={3}>
  <Card title="Prompting Claude Fable 5.1" icon="lightbulb" href="../build-with-claude/build-with-claude-prompt-engineering-prompting-claude-fable-5-1.md">
    Model-specific prompting guidance for long-horizon and agentic work.
  </Card>

  <Card title="Migrating to Claude Fable 5.1" icon="arrow-right" href="./general-models-fable-5-1-migration-guide.md">
    What changes when you move from Claude Fable 5, Claude Opus 5, or Claude Opus 4.8.
  </Card>

  <Card title="Preserved thinking" icon="brain" href="../build-with-claude/build-with-claude-thinking.md">
    When this model's thinking blocks stay usable: across model switches and across changes to the conversation.
  </Card>

  <Card title="Per-message effort" icon="sliders" href="../build-with-claude/build-with-claude-effort.md">
    Change the effort level partway through a conversation without invalidating the prompt cache.
  </Card>

  <Card title="Refusals and fallback" icon="shield" href="../build-with-claude/build-with-claude-refusals-and-fallback.md">
    Handle classifier refusals and retry on another Claude model.
  </Card>

  <Card title="Adaptive thinking" icon="brain" href="../build-with-claude/build-with-claude-thinking.md">
    The only thinking mode on Claude Fable 5.1. Steer depth with `effort`.
  </Card>
</CardGroup>

## Reference

<CardGroup cols={3}>
  <Card title="System prompt" icon="text" href="../release-notes/release-notes-system-prompts-claude-fable-5-1.md">
    The system prompt Claude Fable 5.1 uses on claude.ai and the Claude apps.
  </Card>

  <Card title="System card" icon="file" href="https://www.anthropic.com/claude-fable-5-1-mythos-5-1-system-card">
    Safety evaluations and deployment decisions for Claude Fable 5.1 and Claude Mythos 5.1.
  </Card>

  <Card title="Pricing" icon="coins" href="../about-claude/about-claude-pricing.md">
    Full price list, including batch discounts and prompt caching rates.
  </Card>

  <Card title="Model IDs and versioning" icon="fingerprint" href="../about-claude/about-claude-models-model-ids-and-versions.md">
    How model IDs, aliases, and pinned snapshots work.
  </Card>

  <Card title="Model deprecations" icon="clock" href="../about-claude/about-claude-model-deprecations.md">
    Lifecycle status and retirement commitments for every Claude model.
  </Card>
</CardGroup>
