import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & {
  /** `wide` is reserved for the product mockup, which needs more room. */
  width?: "default" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-[75rem]",
  wide: "max-w-[87.5rem]",
} as const;

export function Container({
  className,
  width = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
