import { cn } from "@/lib/utils";

/**
 * The mark is a stylised "N" drawn as a single connected stroke — a nod to
 * the product joining tools together.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 shrink-0 place-items-center rounded-[0.5625rem] bg-primary text-primary-foreground shadow-subtle">
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 18V6l12 12V6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark ? (
        <span className="text-body-lg font-semibold tracking-[-0.02em]">
          Nexa
        </span>
      ) : null}
    </span>
  );
}
