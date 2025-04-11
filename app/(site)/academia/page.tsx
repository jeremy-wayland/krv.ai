import Academia from "@/components/AcademicLanding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Collaboration",

  // other metadata
  description: "This is Academia page",
};

const BlogPage = async () => {
  return (
    <main>
      <Academia />
    </main>
  );
};

export default BlogPage;
