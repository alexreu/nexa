"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { easeOutSoft } from "@/components/motion/variants";

function formatValue(value: number, decimals: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Renders the final figure on the server, so the number is correct without
 * JavaScript and under reduced motion. The count-up only replaces it once
 * the element is in view, and writes straight to the DOM to avoid a React
 * render on every frame.
 */
export function Counter({
  value,
  decimals,
  suffix,
}: {
  value: number;
  decimals: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: easeOutSoft,
      onUpdate: (current) => {
        element.textContent = formatValue(current, decimals);
      },
    });

    return () => controls.stop();
  }, [inView, value, decimals, prefersReducedMotion]);

  return (
    <span>
      <span ref={ref}>{formatValue(value, decimals)}</span>
      {suffix ? <span>{suffix}</span> : null}
    </span>
  );
}
