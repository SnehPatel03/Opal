import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const useZodForm = <TSchema extends any>(
  schema: any,
  mutation: UseMutateFunction<any, Error, z.infer<TSchema>, unknown>,
  defaultValues?: Partial<z.infer<any>>
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<any>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onFormSubmit = handleSubmit((values) => {
    mutation(values);
  });

  return {
    register,
    watch,
    reset,
    errors,
    isSubmitting,
    isValid,
    onFormSubmit,
  };
};

export default useZodForm;