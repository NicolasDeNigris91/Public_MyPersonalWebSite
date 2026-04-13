'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { experienceData } from '@/data/experience';
import type { ExperienceEntry } from '@/types';

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const entryVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

interface EntryProps {
  entry: ExperienceEntry;
}

function ExperienceEntryCard({ entry }: EntryProps) {
  const Icon = entry.type === 'education' ? GraduationCap : Briefcase;

  return (
    <motion.article
      variants={entryVariants}
      className="group relative grid grid-cols-[1px_1fr] gap-8"
    >
      {/* Timeline spine */}
      <div className="relative flex flex-col items-center">
        <div className="w-px flex-1 bg-mist group-first:mt-3" />
        <div className="absolute top-3 w-2 h-2 rounded-full bg-racing-green-lit ring-4 ring-obsidian" />
      </div>

      {/* Content */}
      <div className="pb-12 pl-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon size={14} strokeWidth={1} className="text-racing-green-lit" />
              <span className="font-mono text-caption text-racing-green-lit tracking-wide uppercase">
                {entry.type === 'education' ? 'Education' : 'Experience'}
              </span>
            </div>
            <h3 className="font-display text-display-md text-pearl">{entry.organisation}</h3>
            <p className="font-sans text-body text-chrome font-light">{entry.role}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-caption text-chrome tracking-wide">{entry.period}</p>
            <div className="flex items-center justify-end gap-1 mt-1">
              <MapPin size={12} strokeWidth={1} className="text-mist" />
              <span className="font-mono text-caption text-mist">{entry.location}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-mist mb-4" />

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {entry.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 w-1 h-1 rounded-full bg-gold-leaf flex-shrink-0" />
              <span className="font-sans text-body text-chrome">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-caption text-mist border border-mist px-3 py-1 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Experience() {
  const work = experienceData.filter((e) => e.type === 'work');
  const education = experienceData.filter((e) => e.type === 'education');

  return (
    <section id="experience" className="px-8 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="mb-16"
        >
          <p className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
            Background
          </p>
          <h2 className="font-display text-display-lg text-pearl">Experience &amp; Education</h2>
          <div className="h-px bg-gold-leaf w-24 mt-4" />
        </motion.div>

        {/* Two-column layout on large screens */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Work */}
          <div>
            <p className="font-mono text-caption text-chrome tracking-luxury uppercase mb-8">
              Work History
            </p>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {work.map((entry) => (
                <ExperienceEntryCard key={entry.id} entry={entry} />
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <p className="font-mono text-caption text-chrome tracking-luxury uppercase mb-8">
              Education
            </p>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {education.map((entry) => (
                <ExperienceEntryCard key={entry.id} entry={entry} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
