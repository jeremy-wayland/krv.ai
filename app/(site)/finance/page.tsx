import { Metadata } from "next";

import Testimonial from "@/components/FinanceUseCases";
import FinanceHeader from "@/components/FinanceSubpage";
import Walkthrough from "@/components/FinanceFeaturesTab";

export const metadata: Metadata = {
  title: "Krv",
  description: "Krv Analytics",
  // other metadata
};
export default function Home() {
  return (
    <main>
      <FinanceHeader />
      <Testimonial />
      <Walkthrough />
      {/* <FunFact /> */}
      {/* <Integration /> */}
      {/* <CTA /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
    </main>
  );
}
