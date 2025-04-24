"use client";

import { navLinks } from "@/config/nav";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BorderHoverLink from "./border-hover-link";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex gap-8">
      <Link href="/">
        <span className=" hidden lg:inline-block text-2xl font-normal tracking-wider">
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
            <BorderHoverLink
              key={index}
              href={navLink.href}
              isActive={isActive}
            >
              {navLink.title}
            </BorderHoverLink>
          );
        })}
      </nav>
    </div>
  );
}
