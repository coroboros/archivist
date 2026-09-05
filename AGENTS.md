# Archivist

Claude ecosystem reference: mirrored Anthropic documentation, curated insights, documentation scripts, and an optional Claude Project framework.

## Rule index

Read the matching rules before acting; reuse unchanged guidance already loaded in the session:

- `.claude/rules/doc-authoring.md` — generated sections, insight authoring, and indexing; read before changing documentation
- `.claude/rules/changelog.md` — manual and CI entry prefixes; read before changing a changelog

## Git and releases

- Target `main` through a PR. Each manual change prepares a release, including chores: patch for fixes/chores, minor for features or notable changes.
- Bump `package.json` with `pnpm version patch|minor --no-git-tag-version` and update `CHANGELOG.md`. Tagging and publication require explicit authorization.
- Release bodies open with `## vX.Y.Z — Title` before grouped sections. Other shared Git conventions apply.
- `.github/workflows/sync-docs.yml` syncs upstream every 12 hours and releases changed documentation automatically.

## Structure

- `docs/` — generated upstream sections and hand-curated `insights/`; editing boundaries live in the authoring rule
- `scripts/update-docs.js` — parallel code/platform fetch and indexing
- `scripts/update-platform-docs.js` — sitemap routing, HTML conversion, and locale recovery
- `scripts/update-code-docs.js` — Claude Code fetch
- `scripts/build-docs-index.js` — section headings and tags into `docs/INDEX.md`
- `scripts/zip.js` — archives for Claude Project uploads
- `claude/skills/ask-archivist/SKILL.md` — documentation lookup; installation is documented in `README.md`
- `claude/archivist-project/system-prompt.xml` — optional Claude Project instructions

## Commands and validation

Scripts use Bun; CI uses Node.js 22 and pnpm. See `package.json` for exact commands.

- `pnpm lint` — Biome check
- `pnpm update` — fetch upstream and rebuild indexes
- `pnpm index` — rebuild `docs/INDEX.md`
- `pnpm zip [folders...]` — archive all or selected documentation folders

Run lint after script or package changes. For documentation changes, check Markdown, relative links, and affected indexes. The sync workflow aborts excessive deletions using `MAX_REMOVED_FILES_PERCENTAGE` (default 25%).
