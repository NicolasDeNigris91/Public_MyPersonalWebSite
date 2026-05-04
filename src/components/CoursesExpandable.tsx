'use client';

import { useState, type ReactNode } from 'react';
import { Plus, Minus } from 'lucide-react';

interface CoursesExpandableProps {
  hiddenCount: number;
  children: ReactNode;
}

export function CoursesExpandable({
  hiddenCount,
  children,
}: CoursesExpandableProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        id="courses-hidden"
        hidden={!expanded}
        // height auto + opacity transitions are not animated here on purpose:
        // the section renders fully on the server, the toggle just hides
        // the overflow rows. The reveal stays calm and snappy.
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls="courses-hidden"
        className="border-mist text-caption tracking-luxury text-chrome hover:border-gold-leaf hover:text-pearl focus-visible:outline-platinum mx-auto mt-12 flex items-center gap-3 border px-8 py-3 font-mono uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {expanded ? (
          <Minus size={16} strokeWidth={1} aria-hidden="true" />
        ) : (
          <Plus size={16} strokeWidth={1} aria-hidden="true" />
        )}
        <span>
          {expanded ? 'Mostrar menos' : `Mostrar mais ${hiddenCount}`}
        </span>
      </button>
    </>
  );
}
