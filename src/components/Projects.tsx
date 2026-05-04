'use client';

import { motion, type Variants } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { caseStudiesData } from '@/data/case-studies';
import { EASE_STANDARD, staggerContainer } from '@/lib/motion';
import { ProjectCard } from './ProjectCard';

const caseStudyByProjectId = new Map(
  caseStudiesData.map((cs) => [cs.projectId, cs.slug]),
);

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
    <section id="projects" className="bg-graphite px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE_STANDARD }}
          className="mb-16"
        >
          <p className="text-caption text-racing-green-lit tracking-luxury mb-3 font-mono uppercase">
            Trabalhos selecionados
          </p>
          <h2 className="font-display text-display-lg text-pearl">Projetos</h2>
          <div className="bg-gold-leaf mt-4 h-px w-24" />
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`mb-6 grid gap-6 ${featured.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                caseStudySlug={caseStudyByProjectId.get(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {rest.length > 0 && (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 md:grid-cols-3"
          >
            {rest.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <ProjectCard
                  project={project}
                  caseStudySlug={caseStudyByProjectId.get(project.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
