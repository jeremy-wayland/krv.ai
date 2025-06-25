"use client";
import AnimatedKnowledgeGraphLight from "@/animations/kg-light";
import AnimatedKnowledgeGraphDark from "@/animations/kg-dark";

const Hero = () => {
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                Agentic Data Engineering, For The Modern Stack 📚
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Fluent In {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Your Data.
                </span>
              </h1>
              <p>
                We're solving the biggest headache in data engineering:
                curating, cleaning, and preparing data for specific downstream
                tasks.
                <br />
                <span style={{ display: "block", height: "0.5em" }}></span>
                From spreadsheets and APIs to databases and docs, Krv helps
                organizations transform scattered, messy data into trustworthy,
                analysis-ready pipelines—fast. We use live knowledge graphs of
                your data stack to generate dynamic, tailored, multistage
                workflows. No more data engineering headaches, just natural
                language.
                <br />
                <span style={{ display: "block", height: "0.5em" }}></span>
                <em>Built by data engineers and PhDs.</em>
              </p>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className="h-full w-full dark:hidden">
                  <AnimatedKnowledgeGraphLight />
                </div>
                <div className="hidden dark:block">
                  <AnimatedKnowledgeGraphDark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
