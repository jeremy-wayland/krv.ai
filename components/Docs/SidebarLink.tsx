type Props = {
  selectedSection: "about" | "projects";
  setSelectedSection: (section: "about" | "projects") => void;
};

const SidebarLink = ({ selectedSection, setSelectedSection }: Props) => {
  const baseClasses = "flex w-full rounded-sm px-3 py-2 text-base";
  const activeStyle = "bg-stroke text-black dark:bg-blackho dark:text-white";
  const inactiveStyle = "text-black dark:text-white";

  return (
    <li className="block">
      <button
        onClick={() => setSelectedSection("projects")}
        className={`${baseClasses} ${
          selectedSection === "projects" ? activeStyle : inactiveStyle
        }`}
      >
        Current Projects
      </button>
    </li>
  );
};

export default SidebarLink;
