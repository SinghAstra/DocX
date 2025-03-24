import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { page_routes } from "@/lib/routes-config";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export const NAVLINKS = [
  {
    title: "Documentation",
    href: `/docs${page_routes[0].href}`,
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Examples",
    href: "#",
  },
  {
    title: "Guides",
    href: "#",
  },
  {
    title: "Community",
    href: "https://github.com/nisabmohd/Aria-Docs/discussions",
  },
];

export function SiteHeader() {
  return (
    <div className="border-b border-dotted h-16 sticky top-0 z-50  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 ">
      <MobileNav />
      <MainNav />

      <div className=" ml-auto flex items-center sm:justify-normal justify-between sm:gap-3  sm:w-fit w-[90%]">
        <div className="flex items-center justify-between sm:gap-2">
          <div className="flex ml-4 sm:ml-0">
            <Link
              href={siteConfig.links.github}
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <GithubIcon />
            </Link>
            <Link
              href={siteConfig.links.twitter}
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <TwitterIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
