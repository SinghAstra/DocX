"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BorderHoverLink from "./border-hover-link";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex gap-4">
      <Link href="/">
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <BorderHoverLink
          href="/docs/installation"
          isActive={pathname === "/docs/installation"}
        >
          Docs
        </BorderHoverLink>

        <BorderHoverLink href="/blog" isActive={pathname.startsWith("/blog")}>
          Blog
        </BorderHoverLink>
      </nav>
    </div>
  );
}
