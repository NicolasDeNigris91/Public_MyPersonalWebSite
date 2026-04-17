'use client';

import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { BookOpen, Clock, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { coursesData } from '@/data/courses';
import { EASE_STANDARD } from '@/lib/motion';

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
    transition: { duration: 0.5, ease: EASE_STANDARD },
  },
};

export function Courses() {
  const totalHours = coursesData.reduce((sum, c) => {
    const num = parseFloat(c.hours.replace(',', '.').replace('h', ''));
    return sum + num;
  }, 0);

  const [expanded, setExpanded] = useState(false);
  const ordered = [...coursesData].reverse();
  const visibleCourses = ordered.slice(0, VISIBLE_COUNT);
  const hiddenCourses = ordered.slice(VISIBLE_COUNT);

  const reduced = useReducedMotion();
  const containerDuration = reduced ? 0.01 : 0.6;
  const rowDuration = reduced ? 0.01 : 0.5;
  const rowDelayStep = reduced ? 0 : 0.04;

  return (
    <section id="courses" className="px-8 md:px-16 lg:px-24 py-24 bg-graphite">
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
          {/* Always mounted so aria-controls resolves while collapsed. */}
          <div id="courses-hidden">
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="courses-hidden-rows"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: containerDuration,
                    ease: EASE_STANDARD,
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  {hiddenCourses.map((course, i) => (
                    <motion.div
                      key={course.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * rowDelayStep,
                          duration: rowDuration,
                          ease: EASE_STANDARD,
                        },
                      }}
                      className="group grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_180px_80px] items-center
                                 gap-4 md:gap-8 py-4 border-b border-mist/40
                                 hover:bg-carbon/50 transition-colors duration-200 px-4 -mx-4"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen size={14} strokeWidth={1} className="text-racing-green-lit flex-shrink-0 hidden md:block" />
                        <span className="font-sans text-body text-pearl group-hover:text-gold-leaf transition-colors duration-300">
                          {course.name}
                        </span>
                      </div>
                      <span className="font-mono text-caption text-chrome tracking-wide text-right">
                        {course.date}
                      </span>
                      <span className="font-mono text-caption text-racing-green-lit tracking-wide text-right flex items-center justify-end gap-1">
                        <Clock size={12} strokeWidth={1} className="hidden md:block" />
                        {course.hours}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="courses-hidden"
          className="mt-12 mx-auto flex items-center gap-3
                     px-8 py-3 border border-mist
                     font-mono text-caption tracking-luxury uppercase text-chrome
                     hover:border-gold-leaf hover:text-pearl
                     transition-colors duration-300"
        >
          {expanded ? <Minus size={16} strokeWidth={1} /> : <Plus size={16} strokeWidth={1} />}
          <span>
            {expanded ? 'Show less' : `Show ${coursesData.length - VISIBLE_COUNT} more`}
          </span>
        </button>
      </div>
    </section>
  );
}
