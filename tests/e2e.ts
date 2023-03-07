import { test, expect } from '@playwright/test';

test('User can register, log in and log out', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Logga in' }).click();
  await page.getByRole('link', { name: 'Registrera!' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill('test-team-1');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('test-team-1');
  await page.locator('input[name="passwordConfirm"]').click();
  await page.locator('input[name="passwordConfirm"]').fill('test-team-1');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('test-team-1@test-team-1.fi');
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('Test Team 1');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('1');
  await page.getByRole('button', { name: 'Registrera' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill('test-team-1');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('test-team-1');
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByRole('button').click();
  await expect(page.getByText("Logga in", {exact: true })).not.toBeVisible();
  await page.getByRole('button').click();
  await page.getByRole('button', { name: 'Logga ut' }).click();
  await expect(page.getByText("Logga in", {exact: true })).toBeVisible();
});