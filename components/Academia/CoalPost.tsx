"use client";
import { useState } from "react";
import CoalNetworkGraph from "./CoalNetworkGraph";
import ResourceCards from "@/components/Common/ResourceCards";
import coalResources from "@/components/Academia/resources-CoalPost";
import { colorForGroup } from "./groupColors";

export default function CoalPost() {
  const [expanded, setExpanded] = useState(false);
  const [activeViz, setActiveViz] = useState<
    "retirement" | "groups" | "network"
  >("network");
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
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white "
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
            <div className="mt-3">
              <a
                href="https://rdcu.be/eMmeo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-primaryho dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Read the Paper!
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
          </header>
          <div className="leading-relaxed text-slate-700 dark:text-slate-300">
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Paper — Quick Context
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Published in Nature Energy: a data‑driven framework for
                accelerating U.S. coal retirements.
              </li>
              <li>
                Classifies every coal plant into 8 retirement archetypes using
                68 technical, economic, environmental, and political variables.
              </li>
              <li>
                Reveals why plants persist and where interventions are most
                effective (financial, regulatory, public health, grid context).
              </li>
              <li>
                Introduces the Thema algorithm: a robust unsupervised method for
                learning optimal graph representations from high dimensional
                datasets.
              </li>
            </ul>
          </div>
          <div className="mt-6 leading-relaxed text-slate-700 dark:text-slate-300">
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              Our Graph Models
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                The graph shows all U.S. coal plants; connections indicate
                similar features across environmental, sociopolitical, and
                financial factors.
              </li>
              <li>
                This is a Mapper graph (Singh et al.), a tool from topological
                data analysis. Nodes represent clusters of coal plants, and
                edges connect clusters that share membership (i.e., overlap in
                plants).
              </li>
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-md bg-slate-50/60 p-1 ring-1 ring-slate-200/70 dark:bg-slate-900/40 dark:ring-slate-800/60">
              <button
                className={`rounded px-3 py-1.5 text-sm ${activeViz === "network" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setActiveViz("network")}
              >
                Graph
              </button>
              <button
                className={`rounded px-3 py-1.5 text-sm ${activeViz === "retirement" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setActiveViz("retirement")}
              >
                Retirements Map
              </button>
              <button
                className={`rounded px-3 py-1.5 text-sm ${activeViz === "groups" ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
                onClick={() => setActiveViz("groups")}
              >
                Groups Map
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
            {activeViz === "network" && (
              <CoalNetworkGraph
                dataUrl="/coal/coalPlant_graph.json"
                height={parseInt(
                  frameBase.match(/h-\[(\d+)px\]/)?.[1] || "600",
                  10,
                )}
                freeLayout={freeLayout}
              />
            )}
            {activeViz === "retirement" && (
              <iframe
                src="/coal/retirementMap.html"
                title="Coal Map"
                className={`w-full ${frameBase}`}
              />
            )}
            {activeViz === "groups" && (
              <iframe
                src="/coal/groupProxMap.html"
                title="Coal Group Map"
                className={`w-full ${frameBase}`}
              />
            )}
          </div>
          Figures based on Gathrid, et al. (2025) Nature Energy{" "}
          {/* Retirement Groups Overview */}
          <div className="mt-10 leading-relaxed text-slate-700 dark:text-slate-300">
            <h2 className="mb-2 text-2xl font-semibold text-black dark:text-white">
              Retirement Groups — Quick Overview
            </h2>
            <ul className="space-y-2 pl-0">
              {/* 0 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(0) }}
                />
                <div>
                  <span className="font-medium">Fuel Blend Plants:</span>{" "}
                  Regulatory non-compliance and clean energy targets.
                </div>
              </li>
              {/* 1 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(1) }}
                />
                <div>
                  <span className="font-medium">
                    Retrofitted but Vulnerable Plants:
                  </span>{" "}
                  Only partial retirements planned; economic unviability and
                  renewable competition.
                </div>
              </li>
              {/* 2 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(2) }}
                />
                <div>
                  <span className="font-medium">
                    Democratic Majority Plants:
                  </span>{" "}
                  Political and regulatory pressure for clean energy
                  transitions.
                </div>
              </li>
              {/* 3 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(3) }}
                />
                <div>
                  <span className="font-medium">
                    High Health Impact Plants:
                  </span>{" "}
                  Air-quality related public health concerns and environmental
                  regulations.
                </div>
              </li>
              {/* 4 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(4) }}
                />
                <div>
                  <span className="font-medium">Expensive Plants:</span> High
                  operating costs and environmental retrofit requirements.
                </div>
              </li>
              {/* 5 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(5) }}
                />
                <div>
                  <span className="font-medium">Young Plants:</span> No planned
                  retirements.
                </div>
              </li>
              {/* 6 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(6) }}
                />
                <div>
                  <span className="font-medium">
                    Plants in Anti-Coal Regions:
                  </span>{" "}
                  Political opposition and economic difficulties.
                </div>
              </li>
              {/* 7 */}
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colorForGroup(7) }}
                />
                <div>
                  <span className="font-medium">Air Quality Offenders:</span> No
                  planned retirements.
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-10 leading-relaxed text-slate-700 dark:text-slate-300">
            <h2 className="mb-2 text-2xl font-semibold text-black dark:text-white">
              Thema — Learning Relevant Representations
            </h2>
            <p>
              When analyzing the US coal fleet, we faced a common challenge:
              deriving robust, actionable insights from a complex,
              high-dimensional dataset. We were overwhelmed by the noise and
              variability inherent in simply extracting a usable representation
              of the data. Traditional dimensionality reduction techniques often
              create unstable "insights"—a small parameter change can dissolve
              the entire embedding. Thema manages this sensitivity as a feature,
              not a bug. Our design embraces the variation from different
              modeling choices, allowing us to produce and reason about a
              distribution of data structures (graphs). This approach ensures we
              capture the consistently real facets of the underlying data, which
              we then condense and optimize for downstream tasks, like
              accelerating coal retirement.
            </p>
            <h3 className="mb-1 mt-4 text-xl font-semibold text-black dark:text-white">
              How it behaves
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Build graphs that approximate a manifold structure over your
                data.
              </li>
              <li>
                Simplify the "multiverse" of parameter settings, optimizing
                model selection for the downstream task of your choice.
              </li>
              <li>
                Leverage graph algorithms to scalably extract insights from your
                data.
              </li>
            </ul>
            <h3 className="mb-1 mt-4 text-xl font-semibold text-black dark:text-white">
              Why it helps
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                No more “pick the pretty embedding.” Confidently select a usable
                representation for your analysis.
              </li>
              <li>
                Reproducible by design; the result isn’t one lucky
                hyperparameter.
              </li>
              <li>
                Plays nicely with clustering, visualization, and
                decision‑making.
              </li>
            </ul>
          </div>
        </article>
        {/* Resources section: modular component */}
        <article className="dark:bg-gray-dark mt-6 rounded-xl bg-white px-6 py-8 ring-1 ring-slate-200/70 dark:ring-slate-800/60 sm:px-10 sm:py-10">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-black dark:text-white xl:text-4xl">
              Resources
            </h1>
            {/* <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Docs, code, and publications tied to this work.
            </p> */}
          </header>
          <ResourceCards items={coalResources} />
        </article>
      </div>
    </section>
  );
}
