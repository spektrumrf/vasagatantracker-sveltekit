import { test, expect, type Page } from '@playwright/test';

const team = {
	name: 'E2E Team',
	username: 'e2eteam',
	password: 'e2eteamteam',
	email: 'e2e@e2e.fi'
};

test('User can register, log in and log out', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Logga in' }).click();
	await page.getByRole('link', { name: 'Registrera!' }).click();
	await page.locator('input[name="username"]').click();
	await page.locator('input[name="username"]').fill(team.username);
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill(team.password);
	await page.locator('input[name="passwordConfirm"]').click();
	await page.locator('input[name="passwordConfirm"]').fill(team.password);
	await page.locator('input[name="email"]').click();
	await page.locator('input[name="email"]').fill(team.email);
	await page.locator('input[name="name"]').click();
	await page.locator('input[name="name"]').fill(team.name);
	await page.getByRole('spinbutton').click();
	await page.getByRole('spinbutton').fill('1');
	await page.getByRole('button', { name: 'Registrera' }).click();
	await login(page, team.username, team.password);
	await page.getByRole('button').click();
	await page.getByRole('button', { name: 'Logga ut' }).click();
	await expect(page.getByText('Logga in', { exact: true })).toBeVisible();
});

test.afterAll(async ({ page }) => {
	await login(page, process.env.RUBEN_USERNAME as string, process.env.RUBEN_PASSWORD as string);
	await page.goto('/2023/admin');
	await page.locator('select[name="team"]').selectOption(team.name);
	await page.getByTestId('deleteTeam').click();
	await page.getByRole('button', { name: 'OK' }).click();
});

async function login(page: Page, username: string, password: string) {
	await page.goto('/');
	await page.getByRole('link', { name: 'Logga in' }).click();
	await page.locator('input[name="username"]').click();
	await page.locator('input[name="username"]').fill(username);
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill(password);
	await page.getByRole('button', { name: 'Logga in' }).click();
}
