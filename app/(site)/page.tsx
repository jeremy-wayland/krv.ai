import { Metadata } from "next";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import WhatWeBring from "@/components/WhatWeBring";

export const metadata: Metadata = {
  title: "Welcome to Krv",
  description: "Wesite for Krv Analytics, LLC.",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeBring />
      <HowItWorks />
      <FAQ />
      <Contact />
    </main>
  );
}
