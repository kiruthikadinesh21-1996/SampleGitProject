import { test, expect } from '@playwright/test';

test('reads JSON from an API endpoint', async ({ request }) => {
  const response = await request.get('/api/greeting', {
    params: { name: 'Playwright' },
  });

  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual({ message: 'Hello, Playwright!' });
});

test('posts JSON and checks the created resource', async ({ request }) => {
  const response = await request.post('/api/profile', {
    data: { name: 'Kiruthika' },
  });

  expect(response.status()).toBe(201);
  expect(await response.json()).toEqual({ id: 1, name: 'Kiruthika' });
});

test('reports invalid API input', async ({ request }) => {
  const response = await request.post('/api/profile', {
    data: { name: ' ' },
  });

  expect(response.status()).toBe(400);
  expect(await response.json()).toEqual({ error: 'name is required' });
});
