import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const COLORS = {
  NODE1: "#043053",
  NODE2: "#146459",
  NODE3: "#FFBC00",
  EDGE: "#B0B0B0",
  FLOW: "#48BB78",
};

const NODES = [
  { id: 1, x: 15.7, y: 14.6 },
  { id: 2, x: 44.7, y: 21.9 },
  { id: 3, x: 32, y: 42.6 },
];

const EDGES = [
  { from: 1, to: 2 }, // Node 1 → Node 2
  { from: 2, to: 3 }, // Node 2 → Node 3
];

const AnimatedFlowGraph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const flowRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const createFlowAnimation = (element) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      // Forward flow: 1 → 2 → 3
      tl.to(element, {
        x: NODES[1].x,
        y: NODES[1].y,
        duration: 1.5,
        ease: "power1.inOut",
      })
        .to(element, {
          x: NODES[2].x,
          y: NODES[2].y,
          duration: 1.5,
          ease: "power1.inOut",
        })
        // Reverse flow: 3 → 2 → 1
        .to(element, {
          x: NODES[1].x,
          y: NODES[1].y,
          duration: 1.5,
          ease: "power1.inOut",
        })
        .to(element, {
          x: NODES[0].x,
          y: NODES[0].y,
          duration: 1.5,
          ease: "power1.inOut",
        });

      return tl;
    };

    // Animate 3 flow circles with staggered starts
    flowRefs.current.forEach((ref, i) => {
      gsap.set(ref, {
        x: NODES[0].x,
        y: NODES[0].y,
        opacity: 0,
      });

      const tl = gsap.timeline({ repeat: -1 });
      tl.delay(i * 0.8)
        .to(ref, { opacity: 1, duration: 0.2 })
        .add(createFlowAnimation(ref));
    });

    return () => {
      flowRefs.current.forEach((ref) => gsap.killTweensOf(ref));
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 64 64"
      style={{
        width: "64px",
        height: "64px",
      }}
    >
      {/* Static edges */}
      <line
        x1="19"
        y1="21"
        x2="31"
        y2="39"
        stroke={COLORS.EDGE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="45"
        y1="21"
        x2="33"
        y2="39"
        stroke={COLORS.EDGE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Static nodes */}
      <circle cx="15.7" cy="14.6" r="7" fill={COLORS.NODE1} />
      <circle cx="44.7" cy="21.9" r="7" fill={COLORS.NODE2} />
      <circle cx="32" cy="42.6" r="8" fill={COLORS.NODE3} />

      {/* Animated flow elements */}
      {[...Array(3)].map((_, i) => (
        <g
          key={i}
          ref={(el) => {
            flowRefs.current[i] = el;
          }}
          transform={`translate(${NODES[0].x},${NODES[0].y})`}
        >
          <circle r="2" fill={COLORS.FLOW} />
        </g>
      ))}
    </svg>
  );
};

export default AnimatedFlowGraph;
