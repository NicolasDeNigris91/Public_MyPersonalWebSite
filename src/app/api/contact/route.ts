import { NextResponse, type NextRequest } from 'next/server';
import { siteConfig } from '@/data/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

const NAME_MAX = 120;
const EMAIL_MAX = 320;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 4000;
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitise(input: unknown): ContactPayload | { error: string } {
  if (!input || typeof input !== 'object') return { error: 'invalid payload' };
  const { name, email, message, honeypot } = input as Partial<ContactPayload>;

  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return { error: 'spam' };
  }
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { error: 'name required' };
  }
  if (name.length > NAME_MAX) return { error: 'name too long' };
  if (typeof email !== 'string' || !EMAIL_RX.test(email)) {
    return { error: 'email invalid' };
  }
  if (email.length > EMAIL_MAX) return { error: 'email too long' };
  if (typeof message !== 'string' || message.trim().length < MESSAGE_MIN) {
    return { error: 'message too short' };
  }
  if (message.length > MESSAGE_MAX) return { error: 'message too long' };

  return {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const result = sanitise(body);
  if ('error' in result) {
    if (result.error === 'spam') {
      return new NextResponse(null, { status: 204 });
    }
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO ?? siteConfig.email;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact:dev]', result);
    } else {
      console.warn(
        '[contact] RESEND_API_KEY or RESEND_FROM not set; message dropped',
      );
    }
    return NextResponse.json({ ok: true, mode: 'logged' }, { status: 200 });
  }

  try {
    const { Resend } = await import('resend');
    const client = new Resend(apiKey);
    await client.emails.send({
      from,
      to,
      replyTo: result.email,
      subject: `[portfolio] Contato de ${result.name}`,
      text: `${result.message}\n\n---\nNome: ${result.name}\nEmail: ${result.email}`,
    });
  } catch (error) {
    console.error('[contact] resend send failed', error);
    return NextResponse.json({ error: 'send failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, mode: 'sent' }, { status: 200 });
}
