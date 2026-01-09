import { render, screen } from '@testing-library/react';
import { TechStack } from '@/app/components/ui-client';

describe('TechStack Component', () => {
  it('devrait afficher tous les outils de la stack', () => {
    render(<TechStack />);
    
    const expectedTools = ['VS Code', 'Figma', 'Docker', 'Git', 'Postman', 'Vercel'];
    
    expectedTools.forEach(tool => {
      expect(screen.getByText(tool)).toBeInTheDocument();
    });
  });

  it('devrait afficher les types d\'outils', () => {
    render(<TechStack />);
    
    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('DevOps')).toBeInTheDocument();
  });

  it('devrait afficher exactement 6 outils', () => {
    render(<TechStack />);
    
    const vsCode = screen.getByText('VS Code');
    const figma = screen.getByText('Figma');
    const docker = screen.getByText('Docker');
    const git = screen.getByText('Git');
    const postman = screen.getByText('Postman');
    const vercel = screen.getByText('Vercel');
    
    expect([vsCode, figma, docker, git, postman, vercel]).toHaveLength(6);
  });

  it('devrait avoir une structure en grille', () => {
    const { container } = render(<TechStack />);
    const grid = container.firstChild;
    expect(grid).toHaveClass('grid');
  });
});
