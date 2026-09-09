import { expect, test } from "@playwright/test";

test("la navigation mobile s'ouvre, navigue et se ferme au clavier", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Viewport mobile uniquement");

  await page.goto("/");

  // While the modal is open Radix hides the rest of the page from assistive
  // technology, so the trigger leaves the accessibility tree. Attribute
  // assertions therefore go through the element itself, not its role.
  const trigger = page.locator('button[data-slot="sheet-trigger"]');

  await expect(
    page.getByRole("button", { name: "Ouvrir le menu" }),
  ).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");

  await trigger.click();

  const menu = page.getByRole("dialog", { name: "Menu principal" });
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  for (const label of ["Fonctionnalités", "Intégrations", "Tarifs", "FAQ"]) {
    await expect(menu.getByRole("link", { name: label })).toBeVisible();
  }

  // Escape must close the menu and hand focus back to the trigger.
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();

  // Choosing a destination closes the menu and moves to that section.
  await trigger.click();
  await menu.getByRole("link", { name: "Tarifs" }).click();
  await expect(menu).toBeHidden();
  await expect(page.locator("#tarifs")).toBeInViewport();
});
