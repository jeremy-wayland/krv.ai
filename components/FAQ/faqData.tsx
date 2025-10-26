import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "Representation Learning",
    ans: "Our tech maps your entire data landscape—types, systems, and relationships—into a unified, live knowledge graph. This gives every workflow and model context about what data exists, where it lives, and how it connects, improving quality and accelerating downstream analysis.",
  },
  {
    id: 2,
    quest: "Automated Graph-Driven Workflows",
    ans: "Our generative graph models automatically spin up dynamic workflows from your stack: preprocessing, feature engineering, training, and deployment. It adapts to your systems without brittle ETL pipelines, so you get reliable, end-to-end automation.",
  },
  {
    id: 3,
    quest: "Instant API & Front-End Integration",
    ans: "Each trained model ships with a ready-to-use API. Plug it into your systems or custom UIs and trigger model runs as needed— Krv handles orchestration, scaling, and infrastructure so your team can ship faster.",
  },
];

export default faqData;
