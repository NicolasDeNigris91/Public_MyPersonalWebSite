'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { meBlurDataURL } from '@/lib/blur';
import { EASE_STANDARD, staggerContainer } from '@/lib/motion';
import { MagneticCTA } from './MagneticCTA';

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
    <section className="relative flex min-h-screen flex-col justify-center px-8 py-32 md:px-16 lg:px-24">
      <div className="bg-mist absolute inset-y-0 left-8 w-px opacity-40 md:left-16 lg:left-24" />

      <motion.div
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20"
        variants={staggerContainer(0.15, 0.3)}
        initial="hidden"
        animate="visible"
      >
        <div className="order-last max-w-2xl lg:order-first">
          <motion.p
            variants={fadeSlideUp}
            className="text-caption text-racing-green-lit tracking-luxury mb-8 font-mono uppercase"
          >
            Portfolio · {new Date().getFullYear()}
          </motion.p>

          {/*
            The h1 is the LCP element above the fold on mobile. Keeping it
            inside a motion variant with initial={opacity:0, y:32} delays
            its first visible paint until JS hydrates and the parent stagger
            runs, which capped Lighthouse mobile at 93. Rendering it static
            takes LCP from ~3.2s down to ~FCP. Editorially, magazine covers
            do not animate the title; they animate the kicker, the rule and
            the supporting copy around it. Those keep their cascade below.
          */}
          <h1 className="font-display text-display-xl text-pearl mb-4 leading-none tracking-tight">
            {siteConfig.name}
          </h1>

          <motion.div
            variants={lineReveal}
            className="bg-gold-leaf mb-10 h-px w-32"
          />

          <motion.p
            variants={fadeSlideUp}
            className="text-body-lg text-chrome mb-12 font-sans leading-relaxed"
          >
            Depois de dez anos na joalheria de luxo, reorientei a carreira para
            o desenvolvimento de software. Hoje construo aplicações web full
            stack.
          </motion.p>

          <motion.div
            variants={fadeSlideUp}
            className="flex items-center gap-8"
          >
            <MagneticCTA
              href="#projects"
              className="text-caption tracking-luxury border-platinum text-platinum hover:bg-platinum hover:text-obsidian focus-visible:outline-platinum inline-block border px-8 py-3 font-sans uppercase transition-colors duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Ver projetos
            </MagneticCTA>
            <a
              href="#contact"
              className="text-caption tracking-luxury text-chrome hover:text-pearl font-sans uppercase transition-colors duration-300"
            >
              Falar comigo
            </a>
          </motion.div>
        </div>

        {/*
          The portrait is the LCP element on mobile. Lighthouse measures LCP
          when the element becomes visible, and a framer-motion variant with
          initial={opacity: 0, y: 32} delays that until JS hydrates and the
          parent stagger runs. Pulling this <div> out of the motion tree lets
          the browser paint the image as soon as the bytes arrive, which on
          Slow 4G is ~1.5s instead of ~3.4s.
        */}
        <div className="border-mist group relative mx-auto aspect-[4/5] w-[220px] overflow-hidden border shadow-[0_8px_32px_rgba(0,0,0,0.4)] lg:mx-0 lg:w-[360px]">
          <Image
            src="/me.webp"
            alt={`Retrato de ${siteConfig.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 360px, 220px"
            placeholder="blur"
            blurDataURL={meBlurDataURL}
            className="object-cover object-top grayscale transition-all duration-[600ms] ease-in-out group-hover:grayscale-0"
          />
          <div className="bg-gold-leaf absolute -bottom-px -left-px h-px w-12" />
          <div className="bg-gold-leaf absolute -bottom-px -left-px h-12 w-px" />
        </div>
      </motion.div>

      <motion.div
        variants={subtleFadeIn}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-caption text-mist tracking-luxury font-mono uppercase">
          Role
        </span>
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
