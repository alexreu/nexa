import type { LogoShape } from "@/data/logos";
import { cn } from "@/lib/utils";

const shapes: Record<LogoShape, React.ReactNode> = {
  meridian: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15" />
    </>
  ),
  northstar: <path d="M10 1.5 12 8l6.5 2-6.5 2-2 6.5-2-6.5L1.5 10 8 8z" />,
  vertex: <path d="M10 2.5 18 17H2z" />,
  halo: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <circle cx="10" cy="10" r="3" />
    </>
  ),
  orbit: (
    <>
      <circle cx="10" cy="10" r="4" />
      <ellipse
        cx="10"
        cy="10"
        rx="8.5"
        ry="4.5"
        transform="rotate(-30 10 10)"
      />
    </>
  ),
  frame: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="3" />
      <rect x="7" y="7" width="6" height="6" rx="1.5" />
    </>
  ),
};

/**
 * Invented company marks, drawn rather than imported, so the page never
 * relies on a real trademark.
 */
export function BrandLogo({
  name,
  shape,
  className,
}: {
  name: string;
  shape: LogoShape;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 20 20"
        className="size-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {shapes[shape]}
      </svg>
      <span className="text-[0.9375rem] font-semibold tracking-[-0.015em]">
        {name}
      </span>
    </span>
  );
}
