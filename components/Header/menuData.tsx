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
    title: "Industries",
    newTab: false,
    submenu: [
      // {
      //   id: 31,
      //   title: "Blog Grid",
      //   newTab: false,
      //   path: "/blog",
      // },
      // {
      //   id: 34,
      //   title: "Sign In",
      //   newTab: false,
      //   path: "/auth/signin",
      // },
      // {
      //   id: 35,
      //   title: "Sign Up",
      //   newTab: false,
      //   path: "/auth/signup",
      // },
      {
        id: 35,
        title: "Recruiting",
        newTab: false,
        path: "/docs",
      },
      {
        id: 35.1,
        title: "Finance",
        newTab: false,
        path: "/support",
      },
      {
        id: 36,
        title: "Healthcare",
        newTab: false,
        path: "/error",
      },
      {
        id: 36,
        title: "Academic Collaborations",
        newTab: false,
        path: "/error",
      },
    ],
  },
  {
    id: 2.1,
    title: "Meet the Team",
    newTab: false,
    path: "/team",
  },
  {
    id: 2.3,
    title: "About",
    newTab: false,
    path: "/about",
  },

  {
    id: 4,
    title: "Contact Us",
    newTab: false,
    path: "/contact",
  },
];

export default menuData;
