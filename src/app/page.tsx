import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <Section labelledBy="foundation-title">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="foundation-title"
            eyebrow="Phase 1"
            title={siteConfig.tagline}
            description={siteConfig.description}
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Commencer gratuitement</Button>
            <Button size="lg" variant="secondary">
              Voir la démonstration
            </Button>
            <Button variant="ghost">Connexion</Button>
            <ThemeToggle />
          </div>
        </Container>
      </Section>
    </main>
  );
}
