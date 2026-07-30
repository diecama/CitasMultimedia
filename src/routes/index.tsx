import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Catalog } from "@/components/site/Catalog";
import { HowItWorks } from "@/components/site/HowItWorks";
import { HoursAndRates } from "@/components/site/HoursAndRates";
import { BookingForm } from "@/components/site/BookingForm";
import { LocationSection } from "@/components/site/LocationSection";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { useGsapScrollReveal } from "@/hooks/use-gsap-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const rootRef = useGsapScrollReveal<HTMLDivElement>();
  return (
    <div ref={rootRef} className="bg-background text-foreground min-h-screen">
      <Nav />
      <Hero />
      <Catalog />
      <HowItWorks />
      <HoursAndRates />
      <BookingForm />
      <LocationSection />
      <Faq />
      <Footer />
    </div>
  );
}
