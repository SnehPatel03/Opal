import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

export const userQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  options?: Pick<UseQueryOptions, "staleTime" | "refetchOnMount">,
) => {
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    ...options,
  });
  return {
    data,
    isPending,
    isFetched,
    refetch,
    isFetching,
  };
};
