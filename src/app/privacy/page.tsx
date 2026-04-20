import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PrivacySection from "@/components/sections/PrivacySection";

export const metadata = { title: "Privacy Policy | The Point" };

export default function PrivacyPage() {
  return (
    <main className="relative overflow-x-hidden bg-main">
      <Navbar />
      <PrivacySection />
      <Footer />
    </main>
  );
}
