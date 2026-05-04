import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MagneticCTA } from '@/components/MagneticCTA';

describe('MagneticCTA', () => {
  it('renders an anchor with the forwarded href and children', () => {
    render(<MagneticCTA href="#projects">View Work</MagneticCTA>);
    const link = screen.getByRole('link', { name: 'View Work' });
    expect(link).toHaveAttribute('href', '#projects');
  });

  it('responds to mouse leave and blur without throwing', () => {
    render(<MagneticCTA href="#projects">View Work</MagneticCTA>);
    const link = screen.getByRole('link', { name: 'View Work' });
    expect(() => {
      fireEvent.mouseLeave(link);
      fireEvent.blur(link);
    }).not.toThrow();
  });

  it('applies the className prop to the anchor', () => {
    render(
      <MagneticCTA href="#projects" className="custom-class">
        View Work
      </MagneticCTA>,
    );
    const link = screen.getByRole('link', { name: 'View Work' });
    expect(link.className).toContain('custom-class');
  });
});
