import { Button } from "@/components/ui/button";
import { promises as fs } from "fs";
import Link from "next/link";
import path from "path";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypeCodeTitles from "rehype-code-titles";
// import rehypePrism from "rehype-prism-plus";
// import rehypeSlug from "rehype-slug";
// import remarkGfm from "remark-gfm";
import { navLinks } from "@/config/nav";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cn } from "./utils";

export const components = {
  Button,
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn("font-heading mt-8 scroll-m-20 text-4xl  ", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading text-3xl font-medium  mt-12 scroll-m-20  first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("font-heading mt-6 scroll-m-20 text-lg", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn("font-heading mt-6 scroll-m-20 text-lg ", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className={cn("mt-6 scroll-m-20 text-lg ", className)} {...props} />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className={cn("mt-6 scroll-m-20 text-base", className)} {...props} />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-[1.65rem] [&:not(:first-child)]:mt-6 font-thin",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-normal", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 " {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 w-full overflow-y-auto">
      <table
        className={cn(
          "relative w-full overflow-hidden border-none text-sm",
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("last:border-b-none m-0 border-b", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
};

export type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

function getDocsContentPath(slug: string) {
  return path.join(process.cwd(), "/content/docs/", `${slug}/index.mdx`);
}

async function parseMdx(rawMdx: string) {
  // First, parse frontmatter using gray-matter
  const { data } = matter(rawMdx);

  const { content: mdxContent } = await compileMDX({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [],
        remarkPlugins: [],
      },
    },
    components,
  });

  const frontmatter: BaseMdxFrontmatter = {
    title: data.title || "Untitled",
    description: data.description || "No description available",
  };

  return {
    content: mdxContent,
    frontmatter,
  };
}

export async function getDocsForSlug(slug: string) {
  try {
    const contentPath = getDocsContentPath(slug);
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    const { content, frontmatter } = await parseMdx(rawMdx);

    return {
      content,
      frontmatter,
    };
  } catch (err) {
    console.log(err);
  }
}

export function getPreviousNext(path: string) {
  // Flatten the sidebar navigation items
  const flattenedNav: { title: string; href: string }[] = [];
  const isIntroduction = path === "";
  console.log("isIntroduction is ", isIntroduction);
  console.log("path is ", path);

  navLinks.sidebarNav.forEach((section) => {
    section.items?.forEach((item) => {
      if (item.href) {
        flattenedNav.push({ title: item.title, href: item.href });
      }
    });
  });

  const parsedPath = isIntroduction ? "/docs" : `/docs/${path}`;

  // Find the index of the current path
  const index = flattenedNav.findIndex((item) => item.href === parsedPath);

  console.log("index is ", index);

  // Return previous and next items
  return {
    prev: index > 0 ? flattenedNav[index - 1] : null,
    next: index < flattenedNav.length - 1 ? flattenedNav[index + 1] : null,
  };
}
