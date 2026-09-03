import { prisma } from "@/lib/prisma";
import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  querykey?: string,
  onSuccess?: () => void,
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      if (data?.status === 200) {
        if (onSuccess) onSuccess();
        return toast.success("Success", {
          description: data?.data,
        });
      }

      return toast.error("Error", {
        description: data?.data,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: [querykey] });
    },
  });
  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables,
        status: mutation.state.status,
      };
    },
  });

  const latestVariable = data[data.length - 1];
  return { latestVariable };
};
