export type Section = "Current Projects";

export type AboutSideBarProps = {
  selectedSection: Section;
  setSelectedSection: (section: Section) => void;
};
