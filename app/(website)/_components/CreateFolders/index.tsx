"use client";

import { FolderIcon, FolderPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreateFolder } from "@/hooks/useCreateFolder";

type Props = {
  workspaceId: string;
};

const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolder(workspaceId);

  return (
    <Button
      onClick={onCreateNewFolder}
      className="h-7 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 transition-colors"
    >
      <FolderIcon className="mr-2 h-2 w-2" />
      Create Folder
    </Button>
  );
};

export default CreateFolders;
