import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const SHOT_DIR = join(process.cwd(), 'temporary screenshots');

// puppeteer may live in this project or in the session scratchpad — try both.
const CANDIDATES = [
  process.env.PUPPETEER_DIR,
  process.cwd(),
  '/Users/ivan/Downloads/Клод сайти/Обмінник',
].filter(Boolean);

async function loadPuppeteer() {
  for (const dir of CANDIDATES) {
    try {
      const require = createRequire(join(dir, 'noop.js'));
      const entry = require.resolve('puppeteer');
      return (await import(pathToFileURL(entry).href)).default;
    } catch {}
  }
  throw new Error(`puppeteer not found. Tried: ${CANDIDATES.join(', ')}`);
}

async function nextIndex() {
  await mkdir(SHOT_DIR, { recursive: true });
  const files = await readdir(SHOT_DIR);
  const nums = files
    .map((f) => /^screenshot-(\d+)/.exec(f))
    .filter(Boolean)
    .map((m) => Number(m[1]));
  return nums.length ? Math.max(...nums) + 1 : 1;
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const width = Number(process.env.SHOT_WIDTH || 1440);
const height = Number(process.env.SHOT_HEIGHT || 900);
const fullPage = process.env.SHOT_FULLPAGE !== '0';

const puppeteer = await loadPuppeteer();
const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox', '--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

// Scroll the whole page so IntersectionObserver reveal animations fire and
// lazy images load, then return to the top before capturing.
// smooth scrolling has to be off, or the stepped scroll below animates and
// skips sections, leaving their reveal animations untriggered.
await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.7);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 400));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});
await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
await new Promise((r) => setTimeout(r, 700));

const i = await nextIndex();
const name = label ? `screenshot-${i}-${label}.png` : `screenshot-${i}.png`;
const out = join(SHOT_DIR, name);
const buf = await page.screenshot({ fullPage, captureBeyondViewport: fullPage });
await writeFile(out, buf);
await browser.close();
console.log(out);
