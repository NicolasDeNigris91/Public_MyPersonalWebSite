'use client';

import { motion, type Variants } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';
import { coursesData } from '@/data/courses';

const VISIBLE_COUNT = 6;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function Courses() {
  const totalHours = coursesData.reduce((sum, c) => {
    const num = parseFloat(c.hours.replace(',', '.').replace('h', ''));
    return sum + num;
  }, 0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expanded, setExpanded] = useState(false);
  const ordered = [...coursesData].reverse();
  const visibleCourses = ordered.slice(0, VISIBLE_COUNT);

  return (
    <section id="courses" className="px-8 md:px-16 lg:px-24 py-24 bg-graphite">
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
            Continuous Learning
          </p>
          <h2 className="font-display text-display-lg text-pearl">Courses &amp; Certifications</h2>
          <div className="h-px bg-gold-leaf w-24 mt-4" />
          <p className="font-mono text-caption text-chrome tracking-wide mt-4">
            {coursesData.length} courses · {totalHours.toFixed(0).replace('.', ',')}+ hours of study
          </p>
        </motion.div>

        {/* Course list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-0"
        >
          {visibleCourses.map((course) => (
            <motion.div
              key={course.name}
              variants={rowVariants}
              className="group grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_180px_80px] items-center
                         gap-4 md:gap-8 py-4 border-b border-mist/40
                         hover:bg-carbon/50 transition-colors duration-200 px-4 -mx-4"
            >
              {/* Course name */}
              <div className="flex items-center gap-3">
                <BookOpen size={14} strokeWidth={1} className="text-racing-green-lit flex-shrink-0 hidden md:block" />
                <span className="font-sans text-body text-pearl group-hover:text-gold-leaf transition-colors duration-300">
                  {course.name}
                </span>
              </div>

              {/* Date */}
              <span className="font-mono text-caption text-chrome tracking-wide text-right">
                {course.date}
              </span>

              {/* Hours */}
              <span className="font-mono text-caption text-racing-green-lit tracking-wide text-right flex items-center justify-end gap-1">
                <Clock size={12} strokeWidth={1} className="hidden md:block" />
                {course.hours}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
