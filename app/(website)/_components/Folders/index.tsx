"use client";

import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";
import { userQueryData } from "@/hooks/userQueryData";
import { cn } from "@/lib/utils";
import { ArrowRight, Folder as FolderIcon } from "lucide-react";
import Folder from "./folder";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

export type FolderProps = {
  status: number;
  data: {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
    _count: {
      videos: number;
    };
  }[];
};

const Folders = ({ workspaceId }: Props) => {
  const { data, isFetched, isPending } = userQueryData(
    ["workspace-folders", workspaceId],
    () => getWorkspaceFolders(workspaceId),
  );

  const dispatch = useDispatch();

  const { latestVariable }: any = useMutationDataState(["create-folders"]);

  if (isPending) {
    return null;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-10 text-zinc-400">
        Failed to load folders.
      </div>
    );
  }

  const { status, data: foldersData } = data as FolderProps;
  if (isFetched && foldersData) {
    dispatch(FOLDERS(foldersData));
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderIcon className="h-5 w-5 text-zinc-400" />
          <h2 className="text-xl font-semibold text-neutral-200">Folders</h2>
        </div>
      </div>

      <section
        className={cn(
          "flex gap-4 overflow-x-auto pb-2",
          status !== 200 && "justify-center",
        )}
      >
        {latestVariable?.status === "pending" && (
          <Folder
            id={latestVariable.variables.id}
            name={latestVariable.variables.name}
            count={0}
            optimistic
          />
        )}

        {status !== 200 ? (
          <p className="text-zinc-400">Unable to load folders.</p>
        ) : foldersData.length === 0 ? (
          <p className="text-zinc-400">No folders in workspace yet.</p>
        ) : (
          foldersData.map((folder) => (
            <Folder
              key={folder.id}
              id={folder.id}
              name={folder.name}
              count={folder._count.videos}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Folders;
