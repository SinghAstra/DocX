import { MainNavItem, SidebarNavItem } from "@/interfaces/nav";

export interface NavLinks {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const navLinks: NavLinks = {
  mainNav: [
    {
      title: "Docs",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Main Heading",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Sub Heading",
          href: "/docs/sub-heading",
          items: [],
        },
      ],
    },
  ],
};
