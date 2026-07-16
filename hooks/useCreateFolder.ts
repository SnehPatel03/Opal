import { createFolder } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolder = (workspaceId: string) => {
  const { mutate, isPending } = useMutationData(
    ["create-folders"],
    (data: { name: string; id: string }) => createFolder(workspaceId),
    "workspace-folders",
  );

  const onCreateNewFolder = () => {
    mutate({ name: "Untitled", id: "optimistic--id" });
  };
  return { onCreateNewFolder };
};
