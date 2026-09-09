import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProductMockup } from "@/components/product/ProductMockup";
import { scaleIn } from "@/components/motion/variants";

export function ProductPreview() {
  return (
    <section
      id="produit"
      aria-label="Aperçu du produit"
      className="scroll-mt-24 pb-20 sm:pb-24 lg:pb-32"
    >
      <Container width="wide">
        <Reveal immediate delay={0.35} variants={scaleIn}>
          <ProductMockup />
        </Reveal>
      </Container>
    </section>
  );
}
