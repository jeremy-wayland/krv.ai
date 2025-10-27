"use client";
import { useState } from "react";
import CoalNetworkGraph from "./CoalNetworkGraph";
import Underline from "../Animations/UnderlineAnchor";

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
                Introduces the parameter‑sweep + topological condensation method
                later formalized in Thema.
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
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium">Fuel Blend Plants:</span>{" "}
                Regulatory non-compliance and clean energy targets.
              </li>
              <li>
                <span className="font-medium">
                  Retrofitted but Vulnerable Plants:
                </span>{" "}
                Only partial retirements planned; economic unviability and
                renewable competition.
              </li>
              <li>
                <span className="font-medium">Democratic Majority Plants:</span>{" "}
                Political and regulatory pressure for clean energy transitions.
              </li>
              <li>
                <span className="font-medium">High Health Impact Plants:</span>{" "}
                Air-quality related public health concerns and environmental
                regulations.
              </li>
              <li>
                <span className="font-medium">Expensive Plants:</span> High
                operating costs and environmental retrofit requirements.
              </li>
              <li>
                <span className="font-medium">Young Plants:</span> No planned
                retirements.
              </li>
              <li>
                <span className="font-medium">
                  Plants in Anti-Coal Regions:
                </span>{" "}
                Political opposition and economic difficulties.
              </li>
              <li>
                <span className="font-medium">Air Quality Offenders:</span> No
                planned retirements.
              </li>
            </ul>
          </div>
          <div className="mt-10 leading-relaxed text-slate-700 dark:text-slate-300">
            <h2 className="mb-2 text-2xl font-semibold text-black dark:text-white">
              Thema — Turning Finicky Graphs into Useful Ones
            </h2>
            <p>
              If you’ve nudged UMAP and watched your “insight” dissolve, you
              know the feeling. Thema treats that sensitivity like a feature to
              be managed: explore the reasonable settings, then keep what’s
              consistently real.
            </p>
            <h3 className="mb-1 mt-4 text-xl font-semibold text-black dark:text-white">
              How it behaves
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Build graphs/manifolds from your data.</li>
              <li>
                Run parameter sweeps (neighbors, metrics, min_dist, etc.).
              </li>
              <li>
                Condense results into a representative graph — the structure
                that keeps showing up.
              </li>
            </ul>
            <h3 className="mb-1 mt-4 text-xl font-semibold text-black dark:text-white">
              Why it helps
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                No more “pick the pretty embedding.” You get a stable,
                interpretable topology.
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
            <h3 className="mb-1 mt-4 text-xl font-semibold text-black dark:text-white">
              Do more with less drama
            </h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>Explore variants. Keep the consensus structure.</li>
              <li>
                Treat topology as a first‑class object — analyze, explain, act.
              </li>
            </ul>
          </div>
        </article>
        {/* Big callouts for docs and repos */}
        <article className="dark:bg-gray-dark mt-6 rounded-xl bg-white px-6 py-8 ring-1 ring-slate-200/70 dark:ring-slate-800/60 sm:px-10 sm:py-10">
          <h1 className="mb-3 pr-0 text-3xl font-bold text-black dark:text-white xl:text-4xl">
            Resources:
          </h1>
          <br></br>
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            <Underline
              href="https://krv-analytics.github.io/Thema/"
              style={
                {
                  "--underline-size": "3px",
                } as React.CSSProperties
              }
            >
              Thema Documentation + User Guide
            </Underline>
            <br></br>
            <br></br>
            <Underline
              href="https://krv-analytics.github.io/retire/"
              style={
                {
                  "--underline-size": "3px",
                  "--underline-color": "#ada8a8",
                } as React.CSSProperties
              }
            >
              Retire Docs (walkthroughs for coal retirement analysis using
              Thema)
            </Underline>
            <br></br>
            <br></br>
            <Underline
              href="https://github.com/Krv-Analytics/Thema"
              style={
                {
                  "--underline-size": "3px",
                  "--underline-color": "#dbd5d5",
                } as React.CSSProperties
              }
            >
              Thema GitHub Repository
            </Underline>
          </h3>
        </article>
      </div>
    </section>
  );
}
