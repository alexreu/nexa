"use client";

import type { ReactNode } from "react";
import { m, type Variants } from "motion/react";

import { fadeUp, revealViewport, stagger } from "./variants";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each child, in seconds. */
  step?: number;
  delay?: number;
  immediate?: boolean;
};

export function Stagger({
  children,
  className,
  step = 0.08,
  delay = 0,
  immediate = false,
}: StaggerProps) {
  return (
    <m.div
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: revealViewport })}
    >
      {children}
    </m.div>
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
    <m.div className={className} variants={variants}>
      {children}
    </m.div>
  );
}
