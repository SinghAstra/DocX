export interface MainNavItem {
  title: string;
  href: string;
}

export interface SidebarNavItem {
  title: string;
  href?: string;
  label?: string;
  items?: SidebarNavItem[];
}
