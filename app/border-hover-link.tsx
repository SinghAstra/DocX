import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface BorderHoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

const BorderHoverLink = ({
  href,
  children,
  isActive,
  className,
  ...props
}: BorderHoverLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block text-muted-foreground transition-all duration-300 ease-in-out",
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:border-b after:border-dotted after:border-current",
        "after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease-in-out",
        "hover:after:scale-x-100",
        isActive && "after:scale-x-100 text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default BorderHoverLink;
