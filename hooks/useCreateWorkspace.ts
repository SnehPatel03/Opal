import { CreateWorkspaces } from "@/actions/workspace";
import { workspaceSchema } from "@/app/(website)/Forms/WorkspaceForm/schema";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";

export const useCreateWorkspace = (onSuccess?: () => void) => {
  const { mutate, isPending } = useMutationData(
    ["create-workspaces"],
    (data: { name: string }) => CreateWorkspaces(data.name),
    "user-workspaces",
    onSuccess,
  );

  const { register, errors, onFormSubmit, reset } = useZodForm(
    workspaceSchema,
    mutate,
    {
      name: "",
    },
  );

  return {
    register,
    errors,
    onFormSubmit,
    isPending,
    reset,
  };
};
