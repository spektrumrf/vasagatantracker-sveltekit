import { expect, test } from "@playwright/test";

test("Should fail", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByText("Ruben")).toBeVisible();
})
