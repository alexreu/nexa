"use client";

import { useState, type ReactNode } from "react";
import { m, type Variants } from "motion/react";

import { RevealContext } from "./RevealContext";
import { fadeUp, revealViewport, stagger } from "./variants";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each child, in seconds. */
  step?: number;
  delay?: number;
};

/**
 * Reveals its children one after another when scrolled into view. Content
 * above the fold uses CSS instead (see Hero), so it never waits for
 * hydration.
 */
export function Stagger({
  children,
  className,
  step = 0.08,
  delay = 0,
}: StaggerProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <RevealContext.Provider value={revealed}>
      <m.div
        data-reveal=""
        className={className}
        variants={stagger(step, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        onViewportEnter={() => setRevealed(true)}
      >
        {children}
      </m.div>
    </RevealContext.Provider>
  );
}

/** Child of `Stagger`; inherits the parent's `hidden` / `visible` state. */
export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <m.div data-reveal="" className={className} variants={variants}>
      {children}
    </m.div>
  );
}
