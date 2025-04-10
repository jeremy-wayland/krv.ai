import credit from "@/public/images/finance/credit.svg";
import creditDark from "@/public/images/finance/creditDark.svg";
import risk from "@/public/images/finance/risk.svg";
import riskDark from "@/public/images/finance/riskDark.svg";
import portfolio from "@/public/images/finance/portfolio.svg";
import portfolioDark from "@/public/images/finance/portfolioDark.svg";
import regulation from "@/public/images/finance/regulation.svg";
import regulationDark from "@/public/images/finance/regulationDark.svg";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Dynamic Portfolio Risk Mapping",
    designation: "Risk Managment",
    image: risk,
    imageDark: riskDark,
    content:
      "Leverage high-dimensional graph embeddings to reveal hidden risk patterns across portfolios. Our solution provides real-time insights into interconnected risk factors, enabling proactive mitigation and smarter, data-driven decision-making.",
  },
  {
    id: 2,
    name: "Public Comparables for Private Credit Analysis",
    designation: "Private Credit",
    image: credit,
    imageDark: creditDark,
    content:
      "Map private companies into the public domain by identifying high-dimensional similarities with established peers. This approach allows investors to benchmark private credit performance against public market dynamics, leading to more accurate risk predictions and enhanced credit due diligence.",
  },
  {
    id: 3,
    name: "Diversity & Concentration Analysis",
    designation: "Portfolio Diversity",
    image: portfolio,
    imageDark: portfolioDark,
    content:
      "Unify disparate data sources to evaluate portfolio diversity comprehensively. By uncovering subtle correlations between assets, our graph-based analytics identify potential concentration risks and highlight opportunities to achieve a more balanced, resilient investment strategy.",
  },
  {
    id: 4,
    name: "Compliance Risk Detection",
    designation: "Regulatory Compliance",
    image: regulation,
    imageDark: regulationDark,
    content:
      "Utilize graph-based analytics to uncover hidden compliance risks within your portfolio. By mapping the relationships between companies, regulatory requirements, and industry standards, our solution helps identify areas where your portfolio may be exposed to potential regulatory violations, enabling proactive adjustments to stay compliant and avoid costly penalties.",
  },
];
