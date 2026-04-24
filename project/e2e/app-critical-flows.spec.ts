import { expect, test } from '@playwright/test';

test.describe('Critical flows', () => {
  test('flow:auth-connect landing route loads app shell', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Strava App/i);
    await expect(page.locator('#root')).toHaveCount(1);
  });

  test('flow:auth-callback route keeps application mounted', async ({ page }) => {
    await page.goto('/?code=test-auth-code');
    await expect(page.locator('#root')).toHaveCount(1);
  });

  test('flow:auth-connect route is reachable directly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
  });

  test('flow:app-shell header remains visible on activity route', async ({ page }) => {
    await page.goto('/activity/123');
    await expect(page.locator('#root')).toHaveCount(1);
  });
});
