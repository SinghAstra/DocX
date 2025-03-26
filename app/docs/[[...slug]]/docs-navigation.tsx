import { getPreviousNext } from "@/lib/markdown";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default function DocsNavigation({ pathname }: { pathname: string }) {
  const res = getPreviousNext(pathname);

  return (
    <div className="flex items-center justify-between py-8 mt-10 ">
      <div>
        {res.prev && (
          <Link
            className="flex items-center text-xs sm:text-sm  p-2 group text-foreground border border-dashed rounded-md transition-all duration-200 hover:bg-muted/40"
            href={`${res.prev.href}`}
          >
            <ChevronLeftIcon className="w-[1rem] h-[1rem] mr-1 transition-all duration-200 group-hover:-translate-x-1  text-muted-foreground" />
            <span className="ml-1">{res.prev.title}</span>
          </Link>
        )}
      </div>
      <div>
        {res.next && (
          <Link
            className="flex items-center text-xs sm:text-sm  p-2 group text-foreground border border-dashed rounded-md transition-all duration-200 hover:bg-muted/40 "
            href={`${res.next.href}`}
          >
            <span className="ml-1">{res.next.title}</span>
            <ChevronRightIcon className="w-[1rem] h-[1rem] ml-1 transition-all duration-200 group-hover:translate-x-1  text-muted-foreground" />
          </Link>
        )}
      </div>
    </div>
  );
}
