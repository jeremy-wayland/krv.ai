//components/Finance/page.tsx
import { Metadata } from "next";

import FinanceUseCases from "@/components/FinanceUseCases";
import FinanceHero from "@/components/FinanceHero";
import Walkthrough from "@/components/FinanceWalkthrough";

export const metadata: Metadata = {
  title: "Finance | Krv",
  description:
    "Explore Krv's finance solutions, including use cases, features, and testimonials to help your business manage financial operations efficiently.",
  // other metadata
};
export default function Home() {
  return (
    <main>
      <FinanceHero />
      <FinanceUseCases />
      <Walkthrough />
    </main>
  );
}
