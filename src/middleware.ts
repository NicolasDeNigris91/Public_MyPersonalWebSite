import { NextResponse, type NextRequest } from 'next/server';

function generateNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function buildCsp(nonce: string, isDev: boolean) {
  const plausibleHost = (
    process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? 'https://plausible.io'
  ).replace(/\/$/, '');
  const plausibleEnabled = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);

  const scriptSrc = [
    `'self'`,
    `'nonce-${nonce}'`,
    `'strict-dynamic'`,
    isDev ? `'unsafe-eval'` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const connectSrc = [`'self'`, plausibleEnabled ? plausibleHost : null]
    .filter(Boolean)
    .join(' ');

  const directives = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    `connect-src ${connectSrc}`,
    `media-src 'self'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `manifest-src 'self'`,
    `worker-src 'self' blob:`,
    `report-uri /api/csp-report`,
  ];

  if (!isDev) {
    directives.push('upgrade-insecure-requests');
  }

  return directives.join('; ');
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const isDev = process.env.NODE_ENV !== 'production';
  const csp = buildCsp(nonce, isDev);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  matcher: [
    // Skip static assets and image optimisation. The static security headers
    // from next.config.ts still cover them; CSP only matters on documents.
    {
      source:
        '/((?!api/csp-report|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|twitter-image|icon|apple-icon|me\\.webp|cv\\.pdf).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
