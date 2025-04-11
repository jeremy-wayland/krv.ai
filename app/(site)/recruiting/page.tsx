// import Brands from "@/components/Brands";
// import FunFact from "@/components/FunFact";
// import Pricing from "@/components/Pricing";

import { Metadata } from "next";
import CTA from "@/components/CTA";
import Integration from "@/components/Integration";
import FeaturesTab from "@/components/RecruitingFeaturesTab";
import RecruiterHeader from "@/components/RecruitingSubpage";

export const metadata: Metadata = {
  title: "Krv",
  description: "Krv Analytics",
  // other metadata
};
export default function Home() {
  return (
    <main>
      <RecruiterHeader />

      <FeaturesTab />
      {/* <FunFact /> */}
      <Integration />
      <CTA />
      {/* <Brands /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
    </main>
  );
}
