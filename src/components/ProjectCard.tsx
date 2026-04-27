'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitBranch } from 'lucide-react';
import { EASE_STANDARD } from '@/lib/motion';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE_STANDARD }}
      className="group bg-graphite border border-mist hover:border-gold-leaf
                 shadow-card hover:shadow-card-hover transition-all duration-300
                 flex flex-col"
    >
      <div className="h-px bg-gradient-to-r from-racing-green-lit via-gold-leaf to-transparent" />

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-caption text-racing-green-lit tracking-wide">
            {project.year}
          </span>
          <div className="flex items-center gap-3">
            {project.repoHref && (
              <a
                href={project.repoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chrome hover:text-gold-leaf transition-colors duration-200"
                aria-label="View source code"
              >
                <GitBranch size={16} strokeWidth={1} />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chrome hover:text-gold-leaf transition-colors duration-200"
                aria-label="View live project"
              >
                <ExternalLink size={16} strokeWidth={1} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-display text-display-md text-pearl mb-1 group-hover:text-gold-leaf
                       transition-colors duration-300">
          {project.title}
        </h3>

        <p className="font-sans text-caption text-chrome tracking-wide uppercase mb-4">
          {project.subtitle}
        </p>

        <div className="h-px bg-mist mb-4" />

        <p className="font-sans text-body text-chrome leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-caption text-mist border border-mist px-3 py-1 tracking-wide
                         group-hover:border-racing-green-lit group-hover:text-racing-green-lit
                         transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
