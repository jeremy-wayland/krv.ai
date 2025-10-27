## krv.ai

Website for Krv Labs.

### News content

The News page at `/news` lists dated milestones and updates using a simple data file.

- Data source: `components/News/NewsData.ts`
- Type: `types/news.ts` (`NewsItem` interface)
- Component: `components/News/` (reusable list and item components)

Add a new item by appending to `rawNews` in `NewsData.ts`:

```
{
	id: "2025-10-23-nature-energy", // unique id
	date: "2025-10-23",              // ISO date
	title: "Nature Energy publication from Krv team is released",
	summary: "Optional short sentence",
	linkUrl: "https://example.com",  // optional (external or internal)
	linkLabel: "Read full article",   // optional; right-side link label (defaults to 'Read full article')
	source: "Nature Energy",         // optional
	tags: ["publication"],           // optional
	featured: true                    // optional
}
```

Items are automatically sorted by date (newest first) and grouped by year.

If `linkUrl` is provided, the item will render a small right-aligned link label in the row. If `linkLabel` is omitted, it defaults to "Read full article". The title itself remains plain text for a clean, minimalist look.

Thanks to [Solid - Free Next.js Web Template and Starter Kit for SaaS](https://github.com/NextJSTemplates/solid-nextjs) for the starter code!
