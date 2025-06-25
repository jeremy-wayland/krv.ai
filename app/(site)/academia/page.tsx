// app/(site)/academia/page.tsx

"use client";

import Sidebar from "@/components/Academia/Sidebar";

import { useState } from "react";
// import Brands from "@/components/Brands";
export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState<
    "about" | "coal" | "pending"
  >("about");

  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4  transition-all  dark:border-strokedark dark:bg-blacksection">
                <ul className="space-y-2">
                  <Sidebar
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
                    <h2>A Foothold in Academia</h2>

                    <h5> Model Development</h5>
                    <p>
                      We've had the privilege of working with academic partners
                      on joint studies and technical model frameworks. These
                      collaborations allow us to accelerate innovation, validate
                      new approaches, and continuously push the boundary of
                      what's possible.
                    </p>

                    <h5>Bringing Academic Techniques into Industry</h5>

                    <p>
                      We don't just read the latest academic papers — we help
                      write them. Our mission is to ensure that promising new
                      techniques don't just stay within journals, but are used
                      by companies, agencies, and energy practitioners to make
                      better, faster, and more informed decisions. We're proud
                      to play a small role in helping high-potential academic
                      work find a larger stage.
                    </p>

                    <h6>
                      If you're a researcher, student, or faculty member working
                      on something exciting, we'd love to hear from you. Let's
                      turn great ideas into real-world impact — together.
                    </h6>
                  </>
                )}
                {selectedSection === "coal" && (
                  <>
                    <h2>
                      Strategies to Accelerate US Coal Power Phaseout Using
                      Contextual Retirement Vulnerabilities
                    </h2>
                    <h6>
                      {" "}
                      In collaboration with the UCSB Environmental Studies
                      Department and Bren School of Environmental Science and
                      Management
                    </h6>
                    <br></br>
                    <p>
                      Coal power is now economically unviable, outpriced by
                      renewables and burdened by rising operational costs. But
                      the stakes go deeper: aging plants disproportionately harm
                      disadvantaged communities through toxic emissions, while
                      locking utilities into stranded assets. Retiring coal
                      isn’t just about climate goals—it’s a financial, health,
                      and justice imperative. Our upcoming{" "}
                      <em>Nature Energy</em> paper reveals how strategic,
                      context-specific phaseouts can accelerate this transition
                      equitably.
                    </p>
                    <div className="flex h-auto min-h-[550px] w-full flex-col gap-4 md:flex-row">
                      <iframe
                        src="/coal/retirementMap.html"
                        title="Coal Map"
                        className="flex-1 rounded-lg"
                      />
                    </div>
                    <br></br>
                    <h3>
                      Mapping Coal's <i>Contextual Retirement Vulnerability</i>:
                      A New Lens for Phaseouts
                    </h3>
                    <p>
                      Using graph theory and topological data analysis, we
                      classify the US coal fleet into 8 distinct groups with
                      unique retirement drivers. Our novel “contextual
                      retirement vulnerability” score quantifies how close
                      non-retiring plants are to early closures—exposing which
                      are most at risk from regulatory, economic, or social
                      pressures.
                    </p>
                    <p>
                      This analysis leveraged{" "}
                      <a
                        href="https://github.com/Krv-Analytics/Thema"
                        target="_blank"
                        rel="noopener"
                      >
                        <strong>THEMA</strong>
                      </a>
                      , our topological hyperparameter framework that maps
                      complex data landscapes to reveal actionable insights.
                      THEMA doesn’t just crunch numbers—it identifies which
                      parameters and preprocessing steps uncover the most
                      trustworthy, impactful patterns. Think of it as a compass
                      for navigating unsupervised learning’s chaos.
                    </p>

                    <p>
                      <em>
                        {" "}
                        Stay tuned for the paper’s publication to explore
                        reproducibility scripts and full methodology!
                        <a
                          href="https://krv-analytics.github.io/Thema/#"
                          target="_blank"
                          rel="noopener"
                        >
                          {" "}
                          <strong>(See the THEMA docs!)</strong>{" "}
                        </a>{" "}
                      </em>
                    </p>
                    <div className="flex h-auto min-h-[480px] w-full flex-col gap-4 md:flex-row">
                      <iframe
                        src="/coal/groupProxMap.html"
                        title="Coal Map"
                        className="flex-1 rounded-lg"
                      />
                    </div>
                  </>
                )}

                {selectedSection === "pending" && (
                  <>
                    <h2>Stay Tuned...</h2>
                    <p>More academic collaborations coming soon!</p>
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
