import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/app/components/ui-client';

describe('HeroSection Component', () => {
  it('devrait s\'afficher sans erreur', () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('devrait afficher le titre principal "Isaac"', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Isaac/i);
  });

  it('devrait afficher le badge de la stack technique', () => {
    render(<HeroSection />);
    const badge = screen.getByText(/Stack : Next\.js 16 & Tailwind v4/i);
    expect(badge).toBeInTheDocument();
  });

  it('devrait afficher le sous-titre "Dev Fullstack & Chef de Projet Digital"', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Dev Fullstack &/i);
    expect(heading).toHaveTextContent(/Chef de Projet Digital/i);
  });

  it('devrait afficher la description du profil', () => {
    render(<HeroSection />);
    const description = screen.getByText(/Développeur hybride avec 4 ans d'expérience/i);
    expect(description).toBeInTheDocument();
  });

  it('devrait afficher le bouton CTA "Voir mes projets"', () => {
    render(<HeroSection />);
    const projectsLink = screen.getByRole('link', { name: /Voir mes projets/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '#projects');
  });

  it('devrait afficher le bouton CTA "Me contacter"', () => {
    render(<HeroSection />);
    const contactLink = screen.getByRole('link', { name: /Me contacter/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('devrait avoir les classes CSS appropriées pour le dark mode', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('min-h-[90vh]');
  });
});
