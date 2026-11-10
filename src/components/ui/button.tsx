import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Focus styling is intentionally absent here: `:focus-visible` is defined once
 * globally so every interactive element shares the same visible focus ring.
 *
 * Feedback lives on the press: the button gives way the instant it is
 * pressed (75 ms in) and eases back more slowly when released (200 ms out).
 * `:active` is not gated behind `(hover: hover)`, so touch gets it too.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "border border-transparent bg-clip-padding font-medium select-none",
    "transition-[background-color,border-color,box-shadow,scale,color] duration-200 ease-out-soft",
    "active:scale-[0.97] active:duration-75 disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground shadow-subtle",
          "hover:bg-brand-hover hover:shadow-lifted active:bg-brand-hover",
          // Hairline top highlight: reads as depth without a visible gradient.
          "inset-shadow-[0_1px_0_oklch(1_0_0/0.16)]",
        ],
        secondary: [
          "border-border bg-card text-foreground shadow-subtle",
          "hover:border-line-strong hover:bg-sunk active:bg-sunk",
        ],
        ghost:
          "text-muted-foreground hover:bg-sunk hover:text-foreground active:bg-sunk active:text-foreground",
        link: "text-brand-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3.5 text-sm",
        md: "h-11 rounded-lg px-5 text-body-sm",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
