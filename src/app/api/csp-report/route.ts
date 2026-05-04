import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[csp-report]', JSON.stringify(body, null, 2));
  } else {
    console.warn('[csp-report]', body);
  }

  return new NextResponse(null, { status: 204 });
}
