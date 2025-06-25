// app/(site)/deck/page.tsx
import { Metadata } from "next";
import DeckViewer from "@/components/Deck/deckViewer";

export const metadata: Metadata = {
  title: "Pitch Deck",
  description: "Confidential pitch deck for investors",
  robots: "noindex, nofollow",
};
export default function DeckPage() {
  const TOTAL_SLIDES = 14;

  return (
    <section className="pb-16 ">
      <section className="overflow-hidden pb-25 pt-25">
        <main className="animate_top mx-auto">
          <DeckViewer totalSlides={TOTAL_SLIDES} />
        </main>
      </section>
    </section>
  );
}
