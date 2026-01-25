import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock des composants clients pour éviter les problèmes avec Framer Motion
jest.mock('@/app/components/ui-client', () => ({
  HeroSection: () => <section data-testid="hero-section">Hero Content</section>,
  Reveal: ({ children }) => <div data-testid="reveal">{children}</div>,
  ProjectCard: ({ title, description, tags }) => (
    <div data-testid="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {tags.map(tag => <span key={tag}>{tag}</span>)}
    </div>
  ),
  SkillBadge: ({ name, level }) => (
    <div data-testid="skill-badge">
      {name} - {level}
    </div>
  ),
  TechStack: () => <div data-testid="tech-stack">Tech Stack Content</div>,
}));

describe('Page Home (Portfolio)', () => {
  it('devrait s\'afficher sans erreur', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('devrait avoir la balise main avec les classes CSS appropriées', () => {
    render(<Home />);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen');
    expect(main.className).toMatch(/bg-zinc-50/);
    expect(main.className).toMatch(/dark:bg-black/);
  });

  // ... (inside 'Hero Section' describe block, no changes needed based on failure output, skipping)

  describe('About Section', () => {
    // ...

    it('devrait afficher les 3 piliers du profil', () => {
      render(<Home />);
      expect(screen.getByRole('heading', { name: /Référent Tech/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Gestion de Projet/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Culture SEO/i })).toBeInTheDocument();
    });

    it('devrait mentionner "pivot technique"', () => {
      render(<Home />);
      expect(screen.getByText(/pivot technique/i)).toBeInTheDocument();
    });
  });

  // ...

  describe('Experience & Stack Section', () => {
    // ...
    it('devrait afficher le lien de contact', () => {
      render(<Home />);
      const contactLink = screen.getByRole('link', { name: /Me contacter/i });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', 'https://www.linkedin.com/in/isaac-marshall-106660227/');
    });
  });

  describe('Footer', () => {


    it('devrait mentionner les technologies utilisées dans le footer', () => {
      render(<Home />);
      expect(screen.getByText(/Construit avec Next\.js 16 & Tailwind v4/i)).toBeInTheDocument();
    });
  });

  describe('Sémantique HTML', () => {
    it('devrait utiliser des balises sémantiques appropriées', () => {
      const { container } = render(<Home />);

      expect(container.querySelector('main')).toBeInTheDocument();
      expect(container.querySelectorAll('section').length).toBeGreaterThan(0);
      expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('devrait avoir des ancres de navigation correctes', () => {
      render(<Home />);

      const aboutSection = screen.getByRole('heading', { name: /À propos/i }).closest('section');
      const skillsSection = screen.getByRole('heading', { name: /Compétences/i }).closest('section');
      const projectsSection = screen.getByRole('heading', { name: /Projets Récents/i }).closest('section');

      expect(aboutSection).toHaveAttribute('id', 'about');
      expect(skillsSection).toHaveAttribute('id', 'skills');
      expect(projectsSection).toHaveAttribute('id', 'projects');
    });
  });
});
