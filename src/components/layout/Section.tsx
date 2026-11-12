import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  /** Id of the heading that names this section, for screen readers. */
  labelledBy?: string;
  tone?: "default" | "sunk";
};

/**
 * Owns the page's vertical rhythm. Sections never set their own top/bottom
 * padding so spacing stays consistent across the whole landing page. Anchor
 * offsets come from `scroll-padding-top` on <html> alone: adding a
 * `scroll-margin` here as well would double the gap under the header.
 */
export function Section({
  className,
  labelledBy,
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        tone === "sunk" && "bg-sunk",
        className,
      )}
      {...props}
    />
  );
}
