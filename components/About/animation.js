import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ReactSVG } from "react-svg";

const AnimatedKnowledgeGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      "#edge1, #edge2, #edge3, #edge4",
      {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeDashoffset: (i, target) => target.getTotalLength(),
      },
      {
        strokeDashoffset: 0,
        duration: 5,
        ease: "power2.out",
        stagger: 1, // Stagger the animation of each edge
        repeat: -1, // Repeat infinitely
        yoyo: true, // Go back to original state after each loop
      },
    );
  }, []);

  return (
    <div>
      <svg
        ref={svgRef}
        width="600"
        height="400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Nodes */}
        <circle cx="100" cy="100" r="10" fill="blue" id="node1" />
        <circle cx="500" cy="100" r="10" fill="blue" id="node2" />
        <circle cx="300" cy="300" r="10" fill="blue" id="node3" />
        <circle cx="100" cy="300" r="10" fill="blue" id="node4" />

        {/* Connections (Edges) */}
        <path
          id="edge1"
          d="M 100 100 L 500 100"
          fill="none"
          stroke="gray"
          strokeWidth="2"
        />
        <path
          id="edge2"
          d="M 100 100 L 300 300"
          fill="none"
          stroke="gray"
          strokeWidth="2"
        />
        <path
          id="edge3"
          d="M 500 100 L 300 300"
          fill="none"
          stroke="gray"
          strokeWidth="2"
        />
        <path
          id="edge4"
          d="M 100 300 L 300 300"
          fill="none"
          stroke="gray"
          strokeWidth="2"
        />

        {/* Labels (Optional) */}
        <text x="100" y="90" fontSize="12" fill="black">
          Node 1
        </text>
        <text x="500" y="90" fontSize="12" fill="black">
          Node 2
        </text>
        <text x="300" y="290" fontSize="12" fill="black">
          Node 3
        </text>
        <text x="100" y="290" fontSize="12" fill="black">
          Node 4
        </text>
      </svg>
    </div>
  );
};

export default AnimatedKnowledgeGraph;


// ## --> YOOOHOOO

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pageData = [
  "Chats & Emails",
  "Transactions",
  "Reports",
  "Customer Feedback",
  "Sensor Logs",
  "Marketing Data",
];

const finalOutput = "Krv Cosmic Graph";

const nodeSpacing = 60;

const CosmicBakeryAnimation = () => {
  const [activePages, setActivePages] = useState([]);
  const [finalView, setFinalView] = useState(false);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < pageData.length) {
        setActivePages((prev) => [...prev, pageData[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setFinalView(true), 1000);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border bg-white p-6 shadow-md">
      {/* Animated Input Pages */}
      {activePages.map((text, i) => (
        <motion.div
          key={text}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: 100 + (i % 2) * 100,
            y: i * nodeSpacing,
            opacity: 1,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute rounded-md border border-blue-300 bg-blue-100 px-4 py-2 text-blue-900 shadow-sm"
        >
          {text}
        </motion.div>
      ))}

      {/* Transition to Knowledge Graph */}
      <AnimatePresence>
        {finalView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <div className="rounded-xl bg-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-xl">
              {finalOutput}
            </div>
            <svg
              className="pointer-events-none absolute left-0 top-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {activePages.map((_, i) => (
                <line
                  key={i}
                  x1={100 + (i % 2) * 100 + 100}
                  y1={i * nodeSpacing + 20}
                  x2={window.innerWidth / 2}
                  y2={250}
                  stroke="#a78bfa"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CosmicBakeryAnimation;
