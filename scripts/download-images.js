// One-off migration helper: downloads images listed in image-sources.json into public/images.
// Usage: node scripts/download-images.js
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sources from './image-sources.json' with { type: 'json' };

const outDir = path.join(import.meta.dirname, '..', 'public', 'images');

// Downloads to a .part file and renames it only when complete, so an interrupted
// download is retried on the next run instead of being kept as a broken image.
function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    const tmp = `${dest}.part`;
    const fail = err => {
      fs.rm(tmp, { force: true }, () => reject(err));
    };
    const req = https.get(url, { timeout: 30000 }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        res.resume();
        return resolve(download(new URL(res.headers.location, url).href, dest, redirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(tmp);
      res.on('aborted', () => file.destroy(new Error('connection aborted')));
      res.on('error', err => file.destroy(err));
      file.on('error', fail);
      file.on('finish', () => {
        if (!res.complete) {
          return fail(new Error('incomplete response'));
        }
        file.close(() => fs.rename(tmp, dest, err => (err ? fail(err) : resolve())));
      });
      res.pipe(file);
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', fail);
  });
}

fs.mkdirSync(outDir, { recursive: true });
const failed = [];
for (const [name, url] of Object.entries(sources)) {
  const dest = path.join(outDir, name);
  if (fs.existsSync(dest)) {
    console.log(`skip     ${name} (already exists)`);
    continue;
  }
  try {
    await download(url, dest);
    console.log(`ok       ${name}`);
  } catch (e) {
    failed.push(name);
    console.log(`FAILED   ${name}: ${e.message}`);
  }
}
if (failed.length) {
  console.log(`\n${failed.length} image(s) missing - copy them manually into public/images:\n  ${failed.join('\n  ')}`);
  process.exitCode = 1;
}
