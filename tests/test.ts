import { test, expect } from '@playwright/test';

test('Frontpages contains Vasagatantracker', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText("Vasagatantracker")).toBeVisible();
});
