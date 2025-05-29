import TeamData from "@/components/Team/TeamData";
import TeamItem from "@/components/Team/TeamItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Get to know the team members.",
  // other metadata
};

const BlogPage = async () => {
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-4 max-w-c-1280 px-4 md:px-8 xl:mt-6 xl:px-0">
          <h2 className="text-3xl font-semibold">The Founders</h2>
          <br></br>
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {TeamData.map((post, key) => (
              <TeamItem key={key} blog={post} />
            ))}
          </div>
          <br></br>
          <p className="text-lg leading-relaxed">
            Sidney cut his teeth designing resilient data pipelines for
            environmental-tech firms. Brothers Jeremy and Stuart are earning
            PhDs in advanced mathematics, pushing the frontier of machine
            learning research. Together, they marry deep infrastructure know-how
            with academic rigor to create a platform enterprises can stake
            decisions on.
          </p>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
