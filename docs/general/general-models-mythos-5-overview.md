---
title: "How it compares"
source: "https://platform.claude.com/docs/en/models/mythos-5/overview"
category: "general"
generated: true
---
---
title: Claude Mythos 5
url: https://platform.claude.com/docs/en/models/mythos-5/overview
description: "Claude Mythos 5 reference: the same model as Claude Fable 5, offered by invitation only through Project Glasswing for defensive cybersecurity work. Model IDs, specifications, pricing, and migration resources. Claude Mythos 5.1 is the current Mythos model."
---

**Invite only.** Released June 9, 2026.

Most capable model for cybersecurity and biology research

Model ID: `claude-mythos-5`

Context window: 1M tokens · Max output: 128K tokens · Input pricing: $10 / MTok · Output pricing: $50 / MTok

[Announcement](https://www.anthropic.com/news/claude-fable-5-mythos-5) · [What’s new](./general-models-fable-5-introducing-claude-fable-5-and-claude-mythos-5.md) · [Migration guide](./general-models-fable-5-1-migration-guide.md#migrating-from-claude-mythos-5-to-claude-mythos-5-1)

Claude Mythos 5 is offered separately, by invitation only, as part of Project Glasswing. It shares Claude Fable 5’s specifications and pricing. For access, contact your Anthropic, AWS, or Google Cloud account team. [See Claude Fable 5](./general-models-fable-5-overview.md) · [Project Glasswing](https://anthropic.com/glasswing)

## How it compares

| Model                                                                             | Context | Max output | Price / MTok | Thinking             | Default effort | Knowledge cutoff |
| :-------------------------------------------------------------------------------- | :------ | :--------- | :----------- | :------------------- | :------------- | :--------------- |
| [Claude Fable 5.1](./general-models-fable-5-1-overview.md) | 1M      | 128K       | $10 / $50    | Adaptive (always on) | `high`         | Jun 2026         |
| **Claude Mythos 5** (this model)                                                  | 1M      | 128K       | $10 / $50    | Adaptive (always on) | `high`         | Jan 2026         |
| [Claude Opus 5](./general-models-opus-5-overview.md)       | 1M      | 128K       | $5 / $25     | Adaptive             | `high`         | May 2026         |
| [Claude Sonnet 5](./general-models-sonnet-5-overview.md)   | 1M      | 128K       | $2 / $10     | Adaptive             | `high`         | Jan 2026         |
| [Claude Haiku 4.5](./general-models-haiku-4-5-overview.md) | 200K    | 64K        | $1 / $5      | Extended             | —              | Feb 2025         |

* **Context:** 1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words in 1M tokens. 200k tokens is roughly 150k words.
* **Max output:** Synchronous Messages API limit. On the Message Batches API, Claude Opus 5, Claude Sonnet 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 support up to 300k output tokens with the output-300k-2026-03-24 beta header.
* **Price / MTok:** Input / output, base price per million tokens. Batch API requests are 50% off; prompt caching reads cost 10% of the base input price (2.5% on Claude Fable 5.1 and Claude Mythos 5.1). See Pricing for the full list.
* **Thinking:** Adaptive thinking lets the model decide how much to think, steered by effort. Extended thinking is the manual budget\_tokens mode on earlier models.
* **Default effort:** The effort parameter’s default on the Claude API. Models without a value don’t support the parameter.
* **Knowledge cutoff:** Reliable knowledge cutoff: the date through which the model’s knowledge is most extensive and reliable.

## Specifications

### Model IDs

| Platform                                                                                               | Model ID                    |
| :----------------------------------------------------------------------------------------------------- | :-------------------------- |
| Claude API                                                                                             | `claude-mythos-5`           |
| [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md)       | `anthropic.claude-mythos-5` |
| [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md)              | `claude-mythos-5`           |
| [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md) | `claude-mythos-5`           |

### Pricing

| Feature                                                                                | Value                                                               |
| :------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| Input                                                                                  | $10 / MTok                                                          |
| Output                                                                                 | $50 / MTok                                                          |
| [5m cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $12.50 / MTok                                                       |
| [1h cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $20 / MTok                                                          |
| [Cache read](../build-with-claude/build-with-claude-prompt-caching.md)     | $1 / MTok                                                           |
| [Batch API](../build-with-claude/build-with-claude-batch-processing.md)    | 50% discount on input and output                                    |
| Full price list                                                                        | [Pricing](../about-claude/about-claude-pricing.md) |

### Capabilities

| Feature                                                                                 | Value                  |
| :-------------------------------------------------------------------------------------- | :--------------------- |
| [Context window](../build-with-claude/build-with-claude-context-windows.md) | 1M tokens              |
| Max output                                                                              | 128K tokens            |
| [Thinking](../build-with-claude/build-with-claude-thinking.md)              | Adaptive (always on)   |
| [Default effort](../build-with-claude/build-with-claude-effort.md)          | `high`                 |
| Input → output                                                                          | Text and images → text |
| Reliable knowledge cutoff                                                               | Jan 2026               |
| Training data cutoff                                                                    | Jan 2026               |

### Availability

| Feature                                                                       | Value                                                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Status](../about-claude/about-claude-model-deprecations.md) | Active (invite only)                                                                                                                                                                                                                                                                                            |
| Released                                                                      | June 9, 2026                                                                                                                                                                                                                                                                                                    |
| Retirement                                                                    | Not sooner than June 9, 2027                                                                                                                                                                                                                                                                                    |
| Platforms                                                                     | Claude API, [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md), [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md) |

## Resources

<CardGroup cols={3}>
  <Card title="Migrate to Claude Mythos 5.1" icon="arrows-left-right" href="./general-models-fable-5-1-migration-guide.md">
    What changes when moving from Claude Mythos 5 to Claude Mythos 5.1.
  </Card>

  <Card title="Claude Mythos 5.1" icon="arrow-right" href="./general-models-mythos-5-1-overview.md">
    The current Mythos model: overview, specs, and resources.
  </Card>
</CardGroup>

## Reference

<CardGroup cols={3}>
  <Card title="System card" icon="file" href="https://www.anthropic.com/claude-fable-5-mythos-5-system-card">
    Safety evaluations and deployment decisions for Claude Fable 5 and Claude Mythos 5.
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
