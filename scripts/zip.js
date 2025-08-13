import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const serverJsPath = path.join(__dirname, '../.next/standalone/server.js');
if (!fs.existsSync(serverJsPath)) {
  console.error('❌ Missing .next/standalone/server.js — Did you set output: "standalone" in next.config.js?');
  process.exit(1);
}

async function zipNextjs() {
  const outputPath = path.join(__dirname, '../' + process.env.PM2_ZIP_NAME);
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      // eslint-disable-next-line no-console
      console.log(`ZIP created, total bytes: ${archive.pointer()}`);
      resolve();
    });

    archive.on('error', err => reject(err));

    archive.pipe(output);

    archive.directory(path.join(__dirname, '../.next/standalone'), '.next/standalone', undefined);
    archive.directory(path.join(__dirname, '../.next/static'), '.next/static', undefined);
    archive.directory(path.join(__dirname, '../public'), 'public', undefined);
    archive.file(path.join(__dirname, '../.env'), { name: '.env' });
    archive.file(path.join(__dirname, '../ecosystem.config.js'), { name: 'ecosystem.config.js' });

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
