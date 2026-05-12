---
title: "Run agents in parallel"
source: "https://code.claude.com/docs/en/agents"
category: "code"
generated: true
---
> ## Documentation Index
> Fetch the complete documentation index at: https://code.claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Run agents in parallel

> Compare the ways Claude Code can take on multiple tasks at once: subagents, agent view, agent teams, and isolated worktree sessions.

[Subagents](./code-sub-agents.md), [agent view](./code-agent-view.md), [agent teams](./code-agent-teams.md), and [worktrees](./code-worktrees.md) each parallelize work in a different way. The right one depends on whether you want to stay in each conversation yourself, hand tasks off and check back later, or have Claude coordinate a group of workers for you.

| Approach                       | What it gives you                                                                                                                        | Use it when                                                                                                                 |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [Subagents](./code-sub-agents.md)    | Delegated workers inside one session that do a side task in their own context and return a summary                                       | A side task would flood your main conversation with search results, logs, or file contents you won't reference again        |
| [Agent view](./code-agent-view.md)   | One screen to dispatch and monitor sessions running in the background, opened with `claude agents`. Research preview                     | You have several independent tasks and want to hand them off, check status at a glance, and step in only when one needs you |
| [Agent teams](./code-agent-teams.md) | Multiple coordinated sessions with a shared task list and inter-agent messaging, managed by a lead. Experimental and disabled by default | You want Claude to split a project into pieces, assign them, and keep the workers in sync                                   |
| [Worktrees](./code-worktrees.md)     | Separate git checkouts so parallel sessions never touch each other's files                                                               | You're running several sessions yourself, or your subagents edit overlapping files                                          |
| [`/batch`](./code-commands.md)       | A planned split of one large change into 5 to 30 worktree-isolated subagents that each open a pull request                               | A repo-wide migration or mechanical refactor you can describe in one instruction                                            |

In every approach the workers are Claude sessions. To involve a different tool, expose it to Claude as an [MCP server](./code-mcp.md).

You can combine these approaches. Agent view automatically moves each dispatched session into its own worktree when it needs to edit files, and a session you're working in can spawn subagents that each get their own worktree.

<Note>
  Running several sessions or subagents at once multiplies token usage. See [Costs](./code-costs.md) for usage and rate-limit details.
</Note>

## Choose an approach

The right approach depends on who coordinates the work, whether the workers need to communicate, and whether they edit the same files:

* **Who coordinates the work?** If you want Claude to delegate and collect results inside one conversation, use [subagents](./code-sub-agents.md). If you're handing off independent tasks and checking back on them, use [agent view](./code-agent-view.md). If you want Claude to plan, assign, and supervise a group of workers, use [agent teams](./code-agent-teams.md), which are experimental and disabled by default.
* **Do the workers need to talk to each other?** Subagents report results back to the conversation that spawned them, and agent view sessions report only to you. Teammates in an agent team share a task list and message each other directly.
* **Do the tasks touch the same files?** Isolate the work with [worktrees](./code-worktrees.md). Subagents and sessions you run yourself can each use a separate worktree. Agent teams don't isolate teammates in worktrees, so [partition the work](./code-agent-teams.md#avoid-file-conflicts) so each teammate owns a different set of files.

## Check on running work

The command for checking on running work depends on which approach you used:

* For background sessions, `claude agents` opens [agent view](./code-agent-view.md): one screen showing every session, its state, and which ones need your input.
* For subagents in the current session, `/agents` opens a panel with a **Running** tab listing live subagents and a **Library** tab where you [create and edit custom subagents](./code-sub-agents.md#use-the-%2Fagents-command). Despite the similar name, this is separate from `claude agents`.
* For anything running in the background of the current session, `/tasks` lists each item and lets you check on, attach to, or stop it.

For a desktop view of all your sessions, see [parallel sessions in the desktop app](./code-desktop.md#work-in-parallel-with-sessions).

## Learn more

Each guide below covers setup and configuration for one approach:

* [Create custom subagents](./code-sub-agents.md): define reusable specialists and control which tools they can use.
* [Manage agents with agent view](./code-agent-view.md): dispatch sessions, watch their state, and attach when one needs you.
* [Orchestrate agent teams](./code-agent-teams.md): set up a lead and teammates, assign tasks, and review their work.
* [Run parallel sessions with worktrees](./code-worktrees.md): start Claude in an isolated checkout, control what gets copied in, and clean up afterward.
