"use client";

import { useId, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

type FieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  error?: string;
};

/**
 * Label, control and error message wired together: the input carries
 * `aria-invalid` and points at its message through `aria-describedby`, so a
 * screen reader announces the problem with the field rather than separately.
 */
export function Field({ label, error, className, ...props }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.8125rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-11 w-full rounded-lg border bg-card px-3 text-[0.9375rem] transition-colors placeholder:text-subtle",
          error ? "border-danger-text" : "hover:border-line-strong",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-[0.8125rem] text-danger-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}
