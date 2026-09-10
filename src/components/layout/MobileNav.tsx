"use client";

import { useRef, useState } from "react";
import { Menu } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { accountLinks, navLinks } from "@/data/nav";

/**
 * Radix Dialog handles the accessibility contract for free: `aria-expanded`
 * on the trigger, focus trapping, Escape to close and scroll locking.
 */
export function MobileNav({ onSignIn }: { onSignIn: () => void }) {
  const [open, setOpen] = useState(false);
  const pendingTarget = useRef<string | null>(null);
  const pendingSignIn = useRef(false);

  /**
   * Closing normally returns focus to the trigger, which scrolls the page
   * back to the top and undoes the jump the link just made. When a link was
   * used, focus goes to the destination section instead — which is also
   * where a keyboard user expects to land.
   */
  function handleCloseAutoFocus(event: Event) {
    // Opening the sign-in dialog straight away would fight the sheet over
    // focus, so it waits until the sheet has finished closing.
    if (pendingSignIn.current) {
      pendingSignIn.current = false;
      event.preventDefault();
      onSignIn();
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
    setOpen(false);
  }

  function handleSignIn() {
    pendingSignIn.current = true;
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu aria-hidden="true" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(20rem,86vw)] gap-0 p-0"
        aria-describedby={undefined}
        onCloseAutoFocus={handleCloseAutoFocus}
      >
        <SheetTitle className="sr-only">Menu principal</SheetTitle>
        <div className="flex h-16 items-center border-b px-5">
          <Logo />
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNavigate(link.href)}
                className="rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:bg-sunk hover:text-foreground"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t p-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSignIn}
            className="w-full"
          >
            {accountLinks.signIn.label}
          </Button>
          <SheetClose asChild>
            <a
              href={accountLinks.signUp.href}
              onClick={() => handleNavigate(accountLinks.signUp.href)}
              className={buttonVariants({ variant: "primary" })}
            >
              {accountLinks.signUp.label}
            </a>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
