"use client";

import { useState, type ReactNode } from "react";
import { m, type Variants } from "motion/react";

import { RevealContext } from "./RevealContext";
import { fadeUp, revealViewport, transitions } from "./variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
};

/**
 * Single entry point for scroll reveals, so sections stay Server Components
 * and only this wrapper ships to the client. `data-reveal` lets the
 * `<noscript>` rule in the layout show the content when JavaScript never
 * runs.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
}: RevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <RevealContext.Provider value={revealed}>
      <m.div
        data-reveal=""
        className={className}
        variants={variants}
        initial="hidden"
        transition={{ ...transitions.base, delay }}
        whileInView="visible"
        viewport={revealViewport}
        onViewportEnter={() => setRevealed(true)}
      >
        {children}
      </m.div>
    </RevealContext.Provider>
  );
}
