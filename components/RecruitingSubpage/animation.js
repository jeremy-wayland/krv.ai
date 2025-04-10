// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// gsap.registerPlugin(MotionPathPlugin);

// const GraphRecruiterAnimation = () => {
//   const timeline = useRef();
//   const graphNodes = useRef([]);
//   const dataStream = useRef([]);
//   const searchBeam = useRef(null);
//   const connectorLines = useRef([]);
//   const candidateNode = useRef(null);

//   useEffect(() => {
//     timeline.current = gsap.timeline({ repeat: -1, repeatDelay: 2 });

//     // Phase 1: Data integration animation
//     timeline.current.from(dataStream.current, {
//       x: -100,
//       opacity: 0,
//       stagger: 0.3,
//       duration: 1,
//       ease: "power2.out",
//     });

//     // Phase 2: Graph formation
//     timeline.current.to(
//       graphNodes.current,
//       {
//         opacity: 1,
//         scale: 1,
//         stagger: 0.2,
//         duration: 2.8,
//         ease: "back.out(1.7)",
//       },
//       "-=0.5",
//     );

//     // Phase 3: Connection lines drawing
//     timeline.current.to(
//       connectorLines.current,
//       {
//         strokeDashoffset: 0,
//         duration: 1.5,
//         ease: "power2.inOut",
//       },
//       "-=0.3",
//     );

//     // Phase 4: Search pulse animation
//     timeline.current.to(
//       searchBeam.current,
//       {
//         attr: { r: 80 },
//         opacity: 0,
//         duration: 2,
//         ease: "power2.out",
//       },
//       "+=0.5",
//     );

//     // Phase 5: Candidate match highlight
//     timeline.current.to(candidateNode.current, {
//       keyframes: [
//         { scale: 1.5, fill: "#48BB78", duration: 0.5 },
//         { boxShadow: "0 0 20px #48BB78", duration: 0.8 },
//       ],
//       repeat: 1,
//       yoyo: true,
//       ease: "power1.inOut",
//     });

//     // Text animations
//     const textBlocks = [
//       "Transforming recruiting data...",
//       "Building context-rich graph...",
//       "Analyzing cultural patterns...",
//       "Matching hidden connections...",
//       "Found high-potential candidate!",
//     ];

//     textBlocks.forEach((text, i) => {
//       timeline.current.to(
//         ".animated-text",
//         {
//           duration: 2.8,
//           text: text,
//           ease: "none",
//           delay: i === 0 ? 0 : 0.5,
//         },
//         i * 1.2,
//       );
//     });

//     return () => timeline.current.kill();
//   }, []);

//   return (
//     <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%" }}>
//       {/* Data Sources */}
//       <g
//         ref={(el) => (dataStream.current[0] = el)}
//         transform="translate(50, 100)"
//         opacity="0"
//       >
//         <rect width="60" height="60" rx="12" fill="#1E293B" />
//         <text x="30" y="35" fill="#94A3B8" textAnchor="middle" fontSize="14">
//           Resumes
//         </text>
//       </g>

//       <g
//         ref={(el) => (dataStream.current[1] = el)}
//         transform="translate(50, 180)"
//         opacity="0"
//       >
//         <rect width="60" height="60" rx="12" fill="#1E293B" />
//         <text x="30" y="35" fill="#94A3B8" textAnchor="middle" fontSize="14">
//           CRMs
//         </text>
//       </g>

//       {/* Knowledge Graph Visualization */}
//       <g transform="translate(300, 250)">
//         {/* Central Role Node */}
//         <circle
//           ref={(el) => (graphNodes.current[0] = el)}
//           cx="0"
//           cy="0"
//           r="30"
//           fill="#475569"
//           opacity="0"
//         />

//         {/* Connected Nodes */}
//         <circle
//           ref={(el) => (graphNodes.current[1] = el)}
//           cx="150"
//           cy="-100"
//           r="20"
//           fill="#38BDF8"
//           opacity="0"
//         >
//           <text x="-20" y="-21" fill="black" fontSize="12" textAnchor="middle">
//             Skills
//           </text>
//         </circle>

//         <circle
//           ref={(el) => (graphNodes.current[2] = el)}
//           cx="-120"
//           cy="80"
//           r="20"
//           fill="#FBBF24"
//           opacity="0"
//         >
//           <text x="-120" y="80" fill="white" fontSize="12" textAnchor="middle">
//             Culture
//           </text>
//         </circle>

//         <circle
//           ref={(el) => (graphNodes.current[3] = el)}
//           cx="100"
//           cy="120"
//           r="20"
//           fill="#34D399"
//           opacity="0"
//         >
//           <text x="100" y="120" fill="white" fontSize="12" textAnchor="middle">
//             Experience
//           </text>
//         </circle>

//         {/* Candidate Match Node */}
//         <circle
//           ref={candidateNode}
//           cx="0"
//           cy="180"
//           r="25"
//           fill="#475569"
//           opacity="0"
//         >
//           <animate
//             attributeName="opacity"
//             from="0"
//             to="1"
//             dur="1s"
//             begin="4s"
//             fill="freeze"
//           />
//         </circle>

//         {/* Connection Paths */}
//         <path
//           ref={(el) => (connectorLines.current[0] = el)}
//           d="M0,0 L150,-100"
//           stroke="#334155"
//           strokeWidth="2"
//           strokeDasharray="200"
//           strokeDashoffset="200"
//         />
//         <path
//           ref={(el) => (connectorLines.current[1] = el)}
//           d="M0,0 L-120,80"
//           stroke="#334155"
//           strokeWidth="2"
//           strokeDasharray="200"
//           strokeDashoffset="200"
//         />
//         <path
//           ref={(el) => (connectorLines.current[2] = el)}
//           d="M0,0 L100,120"
//           stroke="#334155"
//           strokeWidth="2"
//           strokeDasharray="200"
//           strokeDashoffset="200"
//         />
//       </g>

//       {/* Search Pulse */}
//       <circle
//         ref={searchBeam}
//         cx="300"
//         cy="250"
//         r="20"
//         fill="none"
//         stroke="#818CF8"
//         strokeWidth="2"
//         opacity="0"
//       />

//       {/* Contextual Search Elements */}
//       <g transform="translate(600, 100)">
//         <rect width="160" height="160" rx="20" fill="#1E293B" />
//         <foreignObject x="20" y="20" width="120" height="120">
//           <div
//             className="animated-text"
//             style={{
//               color: "#E2E8F0",
//               fontSize: "16px",
//               lineHeight: "1.4",
//               fontFamily: "system-ui",
//             }}
//           ></div>
//         </foreignObject>
//       </g>

//       {/* Legendary Companies Icons */}
//       <g transform="translate(600, 300)">
//         <circle cx="0" cy="0" r="15" fill="#3B82F6" />
//         <circle cx="40" cy="0" r="15" fill="#10B981" />
//         <circle cx="80" cy="0" r="15" fill="#F59E0B" />
//         <text x="-20" y="-21" fill="#94A3B8" fontSize="12">
//           Past Successes:
//         </text>
//       </g>

//       {/* Animated Connections */}
//       <path
//         d="M300,250 Q450,200 600,180"
//         stroke="#4F46E5"
//         strokeWidth="2"
//         opacity="0.6"
//       >
//         <animate
//           attributeName="stroke-dashoffset"
//           from="500"
//           to="0"
//           dur="2s"
//           repeatCount="indefinite"
//         />
//       </path>
//     </svg>
//   );
// };

// export default GraphRecruiterAnimation;

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const CleanRecruiterAnimation = () => {
  const nodes = useRef([]);
  const connections = useRef([]);
  const candidate = useRef(null);
  const statusText = useRef(null);
  const tl = useRef();

  // Node positions
  const positions = [
    { id: "main", x: 400, y: 200 }, // Center
    { id: "Culture", x: 200, y: 100 }, // Top-left
    { id: "Skills", x: 600, y: 100 }, // Top-right
    { id: "Experience", x: 200, y: 300 }, // Bottom-left
    { id: "Past Placements", x: 600, y: 300 }, // Bottom-right
    { id: "candidate", x: 400, y: 400 }, // Initial candidate position
  ];

  useEffect(() => {
    tl.current = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animate main node from top
    tl.current.from(nodes.current[0], {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onStart: () => updateStatus("Analyzing role requirements..."),
    });

    // Animate culture nodes from sides
    tl.current.from(
      nodes.current.slice(1, 5),
      {
        x: (i) => (i % 2 ? 100 : -100),
        opacity: 0,
        stagger: 0.2,
        duration: 2.8,
        ease: "power2.out",
        onStart: () => updateStatus("Mapping company culture..."),
      },
      "-=0.5",
    );

    // Draw connection lines
    tl.current.to(
      connections.current,
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        onStart: () => updateStatus("Establishing connections..."),
      },
      "-=0.3",
    );

    // Animate candidate entry
    tl.current.from(candidate.current, {
      y: 100,
      opacity: 0,
      duration: 2.8,
      ease: "back.out(1.7)",
      onStart: () => updateStatus("Identifying potential matches..."),
    });

    // Selection animation
    tl.current.to(candidate.current, {
      keyframes: [
        { scale: 1.2, fill: "#48BB78", duration: 1.3 },
        { stroke: "#48BB78", strokeWidth: 2, duration: 1.5 },
      ],
      repeat: 1,
      yoyo: true,
      onStart: () => updateStatus("Found ideal candidate!"),
    });

    // Draw candidate connection
    tl.current.to(
      "#candidate-conn",
      {
        strokeDashoffset: 0,
        duration: 2.8,
        ease: "power2.out",
      },
      "-=0.5",
    );

    return () => tl.current.kill();
  }, []);

  const updateStatus = (text) => {
    gsap.to(statusText.current, {
      duration: 1.3,
      opacity: 0,
      onComplete: () => {
        statusText.current.textContent = text;
        gsap.to(statusText.current, { opacity: 1 });
      },
    });
  };

  return (
    <svg viewBox="0 0 800 500" style={{ width: "100%", height: "100%" }}>
      {/* Connection Lines */}
      {[
        { d: "M400,200 200,100", id: "conn1" },
        { d: "M400,200 600,100", id: "conn2" },
        { d: "M400,200 200,300", id: "conn3" },
        { d: "M400,200 600,300", id: "conn4" },
        { d: "M400,200 400,400", id: "candidate-conn" },
      ].map((conn, i) => (
        <path
          key={conn.id}
          ref={(el) => (connections.current[i] = el)}
          d={conn.d}
          stroke="#CBD5E1"
          strokeWidth="2"
          fill="none"
          strokeDasharray="200"
          strokeDashoffset="200"
        />
      ))}

      {/* Main Node */}
      <g
        ref={(el) => (nodes.current[0] = el)}
        transform={`translate(${positions[0].x},${positions[0].y})`}
      >
        <circle cx="0" cy="0" r="30" fill="#3B82F6" />
        <text x="0" y="40" textAnchor="middle" fill="#1E293B" fontSize="14">
          Role Requirements
        </text>
      </g>

      {/* Culture Nodes */}
      {positions.slice(1, 5).map((pos, i) => (
        <g
          key={pos.id}
          ref={(el) => (nodes.current[i + 1] = el)}
          transform={`translate(${pos.x},${pos.y})`}
        >
          <circle cx="0" cy="0" r="20" fill="#94A3B8" />
          <text x="0" y="25" textAnchor="middle" fill="#1E293B" fontSize="12">
            {pos.id.replace("culture", "Culture ")}
          </text>
        </g>
      ))}

      {/* Candidate Node */}
      <g
        ref={candidate}
        transform={`translate(${positions[5].x},${positions[5].y})`}
      >
        <circle cx="0" cy="0" r="25" fill="#64748B" />
        <text x="0" y="35" textAnchor="middle" fill="#1E293B" fontSize="14">
          Ideal Match
        </text>
      </g>

      {/* Status Text */}
      <text
        ref={statusText}
        x="400"
        y="480"
        textAnchor="middle"
        fill="#475569"
        fontSize="16"
        opacity="1"
      >
        Initializing system...
      </text>
    </svg>
  );
};

export default CleanRecruiterAnimation;
