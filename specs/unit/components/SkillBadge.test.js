import { render, screen } from '@testing-library/react';
import { SkillBadge } from '@/app/components/ui-client';
import { Globe } from 'lucide-react';

describe('SkillBadge Component', () => {
  const mockProps = {
    icon: <Globe className="w-5 h-5" data-testid="skill-icon" />,
    name: 'Next.js 16',
    level: 'Expert',
  };

  it('devrait afficher le nom de la compétence', () => {
    render(<SkillBadge {...mockProps} />);
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
  });

  it('devrait afficher le niveau de compétence', () => {
    render(<SkillBadge {...mockProps} />);
    expect(screen.getByText(mockProps.level)).toBeInTheDocument();
  });

  it('devrait afficher l\'icône de la compétence', () => {
    render(<SkillBadge {...mockProps} />);
    expect(screen.getByTestId('skill-icon')).toBeInTheDocument();
  });

  it('devrait avoir les classes CSS appropriées', () => {
    const { container } = render(<SkillBadge {...mockProps} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('flex', 'items-center', 'gap-3');
  });

  it('devrait supporter différents niveaux de compétence', () => {
    const { rerender } = render(<SkillBadge {...mockProps} level="Débutant" />);
    expect(screen.getByText('Débutant')).toBeInTheDocument();

    rerender(<SkillBadge {...mockProps} level="Avancé" />);
    expect(screen.getByText('Avancé')).toBeInTheDocument();
  });
});
