"use client";

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
export function MobileNav() {
  return (
    <Sheet>
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
                className="rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:bg-sunk hover:text-foreground"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t p-4">
          <SheetClose asChild>
            <a
              href={accountLinks.signIn.href}
              className={buttonVariants({ variant: "secondary" })}
            >
              {accountLinks.signIn.label}
            </a>
          </SheetClose>
          <SheetClose asChild>
            <a
              href={accountLinks.signUp.href}
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
