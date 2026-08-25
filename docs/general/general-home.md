---
source: "https://platform.claude.com/docs/en/home"
category: "general"
generated: true
---
---
title: Documentation
url: https://platform.claude.com/docs/en/home
description: Claude API Documentation
---

<HomePage>
  <HomeHero
    eyebrow="Claude Platform"
    title="Start building
with Claude"
    subtitle="Everything you need to integrate Claude into your applications. From first API call to production."
  >
    <HomeQuickChip icon="Play" href="../api/api-get-started.md">
      Quickstart
    </HomeQuickChip>

    <HomeQuickChip icon="Key" href="https://platform.claude.com/settings/keys">
      Get API key
    </HomeQuickChip>

    <HomeQuickChip icon="CodeBrackets" href="../api/api-overview.md">
      API reference
    </HomeQuickChip>
  </HomeHero>

  <HomeSection>
    <HomeSectionHeader label="Platform" title="Choose how you build" description="Pick the developer surface that matches your approach, and the infrastructure that fits your stack." />

    <HomePlatformCards>
      <HomePlatformCard title="Messages" description="Direct model access. You construct every turn, manage conversation state, and write your own tool loop." pictogram="code-terminal">
        <HomeCardLink icon="play" href="../api/api-get-started.md">
          Quickstart
        </HomeCardLink>

        <HomeCardLink icon="book" href="../api/api-messages-create.md">
          API reference
        </HomeCardLink>

        <HomeCardLink icon="code-brackets" href="./general-cli-sdks-libraries-overview.md">
          Client SDKs
        </HomeCardLink>
      </HomePlatformCard>

      <HomePlatformCard title="Managed Agents" description="Fully managed agent infrastructure. Deploy and manage autonomous agents in stateful sessions with persistent event history." pictogram="clouds">
        <HomeCardLink icon="play" href="../managed-agents/managed-agents-quickstart.md">
          Quickstart
        </HomeCardLink>

        <HomeCardLink icon="book" href="../api/api-beta-sessions.md">
          API reference
        </HomeCardLink>

        <HomeCardLink icon="brain" href="../managed-agents/managed-agents-agent-setup.md">
          Define your agent
        </HomeCardLink>
      </HomePlatformCard>
    </HomePlatformCards>

    <HomePartnerLinks label="Claude is also available on these cloud platforms:">
      <HomeCloudPartnerLink icon="cloud" href="../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md">
        Amazon Bedrock
      </HomeCloudPartnerLink>

      <HomeCloudPartnerLink icon="cloud" href="../build-with-claude/build-with-claude-claude-on-vertex-ai.md">
        Google Cloud
      </HomeCloudPartnerLink>

      <HomeCloudPartnerLink icon="cloud" href="../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md">
        Microsoft Foundry
      </HomeCloudPartnerLink>
    </HomePartnerLinks>
  </HomeSection>

  <HomeSection>
    <HomeSectionHeader label="Developer journey" title="From idea to production" description="Follow the lifecycle or jump to what you need." />

    <HomeJourney>
      <HomeJourneyTab label="Messages">
        <HomeJourneyStep title="Get started">
          <HomeJourneyLink icon="play" href="../api/api-get-started.md">
            Quickstart
          </HomeJourneyLink>

          <HomeJourneyLink icon="lock" href="https://platform.claude.com/settings/keys">
            Get API key
          </HomeJourneyLink>

          <HomeJourneyLink icon="settings" href="./general-models-overview.md">
            Choose a model
          </HomeJourneyLink>

          <HomeJourneyLink icon="code-brackets" href="./general-cli-sdks-libraries-overview.md">
            Install an SDK
          </HomeJourneyLink>

          <HomeJourneyLink icon="message" href="https://platform.claude.com/playground">
            Try the API in Playground
          </HomeJourneyLink>
        </HomeJourneyStep>

        <HomeJourneyStep title="Build">
          <HomeJourneyLink icon="message" href="../api/api-messages-create.md">
            Messages API
          </HomeJourneyLink>

          <HomeJourneyLink icon="brain" href="../build-with-claude/build-with-claude-thinking.md">
            Thinking
          </HomeJourneyLink>

          <HomeJourneyLink icon="image" href="../build-with-claude/build-with-claude-vision.md">
            Vision
          </HomeJourneyLink>

          <HomeJourneyLink icon="tool" href="../agents-and-tools/agents-and-tools-tool-use-overview.md">
            Tool use
          </HomeJourneyLink>

          <HomeJourneyLink icon="compass" href="../agents-and-tools/agents-and-tools-tool-use-web-search-tool.md">
            Web search
          </HomeJourneyLink>

          <HomeJourneyLink icon="code" href="../agents-and-tools/agents-and-tools-tool-use-code-execution-tool.md">
            Code execution
          </HomeJourneyLink>

          <HomeJourneyLink icon="database" href="../build-with-claude/build-with-claude-structured-outputs.md">
            Structured outputs
          </HomeJourneyLink>

          <HomeJourneyLink icon="lightning" href="../build-with-claude/build-with-claude-prompt-caching.md">
            Prompt caching
          </HomeJourneyLink>

          <HomeJourneyLink icon="wifi-high" href="../build-with-claude/build-with-claude-streaming.md">
            Streaming
          </HomeJourneyLink>
        </HomeJourneyStep>

        <HomeJourneyStep title="Evaluate and ship">
          <HomeJourneyLink icon="lightbulb" href="../build-with-claude/build-with-claude-prompt-engineering-overview.md">
            Prompting best practices
          </HomeJourneyLink>

          <HomeJourneyLink icon="chart" href="../test-and-evaluate/test-and-evaluate-develop-tests.md">
            Run evals
          </HomeJourneyLink>

          <HomeJourneyLink icon="stack" href="../build-with-claude/build-with-claude-batch-processing.md">
            Batch testing
          </HomeJourneyLink>

          <HomeJourneyLink icon="verified" href="../test-and-evaluate/test-and-evaluate-strengthen-guardrails-increase-consistency.md">
            Safety and guardrails
          </HomeJourneyLink>

          <HomeJourneyLink icon="bolt" href="../api/api-rate-limits.md">
            Rate limits and errors
          </HomeJourneyLink>

          <HomeJourneyLink icon="calculator" href="../about-claude/about-claude-pricing.md">
            Cost optimization
          </HomeJourneyLink>
        </HomeJourneyStep>

        <HomeJourneyStep title="Operate">
          <HomeJourneyLink icon="settings" href="../build-with-claude/build-with-claude-workspaces.md">
            Workspaces and admin
          </HomeJourneyLink>

          <HomeJourneyLink icon="lock" href="https://platform.claude.com/settings/keys">
            API key management
          </HomeJourneyLink>

          <HomeJourneyLink icon="chart" href="../build-with-claude/build-with-claude-usage-cost-api.md">
            Usage monitoring
          </HomeJourneyLink>

          <HomeJourneyLink icon="settings" href="../about-claude/about-claude-models-migration-guide.md">
            Model migration
          </HomeJourneyLink>
        </HomeJourneyStep>
      </HomeJourneyTab>

      <HomeJourneyTab label="Managed Agents">
        <HomeJourneyStep title="Get started">
          <HomeJourneyLink icon="play" href="../managed-agents/managed-agents-quickstart.md">
            Quickstart
          </HomeJourneyLink>

          <HomeJourneyLink icon="lock" href="https://platform.claude.com/settings/keys">
            Get API key
          </HomeJourneyLink>

          <HomeJourneyLink icon="message" href="../managed-agents/managed-agents-onboarding.md">
            Build in Console
          </HomeJourneyLink>
        </HomeJourneyStep>

        <HomeJourneyStep title="Define your agent">
          <HomeJourneyLink icon="brain" href="../managed-agents/managed-agents-agent-setup.md">
            Agent setup
          </HomeJourneyLink>

          <HomeJourneyLink icon="tool" href="../managed-agents/managed-agents-tools.md">
            Tools
          </HomeJourneyLink>

          <HomeJourneyLink icon="lock" href="../managed-agents/managed-agents-permission-policies.md">
            Tool permissions
          </HomeJourneyLink>
        </HomeJourneyStep>

        <HomeJourneyStep title="Run sessions">
          <HomeJourneyLink icon="wifi-high" href="../managed-agents/managed-agents-events-and-streaming.md">
            Streaming and events
          </HomeJourneyLink>

          <HomeJourneyLink icon="code-brackets" href="../api/api-beta-sessions.md">
            Sessions API reference
          </HomeJourneyLink>
        </HomeJourneyStep>

        <HomeJourneyStep title="Operate">
          <HomeJourneyLink icon="settings" href="../build-with-claude/build-with-claude-workspaces.md">
            Workspaces and admin
          </HomeJourneyLink>

          <HomeJourneyLink icon="lock" href="https://platform.claude.com/settings/keys">
            API key management
          </HomeJourneyLink>

          <HomeJourneyLink icon="chart" href="../build-with-claude/build-with-claude-usage-cost-api.md">
            Usage monitoring
          </HomeJourneyLink>
        </HomeJourneyStep>
      </HomeJourneyTab>
    </HomeJourney>
  </HomeSection>

  <HomeSection>
    <HomeSectionHeader label="Models" title="The Claude model family" description="Choose the right model for your use case." />

    <HomeModelCards>
      <HomeModelCard name="Fable 5" badge="Most capable" modelId="claude-fable-5" description="Highest capability for the most demanding reasoning and long-horizon agentic work." href="./general-models-fable-5-overview.md" />

      <HomeModelCard name="Opus 5" badge="Advanced" modelId="claude-opus-5" description="Excellent for complex analysis, coding, and creative tasks requiring deep reasoning." href="./general-models-opus-5-overview.md" />

      <HomeModelCard name="Sonnet 5" badge="Best balance" modelId="claude-sonnet-5" description="Ideal balance of intelligence and speed for most production workloads." href="./general-models-sonnet-5-overview.md" />

      <HomeModelCard name="Haiku 4.5" badge="Fastest" modelId="claude-haiku-4-5" description="Lightning-fast responses for high-volume, latency-sensitive applications." href="./general-models-haiku-4-5-overview.md" />
    </HomeModelCards>
  </HomeSection>

  <HomeSection last>
    <HomeSectionHeader label="Resources" title="Keep learning" />

    <CardGroup cols={3}>
      <Card icon="graduation-cap" title="Courses" href="https://anthropic.skilljar.com/">
        Interactive courses to master Claude.
      </Card>

      <Card icon="book" title="Cookbook" href="https://platform.claude.com/cookbook">
        Code samples and patterns.
      </Card>

      <Card icon="play" title="Quickstarts" href="https://github.com/anthropics/anthropic-quickstarts">
        Deployable starter apps.
      </Card>

      <Card icon="star" title="What's new" href="../release-notes/release-notes-overview.md">
        Latest features and updates.
      </Card>

      <Card icon="terminal" title="Claude Code" href="https://code.claude.com/docs">
        An agentic coding assistant in your terminal.
      </Card>
    </CardGroup>
  </HomeSection>
</HomePage>
