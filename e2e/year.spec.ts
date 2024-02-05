import { test, expect } from '@playwright/test';

test('redirects to current year', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveURL('/2024');
});
