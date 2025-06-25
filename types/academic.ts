// types/academic.ts

export type Section = "about" | "coal" | "pending";

export type AcademicSidebarProps = {
  selectedSection: Section;
  setSelectedSection: (section: Section) => void;
};
