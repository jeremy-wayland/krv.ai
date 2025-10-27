import { Panel } from "@/types/Panel";

const PanelData: Panel[] = [
  {
    id: 1,
    icon: "/images/icon/icon-04.svg", // speedometer
    title: "Live Models, Running in Real Time",
    description:
      "Provision the full Krv stack directly into your cloud with a single Terraform command — no complex setup required.",
  },
  {
    id: 2,
    icon: "/images/icon/icon-06.svg", // cycle icon
    title: "Your Data Stays Put. Always.",
    description:
      "We deploy entirely within your own environment. Models run where your data lives — behind your VPN and security perimeter.",
  },
  {
    id: 3,
    icon: "/images/icon/icon-03.svg", // page / config icon
    title: "Seamless Data Integration",
    description:
      "Easily link to live databases, data lakes, or APIs. Krv integrates securely with your existing storage and compute systems.",
  },
  {
    id: 4,
    icon: "/images/icon/icon-02.svg", // stack icon
    title: "Fully Automated ML Lifecycle",
    description:
      "Train, version, and deploy models through a self-orchestrating workflow — from data ingestion to inference endpoint.",
  },
  {
    id: 5,
    icon: "/images/icon/icon-01.svg", // bar chart
    title: "Immutable, Reproducible, Auditable",
    description:
      "Every workflow and model build is containerized and logged with full lineage for compliance and governance.",
  },
  {
    id: 6,
    icon: "/images/icon/icon-05.svg", // table
    title: "Secure by Design",
    description:
      "Zero external calls. Zero data exfiltration. Just high-performance AI, fully contained within your infrastructure.",
  },
];

export default PanelData;
