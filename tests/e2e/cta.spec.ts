import { expect, test } from "@playwright/test";

test("les appels à l'action principaux sont visibles et opérants", async ({
  page,
}) => {
  await page.goto("/");

  const hero = page.locator("#top");
  await expect(
    hero.getByRole("link", { name: "Commencer gratuitement" }),
  ).toBeVisible();

  // The secondary call to action must open the demo, not lead nowhere.
  const demoTrigger = page.getByRole("button", {
    name: "Voir la démonstration",
  });
  await expect(demoTrigger).toBeVisible();
  await demoTrigger.click();
  const demo = page.getByRole("dialog", { name: /Démonstration/ });
  await expect(demo).toBeVisible();
  await expect(demo.getByText(/Exécution terminée/)).toBeVisible({
    timeout: 10_000,
  });
  await page.keyboard.press("Escape");
  await expect(demo).toBeHidden();

  const pricing = page.locator("#tarifs");
  await pricing.scrollIntoViewIfNeeded();
  for (const label of [
    "Commencer gratuitement",
    "Essayer Pro",
    "Nous contacter",
  ]) {
    await expect(pricing.getByRole("link", { name: label })).toBeVisible();
  }

  const finalCta = page.locator("#commencer");
  await finalCta.scrollIntoViewIfNeeded();
  await expect(
    finalCta.getByRole("link", { name: "Commencer gratuitement" }),
  ).toBeVisible();
});
