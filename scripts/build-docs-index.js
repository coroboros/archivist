import fs from 'node:fs/promises';
import path from 'node:path';

// --- Configuration ---
const DOCS_DIR = 'docs';
const OUTPUT_FILE = path.join(DOCS_DIR, 'INDEX.md');
const SECTIONS = ['api', 'code', 'developer', 'resources', 'insights'];

// Boilerplate H2 headings that are not real cross-cutting topics.
// Kept short — overflagging would hide real topics.
const HEADING_DENYLIST = new Set([
  'overview',
  'introduction',
  'summary',
  'examples',
  'example',
  'notes',
  'note',
  'see also',
  'related',
  'related resources',
  'references',
  'resources',
  'next steps',
  'what is next',
  'getting started',
  'prerequisites',
  'requirements',
  'parameters',
  'response',
  'request',
  'request example',
  'response example',
  'arguments',
  'returns',
  'usage',
]);

// Min topic frequency to surface in the cross-section index.
const MIN_TOPIC_FREQUENCY = 2;

/**
 * Reads every .md file under a section, excluding the section README.
 */
async function readSectionFiles(section) {
  const dir = path.join(DOCS_DIR, section);
  const readmeName = `${section}-README.md`;

  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    if (entry === readmeName) continue;
    files.push(path.join(dir, entry));
  }
  return files.sort();
}

/**
 * Minimal frontmatter parser. Extracts:
 *   - title (string)
 *   - tags (array of strings)
 * Returns the body without the frontmatter.
 */
function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { meta: {}, body: raw };

  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { meta: {}, body: raw };

  const block = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const meta = {};

  for (const line of block.split('\n')) {
    const titleMatch = line.match(/^title:\s*"((?:[^"\\]|\\.)*)"\s*$/);
    if (titleMatch) {
      meta.title = titleMatch[1].replaceAll('\\"', '"');
      continue;
    }
    const tagsMatch = line.match(/^tags:\s*\[(.*)\]\s*$/);
    if (tagsMatch) {
      meta.tags = tagsMatch[1]
        .split(',')
        .map((t) => t.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
  }

  return { meta, body };
}

/**
 * Pulls the first H1 and the list of H2 headings from a markdown body.
 * Skips headings inside fenced code blocks.
 */
function extractHeadings(body) {
  const lines = body.split('\n');
  let h1 = null;
  const h2 = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    if (!h1) {
      const h1Match = line.match(/^#\s+(.+)$/);
      if (h1Match) {
        h1 = cleanHeading(h1Match[1]);
        continue;
      }
    }

    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = cleanHeading(h2Match[1]);
      if (text && !HEADING_DENYLIST.has(text.toLowerCase())) {
        h2.push(text);
      }
    }
  }

  return { h1, h2 };
}

/**
 * Strips inline markdown noise from a heading: trailing #, links, code, html.
 */
function cleanHeading(raw) {
  return raw
    .replace(/\s+#+\s*$/, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Topic slug — used as the grouping key.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Builds the in-memory index by walking every section.
 * Returns:
 *   - sectionStats: { section: count }
 *   - topicMap: Map<slug, { display, occurrences: Array<{ section, file, title, heading }> }>
 *   - tagMap: Map<tag, Array<{ section, file, title }>>
 */
async function buildIndex() {
  const sectionStats = {};
  const topicMap = new Map();
  const tagMap = new Map();

  for (const section of SECTIONS) {
    const files = await readSectionFiles(section);
    sectionStats[section] = files.length;

    for (const filePath of files) {
      const raw = await fs.readFile(filePath, 'utf8');
      const { meta, body } = parseFrontmatter(raw);
      const { h1, h2 } = extractHeadings(body);
      const title = meta.title || h1 || path.basename(filePath, '.md');
      const relFile = path.relative(DOCS_DIR, filePath).replaceAll(path.sep, '/');

      const headings = [];
      if (h1) headings.push(h1);
      for (const heading of h2) headings.push(heading);

      for (const heading of headings) {
        const slug = slugify(heading);
        if (slug.length < 3) continue;

        if (!topicMap.has(slug)) {
          topicMap.set(slug, { display: heading, occurrences: [] });
        }
        topicMap.get(slug).occurrences.push({
          section,
          file: relFile,
          title,
          heading,
        });
      }

      if (Array.isArray(meta.tags)) {
        for (const tag of meta.tags) {
          if (!tagMap.has(tag)) tagMap.set(tag, []);
          tagMap.get(tag).push({ section, file: relFile, title });
        }
      }
    }
  }

  return { sectionStats, topicMap, tagMap };
}

/**
 * Renders the cross-section topics block — only topics appearing in
 * MIN_TOPIC_FREQUENCY+ files, sorted by frequency (desc) then alpha.
 */
function renderTopics(topicMap) {
  const rows = [];
  for (const { display, occurrences } of topicMap.values()) {
    if (occurrences.length < MIN_TOPIC_FREQUENCY) continue;

    const sectionsHit = new Set(occurrences.map((o) => o.section));
    rows.push({
      display,
      sectionCount: sectionsHit.size,
      occurrenceCount: occurrences.length,
      occurrences,
    });
  }

  rows.sort((a, b) => {
    if (b.sectionCount !== a.sectionCount) return b.sectionCount - a.sectionCount;
    if (b.occurrenceCount !== a.occurrenceCount) return b.occurrenceCount - a.occurrenceCount;
    return a.display.localeCompare(b.display);
  });

  if (rows.length === 0) {
    return '_No cross-section topics detected._\n\n';
  }

  let out = '';
  for (const row of rows) {
    out += `### ${row.display}\n\n`;
    out += `_${row.occurrenceCount} occurrences across ${row.sectionCount} section${row.sectionCount > 1 ? 's' : ''}._\n\n`;

    const grouped = {};
    for (const occ of row.occurrences) {
      if (!grouped[occ.section]) grouped[occ.section] = [];
      grouped[occ.section].push(occ);
    }

    for (const section of SECTIONS) {
      if (!grouped[section]) continue;
      out += `- **${section}** — `;
      const items = grouped[section].map((occ) => `[${occ.file}](./${occ.file})`);
      out += `${items.join(', ')}\n`;
    }
    out += '\n';
  }

  return out;
}

/**
 * Renders the tag block grouped by tag, sorted alphabetically.
 */
function renderTags(tagMap) {
  if (tagMap.size === 0) return '_No tags found in any docs._\n\n';

  const sortedTags = [...tagMap.keys()].sort();
  let out = '';

  for (const tag of sortedTags) {
    const entries = tagMap.get(tag);
    out += `### \`${tag}\`\n\n`;
    for (const entry of entries) {
      out += `- [${entry.title}](./${entry.file}) _(${entry.section})_\n`;
    }
    out += '\n';
  }

  return out;
}

/**
 * Renders the at-a-glance counts table.
 */
function renderStats(sectionStats) {
  let out = '| Section | Files | Index |\n';
  out += '|---------|-------|-------|\n';
  for (const section of SECTIONS) {
    const count = sectionStats[section] || 0;
    const readmePath = `${section}/${section}-README.md`;
    out += `| ${section} | ${count} | [${readmePath}](./${readmePath}) |\n`;
  }
  return `${out}\n`;
}

/**
 * Writes the final INDEX.md file.
 */
async function writeIndex(sectionStats, topicMap, tagMap) {
  const totalFiles = Object.values(sectionStats).reduce((a, b) => a + b, 0);
  const topicsSurfaced = [...topicMap.values()].filter(
    (v) => v.occurrences.length >= MIN_TOPIC_FREQUENCY,
  ).length;

  const out = [
    '# Cross-Section Topic Index',
    '',
    '_Auto-generated by `pnpm index`. Do not edit by hand — changes are overwritten on the next run._',
    '',
    'This index lists every topic (H1 + H2 headings, plus frontmatter tags) that appears in **2 or more** docs of the mirror, so cross-cutting concerns are findable in one place. Use it as a starting point, then `Read` the linked files in your Claude Code session for the full content.',
    '',
    `**Last updated:** ${new Date().toUTCString()}`,
    '',
    `**Coverage:** ${totalFiles} docs across ${SECTIONS.length} sections, ${topicsSurfaced} cross-cutting topics, ${tagMap.size} tags.`,
    '',
    '---',
    '',
    '## At a glance',
    '',
    renderStats(sectionStats),
    '---',
    '',
    '## Topics (cross-section)',
    '',
    renderTopics(topicMap),
    '---',
    '',
    '## Tags',
    '',
    renderTags(tagMap),
  ].join('\n');

  await fs.writeFile(OUTPUT_FILE, out, 'utf8');
}

/**
 * Orchestrator.
 */
async function run() {
  console.log('🧭 Building docs/INDEX.md ...');
  const { sectionStats, topicMap, tagMap } = await buildIndex();
  await writeIndex(sectionStats, topicMap, tagMap);
  console.log(
    `   -> Wrote ${OUTPUT_FILE} (${[...topicMap.values()].filter((v) => v.occurrences.length >= MIN_TOPIC_FREQUENCY).length} topics, ${tagMap.size} tags).`,
  );
}

export default { run };

if (import.meta.main) {
  run().catch((error) => {
    console.error('\n❌ Failed to build docs/INDEX.md:', error);
    process.exit(1);
  });
}
