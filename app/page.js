
import { Code2, Database, Globe, Layout, Search, Terminal, Cpu, Layers } from 'lucide-react';
import { HeroSection, Reveal, ProjectCard, SkillBadge, TechStack } from './components/ui-client';

export const metadata = {
  title: 'Isaac | Fullstack Dev & SEO Architect',
  description: 'Portfolio de Isaac, développeur Fullstack spécialisé Next.js, React et SEO Technique.',
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen selection:bg-indigo-500/30">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              À propos
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                <p>
                  <strong className="text-white">4 ans d'expérience</strong> dans le développement web, je suis actuellement en alternance dans une agence SEO réputée tout en finalisant mon Master Chef de Projet Digital à <span className="text-indigo-400">My Digital School Saint-Herblain</span>.
                </p>
                <p>
                  Mon approche est unique : je ne me contente pas de coder des fonctionnalités, je conçois des architectures pensées pour la <strong className="text-white">visibilité</strong> et la <strong className="text-white">performance</strong>.
                </p>
                <p>
                  Passionné par la "Bleeding Edge", je veille constamment sur les nouvelles technos (React 19, Next.js Canary) pour garder une longueur d'avance.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full opacity-20"></div>
                <div className="relative p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Mon Parcours</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                      <div>
                        <div className="text-white font-medium">Master Chef de Projet Digital</div>
                        <div className="text-sm text-zinc-500">My Digital School, St-Herblain • En cours</div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-zinc-600"></div>
                      <div>
                        <div className="text-white font-medium">Alternance Développeur Fullstack</div>
                        <div className="text-sm text-zinc-500">Agence SEO • Depuis 2023</div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-zinc-600"></div>
                      <div>
                        <div className="text-white font-medium">Bachelor Développeur Web</div>
                        <div className="text-sm text-zinc-500">Diplômé avec mention</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              Compétences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-zinc-200 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  Tech Stack
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SkillBadge icon={<Globe className="w-5 h-5" />} name="Next.js 16" level="Expert" />
                  <SkillBadge icon={<Layout className="w-5 h-5" />} name="React 19" level="Avancé" />
                  <SkillBadge icon={<Terminal className="w-5 h-5" />} name="TypeScript" level="Avancé" />
                  <SkillBadge icon={<Layers className="w-5 h-5" />} name="Tailwind v4" level="Expert" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6 text-zinc-200 flex items-center gap-2">
                  <Search className="w-5 h-5 text-indigo-400" />
                  Transverse & SEO
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SkillBadge icon={<Search className="w-5 h-5" />} name="SEO Technique" level="Expert" />
                  <SkillBadge icon={<Cpu className="w-5 h-5" />} name="Core Web Vitals" level="Expert" />
                  <SkillBadge icon={<Database className="w-5 h-5" />} name="PostgreSQL" level="Intermédiaire" />
                  <SkillBadge icon={<Globe className="w-5 h-5" />} name="Gestion Agile" level="Scrum/Kanban" />
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
                title="SaaS Audit SEO"
                description="Plateforme d'analyse automatisée de Core Web Vitals avec rapports PDF générés à la volée."
                tags={['Next.js 15', 'Puppeteer', 'Postgres']}
                color="from-indigo-500/20 to-purple-500/20"
              />
              <ProjectCard
                title="E-commerce Headless"
                description="Front-end ultra-rapide connecté à Shopify Plus. Score Lighthouse 100/100."
                tags={['React 19', 'Shopify API', 'Zustand']}
                color="from-emerald-500/20 to-teal-500/20"
              />
              <ProjectCard
                title="Dashboard Analytics"
                description="Interface d'administration pour agence marketing avec visualisation de données en temps réel."
                tags={['Tremor', 'Tailwind', 'Supabase']}
                color="from-blue-500/20 to-cyan-500/20"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience & Stack Section */}
      <section className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-8">Mon Environnement</h2>
                <p className="text-zinc-400 mb-8">
                  J'utilise une suite d'outils modernes pour garantir productivité et qualité de code.
                </p>
                <TechStack />
              </div>
              <div className="md:w-1/2 bg-zinc-900/30 rounded-2xl p-8 border border-zinc-800 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Prêt à collaborer ?</h3>
                <p className="text-zinc-400 mb-8">
                  Je suis à l'écoute d'opportunités pour des projets ambitieux nécessitant une expertise technique pointue.
                </p>
                <a
                  href="mailto:isaac@example.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
                >
                  Me contacter
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-zinc-900">
        <p>© 2025 Isaac. Construit avec Next.js 16 & Tailwind v4.</p>
      </footer>
    </main>
  );
}
