---
paths:
  - "CHANGELOG.md"
  - "**/CHANGELOG.md"
---

# Changelog

<!-- Archivist-specific overrides of global `~/.claude/rules/changelog.md`. Only sections that diverge are listed; global rules apply otherwise. -->

## Rules

Version headers MUST include a leading emoji distinguishing authorship — required because this repo interleaves CI auto-fetch entries (every 12h) with manual entries:

- `🤖` for CI-authored entries (the `update-docs` workflow)
- `🧑‍💻` for human/assistant-authored entries

Example:

```markdown
## 🧑‍💻 v1.1.0 - 18/04/2026

### Documentation
- Reformatted `LICENSE.md`

### Features
- Added search filters
```

## Prepend workflow

When prepending a new entry: prefix the version header with `🧑‍💻` for manual or human-initiated entries. `🤖` is reserved for the `update-docs` CI workflow — do not use it for manual entries.
