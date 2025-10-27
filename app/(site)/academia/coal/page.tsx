// app/(site)/academia/coal/page.tsx
import { Metadata } from "next";
import CoalPost from "@/components/Academia/CoalPost";

export const metadata: Metadata = {
  title: "Academia: Coal Phaseout | Krv",
  description: "Strategies to accelerate US coal power phaseout using contextual retirement vulnerabilities.",
};

export default function CoalPage() {
  return <CoalPost />;
}

