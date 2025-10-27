//components/Header/menuData.tsx
import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 3,
    title: "Initiatives",
    newTab: false,
    submenu: [
      // {
      //   id: 35,
      //   title: "Recruiting",
      //   newTab: false,
      //   path: "/recruiting",
      // },
      {
        id: 36,
        title: "Healthcare",
        newTab: false,
        path: "/healthcare",
      },
      {
        id: 35.1,
        title: "Finance",
        newTab: false,
        path: "/finance",
      },
      {
        id: 36,
        title: "Academia",
        newTab: false,
        path: "/academia",
      },
    ],
  },
  // About temporarily hidden; keep for future re-enable
  // {
  //   id: 2.3,
  //   title: "About",
  //   newTab: false,
  //   path: "/about",
  // },

  {
    id: 2.1,
    title: "Team",
    newTab: false,
    path: "/team",
  },
  {
    id: 2.0,
    title: "News",
    newTab: false,
    path: "/news",
  },

  {
    id: 4,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];

export default menuData;
