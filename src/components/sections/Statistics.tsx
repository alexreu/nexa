import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/stats";

export function Statistics() {
  return (
    <Section
      aria-label="Nexa en chiffres"
      tone="sunk"
      className="py-16 sm:py-20"
    >
      <Container>
        <Stagger
          step={0.06}
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <p className="text-h2 tabular-nums">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-sm text-balance text-muted-foreground">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
