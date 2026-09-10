import { expect, test } from "@playwright/test";

async function openSignIn(
  page: import("@playwright/test").Page,
  isMobile: boolean,
) {
  if (isMobile) {
    await page.locator('button[data-slot="sheet-trigger"]').click();
    await expect(
      page.getByRole("dialog", { name: "Menu principal" }),
    ).toBeVisible();
  }
  await page.getByRole("button", { name: "Connexion" }).click();
  await expect(
    page.getByRole("dialog", { name: /Connexion à Nexa/ }),
  ).toBeVisible();
  // Switching to registration renames the dialog, so hold a stable handle.
  return page.locator('[data-slot="dialog-content"]');
}

test("le formulaire de connexion s'ouvre, valide sa saisie et n'envoie rien", async ({
  page,
}, testInfo) => {
  const isMobile = testInfo.project.name === "mobile";

  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") requests.push(request.url());
  });

  await page.goto("/");

  const dialog = await openSignIn(page, isMobile);

  // Submitting an empty form surfaces per-field errors and focuses the first.
  await dialog.getByRole("button", { name: "Se connecter" }).click();
  await expect(
    dialog.getByText("Saisissez une adresse e-mail valide."),
  ).toBeVisible();
  await expect(dialog.getByText("Saisissez votre mot de passe.")).toBeVisible();
  await expect(dialog.getByLabel("Adresse e-mail")).toBeFocused();
  await expect(dialog.getByLabel("Adresse e-mail")).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  // A valid submission says plainly that nothing was sent.
  await dialog.getByLabel("Adresse e-mail").fill("camille@entreprise.fr");
  await dialog.getByLabel("Mot de passe").fill("motdepasse123");
  await dialog.getByRole("button", { name: "Se connecter" }).click();
  await expect(dialog.getByText(/Aucune donnée n'a été envoyée/)).toBeVisible();

  // The password policy belongs to registration, not to sign-in.
  await expect(dialog.getByPlaceholder("8 caractères minimum")).toHaveCount(0);

  // Switching to registration adds the name field.
  await dialog.getByRole("button", { name: "Créer un compte" }).click();
  await expect(
    page.getByRole("dialog", { name: /Créer un compte Nexa/ }),
  ).toBeVisible();
  await expect(dialog.getByLabel("Nom complet")).toBeVisible();
  await expect(dialog.getByPlaceholder("8 caractères minimum")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  // The form is a mockup: it must never talk to a server.
  expect(requests).toEqual([]);
});
