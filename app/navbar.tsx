import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { page_routes } from "@/lib/routes-config";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import Anchor from "./anchor";
import { SheetLeftBar } from "./leftbar";

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

export function Navbar() {
  return (
    <div className="border-b border-dotted h-16 sticky top-0 z-50 backdrop-blur-sm flex items-center justify-between md:px-4 ">
      <div className="flex items-center sm:gap-5 gap-2.5">
        <SheetLeftBar />
        <div className="flex items-center gap-6">
          <div className="sm:flex hidden">
            <h2 className="text-md font-bold font-code">{siteConfig.name}</h2>
          </div>
          <div className="md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
            <NavMenu />
          </div>
        </div>
      </div>

      <div className="flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]">
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
