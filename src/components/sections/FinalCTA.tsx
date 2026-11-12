import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuthTrigger } from "@/components/auth/AuthTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { accountLinks } from "@/data/nav";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  return (
    <Section id="commencer" labelledBy="commencer-title">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-primary/25 bg-card px-6 py-16 text-center shadow-glow sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute top-[-14rem] left-1/2 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px]"
            />
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
              <h2 id="commencer-title" className="text-h2 text-balance">
                Prêt à récupérer du temps ?
              </h2>
              <p className="text-lead text-pretty text-muted-foreground">
                Automatisez vos premières tâches en quelques minutes.
              </p>
              <AuthTrigger
                mode={accountLinks.signUp.mode}
                className={cn(buttonVariants({ size: "lg" }), "mt-2")}
              >
                {accountLinks.signUp.label}
              </AuthTrigger>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
