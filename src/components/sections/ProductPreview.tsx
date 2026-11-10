import { Container } from "@/components/layout/Container";
import { ProductMockup } from "@/components/product/ProductMockup";

export function ProductPreview() {
  return (
    <section
      id="produit"
      aria-label="Aperçu du produit"
      className="pb-20 sm:pb-24 lg:pb-32"
    >
      <Container width="wide">
        {/* Above the fold: CSS, so it shows before hydration (see Hero). */}
        <div className="animate-settle [--i:3]">
          <ProductMockup />
        </div>
      </Container>
    </section>
  );
}
