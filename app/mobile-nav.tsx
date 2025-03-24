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
import { siteConfig } from "@/config/site";
import { AlignLeftIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import BorderHoverLink from "./border-hover-link";
import DocsMenu from "./docs-menu";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden flex">
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <SheetHeader className="text-left mx-2 px-5">
          <SheetTitle>{siteConfig.name}</SheetTitle>
          <SheetDescription className="sr-only">
            {siteConfig.description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2.5 mt-3 mx-2 px-5  items-start">
            <SheetClose>
              <BorderHoverLink
                href="/docs/installation"
                isActive={pathname === "/docs/installation"}
              >
                Docs
              </BorderHoverLink>
            </SheetClose>

            <SheetClose>
              <BorderHoverLink
                href="/blog"
                isActive={pathname.startsWith("/blog")}
              >
                Blog
              </BorderHoverLink>
            </SheetClose>
          </div>
          <div className="ml-2 pl-5">
            <DocsMenu isSheet />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
