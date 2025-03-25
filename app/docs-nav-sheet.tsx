"use client";

import { SheetClose } from "@/components/ui/sheet";
import { navLinks } from "@/config/nav";
import { SidebarNavItem } from "@/interfaces/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsNavSheet() {
  const pathname = usePathname();
  if (!pathname.startsWith("/docs")) return null;
  const items = navLinks.sidebarNav;

  return (
    <div className="space-y-6 w-full  ">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1  w-full">
          <h4 className="rounded-md py-1 pl-1 text-xs tracking-wider text-muted-foreground uppercase">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  );
}

function DocsNavItems({
  items,
  pathname,
}: {
  items: SidebarNavItem[];
  pathname: string;
}) {
  return items?.length ? (
    <div className="space-y-1 text-sm pl-2  w-full">
      {items.map(
        (item, index) =>
          item.href && (
            <SheetClose asChild key={index}>
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "group flex h-8 w-full items-center pl-4 font-normal text-foreground hover:bg-accent hover:text-accent-foreground transition-all border-l-2 border-muted",
                  pathname === item.href &&
                    "bg-accent font-medium text-accent-foreground border-l-2 border-primary"
                )}
              >
                {item.title}
                {item.label && (
                  <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] ">
                    {item.label}
                  </span>
                )}
              </Link>
            </SheetClose>
          )
      )}
    </div>
  ) : null;
}
