"use client";

import { useEffect, useRef, useState } from "react";

import { useAuthDialog } from "@/components/auth/AuthProvider";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { accountLinks, navLinks } from "@/data/nav";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  const { openAuth } = useAuthDialog();

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
      // Once stuck the bar becomes a translucent material, and a soft
      // scroll-edge fade replaces a hard divider where content slides under
      // it. A solid border returns only when the visitor asks for contrast.
      className="sticky top-[-1px] z-40 w-full border-b border-transparent transition-[background-color,border-color] duration-300 ease-out-soft after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-linear-to-b after:from-background/70 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 data-[stuck=true]:material-bar data-[stuck=true]:after:opacity-100 contrast-more:after:hidden contrast-more:data-[stuck=true]:border-border"
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sunk hover:text-foreground active:bg-sunk active:text-foreground"
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
            onClick={() => openAuth(accountLinks.signIn.mode)}
            className="hidden lg:inline-flex"
          >
            {accountLinks.signIn.label}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => openAuth(accountLinks.signUp.mode)}
            className="hidden lg:inline-flex"
          >
            {accountLinks.signUp.label}
          </Button>
          <div className="lg:hidden">
            <MobileNav onAccount={openAuth} />
          </div>
        </div>
      </Container>
    </header>
  );
}
