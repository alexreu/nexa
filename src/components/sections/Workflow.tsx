import { Check, Inbox, Plus, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { processPrompt, processSteps } from "@/data/process";

const illustration =
  "bg-card shadow-card flex h-40 flex-col rounded-2xl border p-4";

/** Step 1 — the instruction the user types. */
function PromptIllustration() {
  return (
    <div className={`${illustration} justify-between`}>
      <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
        {processPrompt}
        <span className="ml-0.5 inline-block h-4 w-px bg-primary align-text-bottom" />
      </p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] text-subtle">Nexa AI</span>
        <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[0.6875rem] font-medium text-primary-foreground">
          <Sparkles className="size-3" aria-hidden="true" />
          Générer
        </span>
      </div>
    </div>
  );
}

/** Step 2 — the workflow being assembled, one block still forming. */
function BuildIllustration() {
  return (
    <div className={`${illustration} justify-center gap-2.5`}>
      {[
        { icon: Inbox, width: "w-3/4" },
        { icon: Sparkles, width: "w-2/3" },
      ].map(({ icon: Icon, width }, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 rounded-lg border bg-sunk px-2.5 py-2"
        >
          <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <span className={`h-1.5 rounded-full bg-line-strong ${width}`} />
        </div>
      ))}
      <div className="flex items-center gap-2.5 rounded-lg border border-dashed px-2.5 py-2 text-subtle">
        <Plus className="size-3.5" aria-hidden="true" />
        <span className="text-[0.6875rem]">Action suivante…</span>
      </div>
    </div>
  );
}

/** Step 3 — the run log the workflow leaves behind. */
function RunIllustration() {
  const entries = [
    { label: "Demande analysée", time: "09:42" },
    { label: "Tâche créée", time: "09:42" },
    { label: "Équipe notifiée", time: "09:42" },
  ];

  return (
    <div className={`${illustration} justify-center gap-2`}>
      {entries.map((entry) => (
        <div
          key={entry.label}
          className="flex items-center justify-between gap-3"
        >
          <span className="flex items-center gap-2 text-[0.8125rem]">
            <span className="grid size-5 place-items-center rounded-full bg-success/12 text-success">
              <Check className="size-3" aria-hidden="true" />
            </span>
            {entry.label}
          </span>
          <span className="font-mono text-[0.6875rem] text-subtle">
            {entry.time}
          </span>
        </div>
      ))}
    </div>
  );
}

const illustrations = [PromptIllustration, BuildIllustration, RunIllustration];

export function Workflow() {
  return (
    <Section id="methode" labelledBy="methode-title">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="methode-title"
          eyebrow="Comment ça marche"
          title="Trois étapes, et c'est automatisé"
          description="De l'intention à l'exécution, sans configuration technique."
        />

        <Stagger
          step={0.12}
          className="relative grid gap-10 lg:grid-cols-3 lg:gap-8"
        >
          <span
            aria-hidden="true"
            className="absolute top-5 right-5 left-5 hidden border-t border-dashed lg:block"
          />
          {processSteps.map((step, index) => {
            const Illustration = illustrations[index] ?? PromptIllustration;

            return (
              <StaggerItem
                key={step.title}
                className="relative flex flex-col gap-5"
              >
                <span className="grid size-10 place-items-center rounded-full border bg-background font-mono text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                {/* Number, then visual, then copy: the fixed-height blocks
                    stay aligned across columns whatever the title length. */}
                <Illustration />
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3">{step.title}</h3>
                  <p className="text-pretty text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
