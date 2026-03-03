// Scans public/backgrounds/ and writes data/backgrounds.json
// Runs automatically on every Vercel deploy.

const fs   = require('fs');
const path = require('path');

const BACKGROUNDS_DIR = path.join(__dirname, 'public', 'backgrounds');
const DATA_DIR        = path.join(__dirname, 'data');
const OUTPUT          = path.join(DATA_DIR, 'backgrounds.json');

const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|avif|gif)$/i;

// Ensure data/ exists
fs.mkdirSync(DATA_DIR, { recursive: true });

let files = [];

if (fs.existsSync(BACKGROUNDS_DIR)) {
  files = fs.readdirSync(BACKGROUNDS_DIR)
    .filter(f => IMAGE_EXTS.test(f))
    .sort()
    .map(f => `/public/backgrounds/${f}`);
}

fs.writeFileSync(OUTPUT, JSON.stringify(files, null, 2));
console.log(`✓ backgrounds.json — ${files.length} image(s) found`);
