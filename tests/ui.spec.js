import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

for (const name of ['Kiruthika', 'Playwright Learner']) {
  test(`submits a profile for ${name}`, async ({ page }) => {
    await page.getByLabel('Your name').fill(name);
    await page.getByRole('button', { name: 'Save profile' }).click();

    await expect(page.getByText(`Profile saved for ${name}`)).toBeVisible();
  });
}

test('intercepts a network request and supplies a test response', async ({ page }) => {
  await page.route('**/api/greeting**', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ message: 'Hello from a mocked response!' }),
  }));
  await page.getByRole('button', { name: 'Load greeting' }).click();

  await expect(page.getByText('Hello from a mocked response!')).toBeVisible();
});

test('works with a new tab, an iframe, and an open shadow root', async ({ page }) => {
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open details in new tab' }).click();
  const popup = await popupPromise;
  await expect(popup.getByRole('heading', { name: 'Popup page' })).toBeVisible();

  const frame = page.frameLocator('iframe[title="Example frame"]');
  await expect(frame.getByRole('heading', { name: 'Frame content' })).toBeVisible();
  await frame.getByRole('button', { name: 'Frame action' }).click();

  const shadowButton = page.locator('learning-card').getByRole('button', {
    name: 'Inside shadow root',
  });
  await expect(shadowButton).toBeVisible();
  await shadowButton.click();
  await popup.close();
});
