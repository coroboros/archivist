# Documentation Authoring

Rules for authoring and maintaining content under `docs/`.

## Auto-generated sections — do not edit

The following folders are overwritten by the update script (`pnpm update`) and must never be edited by hand:

- `docs/api/`
- `docs/code/`
- `docs/developer/`
- `docs/resources/`

Each of these folders has a `{section}-README.md` index that is regenerated on every update run. Manual edits are lost on the next CI fetch (every 12h).

## Insights (`docs/insights/`)

Manually curated articles from Anthropic team members and official resources. Conventions are derived from [claude-project-knowledge-bases-best-practices.md](../docs/insights/claude-project-knowledge-bases-best-practices.md).

### Filename

- Lowercase kebab-case with hyphens — never underscores, spaces, or camelCase
- Start with a topical prefix matching an existing group: `claude-code-…`, `claude-project-…`, `skills-…`. Introduce a new prefix only when a new category is unavoidable
- Be descriptive and self-explanatory — filenames act as implicit metadata for Claude's retrieval
- Include year/version only when meaningful (e.g. `opus-4-7`)
- Avoid: `doc1.md`, `final.md`, `latest.md`, or any non-ASCII characters

### Frontmatter

Required, exact keys, double-quoted strings:

```yaml
---
title: "Human-Readable Title"
source: "https://..."
category: "insights"
author: "Anthropic"  # or individual name if authored personally
date: "YYYY-MM-DD"   # publication date of the source, not the import date
tags: ["tag-one", "tag-two"]  # optional — lowercase kebab-case, surfaces the file in docs/INDEX.md cross-section topic groups
---
```

### Body

Clean Markdown — H1 title, no custom HTML, meaningful headings. Media referenced by URL (no local binaries in `docs/`).

### Index

Add every new file to `docs/insights/insights-README.md` under the matching section. The auto-generated `docs/INDEX.md` (from `pnpm index`) will pick up its title, headings, and any `tags` you set.
