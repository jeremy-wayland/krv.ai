export interface NewsItem {
  id: string; // stable identifier (e.g., slug or UUID)
  date: string; // ISO 8601 string, e.g., '2025-10-23'
  title: string;
  summary?: string;
  linkUrl?: string; // optional external or internal URL (used by right-side link label)
  linkLabel?: string; // optional label for the right-side link (defaults to "Read full article")
  tags?: string[];
  source?: string; // e.g., 'Nature Energy', 'Press', etc.
  featured?: boolean;
  slug?: string; // optional internal reference
}

export type YearGroupedNews = Record<string, NewsItem[]>;

export function groupNewsByYear(items: NewsItem[]): YearGroupedNews {
  return items.reduce<YearGroupedNews>((acc, item) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});
}

export function sortNewsDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}
