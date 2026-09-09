"use client";

import type { ReactNode } from "react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

/**
 * `strict` forbids the heavyweight `motion.*` components: every animated
 * element must use `m.*`, which keeps the animation runtime around 6 kB.
 * `reducedMotion="user"` makes Motion honour prefers-reduced-motion globally.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
