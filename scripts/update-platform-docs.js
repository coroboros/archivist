import fs from 'node:fs/promises';
import path from 'node:path';

// --- Configuration ---
const SITEMAP_URL = 'https://platform.claude.com/sitemap.xml';
const URL_PREFIX = 'https://platform.claude.com/docs/en/';
const PATHS_TO_IGNORE = [];
const PATHS_TO_IGNORE_REGEXP =
  PATHS_TO_IGNORE.length > 0 ? new RegExp(`(${PATHS_TO_IGNORE.join('|')})`) : null;
// Some EN sections are live pages but missing from the EN sitemap (currently
// release-notes). We recover them by mirroring URLs from another locale that
// IS in the sitemap. 404s on recovered URLs are silently skipped at fetch time.
const RECOVERY_LOCALE_PREFIX = 'https://platform.claude.com/docs/de/';
const RECOVERY_SECTIONS = ['/release-notes/'];
const DOCS_DIR = 'docs';
const FALLBACK_TYPE = 'general';
// NOTE: key and type MUST be the same. Folders mirror upstream sitemap top-level sections;
// `general` is the fallback bucket for orphan pages (intro, future additions).
const DOCS = {
  api: {
    name: 'Platform | API',
    paths: ['/api/', '/get-started'],
    readmePath: `${DOCS_DIR}/api/api-README.md`,
    type: 'api',
  },
  'agents-and-tools': {
    name: 'Platform | Agents & Tools',
    paths: ['/agents-and-tools/'],
    readmePath: `${DOCS_DIR}/agents-and-tools/agents-and-tools-README.md`,
    type: 'agents-and-tools',
  },
  'build-with-claude': {
    name: 'Platform | Build with Claude',
    paths: ['/build-with-claude/'],
    readmePath: `${DOCS_DIR}/build-with-claude/build-with-claude-README.md`,
    type: 'build-with-claude',
  },
  'manage-claude': {
    name: 'Platform | Manage Claude',
    paths: ['/manage-claude/'],
    readmePath: `${DOCS_DIR}/manage-claude/manage-claude-README.md`,
    type: 'manage-claude',
  },
  'managed-agents': {
    name: 'Platform | Managed Agents',
    paths: ['/managed-agents/'],
    readmePath: `${DOCS_DIR}/managed-agents/managed-agents-README.md`,
    type: 'managed-agents',
  },
  'test-and-evaluate': {
    name: 'Platform | Test & Evaluate',
    paths: ['/test-and-evaluate/'],
    readmePath: `${DOCS_DIR}/test-and-evaluate/test-and-evaluate-README.md`,
    type: 'test-and-evaluate',
  },
  'release-notes': {
    name: 'Platform | Release Notes',
    paths: ['/release-notes/'],
    readmePath: `${DOCS_DIR}/release-notes/release-notes-README.md`,
    type: 'release-notes',
  },
  [FALLBACK_TYPE]: {
    name: 'Platform | General',
    paths: [], // fallback for anything not matched above
    readmePath: `${DOCS_DIR}/${FALLBACK_TYPE}/${FALLBACK_TYPE}-README.md`,
    type: FALLBACK_TYPE,
  },
};

/**
 * Extracts a title from markdown content. Prefers the first H1; falls back to
 * the first H2 since many SDK API ref pages (e.g. `## Create`, `## List`) ship
 * without an H1.
 */
function extractTitle(content) {
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  const h2 = content.match(/^##\s+(.+)$/m);
  return h2 ? h2[1].trim() : null;
}

/**
 * Builds YAML frontmatter for a document.
 */
function buildFrontmatter(content, url, category) {
  const title = extractTitle(content);
  const lines = ['---'];
  if (title) lines.push(`title: "${title.replaceAll('"', '\\"')}"`);
  lines.push(`source: "${url}"`);
  lines.push(`category: "${category}"`);
  lines.push('generated: true');
  lines.push('---', '');
  return lines.join('\n');
}

/**
 * Removes previously generated files and directories to ensure a clean build.
 */
async function cleanPreviousBuild() {
  console.log('🧼 1. Cleaning up previous build...');

  const subdirs = Object.keys(DOCS);

  for (const d of subdirs) {
    const directoryPath = path.join(DOCS_DIR, d);

    await fs.rm(directoryPath, { force: true, recursive: true });
    console.log(`   -> Directory '${directoryPath}' removed.`);

    await fs.mkdir(directoryPath, { recursive: true });
    console.log(`   -> Directory '${directoryPath}' created.`);
  }

  console.log('   Cleanup complete.');
}

/**
 * Determines a doc type from its url.
 */
function determineDocType(url) {
  const cleaned = String(url).replace(URL_PREFIX, '').replace(/^\/+/, '');

  for (const type of Object.keys(DOCS)) {
    for (const p of DOCS[type].paths) {
      const startPath = String(p).replace(/^\/+/, '');
      if (!startPath) continue;
      if (cleaned.startsWith(startPath)) return type;
    }
  }
  return FALLBACK_TYPE;
}

/**
 * Downloads each document, rewrites its internal links to be relative or external,
 * and saves it to the docs directory.
 */
async function downloadAndSaveDocs(allUrls, filenamesByURLs) {
  console.log('📖 3. Downloading, rewriting, and saving documentation...');
  const promises = [];
  const skipped = [];
  const written = new Set();

  for (const url of allUrls) {
    const mdUrl = `${url}.md`;
    const { docRelative } = filenamesByURLs[url];
    const filePath = path.join(DOCS_DIR, docRelative);

    promises.push(
      fetch(mdUrl)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then((text) => {
          // Some upstream URLs (currently /api/php/* and /api/terraform/*) have
          // no real markdown source — the .md endpoint serves the rendered HTML
          // page instead. Skip those so the mirror stays clean. If Anthropic
          // adds markdown later, the file appears automatically on the next run.
          if (text.trimStart().startsWith('<!DOCTYPE')) {
            skipped.push(mdUrl);
            return;
          }
          const rewritten = rewriteLocalLinks(text, filenamesByURLs, url);
          const { docType } = filenamesByURLs[url];
          const frontmatter = buildFrontmatter(text, url, docType);
          written.add(url);
          return fs.writeFile(filePath, frontmatter + rewritten, 'utf8');
        })
        .catch((error) => {
          console.error(`   ! Failed to process ${mdUrl}: ${error.message}`);
        }),
    );
  }

  await Promise.all(promises);
  console.log(`   ${written.size} files written, ${skipped.length} skipped (HTML-only upstream).`);
  return written;
}

/**
 * Extracts the category from the URL
 */
function extractCategory(url, prefix = URL_PREFIX) {
  const relative = url.replace(prefix, '').replace(/^\/+/, '');
  const first = relative.split('/')[0] || 'misc';
  return first
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Fetches all URLs from the site's sitemap and filters for the target documentation.
 */
async function fetchAllUrlsFromSitemap() {
  console.log('🗺️ 2. Fetching all URLs from the sitemap...');
  const response = await fetch(SITEMAP_URL, {
    headers: {
      Accept: 'application/xml, text/xml',
      'User-Agent': 'Mozilla/5.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${response.status}`);
  }

  const xml = await response.text();
  const allUrls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const enUrls = allUrls.filter(
    (url) => url.startsWith(URL_PREFIX) && !PATHS_TO_IGNORE_REGEXP?.test(url),
  );

  // Recover EN URLs missing from the sitemap by mirroring a known-complete
  // locale. Dead URLs (404 in EN) are silently skipped at fetch time.
  const recoveredUrls = allUrls
    .filter((u) => u.startsWith(RECOVERY_LOCALE_PREFIX))
    .filter((u) => RECOVERY_SECTIONS.some((s) => u.includes(s)))
    .map((u) => u.replace(RECOVERY_LOCALE_PREFIX, URL_PREFIX));

  const filteredUrls = [...new Set([...enUrls, ...recoveredUrls])];

  console.log(
    `   ${filteredUrls.length} Claude Platform URLs found (${enUrls.length} via EN sitemap, +${filteredUrls.length - enUrls.length} recovered from ${RECOVERY_LOCALE_PREFIX}).`,
  );

  if (filteredUrls.length === 0) {
    throw new Error('No Claude Platform URLs found.');
  }

  const filenamesByURLs = {};

  for (const url of filteredUrls) {
    const filename = urlToFilename(url);
    const docType = determineDocType(url);
    let cleanFilename = filename;

    while (cleanFilename.startsWith(`${docType}-`)) {
      cleanFilename = cleanFilename.replace(`${docType}-`, '');
    }

    const prefixedFilename = `${docType}-${cleanFilename}`;
    const docRelative = `${docType}/${prefixedFilename}`;

    filenamesByURLs[url] = {
      category: extractCategory(url),
      docRelative,
      docType,
      filename: prefixedFilename,
      relativePath: url.replace(URL_PREFIX, '').replace(/\.md$/, ''),
    };
  }

  return filenamesByURLs;
}

/**
 * Generates individual README.md files for each documentation type (one per
 * key in DOCS), each containing a full table of contents for its own section
 * only. Empty sections are skipped.
 */
async function generateReadmeFiles(allUrls, filenamesByURLs) {
  console.log('👓 4. Generating README files...');

  const docsByType = Object.fromEntries(Object.keys(DOCS).map((t) => [t, []]));

  for (const url of allUrls) {
    const entry = filenamesByURLs[url];
    docsByType[entry.docType].push(entry);
  }

  for (const docType of Object.keys(docsByType)) {
    const items = docsByType[docType];
    if (items.length === 0) continue;

    const readmePath = DOCS[docType].readmePath;
    const humanName = DOCS[docType].name;

    let readme = `# ${humanName}\n\n`;
    readme += `_This repository is a mirror of the official [Claude Platform](${URL_PREFIX}) documentation (${humanName}). It is updated automatically._\n\n`;
    readme += `**Last updated:** ${new Date().toUTCString()}\n\n`;
    readme += '---\n\n';

    const grouped = {};

    for (const entry of items) {
      const { category, docRelative, relativePath } = entry;
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push({ docRelative, relativePath });
    }

    const categories = Object.keys(grouped).sort();

    for (const category of categories) {
      readme += `## ${category}\n\n`;

      for (const { docRelative, relativePath } of grouped[category]) {
        const parts = relativePath.split('/');

        const depth = parts.length;

        const subCategory =
          depth > 2
            ? parts[1].replaceAll('-', ' ').replaceAll(/\b\w/g, (c) => c.toUpperCase())
            : '';

        const rawTitle = parts[depth - 1] || parts[0];

        const title = rawTitle
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        const finalTitle =
          subCategory && subCategory !== title ? `${subCategory} | ${title}` : title;

        readme += `- [${finalTitle}](./${path.basename(docRelative)})\n`;
      }

      readme += '\n';
    }

    await fs.writeFile(readmePath, readme);
    console.log(`   README for '${docType}' generated: ${readmePath}`);
  }
}

/**
 * Rewrites absolute documentation links within the downloaded Markdown content
 * to relative local file links or external if not found.
 */
function rewriteLocalLinks(content, filenamesByURLs, currentUrl) {
  const mdLinkRegex =
    /\]\((?:https?:\/\/platform\.claude\.com\/docs\/en\/|\/docs\/en\/|\/en\/)([^#)]+)(#[^)]*)?\)/g;
  const attributeLinkRegex =
    /\b(href|src|to|url)=["'](?:https?:\/\/platform\.claude\.com\/docs\/en\/|\/docs\/en\/|\/en\/)([^"']+)["']/g;

  function resolveLink(targetSlug, currentUrlLocal) {
    const cleanedSlug = targetSlug
      .replace(/^docs\/en\//, '')
      .replace(/^en\//, '')
      .replace(/^\/+/, '');

    let fullUrl = `${URL_PREFIX}${cleanedSlug}`;
    fullUrl = fullUrl.split(/[?#]/)[0].replace(/\/+$/, '');

    if (filenamesByURLs[fullUrl]) {
      const targetRel = filenamesByURLs[fullUrl].docRelative.replaceAll('\\', '/');
      const currentRel = filenamesByURLs[currentUrlLocal]?.docRelative.replaceAll('\\', '/') || '';
      const currentDir = currentRel ? path.posix.dirname(currentRel) : '.';
      let rel = path.posix.relative(currentDir, targetRel);
      if (!rel || rel === '') rel = path.posix.basename(targetRel);
      if (!rel.startsWith('.') && !rel.startsWith('/')) rel = `./${rel}`;
      return rel;
    }

    return `${fullUrl}.md`;
  }

  let replacedContent = String(content);

  replacedContent = replacedContent.replaceAll(mdLinkRegex, (_match, targetSlug, fragment = '') => {
    return `](${resolveLink(targetSlug, currentUrl)}${fragment})`;
  });
  replacedContent = replacedContent.replaceAll(
    attributeLinkRegex,
    (_match, attribute, targetSlug) => {
      return `${attribute}="${resolveLink(targetSlug, currentUrl)}"`;
    },
  );

  return replacedContent;
}

/**
 * Removes section folders that received no URLs in this run. Upstream sometimes
 * holds an empty section (e.g. release-notes only exists in /de/ today); we
 * don't want orphan empty dirs polluting the index.
 */
async function pruneEmptySections(allUrls, filenamesByURLs) {
  const populated = new Set();
  for (const url of allUrls) populated.add(filenamesByURLs[url].docType);

  for (const docType of Object.keys(DOCS)) {
    if (populated.has(docType)) continue;
    const directoryPath = path.join(DOCS_DIR, docType);
    await fs.rm(directoryPath, { force: true, recursive: true });
    console.log(`   -> Pruned empty section '${directoryPath}' (no upstream URLs).`);
  }
}

/**
 * The main function that orchestrates the entire mirroring process.
 */
async function run() {
  await cleanPreviousBuild();

  const filenamesByURLs = await fetchAllUrlsFromSitemap();
  const allUrls = Object.keys(filenamesByURLs);

  const writtenUrls = await downloadAndSaveDocs(allUrls, filenamesByURLs);
  const writtenList = [...writtenUrls];
  await generateReadmeFiles(writtenList, filenamesByURLs);
  await pruneEmptySections(writtenList, filenamesByURLs);

  console.log('\n✅ Claude Platform documentation updated successfully!');
}

/**
 * Transforms a documentation URL to the target filename to be saved
 */
function urlToFilename(url, prefix = URL_PREFIX) {
  let urlPath = String(url).replace(prefix, '');
  urlPath = urlPath.replace(/\/+$/, '');
  [urlPath] = urlPath.split(/[?#]/);
  urlPath = urlPath.replace(/^\/+/, '');
  if (!urlPath) return 'index.md';
  const filename = urlPath
    .replaceAll('/', '-')
    .replaceAll(/[^a-zA-Z0-9._-]/g, '-')
    .toLowerCase();
  return `${filename}.md`;
}

/**
 * Export.
 */
export default {
  DOCS,
  run,
};

// run().catch((error) => {
//   console.error('\n❌ A fatal error occurred during the process:', error);
//   process.exit(1);
// });
