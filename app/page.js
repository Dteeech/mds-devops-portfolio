
import { CodeIcon, DatabaseIcon, GlobeIcon, LayoutIcon, MagnifyingGlassIcon, TerminalIcon, CpuIcon, StackIcon, CheckCircleIcon, KanbanIcon, RocketLaunchIcon } from '@phosphor-icons/react/dist/ssr';
import { HeroSection, Reveal, ProjectCard, SkillBadge, TechStack } from './components/ui-client';

export const metadata = {
  title: 'Isaac | Dev Fullstack & Chef de Projet Digital',
  description: 'Portfolio de Isaac, développeur Fullstack et Chef de Projet Digital chez Passedevant.',
};

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-200 transaction-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span> {' '}
              À propos
            </h2>

            <div className="mb-16 max-w-3xl">
              <p className="text-2xl md:text-3xl font-semibold leading-tight text-zinc-800 dark:text-zinc-100 mb-6">
                Plus qu'un développeur, je suis le <span className="text-indigo-600 dark:text-indigo-400">pivot technique</span> de vos projets.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Profil hybride <strong>Développeur Fullstack & Chef de Projet Digital</strong>. Je ne me contente pas de livrer du code : je garantis la cohérence technique, le respect des délais et la performance native de vos applications.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pillier 1 : Référent Tech */}
              <div className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-indigo-500/30 transition-colors">
                <div className="w-12 h-12 mb-4 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <TerminalIcon className="w-6 h-6" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">Référent Tech</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                  Je ne suis pas un simple exécutant. Je challenge les specs, garantis la qualité du code et choisis les meilleures solutions techniques (Next.js 15, Tailwind v4) pour un produit robuste.
                </p>
              </div>

              {/* Pillier 2 : Gestion de Projet */}
              <div className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-indigo-500/30 transition-colors">
                <div className="w-12 h-12 mb-4 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <KanbanIcon className="w-6 h-6" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">Gestion de Projet</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                  Expert ClickUp. Je gère les ODR, les comptes rendus et le suivi des tâches avec une rigueur militaire. Mon objectif : zéro friction entre la technique et le business.
                </p>
              </div>

              {/* Pillier 3 : Relation SEO */}
              <div className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-indigo-500/30 transition-colors">
                <div className="w-12 h-12 mb-4 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <RocketLaunchIcon className="w-6 h-6" weight="duotone" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">Culture SEO</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                  En agence SEO, j'ai appris que la vitesse est reine. Je maîtrise les Core Web Vitals et la sémantique HTML pour livrer des sites nativement optimisés pour Google.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900/20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              Compétences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <CodeIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" weight="bold" />
                  Tech Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SkillBadge icon={<GlobeIcon className="w-5 h-5" weight="duotone" />} name="Next.js 16" level="Expert" />
                  <SkillBadge icon={<LayoutIcon className="w-5 h-5" weight="duotone" />} name="React 19" level="Avancé" />
                  <SkillBadge icon={<TerminalIcon className="w-5 h-5" weight="duotone" />} name="TypeScript" level="Avancé" />
                  <SkillBadge icon={<StackIcon className="w-5 h-5" weight="duotone" />} name="Tailwind v4" level="Expert" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" weight="bold" />
                  Transverse & SEO
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SkillBadge icon={<MagnifyingGlassIcon className="w-5 h-5" weight="duotone" />} name="SEO Technique" level="Expert" />
                  <SkillBadge icon={<CpuIcon className="w-5 h-5" weight="duotone" />} name="Core Web Vitals" level="Expert" />
                  <SkillBadge icon={<DatabaseIcon className="w-5 h-5" weight="duotone" />} name="WordPress" level="Avancé" />
                  <SkillBadge icon={<GlobeIcon className="w-5 h-5" weight="duotone" />} name="Gestion Agile" level="Scrum/Kanban" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              Projets Récents
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ProjectCard
                title="Parking Privé Aéroport"
                description="Service de réservation de parking sécurisé. Optimisation SEO locale et parcours utilisateur fluide."
                tags={['WordPress', 'Oxygen', 'SEO Local']}
                color="from-blue-500/20 to-indigo-500/20"
                href="https://parking-prive-aeroport-nantes.fr/"
              />
              <ProjectCard
                title="Guilmault Catherine artiste peintre"
                description="Site vitrine pour une artiste peintre. Design épuré et mise en avant des réalisations."
                tags={['WordPress', 'Showcase', 'Responsive']}
                color="from-emerald-500/20 to-teal-500/20"
                href="https://guilmault-catherine.fr/"
              />
              <ProjectCard
                title="Portfolio DevOps"
                description="Ce portfolio ! CI/CD complète, tests unitaires, Docker et déploiement automatisé sur VPS."
                tags={['Next.js 16', 'Docker', 'GitHub Actions']}
                color="from-purple-500/20 to-pink-500/20"
                href="https://github.com/Dteeech/mds-devops-portfolio"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience & Stack Section */}
      <section className="py-24 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-8">Mon Environnement</h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  J'utilise une suite d'outils modernes pour garantir productivité et qualité de code.
                </p>
                <TechStack />
              </div>
              <div className="md:w-1/2 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Prêt à collaborer ?</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Je suis à l'écoute de vos opportunités.
                  <br />
                  Contactez-moi sur LinkedIn.
                </p>
                <a
                  href="https://www.linkedin.com/in/isaac-marshall-106660227/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
                >
                  Me contacter
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-500 dark:text-zinc-600 text-sm border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black">
        <p>© 2025 Isaac. Construit avec Next.js 16 & Tailwind v4.</p>
      </footer>
    </main>
  );
}
