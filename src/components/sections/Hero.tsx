import { Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { DemoDialog } from "@/components/product/DemoDialog";
import { buttonVariants } from "@/components/ui/button";
import { accountLinks } from "@/data/nav";

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

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate pt-14 pb-12 sm:pt-20 lg:pt-24"
    >
      <HeroBackdrop />
      <Container>
        <Stagger
          immediate
          step={0.09}
          className="flex flex-col items-center gap-6 text-center"
        >
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pr-4 pl-1.5 text-[0.8125rem] shadow-subtle">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-primary">
                <Sparkles className="size-3" aria-hidden="true" />
                IA
              </span>
              <span className="text-muted-foreground">
                Automatisez jusqu&apos;à 40&nbsp;% de vos tâches
              </span>
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 id="hero-title" className="max-w-4xl text-display text-balance">
              Automatisez votre travail.{" "}
              <span className="text-muted-foreground">
                Concentrez-vous sur l&apos;essentiel.
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-2xl text-lead text-pretty text-muted-foreground">
              Nexa connecte vos applications et construit des workflows
              intelligents capables d&apos;exécuter vos tâches répétitives
              automatiquement.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-2">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={accountLinks.signUp.href}
                className={buttonVariants({ size: "lg" })}
              >
                {accountLinks.signUp.label}
              </a>
              <DemoDialog />
            </div>
          </StaggerItem>

          <StaggerItem>
            <p className="text-label text-subtle">
              Aucun moyen de paiement requis.
            </p>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
