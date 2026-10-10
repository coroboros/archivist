---
title: "How it compares to the current lineup"
source: "https://platform.claude.com/docs/en/models/haiku-4-5/overview"
category: "general"
generated: true
---
---
title: Claude Haiku 4.5
url: https://platform.claude.com/docs/en/models/haiku-4-5/overview
description: "Claude Haiku 4.5 reference: lifecycle status, model IDs on every platform, context window, output limits, pricing, and migration resources. Claude Haiku 4.5 is a legacy model; Claude Haiku 5.5 is the current Haiku model."
---

**Legacy.** Released October 15, 2025.

Although Claude Haiku 4.5 is still available, you should consider migrating to Claude Haiku 5.5. [See Claude Haiku 5.5](./general-models-haiku-5-5-overview.md) · [Migrate to Claude Haiku 5.5](./general-models-haiku-5-5-migration-guide.md)

Model ID: `claude-haiku-4-5-20251001`

Context window: 200K tokens · Max output: 64K tokens · Input pricing: $1 / MTok · Output pricing: $5 / MTok

[Announcement](https://www.anthropic.com/news/claude-haiku-4-5)

## How it compares to the current lineup

| Model                                                                               | Context | Max output | Price / MTok       | Thinking             | Default effort | Knowledge cutoff |
| :---------------------------------------------------------------------------------- | :------ | :--------- | :----------------- | :------------------- | :------------- | :--------------- |
| [Claude Fable 5.1](./general-models-fable-5-1-overview.md)   | 1M      | 128K       | $10 / $50          | Adaptive (always on) | `high`         | Jun 2026         |
| [Claude Opus 5.5](./general-models-opus-5-5-overview.md)     | 1M      | 128K       | $4 / $20           | Adaptive (always on) | `medium`       | Jun 2026         |
| [Claude Sonnet 5.5](./general-models-sonnet-5-5-overview.md) | 1M      | 128K       | $2 / $10           | Adaptive             | `high`         | Jun 2026         |
| [Claude Haiku 5.5](./general-models-haiku-5-5-overview.md)   | 1M      | 128K       | From $0.10 / $0.50 | Adaptive             | `medium`       | Jun 2026         |
| **Claude Haiku 4.5** (this model)                                                   | 200K    | 64K        | $1 / $5            | Extended             | —              | Feb 2025         |

* **Context:** 1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words in 1M tokens. 200k tokens is roughly 150k words.
* **Max output:** Synchronous Messages API limit. On the Message Batches API, Claude Opus 5.5, Claude Opus 5, Claude Sonnet 5.5, Claude Sonnet 5, Claude Haiku 5.5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 support up to 300k output tokens with the output-300k-2026-03-24 beta header.
* **Price / MTok:** Input / output, base price per million tokens. Batch API requests are 50% off; prompt caching reads cost 10% of the base input price (2.5% on Claude Fable 5.1 and Claude Mythos 5.1, 5% on Claude Opus 5.5 and Claude Sonnet 5.5). See Pricing for the full list.
* **Thinking:** Adaptive thinking lets the model decide how much to think, steered by effort. Extended thinking is the manual budget\_tokens mode on earlier models.
* **Default effort:** The effort parameter’s default on the Claude API. Models without a value don’t support the parameter.
* **Knowledge cutoff:** Reliable knowledge cutoff: the date through which the model’s knowledge is most extensive and reliable.

## Specifications

### Model IDs

| Platform                                                                                                              | Model ID                                   |
| :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| Claude API                                                                                                            | `claude-haiku-4-5-20251001`                |
| Claude API alias                                                                                                      | `claude-haiku-4-5`                         |
| [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md)                      | `anthropic.claude-haiku-4-5`               |
| [Amazon Bedrock (InvokeModel)](../build-with-claude/build-with-claude-claude-on-amazon-bedrock-legacy.md) | `anthropic.claude-haiku-4-5-20251001-v1:0` |
| [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md)                             | `claude-haiku-4-5@20251001`                |
| [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md)                | `claude-haiku-4-5`                         |
| [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md)                | `claude-haiku-4-5`                         |

### Pricing

| Feature                                                                                | Value                            |
| :------------------------------------------------------------------------------------- | :------------------------------- |
| Input                                                                                  | $1 / MTok                        |
| Output                                                                                 | $5 / MTok                        |
| [5m cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $1.25 / MTok                     |
| [1h cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $2 / MTok                        |
| [Cache read](../build-with-claude/build-with-claude-prompt-caching.md)     | $0.10 / MTok                     |
| [Batch API](../build-with-claude/build-with-claude-batch-processing.md)    | 50% discount on input and output |

[Full price list](../about-claude/about-claude-pricing.md)

### Capabilities

| Feature                                                                                 | Value                  |
| :-------------------------------------------------------------------------------------- | :--------------------- |
| [Context window](../build-with-claude/build-with-claude-context-windows.md) | 200K tokens            |
| Max output                                                                              | 64K tokens             |
| [Thinking](../build-with-claude/build-with-claude-thinking.md)              | Extended               |
| [Default effort](../build-with-claude/build-with-claude-effort.md)          | Not supported          |
| Input → output                                                                          | Text and images → text |
| Reliable knowledge cutoff                                                               | Feb 2025               |
| Training data cutoff                                                                    | Jul 2025               |

### Availability

| Feature                                                                       | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Status](../about-claude/about-claude-model-deprecations.md) | Active (legacy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Released                                                                      | October 15, 2025                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Retirement                                                                    | Not sooner than October 15, 2026                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Platforms                                                                     | Claude API, [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md), [Amazon Bedrock (InvokeModel)](../build-with-claude/build-with-claude-claude-on-amazon-bedrock-legacy.md), [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md), [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md) |

## Good to know

* `claude-haiku-4-5` is a convenience alias that resolves to the pinned snapshot `claude-haiku-4-5-20251001`. See [Model IDs and versioning](../about-claude/about-claude-models-model-ids-and-versions.md).
* Claude Haiku 4.5 uses manual extended thinking (`thinking.type: "enabled"`), not adaptive thinking.
* Query limits and capabilities programmatically with the [Models API](../api/api-models-list.md).

## Resources

<CardGroup cols={3}>
  <Card title="Migrate to Claude Haiku 5.5" icon="arrows-left-right" href="./general-models-haiku-5-5-migration-guide.md">
    What changes when moving from Claude Haiku 4.5 to Claude Haiku 5.5.
  </Card>

  <Card title="Claude Haiku 5.5" icon="arrow-right" href="./general-models-haiku-5-5-overview.md">
    The current Haiku model: overview, specs, and resources.
  </Card>

  <Card title="Extended thinking" icon="brain" href="../build-with-claude/build-with-claude-extended-thinking.md">
    Claude Haiku 4.5 supports manual extended thinking with `budget_tokens`.
  </Card>
</CardGroup>

## Reference

<CardGroup cols={3}>
  <Card title="System prompt" icon="text" href="../release-notes/release-notes-system-prompts-overview.md">
    The system prompt Claude Haiku 4.5 uses on claude.ai and the Claude apps.
  </Card>

  <Card title="System card" icon="file" href="https://www.anthropic.com/claude-haiku-4-5-system-card">
    Safety evaluations and deployment decisions for Claude Haiku 4.5.
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
    Claude Haiku 4.5 is also available through the InvokeModel Bedrock integration and Bedrock-style model IDs.
  </Card>
</CardGroup>
