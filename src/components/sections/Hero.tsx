import { Sparkles } from "lucide-react";

import { AuthTrigger } from "@/components/auth/AuthTrigger";
import { Container } from "@/components/layout/Container";
import { DemoDialog } from "@/components/product/DemoDialog";
import { buttonVariants } from "@/components/ui/button";
import { accountLinks } from "@/data/nav";
import { cn } from "@/lib/utils";

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute top-[-18rem] left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]" />
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(58%_46%_at_50%_0%,black,transparent)]" />
    </div>
  );
}

/**
 * The hero enters with a CSS animation rather than Motion: it starts on the
 * first paint instead of waiting for hydration, so the headline — the
 * page's largest contentful paint — never sits invisible while JavaScript
 * loads, and it still shows when JavaScript never runs. `--i` staggers it.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate pt-14 pb-12 sm:pt-20 lg:pt-24"
    >
      <HeroBackdrop />
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-border bg-card py-1.5 pr-4 pl-1.5 text-small shadow-subtle [--i:0]">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-caption font-semibold text-brand-text">
              <Sparkles className="size-3" aria-hidden="true" />
              IA
            </span>
            <span className="text-muted-foreground">
              Automatisez jusqu&apos;à 40&nbsp;% de vos tâches
            </span>
          </span>

          <h1
            id="hero-title"
            className="max-w-4xl animate-rise text-display text-balance [--i:1]"
          >
            Automatisez votre travail.{" "}
            <span className="text-muted-foreground">
              {/* Kept whole: a display line must never break on the hyphen. */}
              <span className="whitespace-nowrap">Concentrez-vous</span> sur
              l&apos;essentiel.
            </span>
          </h1>

          <p className="max-w-2xl animate-rise text-lead text-pretty text-muted-foreground [--i:2]">
            Nexa connecte vos applications et construit des workflows
            intelligents capables d&apos;exécuter vos tâches répétitives
            automatiquement.
          </p>

          <div className="mt-2 flex w-full animate-rise flex-col items-stretch gap-3 [--i:3] sm:w-auto sm:flex-row sm:items-center">
            <AuthTrigger
              mode={accountLinks.signUp.mode}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {accountLinks.signUp.label}
            </AuthTrigger>
            <DemoDialog />
          </div>

          <p className="animate-rise text-label text-subtle [--i:4]">
            Aucun moyen de paiement requis.
          </p>
        </div>
      </Container>
    </section>
  );
}
