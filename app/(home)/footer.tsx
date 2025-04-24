import FadeIn from "@/components/global/fade-in";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { siteConfig } from "@/config/site";
import BorderHoverLink from "../border-hover-link";

const Footer = () => {
  return (
    <MaxWidthWrapper>
      <footer className="flex  py-4 relative items-center justify-between border-t border-border  w-full  mx-auto  bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

        <FadeIn delay={0.1}>
          <span className=" text-muted-foreground text-sm flex items-center tracking-wider">
            Made by{" "}
            <BorderHoverLink
              href={siteConfig.links.github}
              className="ml-2 text-foreground"
            >
              SinghAstra
            </BorderHoverLink>
          </span>
        </FadeIn>
        <FadeIn delay={0.4}>
          <span className="text-neutral-200 text-sm flex items-center tracking-wider">
            <BorderHoverLink
              href={siteConfig.links.twitter}
              className="text-foreground"
            >
              Connect on X
            </BorderHoverLink>
          </span>
        </FadeIn>
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
