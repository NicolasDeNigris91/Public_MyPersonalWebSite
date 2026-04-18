'use client';

import { motion, type Variants } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { EASE_STANDARD, staggerContainer } from '@/lib/motion';
import { ProjectCard } from './ProjectCard';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_STANDARD },
  },
};

export function Projects() {
  const featured = projectsData.filter((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-8 md:px-16 lg:px-24 py-24 bg-graphite">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE_STANDARD }}
          className="mb-16"
        >
          <p className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-display text-display-lg text-pearl">Projects</h2>
          <div className="h-px bg-gold-leaf w-24 mt-4" />
        </motion.div>

        {/* Featured grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`grid gap-6 mb-6 ${featured.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Non-featured row */}
        {rest.length > 0 && (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {rest.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
