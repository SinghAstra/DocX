import { getDocsForSlug } from "@/lib/markdown";
import { notFound } from "next/navigation";

interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage(props: DocsPageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  if (!res || !res.content) notFound();
  return (
    <div className="flex">
      <div className="py-1">
        <h1 className="sm:text-3xl text-2xl !-mt-0.5">
          {res.frontmatter.title}
        </h1>
        <p className="-mt-4 text-muted-foreground sm:text-[16.5px] text-[14.5px]">
          {res.frontmatter.description}
        </p>
        {res.content}
        {/* <Pagination pathname={pathName} /> */}
      </div>
      {/* <Toc path={pathName} /> */}
    </div>
  );
}
