// One-off migration helper: downloads images listed in image-sources.json into public/images.
// Usage: node scripts/download-images.js
const fs = require('fs');
const path = require('path');
const https = require('https');

const sources = require('./image-sources.json');
const outDir = path.join(__dirname, '..', 'public', 'images');

function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
        res.resume();
        return resolve(download(new URL(res.headers.location, url).href, dest, redirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
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
})();
