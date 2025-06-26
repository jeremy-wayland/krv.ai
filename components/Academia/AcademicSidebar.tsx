//components/Academia/AcademicSidebar.tsx
import { AcademicSidebarProps } from "@/types/academic";

const AcademicSidebar = ({
  selectedSection,
  setSelectedSection,
}: AcademicSidebarProps) => {
  const baseClasses = "flex w-full rounded-sm px-3 py-2 text-base";
  const activeStyle = "bg-stroke text-black dark:bg-blackho dark:text-white";
  const inactiveStyle = "text-black dark:text-white";

  return (
    <li className="block">
      <h4 className="mb-4 text-2xl font-semibold text-black dark:text-white">
        Collaborations
      </h4>
      <button
        onClick={() => setSelectedSection("about")}
        className={`${baseClasses} ${
          selectedSection === "about" ? activeStyle : inactiveStyle
        }`}
      >
        About
      </button>
      <button
        onClick={() => setSelectedSection("coal")}
        className={`${baseClasses} ${
          selectedSection === "coal" ? activeStyle : inactiveStyle
        } text-left`}
      >
        Coal Retirement w/ UCSB
      </button>
      <button
        onClick={() => setSelectedSection("pending")}
        className={`${baseClasses} ${
          selectedSection === "pending" ? activeStyle : inactiveStyle
        }`}
      >
        <i>Coming Soon!</i>
      </button>
    </li>
  );
};

export default AcademicSidebar;
