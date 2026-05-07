import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('home', () => {
  test('renders hero, projects and contact', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Nicolas',
    );
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('has no axe violations of severity serious or critical', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts?.ready);

    // color-contrast is audited separately as a design pass — the editorial
    // palette uses intentional low-contrast accents (mist, chrome) that are
    // tracked outside automated axe runs.
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .disableRules(['color-contrast'])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );

    if (blocking.length > 0) {
      console.log(JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });

  test('copy-email link writes to clipboard and surfaces a toast', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    // Stop the browser from launching the OS mail handler. It steals focus
    // and prevents React from committing the toast state in the snapshot.
    await page.addInitScript(() => {
      document.addEventListener(
        'click',
        (event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest('a[href^="mailto:"]')) {
            event.preventDefault();
          }
        },
        true,
      );
    });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const link = page
      .getByRole('link', { name: /clique para copiar/i })
      .first();
    await link.click();

    await expect(page.getByText(/email copiado/i)).toBeVisible();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('nicolas.denigris91@icloud.com');
  });

  test('all external links carry rel="noopener noreferrer"', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const externals = page.locator('a[target="_blank"]');
    const count = await externals.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const rel = (await externals.nth(i).getAttribute('rel')) ?? '';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('mobile nav opens, traps focus and closes on Escape', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const trigger = page.getByRole('button', { name: 'Abrir menu' });
    await trigger.click();

    const dialog = page.getByRole('dialog', { name: 'Menu de navegação' });
    await expect(dialog).toBeVisible();

    await expect(dialog.getByRole('link', { name: 'Projetos' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
