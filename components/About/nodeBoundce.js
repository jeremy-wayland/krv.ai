import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
// MotionPathPlugin is not strictly needed for simple x/y animation, but harmless to keep registered
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import seedrandom from "seedrandom";

// gsap.registerPlugin(MotionPathPlugin); // Keep if you might use motion paths later

const COLORS = {
  BASE: "#2D3748", // Dark gray for static nodes
  NEW: ["#48BB78", "#4299E1", "#F6AD55", "#9F7AEA"], // Green, Blue, Orange, Purple for animated nodes
  EDGE: "rgba(160, 174, 192, 0.4)", // Light gray for edges
  GLOW: "rgba(237, 137, 54, 0.3)", // Orange glow (example, not used in current logic)
};

const NODES = [
  { id: 1, x: 188, y: 256, connections: [2, 3, 4, 5, 6, 7] },
  { id: 2, x: 188, y: 6, connections: [1, 3, 7] },
  { id: 3, x: 313, y: 131, connections: [1, 2, 4] },
  { id: 4, x: 313, y: 381, connections: [1, 3, 5] },
  { id: 5, x: 188, y: 506, connections: [1, 4, 6] },
  { id: 6, x: 63, y: 381, connections: [1, 5, 7] },
  { id: 7, x: 63, y: 131, connections: [1, 2, 6] },
];

const EDGES = [
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 7],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 2],
];

// Define starting off-screen positions and initial target nodes
const START_POSITIONS = [
  { x: 188, y: -30, initialTargetId: 2 }, // Start above Top node
  { x: 405, y: 406, initialTargetId: 4 }, // Start right of Bottom-Right node
  { x: 188, y: 842, initialTargetId: 5 }, // Start below Bottom node
  { x: -30, y: 406, initialTargetId: 6 }, // Start left of Bottom-Left node
];

const AnimatedMCMCGraph = () => {
  const svgRef = useRef();
  // Store refs to the animated node elements
  const nodeRefs = useRef([]);
  const rng = useRef(seedrandom("complex-mcmc-smooth")); // Use ref to keep same generator instance

  const [nodes, setNodes] = useState(() =>
    START_POSITIONS.map((start, index) => ({
      id: 8 + index, // Unique IDs starting from 8
      color: COLORS.NEW[index % COLORS.NEW.length],
      currentNodeId: start.initialTargetId, // Where it will first arrive
      moves: 0,
      startPosition: { x: start.x, y: start.y },
      initialTargetId: start.initialTargetId,
    })),
  );

  // Helper function to get static node data
  const getStaticNode = useCallback((id) => NODES.find((n) => n.id === id), []);

  // Function to fade out, reset position, update state, and restart animation
  const fadeOutAndResetNode = useCallback(
    (nodeIndex) => {
      const nodeData = nodes[nodeIndex];
      const nodeElement = nodeRefs.current[nodeIndex];
      if (!nodeElement) return;

      // console.log(`Node ${nodeData.id}: Fading out and resetting.`);

      gsap.to(nodeElement, {
        opacity: 0,
        duration: 2,
        ease: "power1.in",
        onComplete: () => {
          // Instantly move back to start position
          gsap.set(nodeElement, {
            x: nodeData.startPosition.x,
            y: nodeData.startPosition.y,
          });

          // Update state for reset
          setNodes((prevNodes) =>
            prevNodes.map((n, i) =>
              i === nodeIndex
                ? {
                    ...n,
                    moves: 0,
                    currentNodeId: n.initialTargetId, // Reset to initial target
                  }
                : n,
            ),
          );

          // Trigger animation start from the reset state AFTER state update
          // Use a slight delay or requestAnimationFrame to ensure state is processed before next animation starts
          requestAnimationFrame(() => animateNode(nodeIndex));
        },
      });
    },
    [nodes],
  ); // Dependency array includes 'nodes' to get latest data, though nodeIndex is key

  // --- Core Animation Function ---
  const animateNode = useCallback(
    (nodeIndex) => {
      // Use requestAnimationFrame to ensure previous updates are rendered
      // requestAnimationFrame(() => { // May not be necessary with useCallback structure
      const nodeData = nodes[nodeIndex];
      const nodeElement = nodeRefs.current[nodeIndex];

      // Exit if element doesn't exist (e.g., during unmount)
      if (!nodeElement) return;

      // console.log(`Node ${nodeData.id}: Starting move ${nodeData.moves + 1} from node ${nodeData.currentNodeId}`);

      // Check if max moves reached BEFORE this move
      if (nodeData.moves >= 4) {
        // console.log(`Node ${nodeData.id}: Max moves reached (${nodeData.moves}), starting fade out.`);
        fadeOutAndResetNode(nodeIndex);
        return; // Stop this animation sequence
      }

      // Determine the *next* static node to move to
      const currentStaticNode = getStaticNode(nodeData.currentNodeId);
      if (!currentStaticNode) {
        console.error(
          `Cannot find static node with ID: ${nodeData.currentNodeId}`,
        );
        return; // Safety check
      }

      const connections = currentStaticNode.connections;
      const nextNodeId =
        connections[Math.floor(rng.current() * connections.length)];
      const targetStaticNode = getStaticNode(nextNodeId);

      if (!targetStaticNode) {
        console.error(`Cannot find target static node with ID: ${nextNodeId}`);
        return; // Safety check
      }

      // Animate TO the target node's position (GSAP animates FROM current position)
      gsap.to(nodeElement, {
        x: targetStaticNode.x,
        y: targetStaticNode.y,
        opacity: 1, // Ensure node is visible (for fade-in after reset)
        duration: 2 + rng.current() * 1.5,
        ease: "sine.inOut",
        onComplete: () => {
          // console.log(`Node ${nodeData.id}: Move ${nodeData.moves + 1} completed. Arrived at ${nextNodeId}.`);
          // Update state AFTER animation completes
          setNodes((prevNodes) =>
            prevNodes.map((n, i) =>
              i === nodeIndex
                ? {
                    ...n,
                    currentNodeId: nextNodeId, // Update current location
                    moves: n.moves + 1, // Increment move count
                  }
                : n,
            ),
          );

          // Trigger the next animation step AFTER state update
          // Use requestAnimationFrame to ensure state update is processed
          requestAnimationFrame(() => animateNode(nodeIndex));
        },
      });
      // }); // End of requestAnimationFrame if used
    },
    [nodes, fadeOutAndResetNode, getStaticNode],
  ); // Dependencies for useCallback

  // --- useEffect for Initial Setup and Cleanup ---
  useEffect(() => {
    // Set initial positions for all nodes using GSAP
    nodes.forEach((node, index) => {
      const nodeElement = nodeRefs.current[index];
      if (nodeElement) {
        gsap.set(nodeElement, {
          x: node.startPosition.x,
          y: node.startPosition.y,
          opacity: 0, // Start invisible before first animation
        });
        // console.log(`Node ${node.id}: Initial position set to (${node.startPosition.x}, ${node.startPosition.y})`);
      }
    });

    // Start the animation loop for each node
    nodes.forEach((_, index) => {
      // Use setTimeout to slightly stagger starts or ensure setup is complete
      setTimeout(() => animateNode(index), 100 + index * 50); // Small delay + stagger
    });

    // Cleanup function: Kill all tweens associated with the node elements on unmount
    return () => {
      // console.log("Cleaning up animations...");
      nodeRefs.current.forEach((element) => {
        if (element) {
          gsap.killTweensOf(element);
        }
      });
    };
  }, []); // Run only once on mount

  // --- SVG Rendering ---
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 375 812" // Optimized viewport
      style={{
        width: "100%",
        maxWidth: "375px", // Max width constraint
        height: "80vh", // Adjust height as needed
        maxHeight: "812px",
        display: "block",
        margin: "auto",
      }}
    >
      {/* Render Edges first (background) */}
      {EDGES.map(([fromId, toId]) => {
        const fromNode = getStaticNode(fromId);
        const toNode = getStaticNode(toId);
        if (!fromNode || !toNode) return null; // Safety check
        return (
          <line
            key={`edge-${fromId}-${toId}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={COLORS.EDGE}
            strokeWidth="1"
            strokeDasharray="2 4"
            // strokeDasharray="2 4" // Optional dashed lines
          />
        );
      })}

      {/* Render Static Base Nodes */}
      {NODES.map((node) => (
        <g key={`base-${node.id}`} transform={`translate(${node.x},${node.y})`}>
          <circle r="5" fill={COLORS.BASE} />
          {/* Optional outer ring for static nodes */}
          <circle
            r="7"
            fill="transparent"
            stroke={COLORS.BASE}
            strokeWidth="0.5"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Render Animated Nodes */}
      {nodes.map((node, index) => (
        // Use a <g> group for easier translation/transformation
        <g
          key={node.id}
          // Assign ref to the group element
          ref={(el) => (nodeRefs.current[index] = el)}
          // GSAP will control transform/opacity, no need to set here dynamically
        >
          <circle r="6" fill={node.color} />
          {/* Optional outer ring */}
          <circle
            r="9"
            fill="transparent"
            stroke={node.color}
            strokeWidth="1"
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  );
};

export default AnimatedMCMCGraph;
