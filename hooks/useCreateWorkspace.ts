import { toast } from "sonner";

import { CreateWorkspaces } from "@/actions/workspace";
import { workspaceSchema } from "@/app/(website)/Forms/WorkspaceForm/schema";

import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspaces"],
    async (data: { name: string }) => {
      const res = await CreateWorkspaces(data.name);
      console.log(res);
      return res;
    },
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
