"use client";

import SidebarLink from "@/components/Docs/SidebarLink";
import { useState } from "react";
// import Brands from "@/components/Brands";
export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState<"about" | "projects">(
    "about",
  );

  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4  transition-all  dark:border-strokedark dark:bg-blacksection">
                <ul className="space-y-2">
                  <SidebarLink
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                  />
                </ul>
              </div>
            </div>

            <div className="w-full px-4 lg:w-3/4">
              <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                {selectedSection === "about" && (
                  <>
                    <h1>About Krv Analytics</h1>
                    <p className="text-body-color dark:text-body-color-dark text-base">
                      At Krv Analytics, we don’t just wrangle your data—we turn
                      it into something smarter. We specialize in uncovering the
                      structures, signals, and stories hidden deep within messy,
                      high-dimensional datasets. Our mission is to put the power
                      of intelligent data use back in the hands of domain
                      experts—no PhD or ML ops team required.
                    </p>
                    <h1>Our Approach</h1>
                    <p className="text-body-color dark:text-body-color-dark text-base">
                      Data doesn't need to be intimidating. Whether it's tables,
                      timelines, or text, we unify disparate data sources into
                      an intelligent, connected system. Our lightweight
                      graph-based approach brings structure to the chaos—so your
                      team can ask better questions, get clearer answers, and
                      make smarter moves. Fast.
                      <br /> <br />
                      We're not building yet another dashboard. We're building
                      understanding.
                    </p>
                    <h1>Why We Exist</h1>
                    <p className="text-body-color dark:text-body-color-dark text-base">
                      Most mid-sized companies are stuck in a gap—too complex
                      for out-of-the-box tools, too lean for a full-blown data
                      science team. That’s where we come in. Krv Analytics
                      bridges that gap with practical, intuitive AI-ready
                      solutions that give you insight without the overhead. You
                      already have the data. We make it work for you.
                    </p>
                  </>
                )}
                {selectedSection === "projects" && (
                  <>
                    <h1>On the Horizon</h1>
                    <h5>Jobba: AI-Powered Recruiting</h5>
                    <p className="text-body-color dark:text-body-color-dark text-base">
                      We're excited to announce that a live version of our
                      AI-powered recruiting tool will be going live for a client
                      in May of 2025! This solution transforms raw data into
                      actionable insights, speeding up the search for top talent
                      and reducing the typical recruiting challenges. With our
                      tool, organizations can make better hiring decisions—fast,
                      efficient, and smart.
                      <br />
                      <br />
                      Interested in learning more? Contact us to find out how
                      our AI recruiting solution can help you streamline your
                      hiring process.
                    </p>
                    <h5>
                      Enhancing UTI Risk Prediction with In-Room Analytics
                    </h5>
                    <p className="text-body-color dark:text-body-color-dark text-base">
                      An in-room analytics application is being developed to
                      predict urinary tract infection (UTI) risk in real time
                      for children with vesicoureteral reflux (VUR). Virtual
                      patient sampling and topological representation learning
                      are employed to generate accurate, actionable insights
                      from diverse patient data—enhancing risk predictions and
                      addressing missing data. This innovative tool enables
                      clinicians to make faster, more informed decisions at the
                      point of care, with a robust model capable of delivering
                      high accuracy across multiple years of patient data.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Brands /> */}
    </>
  );
}
