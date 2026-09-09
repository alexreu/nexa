"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Both icons and both labels are rendered and swapped with CSS, so the toggle
 * is correct on the server, never mismatches on hydration, and never shifts
 * the header layout while next-themes resolves the active theme.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden dark:block" aria-hidden="true" />
      <Moon className="block dark:hidden" aria-hidden="true" />
      <span className="sr-only hidden dark:block">Activer le thème clair</span>
      <span className="sr-only block dark:hidden">Activer le thème sombre</span>
    </Button>
  );
}
