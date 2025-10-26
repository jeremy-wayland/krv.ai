"use client";
import { useState } from "react";
import CoalNetworkGraph from "./CoalNetworkGraph";

export default function CoalPost() {
  const [expanded, setExpanded] = useState(false);
  const [activeViz, setActiveViz] = useState<"retirement" | "groups" | "network">(
    "retirement",
  );
  const frameBase = expanded
    ? "h-[760px] md:h-[820px]"
    : "h-[480px] md:h-[600px]";
  const [freeLayout, setFreeLayout] = useState(true);
  return (
    <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <article className="dark:bg-gray-dark rounded-xl bg-white px-6 py-8 ring-1 ring-slate-200/70 dark:ring-slate-800/60 sm:px-10 sm:py-10">
          <div className="mb-6 flex items-center justify-between">
            <a
              href="/academia"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15l-5-5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Academia
            </a>
          </div>
          <header className="mb-6">
            <h1 className="mb-3 pr-0 text-3xl font-bold text-black dark:text-white xl:text-4xl">
              <span className="relative inline-block before:absolute before:bottom-1.5 before:left-0 before:-z-10 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                Strategies to Accelerate US Coal Power Phaseout Using Contextual
                Retirement Vulnerabilities
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              In collaboration with the UCSB Environmental Studies Department
              and Bren School of Environmental Science and Management
            </p>
          </header>

          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Coal power is now economically unviable, outpriced by renewables and
            burdened by rising operational costs. But the stakes go deeper:
            aging plants disproportionately harm disadvantaged communities
            through toxic emissions, while locking utilities into stranded
            assets. Retiring coal isn’t just about climate goals—it’s a
            financial, health, and justice imperative. Our upcoming{" "}
            <em>Nature Energy</em> paper reveals how strategic, context-specific
            phaseouts can accelerate this transition equitably.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-md bg-slate-50/60 p-1 ring-1 ring-slate-200/70 dark:bg-slate-900/40 dark:ring-slate-800/60">
              <button
                className={`rounded px-3 py-1.5 text-sm ${activeViz === "retirement" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setActiveViz("retirement")}
              >
                Retirement Map
              </button>
              <button
                className={`rounded px-3 py-1.5 text-sm ${activeViz === "groups" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setActiveViz("groups")}
              >
                Group Map
              </button>
              <button
                className={`rounded px-3 py-1.5 text-sm ${activeViz === "network" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setActiveViz("network")}
              >
                Plant Network
              </button>
            </div>
            <button
              className="ml-auto inline-flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Collapse View" : "Expand View"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 7h6v6H7z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {/* Removed snap/free toggle; layout is always force-directed now */}
          </div>

          <div className="mt-4 w-full overflow-hidden rounded-xl ring-1 ring-slate-200/70 dark:ring-slate-800/60">
            {activeViz === "retirement" && (
              <iframe src="/coal/retirementMap.html" title="Coal Map" className={`w-full ${frameBase}`} />
            )}
            {activeViz === "groups" && (
              <iframe src="/coal/groupProxMap.html" title="Coal Group Map" className={`w-full ${frameBase}`} />
            )}
            {activeViz === "network" && (
              <CoalNetworkGraph
                dataUrl="/coal/coalPlant_graph.json"
                height={parseInt((frameBase.match(/h-\[(\d+)px\]/)?.[1] || "600"), 10)}
                freeLayout={freeLayout}
              />
            )}
          </div>

          <h3 className="mb-2 mt-10 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Mapping Coal's <i>Contextual Retirement Vulnerability</i>: A New
            Lens for Phaseouts
          </h3>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            Using graph theory and topological data analysis, we classify the US
            coal fleet into 8 distinct groups with unique retirement drivers.
            Our novel “contextual retirement vulnerability” score quantifies how
            close non-retiring plants are to early closures—exposing which are
            most at risk from regulatory, economic, or social pressures.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            This analysis leveraged{" "}
            <a
              href="https://github.com/Krv-Analytics/Thema"
              target="_blank"
              rel="noopener"
            >
              <strong>THEMA</strong>
            </a>
            , our topological hyperparameter framework that maps complex data
            landscapes to reveal actionable insights. THEMA doesn’t just crunch
            numbers—it identifies which parameters and preprocessing steps
            uncover the most trustworthy, impactful patterns. Think of it as a
            compass for navigating unsupervised learning’s chaos.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            <em>
              Stay tuned for the paper’s publication to explore reproducibility
              scripts and full methodology!
              <a
                href="https://krv-analytics.github.io/Thema/#"
                target="_blank"
                rel="noopener"
              >
                <strong> (See the THEMA docs!)</strong>
              </a>
            </em>
          </p>
        </article>
      </div>
    </section>
  );
}
