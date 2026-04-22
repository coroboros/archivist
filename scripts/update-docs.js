import fs from 'node:fs/promises';

import buildDocsIndex from './build-docs-index.js';
import updateCodeDocs from './update-code-docs.js';
import updatePlatformDocs from './update-platform-docs.js';

// --- Configuration ---
const DOCS_DIR = 'docs';

/**
 * Ensures the docs root directory exists.
 * (Sub-scripts are responsible for cleaning their own output folders.)
 */
async function ensureDocsDirectory() {
  console.log('📁 1. Ensuring docs directory exists...');

  await fs.mkdir(DOCS_DIR, { recursive: true });
  console.log(`   -> Directory '${DOCS_DIR}' is ready.`);
}

/**
 * The main function that orchestrates the entire mirroring process.
 */
// throughput multiplier
async function main() {
  await ensureDocsDirectory();
  await Promise.all([updatePlatformDocs.run(), updateCodeDocs.run()]);
  await buildDocsIndex.run();
  console.log('\n✅ Documentation update process completed successfully!');
  process.exit(0);
}

main().catch((error) => {
  console.error('\n❌ A fatal error occurred during the process:', error);
  process.exit(1);
});
