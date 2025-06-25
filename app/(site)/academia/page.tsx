// app/(site)/academia/page.tsx
import { Metadata } from "next";
import AcademicsInfo from "@/components/Academia/";

export const metadata: Metadata = {
  title: "Academia | Krv",
  description:
    "Explore academic resources, research, and insights on Krv's Academia page.",
};

export default function AcademiaPage() {
  return <AcademicsInfo />;
}
