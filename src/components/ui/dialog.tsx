"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

/**
 * Where the last press happened, so a dialog can grow out of the control
 * that opened it rather than out of the middle of the screen. Recorded in
 * the capture phase, before any click handler opens anything.
 */
let lastPress: { x: number; y: number; time: number } | null = null;

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointerdown",
    (event) => {
      lastPress = { x: event.clientX, y: event.clientY, time: event.timeStamp };
    },
    { capture: true, passive: true },
  );
}

/**
 * The transform origin, in the dialog's own box, that points at whatever
 * opened it: the recent press, or the focused control for a keyboard open.
 * Measured from the box's centre, which the entrance zoom does not move.
 */
function originToward(node: HTMLElement): string | null {
  let point: { x: number; y: number } | null = null;

  if (lastPress && performance.now() - lastPress.time < 1000) {
    point = lastPress;
  } else if (
    document.activeElement instanceof HTMLElement &&
    document.activeElement !== document.body
  ) {
    const rect = document.activeElement.getBoundingClientRect();
    point = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  if (!point) return null;

  const rect = node.getBoundingClientRect();
  const left = (rect.left + rect.right) / 2 - node.offsetWidth / 2;
  const top = (rect.top + rect.bottom) / 2 - node.offsetHeight / 2;
  return `${Math.round(point.x - left)}px ${Math.round(point.y - top)}px`;
}

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 material-scrim duration-200 ease-out-soft data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:duration-150 data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  // Stable, so it runs once per opening: the origin is fixed at the moment
  // the dialog appears and the exit shrinks back along the same path.
  const anchorToOpener = React.useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const origin = originToward(node);
    if (origin) node.style.transformOrigin = origin;
  }, []);

  return (
    <DialogPrimitive.Portal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border bg-popover p-4 text-sm text-popover-foreground shadow-overlay duration-200 ease-out-soft outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:duration-150 data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
        ref={anchorToOpener}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-3 right-3"
              size="icon"
            >
              <XIcon />
              <span className="sr-only">Fermer</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
