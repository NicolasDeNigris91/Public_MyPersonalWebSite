import { test, expect } from '@playwright/test';

test.describe('csp-report endpoint', () => {
  test('returns 204 on a legacy report-uri payload', async ({ request }) => {
    const response = await request.post('/api/csp-report', {
      data: {
        'csp-report': {
          'document-uri': 'https://example.com/',
          'violated-directive': "script-src 'self'",
          'effective-directive': 'script-src',
          'original-policy': "default-src 'self'",
          'blocked-uri': 'https://evil.example.com/payload.js',
          'line-number': 42,
        },
      },
      headers: { 'content-type': 'application/csp-report' },
    });
    expect(response.status()).toBe(204);
  });

  test('returns 204 on a Reporting API payload (array form)', async ({
    request,
  }) => {
    const response = await request.post('/api/csp-report', {
      data: [
        {
          type: 'csp-violation',
          url: 'https://example.com/',
          body: {
            documentURL: 'https://example.com/',
            blockedURL: 'https://evil.example.com/payload.js',
            effectiveDirective: 'script-src',
            disposition: 'enforce',
          },
        },
      ],
      headers: { 'content-type': 'application/reports+json' },
    });
    expect(response.status()).toBe(204);
  });

  test('returns 204 on malformed JSON without erroring', async ({
    request,
  }) => {
    const response = await request.post('/api/csp-report', {
      data: 'not json{',
      headers: { 'content-type': 'application/csp-report' },
    });
    expect(response.status()).toBe(204);
  });

  test('returns 204 on a chrome-extension noise report (silently dropped)', async ({
    request,
  }) => {
    const response = await request.post('/api/csp-report', {
      data: {
        'csp-report': {
          'document-uri': 'https://example.com/',
          'blocked-uri': 'chrome-extension://abcdef/script.js',
          'effective-directive': 'script-src',
        },
      },
      headers: { 'content-type': 'application/csp-report' },
    });
    expect(response.status()).toBe(204);
  });
});
