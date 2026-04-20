import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import OurStorySection from "@/components/sections/about/OurStorySection";
import PhilosophySection from "@/components/sections/about/PhilosophySection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import BeyondSection from "@/components/sections/about/BeyondSection";
import UpscaleSection from "@/components/sections/about/UpscaleSection";
import ElevatedSection from "@/components/sections/about/ElevatedSection";
import EventsSection from "@/components/sections/about/EventsSection";

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden bg-main">
      <Navbar />

      {/* 1 — Hero: MEET THE POINT */}
      <AboutHero />

      {/* 2 — Our Story: centered text + 2 images + CTA */}
      <OurStorySection />

      {/* 3 — Philosophy: Strictly 21+. Intentionally Crafted. */}
      <PhilosophySection />

      {/* 4 — Values: Provide / Serve / Let icons */}
      <ValuesSection />

      {/* 5 — Beyond the Standard Bar */}
      <BeyondSection />

      {/* 6 — Upscale, Not Pretentious */}
      <UpscaleSection />

      {/* 7 — Elevated Comfort Menu */}
      <ElevatedSection />

      {/* 8 — Events-Led Atmosphere */}
      <EventsSection />

      {/* Spacer before footer */}
      <div className="w-full bg-main" style={{ height: "clamp(40px, 6vw, 96px)" }} aria-hidden="true" />

      <Footer />
    </main>
  );
}
