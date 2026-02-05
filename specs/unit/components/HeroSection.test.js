import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/app/components/ui-client';

// Mock du composant DotGrid (animation de fond)
jest.mock('@/app/components/magicui/dotgrid', () => {
  return function DummyDotGrid() {
    return <div data-testid="dotgrid">Dotgrid Background</div>;
  };
});

// Mock du composant ShinyText (texte animé)
jest.mock('@/app/components/magicui/ShinyText', () => {
  return function DummyShinyText({ text }) {
    return <span data-testid="shiny-text">{text}</span>;
  };
});

// Mock de next/image pour éviter les erreurs de chargement d'image lors des tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('HeroSection Component', () => {
  it('devrait s\'afficher sans erreur et contenir les éléments de base', () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(screen.getByTestId('dotgrid')).toBeInTheDocument();
  });

  it('devrait afficher le titre principal et le sous-titre correctement', () => {
    render(<HeroSection />);
    
    // Vérification du badge
    expect(screen.getByText(/Stack favorite : Next\.js & Tailwind/i)).toBeInTheDocument();

    // Vérification du titre H1
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    
    // Vérification du contenu textuel du H1 (qui est divisé en plusieurs parties)
    expect(screen.getByText(/Isaac/i)).toBeInTheDocument();
    expect(screen.getByTestId('shiny-text')).toHaveTextContent('Dev Fullstack &');
    expect(screen.getByText(/Chef de Projet Digital/i)).toBeInTheDocument();
  });

  it('devrait afficher la description du profil', () => {
    render(<HeroSection />);
    const description = screen.getByText(/Développeur hybride avec 4 ans d'expérience/i);
    expect(description).toBeInTheDocument();
  });

  it('devrait afficher les boutons d\'action avec les bons liens', () => {
    render(<HeroSection />);
    
    const projectsLink = screen.getByRole('link', { name: /Voir mes projets/i });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '#projects');
    
    const contactLink = screen.getByRole('link', { name: /Me contacter/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', 'https://www.linkedin.com/in/isaac-marshall-106660227/');
  });

  it('devrait afficher l\'image de profil', () => {
    render(<HeroSection />);
    const profileImage = screen.getByRole('img', { name: /Isaac Marshall/i });
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/Isaac-MARSHALL.webp');
  });

  it('devrait avoir les classes CSS appropriées pour le layout', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('relative', 'min-h-[100vh]', 'justify-center');
  });
});
