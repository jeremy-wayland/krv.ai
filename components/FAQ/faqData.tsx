import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "Representation Learning as a Service",
    ans: "We learn a comprehensive graph representation of your entire data system—mapping data types, flows, and relationships across all your enterprise infrastructure. This deep structural understanding provides every AI workflow and model with the real-time context it needs to succeed. Instead of generic, surface-level automations, our representation ensures high-quality, usable data flows directly into your AI models to deliver tailored optimizations, eliminating the largest blocker to successful ML deployment.",
  },
  {
    id: 2,
    quest: "Customized In-System Optimizations",
    ans: "Forget generic chatbots and virtual assistants that fail to yield measurable ROI. Krv enables the in-house production of machine learning pipelines that automate and streamline your unique workflows. By adapting directly to your systems without brittle ETL pipelines, our hypergraph data engine allows your domain experts to rapidly prototype and deploy reliable, end-to-end custom AI solutions.",
  },
  {
    id: 3,
    quest: "Instant API & Front-End Integration",
    ans: "Each trained model ships with a ready-to-use API. Simply plug it into your existing systems or custom UIs and trigger model runs as needed. Krv completely handles the orchestration, scaling, and infrastructure, so your team can focus on shipping solutions faster, not managing servers.",
  },
];

export default faqData;
