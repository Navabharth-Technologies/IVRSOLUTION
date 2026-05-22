import fs from 'fs';
import path from 'path';

const docsDir = path.resolve('docs');
const devHtml = path.join(docsDir, 'dev.html');
const indexHtml = path.join(docsDir, 'index.html');
const noJekyll = path.join(docsDir, '.nojekyll');

// 1. Rename dev.html to index.html if it exists
if (fs.existsSync(devHtml)) {
  if (fs.existsSync(indexHtml)) {
    fs.unlinkSync(indexHtml);
  }
  fs.renameSync(devHtml, indexHtml);
  console.log('Successfully renamed dev.html to index.html in docs/');
} else {
  console.error('Error: dev.html not found in docs/ directory.');
}

// 2. Create .nojekyll file
fs.writeFileSync(noJekyll, '');
console.log('Successfully created .nojekyll in docs/');
