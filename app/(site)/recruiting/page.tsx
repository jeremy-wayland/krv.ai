import { Metadata } from "next";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";
import MoverLight from "../../../components/RecruitingSubpage/animation";
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
      {/* <CTA /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
    </main>
  );
}
