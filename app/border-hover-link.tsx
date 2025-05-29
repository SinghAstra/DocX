import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface BorderHoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  target?: string;
}

const BorderHoverLink = ({
  href,
  children,
  isActive,
  className,
  target,
  ...props
}: BorderHoverLinkProps) => {
  console.log("target in BorderHoverLink:", target);
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block transition-colors duration-300 text-muted-foreground hover:text-foreground group ",
        isActive && "text-foreground",
        className
      )}
      target={target}
      {...props}
    >
      {children}
      <span
        className={cn(
          "absolute scale-x-0 bottom-0 left-0 w-full h-[1px] bg-foreground origin-right transition-transform duration-700 group-hover:scale-x-100 group-hover:origin-left"
        )}
      />
    </Link>
  );
};

export default BorderHoverLink;
