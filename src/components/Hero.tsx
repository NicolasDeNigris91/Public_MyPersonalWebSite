'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { EASE_STANDARD, staggerContainer } from '@/lib/motion';

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE_STANDARD },
  },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: EASE_STANDARD },
  },
};

const subtleFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.4, ease: EASE_STANDARD, delay: 1.0 },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32">
      <div className="absolute inset-y-0 left-8 md:left-16 lg:left-24 w-px bg-mist opacity-40" />

      <motion.div
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center"
        variants={staggerContainer(0.15, 0.3)}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl order-last lg:order-first">
          <motion.p
            variants={fadeSlideUp}
            className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-8"
          >
            Portfolio · {new Date().getFullYear()}
          </motion.p>

          <motion.h1
            variants={fadeSlideUp}
            className="font-display text-display-xl text-pearl tracking-tight leading-none mb-4"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.div
            variants={lineReveal}
            className="h-px bg-gold-leaf w-32 mb-10"
          />

          <motion.p
            variants={fadeSlideUp}
            className="font-sans text-body-lg text-chrome leading-relaxed mb-12"
          >
            Depois de dez anos na joalharia de luxo, reorientei a carreira para
            o desenvolvimento de software. Hoje construo aplicações web full
            stack.
          </motion.p>

          <motion.div variants={fadeSlideUp} className="flex items-center gap-8">
            <a
              href="#projects"
              className="font-sans text-caption tracking-luxury uppercase border border-platinum text-platinum
                         px-8 py-3 hover:bg-platinum hover:text-obsidian transition-colors duration-300
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platinum"
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
        </div>

        <motion.div
          variants={fadeSlideUp}
          className="relative mx-auto lg:mx-0 w-[220px] lg:w-[360px] aspect-[4/5]
                     border border-mist shadow-[0_8px_32px_rgba(0,0,0,0.4)] group overflow-hidden"
        >
          <Image
            src="/me.webp"
            alt={`Retrato de ${siteConfig.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 360px, 220px"
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-[600ms] ease-in-out"
          />
          <div className="absolute -bottom-px -left-px w-12 h-px bg-gold-leaf" />
          <div className="absolute -bottom-px -left-px w-px h-12 bg-gold-leaf" />
        </motion.div>

      </motion.div>

      <motion.div
        variants={subtleFadeIn}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-caption text-mist tracking-luxury uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: EASE_STANDARD }}
        >
          <ArrowDown size={16} strokeWidth={1} className="text-mist" />
        </motion.div>
      </motion.div>
    </section>
  );
}
