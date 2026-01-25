'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowSquareOutIcon, LayoutIcon, CodeIcon, PaintBrushIcon, HardDrivesIcon, GitBranchIcon, PaperPlaneTiltIcon, CloudArrowUpIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import DotGrid from './magicui/dotgrid';
import { useTheme } from 'next-themes';

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden flex justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor={theme === 'dark' ? '#271E37' : '#e0e7ff'}
            activeColor={theme === 'dark' ? '#5227FF' : '#4f46e5'}
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>

      <div className="w-full h-full flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-6 pt-32 md:pt-20 gap-12">
        <div className="flex-1 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
              Stack favorite : Next.js & Tailwind
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Isaac <br />
            <span className="text-zinc-500 dark:text-zinc-400">Dev Fullstack &</span> <br />
            Chef de Projet Digital.
          </motion.h1>

          <motion.p
            className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Développeur hybride avec 4 ans d'expérience. Je fusionne performance technique et stratégie SEO pour créer des expériences web ultra-rapides et visibles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4"
          >
            <a href="#projects" className="group flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              Voir mes projets
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
            </a>
            <a href="#contact" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              Me contacter
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 z-10"
        >

          <Image
            src="/Isaac-MARSHALL.webp"
            alt="Isaac Marshall"
            fill
            className="w-full h-full object-cover object-[65%_25%] rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 shadow-2xl relative z-10"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function ProjectCard({ title, description, tags, color, href }) {
  const CardContent = (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors overflow-hidden shadow-sm dark:shadow-none h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 transition-colors">
            <LayoutIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" weight="duotone" />
          </div>
          <ArrowSquareOutIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" weight="bold" />
        </div>

        <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 flex-grow">{description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}

export function SkillBadge({ icon, name, level }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-default shadow-sm dark:shadow-none"
    >
      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <div>
        <div className="font-medium text-zinc-800 dark:text-zinc-200">{name}</div>
        <div className="text-xs text-zinc-500">{level}</div>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const tools = [
    { name: "VS Code", type: "Editor", icon: CodeIcon },
    { name: "Figma", type: "Design", icon: PaintBrushIcon },
    { name: "Docker", type: "DevOps", icon: HardDrivesIcon },
    { name: "Git", type: "Version Control", icon: GitBranchIcon },
    { name: "Postman", type: "API Testing", icon: PaperPlaneTiltIcon },
    { name: "Vercel", type: "Deployment", icon: CloudArrowUpIcon },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {tools.map((tool, i) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
          <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm text-indigo-600 dark:text-indigo-400">
            <tool.icon className="w-6 h-6" weight="duotone" />
          </div>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-white">{tool.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{tool.type}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
