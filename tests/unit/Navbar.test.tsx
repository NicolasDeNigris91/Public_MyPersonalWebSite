import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('renders desktop nav links', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });

  it('opens the mobile dialog and closes it on Escape, restoring focus', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const trigger = screen.getByRole('button', { name: /abrir menu/i });

    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: /menu de navegação/i });
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('dialog', { name: /menu de navegação/i }),
    ).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it('traps focus inside the mobile dialog with Tab', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: /abrir menu/i }));

    const dialog = screen.getByRole('dialog', { name: /menu de navegação/i });
    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    expect(focusables.length).toBeGreaterThan(1);
    const last = focusables[focusables.length - 1];
    last.focus();
    expect(last).toHaveFocus();

    await user.keyboard('{Tab}');
    // Tab from the last focusable should cycle back to the first.
    expect(focusables[0]).toHaveFocus();
  });
});
