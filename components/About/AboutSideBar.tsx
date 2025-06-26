import { AboutSideBarProps } from "@/types/about";

const AboutSidebar = ({
  selectedSection,
  setSelectedSection,
}: AboutSideBarProps) => {
  const baseClasses = "flex w-full rounded-sm px-3 py-2 text-base";
  const activeStyle = "bg-stroke text-black dark:bg-blackho dark:text-white";
  const inactiveStyle = "text-black dark:text-white";

  return (
    <li className="block">
      <button
        onClick={() => setSelectedSection("Current Projects")}
        className={`${baseClasses} ${
          selectedSection === "Current Projects" ? activeStyle : inactiveStyle
        }`}
      >
        Current Projects
      </button>
    </li>
  );
};

export default AboutSidebar;
