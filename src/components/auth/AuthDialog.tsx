"use client";

import { useRef, useState, type FormEvent } from "react";
import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/Field";

type Mode = "signin" | "signup";
type Errors = Partial<Record<"name" | "email" | "password", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const copy = {
  signin: {
    title: "Connexion à Nexa",
    description: "Retrouvez vos workflows et leur historique.",
    submit: "Se connecter",
    switchPrompt: "Pas encore de compte ?",
    switchAction: "Créer un compte",
  },
  signup: {
    title: "Créer un compte Nexa",
    description: "Commencez gratuitement, sans moyen de paiement.",
    submit: "Créer mon compte",
    switchPrompt: "Déjà un compte ?",
    switchAction: "Se connecter",
  },
} satisfies Record<Mode, Record<string, string>>;

function validate(mode: Mode, form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");

  const errors: Errors = {};
  if (mode === "signup" && name.length < 2) {
    errors.name = "Indiquez votre nom.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Saisissez une adresse e-mail valide.";
  }
  if (mode === "signup" && password.length < 8) {
    errors.password = "8 caractères minimum.";
  } else if (mode === "signin" && password.length === 0) {
    errors.password = "Saisissez votre mot de passe.";
  }
  return errors;
}

export function AuthDialog({
  open,
  onOpenChange,
  initialMode = "signin",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: Mode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Start each visit from a clean form rather than the previous attempt.
  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setMode(initialMode);
      setErrors({});
      setSubmitted(false);
    }
    onOpenChange(nextOpen);
  }

  function switchMode() {
    setMode((current) => (current === "signin" ? "signup" : "signin"));
    setErrors({});
    setSubmitted(false);
    formRef.current?.reset();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(mode, form);
    setErrors(found);
    setSubmitted(Object.keys(found).length === 0);

    // Send focus to the first field that needs attention.
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
    }
  }

  const text = copy[mode];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-6 p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-h3">{text.title}</DialogTitle>
          <DialogDescription>{text.description}</DialogDescription>
        </DialogHeader>

        {/* No request is ever sent, and autocomplete is off so no password
            manager offers to store a credential for a product that does not
            exist. */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          {mode === "signup" ? (
            <Field
              label="Nom complet"
              name="name"
              type="text"
              placeholder="Camille Rousseau"
              autoComplete="off"
              error={errors.name}
            />
          ) : null}

          <Field
            label="Adresse e-mail"
            name="email"
            type="email"
            inputMode="email"
            spellCheck={false}
            placeholder="camille@entreprise.fr"
            autoComplete="off"
            error={errors.email}
          />

          <Field
            label="Mot de passe"
            name="password"
            type="password"
            // The minimum only belongs on the form that sets the password.
            placeholder={mode === "signup" ? "8 caractères minimum" : undefined}
            autoComplete="off"
            error={errors.password}
          />

          <Button type="submit" className="mt-1 w-full">
            {text.submit}
          </Button>

          <p aria-live="polite" className="text-sm text-muted-foreground">
            {submitted
              ? "Formulaire valide. Aucune donnée n'a été envoyée : Nexa est une démonstration."
              : ""}
          </p>
        </form>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[0.8125rem] text-subtle">ou</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => setSubmitted(true)}
        >
          <Building2 aria-hidden="true" />
          Continuer avec le SSO de votre entreprise
        </Button>

        <div className="flex flex-col gap-3 border-t pt-5 text-center">
          <p className="text-sm text-muted-foreground">
            {text.switchPrompt}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="font-medium text-brand-text underline-offset-4 hover:underline"
            >
              {text.switchAction}
            </button>
          </p>
          <p className="text-[0.8125rem] text-pretty text-subtle">
            Démonstration : le formulaire vérifie sa saisie mais ne crée aucun
            compte et n&apos;envoie aucune donnée.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
