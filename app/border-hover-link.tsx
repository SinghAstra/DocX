import { cn } from "@/lib/utils";
import Link from "next/link";

interface BorderHoverLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const BorderHoverLink = ({
  href,
  children,
  isActive,
}: BorderHoverLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block text-foreground transition-colors",
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:border-b after:border-dotted after:border-current",
        "after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease-in-out",
        "hover:after:scale-x-100",
        isActive && "after:scale-x-100"
      )}
    >
      {children}
    </Link>
  );
};

export default BorderHoverLink;
