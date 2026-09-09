"use client";

import type { ReactNode } from "react";
import { m, type Variants } from "motion/react";

import { fadeUp, revealViewport, transitions } from "./variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  /** Play on mount instead of on scroll — for above-the-fold content. */
  immediate?: boolean;
};

/**
 * Single entry point for reveal animations, so sections stay Server
 * Components and only this wrapper ships to the client.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  immediate = false,
}: RevealProps) {
  return (
    <m.div
      className={className}
      variants={variants}
      initial="hidden"
      transition={{ ...transitions.base, delay }}
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: revealViewport })}
    >
      {children}
    </m.div>
  );
}
