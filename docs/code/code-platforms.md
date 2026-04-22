---
title: "Platforms and integrations"
source: "https://code.claude.com/docs/en/platforms"
category: "code"
generated: true
---
> ## Documentation Index
> Fetch the complete documentation index at: https://code.claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Platforms and integrations

> Choose where to run Claude Code and what to connect it to. Compare the CLI, Desktop, VS Code, JetBrains, web, mobile, and integrations like Chrome, Slack, and CI/CD.

Claude Code runs the same underlying engine everywhere, but each surface is tuned for a different way of working. This page helps you pick the right platform for your workflow and connect the tools you already use.

## Where to run Claude Code

Choose a platform based on how you like to work and where your project lives.

| Platform                          | Best for                                                                                           | What you get                                                                                                                                                                              |
| :-------------------------------- | :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CLI](./code-quickstart.md)             | Terminal workflows, scripting, remote servers                                                      | Full feature set, [Agent SDK](./code-headless.md), [computer use](./code-computer-use.md) on macOS (Pro and Max), third-party providers                                                               |
| [Desktop](./code-desktop.md)            | Visual review, parallel sessions, managed setup                                                    | Diff viewer, app preview, [computer use](./code-desktop.md#let-claude-use-your-computer) and [Dispatch](./code-desktop.md#sessions-from-dispatch) on Pro and Max                                      |
| [VS Code](./code-vs-code.md)            | Working inside VS Code without switching to a terminal                                             | Inline diffs, integrated terminal, file context                                                                                                                                           |
| [JetBrains](./code-jetbrains.md)        | Working inside IntelliJ, PyCharm, WebStorm, or other JetBrains IDEs                                | Diff viewer, selection sharing, terminal session                                                                                                                                          |
| [Web](./code-claude-code-on-the-web.md) | Long-running tasks that don't need much steering, or work that should continue when you're offline | Anthropic-managed cloud, continues after you disconnect                                                                                                                                   |
| Mobile                            | Starting and monitoring tasks while away from your computer                                        | Cloud sessions from the Claude app for iOS and Android, [Remote Control](./code-remote-control.md) for local sessions, [Dispatch](./code-desktop.md#sessions-from-dispatch) to Desktop on Pro and Max |

The CLI is the most complete surface for terminal-native work: scripting, third-party providers, and the Agent SDK are CLI-only. Desktop and the IDE extensions trade some CLI-only features for visual review and tighter editor integration. The web runs in Anthropic's cloud, so tasks keep going after you disconnect. Mobile is a thin client into those same cloud sessions or into a local session via Remote Control, and can send tasks to Desktop with Dispatch.

You can mix surfaces on the same project. Configuration, project memory, and MCP servers are shared across the local surfaces.

## Connect your tools

Integrations let Claude work with services outside your codebase.

| Integration                          | What it does                                       | Use it for                                                       |
| :----------------------------------- | :------------------------------------------------- | :--------------------------------------------------------------- |
| [Chrome](./code-chrome.md)                 | Controls your browser with your logged-in sessions | Testing web apps, filling forms, automating sites without an API |
| [GitHub Actions](./code-github-actions.md) | Runs Claude in your CI pipeline                    | Automated PR reviews, issue triage, scheduled maintenance        |
| [GitLab CI/CD](./code-gitlab-ci-cd.md)     | Same as GitHub Actions for GitLab                  | CI-driven automation on GitLab                                   |
| [Code Review](./code-code-review.md)       | Reviews every PR automatically                     | Catching bugs before human review                                |
| [Slack](./code-slack.md)                   | Responds to `@Claude` mentions in your channels    | Turning bug reports into pull requests from team chat            |

For integrations not listed here, [MCP servers](./code-mcp.md) and [connectors](./code-desktop.md#connect-external-tools) let you connect almost anything: Linear, Notion, Google Drive, or your own internal APIs.

## Work when you are away from your terminal

Claude Code offers several ways to work when you're not at your terminal. They differ in what triggers the work, where Claude runs, and how much you need to set up.

|                                                | Trigger                                                                                        | Claude runs on                                                                               | Setup                                                                                                                                | Best for                                                      |
| :--------------------------------------------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| [Dispatch](./code-desktop.md#sessions-from-dispatch) | Message a task from the Claude mobile app                                                      | Your machine (Desktop)                                                                       | [Pair the mobile app with Desktop](https://support.claude.com/en/articles/13947068)                                                  | Delegating work while you're away, minimal setup              |
| [Remote Control](./code-remote-control.md)           | Drive a running session from [claude.ai/code](https://claude.ai/code) or the Claude mobile app | Your machine (CLI or VS Code)                                                                | Run `claude remote-control`                                                                                                          | Steering in-progress work from another device                 |
| [Channels](./code-channels.md)                       | Push events from a chat app like Telegram or Discord, or your own server                       | Your machine (CLI)                                                                           | [Install a channel plugin](./code-channels.md#quickstart) or [build your own](./code-channels-reference.md)                                      | Reacting to external events like CI failures or chat messages |
| [Slack](./code-slack.md)                             | Mention `@Claude` in a team channel                                                            | Anthropic cloud                                                                              | [Install the Slack app](./code-slack.md#setting-up-claude-code-in-slack) with [Claude Code on the web](./code-claude-code-on-the-web.md) enabled | PRs and reviews from team chat                                |
| [Scheduled tasks](./code-scheduled-tasks.md)         | Set a schedule                                                                                 | [CLI](./code-scheduled-tasks.md), [Desktop](./code-desktop-scheduled-tasks.md), or [cloud](./code-routines.md) | Pick a frequency                                                                                                                     | Recurring automation like daily reviews                       |

If you're not sure where to start, [install the CLI](./code-quickstart.md) and run it in a project directory. If you'd rather not use a terminal, [Desktop](./code-desktop-quickstart.md) gives you the same engine with a graphical interface.

## Related resources

### Platforms

* [CLI quickstart](./code-quickstart.md): install and run your first command in the terminal
* [Desktop](./code-desktop.md): visual diff review, parallel sessions, computer use, and Dispatch
* [VS Code](./code-vs-code.md): the Claude Code extension inside your editor
* [JetBrains](./code-jetbrains.md): the extension for IntelliJ, PyCharm, and other JetBrains IDEs
* [Claude Code on the web](./code-claude-code-on-the-web.md): cloud sessions that keep running when you disconnect
* Mobile: the Claude app for [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684) and [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude) for starting and monitoring tasks while away from your computer

### Integrations

* [Chrome](./code-chrome.md): automate browser tasks with your logged-in sessions
* [Computer use](./code-computer-use.md): let Claude open apps and control your screen on macOS
* [GitHub Actions](./code-github-actions.md): run Claude in your CI pipeline
* [GitLab CI/CD](./code-gitlab-ci-cd.md): the same for GitLab
* [Code Review](./code-code-review.md): automatic review on every pull request
* [Slack](./code-slack.md): send tasks from team chat, get PRs back

### Remote access

* [Dispatch](./code-desktop.md#sessions-from-dispatch): message a task from your phone and it can spawn a Desktop session
* [Remote Control](./code-remote-control.md): drive a running session from your phone or browser
* [Channels](./code-channels.md): push events from chat apps or your own servers into a session
* [Scheduled tasks](./code-scheduled-tasks.md): run prompts on a recurring schedule
