import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ProductPreview } from "@/components/sections/ProductPreview";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <ProductPreview />
      </main>
    </>
  );
}
