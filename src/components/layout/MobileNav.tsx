"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { Menu, XIcon } from "lucide-react";
import {
  animate,
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";

import type { AuthMode } from "@/components/auth/AuthDialog";
import { Logo } from "@/components/layout/Logo";
import { easeOutSoft } from "@/components/motion/variants";
import { Button } from "@/components/ui/button";
import { accountLinks, navLinks } from "@/data/nav";

/** Critically damped: the sheet settles without overshooting its edge. */
const SPRING = { type: "spring", bounce: 0, duration: 0.4 } as const;
/** Movement needed before a press becomes a drag, in pixels. */
const DRAG_THRESHOLD = 10;
/** How far back in time the release velocity is measured, in ms. */
const VELOCITY_WINDOW = 100;

/** Progressive resistance past the open position, instead of a hard stop. */
function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

/** Where a flick at this velocity (px/s) would come to rest. */
function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

type Drag = {
  pointerId: number;
  startX: number;
  startY: number;
  origin: number;
  active: boolean;
  samples: { x: number; t: number }[];
};

/**
 * Radix Dialog still owns the accessibility contract — `aria-expanded` on
 * the trigger, focus trapping, Escape and scroll locking — but the sheet's
 * motion is driven by a spring on a single motion value:
 *
 * - it can be grabbed at any moment, even mid-animation, and follows the
 *   finger 1:1 from where it actually is on screen;
 * - releasing hands the finger's velocity to the spring, and the momentum
 *   is projected to decide whether a flick closes it;
 * - dragging past the open position meets rubber-band resistance;
 * - the scrim fades with the sheet's position, so feedback is continuous.
 *
 * Every way of closing — Escape, the scrim, the close button, a link — runs
 * the same animation before Radix unmounts the content.
 */
export function MobileNav({
  onAccount,
}: {
  onAccount: (mode: AuthMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  // Under reduced motion the sheet cross-fades in place instead of sliding.
  const fade = useMotionValue(1);
  const width = useRef(320);
  const scrimOpacity = useTransform(() => {
    const progress = 1 - Math.min(Math.max(x.get() / width.current, 0), 1);
    return Math.min(progress, fade.get());
  });

  const animation = useRef<AnimationPlaybackControls | null>(null);
  const closing = useRef(false);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const pendingTarget = useRef<string | null>(null);
  const pendingAccount = useRef<AuthMode | null>(null);

  function stop() {
    animation.current?.stop();
    animation.current = null;
  }

  /**
   * Without a gesture, a re-target inherits the sheet's current velocity, so
   * reversing it mid-flight bends the motion instead of hitting a wall. Read
   * before stopping the running animation.
   */
  function currentVelocity() {
    return x.getVelocity();
  }

  function settleOpen(velocity = currentVelocity()) {
    stop();
    closing.current = false;
    if (reduceMotion) {
      animation.current = animate(fade, 1, {
        duration: 0.2,
        ease: easeOutSoft,
      });
    } else {
      animation.current = animate(x, 0, { ...SPRING, velocity });
    }
  }

  function settleClosed(velocity = currentVelocity()) {
    stop();
    closing.current = true;
    const finish = () => {
      closing.current = false;
      setOpen(false);
    };
    if (reduceMotion) {
      animation.current = animate(fade, 0, {
        duration: 0.15,
        ease: easeOutSoft,
        onComplete: finish,
      });
    } else {
      animation.current = animate(x, width.current, {
        ...SPRING,
        velocity,
        onComplete: finish,
      });
    }
  }

  // Runs once per opening, before the first paint: the sheet starts off
  // screen at its measured width and springs in.
  const enter = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      width.current = node.offsetWidth;
      closing.current = false;
      animation.current?.stop();
      if (reduceMotion) {
        x.jump(0);
        fade.jump(0);
        animation.current = animate(fade, 1, {
          duration: 0.2,
          ease: easeOutSoft,
        });
      } else {
        fade.jump(1);
        x.jump(width.current);
        animation.current = animate(x, 0, SPRING);
      }
    },
    [reduceMotion, x, fade],
  );

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) setOpen(true);
    else settleClosed();
  }

  /** A press that never became a drag: carry on where it was heading. */
  function resume() {
    if (closing.current) settleClosed();
    else settleOpen();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }
    suppressClick.current = false;
    // Grabbing freezes the sheet exactly where it is on screen.
    stop();
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: x.get(),
      active: false,
      samples: [{ x: event.clientX, t: event.timeStamp }],
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;

    if (!current.active) {
      const dx = event.clientX - current.startX;
      const dy = event.clientY - current.startY;
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) {
        return;
      }
      // A vertical gesture belongs to scrolling, not to the sheet.
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null;
        resume();
        return;
      }
      // Track from here so crossing the threshold causes no jump.
      current.active = true;
      current.startX = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const raw = current.origin + (event.clientX - current.startX);
    x.set(raw < 0 ? -rubberband(-raw, width.current) : raw);

    current.samples.push({ x: event.clientX, t: event.timeStamp });
    while (
      current.samples.length > 2 &&
      event.timeStamp - (current.samples[0]?.t ?? 0) > VELOCITY_WINDOW
    ) {
      current.samples.shift();
    }
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    drag.current = null;

    if (!current.active) {
      resume();
      return;
    }

    suppressClick.current = true;
    const first = current.samples[0];
    const last = current.samples[current.samples.length - 1];
    const elapsed = first && last ? (last.t - first.t) / 1000 : 0;
    // A finger that came to rest before lifting carries no momentum.
    const rested = !last || event.timeStamp - last.t > VELOCITY_WINDOW;
    const velocity =
      !rested && first && last && elapsed > 0
        ? (last.x - first.x) / elapsed
        : 0;

    // Decide from where the gesture is going, not from where it stopped.
    if (x.get() + project(velocity) > width.current / 2) {
      settleClosed(velocity);
    } else {
      settleOpen(velocity);
    }
  }

  /**
   * Closing normally returns focus to the trigger, which scrolls the page
   * back to the top and undoes the jump the link just made. When a link was
   * used, focus goes to the destination section instead — which is also
   * where a keyboard user expects to land.
   */
  function handleCloseAutoFocus(event: Event) {
    // Opening the account dialog straight away would fight the sheet over
    // focus, so it waits until the sheet has finished closing.
    const account = pendingAccount.current;
    if (account) {
      pendingAccount.current = null;
      event.preventDefault();
      onAccount(account);
      return;
    }

    const targetId = pendingTarget.current;
    pendingTarget.current = null;
    if (!targetId) return;

    const section = document.getElementById(targetId);
    if (!section) return;

    event.preventDefault();
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  }

  function handleNavigate(href: string) {
    pendingTarget.current = href.startsWith("#") ? href.slice(1) : null;
    settleClosed();
  }

  function handleAccount(mode: AuthMode) {
    pendingAccount.current = mode;
    settleClosed();
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" data-slot="sheet-trigger">
          <Menu aria-hidden="true" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay asChild>
          <m.div
            className="fixed inset-0 z-50 material-scrim"
            style={{ opacity: scrimOpacity }}
          />
        </DialogPrimitive.Overlay>
        <DialogPrimitive.Content
          asChild
          aria-describedby={undefined}
          onCloseAutoFocus={handleCloseAutoFocus}
        >
          <m.div
            ref={enter}
            data-slot="sheet-content"
            style={{ x, opacity: fade }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onClickCapture={(event) => {
              // A drag that ends over a link must not also follow it.
              if (suppressClick.current) {
                suppressClick.current = false;
                event.preventDefault();
                event.stopPropagation();
              }
            }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-[min(20rem,86vw)] touch-pan-y flex-col border-l bg-popover text-sm text-popover-foreground shadow-overlay outline-none select-none"
          >
            <DialogPrimitive.Title className="sr-only">
              Menu principal
            </DialogPrimitive.Title>
            <div className="flex h-16 items-center border-b px-5">
              <Logo />
            </div>
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3"
              >
                <XIcon />
                <span className="sr-only">Fermer</span>
              </Button>
            </DialogPrimitive.Close>
            <nav className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className="rounded-lg px-3 py-2.5 text-body-sm font-medium text-muted-foreground transition-colors hover:bg-sunk hover:text-foreground active:bg-sunk active:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t p-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleAccount(accountLinks.signIn.mode)}
                className="w-full"
              >
                {accountLinks.signIn.label}
              </Button>
              <Button
                type="button"
                onClick={() => handleAccount(accountLinks.signUp.mode)}
                className="w-full"
              >
                {accountLinks.signUp.label}
              </Button>
            </div>
          </m.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
