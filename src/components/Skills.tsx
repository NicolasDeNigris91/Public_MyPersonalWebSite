'use client';

import { motion, type Variants } from 'framer-motion';
import { skillsData } from '@/data/site';
import { EASE_STANDARD, staggerContainer } from '@/lib/motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_STANDARD },
  },
};

export function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 lg:px-24 py-24">
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
            Expertise
          </p>
          <h2 className="font-display text-display-lg text-pearl">Skills &amp; Tools</h2>
          <div className="h-px bg-gold-leaf w-24 mt-4" />
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillsData.map((skill) => (
            <motion.div
              key={skill.category}
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <h3 className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-6">
                {skill.category}
              </h3>
              <ul className="space-y-3">
                {skill.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-leaf flex-shrink-0" />
                    <span className="font-sans text-body text-chrome">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
