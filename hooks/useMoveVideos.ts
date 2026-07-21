import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import {
  getWorkspaceFolders,
  getWorkspaces,
  moveVideoLocation,
} from "@/actions/workspace";
import useZodForm from "./useZodForm";
import { moveVideoLocationSchema } from "@/app/(website)/Forms/ChangeVideoLocation/schema";
import { userQueryData } from "./userQueryData";
import { WorkspaceProps } from "@/types/index.type";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { data: workspaceData } = userQueryData(
    ["user-workspaces"],
    getWorkspaces,
  );

  const workspaceResponse = workspaceData as WorkspaceProps | undefined;
  const workspaces = [
    ...(workspaceResponse?.data.workspace ?? []),
    ...(workspaceResponse?.data.members.map((member) => member.Workspace) ?? []),
  ];

  // fetching states
  const [isFetching, setIsFetching] = useState(false);

  //state Folders &workspace
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workspaceId: string | null;
      })[]
    | undefined
  >(undefined);

  //use mutation data optimistic chnages
  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id?: string; workspace_id: string }) =>
      moveVideoLocation(videoId, data.workspace_id, data.folder_id ?? ""),
  );

  // use-zodForms
  const { errors, onFormSubmit, register, watch } = useZodForm(
    moveVideoLocationSchema,
    mutate,
    { folder_id: null, workspace_id: currentWorkspace },
  );

  //fetch Folders & workspaces with useeffect
  const fetchFolders = async (workspaces: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workspaces);
    setIsFetching(false);
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) fetchFolders(value.workspace_id);
    });

    return () => workspace.unsubscribe()
  }, [watch]);

  return{
    onFormSubmit,
    register,
    errors,
    isPending,
    isFetching,
    isFolders,
    workspaces
  }
};
