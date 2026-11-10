import { AuthProvider } from "@/components/auth/AuthProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { Pricing } from "@/components/sections/Pricing";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { SocialProof } from "@/components/sections/SocialProof";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { Workflow } from "@/components/sections/Workflow";

export default function HomePage() {
  return (
    <AuthProvider>
      <Header />
      <main id="contenu">
        <Hero />
        <ProductPreview />
        <SocialProof />
        <Features />
        <Integrations />
        <Workflow />
        <Statistics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </AuthProvider>
  );
}
