import type { Metadata } from "next";
import News from "@/components/News";
import NewsData from "@/components/News/NewsData";
import { NewsItem } from "@/types/news";

export const metadata: Metadata = {
  title: "News | Krv.ai",
  description: "Milestones, publications, and updates from the Krv team.",
  openGraph: {
    title: "News | Krv.ai",
    description: "Milestones, publications, and updates from the Krv team.",
    url: "/news",
    type: "website",
  },
};

export default function Page() {
  const jsonLd = buildJsonLd(NewsData);
  return (
    <main>
      <section className="overflow-hidden pb-10 pt-35 md:pt-40 xl:pb-12 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <header className="mb-6 text-center">
            <h1 className="mb-2 text-3xl font-bold text-black dark:text-white xl:text-4xl">
              <span className="relative inline-block before:absolute before:bottom-1.5 before:left-0 before:-z-10 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                News.
              </span>
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Milestones, publications, and updates from the Krv team.
            </p>
          </header>
        </div>
      </section>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <News
        items={NewsData}
        title="News"
        description="Milestones, publications, and updates."
        showHeader={false}
        className="pt-0"
      />
    </main>
  );
}

function buildJsonLd(items: NewsItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "NewsArticle",
        headline: it.title,
        datePublished: it.date,
        url: it.linkUrl ?? `https://krv.ai/news#${it.id}`,
      },
    })),
  };
}
