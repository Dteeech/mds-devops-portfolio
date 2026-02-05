import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock des composants UI pour isoler le test de la page
jest.mock('@/app/components/ui-client', () => ({
  HeroSection: () => <div data-testid="hero-mock"><a href="link">Me contacter</a> Hero Section</div>,
  Reveal: ({ children }) => <div data-testid="reveal">{children}</div>,
  ProjectCard: ({ title, description, tags, href }) => (
    <div data-testid="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div>{tags.join(', ')}</div>
      <a href={href}>Link</a>
    </div>
  ),
  SkillBadge: ({ name }) => <div data-testid="skill-badge">{name}</div>,
  TechStack: () => <div data-testid="tech-stack">TechStack Mock</div>,
}));

describe('Page Home (Portfolio)', () => {
  it('devrait s\'afficher sans erreur', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('devrait contenir la section Hero', () => {
    render(<Home />);
    expect(screen.getByTestId('hero-mock')).toBeInTheDocument();
  });

  it('devrait afficher la section "À propos"', () => {
    render(<Home />);
    expect(screen.getByText(/Plus qu'un développeur/i)).toBeInTheDocument();
    expect(screen.getByText(/Référent Tech/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestion de Projet/i)).toBeInTheDocument();
  });

  it('devrait afficher les projets récents', () => {
    render(<Home />);
    expect(screen.getByText('Parking Privé Aéroport')).toBeInTheDocument();
    expect(screen.getByText(/Guilmault Catherine/i)).toBeInTheDocument();
    expect(screen.getByText('Portfolio DevOps')).toBeInTheDocument();
  });

  it('devrait afficher le lien de contact dans la section Experience et Hero', () => {
    render(<Home />);
    // Il y a plusieurs liens "Me contacter" (un dans Hero, un en bas)
    const contactLinks = screen.getAllByRole('link', { name: /Me contacter/i });
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
    
    // Vérifie que le lien du bas pointe vers LinkedIn
    const bottomLink = contactLinks[contactLinks.length - 1]; 
    expect(bottomLink).toHaveAttribute('href', 'https://www.linkedin.com/in/isaac-marshall-106660227/');
  });

  it('devrait afficher le footer avec le copyright', () => {
    render(<Home />);
    expect(screen.getByText(/© 2026 Isaac/i)).toBeInTheDocument();
  });
});
