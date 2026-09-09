import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { features } from "@/data/features";

export function Features() {
  return (
    <Section id="fonctionnalites" labelledBy="fonctionnalites-title">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="fonctionnalites-title"
          eyebrow="Fonctionnalités"
          title="Tout ce qu'il faut pour automatiser sérieusement"
          description="Des workflows qui décident, s'observent et se partagent — sans écrire une ligne de code."
        />

        <Stagger
          step={0.06}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title} className="h-full">
              <article className="group flex h-full flex-col gap-3 rounded-2xl border bg-card p-6 shadow-card transition-[box-shadow,border-color,transform] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lifted">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-brand-text">
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-1 text-h3">{feature.title}</h3>
                <p className="text-pretty text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
