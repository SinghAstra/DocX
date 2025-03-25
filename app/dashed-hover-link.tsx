import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface DashedHoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

const DashedHoverLink = ({
  href,
  children,
  isActive,
  className,
  ...props
}: DashedHoverLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block overflow-hidden transition-transform duration-300 text-muted-foreground group hover:text-foreground",
        isActive && "text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <span
        className={cn(
          "absolute bottom-0 left-0 w-full border-b border-foreground border-dashed origin-right transition-transform duration-700 group-hover:scale-x-100 group-hover:origin-left ",
          isActive ? "scale-x-100 " : "scale-x-0"
        )}
      />
    </Link>
  );
};

export default DashedHoverLink;
