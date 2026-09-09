import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section id="temoignages" labelledBy="temoignages-title">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          id="temoignages-title"
          eyebrow="Témoignages"
          title="Des équipes qui ont arrêté de faire à la main"
        />

        <Stagger
          step={0.06}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.firstName} className="h-full">
              <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border bg-card p-6 shadow-card transition-[box-shadow,border-color] duration-300 ease-out-soft hover:border-line-strong hover:shadow-lifted">
                <blockquote className="text-pretty">
                  « {testimonial.quote} »
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-brand-text"
                  >
                    {testimonial.firstName.charAt(0)}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-medium">
                      {testimonial.firstName}
                    </span>
                    <span className="text-[0.8125rem] text-subtle">
                      {testimonial.role}, {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
