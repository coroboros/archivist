# Archivist Project — Setup & Tradeoffs

A ready-to-use Claude Project foundation: an XML [system prompt](./system-prompt.xml) and a knowledge base grounding protocol.

> **Read the tradeoffs section before relying on this for precise work.** For surgical accuracy, the [Claude Code CLI path](../../README.md#recommended--claude-code-cli-deterministic) is structurally better.

---

## Setup

1. Create a new Claude Project named `Archivist`
2. Paste the [system prompt](./system-prompt.xml) into the project's custom instructions
3. Upload knowledge base folders: `docs/code/`, `docs/developer/`, `docs/resources/`, optionally `docs/api/` and `docs/insights/`

**Keeping docs updated:** Fork this repo, then connect it as a GitHub data source in your Claude Project. The GitHub Actions workflow auto-refreshes docs every 12h — click **Sync** in Project Settings to pull the latest into your knowledge base, no re-upload needed. Alternatively, run `pnpm update` locally and re-upload.

---

## Deterministic vs probabilistic — why this matters

How a Claude session **finds** a fact in a knowledge base shapes whether it can give you a correct answer at all. There are two regimes, and they are not equivalent.

### Deterministic access — Claude Code CLI

When you run `claude` inside a cloned copy of this repo, Claude uses **`Grep`** (full-text regex search) and **`Read`** (full file content) directly against the file system.

- **Every line of every doc is reachable.** A search for `--worktree` returns every match across the entire mirror, every time, in the same order.
- **Full files load into context** — chunk boundaries don't exist; structural cues (tables, code blocks, frontmatter) stay intact.
- **Cross-references resolve dynamically** — Claude follows links across `docs/api/ ↔ docs/code/ ↔ docs/developer/` in a single turn.
- **Failure mode**: if a fact isn't in the docs, Claude says so. No silent fabrication.

### Probabilistic access — Claude Project + RAG

When a Claude Project's knowledge base exceeds what fits in the context window, it switches to **retrieval-augmented generation (RAG)**:

1. Documents are split into **chunks** (paragraphs or sections).
2. Each chunk is **embedded** into a high-dimensional vector.
3. Your query is embedded too.
4. The top-k chunks most **semantically similar** to the query are pulled into context.
5. Claude answers from those chunks.

Each step is a lossy approximation:

- **Chunking destroys structure.** A CLI flag listed in a reference table can lose its enclosing table, page title, or surrounding examples.
- **Semantic similarity ≠ correctness.** A query phrased differently from the doc's wording can rank the right chunk outside the top-k. The model never sees it.
- **Misses are silent.** When the right chunk is missing, the model fills the gap from training data — confidently, indistinguishably from a real answer.
- **No cross-reference resolution.** Following a link from one doc to another isn't a built-in RAG operation; the next chunk is whatever the next embedding match happens to be.

### Concrete failure example

Asked *"How do I use git worktrees with Claude Code?"*, Claude Desktop has been observed to recommend manual `git worktree add ...` commands — **missing the native `claude --worktree` flag entirely**. That flag is documented in **27 files** of this mirror (e.g., `docs/code/code-cli-reference.md`, `docs/code/code-common-workflows.md`, `docs/code/code-hooks.md`, `docs/code/code-desktop.md`).

This is a textbook RAG failure mode:

- The phrasing "git worktrees with Claude Code" semantically matches general-purpose `git worktree` content faster than it matches a specific CLI flag reference.
- The `--worktree` flag's most authoritative entry sits inside a table in `code-cli-reference.md` — chunking can sever it from its context.
- The model's training data contains plenty of generic `git worktree` lore and fills the gap.

The CLI path returns the correct answer in one `Grep` call.

---

## When to use which

| Use case | Recommended path |
|----------|------------------|
| Writing technical docs / regulated content (e.g. compliance lessons) | Claude Code CLI |
| Refining skills, cross-referencing API ↔ Code ↔ Developer | Claude Code CLI |
| Audit-grade research, "is this still true in current docs?" | Claude Code CLI |
| Quick conceptual question on mobile or away from terminal | Claude Project (accept RAG limits) |
| Onboarding non-technical teammates to Claude's ecosystem | Claude Project (accept RAG limits) |
| Browsing — "what does Claude offer for X?" | Either; CLI if precision matters |

If your work would suffer from a confident-but-wrong answer, choose deterministic.

---

## A note on the system prompt

[`system-prompt.xml`](./system-prompt.xml) explicitly instructs the assistant to:

- Search the knowledge base **first** (never rely on training data for facts about Claude)
- **Cite** what it finds
- **Flag gaps honestly** rather than speculate

These instructions reduce — but do not eliminate — RAG failure modes. They cannot fix retrieval misses; they only encourage honest behavior when the retrieval succeeds and increase the chance the model says "I don't know" when it fails. For high-stakes precision, this is necessary but not sufficient. Use the CLI path.
