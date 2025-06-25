"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fullscreen,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export default function DeckViewer({ totalSlides }: { totalSlides: number }) {
  const [current, setCurrent] = useState(1);
  const [isFS, setIsFS] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial slide from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slideNum = parseInt(params.get("slide") || "1", 10);
    if (slideNum >= 1 && slideNum <= totalSlides) {
      setCurrent(slideNum);
    }
  }, [totalSlides]);

  // Update URL when slide changes
  useEffect(() => {
    window.history.replaceState(null, "", `?slide=${current}`);
  }, [current]);

  const nextSlide = useCallback(() => {
    setCurrent((c) => Math.min(totalSlides, c + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrent((c) => Math.max(1, c - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Fullscreen management
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFS(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFS = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFS(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex w-screen flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    >
      {/* Top Control Bar */}
      <header className="flex h-16 w-full flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="font-semibold">
          Krv Pitch Deck{" "}
          <span className="text-gray-500">
            ({current}/{totalSlides})
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Go to Homepage"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Krv Homepage</span>
          </Link>
          <Link
            href="/deck/PitchDeck.pdf"
            download
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Download PDF"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download</span>
          </Link>
          <button
            onClick={toggleFS}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            title="Toggle Fullscreen"
          >
            {isFS ? <X size={18} /> : <Fullscreen size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Thumbnails */}
        <aside className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 w-32 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col gap-2">
            {[...Array(totalSlides)].map((_, i) => {
              const slideNumber = i + 1;
              return (
                <button
                  key={slideNumber}
                  onClick={() => setCurrent(slideNumber)}
                  className={`group relative block w-full overflow-hidden rounded-md border-2 focus:outline-none ${
                    current === slideNumber
                      ? "border-blue-500 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
                      : "border-transparent hover:border-blue-400"
                  }`}
                >
                  <Image
                    src={`/deck/thumbs/thumb-${slideNumber}.jpg`}
                    width={100}
                    height={75}
                    alt={`Thumbnail for Slide ${slideNumber}`}
                    className="h-auto w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {slideNumber}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Slide Viewer */}
        <main className="relative flex flex-1 items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
          {/* Previous Slide Button */}
          <button
            onClick={prevSlide}
            disabled={current === 1}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-opacity hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-20"
            title="Previous Slide"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Slide Image with Animation */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current}
              className="relative aspect-[16/9] w-full max-w-screen-xl shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={`/deck/slides/slide-${current}.jpg`}
                alt={`Slide ${current}`}
                fill
                className="object-contain"
                priority={true} // Load current slide with high priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Slide Button */}
          <button
            onClick={nextSlide}
            disabled={current === totalSlides}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-opacity hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-20"
            title="Next Slide"
          >
            <ChevronRight size={28} />
          </button>
        </main>
      </div>
    </div>
  );
}
