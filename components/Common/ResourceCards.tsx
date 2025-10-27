"use client";

import React from "react";
import Underline from "@/components/Animations/UnderlineAnchor";

export type ResourceItem = {
  title: string;
  href: string;
  description?: string;
};

export interface ResourceCardsProps {
  items: ResourceItem[];
  className?: string;
}

export default function ResourceCards({ items, className }: ResourceCardsProps) {
  return (
    <div className={["grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2", className]
      .filter(Boolean)
      .join(" ")}
    >
      {items.map((it) => (
        <div
          key={it.href}
          className="group rounded-lg border border-transparent bg-slate-50/50 p-5 ring-1 ring-slate-200/70 transition dark:bg-slate-900/40 dark:ring-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
          role="link"
          tabIndex={0}
          aria-label={`${it.title}`}
          onClick={() => window.open(it.href, "_blank", "noopener,noreferrer")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.open(it.href, "_blank", "noopener,noreferrer");
            }
          }}
        >
          <div className="flex items-start justify-between">
            <Underline
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-slate-900 dark:text-slate-100"
              style={{ "--underline-size": "2px" } as React.CSSProperties}
            >
              {it.title}
            </Underline>
            <svg
              className="ml-3 h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 5h5v5M12 5L6 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {it.description && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {it.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
