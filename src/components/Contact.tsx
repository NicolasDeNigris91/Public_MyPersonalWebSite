'use client';

import { motion, type Variants } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { EASE_STANDARD, staggerContainer } from '@/lib/motion';
import { CopyEmailLink } from './CopyEmailLink';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_STANDARD },
  },
};

export function Contact() {
  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-24 bg-graphite">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Section heading */}
        <motion.div variants={fadeUp} className="mb-16">
          <p className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-display-lg text-pearl">
            Let&rsquo;s Connect
          </h2>
          <div className="h-px bg-gold-leaf w-24 mt-4" />
        </motion.div>

        {/* Contact content */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Message */}
          <motion.div variants={fadeUp}>
            <p className="font-sans text-body-lg text-chrome leading-relaxed mb-8">
              Disponível para novas oportunidades em desenvolvimento de software.
            </p>
            <CopyEmailLink
              className="inline-flex items-center gap-3 font-sans text-caption tracking-luxury uppercase
                         border border-platinum text-platinum px-8 py-3
                         hover:bg-platinum hover:text-obsidian transition-colors duration-300
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platinum"
            >
              <Mail size={14} strokeWidth={1} />
              Send Email
            </CopyEmailLink>
          </motion.div>

          {/* Details */}
          <motion.div variants={fadeUp} className="space-y-8">
            <div>
              <h3 className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
                Email
              </h3>
              <CopyEmailLink
                className="font-sans text-body text-pearl hover:text-gold-leaf transition-colors duration-300"
              >
                {siteConfig.email}
              </CopyEmailLink>
            </div>

            <div>
              <h3 className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
                Phone
              </h3>
              <a
                href={siteConfig.phoneLink}
                className="font-sans text-body text-pearl hover:text-gold-leaf transition-colors duration-300 flex items-center gap-2"
              >
                <Phone size={14} strokeWidth={1} className="text-mist" />
                {siteConfig.phone}
              </a>
            </div>

            <div>
              <h3 className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
                Location
              </h3>
              <p className="font-sans text-body text-chrome flex items-center gap-2">
                <MapPin size={14} strokeWidth={1} className="text-mist" />
                {siteConfig.location}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-caption text-racing-green-lit tracking-luxury uppercase mb-3">
                Social
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-body text-chrome hover:text-pearl transition-colors duration-300"
                >
                  GitHub ↗
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-body text-chrome hover:text-pearl transition-colors duration-300"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
