import type { Transition, Variants } from "motion/react";

/** Mirrors --ease-out-soft in globals.css so CSS and JS motion agree. */
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;

/**
 * Critically damped springs (`bounce: 0`): they settle without overshoot,
 * and unlike a fixed-duration tween they pick up from whatever value is on
 * screen if an animation is interrupted. Nothing on this page is thrown by
 * the visitor, so nothing bounces.
 */
export const transitions = {
  base: { type: "spring", bounce: 0, duration: 0.6 },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
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
