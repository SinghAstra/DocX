import { DocsNav } from "./docs-nav";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside className="border-r border-dashed fixed left-0 inset-y-0 w-64 hidden md:flex mt-10 py-6  lg:py-8 overflow-auto">
        <DocsNav />
      </aside>
      <div className="px-2 md:ml-64 w-full">{children}</div>
    </div>
  );
}
