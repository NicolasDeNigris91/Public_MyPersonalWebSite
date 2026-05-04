'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { EASE_STANDARD } from '@/lib/motion';
import { CopyEmailLink } from './CopyEmailLink';

const navVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_STANDARD, delay: 0.2 },
  },
};

const navLinks = [
  { label: 'Courses', href: '#courses', id: 'courses' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, closeDialog]);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian/90 backdrop-blur-md border-b border-mist/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-16 lg:px-24 py-5">
        <a
          href="#"
          aria-label={`${siteConfig.name} — início`}
          className="font-display text-lg text-pearl tracking-wide hover:text-gold-leaf transition-colors duration-300
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-platinum"
        >
          {siteConfig.name.split(' ').map((word) => word[0]).join('')}
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative font-sans text-caption tracking-luxury uppercase transition-colors duration-300
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-platinum
                           ${isActive ? 'text-pearl' : 'text-chrome hover:text-pearl'}`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-px bg-gold-leaf transition-[width] duration-300
                             ${isActive ? 'w-full' : 'w-0'}`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <CopyEmailLink
            className="hidden md:inline-block font-sans text-caption tracking-luxury uppercase border border-mist text-chrome
                       px-5 py-2 hover:border-platinum hover:text-platinum transition-colors duration-300
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platinum"
          >
            Say Hello
          </CopyEmailLink>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-nav-dialog"
            aria-label="Abrir menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-platinum
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platinum"
          >
            <Menu size={20} strokeWidth={1} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={dialogRef}
          id="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 bg-obsidian flex flex-col"
        >
          <div className="flex items-center justify-between px-8 py-5 border-b border-mist/30">
            <span className="font-display text-lg text-pearl tracking-wide">
              {siteConfig.name.split(' ').map((word) => word[0]).join('')}
            </span>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Fechar menu"
              className="inline-flex items-center justify-center w-10 h-10 text-platinum
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platinum"
            >
              <X size={20} strokeWidth={1} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex-1 flex flex-col justify-center gap-10 px-12"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeDialog}
                  aria-current={isActive ? 'location' : undefined}
                  className={`font-display italic text-display-md tracking-tight transition-colors duration-300
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-platinum
                             ${isActive ? 'text-pearl' : 'text-chrome hover:text-pearl'}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="px-8 py-8 border-t border-mist/30">
            <CopyEmailLink
              className="block w-full text-center font-sans text-caption tracking-luxury uppercase border border-mist text-chrome
                         px-5 py-3 hover:border-platinum hover:text-platinum transition-colors duration-300
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-platinum"
            >
              Say Hello
            </CopyEmailLink>
          </div>
        </div>
      ) : null}
    </motion.nav>
  );
}
