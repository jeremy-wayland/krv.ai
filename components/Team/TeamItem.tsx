// components/Team/TeamItem.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TeamMember } from "@/types/blog";

// A simple checkmark icon for achievements
const AchievementIcon = () => (
  <svg
    className="h-5 w-5 flex-shrink-0 text-primary"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// A simple LinkedIn icon
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TeamItem = ({ member }: { member: TeamMember }) => {
  const { name, role, headshot, linkedInUrl, keyAchievements, education } =
    member;

  // Animation variants for the card
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col rounded-xl bg-white p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-solid-8 dark:border dark:border-gray-800 dark:bg-blacksection dark:shadow-none"
    >
      <div className="flex items-center space-x-5">
        <div className="relative h-48 w-40 flex-shrink-0">
          <Image
            src={headshot}
            alt={name}
            fill
            className="rounded-xl border-2 border-white object-cover shadow-md dark:border-gray-700"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black dark:text-white">
            {name}
          </h3>
          <p className="text-md">{role}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
        <ul className="space-y-3">
          {keyAchievements.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <AchievementIcon />
              <span className="text-sm text-gray-800 dark:text-gray-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">{education}</p>
        <Link
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors duration-300 hover:text-primary dark:hover:text-primary"
          aria-label={`${name}'s LinkedIn Profile`}
        >
          <LinkedInIcon />
        </Link>
      </div>
    </motion.div>
  );
};

export default TeamItem;
