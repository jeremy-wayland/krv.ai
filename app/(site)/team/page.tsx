// app/(site)/team/page.tsx

import { Metadata } from "next";
import { Team } from "@/components/Team";

export const metadata: Metadata = {
  title: "Team | Krv",
  description:
    "Meet the founders dedicated to solving the future's biggest challenges. Our expertise in AI, quantum computing, and scalable systems sets us apart.",
  // other metadata
};

const TeamPage = () => {
  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              {/* <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                Agentic Data Engineering, For The Modern Stack 📚
              </h4> */}
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                The {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Founders.
                </span>
              </h1>
            </div>
          </div>

          <div className="mt-16 xl:mt-20">
            <Team />
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
