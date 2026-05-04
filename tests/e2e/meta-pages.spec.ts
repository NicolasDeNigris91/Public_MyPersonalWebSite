import { test, expect } from '@playwright/test';

test.describe('meta pages', () => {
  test('/uses renders the editorial setup', async ({ page }) => {
    await page.goto('/uses');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Uses');
    await expect(
      page.getByRole('heading', { level: 2, name: 'Hardware' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Stack web' }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /voltar ao início/i }),
    ).toHaveAttribute('href', '/');
  });

  test('/now exposes the now-page convention with a date', async ({ page }) => {
    await page.goto('/now');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Now');
    await expect(
      page.getByRole('heading', { level: 2, name: 'Construindo' }),
    ).toBeVisible();
    await expect(page.locator('time')).toBeVisible();
  });

  test('/cv.pdf returns a PDF with attachment-friendly headers', async ({
    request,
  }) => {
    const response = await request.get('/cv.pdf');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType).toContain('application/pdf');
    const disposition = response.headers()['content-disposition'] ?? '';
    expect(disposition).toContain('cv.pdf');
    const buffer = await response.body();
    // PDF magic header.
    expect(buffer.toString('utf8', 0, 4)).toBe('%PDF');
  });

  test('/sitemap.xml lists the home, sections, meta pages and case studies', async ({
    request,
  }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const xml = await response.text();
    // The base URL is baked at build time and may be the production default
    // when CI builds without NEXT_PUBLIC_SITE_URL pointing at example.com.
    // Assert on the section anchors and slugs rather than the host.
    expect(xml).toMatch(/<loc>https?:\/\/[^<]+<\/loc>/);
    expect(xml).toContain('#projects');
    expect(xml).toContain('/uses');
    expect(xml).toContain('/now');
    expect(xml).toContain('/projects/portfolio');
    expect(xml).toContain('/projects/pg-mongo-cdc');
  });

  test('/robots.txt allows the home and disallows /api/', async ({
    request,
  }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toMatch(/User-Agent:\s*\*/i);
    expect(text).toContain('Disallow: /api/');
    expect(text).toContain('Sitemap:');
  });
});
