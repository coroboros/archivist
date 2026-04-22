---
name: ask-archivist
description: Consult a local mirror of Anthropic's official docs for authoritative answers about Claude Code (CLI flags, non-interactive mode, hooks, MCP, subagents, slash commands, skills, plugins, CLAUDE.md, sandboxing, worktrees, checkpointing, statusline, settings.json, agent teams), the Claude Agent SDK (agents, tools, state, streaming, managed agents), and the Claude API (messages, tool use, prompt caching, files, batch, citations, extended thinking, vision, pricing, rate limits, endpoints). Use whenever the user asks how anything in Claude's ecosystem works or behaves — features, flags, parameters, limits, configuration — including casual phrasing, French, typos, and questions that don't explicitly say "check docs". Also triggers on "does X support Y / can I do Z / what's the diff between A and B / how do I configure …" and on complaints about Claude Code behavior the user wants to change. Deterministic Grep + full-file Read over the local mirror — never training data. Cites paths and source URLs.
argument-hint: "[--section <api|code|developer|resources|insights>] [--tag <tag>] <question>"
allowed-tools: Bash Grep Read Glob
metadata:
  author: coroboros
---

# ask-archivist

Answer questions about Claude Code, the Claude Agent SDK, and the Claude API using a local, auto-updated mirror of the official Anthropic documentation. Deterministic `Grep` + full-file `Read`, never RAG, never training data.

## Why this exists

Training data is outdated. Claude Project + RAG silently misses facts when chunks split structural content (tables, CLI references) or when semantic similarity ranks the wrong chunk first. A concrete failure: asked *"How do I use git worktrees with Claude Code?"*, Claude Desktop recommends manual `git worktree add …` — missing the native `claude --worktree` flag documented in 27 mirror files.

The mirror path is different: every line is reachable via `Grep`, full files load intact, cross-references resolve. The `docs/INDEX.md` pre-computes cross-section topics and tags so lookups stay deterministic and cheap.

## Preflight

Two probes run before the skill reaches Claude. Read the results, apply the guard below, then proceed.

**Mirror location** — probes `$ARCHIVIST_PATH`, then `$HOME/archivist`, then the current working directory:

```!
if [ -n "$ARCHIVIST_PATH" ] && [ -f "$ARCHIVIST_PATH/docs/INDEX.md" ]; then
  echo "MIRROR=$ARCHIVIST_PATH"
elif [ -f "$HOME/archivist/docs/INDEX.md" ]; then
  echo "MIRROR=$HOME/archivist"
elif [ -f "$PWD/docs/INDEX.md" ] && [ -f "$PWD/scripts/build-docs-index.js" ]; then
  echo "MIRROR=$PWD"
else
  echo "MIRROR=MISSING"
fi
```

**Mirror age** — relative date of the last `docs/` commit, when the mirror was found:

```!
for candidate in "$ARCHIVIST_PATH" "$HOME/archivist" "$PWD"; do
  if [ -n "$candidate" ] && [ -d "$candidate/.git" ] && [ -f "$candidate/docs/INDEX.md" ]; then
    ( cd "$candidate" && echo "AGE=$(git log -1 --format=%cr docs/ 2>/dev/null)" )
    break
  fi
done
```

### Guard

If the mirror probe shows `MIRROR=MISSING`, reply once and stop:

> Mirror not found. Clone `coroboros/archivist` to `~/archivist/`, or export `ARCHIVIST_PATH` pointing to a local checkout. Falling back to training data is refused by design.

Otherwise → proceed to the lookup workflow. The resolved mirror path is `$MIRROR` from here on.

## Lookup workflow

### 1. Parse the request

Extract:

- **Question text** — the free-form user question.
- **Section filter** (optional) — `--section api|code|developer|resources|insights` limits the search to that folder.
- **Tag filter** (optional) — `--tag <tag>` limits to docs whose YAML frontmatter `tags:` array includes `<tag>`.

Identify 2–4 substantive keywords. Prefer exact Anthropic terminology (flag names, feature names, product names, exact CLI tokens) over paraphrases — that is the whole point of the deterministic path.

### 2. Grep the INDEX — never Read it fully

`docs/INDEX.md` is ~230 KB and ~50–60k tokens. Loading it whole destroys the token budget for no gain. Use `Grep` with context to surface matching topic headings (`### ...`) and the file-path bullets beneath them. Example:

```
Grep pattern="(?i)\bworktree\b" path="$MIRROR/docs/INDEX.md" -C 4
```

Collect candidate file paths that appear under matched topics. For multi-concept questions, run multiple Greps or use an alternation `(term1|term2)` pattern. The INDEX lists every topic (H1 + H2 headings, frontmatter tags) that appears in 2+ docs — that is its purpose.

### 3. Section Grep — primary for specific tokens, fallback otherwise

The INDEX lists **topic headings** (H1 / H2), not flag names or CLI tokens. When the question is about a specific token — a flag like `--worktree`, a backticked identifier, a known CLI command, a specific env var — skip the INDEX for that token and `Grep` directly across the section folders. Do this **in parallel** with the INDEX Grep when in doubt rather than serially.

When the INDEX Grep returned nothing useful for a topical query, also fall back to section Greps. In both cases, look for exact matches in code blocks, tables, and headings before accepting paraphrase matches.

### 4. Section priority (default)

When multiple matches span sections, order candidates by:

1. `docs/code/` — Claude Code CLI, features, workflows (~107 files)
2. `docs/developer/` — platform/developer guides, SDK references (~93 files)
3. `docs/insights/` — hand-curated deep-dives, best practices, building skills (~6 files)
4. `docs/resources/` — high-level overviews (~7 files)
5. `docs/api/` — **deprioritized**. ~1034 auto-generated endpoint refs. Mostly noise unless the user explicitly wants an endpoint, wire format, status code, header, or request/response schema. Promote `api/` only when keywords clearly signal API-endpoint specificity (`curl`, `POST /v1/…`, endpoint, header, request body, response schema, rate limit).

`--section X` overrides all of the above and restricts to that one folder.

### 5. Read full files

For each selected candidate (typically 1–5), `Read` the file in full. Chunk boundaries destroy structure — tables, code blocks, and frontmatter must stay intact. This is the core reason the skill exists.

If two sections answer the question differently (e.g. "skills" in API vs Code vs Developer), read one representative file per section and summarize the differences rather than picking arbitrarily.

### 6. Compose the answer

Structure:

- **Direct answer** — 1–3 paragraphs. Lead with the actionable fact. Quote specific syntax (flag names, parameter names, exact values) verbatim from the mirror rather than paraphrasing.
- **Sources** — list each consulted file as `- path/to/file.md — <source URL from frontmatter>`. Extract the `source:` field from the file's YAML frontmatter. If missing, omit the URL and keep just the path.
- **See also** (optional, only when relevant) — adjacent topics from the INDEX that a reader might want next.

### 7. Freshness warning

If the age probe reports the last `docs/` commit is older than 7 days, append this one-liner at the very end of the response:

> _Mirror last updated `<age>`. Run `pnpm update` in the mirror repo for the latest._

## Escape-hatches

Some questions fall outside this skill's deterministic scope. Do not silently invent an answer when you hit one — surface the limit and suggest delegating.

- **Feature announced in the last 12 hours.** The mirror refresh cadence is 12h; very fresh changes may not be present. Suggest the `claude-code-guide` subagent — invokable via the `Agent` tool with `subagent_type: "claude-code-guide"` — which performs live WebFetch / WebSearch against current `docs.claude.com`.
- **Questions beyond Anthropic's published docs** — GitHub issues, observed runtime behavior, blog posts, community patterns. Same subagent handles these.
- **Mirror genuinely missing or broken.** The mirror guard has already handled this.

The subagent is a user-chosen escape-hatch, not an automatic fallback. Name it, explain why it may help, and let the user decide.

## Anti-behaviours

- Never answer from training data when the mirror is reachable.
- Never paraphrase a fact without citing the source file.
- Never invent flag names, parameter signatures, pricing, or limits.
- Never skip the INDEX `Grep` shortcut when the mirror is present — it is the cheapest deterministic path.
- Never `Read` `docs/INDEX.md` in full; always `Grep` it.
- Never promote `docs/api/` over `docs/code/` or `docs/developer/` unless the query is specifically about an API endpoint.

## Output example

**Question:** *how do I use git worktrees with Claude Code?*

**Answer:**

Use `claude --worktree <path>` to launch Claude Code inside a git worktree. The flag is native — Claude Code cds into the worktree for the session, and its hooks, `.claude/` settings, and `CLAUDE.md` resolve from there. See `code-cli-reference.md` for the flag definition and `code-common-workflows.md` for recommended usage patterns.

**Sources:**
- `docs/code/code-cli-reference.md` — https://docs.claude.com/en/docs/claude-code/cli-reference
- `docs/code/code-common-workflows.md` — https://docs.claude.com/en/docs/claude-code/common-workflows

**See also:** checkpointing, hooks.

## Notes on the mirror

- `docs/INDEX.md` is auto-generated by `scripts/build-docs-index.js` in the mirror repo. It lists every topic (H1 + H2 headings + frontmatter tags) that appears in 2+ docs. It is a cross-section shortlist, not an index of every heading.
- Filenames follow `<section>-<slug>.md` (e.g. `code-cli-reference.md`, `api-beta-skills.md`, `developer-build-with-claude-files.md`). Useful for `Glob` when a section-scoped name pattern is faster than INDEX lookup.
