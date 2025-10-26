"use client";

import { motion } from "framer-motion";
import Terminal from "@/components/Animations/terminal";

const FastDeploy = () => {
  return (
    <>
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-32.5">
            {/* Graphic */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top relative z-50 rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection md:w-1/2"
            >
              <div className="h-full w-full dark:hidden">
                <Terminal />
              </div>
              <div className="hidden h-full w-full dark:block">
                <Terminal />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium text-black dark:text-white">
                Production-Grade Infrastructure
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Simple for users,{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  limitless for developers.
                </span>
              </h2>
              <p className="mb-8">
                AI used to be expensive and slow. Simple automations had low
                ROI, and complex models took forever to iterate. Not anymore.
                <br />
                <span style={{ display: "block", height: "0.5em" }}></span>
                We deploy production-grade, industry-standard tools for
                expert-level model training. Your data connects instantly,
                workflows spin up automatically, and custom API endpoints go
                live in minutes.
              </p>

              {/* Step 01 */}
              <div className="mt-7.5 flex items-start gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Connect Your Data
                  </h3>
                  <p>
                    Point to databases, APIs, or files. We auto-map everything
                    into a unified graph with rich metadata.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="mt-7.5 flex items-start gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Build & Train Models
                  </h3>
                  <p>
                    Compose LLM workflows or train models. We handle data prep,
                    orchestration, and security.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="mt-7.5 flex items-start gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    03
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Deploy & Integrate
                  </h3>
                  <p>
                    Every model ships with an API. Plug into your systems,
                    trigger runs, iterate quickly — no brittle ETL.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FastDeploy;
