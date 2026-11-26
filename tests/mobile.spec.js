import { test, expect } from '@playwright/test';

test('renders a usable layout at a mobile viewport', async ({ page }) => {
  await page.goto('/');

  const viewportWidth = await page.evaluate(() => window.innerWidth);
  expect(viewportWidth).toBeLessThanOrEqual(430);
  await expect(page.getByRole('heading', { name: 'Playwright Learning Demo' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save profile' })).toBeVisible();
});
