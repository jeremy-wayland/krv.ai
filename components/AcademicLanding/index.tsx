// components/AcademicLanding/index.tsx

import React from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./blog-item";
import BlogData from "./blog-data";

const Blog = async () => {
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* <!-- Section Title Start --> */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `Academic Collaborations`,
              subtitle: `A Foothold in Academia`,
              description: `At Krv Analytics, we believe the most groundbreaking
                    solutions often originate from the halls of academia. That's
                    why we're passionate about bridging the gap between research
                    and industry — transforming the insights of PhDs,
                    cutting-edge methodologies, and academic rigor into
                    practical tools that drive real-world impact.`,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
          {BlogData.slice(0, 2).map((blog, key) => (
            <BlogItem blog={blog} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
