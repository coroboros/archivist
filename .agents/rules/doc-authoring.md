# Documentation authoring

Rules for authoring and maintaining content under `docs/`.

## Generated sections

`pnpm update` overwrites platform documentation selected by `DOCS` in `scripts/update-platform-docs.js`, including the `docs/general/` fallback, and Claude Code documentation in `docs/code/`. Their section indexes are generated too. Change the fetcher or upstream source, never these files by hand; the next scheduled fetch would erase manual edits.

## Insights (`docs/insights/`)

Manually curated articles from Anthropic team members and official resources. Conventions are derived from [claude-project-knowledge-bases-best-practices.md](../../docs/insights/claude-project-knowledge-bases-best-practices.md).

### Filename

- Lowercase kebab-case with hyphens — never underscores, spaces, or camelCase
- Use an existing topical prefix such as `claude-code-…`, `claude-project-…`, or `skills-…`; add one only for a distinct category
- Be descriptive and self-explanatory — filenames act as implicit metadata for Claude's retrieval
- Include year/version only when meaningful (e.g. `opus-4-7`)
- Avoid generic or temporary names such as `doc1.md`, `final.md`, and `latest.md`, and non-ASCII characters

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
