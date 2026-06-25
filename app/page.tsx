import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AppStoreButtons } from "@/components/AppStoreButtons";
import { HowToKaastVideo } from "@/components/HowToKaastVideo";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-base">
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <AppStoreButtons />
        <HowToKaastVideo />
        <HowItWorks />
        <FAQ />
        <PricingSection />
        <Footer />
      </main>
    </div>
  );
}
