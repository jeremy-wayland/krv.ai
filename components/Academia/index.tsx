//components/Academia/index.tsx
"use client";
import Underline from "../Animations/UnderlineAnchor";

export default function AcademicsInfo() {
  return (
    <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <header className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white xl:text-4xl">
            <span className="relative inline-block before:absolute before:bottom-1.5 before:left-0 before:-z-10 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
              Academia
            </span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Research, collaborations, and technical explorations.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          <article className="dark:bg-gray-dark group flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200/70 transition-shadow hover:shadow-lg dark:ring-slate-800/60 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              <Underline
                href="/academia/coal"
                style={
                  {
                    "--underline-size": "2.5px",
                  } as React.CSSProperties
                }
              >
                Strategies to Accelerate US Coal Power Phaseout Using Contextual
                Retirement Vulnerabilities
              </Underline>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              In collaboration with UCSB Environmental Studies & Bren School
            </p>
            <p className="mt-4 line-clamp-4 leading-relaxed text-slate-700 dark:text-slate-300">
              Coal power is now economically unviable, outpriced by renewables
              and burdened by rising operational costs. Our{" "}
              <em>Nature Energy</em> paper reveals how strategic,
              context-specific phaseouts can accelerate this transition
              equitably.
            </p>
            <div className="mt-5">
              <a
                href="/academia/coal"
                className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-primaryho dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Read post
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </article>

          <article className="rounded-xl bg-white/60 p-6 ring-1 ring-slate-200/70 dark:bg-slate-900/40 dark:ring-slate-800/60 sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              More coming soon…
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Academic collaborations, reproducibility write-ups, and technical
              deep dives.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
