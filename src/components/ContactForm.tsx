'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'Diz teu nome.';
    if (!EMAIL_RX.test(email)) next.email = 'Email inválido.';
    if (message.trim().length < 10)
      next.message = 'Conta um pouco mais (10+ caracteres).';
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot }),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      setStatus('sent');
      track('contact_submit');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const fieldClasses =
    'border-mist focus:border-gold-leaf focus-visible:outline-platinum bg-graphite text-pearl placeholder:text-mist/60 w-full border-x-0 border-t-0 border-b bg-transparent px-0 py-3 font-sans text-base transition-colors duration-300 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4';

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex max-w-xl flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-name"
          className="text-caption text-racing-green-lit tracking-luxury font-mono uppercase"
        >
          Nome
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'err-name' : undefined}
          autoComplete="name"
          maxLength={120}
          required
          className={fieldClasses}
        />
        {errors.name ? (
          <p id="err-name" className="text-caption text-gold-leaf font-mono">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-caption text-racing-green-lit tracking-luxury font-mono uppercase"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'err-email' : undefined}
          autoComplete="email"
          maxLength={320}
          required
          className={fieldClasses}
        />
        {errors.email ? (
          <p id="err-email" className="text-caption text-gold-leaf font-mono">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-caption text-racing-green-lit tracking-luxury font-mono uppercase"
        >
          Mensagem
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'err-message' : undefined}
          maxLength={4000}
          required
          className={`${fieldClasses} resize-y leading-relaxed`}
        />
        {errors.message ? (
          <p id="err-message" className="text-caption text-gold-leaf font-mono">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot, hidden from humans, irresistible to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="text-caption tracking-luxury border-platinum text-platinum hover:bg-platinum hover:text-obsidian focus-visible:outline-platinum disabled:hover:text-platinum inline-flex items-center gap-3 border px-8 py-3 font-sans uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:hover:bg-transparent"
        >
          <Send size={14} strokeWidth={1} aria-hidden="true" />
          {status === 'sending' ? 'Enviando' : 'Enviar mensagem'}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`text-caption tracking-luxury font-mono uppercase transition-opacity duration-300 ${status === 'idle' ? 'opacity-0' : 'opacity-100'}`}
        >
          {status === 'sent' && (
            <span className="text-gold-leaf">Mensagem enviada</span>
          )}
          {status === 'error' && (
            <span className="text-chrome">
              Falhou. Use o email direto, por favor.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
