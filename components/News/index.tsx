import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import { NewsItem as Item, groupNewsByYear } from "@/types/news";
import NewsItem from "@/components/News/NewsItem";

export interface NewsProps {
  items: Item[];
  title?: string;
  description?: string;
  initialLimit?: number; // render first N items only
  className?: string; // optional extra classes for section spacing
  showHeader?: boolean; // render SectionHeader or not
}

export default function News({
  items,
  title = "News",
  description,
  initialLimit,
  className,
  showHeader = true,
}: NewsProps) {
  const limited =
    typeof initialLimit === "number" ? items.slice(0, initialLimit) : items;
  const grouped = groupNewsByYear(limited);
  const years = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <section
      className={["py-12 sm:py-16", className].filter(Boolean).join(" ")}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            headerInfo={{
              title,
              subtitle: title,
              description: description ?? "",
            }}
          />
        )}
        {limited.length === 0 ? (
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            No news yet — stay tuned.
          </p>
        ) : (
          <div className={`${showHeader ? "mt-8" : "mt-2"} space-y-8`}>
            {years.map((year) => (
              <div key={year}>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {year}
                </h2>
                <div className="space-y-6">
                  {grouped[year].map((it) => (
                    <NewsItem key={it.id} item={it} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
