import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AppStoreButtons } from "@/components/AppStoreButtons";
import { Section } from "@/components/Section";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-display min-h-screen bg-base">
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <AppStoreButtons />
        <Section />
        <HowItWorks />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
