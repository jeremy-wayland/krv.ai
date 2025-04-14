// app/(site)/academia/page-details/page.tsx

"use client";

import Sidebar from "@/components/AcademicLanding/Sidebar";

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

                    {/* <div className="flex flex-wrap gap-5">
                      <Image
                        src={"/images/blog/research-collab-1.png"}
                        width={350}
                        height={200}
                        alt="Research Collaboration 1"
                      />
                      <Image
                        src={"/images/blog/research-collab-2.png"}
                        width={350}
                        height={200}
                        alt="Research Collaboration 2"
                      />
                    </div> */}

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
                    <div className="flex h-auto min-h-[625px] w-full flex-col gap-4 md:flex-row">
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

//   return (
//     <>
//       <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
//         <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
//           <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
//             <div className="md:w-1/2 lg:w-[32%]">
//               {/* <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
//                 <form
//                   action="https://formbold.com/s/unique_form_id"
//                   method="POST"
//                 >
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search Here..."
//                       className="focus:outline-hidden w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
//                     />

//                     <button
//                       className="absolute right-0 top-0 p-5"
//                       aria-label="search-icon"
//                     >
//                       <svg
//                         className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
//                         width="21"
//                         height="21"
//                         viewBox="0 0 21 21"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </form>
//               </div> */}

//               <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
//                 <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
//                   Collaborations
//                 </h4>

//                 <ul>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Coming Soon!</a>
//                   </li>
//                   {/* <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Events</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Grids</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">News</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Rounded</a>
//                   </li> */}
//                 </ul>
//               </div>
//               {/* <RelatedPost /> */}
//             </div>

//             <div className="lg:w-2/3">
//               <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
//                 <div className="blog-details">
//                   <h2>A Foothold in Academia</h2>

//                   <h5> Model Development</h5>
//                   <p>
//                     We've had the privilege of working with academic partners on
//                     joint studies and technical model frameworks. These
//                     collaborations allow us to accelerate innovation, validate
//                     new approaches, and continuously push the boundary of what's
//                     possible.
//                   </p>

//                   {/* <div className="flex flex-wrap gap-5">
//                     <Image
//                       src={"/images/blog/research-collab-1.png"}
//                       width={350}
//                       height={200}
//                       alt="Research Collaboration 1"
//                     />
//                     <Image
//                       src={"/images/blog/research-collab-2.png"}
//                       width={350}
//                       height={200}
//                       alt="Research Collaboration 2"
//                     />
//                   </div> */}

//                   <h5>Bringing Academic Techniques into Industry</h5>

//                   <p>
//                     We don't just read the latest academic papers — we help
//                     write them. Our mission is to ensure that promising new
//                     techniques don't just stay within journals, but are used by
//                     companies, agencies, and energy practitioners to make
//                     better, faster, and more informed decisions. We're proud to
//                     play a small role in helping high-potential academic work
//                     find a larger stage.
//                   </p>

//                   <h6>
//                     If you're a researcher, student, or faculty member working
//                     on something exciting, we'd love to hear from you. Let's
//                     turn great ideas into real-world impact — together.
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
