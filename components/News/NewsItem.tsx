import React from "react";
import { NewsItem as Item } from "@/types/news";

interface Props {
  item: Item;
  compact?: boolean;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsItem({ item, compact }: Props) {
  return (
    <article id={item.id} className="group relative">
      <div
        className={`grid grid-cols-[8.5rem,1fr] gap-x-4 sm:grid-cols-[10rem,1fr] md:grid-cols-[11.5rem,1fr] ${
          compact ? "gap-y-1" : "gap-y-2"
        }`}
      >
        <time
          dateTime={item.date}
          className="whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400"
        >
          {formatDate(item.date)}
        </time>
        <div className="min-w-0">
          <h3 className="text-base font-medium tracking-tight text-gray-900 dark:text-gray-100">
            {item.title}
          </h3>
          {item.summary && (
            <p className="mt-1 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
              {item.summary}
            </p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {item.source && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.source}
              </span>
            )}
            {item.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
          {item.linkUrl && (
            <div className="mt-2 flex justify-end">
              <a
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.linkLabel ?? "Read full article"}: ${item.title}`}
                className="rounded-sm text-xs font-medium text-indigo-600 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400"
              >
                {item.linkLabel ?? "Read full article"}
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          )}
        </div>
      </div>
      <hr className="mt-4 border-gray-100 dark:border-gray-800" />
    </article>
  );
}
