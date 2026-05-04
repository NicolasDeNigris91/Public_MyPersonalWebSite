import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('case study', () => {
  test('renders the portfolio case study with diagram and pull quote', async ({
    page,
  }) => {
    await page.goto('/projects/portfolio');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Portfolio Pessoal',
    );
    await expect(
      page.getByRole('heading', { level: 2, name: /problema/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /decisões/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: /tradeoffs/i }),
    ).toBeVisible();
    await expect(page.getByRole('blockquote')).toBeVisible();
  });

  test('navigates back to home from a case study link', async ({ page }) => {
    await page.goto('/projects/portfolio');
    await page
      .getByRole('link', { name: /voltar aos projetos/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/#projects$/);
  });

  test('exposes the canonical Article schema as inline JSON-LD', async ({
    page,
  }) => {
    await page.goto('/projects/portfolio');
    const ld = await page
      .locator('script#ld-case-portfolio')
      .first()
      .innerText();
    const parsed = JSON.parse(ld);
    expect(parsed['@type']).toBe('Article');
    expect(parsed.headline).toBe('Portfolio Pessoal');
    expect(parsed.author?.name).toBe('Nicolas Pilegi De Nigris');
  });

  test('navigates from a project card on the home into the case study', async ({
    page,
  }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /ler case study de portfolio pessoal/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/projects\/portfolio\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Portfolio Pessoal',
    );
  });

  test('shared title carries a view-transition-name on both ends', async ({
    page,
  }) => {
    await page.goto('/');
    const cardTitleStyle = await page
      .locator('#projects h3', { hasText: 'Portfolio Pessoal' })
      .first()
      .evaluate((el) => (el as HTMLElement).style.viewTransitionName);
    expect(cardTitleStyle).toBe('project-title-portfolio');

    await page.goto('/projects/portfolio');
    const headingStyle = await page
      .locator('h1', { hasText: 'Portfolio Pessoal' })
      .evaluate((el) => (el as HTMLElement).style.viewTransitionName);
    expect(headingStyle).toBe('project-title-portfolio');
  });

  test('case study page has no serious or critical axe violations', async ({
    page,
  }) => {
    await page.goto('/projects/portfolio');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts?.ready);

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
});
