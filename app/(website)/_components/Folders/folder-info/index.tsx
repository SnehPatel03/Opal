"use client";

import { getFolderInfo } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";
import { FolderIcon } from "lucide-react";

type Props = {
  folderId: string;
};

type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = userQueryData(["folder-info", folderId], () =>
    getFolderInfo(folderId)
  );

  if (!data) return null;

  const folder = (data as FolderProps).data;

  return (
    <div className="mb-8 flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#171717] p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800">
          <FolderIcon className="h-7 w-7 text-zinc-300" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {folder.name}
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            {folder._count.videos}{" "}
            {folder._count.videos === 1 ? "video" : "videos"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FolderInfo;