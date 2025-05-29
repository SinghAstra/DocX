"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import Copy from "./copy";

export default function Pre({
  children,
  raw,
  filename,
  ...rest
}: ComponentProps<"pre"> & {
  raw?: string;
  filename?: string;
}) {
  const [showMaximize, setShowMaximize] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowMaximize(false);
      }
    };

    if (showMaximize) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMaximize]);

  return (
    <div className=" relative rounded  w-full border mx-auto ">
      <div className="text-sm bg-muted/30 px-3 py-1 border-b  rounded-t flex items-center justify-between">
        <span className="tracking-widest ">{filename}</span>
        <div className="ml-auto flex gap-2">
          <div
            className="border w-6 h-6 flex items-center justify-center rounded cursor-pointer hover:bg-muted transition-all duration-200"
            onClick={() => setShowMaximize(true)}
          >
            <Maximize2 className="w-3 h-3 text-muted-foreground" />
          </div>
          <Copy content={raw!} fileName={filename} />
        </div>
      </div>
      <div className="overflow-x-auto p-2 ">
        <pre {...rest}>{children}</pre>
      </div>

      {showMaximize && (
        <div className="absolute inset-0 ">
          <div className="relative w-full h-full  flex items-center justify-center backdrop-blur-sm">
            <motion.div
              className={`bg-muted/30 rounded-xl border w-full max-w-lg`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              ref={divRef}
            >
              <div className="text-sm bg-muted/30 px-3 py-1 border-b  rounded-t flex items-center justify-between">
                <span className="tracking-widest ">{filename}</span>
                <div className="ml-auto flex gap-2">
                  <div
                    className="border w-6 h-6 flex items-center justify-center rounded cursor-pointer hover:bg-muted transition-all duration-200"
                    onClick={() => setShowMaximize(true)}
                  >
                    <Maximize2 className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <Copy content={raw!} fileName={filename} />
                </div>
              </div>
              <div className="overflow-x-auto p-2 ">
                <pre {...rest}>{children}</pre>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
