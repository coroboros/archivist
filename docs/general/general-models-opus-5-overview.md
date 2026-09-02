---
title: "Overview"
source: "https://platform.claude.com/docs/en/models/opus-5/overview"
category: "general"
generated: true
---
---
title: Claude Opus 5
url: https://platform.claude.com/docs/en/models/opus-5/overview
description: "Claude Opus 5 at a glance: what it's for, model IDs on every platform, context window, output limits, pricing, availability, and the guides and resources for building with it."
---

**Latest.** Released July 24, 2026.

For complex agentic coding and enterprise work

Model ID: `claude-opus-5`

Context window: 1M tokens · Max output: 128K tokens · Input pricing: $5 / MTok · Output pricing: $25 / MTok

[Announcement](https://www.anthropic.com/news/claude-opus-5) · [What’s new](./general-models-opus-5-whats-new-opus-5.md) · [Migration guide](./general-models-opus-5-migration-guide.md)

## Overview

Claude Opus 5 is a step-change improvement over Claude Opus 4.8, with the largest gains in deep reasoning, agentic and long-horizon tasks, and test-time compute scaling. This page summarizes everything new in Claude Opus 5, including mid-conversation tool changes and two breaking changes for code running on Claude Opus 4.8: thinking is on by default, and thinking can be disabled only at effort `high` or below.

[What's new in Claude Opus 5](./general-models-opus-5-whats-new-opus-5.md)

## How it compares

| Model                                                                             | Context | Max output | Price / MTok | Latency  | Thinking             | Default effort | Knowledge cutoff |
| :-------------------------------------------------------------------------------- | :------ | :--------- | :----------- | :------- | :------------------- | :------------- | :--------------- |
| [Claude Fable 5.1](./general-models-fable-5-1-overview.md) | 1M      | 128K       | $10 / $50    | Slower   | Adaptive (always on) | `high`         | Jun 2026         |
| **Claude Opus 5** (this model)                                                    | 1M      | 128K       | $5 / $25     | Moderate | Adaptive             | `high`         | May 2026         |
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

| Platform                                                                                               | Model ID                  |
| :----------------------------------------------------------------------------------------------------- | :------------------------ |
| Claude API                                                                                             | `claude-opus-5`           |
| [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md)       | `anthropic.claude-opus-5` |
| [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md)              | `claude-opus-5`           |
| [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md) | `claude-opus-5`           |

### Pricing

| Feature                                                                                | Value                                                               |
| :------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| Input                                                                                  | $5 / MTok                                                           |
| Output                                                                                 | $25 / MTok                                                          |
| [5m cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $6.25 / MTok                                                        |
| [1h cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $10 / MTok                                                          |
| [Cache read](../build-with-claude/build-with-claude-prompt-caching.md)     | $0.50 / MTok                                                        |
| [Batch API](../build-with-claude/build-with-claude-batch-processing.md)    | 50% discount on input and output                                    |
| Full price list                                                                        | [Pricing](../about-claude/about-claude-pricing.md) |

### Capabilities

| Feature                                                                                                                     | Value                  |
| :-------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| [Context window](../build-with-claude/build-with-claude-context-windows.md)                                     | 1M tokens              |
| Max output                                                                                                                  | 128K tokens            |
| [Max output (Batch API, beta)](../build-with-claude/build-with-claude-batch-processing.md#extended-output-beta) | 300K tokens            |
| [Thinking](../build-with-claude/build-with-claude-thinking.md)                                                  | Adaptive               |
| [Default effort](../build-with-claude/build-with-claude-effort.md)                                              | `high`                 |
| Comparative latency                                                                                                         | Moderate               |
| Input → output                                                                                                              | Text and images → text |
| Reliable knowledge cutoff                                                                                                   | May 2026               |
| Training data cutoff                                                                                                        | May 2026               |

### Availability

| Feature                                                                       | Value                                                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Status](../about-claude/about-claude-model-deprecations.md) | Active (latest)                                                                                                                                                                                                                                                                                                 |
| Released                                                                      | July 24, 2026                                                                                                                                                                                                                                                                                                   |
| Retirement                                                                    | Not sooner than July 24, 2027                                                                                                                                                                                                                                                                                   |
| Platforms                                                                     | Claude API, [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md), [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md) |

## Good to know

* On the [Message Batches API](../build-with-claude/build-with-claude-batch-processing.md#extended-output-beta), Claude Opus 5 supports up to 300k output tokens with the `output-300k-2026-03-24` beta header.
* The minimum cacheable prompt length is 512 tokens. See [Prompt caching](../build-with-claude/build-with-claude-prompt-caching.md#cache-limitations).
* Query limits and capabilities programmatically with the [Models API](../api/api-models-list.md).

## Resources

<CardGroup cols={3}>
  <Card title="Prompting Claude Opus 5" icon="lightbulb" href="../build-with-claude/build-with-claude-prompt-engineering-prompting-claude-opus-5.md">
    Model-specific prompting guidance.
  </Card>

  <Card title="Effort" icon="sliders" href="../build-with-claude/build-with-claude-effort.md">
    Effort defaults to `high` on Claude Opus 5 and matters more than on earlier models. Choose a level per workload.
  </Card>

  <Card title="Adaptive thinking" icon="brain" href="../build-with-claude/build-with-claude-thinking.md">
    On by default. Disabling thinking requires effort `high` or below.
  </Card>

  <Card title="Fast mode" icon="lightning" href="../build-with-claude/build-with-claude-fast-mode.md">
    Lower-latency Claude Opus 5 on the Claude API (research preview), priced separately.
  </Card>
</CardGroup>

## Reference

<CardGroup cols={3}>
  <Card title="System prompt" icon="text" href="../release-notes/release-notes-system-prompts.md">
    The system prompt Claude Opus 5 uses on claude.ai and the Claude apps.
  </Card>

  <Card title="System card" icon="file" href="https://www.anthropic.com/claude-opus-5-system-card">
    Safety evaluations and deployment decisions for Claude Opus 5.
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
