"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthDialog, type AuthMode } from "@/components/auth/AuthDialog";

type AuthContextValue = {
  openAuth: (mode: AuthMode) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * One sign-in / sign-up dialog for the whole page, so every account call to
 * action — header, hero, pricing, closing section, mobile menu — opens the
 * same form instead of bouncing the visitor between sections.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  const openAuth = useCallback((nextMode: AuthMode) => {
    setMode(nextMode);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openAuth }), [openAuth]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        onModeChange={setMode}
      />
    </AuthContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthDialog must be used inside <AuthProvider>.");
  }
  return context;
}
