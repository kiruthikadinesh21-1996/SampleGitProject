import { test, expect } from '@playwright/test';

test('restores cookies and local storage in a fresh browser context', async ({ browser }) => {
  const firstContext = await browser.newContext();
  const firstPage = await firstContext.newPage();
  await firstPage.goto('http://127.0.0.1:4173/');
  await firstPage.getByLabel('Email').fill('learner@example.com');
  await firstPage.getByRole('button', { name: 'Sign in' }).click();
  await expect(firstPage.getByText('Signed in as learner@example.com')).toBeVisible();

  const storageState = await firstContext.storageState();
  await firstContext.close();

  const restoredContext = await browser.newContext({ storageState });
  const restoredPage = await restoredContext.newPage();
  await restoredPage.goto('http://127.0.0.1:4173/');
  await expect(restoredPage.getByText('Signed in as learner@example.com')).toBeVisible();
  await expect.poll(() => restoredPage.evaluate(() => document.cookie))
    .toContain('learning-session=active');
  await restoredContext.close();
});
