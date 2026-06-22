---
title: "Designing Loops with Fable 5"
source: "https://x.com/RLanceMartin/status/2064397389189071163"
category: "insights"
author: "Lance Martin"
date: "2026-06-10"
tags: ["fable-5", "loops", "self-correction", "memory", "verification", "subagents", "goal", "managed-agents", "continual-learning"]
---

# Designing Loops with Fable 5

*From Lance Martin ([@RLanceMartin](https://x.com/RLanceMartin)), X thread, June 10, 2026.*

Mythos-class models like Claude Fable 5 have changed the way many of us work at Anthropic. I want to share two tips for getting the most out of this class of models.

## Self-correction loops

There's been a lot of interest in loops recently. Boris Cherny has mentioned that "(his) job is to write loops." Letting models hillclimb on an evaluation is a common recipe for improving task performance: `/goal` in Claude Code and `Outcomes` in Claude Managed Agent are primitives that let you apply this general recipe for your specific task.

As mentioned in the [Fable 5 prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5), Fable 5 is good at self-correcting in a loop. A well-designed goal or rubric adds feedback to the environment that Claude is running in. This lets Claude run, collect feedback via the goal or rubric, self-correct, and proceed until the goal or rubric is satisfied.

I'll share one toy example that I used to test Fable. `Parameter Golf` is an open-source ML engineering challenge to train the best model that fits in a 16MB artifact in under 10 minutes on 8×H100s. It's a bit like Karpathy's `autoresearch` project: it tests the ability of an agent to edit basic training code (a single `train_gpt.py` file), launch training, poll the log, read the score, and decide what experiment to run next.

I compared Fable 5 to Opus 4.7 on this challenge using Claude Managed Agents (CMA). CMA provides the agent harness as well as a hosted sandbox, so it's well-suited for long-running tasks with Fable 5. For Parameter Golf, I gave CMA access to 8×H100 GPUs as a self-hosted sandbox.

One subtle point: *what* does the judging is important. We've seen that models have problems with self-critique on their *own* outputs — Prithvi Rajasekaran wrote about this on the Anthropic engineering blog. We've found that a verifier sub-agent tends to outperform self-critique with Fable 5, because grading is done in an independent context window. `Outcomes` in CMA handles this by spawning a grader sub-agent for you.

For each test, I supplied a rubric (a file) with the nine checkable criteria (e.g. run a baseline, run 20 experiments). Then I ran Parameter Golf for up to 8 hours. The `Outcomes` grader confirmed that all experimental criteria were met before allowing Claude to stop the work.

Fable 5 improved the training pipeline ~6× more than Opus 4.7. If we consider experiments as structural (e.g. architecture changes) or scalar (e.g. adjusts a constant), Fable 5 bet on larger structural changes and showed resilience (e.g. pushing through a quantization regression to its biggest win). Opus 4.7's first experiment produced a small win, and nearly everything after followed the same template: adjust a scalar, measure, keep if positive.

## Memory

Memory is another area where Fable excels. We can think about this as an outer loop that spans across sessions: Claude writes to memory during a session, and those memories can be retrieved in future sessions.

Parth Asawa and team recently published Continual Learning Bench 1.0, so I wanted to test this on Fable 5 vs earlier models. I compared Fable 5, Opus 4.7, and Sonnet 4.6 on one of the tasks from the benchmark: the task asks an agent to answer sequential questions given access to a SQL database. Each question is a separate agent session, and memory is provided. For this, I used CMA with `memory`, which gives each agent access to a mounted filesystem that can be shared across sessions.

For this task, effective use of memory benefits from a progression:

1. **Fail** — get something wrong and document it.
2. **Investigate** — before moving on, figure out why.
3. **Verify** — turn the diagnosis into a checked fact.
4. **Distill** — turn verification into a general rule.
5. **Consult** — read the rule instead of re-deriving it.

| Model | Exit point and behavior |
| :--- | :--- |
| **Sonnet 4.6** | Exits around step 1: its store is a list of failure notes and open guesses (e.g. "maybe `prc` instead of `prc_usd`?"). It rarely consults prior notes. To improve performance, task-specific memory instructions are needed. |
| **Opus 4.7** | Exits around step 3: it creates a schema reference with uncertainty flagged (e.g. "possibly `prc` in cents? Verify."), but verification coverage is low: 7–33% of questions (median run ~17%). |
| **Fable 5** | Tends to complete the progression: in its strongest runs, verification coverage is up to 73% (22 of 30), and it distills learnings into general rules that help with future tasks. |

## Takeaway

Rather than directly prompting and steering Fable 5, it's often better to design loops that let the model self-correct in response to environment feedback (e.g. `/goal` or `Outcomes`) and manage its own context (e.g. via `memory`). I've shared just a few small-scale experiments that I've run, but it's worth testing Fable 5 for yourself on challenging tasks, using loops for self-correction or memory.

To get started, see the docs or ask the latest version of Claude Code, which can use the built-in `/claude-api` skill to tell you about Fable 5 (e.g. prompting best practices), `/goal`, Claude Managed Agents, or other API features.
