import { FeatureTab } from "@/types/featureTab";

const featuresTabData: FeatureTab[] = [
  {
    id: "tabOne",
    title: "Understanding Nodes and Edges",
    desc1: [
      <strong key="desc1-bold">1)</strong>,
      <span key="desc1-text"> Nodes represent objects </span>,
      <em key="desc1-italic"> (companies in this case)</em>,
    ],
    desc2: [
      <strong key="desc2-bold">2)</strong>,
      <span key="desc2-text">
        {" "}
        Edges represent multi-dimensional relationships{" "}
      </span>,
      <em key="desc2-italic"> (similarities between companies)</em>,
    ],
    desc3: [
      <strong key="desc3-bold">3)</strong>,
      <span key="desc3-text">
        Groups are non-intersecting sets of similar objects
      </span>,
      <em key="desc3-italic">
        (similar companies across multiple dimensions)
      </em>,
    ],
    image: "/images/features/readingGraphs.svg",
    imageDark: "/images/features/readingGraphsDark.svg",
  },
  {
    id: "tabTwo",
    title: "Smarter Candidate Discovery",
    desc1: `The graph to the right visualizes stock performance over the past 36 months for companies held in various prominent investment portfolios.`,
    desc2: `The data consists of tabular, time-series financial metrics, including stock performance, for companies in portfolios managed by Berkshire Hathaway (Warren Buffett), ARK Innovation ETF (Cathie Wood), Bridgewater Associates (Ray Dalio), Fidelity Magellan Fund (Peter Lynch), and Daily Journal Corporation (Charlie Munger). The data is publicly available on Yahoo Finance.`,
    image: "/images/features/hudsonBayDemo.svg",
    imageDark: "/images/features/hudsonBayDemoDark.svg",
  },
  {
    id: "tabThree",
    title: "Our Model Finds JPM and WFC have Different Company Archetypes.",
    desc1: `While JPM and WFC are traditionally considered comps as major U.S. banks, our graph intelligence identifies key differences that challenge this assumption and places them in different groups.`,
    desc2: `JPM's global reach, investment banking strength, and fintech investments set it apart from WFC's domestically focused, traditional lending model.`,
    image: "/images/features/takeaway.svg",
    imageDark: "/images/features/takeawayDark.svg",
  },
];

export default featuresTabData;
