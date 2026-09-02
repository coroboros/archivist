---
title: "How it compares to the current lineup"
source: "https://platform.claude.com/docs/en/models/opus-4-6/overview"
category: "general"
generated: true
---
---
title: Claude Opus 4.6
url: https://platform.claude.com/docs/en/models/opus-4-6/overview
description: "Claude Opus 4.6 reference: lifecycle status, model IDs on every platform, context window, output limits, pricing, and migration resources. Claude Opus 4.6 is a legacy model; Claude Opus 5 is the current Opus model."
---

**Legacy.** Released February 5, 2026.

Although Claude Opus 4.6 is still available, you should consider migrating to Claude Opus 5 for improved performance. [See Claude Opus 5](./general-models-opus-5-overview.md) · [Migrate to Claude Opus 5](./general-models-opus-5-migration-guide.md#migrating-from-claude-opus-46)

Model ID: `claude-opus-4-6`

Context window: 1M tokens · Max output: 128K tokens · Input pricing: $5 / MTok · Output pricing: $25 / MTok

[Announcement](https://www.anthropic.com/news/claude-opus-4-6)

## How it compares to the current lineup

| Model                                                                             | Context | Max output | Price / MTok | Thinking                       | Default effort | Knowledge cutoff |
| :-------------------------------------------------------------------------------- | :------ | :--------- | :----------- | :----------------------------- | :------------- | :--------------- |
| [Claude Fable 5.1](./general-models-fable-5-1-overview.md) | 1M      | 128K       | $10 / $50    | Adaptive (always on)           | `high`         | Jun 2026         |
| [Claude Opus 5](./general-models-opus-5-overview.md)       | 1M      | 128K       | $5 / $25     | Adaptive                       | `high`         | May 2026         |
| **Claude Opus 4.6** (this model)                                                  | 1M      | 128K       | $5 / $25     | Adaptive (extended deprecated) | `high`         | May 2025         |
| [Claude Sonnet 5](./general-models-sonnet-5-overview.md)   | 1M      | 128K       | $2 / $10     | Adaptive                       | `high`         | Jan 2026         |
| [Claude Haiku 4.5](./general-models-haiku-4-5-overview.md) | 200K    | 64K        | $1 / $5      | Extended                       | —              | Feb 2025         |

* **Context:** 1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words in 1M tokens. 200k tokens is roughly 150k words.
* **Max output:** Synchronous Messages API limit. On the Message Batches API, Claude Opus 5, Claude Sonnet 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 support up to 300k output tokens with the output-300k-2026-03-24 beta header.
* **Price / MTok:** Input / output, base price per million tokens. Batch API requests are 50% off; prompt caching reads cost 10% of the base input price. See Pricing for the full list.
* **Thinking:** Adaptive thinking lets the model decide how much to think, steered by effort. Extended thinking is the manual budget\_tokens mode on earlier models.
* **Default effort:** The effort parameter’s default on the Claude API. Models without a value don’t support the parameter.
* **Knowledge cutoff:** Reliable knowledge cutoff: the date through which the model’s knowledge is most extensive and reliable.

## Specifications

### Model IDs

| Platform                                                                                                              | Model ID                       |
| :-------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| Claude API                                                                                                            | `claude-opus-4-6`              |
| [Amazon Bedrock (InvokeModel)](../build-with-claude/build-with-claude-claude-on-amazon-bedrock-legacy.md) | `anthropic.claude-opus-4-6-v1` |
| [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md)                             | `claude-opus-4-6`              |
| [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md)                | `claude-opus-4-6`              |
| [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md)                | `claude-opus-4-6`              |

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

| Feature                                                                                                                     | Value                          |
| :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| [Context window](../build-with-claude/build-with-claude-context-windows.md)                                     | 1M tokens                      |
| Max output                                                                                                                  | 128K tokens                    |
| [Max output (Batch API, beta)](../build-with-claude/build-with-claude-batch-processing.md#extended-output-beta) | 300K tokens                    |
| [Thinking](../build-with-claude/build-with-claude-thinking.md)                                                  | Adaptive (extended deprecated) |
| [Default effort](../build-with-claude/build-with-claude-effort.md)                                              | `high`                         |
| Input → output                                                                                                              | Text and images → text         |
| Reliable knowledge cutoff                                                                                                   | May 2025                       |
| Training data cutoff                                                                                                        | Aug 2025                       |

### Availability

| Feature                                                                       | Value                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Status](../about-claude/about-claude-model-deprecations.md) | Active (legacy)                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Released                                                                      | February 5, 2026                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Retirement                                                                    | Not sooner than February 5, 2027                                                                                                                                                                                                                                                                                                                                                                                                             |
| Platforms                                                                     | Claude API, [Amazon Bedrock (InvokeModel)](../build-with-claude/build-with-claude-claude-on-amazon-bedrock-legacy.md), [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md), [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md) |

## Resources

<CardGroup cols={3}>
  <Card title="Migrate to Claude Opus 5" icon="arrows-left-right" href="./general-models-opus-5-migration-guide.md">
    What changes when moving from Claude Opus 4.6 and earlier Opus models to Claude Opus 5.
  </Card>

  <Card title="Claude Opus 5" icon="arrow-right" href="./general-models-opus-5-overview.md">
    The current Opus model: overview, specs, and resources.
  </Card>
</CardGroup>

## Reference

<CardGroup cols={3}>
  <Card title="System prompt" icon="text" href="../release-notes/release-notes-system-prompts.md">
    The system prompt Claude Opus 4.6 uses on claude.ai and the Claude apps.
  </Card>

  <Card title="System card" icon="file" href="https://www.anthropic.com/claude-opus-4-6-system-card">
    Safety evaluations and deployment decisions for Claude Opus 4.6.
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

  <Card title="Amazon Bedrock (Opus 4.6 and earlier)" icon="cloud" href="../build-with-claude/build-with-claude-claude-on-amazon-bedrock-legacy.md">
    Claude Opus 4.6 uses the InvokeModel Bedrock integration and Bedrock-style model IDs.
  </Card>
</CardGroup>
