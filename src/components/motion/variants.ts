import type { Transition, Variants } from "motion/react";

/** Mirrors --ease-out-soft in globals.css so CSS and JS motion agree. */
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  fast: { duration: 0.25, ease: easeOutSoft },
  base: { duration: 0.45, ease: easeOutSoft },
  slow: { duration: 0.7, ease: easeOutSoft },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transitions.slow },
};

/** Parent variant that reveals its children one after another. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Shared viewport config: reveal once, slightly before the element is centred. */
export const revealViewport = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -80px 0px",
} as const;
