import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming Soon - Solid SaaS Boilerplate",
  description: "This page is coming soon. New content is being added shortly!",
};

const ComingSoonPage = () => {
  return (
    <section className="overflow-hidden pb-25 pt-45 lg:pb-32.5 lg:pt-50 xl:pb-37.5 xl:pt-55">
      <div className="animate_top mx-auto max-w-[518px] text-center">
        {/* <Image
          src="/images/coming-soon.svg"
          alt="Coming Soon"
          className="mx-auto mb-7.5"
          width={400}
          height={400}
        /> */}

        <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:text-4xl">
          Coming Soon!
        </h2>
        <p className="mb-7.5">
          Great things are on the horizon. We're working hard to add new content
          and features. Check back soon for updates!
        </p>

        <div className="flex items-center gap-6">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          >
            <svg
              className="rotate-180 transform fill-white"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                fill=""
              />
            </svg>
            Return to Home
          </a>

          <a
            href="https://urineluck.krv.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#7E48DC] px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-[#6d3cc0] dark:bg-[#7E48DC] dark:hover:bg-[#6d3cc0]"
          >
            Check Out Our Beta Launch
            <svg
              className="fill-white"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                fill=""
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonPage;
