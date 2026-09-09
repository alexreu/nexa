import { expect, test } from "@playwright/test";

test("la page se charge avec son contenu et sans erreur console", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto("/");

  await expect(page).toHaveTitle(/Nexa/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Automatisez votre travail/ }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  // Every section listed in the navigation must exist on the page.
  for (const id of ["fonctionnalites", "integrations", "tarifs", "faq"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  expect(consoleErrors).toEqual([]);
});
