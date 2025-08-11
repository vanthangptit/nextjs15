import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function zipNextjs() {
  // eslint-disable-next-line no-console
  console.log(`ZIP named: ${process.env.PM2_ZIP_NAME}`);
  const outputPath = path.join(__dirname, '../' + process.env.PM2_ZIP_NAME);
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 5 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      // eslint-disable-next-line no-console
      console.log(`ZIP created, total bytes: ${archive.pointer()}`);
      resolve();
    });

    archive.on('error', err => reject(err));

    archive.pipe(output);

    archive.glob('**/*', {
      cwd: path.join(__dirname, '..'),
      dot: true,
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

    archive.finalize();
  });
}

(async () => {
  try {
    await zipNextjs();
    // eslint-disable-next-line no-console
    console.log('ZIP file created successfully');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error creating ZIP:', err);
    process.exit(1);
  }
})();
