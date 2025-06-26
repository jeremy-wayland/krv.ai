// components/Team/index.tsx
"use client";

import { motion } from "framer-motion";
import { TeamData } from "./TeamData";
import TeamItem from "./TeamItem";

// Staggered animation container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Controls delay between each item's animation
      when: "beforeChildren", // Ensures parent animation starts first
    },
  },
};

export const Team = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Only animate once
      className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
    >
      {TeamData.map((member) => (
        <TeamItem key={member._id} member={member} />
      ))}
    </motion.div>
  );
};
