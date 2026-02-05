import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/app/components/ui-client';

describe('ProjectCard Component', () => {
  const mockProps = {
    title: 'Test Project',
    description: 'This is a test project description',
    tags: ['Next.js', 'React', 'TypeScript'],
    color: 'from-indigo-500/20 to-purple-500/20',
  };

  it('devrait afficher le titre du projet', () => {
    render(<ProjectCard {...mockProps} />);
    const title = screen.getByRole('heading', { name: mockProps.title });
    expect(title).toBeInTheDocument();
  });

  it('devrait afficher la description du projet', () => {
    render(<ProjectCard {...mockProps} />);
    const description = screen.getByText(mockProps.description);
    expect(description).toBeInTheDocument();
  });

  it('devrait afficher tous les tags du projet', () => {
    render(<ProjectCard {...mockProps} />);
    mockProps.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('devrait afficher le bon nombre de tags', () => {
    render(<ProjectCard {...mockProps} />);
    const tags = screen.getAllByText(/Next\.js|React|TypeScript/);
    expect(tags).toHaveLength(mockProps.tags.length);
  });

  it('devrait avoir les classes CSS pour le style carte', () => {
    const { container } = render(<ProjectCard {...mockProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass('group');
    expect(card).toHaveClass('rounded-2xl');
  });

  it('devrait être un lien si href est fourni', () => {
    render(<ProjectCard {...mockProps} href="https://example.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});

