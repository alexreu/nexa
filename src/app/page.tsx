import { Header } from "@/components/layout/Header";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { SocialProof } from "@/components/sections/SocialProof";
import { Workflow } from "@/components/sections/Workflow";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <ProductPreview />
        <SocialProof />
        <Features />
        <Integrations />
        <Workflow />
      </main>
    </>
  );
}
