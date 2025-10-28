// app/(site)/academia/coal/page.tsx
import { Metadata } from "next";
import CoalPost from "@/components/Academia/CoalPost";

export const metadata: Metadata = {
  title: "Accelerating US Coal Phaseout | Nature Energy Research | Krv",
  description:
    "Data-driven framework for retiring coal plants faster. Published in Nature Energy, this research identifies retirement vulnerabilities across 198 US coal facilities to accelerate decarbonization.",

  openGraph: {
    title: "Accelerating US Coal Phaseout: A Data-Driven Framework",
    description:
      "New Nature Energy study offers targeted strategies for retiring America's remaining coal plants based on contextual vulnerabilities across 198 facilities.",
    type: "article",
    url: "https://krv.ai/academia/coal",
    siteName: "Krv Analytics",
    locale: "en_US",
    images: [
      {
        url: "/images/UIs/OG-coalPreview.png",
        width: 1200,
        height: 630,
        alt: "Accelerating US Coal Phaseout",
      },
    ],
    // Article-specific metadata
    publishedTime: "2025-09-23T00:00:00.000Z",
    authors: ["Sidney Gathrid", "Grace C. Wu", "Krv Analytics"],
    section: "Academia",
    tags: [
      "Coal Retirement",
      "Energy Transition",
      "Decarbonization",
      "Climate Policy",
      "Renewable Energy",
    ],
  },
  keywords: [
    "coal retirement",
    "energy transition",
    "graph learning",
    "topological data analysis",
    "Nature Energy",
    "computational sustainability",
  ],

  // Canonical URL
  alternates: {
    canonical: "https://krv.ai/academia/coal",
  },

  twitter: {
    card: "summary_large_image",
    title: "Accelerating US Coal Phaseout: A Data-Driven Framework",
    description:
      "Nature Energy study: contextual vulnerabilities across 198 coal plants reveal targeted retirement strategies.",
    images: ["/images/UIs/OG-coalPreview.png"],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Additional metadata
  category: "Research",
};

export default function CoalPage() {
  return <CoalPost />;
}
