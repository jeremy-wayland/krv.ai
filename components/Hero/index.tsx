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

              <p>
                One protocol layer that abstracts enterprise data complexity so
                AI systems deploy anywhere—<b>no migrations, no headaches</b>.
                We connect to your systems and instantly spin up workflows with
                advanced ML/AI.
                <br />
                <span style={{ display: "block", height: "0.5em" }}></span>
                {/* <pre>Krv Labs</pre> */}
                <em>Built by data engineers and PhDs.</em>
              </p>
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
