"use client";

import { deleteFolder, renameFolder } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
import { useMutationData } from "@/hooks/useMutationData";
import { cn } from "@/lib/utils";
import { FolderIcon, Trash2 } from "lucide-react";
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

  const { mutate: removeFolder, isPending: isDeleting } = useMutationData(
    ["delete-folder"],
    () => deleteFolder(id),
    "workspace-folders",
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

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (
      window.confirm(
        `Delete “${name}”? Videos in this folder will remain in the workspace.`,
      )
    ) {
      removeFolder({});
    }
  };

  return (
    <div
      onClick={handleFolderClick}
      className={cn(
        "group relative flex min-w-55 cursor-pointer flex-col gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 transition-all duration-300",
        "hover:border-[#ff4c0f]/60 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/20",
        optimistic && "animate-pulse opacity-60"
      )}
    >
      <button
        type="button"
        aria-label={`Delete ${name}`}
        disabled={isDeleting}
        onClick={handleDelete}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/90 text-zinc-400 opacity-0 shadow-lg shadow-black/20 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-700 hover:text-zinc-100 group-hover:opacity-100 focus:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c0f]/15 transition-colors group-hover:bg-[#ff4c0f]">
        <FolderIcon className="h-5.5 w-5.5 text-[#ff784c] transition-colors group-hover:text-black" />
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
