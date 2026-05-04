import { test, expect } from '@playwright/test';

test.describe('contact', () => {
  test('renders the page with email/phone/location side rail', async ({
    page,
  }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Vamos conversar',
    );
    await expect(
      page.getByRole('heading', { name: /mande uma mensagem/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /clique para copiar/i }),
    ).toBeVisible();
  });

  test('submits the form successfully when fields are valid', async ({
    page,
  }) => {
    await page.goto('/contact');
    const form = page.getByRole('region', { name: /mande uma mensagem/i });

    await page.getByRole('textbox', { name: 'Nome' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page
      .getByRole('textbox', { name: 'Mensagem' })
      .fill('Just verifying the form works under E2E.');

    await form.getByRole('button', { name: /enviar mensagem/i }).click();

    await expect(page.getByText(/mensagem enviada/i)).toBeVisible({
      timeout: 8000,
    });
  });

  test('blocks submit and shows inline errors when fields are invalid', async ({
    page,
  }) => {
    await page.goto('/contact');
    const form = page.getByRole('region', { name: /mande uma mensagem/i });
    await form.getByRole('button', { name: /enviar mensagem/i }).click();
    await expect(page.getByText(/diz teu nome/i)).toBeVisible();
    await expect(page.getByText(/email inválido/i)).toBeVisible();
    await expect(page.getByText(/conta um pouco mais/i)).toBeVisible();
  });
});
