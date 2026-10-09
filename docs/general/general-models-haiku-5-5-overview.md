---
title: "Overview"
source: "https://platform.claude.com/docs/en/models/haiku-5-5/overview"
category: "general"
generated: true
---
---
title: Claude Haiku 5.5
url: https://platform.claude.com/docs/en/models/haiku-5-5/overview
description: "Claude Haiku 5.5 at a glance: what it's for, model IDs on every platform, context window, output limits, pricing, availability, and the guides and resources for building with it."
---

**Latest.** Released October 7, 2026.

For high-volume, latency-sensitive tasks such as classification, extraction, and routing

Model ID: `claude-haiku-5-5`

Context window: 1M tokens · Max output: 128K tokens · Input pricing: From $0.10 / MTok · Output pricing: From $0.50 / MTok

[Announcement](https://www.anthropic.com/claude-haiku-5-5) · [What’s new](./general-models-haiku-5-5-whats-new-haiku-5-5.md) · [Migration guide](./general-models-haiku-5-5-migration-guide.md)

## Overview

Claude Haiku 5.5 is built for high-volume, latency-sensitive work such as classification, routing, extraction, and subagent tasks. It supports adaptive thinking with the effort parameter, a 1M token context window, and up to 128k output tokens. It uses the same newer tokenizer as Claude 4.7 and later models, so the same text counts as approximately 30% more tokens than on Claude Haiku 4.5. Its thinking blocks work only in the account that produced them, or in an account linked to it.

For code changes, see the [migration guide](./general-models-haiku-5-5-migration-guide.md). For model IDs, pricing, and limits, see the [Claude Haiku 5.5 overview](./general-models-haiku-5-5-overview.md). For prompting guidance, see [Prompting Claude Haiku 5.5](../build-with-claude/build-with-claude-prompt-engineering-prompting-claude-haiku-5-5.md).

[What's new in Claude Haiku 5.5](./general-models-haiku-5-5-whats-new-haiku-5-5.md)

## How it compares

| Model                                                                               | Context | Max output | Price / MTok       | Latency  | Thinking             | Default effort | Knowledge cutoff |
| :---------------------------------------------------------------------------------- | :------ | :--------- | :----------------- | :------- | :------------------- | :------------- | :--------------- |
| [Claude Fable 5.1](./general-models-fable-5-1-overview.md)   | 1M      | 128K       | $10 / $50          | Slower   | Adaptive (always on) | `high`         | Jun 2026         |
| [Claude Opus 5.5](./general-models-opus-5-5-overview.md)     | 1M      | 128K       | $4 / $20           | Moderate | Adaptive (always on) | `medium`       | Jun 2026         |
| [Claude Sonnet 5.5](./general-models-sonnet-5-5-overview.md) | 1M      | 128K       | $2 / $10           | Fast     | Adaptive             | `high`         | Jun 2026         |
| **Claude Haiku 5.5** (this model)                                                   | 1M      | 128K       | From $0.10 / $0.50 | Fastest  | Adaptive             | `medium`       | Jun 2026         |

* **Context:** 1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words in 1M tokens. 200k tokens is roughly 150k words.
* **Max output:** Synchronous Messages API limit. On the Message Batches API, Claude Opus 5.5, Claude Opus 5, Claude Sonnet 5.5, Claude Sonnet 5, Claude Haiku 5.5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, and Claude Sonnet 4.6 support up to 300k output tokens with the output-300k-2026-03-24 beta header.
* **Price / MTok:** Input / output, base price per million tokens. Batch API requests are 50% off; prompt caching reads cost 10% of the base input price (2.5% on Claude Fable 5.1 and Claude Mythos 5.1, 5% on Claude Opus 5.5 and Claude Sonnet 5.5). See Pricing for the full list.
* **Latency:** Comparative latency, relative to the current lineup, as published in the models overview. Actual latency depends on prompt length, output length, and thinking effort.
* **Thinking:** Adaptive thinking lets the model decide how much to think, steered by effort. Extended thinking is the manual budget\_tokens mode on earlier models.
* **Default effort:** The effort parameter’s default on the Claude API. Models without a value don’t support the parameter.
* **Knowledge cutoff:** Reliable knowledge cutoff: the date through which the model’s knowledge is most extensive and reliable.

## Specifications

### Model IDs

| Platform                                                                                               | Model ID                     |
| :----------------------------------------------------------------------------------------------------- | :--------------------------- |
| Claude API                                                                                             | `claude-haiku-5-5`           |
| [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md)       | `anthropic.claude-haiku-5-5` |
| [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md)              | `claude-haiku-5-5`           |
| [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md) | `claude-haiku-5-5`           |
| [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md) | `claude-haiku-5-5`           |

### Pricing

| Feature                                                                                | Value                                                                                         |
| :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Input                                                                                  | $0.10 / MTok for prompts up to 100,000 tokens; $0.50 / MTok for prompts over 100,000 tokens   |
| Output                                                                                 | $0.50 / MTok for prompts up to 100,000 tokens; $2.50 / MTok for prompts over 100,000 tokens   |
| [5m cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $0.125 / MTok for prompts up to 100,000 tokens; $0.625 / MTok for prompts over 100,000 tokens |
| [1h cache write](../build-with-claude/build-with-claude-prompt-caching.md) | $0.20 / MTok for prompts up to 100,000 tokens; $1 / MTok for prompts over 100,000 tokens      |
| [Cache read](../build-with-claude/build-with-claude-prompt-caching.md)     | $0.01 / MTok for prompts up to 100,000 tokens; $0.05 / MTok for prompts over 100,000 tokens   |
| [Batch API](../build-with-claude/build-with-claude-batch-processing.md)    | 50% discount on input and output                                                              |

[Full price list](../about-claude/about-claude-pricing.md)

### Capabilities

| Feature                                                                                                                     | Value                  |
| :-------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| [Context window](../build-with-claude/build-with-claude-context-windows.md)                                     | 1M tokens              |
| Max output                                                                                                                  | 128K tokens            |
| [Max output (Batch API, beta)](../build-with-claude/build-with-claude-batch-processing.md#extended-output-beta) | 300K tokens            |
| [Thinking](../build-with-claude/build-with-claude-thinking.md)                                                  | Adaptive               |
| [Default effort](../build-with-claude/build-with-claude-effort.md)                                              | `medium`               |
| Comparative latency                                                                                                         | Fastest                |
| Input → output                                                                                                              | Text and images → text |
| Reliable knowledge cutoff                                                                                                   | Jun 2026               |
| Training data cutoff                                                                                                        | Jun 2026               |

### Availability

| Feature                                                                       | Value                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Status](../about-claude/about-claude-model-deprecations.md) | Active (latest)                                                                                                                                                                                                                                                                                                                                                                                                         |
| Released                                                                      | October 7, 2026                                                                                                                                                                                                                                                                                                                                                                                                         |
| Retirement                                                                    | Not sooner than October 7, 2027                                                                                                                                                                                                                                                                                                                                                                                         |
| Platforms                                                                     | Claude API, [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md), [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md), [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md) |

## Good to know

* Adaptive thinking is on by default. Control thinking depth with the [effort parameter](../build-with-claude/build-with-claude-effort.md).
* Omit `temperature`, `top_p`, and `top_k`. See [Remove sampling parameters](./general-models-haiku-5-5-migration-guide.md#remove-sampling-parameters) for the values that return a 400 error.
* On the [Message Batches API](../build-with-claude/build-with-claude-batch-processing.md#extended-output-beta), Claude Haiku 5.5 supports up to 300k output tokens with the `output-300k-2026-03-24` beta header.
* The minimum cacheable prompt length is 512 tokens. See [Prompt caching](../build-with-claude/build-with-claude-prompt-caching.md#cache-limitations).
* Query limits and capabilities programmatically with the [Models API](../api/api-models-list.md).

## Resources

<CardGroup cols={3}>
  <Card title="Prompting Claude Haiku 5.5" icon="lightbulb" href="../build-with-claude/build-with-claude-prompt-engineering-prompting-claude-haiku-5-5.md">
    Behavioral differences and prompting patterns specific to Claude Haiku 5.5.
  </Card>

  <Card title="Reduce latency" icon="lightning" href="../test-and-evaluate/test-and-evaluate-strengthen-guardrails-reduce-latency.md">
    Choose a model and effort level, shape prompts, and stream output for faster responses.
  </Card>

  <Card title="Adaptive thinking" icon="brain" href="../build-with-claude/build-with-claude-thinking.md">
    Claude Haiku 5.5 determines when and how much to think. Steer depth with `effort`.
  </Card>

  <Card title="Context windows" icon="stack" href="../build-with-claude/build-with-claude-context-windows.md">
    How the context window is counted and managed.
  </Card>
</CardGroup>

## Reference

<CardGroup cols={3}>
  <Card title="System prompt" icon="text" href="../release-notes/release-notes-system-prompts-claude-haiku-5-5.md">
    The system prompt Claude Haiku 5.5 uses on claude.ai and the Claude apps.
  </Card>

  <Card title="System card" icon="file" href="https://www.anthropic.com/document/claude-haiku-5-5-system-card">
    Safety evaluations and deployment decisions for Claude Haiku 5.5.
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
