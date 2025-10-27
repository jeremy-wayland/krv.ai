"use client";
import React from "react";
import PanelData from "./PanelData";
import SingleFeature from "./SinglePanel";
import SectionHeader from "../Common/SectionHeader";

const SecureByDesign = () => {
  return (
    <>
      {/* <!-- ===== Secure by Design Start ===== --> */}
      <section id="secure-by-design" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "SECURE BY DESIGN",
              subtitle: "Deployed in your environment, not ours.",
              description: `Krv deploys directly inside your cloud environment — behind your VPN and security perimeter. We spin up a complete, self-contained AI stack that connects to your live data endpoints without ever moving your data. Train, version, and deploy models in minutes, not months — all without opening your infrastructure to external access.`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {/* <!-- Secure by Design Feature Panels Start --> */}
            {PanelData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Secure by Design Feature Panels End --> */}
          </div>
        </div>
      </section>
      {/* <!-- ===== Secure by Design End ===== --> */}
    </>
  );
};

export default SecureByDesign;
