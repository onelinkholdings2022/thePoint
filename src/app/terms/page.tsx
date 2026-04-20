import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import TermsSection from "@/components/sections/TermsSection";

export const metadata = { title: "Privacy Policy | The Point" };

export default function PrivacyPage() {
  return (
    <main className="relative overflow-x-hidden bg-main">
      <Navbar />
      <TermsSection/>
      <Footer />
    </main>
  );
}
