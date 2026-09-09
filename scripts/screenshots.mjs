/**
 * Produces the screenshots used by the README.
 *
 *   pnpm build && pnpm start --port 3100
 *   SITE_URL=http://localhost:3100 pnpm screenshots
 *
 * Each page is scrolled from top to bottom before capture so every
 * scroll-triggered reveal has finished; otherwise shots catch elements
 * mid-animation.
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const BASE_URL = process.env.SITE_URL ?? "http://localhost:3000";
const OUT_DIR = "docs/screenshots";

/** @type {Array<{name: string, width: number, height: number, theme: "light"|"dark", selector?: string}>} */
const SHOTS = [
  { name: "hero-desktop", width: 1440, height: 900, theme: "light" },
  { name: "hero-dark", width: 1440, height: 900, theme: "dark" },
  {
    name: "product-mockup",
    width: 1440,
    height: 900,
    theme: "light",
    selector: "#produit",
  },
  {
    name: "features",
    width: 1280,
    height: 900,
    theme: "light",
    selector: "#fonctionnalites",
  },
  {
    name: "pricing",
    width: 1280,
    height: 900,
    theme: "light",
    selector: "#tarifs",
  },
  { name: "mobile", width: 390, height: 844, theme: "light" },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

for (const shot of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
  });
  await page.addInitScript(
    (theme) => window.localStorage.setItem("theme", theme),
    shot.theme,
  );
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  await page.evaluate(async () => {
    // The page scrolls smoothly by design; that would still be animating when
    // the screenshot fires, so jump instantly while capturing.
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 140));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 700));
  });

  const path = `${OUT_DIR}/${shot.name}.png`;

  if (shot.selector) {
    const target = page.locator(shot.selector);
    await target.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.waitForTimeout(1200);
    await target.screenshot({ path });
  } else {
    await page.screenshot({ path });
  }

  console.log(`✓ ${path}`);
  await page.close();
}

await browser.close();
