"use client";

import {
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type ChangeEvent,
} from "react";
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

export type AuthMode = "signin" | "signup";
type FieldName = "name" | "email" | "password";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "valid" | "sso";

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
} satisfies Record<AuthMode, Record<string, string>>;

const statusMessages: Record<Status, string> = {
  idle: "",
  valid:
    "Formulaire valide. Aucune donnée n'a été envoyée : Nexa est une démonstration.",
  sso: "Le SSO n'est pas disponible : Nexa est une démonstration et ne se connecte à aucun fournisseur d'identité.",
};

function validate(mode: AuthMode, form: HTMLFormElement): Errors {
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

function isFieldName(value: string): value is FieldName {
  return value === "name" || value === "email" || value === "password";
}

/** Keeps only the errors of the fields the visitor has already dealt with. */
function pick(errors: Errors, fields: ReadonlySet<FieldName>): Errors {
  return Object.fromEntries(
    Object.entries(errors).filter(([key]) => fields.has(key as FieldName)),
  );
}

export function AuthDialog({
  open,
  onOpenChange,
  mode,
  onModeChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Fields left with something typed in, or every field once the form has
  // been submitted: only those are validated as the visitor goes, so tabbing
  // through an empty form never paints it red.
  const touched = useRef(new Set<FieldName>());
  const formRef = useRef<HTMLFormElement>(null);

  function resetForm() {
    touched.current = new Set();
    setErrors({});
    setStatus("idle");
  }

  // Start each visit from a clean form rather than the previous attempt.
  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  }

  function switchMode() {
    onModeChange(mode === "signin" ? "signup" : "signin");
    resetForm();
    formRef.current?.reset();
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    const input: EventTarget = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const { name, value } = input;
    if (!isFieldName(name) || value.length === 0) return;
    touched.current.add(name);
    setErrors(pick(validate(mode, event.currentTarget), touched.current));
  }

  // An error clears as soon as the value becomes valid, not on the next blur.
  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    const input: EventTarget = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const { name } = input;
    if (!isFieldName(name) || !touched.current.has(name)) return;
    setErrors(pick(validate(mode, event.currentTarget), touched.current));
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(mode, form);

    const fields: FieldName[] =
      mode === "signup" ? ["name", "email", "password"] : ["email", "password"];
    touched.current = new Set(fields);
    setErrors(found);
    setStatus(Object.keys(found).length === 0 ? "valid" : "idle");

    // Send focus to the first field that needs attention.
    const firstInvalid = fields.find((field) => found[field]);
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
          onBlur={handleBlur}
          onChange={handleChange}
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
        </form>

        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-small text-subtle">ou</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* The live region stays rendered — a region that appears with its
            message is not reliably announced — and only takes room once it
            has something to say. */}
        <div className="flex flex-col">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => setStatus("sso")}
          >
            <Building2 aria-hidden="true" />
            Continuer avec le SSO de votre entreprise
          </Button>
          <p
            aria-live="polite"
            className="text-sm text-pretty text-muted-foreground not-empty:mt-4"
          >
            {statusMessages[status]}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t pt-5 text-center">
          <p className="text-sm text-muted-foreground">
            {text.switchPrompt}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="rounded-sm font-medium text-brand-text underline-offset-4 hover:underline active:opacity-70"
            >
              {text.switchAction}
            </button>
          </p>
          <p className="text-small text-pretty text-subtle">
            Démonstration : le formulaire vérifie sa saisie mais ne crée aucun
            compte et n&apos;envoie aucune donnée.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
