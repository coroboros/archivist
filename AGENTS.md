# Archivist

Claude ecosystem reference: mirrored Anthropic documentation, curated insights, documentation scripts, and an optional Claude Project framework.

## Project constraints

- Upstream documentation is generated; edit its fetchers, not their output. Curated insights have a separate authoring contract.
- Scripts run on Bun; CI uses Node.js 22 and pnpm. `package.json` owns commands; `README.md` owns installation, update configuration, and the optional Claude Project setup.

## Rule index

Read the rule for the affected work; reuse unchanged guidance already loaded in the session:

- Documentation: `.agents/rules/doc-authoring.md` owns generated sections, insight authoring, and indexing.
- Changelogs: `.agents/rules/changelog.md` owns manual and CI entry prefixes.

## Validation

Run `pnpm lint` after script or package changes. For documentation changes, check Markdown, relative links, and affected indexes; use `pnpm index` when the documentation index changes. Fetching upstream with `pnpm update` is a content update, not a validation step.

## Release

- Target `main` through a PR. Each manual change prepares a release, including chores: patch for fixes/chores, minor for features or notable changes.
- Bump `package.json` with `pnpm version patch|minor --no-git-tag-version` and update `CHANGELOG.md`. Tagging and publication require explicit authorization.
- Release bodies open with `## vX.Y.Z — Title` before grouped sections. Other shared Git conventions apply.
- `.github/workflows/sync-docs.yml` syncs upstream every 12 hours and releases changed documentation automatically.
