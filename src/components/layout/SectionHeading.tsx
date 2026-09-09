import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Must match the `labelledBy` of the surrounding Section. */
  id?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-label font-medium tracking-[0.08em] text-brand-text uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-h2 text-balance">
        {title}
      </h2>
      {description ? (
        <p className="text-lead text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
