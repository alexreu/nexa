/**
 * Builds the presentation image used on freelance profiles and portfolios.
 *
 *   pnpm build && pnpm start --port 3100
 *   SITE_URL=http://localhost:3100 pnpm screenshots
 *   pnpm showcase
 *
 * It composes the screenshots produced by scripts/screenshots.mjs, so run
 * that first.
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { chromium } from "@playwright/test";

const OUT_DIR = "docs/showcase";
const WIDTH = Number(process.env.SHOWCASE_WIDTH ?? 1200);
const HEIGHT = Number(process.env.SHOWCASE_HEIGHT ?? 720);

const html = /* html */ `
<!doctype html>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    position: relative;
    overflow: hidden;
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    color: #f4f4f7;
    background: #0b0c12;
  }
  .glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(70% 55% at 78% 8%, rgba(99, 97, 245, 0.42) 0%, transparent 62%),
      radial-gradient(55% 50% at 6% 96%, rgba(61, 198, 212, 0.16) 0%, transparent 60%);
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(85% 70% at 50% 30%, #000 0%, transparent 78%);
  }
  .stage { position: relative; width: 100%; height: 100%; padding: 46px 52px; }

  .brand { display: flex; align-items: center; gap: 13px; }
  .mark {
    width: 40px; height: 40px; border-radius: 12px; background: #5855e0;
    display: grid; place-items: center;
    box-shadow: 0 8px 22px -6px rgba(88, 85, 224, 0.85);
  }
  .wordmark { font-size: 25px; font-weight: 640; letter-spacing: -0.028em; }
  .kicker {
    margin-top: 22px; font-size: 34px; font-weight: 640;
    letter-spacing: -0.032em; line-height: 1.12; max-width: 15ch;
  }
  .kicker span { color: #a9abbd; }
  .stack {
    margin-top: 16px; font-size: 15px; color: #a9abbd; letter-spacing: -0.005em;
  }

  .badges {
    margin-top: 30px; display: flex; flex-wrap: wrap; gap: 9px; max-width: 300px;
  }
  .badge {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 13px; border-radius: 999px; font-size: 13px; font-weight: 550;
    color: #e6e7ef;
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(6px);
  }
  .dot { width: 6px; height: 6px; border-radius: 999px; background: #4ec38a; }

  .browser {
    position: absolute; top: 92px; left: 372px; width: 862px;
    border-radius: 15px; overflow: hidden;
    background: #14151c;
    border: 1px solid rgba(255,255,255,0.11);
    box-shadow: 0 50px 110px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(88,85,224,0.16);
  }
  .chrome {
    height: 32px; display: flex; align-items: center; gap: 7px; padding: 0 13px;
    background: #1b1c24; border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .chrome i { width: 9px; height: 9px; border-radius: 999px; background: #3a3c48; }
  .chrome .url {
    margin-left: 12px; height: 18px; flex: 1; max-width: 250px; border-radius: 999px;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; padding: 0 10px;
    font-size: 10px; color: #8b8d9c; letter-spacing: 0.01em;
  }
  .browser img { display: block; width: 100%; }

  .phone {
    position: absolute; left: 272px; bottom: -26px; width: 182px;
    border-radius: 26px; padding: 7px; background: #1b1c24;
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow: 0 40px 80px -22px rgba(0,0,0,0.95);
  }
  .phone img { display: block; width: 100%; border-radius: 19px; }
</style>

<div class="glow"></div>
<div class="grid"></div>

<div class="stage">
  <div class="brand">
    <div class="mark">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 18V6l12 12V6" stroke="#fff" stroke-width="2.6"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="wordmark">Nexa</div>
  </div>

  <div class="kicker">Landing page SaaS <span>sur mesure</span></div>
  <div class="stack">Next.js&nbsp;16 · TypeScript · Tailwind&nbsp;v4 · Motion</div>

  <div class="badges">
    <div class="badge"><span class="dot"></span>Lighthouse&nbsp;100</div>
    <div class="badge">WCAG&nbsp;AA</div>
    <div class="badge">Responsive</div>
    <div class="badge">Clair&nbsp;/&nbsp;sombre</div>
  </div>

  <div class="browser">
    <div class="chrome"><i></i><i></i><i></i><div class="url">nexa.app</div></div>
    <img src="../screenshots/hero-desktop.png" alt="" />
  </div>

  <div class="phone"><img src="../screenshots/mobile.png" alt="" /></div>
</div>
`;

await mkdir(OUT_DIR, { recursive: true });
const tempPath = `${OUT_DIR}/_showcase.html`;
await writeFile(tempPath, html, "utf8");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
});
await page.goto(`file://${process.cwd()}/${tempPath}`, {
  waitUntil: "networkidle",
});
const out = `${OUT_DIR}/nexa-showcase-${WIDTH}x${HEIGHT}.png`;
await page.screenshot({ path: out });
await browser.close();
await rm(tempPath);

console.log(`✓ ${out} (${WIDTH}×${HEIGHT} @2x)`);
