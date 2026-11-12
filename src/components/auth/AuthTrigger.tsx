"use client";

import type { ComponentProps } from "react";

import type { AuthMode } from "@/components/auth/AuthDialog";
import { useAuthDialog } from "@/components/auth/AuthProvider";

type AuthTriggerProps = Omit<ComponentProps<"button">, "onClick" | "type"> & {
  mode: AuthMode;
};

/**
 * A plain button that opens the shared account dialog. Lets Server
 * Components place an account call to action without becoming clients.
 */
export function AuthTrigger({ mode, ...props }: AuthTriggerProps) {
  const { openAuth } = useAuthDialog();

  return <button type="button" onClick={() => openAuth(mode)} {...props} />;
}
