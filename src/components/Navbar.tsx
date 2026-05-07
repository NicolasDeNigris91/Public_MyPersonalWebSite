'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { EASE_STANDARD } from '@/lib/motion';
import { CopyEmailLink } from './CopyEmailLink';
import { Monogram } from './Monogram';
import { NavLink } from './NavLink';

const navVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_STANDARD, delay: 0.2 },
  },
};

const navLinks = [
  { label: 'Cursos', href: '#courses', id: 'courses' },
  { label: 'Projetos', href: '#projects', id: 'projects' },
  { label: 'Experiência', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contato', href: '#contact', id: 'contact' },
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
    triggerRef.current?.focus();
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

    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

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
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian/90 border-mist/30 border-b backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 md:px-16 lg:px-24">
        <Link
          href="/"
          aria-label={`${siteConfig.name}, início`}
          className="text-pearl hover:text-gold-leaf focus-visible:outline-platinum inline-flex items-center transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Monogram size={32} />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={activeId === link.id}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <CopyEmailLink className="text-caption tracking-luxury border-mist text-chrome hover:border-platinum hover:text-platinum focus-visible:outline-platinum hidden border px-5 py-2 font-sans uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-block">
            Diga olá
          </CopyEmailLink>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-nav-dialog"
            aria-label="Abrir menu"
            className="text-platinum focus-visible:outline-platinum inline-flex h-10 w-10 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
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
          className="bg-obsidian fixed inset-0 z-50 flex flex-col"
        >
          <div className="border-mist/30 flex items-center justify-between border-b px-8 py-5">
            <span className="text-pearl inline-flex items-center">
              <Monogram size={28} />
            </span>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Fechar menu"
              className="text-platinum focus-visible:outline-platinum inline-flex h-10 w-10 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X size={20} strokeWidth={1} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex flex-1 flex-col justify-center gap-10 px-12"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeDialog}
                  aria-current={isActive ? 'location' : undefined}
                  className={`font-display text-display-md focus-visible:outline-platinum tracking-tight italic transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${isActive ? 'text-pearl' : 'text-chrome hover:text-pearl'}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="border-mist/30 border-t px-8 py-8">
            <CopyEmailLink className="text-caption tracking-luxury border-mist text-chrome hover:border-platinum hover:text-platinum focus-visible:outline-platinum block w-full border px-5 py-3 text-center font-sans uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Diga olá
            </CopyEmailLink>
          </div>
        </div>
      ) : null}
    </motion.nav>
  );
}
