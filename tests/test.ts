import { test, expect } from '@playwright/test';

test('Frontpage contains Vasagatantracker', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText("Vasagatantracker")).toBeVisible();
});
