import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import seedrandom from "seedrandom"; // Install seedrandom

const COLORS = {
  DATA: "#01375D",
  PROCESS: "#136F64",
  AI: "#FF4617",
  OUTPUT: "#FFC400",
  EDGE: "rgba(156, 156, 156, 0.3)",
  BG_NODE: "rgba(94, 94, 94, 0.3)",
  BG_EDGE: "#e0e0e0",
};

// Main graph nodes and edges (static)
const NODES = [
  { id: 1, x: 100, y: 100, label: "User Logs", type: "DATA" },
  { id: 2, x: 100, y: 200, label: "Spreadsheets", type: "DATA" },
  { id: 3, x: 100, y: 300, label: "App Data", type: "DATA" },
  { id: 4, x: 300, y: 200, label: "Krv Cosmic Graphs", type: "PROCESS" },
  { id: 5, x: 500, y: 200, label: "AI Insights", type: "AI" },
  { id: 6, x: 700, y: 100, label: "Answers", type: "OUTPUT" },
  { id: 7, x: 700, y: 200, label: "Predictions", type: "OUTPUT" },
  { id: 8, x: 700, y: 300, label: "Solutions", type: "OUTPUT" },
];

const EDGES = [
  [1, 4],
  [2, 4],
  [3, 4], // Data → Processing
  [4, 5], // Processing → AI
  [5, 6],
  [5, 7],
  [5, 8], // AI → Outputs
];

// Deterministic background nodes and edges
const generateBackgroundElements = (rng) => {
  const BG_NODES = Array.from({ length: 20 }).map((_, i) => ({
    id: 10 + i,
    x: 800 * rng(i),
    y: 400 * rng(i + 100),
    type: "BACKGROUND",
  }));

  const BG_EDGES = Array.from({ length: 30 }).map((_, i) => {
    const fromIndex = Math.floor(rng(i + 200) * BG_NODES.length);
    const toIndex = Math.floor(rng(i + 300) * BG_NODES.length);
    return [
      BG_NODES[fromIndex % BG_NODES.length].id,
      BG_NODES[toIndex % BG_NODES.length].id,
    ];
  });

  return { BG_NODES, BG_EDGES };
};

const AnimatedKnowledgeGraph = () => {
  const svgRef = useRef();
  const edgePaths = useRef([]);
  const bgEdgesRef = useRef([]);
  const [isClient, setIsClient] = useState(false);
  const [BG_NODES, setBG_NODES] = useState([]);
  const [BG_EDGES, setBG_EDGES] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const rng = seedrandom("background-seed"); // Seeded RNG
    const { BG_NODES, BG_EDGES } = generateBackgroundElements(rng);
    setBG_NODES(BG_NODES);
    setBG_EDGES(BG_EDGES);

    const svg = svgRef.current;

    // Main edge flow animation
    edgePaths.current.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 5,
        stagger: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    // Background pulse animation
    gsap.to(".bg-node", {
      scale: 1.2,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      stagger: 0.5,
    });

    // Background edge animation
    bgEdgesRef.current.forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.3 },
        {
          opacity: 0.7,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        },
      );
    });

    // Floating particles animation (client-only)
    gsap.to(".particle", {
      x: "+=100",
      y: "+=50",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      opacity: 0.6,
      stagger: {
        each: 0.5,
        from: "random",
      },
    });
  }, []);

  return (
    <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 800 400">
      {/* Background elements (deterministic so they match SSR and client) */}
      {BG_EDGES.map(([from, to], i) => {
        const start = BG_NODES.find((n) => n.id === from);
        const end = BG_NODES.find((n) => n.id === to);
        return (
          <line
            key={`bg-edge-${i}`}
            ref={(el) => (bgEdgesRef.current[i] = el)}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={COLORS.BG_EDGE}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
          />
        );
      })}

      {BG_NODES.map((node) => (
        <circle
          key={`bg-node-${node.id}`}
          className="bg-node"
          cx={node.x}
          cy={node.y}
          r="3"
          fill={COLORS.BG_NODE}
          opacity="0.4"
        />
      ))}

      {/* Main graph edges */}
      {EDGES.map(([fromId, toId], i) => {
        const from = NODES.find((n) => n.id === fromId);
        const to = NODES.find((n) => n.id === toId);
        const path = `M${from.x},${from.y} Q${(from.x + to.x) / 2} ${from.y}, ${to.x},${to.y}`;

        return (
          <path
            key={`edge-${i}`}
            ref={(el) => (edgePaths.current[i] = el)}
            d={path}
            stroke={COLORS.EDGE}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      })}

      {/* Main graph nodes */}
      {NODES.map((node) => {
        const colors = {
          DATA: COLORS.DATA,
          PROCESS: COLORS.PROCESS,
          AI: COLORS.AI,
          OUTPUT: COLORS.OUTPUT,
        }[node.type];

        return (
          <g
            key={node.id}
            className={`node ${node.type === "AI" ? "ai-core" : ""}`}
            transform={`translate(${node.x},${node.y})`}
          >
            {node.type === "AI" && (
              <circle r="32" fill={COLORS.AI} opacity="0.2" />
            )}
            <circle
              r={node.type === "AI" ? 24 : 16}
              fill={colors}
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              y={node.type === "AI" ? 45 : 35}
              textAnchor="middle"
              fill="#424242"
              fontFamily="Google Sans, sans-serif"
              fontSize="14"
              fontWeight="500"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* Floating particles (client-only) */}
      {isClient &&
        Array.from({ length: 15 }).map((_, i) => (
          <circle
            key={`particle-${i}`}
            className="particle"
            cx={Math.random() * 800}
            cy={Math.random() * 400}
            r="2"
            fill={COLORS.PROCESS}
            opacity="0"
          />
        ))}
    </svg>
  );
};

export default AnimatedKnowledgeGraph;
