import Pre from "@/components/markdown/pre";
import { navLinks } from "@/config/nav";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { cn } from "./utils";

const components = {
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("text-purple-400", className)} {...props} />
  ),
  pre: Pre,
  code: ({ className, children, ...props }: React.ComponentProps<"code">) => {
    return (
      <code
        className={`${className} text-sm  py-0.5 px-1 rounded  border`}
        {...props}
      >
        {children}
      </code>
    );
  },
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn("not-italic", className)} {...props} />
  ),
};

export type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

function getDocsContentPath(slug: string) {
  const isIntroduction = slug === "";
  const contentPath = isIntroduction ? `index.mdx` : `${slug}/index.mdx`;
  return path.join(process.cwd(), "/content/docs/", contentPath);
}

async function parseMdx(rawMdx: string) {
  // First, parse frontmatter using gray-matter
  const { data } = matter(rawMdx);

  const { content: mdxContent } = await compileMDX({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          normalizeLanguage,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
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

export async function getDocsToc(slug: string) {
  const contentPath = getDocsContentPath(slug);
  const rawMdx = await fs.readFile(contentPath, "utf-8");
  // captures heading from h2 to h4
  const headingsRegex = /^(#{2,4})\s(.+)$/gm;
  let match;
  const extractedHeadings = [];
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const headingLevel = match[1].length;
    const headingText = match[2].trim();
    const slug = getSlug(headingText);
    extractedHeadings.push({
      level: headingLevel,
      text: headingText,
      href: `#${slug}`,
    });
  }
  return extractedHeadings;
}

function getSlug(text: string) {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}

// for copying the code in pre
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = codeEl.children?.[0].value;
      const meta = codeEl.data?.meta;
      if (meta && typeof meta === "string") {
        const fileMatch = meta.match(/title=([\w./-]+)/);
        if (fileMatch) {
          node.filename = fileMatch[1];
        }
      }
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      node.properties["raw"] = node.raw;
      node.properties["filename"] = node.filename;
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeLanguage = () => (tree: any) => {
  const supported = new Set([
    "js",
    "ts",
    "tsx",
    "jsx",
    "html",
    "css",
    "json",
    "bash",
    "python",
    "c",
    "cpp",
    "java",
  ]);

  visit(tree, "element", (node) => {
    if (node.tagName === "code" && node.properties?.className) {
      const classNames = node.properties.className;
      const langClass = classNames.find((c: string) =>
        c.startsWith("language-")
      );

      if (langClass) {
        const lang = langClass.replace("language-", "");
        if (!supported.has(lang)) {
          // fallback to plain text if unsupported
          node.properties.className = ["language-text"];
        }
      }
    }
  });
};
