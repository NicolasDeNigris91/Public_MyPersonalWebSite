'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Animation variants — defined outside component for stable references
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.6 },
  },
};

const subtleFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.4, ease: 'easeOut' as const, delay: 1.0 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32">
      {/* Subtle background texture — vertical rule */}
      <div className="absolute inset-y-0 left-8 md:left-16 lg:left-24 w-px bg-mist opacity-40" />

      <motion.div
        className="max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.p
          variants={fadeSlideUp}
          className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-8"
        >
          Portfolio — [YEAR]
        </motion.p>

        {/* Name — display serif */}
        <motion.h1
          variants={fadeSlideUp}
          className="font-display text-display-xl text-pearl tracking-tight leading-none mb-4"
        >
          [INSERT NAME HERE]
        </motion.h1>

        {/* Horizontal rule — animated draw */}
        <motion.div
          variants={lineReveal}
          className="h-px bg-gold-leaf w-32 mb-8"
        />

        {/* Craft / Specialty */}
        <motion.h2
          variants={fadeSlideUp}
          className="font-display text-display-lg text-chrome font-light italic mb-10"
        >
          [INSERT YOUR CRAFT/SPECIALTY]
        </motion.h2>

        {/* Lead paragraph */}
        <motion.p
          variants={fadeSlideUp}
          className="font-sans text-body-lg text-chrome max-w-2xl leading-relaxed mb-16"
        >
          [INSERT A 2–3 SENTENCE BIOGRAPHY. Describe what you build, what you care about,
          and what makes your approach distinctive. Write with conviction — this is your
          opening statement.]
        </motion.p>

        {/* CTA row */}
        <motion.div variants={fadeSlideUp} className="flex items-center gap-8">
          <a
            href="#projects"
            className="font-sans text-caption tracking-luxury uppercase border border-platinum text-platinum
                       px-8 py-3 hover:bg-platinum hover:text-obsidian transition-colors duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="font-sans text-caption tracking-luxury uppercase text-chrome hover:text-pearl
                       transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={subtleFadeIn}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-caption text-mist tracking-luxury uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} strokeWidth={1} className="text-mist" />
        </motion.div>
      </motion.div>
    </section>
  );
}
