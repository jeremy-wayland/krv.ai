import { Metadata } from "next";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Feature from "@/components/Features";

export const metadata: Metadata = {
  title: "Welcome to Krv",
  description: "Wesite for Krv Analytics, LLC.",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <HowItWorks />
      <FAQ />
      <Contact />
    </main>
  );
}
