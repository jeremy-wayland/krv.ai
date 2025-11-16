import { NewsItem, sortNewsDesc } from "@/types/news";

const rawNews: NewsItem[] = [
  {
    id: "2025-11-15-nucleate-biohack-novartis-challenge",
    date: "2025-11-15",
    title: "First place in Novartis Challenge at Nucleate BioHack 2025",
    summary:
      "Jeremy and team won first place in the Novartis Challenge by developing a geometric deep learning pipeline for drug-target interaction prediction.",
    source: "Nucleate Germany",
    linkUrl: "https://www.biohack-munich.xyz/",
    linkLabel: "Nucleate BioHack",
    tags: [
      "Hackathon",
      "Drug Discovery",
      "Graph Neural Networks",
      "Novartis",
      "NanoTemper",
      "Spira Labs",
    ],
  },
  {
    id: "2025-10-30-futurity-americas-last-coal-power-plants",
    date: "2025-10-30",
    title:
      "Futurity covers Nature Energy study on America's remaining coal-power plants",
    summary:
      "The article cover's a study on classifying U.S. coal-fired plants into typologies using Krv's THEMA framework.",
    source: "Futurity",
    linkUrl:
      "https://www.futurity.org/americas-last-coal-power-plants-3303022/?utm_source=rss&utm_medium=rss&utm_campaign=americas-last-coal-power-plants-3303022",
    linkLabel: "Read Article",
    tags: ["press", "publication"],
  },

  {
    id: "2025-10-27-eurekalert-nature-energy",
    date: "2025-10-27",
    title:
      "EurekAlert! covers Nature Energy paper on accelerating coal retirement",
    summary:
      "Research featured on AAAS's official press release platform, highlighting data-driven framework for faster U.S. coal phaseout.",
    source: "EurekAlert! (AAAS)",
    linkUrl: "https://www.eurekalert.org/news-releases/1103317",
    linkLabel: "Read Article",
    tags: ["press", "publication"],
  },
  {
    id: "2025-10-24-berkeley-skydeck-pad13",
    date: "2025-10-24",
    title: "Krv joins Berkeley SkyDeck’s Pad 13 accelerator program",
    source: "Berkeley SkyDeck",
    tags: ["accelerator", "program"],
  },
  {
    id: "2025-10-23-nature-energy",
    date: "2025-10-23",
    title: "Nature Energy paper and research briefing are published",
    summary:
      "Peer-reviewed paper on scalable risk valuation for energy infrastructure.",
    source: "Nature Energy",
    linkUrl: "/academia/coal",
    linkLabel: "Find out more",
    tags: ["publication", "energy"],
    featured: true,
  },
  {
    id: "2025-10-22-code-releases",
    date: "2025-10-22",
    title: "New releases of Thema and Retire",
    summary:
      "The team released Thema v0.1.3 and Retire v0.1.1—open-source tools that support research to accelerate the coal phaseout.",
    linkLabel: "View on GitHub",
    linkUrl: "https://github.com/Krv-Analytics/retire/releases/tag/v0.1.1",
    source: "GitHub",
    tags: ["software", "opensource", "python"],
  },

  {
    id: "2025-09-23-tum-affiliate",
    date: "2025-09-23",
    title: "Krv accepted as affiliate to TUM Venture Labs Healthcare",
    source: "TUM Venture Labs Healthcare",
    tags: ["partnership", "healthcare"],
  },
  {
    id: "2025-08-07-neo4j-startup",
    date: "2025-08-07",
    title: "Krv accepted into Neo4j Startup Program",
    source: "Neo4j",
    tags: ["program", "partnership"],
  },
  {
    id: "2025-06-16-yc-ai-startup-school",
    date: "2025-06-16",
    title: "Jeremy attends YC AI Startup School in San Francisco",
    source: "Y Combinator",
    tags: ["event", "YC"],
  },
  {
    id: "2025-03-11-nature-energy-accept",
    date: "2025-03-11",
    title: "Decision to Accept from Nature Energy reviewers",
    summary: "Krv team and collaborators are notified of acceptance decision.",
    source: "Nature Energy",
    tags: ["publication", "acceptance"],
  },
];

export const NewsData: NewsItem[] = sortNewsDesc(rawNews);

export default NewsData;
