<div align="center">

<img src="assets/logo.png" width="288" height="288" alt="Coroboros"/>

<!-- omit in toc -->
# Archivist

**The canonical Claude ecosystem reference**

Auto-synced official docs and curated Anthropic team insights, built for **deterministic local lookup** via the Claude Code CLI — no RAG, no retrieval blind spots.

[![latest](https://img.shields.io/github/v/release/coroboros/archivist?style=flat-square&label=latest&color=000000)](https://github.com/coroboros/archivist/releases)
[![ci • sync-docs](https://img.shields.io/github/actions/workflow/status/coroboros/archivist/sync-docs.yml?branch=main&style=flat-square&label=ci%20%E2%80%A2%20sync-docs&color=000000)](https://github.com/coroboros/archivist/actions/workflows/sync-docs.yml)
[![branch](https://img.shields.io/badge/branch-stable-000000?style=flat-square)](https://github.com/coroboros/archivist)
[![license](https://img.shields.io/badge/license-MIT-000000?style=flat-square)](https://opensource.org/licenses/MIT)
[![stars](https://img.shields.io/github/stars/coroboros/archivist?style=flat-square&label=stars&color=000000)](https://github.com/coroboros/archivist)
[![skills](https://img.shields.io/badge/skills-000000?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJ3aGl0ZSI+PHBvbHlnb24gcG9pbnRzPSI4LDAgMTAsNiAxNiw4IDEwLDEwIDgsMTYgNiwxMCAwLDggNiw2Ii8+PC9zdmc+)](https://github.com/coroboros/agent-skills)
[![coroboros.com](https://img.shields.io/badge/coroboros.com-000000?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNMiAxMmgyME0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEweiIvPjwvc3ZnPg==)](https://coroboros.com)

</div>

- [Documentation](#documentation)
- [Using the Docs](#using-the-docs)
  - [Recommended — Claude Code CLI (deterministic)](#recommended--claude-code-cli-deterministic)
    - [Companion skill — `ask-archivist`](#companion-skill--ask-archivist)
  - [Alternative — Claude Project (probabilistic, with limits)](#alternative--claude-project-probabilistic-with-limits)
- [Automated Updates](#automated-updates)
- [License](#license)

---

## Documentation

Auto-updated mirror of the official Claude documentation, refreshed every 12h via [GitHub Actions](./.github/workflows/sync-docs.yml). Structure follows [Claude Project Knowledge Base best practices](./docs/insights/claude-project-knowledge-bases-best-practices.md).

| Section | Source | Link |
|---------|--------|------|
| API | platform.claude.com | [docs/api](./docs/api/api-README.md) |
| Developer | platform.claude.com | [docs/developer](./docs/developer/developer-README.md) |
| Resources | platform.claude.com | [docs/resources](./docs/resources/resources-README.md) |
| Claude Code | code.claude.com | [docs/code](./docs/code/code-README.md) |
| Insights | Curated from Anthropic team | [docs/insights](./docs/insights/insights-README.md) |
| **Cross-section topic index** | Auto-generated from H1/H2/tags | [**docs/INDEX.md**](./docs/INDEX.md) |

<details>
<summary><strong>Stay Updated</strong></summary>

- **GitHub Releases**: Watch > Custom > Releases

</details>

---

## Using the Docs

There are two ways to consume this knowledge base. They are not equivalent — pick based on the precision you need.

### Recommended — Claude Code CLI (deterministic)

```bash
git clone https://github.com/coroboros/archivist.git
cd archivist
claude
```

Claude Code reads files **directly** with `Grep` (full-text, deterministic) and `Read` (full file content). Every fact in the docs is reachable; no fact is silently dropped. Cross-references resolve dynamically because Claude can follow links across the entire mirror in one session.

This is the right path when you need surgical accuracy — writing technical docs, reviewing implementation choices against current Anthropic guidance, refining skills, cross-referencing API ↔ Code ↔ Developer features.

Use [`docs/INDEX.md`](./docs/INDEX.md) for cross-section topic navigation, then `Grep`/`Read` from there.

#### Companion skill — `ask-archivist`

This repo ships [`claude/skills/ask-archivist/SKILL.md`](./claude/skills/ask-archivist/SKILL.md), a companion skill that wraps the deterministic lookup workflow (INDEX Grep → section Grep → full-file Read → cite). Install it once, then ask questions in natural language — the skill auto-detects the mirror and cites the files it reads.

```bash
# From an archivist clone
mkdir -p ~/.claude/skills/ask-archivist
cp claude/skills/ask-archivist/SKILL.md ~/.claude/skills/ask-archivist/

# Point the skill at any mirror location (optional — defaults to $HOME/archivist or the current repo)
export ARCHIVIST_PATH="$PWD"
```

**Why this over the built-in `claude-code-guide` subagent?** Both answer the same kinds of questions, but on opposite ends of the precision/freshness tradeoff:

| | `ask-archivist` | `claude-code-guide` (built-in) |
|---|---|---|
| Source | Local mirror — every line reachable | Live `docs.claude.com` via `WebFetch` / `WebSearch` |
| Method | `Grep` + full-file `Read` | Relevance-ranked web fetch |
| Determinism | Reproducible, no silent miss | Depends on what search ranks — same RAG-style failure mode as Claude Projects |
| Cross-refs | Resolves across the whole mirror in one session | One fetch per follow-up |
| Freshness | 12h refresh ceiling | Real-time |

Use `ask-archivist` by default for precision work. Fall back to `claude-code-guide` when the change is < 12h old or the question is about runtime behavior / community patterns the docs don't cover — the skill explicitly names this escape-hatch so you keep the user in control.

### Alternative — Claude Project (probabilistic, with limits)

```
1. Create a Claude Project
2. Connect this repo as a GitHub data source (or upload docs/ folders)
3. Use the system prompt at claude/archivist-project/system-prompt.xml
```

Convenient for mobile, non-technical users, or quick queries away from a terminal — but **understand the tradeoff before relying on it for precise work**:

- Claude Projects use **RAG** (retrieval-augmented generation) once content exceeds the context window: docs are chunked, embedded, and retrieved by semantic similarity to your query.
- RAG is **probabilistic**: the relevant chunk may not surface in the top-k results, especially when your query phrasing differs from the doc's wording. Misses are silent — the model fills gaps with training-data approximations.
- Concrete example: asked about Claude Code worktrees, Claude Desktop has been observed to suggest manual `git worktree` setup, missing the native `claude --worktree` flag — even though it appears in 27 files of this mirror.

Full pedagogical write-up: [`claude/archivist-project/README.md`](./claude/archivist-project/README.md).

For high-precision work (regulated content, technical writing, audit-grade research), use the CLI path above.

---

## Automated Updates

The [GitHub Actions workflow](./.github/workflows/sync-docs.yml) runs every 12h:

1. Fetches latest Claude docs from Anthropic sitemaps
2. Generates markdown files with YAML frontmatter
3. Rebuilds README indexes and the cross-section [`docs/INDEX.md`](./docs/INDEX.md)
4. Auto-commits, tags, creates GitHub releases

Scripts run on **Bun**. To update docs locally: `pnpm update` (requires `bun` and `pnpm`).

**Safety guard:** Aborts if > 25% of files in any docs folder are deleted.

| Variable | Type | Purpose |
|----------|------|---------|
| `MAX_REMOVED_FILES_PERCENTAGE` | variable | Max % of deleted files before abort (default: 25) |

---

## License

[MIT](LICENSE.md)
