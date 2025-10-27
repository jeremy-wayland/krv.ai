import { Metadata } from "next";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
// import HowItWorks from "@/components/HowItWorks";
// import Contact from "@/components/Contact";
import WhatWeBring from "@/components/WhatWeBring";
import FastDeploy from "@/components/FastDeploy";

export const metadata: Metadata = {
  title: "Krv.ai",
  description:
    "One protocol layer that tames enterprise data complexity. Deploy anywhere with no migrations.",
  metadataBase: new URL("https://krv.ai"),
  openGraph: {
    title: "Krv.ai",
    description:
      "One protocol layer that tames enterprise data complexity. Deploy anywhere with no migrations.",
    url: "https://krv.ai/",
    siteName: "Krv Analytics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krv Analytics — Enterprise AI Middleware",
    description:
      "One protocol layer that tames enterprise data complexity. Deploy anywhere with no migrations.",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeBring />
      <FastDeploy />
      {/* <HowItWorks /> */}
      <FAQ />
      {/* <Contact /> */}
    </main>
  );
}
