"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { AlignLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BorderHoverLink from "./border-hover-link";
import { DocsNavSheet } from "./docs-nav-sheet";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden flex gap-2">
          <AlignLeftIcon /> {siteConfig.name}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <SheetHeader className="text-left mx-2 px-5">
          <SheetTitle>
            <SheetClose asChild>
              <Link href="/">{siteConfig.name}</Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="sr-only">
            {siteConfig.description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2.5 mt-3 mx-2 px-5  items-start">
            {navLinks.mainNav.map((navLink, index) => {
              const isHomePage = navLink.href === "/";
              const isActive =
                (!isHomePage && pathname.includes(navLink.href)) ||
                (isHomePage && pathname === navLink.href);
              return (
                <SheetClose asChild key={index}>
                  <BorderHoverLink href={navLink.href} isActive={isActive}>
                    {navLink.title}
                  </BorderHoverLink>
                </SheetClose>
              );
            })}
          </div>
          <div className=" pl-5">
            <DocsNavSheet />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
