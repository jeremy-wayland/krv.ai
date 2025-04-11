// app/(site)/academia/page-details/page.tsx

import RelatedPost from "@/components/AcademicLanding/related";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog Details Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Blog details page for Solid Pro",
};

const SingleBlogPage = async () => {
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <form
                  action="https://formbold.com/s/unique_form_id"
                  method="POST"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      className="focus:outline-hidden w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />

                    <button
                      className="absolute right-0 top-0 p-5"
                      aria-label="search-icon"
                    >
                      <svg
                        className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>

                <ul>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Coming Soon!</a>
                  </li>
                  {/* <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Events</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Grids</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">News</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Rounded</a>
                  </li> */}
                </ul>
              </div>
              <RelatedPost />
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="blog-details">
                  <h2>Academic Collaborations</h2>

                  <h5> Model Development</h5>
                  <p>
                    We've had the privilege of working with academic partners on
                    joint studies and technical model frameworks. These
                    collaborations allow us to accelerate innovation, validate
                    new approaches, and continuously push the boundary of what's
                    possible.
                  </p>

                  {/* <div className="flex flex-wrap gap-5">
            <Image
              src={"/images/blog/research-collab-1.png"}
              width={350}
              height={200}
              alt="Research Collaboration 1"
            />
            <Image
              src={"/images/blog/research-collab-2.png"}
              width={350}
              height={200}
              alt="Research Collaboration 2"
            />
          </div> */}

                  <h5>Bringing Academic Techniques into Industry</h5>

                  <p>
                    We don't just read the latest academic papers — we help
                    write them. Our mission is to ensure that promising new
                    techniques don't just stay within journals, but are used by
                    companies, agencies, and energy practitioners to make
                    better, faster, and more informed decisions. We're proud to
                    play a small role in helping high-potential academic work
                    find a larger stage.
                  </p>

                  <h6>
                    If you're a researcher, student, or faculty member working
                    on something exciting, we'd love to hear from you. Let's
                    turn great ideas into real-world impact — together.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
