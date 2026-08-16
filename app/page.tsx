import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { AutomationFinder } from "@/components/sections/AutomationFinder";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { UseCases } from "@/components/sections/UseCases";
import { AIFrontDesk } from "@/components/sections/AIFrontDesk";
import { Process } from "@/components/sections/Process";
import { WhyWaver } from "@/components/sections/WhyWaver";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { TechSection } from "@/components/sections/TechSection";
import { ExampleProjects } from "@/components/sections/ExampleProjects";
import { LocalSection } from "@/components/sections/LocalSection";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";
import { faqLd } from "@/lib/jsonld";
import { faqs } from "@/lib/faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <AutomationFinder />
        <BeforeAfter />
        <UseCases />
        <AIFrontDesk />
        <Process />
        <WhyWaver />
        <HowWeWork />
        <TechSection />
        <ExampleProjects />
        <LocalSection />
        <Faq />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(faqs)) }}
      />
    </>
  );
}
