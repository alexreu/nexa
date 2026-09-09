import { Check } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { buttonVariants } from "@/components/ui/button";
import { plans, pricingCtaHref } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="tarifs" labelledBy="tarifs-title" tone="sunk">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="tarifs-title"
          eyebrow="Tarifs"
          title="Un prix lisible, sans surprise"
          description="Commencez gratuitement, changez d'offre quand votre volume l'exige."
        />

        <Stagger step={0.08} className="grid items-start gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col gap-6 rounded-2xl border bg-card p-6 sm:p-7",
                  plan.featured
                    ? "border-primary/40 shadow-glow lg:-my-4 lg:py-11"
                    : "shadow-card",
                )}
              >
                <header className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-h3">{plan.name}</h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-primary uppercase">
                        Recommandé
                      </span>
                    ) : null}
                  </div>
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-[2.25rem] leading-none font-semibold tracking-[-0.03em]">
                      {plan.price}
                    </span>
                    {plan.period ? (
                      <span className="text-sm text-subtle">{plan.period}</span>
                    ) : null}
                  </p>
                  <p className="text-sm text-pretty text-muted-foreground">
                    {plan.description}
                  </p>
                </header>

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={pricingCtaHref}
                  className={cn(
                    buttonVariants({
                      variant: plan.featured ? "primary" : "secondary",
                    }),
                    "mt-auto w-full",
                  )}
                >
                  {plan.cta}
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
