"use client";

import { createContext, useContext } from "react";

/**
 * Whether the surrounding `Reveal` or `Stagger` has played. `null` outside
 * of one. Lets nested effects — the statistics count-up — start when their
 * content actually becomes visible rather than on a trigger of their own
 * that fires while the content is still transparent.
 */
export const RevealContext = createContext<boolean | null>(null);

export function useRevealed() {
  return useContext(RevealContext);
}
