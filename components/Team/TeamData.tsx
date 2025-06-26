//components/Team/TeamData.tsx
import { TeamMember } from "@/types/team";

export const TeamData: TeamMember[] = [
  {
    _id: 1,
    name: "Jeremy Wayland",
    role: "Co-Founder",
    headshot: "/images/team/jerm_hs.png",
    linkedInUrl: "https://www.linkedin.com/in/jeremy-wayland/",
    keyAchievements: [
      "PhD Candidate – Geometric Deep Learning",
      "YCombinator AI Start-Up School Grad",
      "Ex-Research Scientist, CHOC Children's",
    ],
    education: "",
  },
  {
    _id: 2,
    name: "Sidney Gathrid",
    role: "Co-Founder",
    headshot: "/images/team/sid_hs.png",
    linkedInUrl: "https://www.linkedin.com/in/sidney-gathrid/",
    keyAchievements: [
      "Ex-Heliogen (AI + Solar Thermal Startup)",
      "Builder of Fast, Scalable Data Infrastructure",
      "Clean Energy Engineer with Startup DNA",
    ],
    education: "",
  },
  {
    _id: 3,
    name: "Stuart Wayland",
    role: "Co-Founder",
    headshot: "/images/team/stu_hs.png",
    linkedInUrl: "https://www.linkedin.com/in/stuart-wayland-96b621253/",
    keyAchievements: [
      "PhD Candidate – Quantum Algorithms (UCSC)",
      "Mentor at Quantifying Gerrymanderg Project",
      "Ex-Software Developer at UCSB Allosphere",
    ],
    education: "",
  },
];
export default TeamData;
