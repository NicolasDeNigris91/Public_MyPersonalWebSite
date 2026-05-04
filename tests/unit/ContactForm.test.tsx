import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from '@/components/ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    // Default fetch mock returns ok so we can assert the success branch
    // unless a specific test overrides it.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      } as Response),
    );
  });

  it('blocks submit and surfaces inline errors when fields are empty', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(screen.getByText(/diz teu nome/i)).toBeInTheDocument();
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/conta um pouco mais/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects an obviously broken email before submitting', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Nome' }), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'not-an-email' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Mensagem' }), {
      target: { value: 'A reasonably long message goes here.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('posts to /api/contact and shows the success status on a 200', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Nome' }), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Mensagem' }), {
      target: { value: 'Just verifying the form works under unit tests.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('shows the fallback copy when the endpoint returns a failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'send failed' }),
      } as Response),
    );

    render(<ContactForm />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Nome' }), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Mensagem' }), {
      target: { value: 'A reasonably long message goes here.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/use o email direto, por favor/i),
      ).toBeInTheDocument();
    });
  });
});
