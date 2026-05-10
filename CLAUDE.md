# Archivist

Canonical Claude ecosystem reference: mirrors Anthropic's official documentation (auto-synced every 12h via GitHub Actions), curates insights from Anthropic team members, ships the `ask-archivist` companion skill for deterministic doc lookup, and includes an optional Claude Project framework. Reference repo only — docs + insights, no build, no tests, no TypeScript.

Skills extracted to [coroboros/agent-skills](https://github.com/coroboros/agent-skills); personal Claude Code config to [coroboros/claude-config](https://github.com/coroboros/claude-config).

## Canonical rules

@.claude/rules/doc-authoring.md
@.claude/rules/changelog.md    # OVERRIDES ~/.claude/rules/changelog.md — emoji prefix (🤖 CI / 🧑‍💻 human)

Global rules (`~/.claude/rules/*`) inherit automatically. Git-conventions divergence:

- **Git** — branch `main`; every human/assistant change ships as a release, even chores (patch for fixes/chores, minor for features or notable changes — per-change visibility beats batched changelogs); release body opens with `## vX.Y.Z — Title` as the FIRST heading, before any grouped sections; bump via `pnpm version patch|minor`. All other rules in `@~/.claude/rules/git-conventions.md` apply.

## Commands

```bash
pnpm lint              # Biome check
pnpm lint:fix
pnpm update            # Fetch latest official Claude docs from Anthropic's sitemap (fetch + index)
pnpm index             # Rebuild docs/INDEX.md only
pnpm zip               # Zip docs folders for upload to Claude Projects (all)
pnpm zip api code      # Specific folders
```

## Architecture

### `docs/`

Auto-generated markdown mirroring Anthropic's sitemap. Folder structure tracks upstream sections 1:1: `about-claude/`, `agents-and-tools/`, `api/`, `build-with-claude/`, `manage-claude/`, `managed-agents/`, `release-notes/`, `test-and-evaluate/`, `general/` (fallback for orphan top-level pages) from `platform.claude.com`; `code/` from `code.claude.com`; plus hand-curated `insights/`. Each section has a `{section}-README.md` regenerated on update.

The EN sitemap is incomplete for human-facing sections, so `update-platform-docs.js` augments it via the DE locale sitemap (rewritten back to EN) through `RECOVERY_SECTIONS`. 404s on recovered URLs drop silently at fetch time.

Per-folder editing rules: `.claude/rules/doc-authoring.md`.

### `scripts/`

- `update-docs.js` — orchestrator (parallel: code, platform, index)
- `update-platform-docs.js` — platform docs from XML sitemap, routes URLs into folders mirroring upstream top-level sections (config: `DOCS`), HTML → markdown
- `update-code-docs.js` — Claude Code docs from a separate sitemap
- `build-docs-index.js` — scans every section, extracts H1/H2 + YAML `tags`, writes `docs/INDEX.md`
- `zip.js` — `.zip` archives of doc folders for Claude Project uploads

### Companion skill

`claude/skills/ask-archivist/SKILL.md` — deterministic-lookup over this mirror (INDEX → Grep → Read → cite). Public template; install instructions in `README.md`.

### Claude Project framework

`claude/archivist-project/system-prompt.xml` — XML system prompt for an "Archivist" assistant in Claude Projects.

## Key details

- **Runtime**: Bun (scripts), Node.js 22 (pinned via `.node-version`, used by pnpm in CI)
- **Package manager**: pnpm (Corepack)
- **Linter/Formatter**: Biome (`biome check --write`)
- **Language**: Plain JavaScript (ES modules), no TypeScript
- **CI**: `.github/workflows/sync-docs.yml` runs every 12h, auto-versions with `pnpm version patch`, commits, tags, creates GitHub releases. On failure, auto-opens a `sync-docs-failure`-labelled issue (de-duped per day) so silent breakage cannot happen.
- **Safety guard**: CI aborts if more than 25% of files in any docs folder are deleted (configurable via `MAX_REMOVED_FILES_PERCENTAGE`)
- **Versioning**: SemVer, auto-patched by CI on doc changes. Manual releases follow the inline **Git** rule above (overrides global `~/.claude/rules/git-conventions.md`).
