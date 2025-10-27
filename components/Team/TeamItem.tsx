// components/Team/TeamItem.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TeamMember } from "@/types/team";

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
      className="group relative flex flex-col rounded-lg border border-white bg-white p-6 shadow-solid-3 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection"
    >
      <div className="flex items-center gap-5">
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-stroke dark:ring-strokedark">
          <Image
            src={headshot}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-waterloo dark:text-manatee">{role}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-stroke pt-5 dark:border-strokedark">
        <ul className="space-y-2.5">
          {keyAchievements.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <AchievementIcon />
              <span className="text-sm text-titlebgdark dark:text-waterloo">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        <p className="text-xs text-waterloo dark:text-manatee">{education}</p>
        <Link
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
          aria-label={`${name}'s LinkedIn Profile`}
        >
          <LinkedInIcon />
        </Link>
      </div>
    </motion.div>
  );
};

export default TeamItem;
