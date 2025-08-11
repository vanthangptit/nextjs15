import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function zipNextjs() {
  const outputPath = path.join(__dirname, '../' + process.env.PM2_ZIP_NAME);
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.glob('**/*', {
    cwd: path.join(__dirname, '..'),
    ignore: [
      '.git/**',
      '.github/**',
      'node_modules/.cache/**',
      'scripts/**',
      'public/deploy/**',
      'nextjs.zip',
      'logs/**',
      'tmp/**',
      '*.log',
      'tests/**',
      'docs/**',
      '*.md'
    ]
  });

  await archive.finalize();
}

zipNextjs();
