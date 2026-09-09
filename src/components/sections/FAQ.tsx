import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

export function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Les questions qu'on nous pose"
        />

        <Reveal className="mx-auto w-full max-w-3xl">
          <Accordion type="single" collapsible className="border-y">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-[1.0625rem]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl text-pretty">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
