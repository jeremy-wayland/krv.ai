"use client";
import React from "react";
import PanelData from "./PanelData";
import SingleFeature from "./SinglePanel";
import SectionHeader from "../Common/SectionHeader";

const WhatWeBring = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "WHAT WE BRING",
              subtitle: "Unified Data Architecture 📊",
              description: `Krv Analytics transforms your enterprise data stack into an adaptive, AI-native framework. Rather than a one-size-fits-all solution, we roadmap infrastructure using a dynamic knowledge graph—then build purpose-specific agents and multimodal workflows for your data needs.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {/* <!-- Features item Start --> */}

            {PanelData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default WhatWeBring;
