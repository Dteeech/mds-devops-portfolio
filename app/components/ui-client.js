'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code2, Database, Layout, Terminal } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-start max-w-5xl mx-auto px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
          Stack : Next.js 16 & Tailwind v4
        </span>
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Isaac <br />
        <span className="text-zinc-400">Fullstack Dev &</span> <br />
        SEO Architect.
      </motion.h1>

      <motion.p 
        className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed"
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
        <a href="#projects" className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
          Voir mes projets
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#contact" className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-semibold rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
          Me contacter
        </a>
      </motion.div>
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

export function ProjectCard({ title, description, tags, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-zinc-700 transition-colors">
            <Layout className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-zinc-100 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-zinc-400 mb-6 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs font-medium text-zinc-400 bg-zinc-950 border border-zinc-800 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillBadge({ icon, name, level }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all cursor-default"
    >
      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
        {icon}
      </div>
      <div>
        <div className="font-medium text-zinc-200">{name}</div>
        <div className="text-xs text-zinc-500">{level}</div>
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const tools = [
    { name: "VS Code", type: "Editor" },
    { name: "Figma", type: "Design" },
    { name: "Docker", type: "DevOps" },
    { name: "Git", type: "Version Control" },
    { name: "Postman", type: "API Testing" },
    { name: "Vercel", type: "Deployment" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {tools.map((tool, i) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800"
        >
          <span className="font-medium text-zinc-300">{tool.name}</span>
          <span className="text-xs text-zinc-600">{tool.type}</span>
        </motion.div>
      ))}
    </div>
  );
}
