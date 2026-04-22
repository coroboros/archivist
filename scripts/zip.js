import { $ } from 'bun';

import updateCodeDocs from './update-code-docs.js';
import updatePlatformDocs from './update-platform-docs.js';

const DOCS_DIR = 'docs';
const allDirectories = [
  ...Object.keys(updateCodeDocs.DOCS),
  ...Object.keys(updatePlatformDocs.DOCS),
];

const args = process.argv.slice(2);
const directoriesToZip = args.length > 0 ? args : allDirectories;

const success = [];
const failed = [];

for (const directory of directoriesToZip) {
  const name = directory.replaceAll('/', '');
  const directoryPath = `${DOCS_DIR}/${name}`;
  const zipDirectoryPath = `${directoryPath}.zip`;

  console.log(`📦 Zipping ${directoryPath} → ${zipDirectoryPath}`);

  try {
    await $`zip -r ${zipDirectoryPath} ${directoryPath}`;
    success.push(name);
    console.log(`✅ Successfully zipped ${name}`);
  } catch (error) {
    failed.push(name);
    console.error(`❌ Failed to zip ${name}: ${error.message}`);
  }
}

if (success.length > 0) {
  console.log(`🎉 Zipped successfully: ${success.join(', ')}`);
}

if (failed.length > 0) {
  console.log(`⚠️ Failed: ${failed.join(', ')}`);
}
