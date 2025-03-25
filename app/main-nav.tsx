"use client";

import { navLinks } from "@/config/nav";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashedHoverLink from "./dashed-hover-link";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex gap-8">
      <Link href="/">
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {navLinks.mainNav.map((navLink, index) => {
          const isHomePage = navLink.href === "/";
          const isActive =
            (!isHomePage && pathname.includes(navLink.href)) ||
            (isHomePage && pathname === navLink.href);
          return (
            <DashedHoverLink
              key={index}
              href={navLink.href}
              isActive={isActive}
            >
              {navLink.title}
            </DashedHoverLink>
          );
        })}
      </nav>
    </div>
  );
}
