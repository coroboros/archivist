---
title: "Feature availability"
source: "https://code.claude.com/docs/en/feature-availability"
category: "code"
generated: true
---
> ## Documentation Index
> Fetch the complete documentation index at: https://code.claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Feature availability

> Compare which Claude Code features are available across Anthropic subscription plans, the Anthropic Console, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, and Microsoft Foundry.

The Claude Code CLI and everything that runs locally work identically on every provider. For setup instructions per provider, see the [Enterprise deployment overview](./code-third-party-integrations.md). To skip straight to what is missing on your provider, see the [summary by provider](#summary-by-provider) tabs.

In the tables below, ✓ means available, ✗ means not available, and "See note" links to a footnote for partial support. A qualifier after ✓ narrows availability to that subset, and "Admin-enabled" means the feature is off until an organization admin turns it on.

## Availability by model provider

How you authenticate determines which features Claude Code can reach. For a single list of what is missing on your provider, see the [summary by provider](#summary-by-provider) tabs. To find your column in the tables:

* **Claude subscription**: you sign in with a claude.ai account on the Pro, Max, Team, or Enterprise plan
* **Anthropic Console**: you authenticate with an Anthropic API key
* **Amazon Bedrock**: you use Claude models from the Amazon Bedrock model catalog and set `CLAUDE_CODE_USE_BEDROCK`. The [Mantle endpoint](./code-amazon-bedrock.md#use-the-mantle-endpoint) (`CLAUDE_CODE_USE_MANTLE`) is covered by this column
* **Claude Platform on AWS**: you bought Claude through AWS Marketplace but call the Anthropic API, and set `CLAUDE_CODE_USE_ANTHROPIC_AWS`
* **Google Cloud's Agent Platform**: Google-operated; you set `CLAUDE_CODE_USE_VERTEX`
* **Microsoft Foundry**: Anthropic-operated on Azure; you set `CLAUDE_CODE_USE_FOUNDRY`

### Features available on every provider

These work identically on every provider:

* [CLI](./code-quickstart.md) and [Agent SDK](./code-agent-sdk/overview.md)
* [VS Code](./code-vs-code.md) and [JetBrains](./code-jetbrains.md) extensions
* [Subagents](./code-sub-agents.md), [hooks](./code-hooks-guide.md), [commands](./code-commands.md), and [skills](./code-skills.md)
* [CLAUDE.md memory](./code-memory.md), [plugins](./code-plugins.md), and [MCP servers](./code-mcp.md)
* [Checkpoints](./code-checkpointing.md), [sandboxing](./code-sandboxing.md), and [Workflows](./code-workflows.md)
* [OpenTelemetry metrics](./code-monitoring-usage.md) and the [managed settings file](./code-settings.md#settings-files)

### Features that require a Claude subscription

These require signing in with a claude.ai account and are not reachable with an Anthropic Console API key or from a third-party provider:

* [Claude Code on the web](./code-claude-code-on-the-web.md), Claude Code on mobile, and [Claude Code in Slack](./code-slack.md)
* [Claude Code Desktop](./code-desktop.md)
* [Routines](./code-routines.md) (`/schedule`)
* [Ultraplan](./code-ultraplan.md) and [Ultrareview](./code-ultrareview.md)
* [Code Review](./code-code-review.md): Team and Enterprise plans
* [Remote Control](./code-remote-control.md)
* [Chrome extension](./code-chrome.md)
* [Computer use](./code-computer-use.md): Pro and Max plans
* [Artifacts](./code-artifacts.md): Pro, Max, Team, and Enterprise plans
* [Voice dictation](./code-voice-dictation.md)

Desktop is the partial exception: Enterprise deployments can route Desktop to Google Cloud's Agent Platform or a gateway provider via [managed settings](https://support.claude.com/en/articles/12622667-enterprise-configuration), and the [Cowork on 3P research preview](https://claude.com/docs/cowork/3p/overview) runs the Code tab on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or a self-hosted LLM gateway. For per-plan availability of these features, see [Availability by subscription plan](#availability-by-subscription-plan).

### CLI capabilities that vary by provider

These features work in the local CLI but depend on a server-side capability that not every provider exposes.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Claude subscription</th>
      <th>Anthropic Console</th>
      <th>Amazon Bedrock</th>
      <th>Claude Platform on AWS</th>
      <th>Google Cloud's Agent Platform</th>
      <th>Microsoft Foundry</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>[Web search](./code-tools-reference.md#websearch-tool-behavior)</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✓</td>
      <td>See note <sup><a href="#fn1">1</a></sup></td>
      <td>✓</td>
    </tr>

    <tr>
      <td>[Fast mode](./code-fast-mode.md)</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>

    <tr>
      <td>[Auto mode](./code-auto-mode-config.md)</td>
      <td>✓</td>
      <td>✓</td>
      <td>See note <sup><a href="#fn2">2</a></sup></td>
      <td>✓</td>
      <td>See note <sup><a href="#fn2">2</a></sup></td>
      <td>See note <sup><a href="#fn2">2</a></sup></td>
    </tr>

    <tr>
      <td>[Advisor](./code-advisor.md)</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>

    <tr>
      <td>[Channels](./code-channels.md)</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>

    <tr>
      <td>[`/loop` scheduled tasks](./code-scheduled-tasks.md)</td>
      <td>✓</td>
      <td>✓</td>
      <td>See note <sup><a href="#fn3">3</a></sup></td>
      <td>✓</td>
      <td>See note <sup><a href="#fn3">3</a></sup></td>
      <td>See note <sup><a href="#fn3">3</a></sup></td>
    </tr>

    <tr>
      <td>[GitHub Actions](./code-github-actions.md) and [GitLab CI/CD](./code-gitlab-ci-cd.md)</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✓</td>
      <td>✗</td>
    </tr>
  </tbody>
</table>

### Admin and analytics

Organization-level controls and usage visibility.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Claude subscription</th>
      <th>Anthropic Console</th>
      <th>Amazon Bedrock</th>
      <th>Claude Platform on AWS</th>
      <th>Google Cloud's Agent Platform</th>
      <th>Microsoft Foundry</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>[Analytics dashboard and API](./code-analytics.md)</td>
      <td>✓ (Team and Enterprise)</td>
      <td>✓ <sup><a href="#fn5">5</a></sup></td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>

    <tr>
      <td>[Server-managed settings](./code-server-managed-settings.md)</td>
      <td>✓ (Team and Enterprise)</td>
      <td>✓ (Team and Enterprise)</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
      <td>✗</td>
    </tr>

    <tr>
      <td>[Zero Data Retention](./code-zero-data-retention.md)</td>
      <td>✓ (qualified Enterprise accounts)</td>
      <td>✓ (qualified accounts)</td>
      <td>See note <sup><a href="#fn4">4</a></sup></td>
      <td>✓ (qualified accounts)</td>
      <td>See note <sup><a href="#fn4">4</a></sup></td>
      <td>See note <sup><a href="#fn4">4</a></sup></td>
    </tr>
  </tbody>
</table>

<span id="fn1" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>1</sup> On Google Cloud's Agent Platform, web search is available for Claude 4 models and later.<br />
<span id="fn2" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>2</sup> Requires `CLAUDE_CODE_ENABLE_AUTO_MODE`. See [Auto mode configuration](./code-auto-mode-config.md).<br />
<span id="fn3" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>3</sup> Explicit intervals such as `/loop every 2 hours` work on every provider. On Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, `/loop` cannot pick its own interval or supply the default maintenance prompt, so a prompt with no interval runs every 10 minutes, and `/loop` with no arguments shows the usage message. See [Scheduled tasks](./code-scheduled-tasks.md).<br />
<span id="fn4" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>4</sup> Subject to your agreement with the cloud provider.<br />
<span id="fn5" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>5</sup> Dashboard and API only. [Contribution metrics](./code-analytics.md#enable-contribution-metrics) requires a claude.ai Team or Enterprise organization.

<Note>
  If you authenticate through an [LLM gateway](./code-llm-gateway.md), feature availability matches the underlying provider the gateway forwards to. Some Anthropic-only features such as the [Advisor](./code-advisor.md) work only if the gateway forwards requests intact to the Anthropic API.
</Note>

### Summary by provider

Each tab lists what is unavailable or partially supported on that provider, with alternatives where one exists. Everything not listed works the same as on a Claude subscription. On Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and Claude Platform on AWS, error reporting and telemetry to Anthropic are off by default. See [default behaviors by API provider](./code-data-usage.md#default-behaviors-by-api-provider) for what traffic still reaches Anthropic and how to opt out.

<Tabs>
  <Tab title="Amazon Bedrock">
    **Not available:** all [features that require a Claude subscription](#features-that-require-a-claude-subscription), plus [web search](./code-tools-reference.md#websearch-tool-behavior), [fast mode](./code-fast-mode.md), [Advisor](./code-advisor.md), [Channels](./code-channels.md), the [analytics dashboard](./code-analytics.md), and [server-managed settings](./code-server-managed-settings.md).

    **Partial support:**

    * [Desktop](./code-desktop.md): only via the [Cowork on 3P research preview](https://claude.com/docs/cowork/3p/overview)
    * [Auto mode](./code-auto-mode-config.md): set `CLAUDE_CODE_ENABLE_AUTO_MODE`
    * [`/loop`](./code-scheduled-tasks.md): explicit intervals only
    * [Zero Data Retention](./code-zero-data-retention.md): subject to your AWS agreement

    **Alternatives:** for scheduling, use [`/loop`](./code-scheduled-tasks.md) with an explicit interval instead of `/schedule`. For cloud sessions, use [GitHub Actions](./code-github-actions.md) or [GitLab CI/CD](./code-gitlab-ci-cd.md). For web lookups, use the [WebFetch tool](./code-tools-reference.md#webfetch-tool-behavior) with a specific URL.
  </Tab>

  <Tab title="Claude Platform on AWS">
    **Not available:** all [features that require a Claude subscription](#features-that-require-a-claude-subscription), plus [fast mode](./code-fast-mode.md), [Advisor](./code-advisor.md), [Channels](./code-channels.md), the [analytics dashboard](./code-analytics.md), and [server-managed settings](./code-server-managed-settings.md).

    **Available** where Amazon Bedrock is not: [web search](./code-tools-reference.md#websearch-tool-behavior), [auto mode](./code-auto-mode-config.md) without an opt-in flag, and [`/loop` self-pacing](./code-scheduled-tasks.md).

    **Alternatives:** for scheduling, use [`/loop`](./code-scheduled-tasks.md) instead of `/schedule`. For cloud sessions, use [GitHub Actions](./code-github-actions.md) or [GitLab CI/CD](./code-gitlab-ci-cd.md).
  </Tab>

  <Tab title="Google Cloud's Agent Platform">
    **Not available:** all [features that require a Claude subscription](#features-that-require-a-claude-subscription), plus [fast mode](./code-fast-mode.md), [Advisor](./code-advisor.md), [Channels](./code-channels.md), the [analytics dashboard](./code-analytics.md), and [server-managed settings](./code-server-managed-settings.md).

    **Partial support:**

    * [Desktop](./code-desktop.md): via [managed settings](https://support.claude.com/en/articles/12622667-enterprise-configuration) or the [Cowork on 3P research preview](https://claude.com/docs/cowork/3p/overview)
    * [Web search](./code-tools-reference.md#websearch-tool-behavior): Claude 4 models and later
    * [Auto mode](./code-auto-mode-config.md): set `CLAUDE_CODE_ENABLE_AUTO_MODE`
    * [`/loop`](./code-scheduled-tasks.md): explicit intervals only
    * [Zero Data Retention](./code-zero-data-retention.md): subject to your Google Cloud agreement

    **Alternatives:** for scheduling, use [`/loop`](./code-scheduled-tasks.md) with an explicit interval instead of `/schedule`. For cloud sessions, use [GitHub Actions](./code-github-actions.md) or [GitLab CI/CD](./code-gitlab-ci-cd.md).
  </Tab>

  <Tab title="Microsoft Foundry">
    **Not available:** all [features that require a Claude subscription](#features-that-require-a-claude-subscription), plus [fast mode](./code-fast-mode.md), [Advisor](./code-advisor.md), [Channels](./code-channels.md), [GitHub Actions](./code-github-actions.md) and [GitLab CI/CD](./code-gitlab-ci-cd.md), the [analytics dashboard](./code-analytics.md), and [server-managed settings](./code-server-managed-settings.md).

    **Partial support:**

    * [Desktop](./code-desktop.md): only via the [Cowork on 3P research preview](https://claude.com/docs/cowork/3p/overview)
    * [Auto mode](./code-auto-mode-config.md): set `CLAUDE_CODE_ENABLE_AUTO_MODE`
    * [`/loop`](./code-scheduled-tasks.md): explicit intervals only
    * [Zero Data Retention](./code-zero-data-retention.md): subject to your Azure agreement

    **Alternatives:** for scheduling, use [`/loop`](./code-scheduled-tasks.md) with an explicit interval instead of `/schedule`.
  </Tab>

  <Tab title="Anthropic Console">
    **Not available:** all [features that require a Claude subscription](#features-that-require-a-claude-subscription).

    Everything in [CLI capabilities that vary by provider](#cli-capabilities-that-vary-by-provider) is available, as are [server-managed settings](./code-server-managed-settings.md) when the API key belongs to a Team or Enterprise organization.
  </Tab>
</Tabs>

## Availability by subscription plan

If you authenticate through Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or an Anthropic Console API key, this section does not apply to you. When you sign in with a claude.ai account, your plan determines which of the features below are available.

| Feature                                                                                 | Pro | Max | Team          | Enterprise                        |
| :-------------------------------------------------------------------------------------- | :-- | :-- | :------------ | :-------------------------------- |
| [Claude Code on the web](./code-claude-code-on-the-web.md)                                    | ✓   | ✓   | ✓             | ✓ <sup><a href="#fn6">6</a></sup> |
| [Routines](./code-routines.md)                                                                | ✓   | ✓   | ✓             | ✓                                 |
| [Remote Control](./code-remote-control.md)                                                    | ✓   | ✓   | Admin-enabled | Admin-enabled                     |
| [Channels](./code-channels.md)                                                                | ✓   | ✓   | Admin-enabled | Admin-enabled                     |
| [Computer use](./code-computer-use.md)                                                        | ✓   | ✓   | ✗             | ✗                                 |
| Dispatch ([Desktop](./code-desktop.md#sessions-from-dispatch))                                | ✓   | ✓   | ✗             | ✗                                 |
| [Code Review](./code-code-review.md)                                                          | ✗   | ✗   | ✓             | ✓                                 |
| [Artifacts](./code-artifacts.md)                                                              | ✓   | ✓   | ✓             | Admin-enabled                     |
| [Analytics dashboard, API, and contribution metrics](./code-analytics.md)                     | ✗   | ✗   | ✓             | ✓                                 |
| [Server-managed settings](./code-server-managed-settings.md)                                  | ✗   | ✗   | ✓             | ✓                                 |
| [SSO](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)             | ✗   | ✗   | ✓             | ✓                                 |
| SCIM                                                                                    | ✗   | ✗   | ✗             | ✓                                 |
| [Compliance API](https://platform.claude.com/docs/en/api/admin-api/compliance/overview) | ✗   | ✗   | ✗             | ✓                                 |
| [Zero Data Retention](./code-zero-data-retention.md)                                          | ✗   | ✗   | ✗             | ✓ <sup><a href="#fn7">7</a></sup> |

<span id="fn6" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>6</sup> On Enterprise, requires a premium seat or a Chat + Claude Code seat. See [Claude Code on the web](./code-claude-code-on-the-web.md).<br />
<span id="fn7" style={{display: 'block', position: 'relative', top: '-120px'}} /><sup>7</sup> Not included in the standard Enterprise plan. Requires separate enablement by Anthropic for qualified accounts. See [Zero Data Retention](./code-zero-data-retention.md).

For pricing and the full plan comparison, see [Team plans](https://support.claude.com/en/articles/9266767-what-is-the-team-plan) and [Enterprise plans](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan).

## Model availability

For which Claude models and context-window sizes are available per provider and region, see [Model configuration](./code-model-config.md) and the [Models overview](https://platform.claude.com/docs/en/about-claude/models/overview). Vision, PDF input, and extended thinking are model capabilities rather than Claude Code features and work on every provider that offers the model. [Prompt caching](./code-prompt-caching.md) works the same way on most providers; on Amazon Bedrock, support varies by model.

## Related resources

* [Enterprise deployment overview](./code-third-party-integrations.md): compare authentication, billing, and regions across providers
* Provider setup guides: [Amazon Bedrock](./code-amazon-bedrock.md), [Claude Platform on AWS](./code-claude-platform-on-aws.md), [Google Cloud's Agent Platform](./code-google-vertex-ai.md), [Microsoft Foundry](./code-microsoft-foundry.md)
* [Platforms and integrations](./code-platforms.md): where Claude Code runs, including the CLI, Desktop, IDE extensions, web, mobile, and CI/CD
