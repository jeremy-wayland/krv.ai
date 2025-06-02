import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "Why Do I Need This?",
    ans: "Well, unless your data magically cleans and structures itself (in which case, please sell us your product 😉), you need this. Most companies are sitting on piles of messy, multimodal data: text, tables, logs, images, whatever—which creates serious headaches, even for experienced data scientists. Krv doesn't just handle that complexity—we leverage it, turning chaos into a live knowledge graph that actually improves your data quality and unlocks smarter, faster downstream analysis. Got analysts but no data engineers? Krv fills the gap. Got data engineers? We're their copilot. Either way, we plug in fast and make your team way more productive.",
  },
  {
    id: 2,
    quest: "Is Data Engineering Really That Hard?",
    ans: "Yes—it often is. Around 80% of data science work goes into cleaning, curating, and preparing data, which is both time-consuming and error-prone. That’s where Krv Analytics comes in. We automate the hardest parts of data engineering, transforming raw inputs into a live knowledge graph. This lets you skip the wrangling and focus on extracting insights through dynamic, adaptive workflows built for your specific needs.",
  },
  {
    id: 3,
    quest: "Why Graphs?",
    ans: "Graphs make complex data relationships easy to understand and explore. They let you connect the dots—literally—between different pieces of information, uncovering patterns and insights that might otherwise go unnoticed. Unlike asking ChatGPT for a data engineering plan without constraints, graphs provide a structured environment with clear rules, ensuring your plans are realistic and fit your infrastructure. That’s the power of graphs.",
  },
];

export default faqData;
