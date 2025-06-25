import { Metadata } from "next";
import Reachout from "@/components/RecruitmentReachout";
import Integrations from "@/components/RecruitmentIntegrations";
import RecruiterHero from "@/components/RecruitmentHero";
import Walkthrough from "@/components/RecruitmentWalkthrough";

export const metadata: Metadata = {
  title: "Recruiting | Krv",
  description:
    "Krv Recruiting Page - Explore our features and integrations for recruiters.",
  // other metadata
};
export default function RecruitmentPage() {
  return (
    <main>
      <RecruiterHero />
      <Walkthrough />
      <Integrations />
      <Reachout />
    </main>
  );
}
