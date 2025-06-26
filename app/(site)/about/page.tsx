// app/(site)/about/page.tsx
import { Metadata } from "next";
import AboutInfo from "@/components/About/";

export const metadata: Metadata = {
  title: "About | Krv",
  description:
    "Learn more about Krv, our mission, and the team dedicated to advancing AI-driven solutions for modern challenges.",
};

export default function AboutPage() {
  return <AboutInfo />;
}
