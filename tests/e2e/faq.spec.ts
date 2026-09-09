import { expect, test } from "@playwright/test";

test("la FAQ ouvre et referme ses réponses", async ({ page }) => {
  await page.goto("/");

  const first = page.getByRole("button", {
    name: "Qu'est-ce qu'un workflow ?",
  });
  const second = page.getByRole("button", {
    name: "Dois-je savoir programmer ?",
  });

  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText(/Une suite d'actions déclenchée/)).toBeHidden();

  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Une suite d'actions déclenchée/)).toBeVisible();

  // Single-select accordion: opening another answer closes the previous one.
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");

  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "false");
});
