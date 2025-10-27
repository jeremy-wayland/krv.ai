"use client";

import React, { useState, useEffect } from "react";
import { useScramble } from "use-scramble";
const phrases = [
  "Essential Middleware for Modern Tech Stacks",
  "Seamlessly Connect Enterprise Data to AI",
  "The Posix for AI Integrations",
  "One Abstraction Layer for Every System",
];

export default function HeroScramble() {
  const [index, setIndex] = useState(0);

  const { ref, replay } = useScramble({
    text: phrases[index],
    speed: 0.75,
    tick: 1,
    scramble: 15,
    playOnMount: true,
  });

  // Automatically cycle phrases every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      replay();
    }, 6000);
    return () => clearInterval(interval);
  }, [replay]);

  const handleHover = () => {
    replay();
  };

  return (
    <h4
      ref={ref}
      onMouseOver={handleHover}
      className="mb-4.5 cursor-pointer select-none text-lg font-medium text-black dark:text-white"
    />
  );
}
