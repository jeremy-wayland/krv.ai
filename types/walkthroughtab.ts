import { ReactNode } from "react";

export type WalkthroughTab = {
  id: string;
  title: string;
  desc1: ReactNode;
  desc2: ReactNode;
  desc3?: ReactNode;
  image: string;
  imageDark: string;
};
