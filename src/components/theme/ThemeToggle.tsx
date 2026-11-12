"use client";

import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Both icons and both labels are rendered and swapped with CSS, so the toggle
 * is correct on the server, never mismatches on hydration, and never shifts
 * the header layout while next-themes resolves the active theme.
 *
 * The switch itself cross-fades through a view transition instead of
 * flipping the whole page's brightness in one frame. The class is applied
 * synchronously inside the transition so the "after" snapshot is the new
 * theme; next-themes still owns persistence.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const apply = () => {
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    // A hidden document never renders the frame a view transition waits
    // for, so the switch would be held back until the tab is shown again.
    if (
      typeof document.startViewTransition === "function" &&
      document.visibilityState === "visible"
    ) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <Button type="button" variant="ghost" size="icon" onClick={toggle}>
      <Sun className="hidden dark:block" aria-hidden="true" />
      <Moon className="block dark:hidden" aria-hidden="true" />
      <span className="sr-only hidden dark:block">Activer le thème clair</span>
      <span className="sr-only block dark:hidden">Activer le thème sombre</span>
    </Button>
  );
}
