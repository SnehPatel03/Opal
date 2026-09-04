"use client";

import { useIsFetching } from "@tanstack/react-query";
import LoadingComponent from "../loadingComponent";

type Props = {
  workspaceId: string;
};

const LibraryLoading = ({ workspaceId }: Props) => {
  const foldersFetching = useIsFetching({
    queryKey: ["workspace-folders", workspaceId],
  });
  const videosFetching = useIsFetching({
    queryKey: ["workspace-videos", workspaceId],
  });

  return foldersFetching || videosFetching ? <LoadingComponent /> : null;
};

export default LibraryLoading;
