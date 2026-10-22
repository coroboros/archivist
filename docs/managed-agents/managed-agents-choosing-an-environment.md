---
title: "Start with a cloud environment"
source: "https://platform.claude.com/docs/en/managed-agents/choosing-an-environment"
category: "managed-agents"
generated: true
---
---
title: Choosing an agent environment
url: https://platform.claude.com/docs/en/managed-agents/choosing-an-environment
description: Decide whether Claude Managed Agents tools and code run in an Anthropic-managed cloud environment or a self-hosted sandbox, and see what changes if you switch.
featureMetadata:
  topic:
    title: Managed Agents
    url: https://platform.claude.com/docs/en/managed-agents/overview
  status: beta
  betaHeader: managed-agents-2026-04-01
---

An environment sets where your agent's tools and code run. They run in a sandbox. A sandbox is an isolated workspace, such as a container, where the agent runs commands and works on files. You have two options:

* **Cloud environment:** Anthropic runs the sandbox for you. Each session gets its own fresh Linux container on Anthropic-managed infrastructure, with common languages, databases, and utilities already installed. You choose its network rules and any extra packages to install.
* **Self-hosted sandbox:** You run the sandbox on your own infrastructure. Claude still runs on Anthropic's side and determines which tool to call next. A program that you run, called a worker, carries out the agent's bash and file tool calls on your machines and sends each result back. It can also serve custom tools.

The agent definition is the same whichever you choose. You set the model, prompt, and tools on the [agent](./managed-agents-agent-setup.md), not on the environment.

## Start with a cloud environment

If you're not sure which to choose, or you're new to Claude Managed Agents, start with a [cloud environment](./managed-agents-environments.md), as the [quickstart](./managed-agents-quickstart.md) does. Anthropic runs an isolated container for each session, with common languages and tools already installed, so there is nothing for you to host. Choose a self-hosted sandbox only if tools must run on infrastructure you control.

## Compare the options

The table compares the two options.

|                                     | [Cloud environment](./managed-agents-environments.md) (default)                                                                                                                                                                           | [Self-hosted sandbox](./managed-agents-self-hosted-sandboxes.md)                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Where tools and code run            | An Anthropic-managed sandbox                                                                                                                                                                                                                                             | Your worker, on your infrastructure                                                                                       |
| What reaches Anthropic              | The [conversation history](./managed-agents-events-and-streaming.md#list-past-events), [tool results](./managed-agents-tools.md#available-tools), the sandbox's files and state, skills, and memory stores | The conversation history, tool results, skills, and memory stores. The sandbox's files and processes stay on your worker. |
| What you operate                    | Nothing                                                                                                                                                                                                                                                                  | The worker hosts, their hardening, their network limits, and the environment key your worker authenticates with           |
| Network reach                       | Network rules you set on the environment                                                                                                                                                                                                                                 | Your own network policy                                                                                                   |
| File and GitHub repository mounting | Managed by Anthropic                                                                                                                                                                                                                                                     | Managed by you                                                                                                            |
| Memory stores                       | Mounted by Anthropic at `/mnt/memory/`                                                                                                                                                                                                                                   | Downloaded to `/mnt/memory/` and synced by the worker                                                                     |
| Sandbox lifecycle                   | Managed by Anthropic                                                                                                                                                                                                                                                     | Managed by you                                                                                                            |
| Choose it when                      | The default. You don't need tools to run on your own infrastructure.                                                                                                                                                                                                     | Tools must run on infrastructure you control.                                                                             |

## When to choose a self-hosted sandbox

A self-hosted sandbox fits when the agent needs to do one of the following:

* **Work on data that can't leave your network:** The agent's files and processes stay on your worker. What a tool returns to the model still reaches the Managed Agents service.
* **Reach internal services that aren't publicly routable:** The agent's bash and file tools, and any custom tools your worker serves, run inside your network. Anthropic, not your worker, connects to the agent's MCP servers. A private one might be in front of your internal ticket system or company wiki. To reach it, you can use an [MCP tunnel](../agents-and-tools/agents-and-tools-mcp-tunnels-overview.md) with either option. MCP tunnels are in research preview and need an access request. See [Self-hosted sandboxes and MCP tunnels](./managed-agents-self-hosted-sandboxes.md#self-hosted-sandboxes-and-mcp-tunnels).
* **Run under your organization's own compliance and audit controls:** Tools run on hosts that you configure, log, and audit.

## What a self-hosted sandbox doesn't change

With either option, the conversation history and tool results go to the Managed Agents service, which Anthropic operates. That is how the model receives the result of each tool call. The web search and web fetch tools also run on Anthropic's side, not in the sandbox. See [Restrict web search and web fetch domains](./managed-agents-tools-web-restrictions.md). Neither option changes the compliance coverage of Managed Agents or how long it keeps conversation history. See [API and data retention](../manage-claude/manage-claude-api-and-data-retention.md#feature-eligibility).

## What you take on and give up with a self-hosted sandbox

A self-hosted sandbox makes you the operator of the worker hosts. You harden the sandbox image, control network egress, store and rotate the environment key, and isolate sessions from each other. The [Security model](./managed-agents-self-hosted-sandboxes-security.md) page has the detail.

You also give up these cloud environment features:

* [`file` and `github_repository` session resources](./managed-agents-self-hosted-sandboxes.md#session-resources). You [stage input files yourself](./managed-agents-self-hosted-sandboxes-workers.md#stage-files-for-a-session), and you are responsible for mounting your own GitHub repository too.
* [Repository skill discovery](./managed-agents-skills.md#load-skills-from-a-github-repository).
* [Environment variable credentials](./managed-agents-vaults.md#add-a-credential) in vaults.
* The [pre-installed runtimes and packages](./managed-agents-cloud-sandboxes-reference.md) of a cloud sandbox. A self-hosted sandbox has whatever your worker provides.

## Differences on Claude Platform on AWS

If you use Claude Managed Agents through Claude Platform on AWS, Anthropic still operates the service. There, a self-hosted sandbox can't use memory stores, workers don't use an environment key, and MCP tunnels aren't available. See [Claude Managed Agents on Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md#claude-managed-agents) and [Features not supported](../build-with-claude/build-with-claude-claude-platform-on-aws.md#features-not-supported).

## Switch from a cloud environment to a self-hosted sandbox

To switch to a self-hosted sandbox, you keep the agent, create a `self_hosted` environment, and reference its ID in new sessions and deployments.

* **What carries over:** The agent definition, the API key or AWS credentials your application uses, your skills, your MCP servers, and your [memory stores](./managed-agents-self-hosted-sandboxes-memory.md).
* **What is new:** A `self_hosted` environment, an environment key that you generate in the Claude Console, and a worker that you run. The [self-hosted sandboxes quickstart](./managed-agents-self-hosted-sandboxes.md#quickstart) covers all three.
* **What stops working:** The features listed in [What you take on and give up with a self-hosted sandbox](./managed-agents-choosing-an-environment.md#what-you-take-on-and-give-up-with-a-self-hosted-sandbox).

On Claude Platform on AWS, memory stores don't carry over to a self-hosted sandbox, and the worker doesn't use an environment key. See [Differences on Claude Platform on AWS](./managed-agents-choosing-an-environment.md#differences-on-claude-platform-on-aws).
