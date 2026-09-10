"use client";

import { useEffect, useRef, useState } from "react";

import { AuthDialog } from "@/components/auth/AuthDialog";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { accountLinks, navLinks } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  /**
   * The header sits one pixel above the viewport when stuck, so a single
   * IntersectionObserver detects the state without a scroll listener.
   */
  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(entry !== undefined && entry.intersectionRatio < 1),
      { threshold: [1] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      data-stuck={stuck}
      className="sticky top-[-1px] z-40 w-full border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-[stuck=true]:border-border data-[stuck=true]:bg-background/80 data-[stuck=true]:backdrop-blur-xl"
    >
      <Container className="flex h-16 items-center gap-6 pt-px">
        <a
          href="#top"
          className="rounded-md"
          aria-label="Nexa — retour en haut de page"
        >
          <Logo />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sunk hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setAuthOpen(true)}
            className="hidden lg:inline-flex"
          >
            {accountLinks.signIn.label}
          </Button>
          <a
            href={accountLinks.signUp.href}
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden lg:inline-flex",
            )}
          >
            {accountLinks.signUp.label}
          </a>
          <div className="lg:hidden">
            <MobileNav onSignIn={() => setAuthOpen(true)} />
          </div>
        </div>
      </Container>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}
