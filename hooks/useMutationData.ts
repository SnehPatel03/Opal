import { prisma } from "@/lib/prisma";
import {
  MutateFunction,
  MutationFunction,
  MutationKey,
  QueryKey,
  useMutation,
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
      if (onSuccess) onSuccess();
     if (data?.status === 200) {
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
