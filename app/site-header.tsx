import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { page_routes } from "@/lib/routes-config";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import Anchor from "./anchor";
import { SheetLeftBar } from "./leftbar";
import { MainNav } from "./main-nav";

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
    <div className="border-b border-dotted h-16 sticky top-0 z-50  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center md:px-4 ">
      <SheetLeftBar />
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

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary dark:font-medium font-semibold"
            absolute
            className="flex items-center gap-1 sm:text-base text-[14.5px] dark:text-stone-300/85 text-stone-800"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
