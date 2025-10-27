"use client";
import SimpleFlow from "@/components/Animations/HeroFlow/SimpleFlow";
import Scramble from "./TextScramble";

const Hero = () => {
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <Scramble />
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                The API for {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Enterprise AI.
                </span>
              </h1>

              <div className="space-y-3">
                <p className="lead-text">
                  <strong>One protocol layer for enterprise AI.</strong> <br />
                  Deploy anywhere with no migrations. Plug into existing systems
                  and spin up advanced ML/AI workflows in minutes.
                </p>

                <p className="lead-text">
                  <strong>
                    Own the stack. Build high‑impact, custom solutions.
                  </strong>{" "}
                  <br />
                  Non‑technical experts compose workflows into production‑ready
                  APIs. Built on production rails for orchestration, scaling,
                  and security.
                </p>

                <div className="pt-2">
                  <em>Built by data engineers and PhDs.</em>
                </div>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className="h-100 w-full dark:hidden">
                  <SimpleFlow initialColor="#0f172a" />
                </div>

                <div className="hidden dark:block">
                  <SimpleFlow initialColor="#60a5fa" />
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
