---
title: "Claude Code — Key Practices"
source: "https://github.com/coroboros/archivist"
category: "insights"
author: "Coroboros"
date: "2026-04-23"
tags: ["claude-code", "workflows", "verification", "parallelism", "plan-mode", "hooks", "skills", "opus-4-7", "effort", "delegation"]
---

# Claude Code — Key Practices

Distilled from [Boris Cherny's workflow](./claude-code-workflow-boris-cherny.md), [hidden features](./claude-code-hidden-features.md), and [Anthropic's skills guide](./skills-how-anthropic-uses-skills.md).

**Verification is everything.** Give Claude a way to verify its work — browser (Chrome extension), test suite, lint, typecheck. This 2-3x the quality of the result. ([source](./claude-code-workflow-boris-cherny.md))

**Run Claudes in parallel.** Use multiple terminal tabs, cloud sessions (claude.ai/code), and mobile (iOS/Android app). Hand off between them with `/teleport`. Use `claude -w` to start sessions in git worktrees for conflict-free parallel work. ([source](./claude-code-hidden-features.md))

**Start in Plan mode.** Hit `shift+tab` twice. Go back and forth until you like the plan, then switch to auto-accept edits for a 1-shot implementation. ([source](./claude-code-workflow-boris-cherny.md))

**Automate with `/loop` and skills.** Turn repeated workflows into skills, then schedule them: `/loop 5m /babysit`, `/loop 30m /slack-feedback`. Skills + loops is the power combo. ([source](./claude-code-hidden-features.md))

**Keep CLAUDE.md minimal.** Under 100 lines. Only what the agent can't discover on its own. Add rules when Claude makes mistakes — not preemptively. The team maintains it via code review. ([source](./claude-code-workflow-boris-cherny.md))

**Use hooks for deterministic logic.** `PreToolUse` for bash validation, `PostToolUse` for auto-formatting, `Stop` for notifications, `SessionStart` for dynamic context loading. Don't put deterministic checks in prompts — put them in hooks. ([source](./claude-code-hidden-features.md))

**Prefer skills + CLI over MCPs.** Skills load on-demand; MCPs consume context permanently. Replace heavy MCPs (Playwright, etc.) with CLI tools like `dev-browser` that Claude calls via Bash. ([source](./skills-how-anthropic-uses-skills.md))

**Use Opus for everything.** It's the best coding model — less steering, better tool use, faster end-to-end even though it's slower per-token. On Opus 4.7, keep the default `xhigh` effort for most agentic work; only drop to `high` for concurrent sessions or cost sensitivity, and reserve `max` for genuinely hard problems. ([source](./claude-code-workflow-boris-cherny.md), [Opus 4.7 guide](./claude-code-best-practices-opus-4-7.md))

**Enforce coding discipline via rules, not skills.** Distill [Andrej Karpathy's observations on LLM coding pitfalls](https://x.com/karpathy/status/2015883857489522876) into always-on rules — behavioral guardrails that auto-load every session, rather than skills requiring manual invocation. Only the rules that add to Claude Code's built-in guidelines are worth including — ~70% of typical advice is already handled natively by the system prompt (simplicity, no speculative features, surgical changes).

**Delegate, don't pair-program.** Specify intent, constraints, acceptance criteria, and file locations **in the first turn**. Every user interjection adds reasoning overhead and can hurt both tokens and quality. Batch questions, use auto mode (`Shift+Tab`, Max users, research preview) for trusted long-running tasks, and let the model run. ([source](./claude-code-best-practices-opus-4-7.md))

**Tune thinking depth if needed.** Opus 4.7 uses adaptive thinking only — fixed thinking budgets and `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` no longer apply. `xhigh` is the recommended default and outperforms older `max` settings in most cases. If reasoning feels shallow on a hard problem, **raise the effort level** rather than prompting around it — at `low`/`medium`, 4.7 scopes work strictly to what was asked. ([source](./claude-code-best-practices-opus-4-7.md))

## Opus 4.7 — Effort, thinking, and levers

**Effort levels** — precedence: `CLAUDE_CODE_EFFORT_LEVEL` env var > `/effort` slash command > `settings.json` > model default.

| Level | When to use |
|-------|-------------|
| `low` | Tight scope, latency-sensitive — work stays strictly in-bounds |
| `medium` | Cost-sensitive — less capable on hard tasks, still beats Opus 4.6 at the same level |
| `high` | Concurrent sessions or cost management without a large quality drop |
| `xhigh` **(default)** | Best for most agentic coding — strong autonomy without token runaway |
| `max` | Genuinely hard problems only — diminishing returns, more prone to overthinking |

**`ultrathink` keyword** — in-context instruction for deep reasoning on a specific step. Does NOT change the effort level sent to the API; it's a one-off nudge. Prefer raising effort for sustained complex work.

**Prompt for more thinking** — *"Think carefully and step-by-step before responding; this problem is harder than it looks."*

**Prompt for less thinking** — *"Prioritize responding quickly rather than thinking deeply. When in doubt, respond directly."* Saves tokens but may hurt accuracy on harder steps; prefer lowering effort first.

**Env var gotchas.** `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` has **no effect on Opus 4.7** — it only applies to Opus 4.6 and Sonnet 4.6. `CLAUDE_CODE_AUTO_COMPACT_WINDOW` controls the context-window size used for auto-compaction calculations, **not** thinking depth. ([source](../code/code-env-vars.md))

**Anti-patterns to remove.** Scaffolding tuned for Opus 4.6 often hurts 4.7:

- Over-prompting ("If in doubt, use [tool]") causes tool over-triggering — 4.7 reasons more and calls tools less by default.
- Negative instructions ("Don't do X") — prefer positive examples of the voice and behavior you want.
- Ambiguous prompts spread across many turns — specify intent, constraints, acceptance criteria, and file locations **in the first turn**.
- Forcing subagents for small work — 4.7 is judicious by default; spell out when fanning out across items is worth it.
