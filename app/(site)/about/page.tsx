"use client";

import SidebarLink from "@/components/Docs/SidebarLink";
import { useState } from "react";
import { motion } from "framer-motion";
// import Brands from "@/components/Brands";
export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState<"about" | "projects">(
    "about",
  );

  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: -20,
          },

          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
      >
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
                      <section className="prose lg:prose-lg mx-auto px-4 py-8">
                        <h1 className="mb-6 text-4xl font-bold">
                          About Krv Analytics
                        </h1>
                        <p className="mb-10 text-lg leading-relaxed">
                          Fast, confident decisions begin with complete, trusted
                          insight. Krv Analytics is the unified data
                          intelligence platform that transforms scattered
                          spreadsheets, drives, and apps into a single,
                          searchable knowledge base. Ask a question in natural
                          language and get an answer you can trace back to the
                          source—every time.
                        </p>

                        <h2 className="mb-4 text-3xl font-semibold">
                          Our Approach
                        </h2>
                        <p className="mb-10 text-lg leading-relaxed">
                          Data shouldn’t be intimidating. We stream tables,
                          timelines, and text from tools your team already
                          uses—Excel, Google Drive, Notion, relational
                          databases, and more—into a lightweight graph. Context
                          is preserved, relationships surface automatically, and
                          our AI assistant sits on top so anyone can explore the
                          full story behind the numbers in seconds. No SQL
                          required, no extra dashboards to maintain—just
                          understanding.
                        </p>

                        <h2 className="mb-4 text-3xl font-semibold">
                          Why We Exist
                        </h2>
                        <p className="mb-10 text-lg leading-relaxed">
                          Mid‑sized enterprises sit in a tough spot: too complex
                          for one‑size‑fits‑all BI tooling, too lean to staff an
                          army of data scientists. Krv bridges that gap with an
                          AI‑ready SaaS platform that deploys in days, not
                          months. You already own the data; we make it work for
                          you—so recruiters find the right candidates, sales
                          sees the next opportunity, and leadership moves with
                          confidence.
                        </p>

                        <h2 className="mb-4 text-3xl font-semibold">
                          What Makes Us Different
                        </h2>

                        <p className="mb-10 text-lg leading-relaxed">
                          Krv delivers grounded answers that link directly back
                          to original files, giving teams full confidence in
                          every insight. Our context-aware AI search understands
                          plain English and explores across all your connected
                          data—no technical expertise required. We’re built by
                          experts with deep roots in real-world data engineering
                          and PhD-level machine learning. And as a fully managed
                          SaaS, Krv offers zero-friction rollout so you can get
                          value fast without managing infrastructure.
                        </p>
                      </section>
                    </>
                  )}
                  {selectedSection === "projects" && (
                    <>
                      <h1>On the Horizon</h1>
                      <h5>Jobba: AI-Powered Recruiting</h5>
                      <p className="text-body-color dark:text-body-color-dark text-base">
                        We're excited to announce that a live version of our
                        AI-powered recruiting tool will be going live for a
                        client in May of 2025! This solution transforms raw data
                        into actionable insights, speeding up the search for top
                        talent and reducing the typical recruiting challenges.
                        With our tool, organizations can make better hiring
                        decisions—fast, efficient, and smart.
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
                        clinicians to make faster, more informed decisions at
                        the point of care, with a robust model capable of
                        delivering high accuracy across multiple years of
                        patient data.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
      {/* <Brands /> */}
    </>
  );
}
