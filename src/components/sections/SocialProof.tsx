import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { socialProofLogos } from "@/data/logos";

export function SocialProof() {
  return (
    <section
      aria-label="Ils utilisent Nexa"
      className="border-y py-12 sm:py-14"
    >
      <Container>
        <Reveal className="flex flex-col items-center gap-8">
          <p className="text-center text-label font-medium tracking-[0.08em] text-subtle uppercase">
            Utilisé quotidiennement par des équipes modernes
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {socialProofLogos.map((logo) => (
              <li key={logo.name}>
                <BrandLogo
                  name={logo.name}
                  shape={logo.shape}
                  className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
