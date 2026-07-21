"use client";

import { renameFolder } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
import { useMutationData } from "@/hooks/useMutationData";
import { cn } from "@/lib/utils";
import { FolderIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type Props = {
  id: string;
  name: string;
  count?: number;
  optimistic?: boolean;
};

const Folder = ({ id, name, count, optimistic }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
console.log("count",count)
  const inputRef = useRef<HTMLInputElement>(null);

  const [onRename, setOnRename] = useState(false);

  const { mutate } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => renameFolder(id, data.name),
    "workspace-folders",
    () => {
      setOnRename(false);
    }
  );

  const updateFolderName = () => {
    const newName = inputRef.current?.value.trim();

    if (!newName || newName === name) {
      setOnRename(false);
      return;
    }

    mutate({ name: newName });
  };

  const handleFolderClick = () => {
    if (onRename) return;

    router.push(`${pathname}/folder/${id}`);
  };

  return (
    <div
      onClick={handleFolderClick}
      className={cn(
        "group flex min-w-55 cursor-pointer flex-col gap-3 rounded-2xl border border-zinc-800 bg-[#171717] p-4 transition-all duration-200",
        "hover:border-zinc-700 hover:bg-zinc-900",
        optimistic && "animate-pulse opacity-60"
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 transition-colors group-hover:bg-zinc-700">
        <FolderIcon className="h-5.5 w-5.5 text-zinc-300" />
      </div>

      <div className="space-y-0.5">
        {onRename ? (
          <Input
            ref={inputRef}
            defaultValue={name}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onBlur={updateFolderName}
            onKeyDown={(e) => {
              e.stopPropagation();

              if (e.key === "Enter") {
                e.currentTarget.blur();
              }

              if (e.key === "Escape") {
                setOnRename(false);
              }
            }}
            className="h-7 rounded-none border-0 border-b border-zinc-700 bg-transparent px-0 text-base font-bold text-neutral-200 shadow-none focus:border-white focus-visible:ring-0"
          />
        ) : (
          <h2
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setOnRename(true);
            }}
            className="truncate text-base font-bold text-neutral-200"
          >
            {name}
          </h2>
        )}

        <p className="text-sm text-zinc-500">
          {count} {count === 1 || count === 0 ? "video" : "videos"}
        </p>
      </div>
    </div>
  );
};

export default Folder;