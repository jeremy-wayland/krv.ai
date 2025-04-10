import Image from "next/image";
import MoverLight from "./animation";

export default function RecruiterHeader() {
  return (
    <main>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                The Missing Link Between Your Data and AI Intelligence 🔍
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Less Searching.{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  More Hiring.
                </span>
              </h1>
              <p>
                We transform your recruiting data into a context-rich graph that
                LLMs like ChatGPT actually understand—so you can find the right
                candidates faster. By connecting placements, outcomes,
                industries, and more, Krv helps you surface better matches with
                less effort and more intelligence.
              </p>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5" style={{ height: "400px" }}>
                {/* <div className="h-full w-full dark:hidden">
                  <MoverLight />
                </div> */}
                {/* <div className="hidden dark:block">
                    <MoverDark />
                  </div> */}
                <Image
                  src="/images/recruiting/ui_mockup.svg"
                  alt="About"
                  className="hidden dark:block"
                  fill
                />
                <Image
                  src="/images/recruiting/ui_mockup.svg"
                  alt="About"
                  className="dark:hidden"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
