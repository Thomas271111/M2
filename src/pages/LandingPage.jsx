import { useRef } from "react";
import { MarketingHeader } from "../components/layout/MarketingHeader.jsx";
import { MarketingFooter } from "../components/layout/MarketingFooter.jsx";
import { Hero } from "../components/landing/Hero.jsx";
import { ProblemSection } from "../components/landing/ProblemSection.jsx";
import { SolutionSection } from "../components/landing/SolutionSection.jsx";
import { HowItWorksSection } from "../components/landing/HowItWorksSection.jsx";
import { ForWhoSection } from "../components/landing/ForWhoSection.jsx";
import { FaqSection } from "../components/landing/FaqSection.jsx";
import { FinalCtaSection } from "../components/landing/FinalCtaSection.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export function LandingPage() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-control"
      >
        Saltar al contenido principal
      </a>
      <MarketingHeader />
      <main id="contenido" ref={mainRef}>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <ForWhoSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
    </>
  );
}
