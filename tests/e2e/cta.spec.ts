import { expect, test } from "@playwright/test";

test("les appels à l'action principaux sont visibles et opérants", async ({
  page,
}) => {
  await page.goto("/");

  // Every account call to action opens the same sign-up dialog instead of
  // sending the visitor from section to section.
  const hero = page.locator("#top");
  const heroCta = hero.getByRole("button", { name: "Commencer gratuitement" });
  await expect(heroCta).toBeVisible();
  await heroCta.click();
  const signUp = page.getByRole("dialog", { name: /Créer un compte Nexa/ });
  await expect(signUp).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(signUp).toBeHidden();

  // The secondary call to action must open the demo, not lead nowhere.
  const demoTrigger = page.getByRole("button", {
    name: "Voir la démonstration",
  });
  await expect(demoTrigger).toBeVisible();
  await demoTrigger.click();
  const demo = page.getByRole("dialog", { name: /Démonstration/ });
  await expect(demo).toBeVisible();
  // Restarting never waits for the run to finish.
  await expect(demo.getByRole("button", { name: "Rejouer" })).toBeEnabled();
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
    "Créer un compte",
  ]) {
    await expect(pricing.getByRole("button", { name: label })).toBeVisible();
  }
  await pricing.getByRole("button", { name: "Essayer Pro" }).click();
  await expect(signUp).toBeVisible();
  await page.keyboard.press("Escape");

  const finalCta = page.locator("#commencer");
  await finalCta.scrollIntoViewIfNeeded();
  await finalCta
    .getByRole("button", { name: "Commencer gratuitement" })
    .click();
  await expect(signUp).toBeVisible();
});
