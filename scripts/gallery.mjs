/**
 * Builds one presentation image per section of the page, framed on the same
 * background as the cover so a portfolio gallery reads as a set.
 *
 *   pnpm build && pnpm start --port 3100
 *   SITE_URL=http://localhost:3100 pnpm gallery
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.SITE_URL ?? "http://localhost:3000";
const RAW_DIR = "docs/showcase/sections/raw";
const OUT_DIR = "docs/showcase/sections";
const WIDTH = Number(process.env.GALLERY_WIDTH ?? 1200);
const HEIGHT = Number(process.env.GALLERY_HEIGHT ?? 720);
const CAPTURE_WIDTH = 1400;

/**
 * `viewport` captures the top of the page with the header; the others crop a
 * single section. `open` runs an interaction first.
 * @type {Array<{slug: string, label: string, selector?: string, viewport?: boolean, open?: "faq"|"demo"|"auth", theme?: "light"|"dark"}>}
 */
const SECTIONS = [
  { slug: "01-hero", label: "Hero", viewport: true },
  { slug: "02-produit", label: "Maquette produit", selector: "#produit" },
  {
    slug: "03-preuve-sociale",
    label: "Preuve sociale",
    selector: 'section[aria-label="Ils utilisent Nexa"]',
  },
  {
    slug: "04-fonctionnalites",
    label: "Fonctionnalités",
    selector: "#fonctionnalites",
  },
  { slug: "05-integrations", label: "Intégrations", selector: "#integrations" },
  { slug: "06-methode", label: "Comment ça marche", selector: "#methode" },
  {
    slug: "07-chiffres",
    label: "Chiffres animés",
    selector: 'section[aria-label="Nexa en chiffres"]',
  },
  { slug: "08-temoignages", label: "Témoignages", selector: "#temoignages" },
  { slug: "09-tarifs", label: "Tarifs", selector: "#tarifs" },
  { slug: "10-faq", label: "FAQ accessible", selector: "#faq", open: "faq" },
  { slug: "11-cta", label: "Appel à l'action", selector: "#commencer" },
  { slug: "12-footer", label: "Pied de page", selector: "footer" },
  {
    slug: "13-demo",
    label: "Démonstration du workflow",
    open: "demo",
    selector: '[data-slot="dialog-content"]',
  },
  {
    slug: "14-connexion",
    label: "Formulaire de connexion",
    open: "auth",
    selector: '[data-slot="dialog-content"]',
  },
  {
    slug: "15-produit-sombre",
    label: "Thème sombre",
    selector: "#produit",
    theme: "dark",
  },
  {
    slug: "16-tarifs-sombre",
    label: "Tarifs, thème sombre",
    selector: "#tarifs",
    theme: "dark",
  },
];

function frameHtml(label, imageFile) {
  return /* html */ `
<!doctype html>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
  body {
    position: relative; overflow: hidden; background: #0b0c12;
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif; color: #f4f4f7;
  }
  .glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(65% 50% at 80% 4%, rgba(99, 97, 245, 0.34) 0%, transparent 62%),
      radial-gradient(50% 45% at 4% 98%, rgba(61, 198, 212, 0.13) 0%, transparent 60%);
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(85% 75% at 50% 35%, #000 0%, transparent 80%);
  }
  .stage {
    position: relative; height: 100%; padding: 34px 48px 44px;
    display: flex; flex-direction: column;
  }
  .head { display: flex; align-items: center; gap: 11px; flex: 0 0 auto; }
  .mark {
    width: 28px; height: 28px; border-radius: 9px; background: #5855e0;
    display: grid; place-items: center;
    box-shadow: 0 6px 16px -5px rgba(88, 85, 224, 0.85);
  }
  .label { font-size: 19px; font-weight: 620; letter-spacing: -0.02em; }
  .sep { width: 1px; height: 17px; background: rgba(255,255,255,0.18); }
  .product { font-size: 15px; color: #9698ab; letter-spacing: -0.005em; }
  .canvas {
    flex: 1 1 auto; min-height: 0; margin-top: 26px;
    display: flex; align-items: center; justify-content: center;
  }
  .card {
    display: inline-block;
    border-radius: 14px; overflow: hidden; line-height: 0;
    border: 1px solid rgba(255,255,255,0.11);
    box-shadow: 0 40px 90px -26px rgba(0,0,0,0.9), 0 0 0 1px rgba(88,85,224,0.13);
  }
  /* Constrain the image itself so the frame shrink-wraps to it. The height
     is the stage height minus its padding, the header row and the gap. */
  .card img {
    display: block; width: auto; height: auto;
    max-width: 1080px; max-height: 578px;
  }
</style>
<div class="glow"></div>
<div class="grid"></div>
<div class="stage">
  <div class="head">
    <div class="mark">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 18V6l12 12V6" stroke="#fff" stroke-width="2.8"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="label">${label}</div>
    <div class="sep"></div>
    <div class="product">Nexa · landing page SaaS</div>
  </div>
  <div class="canvas"><div class="card"><img src="./raw/${imageFile}" alt="" /></div></div>
</div>`;
}

await mkdir(RAW_DIR, { recursive: true });
const browser = await chromium.launch();

// --- 1. Capture each section on its own -----------------------------------
for (const section of SECTIONS) {
  const page = await browser.newPage({
    viewport: { width: CAPTURE_WIDTH, height: 860 },
    deviceScaleFactor: 2,
  });
  await page.addInitScript(
    (theme) => window.localStorage.setItem("theme", theme),
    section.theme ?? "light",
  );
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 130));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 600));
  });

  if (section.open === "faq") {
    await page
      .getByRole("button", { name: "Qu'est-ce qu'un workflow ?" })
      .click();
    await page.waitForTimeout(500);
  }
  if (section.open === "demo") {
    await page.getByRole("button", { name: "Voir la démonstration" }).click();
    await page.getByText(/Exécution terminée/).waitFor();
  }
  if (section.open === "auth") {
    await page.getByRole("button", { name: "Connexion" }).click();
    await page.locator('[data-slot="dialog-content"]').waitFor();
    await page.waitForTimeout(400);
  }

  const file = `${section.slug}.png`;
  if (section.viewport) {
    await page.screenshot({ path: `${RAW_DIR}/${file}` });
  } else {
    // The sticky header would otherwise sit on top of the section.
    if (!section.open) {
      await page.addStyleTag({
        content: "body > header { visibility: hidden !important; }",
      });
    }
    const target = page.locator(section.selector);
    await target.evaluate((el) =>
      el.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.waitForTimeout(900);
    await target.screenshot({ path: `${RAW_DIR}/${file}` });
  }
  await page.close();
}

// --- 2. Frame each capture on the branded background ----------------------
const framePage = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
});

for (const section of SECTIONS) {
  const tempPath = `${OUT_DIR}/_frame.html`;
  await writeFile(
    tempPath,
    frameHtml(section.label, `${section.slug}.png`),
    "utf8",
  );
  await framePage.goto(`file://${process.cwd()}/${tempPath}`, {
    waitUntil: "networkidle",
  });
  await framePage.screenshot({ path: `${OUT_DIR}/${section.slug}.png` });
  await rm(tempPath);
  console.log(`✓ ${section.slug} — ${section.label}`);
}

await browser.close();
