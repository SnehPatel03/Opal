import { CreateWorkspaces } from "@/actions/workspace";
import { workspaceSchema } from "@/app/(website)/Forms/WorkspaceForm/schema";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspaces"],
    (data: { name: string }) => CreateWorkspaces(data.name),
    "user-workspaces",
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
