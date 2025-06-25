import { Metadata } from "next";
import CTA from "@/components/CTA";
import Integration from "@/components/Integration";
import FeaturesTab from "@/components/RecruitingFeaturesTab";
import RecruiterHeader from "@/components/RecruitingSubpage";

export const metadata: Metadata = {
  title: "Recruiting | Krv",
  description:
    "Krv Recruiting Page - Explore our features and integrations for recruiters.",
  // other metadata
};
export default function RecruitingPage() {
  return (
    <main>
      <RecruiterHeader />
      <FeaturesTab />
      <Integration />
      <CTA />
    </main>
  );
}
