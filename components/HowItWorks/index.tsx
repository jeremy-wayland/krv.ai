"use client";

import { motion } from "framer-motion";
import MCMCGraphic from "@/components/Animations/mcmcGraphic";

const HowItWorks = () => {
  return (
    <>
      {/* <!-- ===== How It Works Start ===== --> */}
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
              className="animate_top rounded-lg p-4 pb-9 shadow-solid-8 dark:bg-blacksection md:w-1/2"
            >
              <div className="h-full w-full dark:hidden">
                <MCMCGraphic />
              </div>
              <div className="hidden h-full w-full dark:block">
                <MCMCGraphic />
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
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  New
                </span>{" "}
                Our Secret Sauce
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Custom Workflows{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  On Demand
                </span>
              </h2>
              <p className="mb-8">
                AI used to be expensive, slow, and fragile — even for simple
                automation. Our platform changes that. We integrate directly
                with your data, model it in a unified graph framework, and
                automatically understand relationships and metadata for any
                task.
                <br />
                <span style={{ display: "block", height: "0.5em" }}></span>
                Simple automations are now within reach, and advanced models —
                deep neural networks, complex workflows, and multi-step ML
                pipelines — are just as easy to deploy. Everything runs
                automatically: from data curation and training to model
                deployment and API endpoints.
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
                    Representation Learning
                  </h3>
                  <p>
                    Our hypergraph engine maps your entire data landscape —
                    types, systems, relationships — into a structured graph.
                    This ensures every workflow and ML model understands where
                    the data lives and how it connects, making downstream
                    analysis fast and reliable.
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
                    Automated Graph-Driven Workflows
                  </h3>
                  <p>
                    Using our generative graph models, we automatically spin up
                    dynamic workflows from your data stack in response to user
                    tasks. From preprocessing to feature engineering to model
                    training and deployment, everything is fully orchestrated —
                    no fragile ETL pipelines required.
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
                    Instant API & Front-End Integration
                  </h3>
                  <p>
                    Each trained model comes with a ready-to-use API endpoint.
                    Plug it into your systems or custom UIs instantly — new
                    purchases, journal entries, or other events automatically
                    trigger analysis. AI handles the interface; we handle the
                    infrastructure.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== How It Works End ===== --> */}
    </>
  );
};

export default HowItWorks;
