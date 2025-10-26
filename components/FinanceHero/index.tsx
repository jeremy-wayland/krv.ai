import Image from "next/image";
import FinanceScramble from "./TextScramble";

export default function FinanceHero() {
  return (
    <main>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-row-reverse lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <FinanceScramble />
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                From Raw Data
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  to Real-Time Insights
                </span>
              </h1>
              <p className="lead-text">
                <strong>
                  <em>
                    Spin up live signals, copilots, and monitors in minutes.
                  </em>
                </strong>
              </p>

              <p className="description-text">
                Combine fundamentals with alternative data, surface events as
                they happen, and explore relationships across entities — all
                with explainable outputs and APIs by default.
              </p>
              <br />
              <p className="call-to-action">
                <strong>
                  <em>Plug in your data. Choose a model. Go live.</em>
                </strong>
              </p>

              <p className="solution-description">
                Built on production rails for orchestration, scaling, and
                security — so you can focus on ideas, not plumbing.
              </p>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5" style={{ height: "400px" }}>
                <Image
                  src="/images/features/understandFitDark.svg"
                  alt="About"
                  className="hidden dark:block"
                  fill
                />
                <Image
                  src="/images/features/understandFit.svg"
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
