import { FeatureTab } from "@/types/featureTab";

const featuresTabData: FeatureTab[] = [
  {
    id: "tabOne",
    title: "LLMs Have Limits",
    desc1: `Traditional language models and standard RAG systems stumble when faced with messy, complex datasets. Krv goes beyond simple data retrieval by drawing intricate connections and making advanced inferences that standard graph systems simply can't match.`,
    desc2: `   Imagine you're solving a mystery with a basic map that only shows landmarks. Now, picture a super-smart detective that not only spots the landmarks but also connects hidden clues, predicts secret passageways, and reveals the exact route to the hidden treasure—even when the clues are scattered and incomplete. That’s the power of Krv: it understands your data on a whole new level.`,
    image: "/images/features/features-light-01.svg",
    imageDark: "/images/features/features-dark-01.svg",
  },
  {
    id: "tabTwo",
    title:
      "Effortless, Sophisticated, and Reliable Data Preprocessing and Exploration for SME's",
    desc1: `Unlike traditional solutions that require deep technical expertise or large data teams, our tool empowers SMEs to use cutting-edge machine learning techniques with minimal setup.`,
    desc2: `    No PhD in Data Science Required.`,
    image: "/images/features/features-light-01.svg",
    imageDark: "/images/features/features-dark-01.svg",
  },
  {
    id: "tabThree",
    title: "The Curse of Dimensionality is Knocking at our Door",
    desc1: `Effective data cleaning, preprocessing, and representation are crucial for extracting insights, especially with small, industry-specific datasets. While research offers many methods, not everyone has the expertise to navigate them. With so many options, making reliable choices is a challenge — even for data scientists.`,
    desc2: `Our tools automate the machine-learning data handling for you. Save time and understand the trustworthiness of your data's ability to address your end goal.`,
    image: "/images/features/features-light-01.svg",
    imageDark: "/images/features/features-dark-01.svg",
  },
];

export default featuresTabData;
