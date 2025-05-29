import { getDocsToc } from "@/lib/markdown";
import TocObserver from "./toc-observer";

export default async function Toc({ path }: { path: string }) {
  const toc = await getDocsToc(path);

  return (
    <div className="xl:flex hidden w-[20rem] md:pl-6 h-[calc(100vh-4rem)] sticky py-9  inset-y-0 right-0 top-[4rem] overflow-y-auto  border-l border-dashed ">
      <div className="flex flex-col gap-3 w-full pl-2">
        <h3 className="font-medium text-sm">On this page</h3>
        <div className="pb-2 pt-0.5 overflow-y-auto">
          <TocObserver data={toc} />
        </div>
      </div>
    </div>
  );
}
