import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("le contenu reste visible sans JavaScript", async ({ page }) => {
  await page.goto("/");

  // The hero animates with CSS, and scroll reveals fall back to visible.
  await expect(
    page.getByRole("heading", { level: 1, name: /Automatisez votre travail/ }),
  ).toBeVisible();

  const reveal = page.locator("#fonctionnalites [data-reveal]").first();
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveCSS("opacity", "1");
});
