import type { Variants } from 'framer-motion';

export const EASE_STANDARD = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export const staggerContainer = (step: number, delayChildren?: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: step,
      ...(delayChildren !== undefined && { delayChildren }),
    },
  },
});
