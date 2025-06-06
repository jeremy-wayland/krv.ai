"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import Mover from "@/images/about/moveTest";
import Mover from "./nodeBoundce";

const About = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
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
              className="animate_top rounded-lg p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
            >
              <div className="h-full w-full dark:hidden">
                <Mover />
              </div>
              <div className="hidden h-full w-full dark:block">
                <Mover />
              </div>

              {/* <Image
                src="/images/about/about-dark-01.svg"
                alt="About"
                className="hidden dark:block"
                fill
              /> */}
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
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
                Custom Workflows {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  On Demand
                </span>
              </h2>
              <p>
                No-code tools (n8n and Langflow) are like a fully stocked
                kitchen—you have all the ingredients and tools, but you still
                need to cook the meal yourself.
                <br />
                <span style={{ display: "block", height: "0.5em" }}></span>
                We're building the private chef of data workflows: just tell us
                what you want to eat, and our smart chef handles
                everything—selecting ingredients, cooking, and serving—so you
                don't have to lift a finger.
              </p>

              <div className="mt-7.5 flex items-center gap-5">
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
                    We develop a deep understanding of your infrastructure, your
                    data types, systems, and how they interconnect, for
                    meaningful analysis. Think of it like learning the terrain
                    before building roads: we ensure preprocessing and data
                    engineering allign with downstream goals.
                  </p>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle2 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                    Generative Graph Modeling
                  </h3>
                  <p>
                    We model agentic workflows as directed graphs. Using
                    diffusion-based generative models, we spin up dynamic
                    workflows from your data stack in response to natural
                    language queries. These graph models guide agent behavior
                    and integrate seamlessly with no-code orchestration
                    platforms.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      {/* <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
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
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                Stear Clear Of
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Data {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Overload
                </span>
              </h2>
              <p>
                Traditional tools drown you in information without making sense
                of it. Our tools doesn’t just surface patterns—they understand
                relationships, trends, and context, turning raw data into clear,
                actionable insights.
              </p>
              <br />
              <p>
                Gone are the days of trying to solve a massive puzzle with
                thousands of scattered pieces. Instead of guessing where they
                fit, we assemble the big picture for you—so you see the whole
                story instantly. overload.
              </p>
              <div>
                <a
                  href="/support"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Know More
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image
                src="./images/about/about-light-02.svg"
                alt="About"
                className="dark:hidden"
                fill
              />
              <Image
                src="./images/about/about-dark-02.svg"
                alt="About"
                className="hidden dark:block"
                fill
              />
            </motion.div>
          </div>
        </div>
      </section> */}
      {/* <!-- ===== About Two End ===== --> */}
    </>
  );
};

export default About;
