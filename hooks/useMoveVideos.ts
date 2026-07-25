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

import { useAppDispatch, useAppSelector } from "@/redux/slices/store";
import { WORKSPACES } from "@/redux/slices/workspaces";
import { FOLDERS } from "@/redux/slices/folders";

export const useMoveVideos = (
  videoId: string,
  currentWorkspace: string,
) => {
  const dispatch = useAppDispatch();

  // Fetch Workspaces
  const { data: workspaceData } = userQueryData(
    ["user-workspaces"],
    getWorkspaces,
  );

  // Read from Redux
  const workspaces = useAppSelector(
    (state) => state.WorkspaceReducer.workspaces,
  );

  // Read folders from Redux
  const isFolders = useAppSelector(
    (state) => state.FolderReducer.folders,
  );

  // Store fetched workspaces into Redux
  useEffect(() => {
    if (!workspaceData) return;

    const workspaceResponse = workspaceData as WorkspaceProps;

    const allWorkspaces = [
      ...(workspaceResponse.data.workspace ?? []),
      ...(workspaceResponse.data.members.map(
        (member) => member.Workspace,
      ) ?? []),
    ];

    dispatch(WORKSPACES(allWorkspaces));
  }, [workspaceData, dispatch]);

  // Loading State
  const [isFetching, setIsFetching] = useState(false);

  // Mutation
  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id?: string; workspace_id: string }) =>
      moveVideoLocation(videoId, data.workspace_id, data.folder_id ?? ""),
  );

  // zodForm
  const { errors, onFormSubmit, register, watch } = useZodForm(
    moveVideoLocationSchema,
    mutate,
    {
      folder_id: null,
      workspace_id: currentWorkspace,
    },
  );

  // Fetch folders
  const fetchFolders = async (workspaceId: string) => {
    setIsFetching(true);

    const folders = await getWorkspaceFolders(workspaceId);

    dispatch(FOLDERS(folders.data));

    setIsFetching(false);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, [currentWorkspace]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.workspace_id) {
        fetchFolders(value.workspace_id);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    register,
    errors,
    isPending,
    isFetching,
    isFolders,
    workspaces,
  };
};