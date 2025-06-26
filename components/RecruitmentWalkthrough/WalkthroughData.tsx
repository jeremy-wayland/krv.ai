//components/RecruitmentWalkthrough/WalkthroughData.tsx
import { WalkthroughTab } from "@/types/walkthroughtab";

const WalkThroughData: WalkthroughTab[] = [
  {
    id: "tabOne",
    title: "Understand Fit Like Never Before",
    desc1: `Great recruiting isn't just about resumes—it's about understanding fit. Our graph-based engine captures deep contextual insights from your past placements: who thrived, under what conditions, in which teams, and why.`,
    desc2: `Instead of keyword matches, Krv identifies candidates based on true compatibility—surfacing hidden patterns and high-potential fits your team would otherwise miss.`,
    image: "/images/features/searchWcontext.svg",
    imageDark: "/images/features/searchWcontext.svg",
  },
  {
    id: "tabTwo",
    title: "Smarter Candidate Discovery",
    desc1: `Recruiting data is messy—spread across notes, CRMs, resumes, and interviews. Krv transforms this data into a structured graph that reveals connections traditional systems ignore.`,
    desc2: `Find candidates who succeeded in similar roles, under similar managers, or in similar industries—even if they never applied. It’s proactive, precision-matching at scale.`,
    image: "/images/features/candidateDiscovery.svg",
    imageDark: "/images/features/candidateDiscovery.svg",
  },
  {
    id: "tabThree",
    title: "Context-Aware Search",
    desc1: `Stop digging through lists. Our graph search engine understands nuance—so you can search with intent, not just keywords.`,
    desc2: `Looking for someone who worked under a certain leader, in a fast-scaling company, and succeeded in high-pressure environments? Krv connects the dots instantly, delivering highly relevant, context-rich candidate results.`,
    image: "/images/UIs/ui_mockup2.svg",
    imageDark: "/images/UIs/ui_mockup2.svg",
  },
];

export default WalkThroughData;
