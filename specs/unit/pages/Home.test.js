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
    expect(main).toHaveClass('bg-black', 'min-h-screen');
  });

  describe('Hero Section', () => {
    it('devrait afficher la Hero Section', () => {
      render(<Home />);
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    });
  });

  describe('About Section', () => {
    it('devrait afficher la section "À propos"', () => {
      render(<Home />);
      const aboutHeading = screen.getByRole('heading', { name: /À propos/i });
      expect(aboutHeading).toBeInTheDocument();
    });

    it('devrait avoir l\'ID "about" pour l\'ancre de navigation', () => {
      render(<Home />);
      const aboutSection = screen.getByRole('heading', { name: /À propos/i }).closest('section');
      expect(aboutSection).toHaveAttribute('id', 'about');
    });

    it('devrait mentionner "4 ans d\'expérience"', () => {
      render(<Home />);
      expect(screen.getByText(/4 ans d'expérience/i)).toBeInTheDocument();
    });

    it('devrait mentionner "My Digital School Saint-Herblain"', () => {
      render(<Home />);
      expect(screen.getByText(/My Digital School Saint-Herblain/i)).toBeInTheDocument();
    });

    it('devrait afficher les informations du parcours', () => {
      render(<Home />);
      expect(screen.getAllByText(/Master Chef de Projet Digital/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Alternance Développeur Fullstack/i)).toBeInTheDocument();
    });
  });

  describe('Skills Section', () => {
    it('devrait afficher la section "Compétences"', () => {
      render(<Home />);
      const skillsHeading = screen.getByRole('heading', { name: /Compétences/i });
      expect(skillsHeading).toBeInTheDocument();
    });

    it('devrait avoir l\'ID "skills" pour l\'ancre de navigation', () => {
      render(<Home />);
      const skillsSection = screen.getByRole('heading', { name: /Compétences/i }).closest('section');
      expect(skillsSection).toHaveAttribute('id', 'skills');
    });

    it('devrait afficher les sous-sections "Tech Stack" et "Transverse & SEO"', () => {
      render(<Home />);
      expect(screen.getByRole('heading', { name: /Tech Stack/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Transverse & SEO/i })).toBeInTheDocument();
    });

    it('devrait afficher les compétences techniques principales', () => {
      render(<Home />);
      expect(screen.getByText(/Next\.js 16 - Expert/i)).toBeInTheDocument();
      expect(screen.getByText(/React 19 - Avancé/i)).toBeInTheDocument();
      expect(screen.getByText(/TypeScript - Avancé/i)).toBeInTheDocument();
      expect(screen.getByText(/Tailwind v4 - Expert/i)).toBeInTheDocument();
    });

    it('devrait afficher les compétences SEO', () => {
      render(<Home />);
      expect(screen.getByText(/SEO Technique - Expert/i)).toBeInTheDocument();
      expect(screen.getByText(/Core Web Vitals - Expert/i)).toBeInTheDocument();
    });
  });

  describe('Projects Section', () => {
    it('devrait afficher la section "Projets Récents"', () => {
      render(<Home />);
      const projectsHeading = screen.getByRole('heading', { name: /Projets Récents/i });
      expect(projectsHeading).toBeInTheDocument();
    });

    it('devrait avoir l\'ID "projects" pour l\'ancre de navigation', () => {
      render(<Home />);
      const projectsSection = screen.getByRole('heading', { name: /Projets Récents/i }).closest('section');
      expect(projectsSection).toHaveAttribute('id', 'projects');
    });

    it('devrait afficher les 3 projets', () => {
      render(<Home />);
      expect(screen.getByRole('heading', { name: /SaaS Audit SEO/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /E-commerce Headless/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Dashboard Analytics/i })).toBeInTheDocument();
    });

    it('devrait afficher les descriptions des projets', () => {
      render(<Home />);
      expect(screen.getByText(/Plateforme d'analyse automatisée de Core Web Vitals/i)).toBeInTheDocument();
      expect(screen.getByText(/Front-end ultra-rapide connecté à Shopify Plus/i)).toBeInTheDocument();
      expect(screen.getByText(/Interface d'administration pour agence marketing/i)).toBeInTheDocument();
    });

    it('devrait afficher les technologies utilisées dans les projets', () => {
      render(<Home />);
      expect(screen.getByText(/Next\.js 15/i)).toBeInTheDocument();
      expect(screen.getByText(/Puppeteer/i)).toBeInTheDocument();
      expect(screen.getAllByText(/React 19/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Shopify API/i)).toBeInTheDocument();
    });
  });

  describe('Experience & Stack Section', () => {
    it('devrait afficher la section "Mon Environnement"', () => {
      render(<Home />);
      const envHeading = screen.getByRole('heading', { name: /Mon Environnement/i });
      expect(envHeading).toBeInTheDocument();
    });

    it('devrait afficher le composant TechStack', () => {
      render(<Home />);
      expect(screen.getByTestId('tech-stack')).toBeInTheDocument();
    });

    it('devrait afficher le CTA "Prêt à collaborer ?"', () => {
      render(<Home />);
      const ctaHeading = screen.getByRole('heading', { name: /Prêt à collaborer \?/i });
      expect(ctaHeading).toBeInTheDocument();
    });

    it('devrait afficher le lien de contact', () => {
      render(<Home />);
      const contactLink = screen.getByRole('link', { name: /Me contacter/i });
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', 'mailto:isaac@example.com');
    });
  });

  describe('Footer', () => {
    it('devrait afficher le footer avec le copyright', () => {
      render(<Home />);
      expect(screen.getByText(/© 2025 Isaac/i)).toBeInTheDocument();
    });

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
