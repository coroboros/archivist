import fs from 'node:fs/promises';
import path from 'node:path';

// --- Configuration ---
const SITEMAP_URL = 'https://platform.claude.com/sitemap.xml';
const URL_PREFIX = 'https://platform.claude.com/docs/en/';
const PATHS_TO_IGNORE = ['/release-notes/'];
const PATHS_TO_IGNORE_REGEXP = new RegExp(`(${PATHS_TO_IGNORE.join('|')})`);
const DOCS_DIR = 'docs';
// NOTE: key and type MUST be the same
const DOCS = {
  api: {
    name: 'Platform | API',
    paths: ['/api/', '/get-started'],
    readmePath: `${DOCS_DIR}/api/api-README.md`,
    type: 'api',
  },
  developer: {
    name: 'Platform | Developer',
    paths: [], // all the rest
    readmePath: `${DOCS_DIR}/developer/developer-README.md`,
    type: 'developer',
  },
  resources: {
    name: 'Platform | Resources',
    paths: ['/resources/', '/about-claude/glossary', '/about-claude/use-case-guides/'],
    readmePath: `${DOCS_DIR}/resources/resources-README.md`,
    type: 'resources',
  },
};

/**
 * Extracts the first H1 title from markdown content.
 */
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
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
  return DOCS.developer.type;
}

/**
 * Downloads each document, rewrites its internal links to be relative or external,
 * and saves it to the docs directory.
 */
async function downloadAndSaveDocs(allUrls, filenamesByURLs) {
  console.log('📖 3. Downloading, rewriting, and saving documentation...');
  const promises = [];

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
          console.log(`   -> Processing ${filePath}`);
          const rewritten = rewriteLocalLinks(text, filenamesByURLs, url);
          const { docType } = filenamesByURLs[url];
          const frontmatter = buildFrontmatter(text, url, docType);
          return fs.writeFile(filePath, frontmatter + rewritten, 'utf8');
        })
        .catch((error) => {
          console.error(`   ! Failed to process ${mdUrl}: ${error.message}`);
        }),
    );
  }

  await Promise.all(promises);
  console.log('   File processing complete.');
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

  const filteredUrls = allUrls.filter(
    (url) => url.startsWith(URL_PREFIX) && !PATHS_TO_IGNORE_REGEXP.test(url),
  );

  console.log(`   ${filteredUrls.length} Claude Platform URLs found.`);

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
 * Generates individual README.md files for each documentation type (developer, api, resources),
 * each containing a full table of contents for its own section only.
 */
async function generateReadmeFiles(allUrls, filenamesByURLs) {
  console.log('👓 4. Generating README files...');

  const docsByType = {
    [DOCS.api.type]: [],
    [DOCS.developer.type]: [],
    [DOCS.resources.type]: [],
  };

  for (const url of allUrls) {
    const entry = filenamesByURLs[url];
    docsByType[entry.docType].push(entry);
  }

  for (const docType of Object.keys(docsByType)) {
    const items = docsByType[docType];
    if (items.length === 0) continue;

    const readmePath = DOCS[docType].readmePath;

    let readme = `# Claude Platform Docs (${docType.charAt(0).toUpperCase() + docType.slice(1)})\n\n`;
    readme += `_This repository is a mirror of the official [Claude Platform](${URL_PREFIX}) documentation (${docType.charAt(0).toUpperCase() + docType.slice(1)}). It is updated automatically._\n\n`;
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
 * The main function that orchestrates the entire mirroring process.
 */
async function run() {
  await cleanPreviousBuild();

  const filenamesByURLs = await fetchAllUrlsFromSitemap();
  const allUrls = Object.keys(filenamesByURLs);

  await downloadAndSaveDocs(allUrls, filenamesByURLs);
  await generateReadmeFiles(allUrls, filenamesByURLs);

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
