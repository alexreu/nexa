import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { integrations, integrationsCount } from "@/data/integrations";

export function Integrations() {
  return (
    <Section id="integrations" labelledBy="integrations-title" tone="sunk">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="integrations-title"
          eyebrow="Intégrations"
          title="Vos outils, déjà connectés"
          description="Branchez vos applications existantes et laissez Nexa faire circuler l'information entre elles."
        />

        <Stagger step={0.06} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {integrations.map((integration) => (
            <StaggerItem key={integration.name} className="h-full">
              <div className="group flex h-full flex-col items-center gap-2 rounded-xl border bg-card px-3 py-5 text-center shadow-subtle transition-[box-shadow,border-color] duration-300 hover:border-line-strong hover:shadow-card">
                <span className="grid size-10 place-items-center rounded-xl border bg-sunk text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-brand-text">
                  <integration.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-1 text-sm font-medium">
                  {integration.name}
                </span>
                <span className="text-small text-subtle">
                  {integration.category}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="text-center text-sm text-muted-foreground">
          {integrationsCount}
        </p>
      </Container>
    </Section>
  );
}
