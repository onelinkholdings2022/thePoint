import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CraftedSection from "@/components/sections/CraftedSection";
import MenuSection from "@/components/sections/MenuSection";
import SportsSection from "@/components/sections/SportsSection";
import TreehouseSection from "@/components/sections/TreehouseSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* Section 1 — Hero */}
      <HeroSection />

      {/* Section 2 — Crafted with passion */}
      <CraftedSection />

      {/* Section 3 — Menu carousel */}
      <MenuSection />

      {/* Section 4 — Live Sports & Entertainment */}
      <SportsSection />

      {/* Section 5 — Host Your Event (Treehouse) */}
      <TreehouseSection />

      {/* Section 6 — Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
