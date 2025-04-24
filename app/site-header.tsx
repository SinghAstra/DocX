import FadeIn from "@/components/global/fade-in";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <div className="border-b border-dashed h-16 sticky top-0 z-50  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 ">
      <FadeIn delay={0.1} className="flex items-center w-full">
        <MobileNav />
        <MainNav />
      </FadeIn>
    </div>
  );
}
