"use client";

import React, { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

const phrases = [
  "Deployable finance AI, no fluff.",
  "Live signals from your own data.",
  "Explainable models with ready APIs.",
];

export default function FinanceScramble() {
  const [index, setIndex] = useState(0);

  const { ref, replay } = useScramble({
    text: phrases[index],
    speed: 0.75,
    tick: 1,
    scramble: 15,
    playOnMount: true,
  });

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
