'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from '@/data/site';
import { EASE_STANDARD } from '@/lib/motion';
import { track } from '@/lib/analytics';

const TOAST_VISIBLE_MS = 2500;

interface CopyEmailLinkProps {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function CopyEmailLink({
  className,
  children,
  ariaLabel,
}: CopyEmailLinkProps) {
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // SSR guard for createPortal: render the toast only after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    navigator.clipboard?.writeText(siteConfig.email);
    setShowToast(true);
    track('copy_email');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setShowToast(false),
      TOAST_VISIBLE_MS,
    );
  };

  return (
    <>
      <a
        href={`mailto:${siteConfig.email}`}
        onClick={handleClick}
        aria-label={
          ariaLabel ??
          `Email ${siteConfig.email}, clique para copiar para a área de transferência`
        }
        className={className}
      >
        {children}
      </a>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showToast && (
              <motion.div
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{
                  duration: reduced ? 0.01 : 0.4,
                  ease: EASE_STANDARD,
                }}
                className="bg-graphite border-gold-leaf text-caption tracking-luxury text-pearl fixed right-8 bottom-8 z-50 flex items-center gap-3 border px-6 py-3 font-mono uppercase shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <Check
                  aria-hidden="true"
                  size={14}
                  strokeWidth={1}
                  className="text-gold-leaf"
                />
                <span>Email copiado</span>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
