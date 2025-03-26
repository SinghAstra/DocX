import { getDocsForSlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import DocsNavigation from "./docs-navigation";

interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage(props: DocsPageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  console.log("pathname is ", pathName);

  if (!res || !res.content) notFound();
  return (
    <div className="flex">
      <div className="p-4">
        <h1 className="text-4xl font-semibold">{res.frontmatter.title}</h1>
        <p className="text-muted-foreground mb-12">
          {res.frontmatter.description}
        </p>
        {res.content}
        <DocsNavigation pathname={pathName} />
      </div>
      {/* <Toc path={pathName} /> */}
    </div>
  );
}
