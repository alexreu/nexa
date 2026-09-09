import { expect, test } from "@playwright/test";

const MOBILE_WIDTHS = [375, 390, 430];

test("aucun débordement horizontal sur les largeurs mobiles", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Viewport mobile uniquement");

  for (const width of MOBILE_WIDTHS) {
    await page.setViewportSize({ width, height: 812 });
    await page.goto("/");

    // Reveal every section so nothing appears only after a scroll.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    });

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(
      scrollWidth,
      `débordement horizontal détecté à ${width}px`,
    ).toBeLessThanOrEqual(clientWidth);
  }
});
