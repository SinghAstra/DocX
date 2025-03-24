"use client";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import BorderHoverLink from "./border-hover-link";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex gap-4">
      <span className="hidden font-bold lg:inline-block">
        {siteConfig.name}
      </span>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <BorderHoverLink
          href="/docs/installation"
          isActive={pathname === "/docs/installation"}
        >
          Docs
        </BorderHoverLink>

        <BorderHoverLink
          href="/docs/components"
          isActive={
            pathname.startsWith("/docs/components") &&
            !pathname.startsWith("/docs/component/chart")
          }
        >
          Components
        </BorderHoverLink>

        <BorderHoverLink
          href="/blocks"
          isActive={pathname.startsWith("/blocks")}
        >
          Blocks
        </BorderHoverLink>

        <BorderHoverLink
          href="/charts"
          isActive={
            pathname.startsWith("/docs/component/chart") ||
            pathname.startsWith("/charts")
          }
        >
          Charts
        </BorderHoverLink>

        <BorderHoverLink
          href="/themes"
          isActive={pathname.startsWith("/themes")}
        >
          Themes
        </BorderHoverLink>

        <BorderHoverLink
          href="/colors"
          isActive={pathname.startsWith("/colors")}
        >
          Colors
        </BorderHoverLink>
      </nav>
    </div>
  );
}
