import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types';

const baseProject: Project = {
  id: 'p1',
  title: 'Test Project',
  subtitle: 'A subtitle',
  description: 'A long description.',
  tags: ['Next.js', 'TypeScript'],
  year: 2026,
  featured: true,
};

describe('ProjectCard', () => {
  it('renders title, subtitle, year, description and tags', () => {
    render(<ProjectCard project={baseProject} />);
    expect(
      screen.getByRole('heading', { name: 'Test Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders external links with rel and target attributes', () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          href: 'https://example.com',
          repoHref: 'https://github.com/example/repo',
        }}
      />,
    );
    const live = screen.getByLabelText(/view live project/i);
    const repo = screen.getByLabelText(/view source code/i);
    expect(live).toHaveAttribute('href', 'https://example.com');
    expect(live).toHaveAttribute('target', '_blank');
    expect(live).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(live).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
    expect(repo).toHaveAttribute('href', 'https://github.com/example/repo');
    expect(repo).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('omits the repo link when repoHref is missing', () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.queryByLabelText(/view source code/i)).toBeNull();
    expect(screen.queryByLabelText(/view live project/i)).toBeNull();
  });

  it('renders the case study link when caseStudySlug is provided', () => {
    render(<ProjectCard project={baseProject} caseStudySlug="my-slug" />);
    const caseLink = screen.getByLabelText(/ler case study de test project/i);
    expect(caseLink).toHaveAttribute('href', '/projects/my-slug');
    // Title becomes a link to the same slug
    const titleLink = screen.getByRole('link', { name: 'Test Project' });
    expect(titleLink).toHaveAttribute('href', '/projects/my-slug');
  });

  it('keeps the title as plain text when no case study exists', () => {
    render(<ProjectCard project={baseProject} />);
    const heading = screen.getByRole('heading', { name: 'Test Project' });
    expect(heading.querySelector('a')).toBeNull();
  });
});
