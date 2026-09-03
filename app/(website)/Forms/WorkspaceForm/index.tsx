import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import React from "react";
import FormGenerator from "../FormGenerator";
import { Button } from "@/components/ui/button";

type Props = { onSuccess?: () => void };

const WorkspaceForm = ({ onSuccess }: Props) => {
  const { errors, register, isPending, onFormSubmit } = useCreateWorkspace(onSuccess);
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3 ">
      <FormGenerator
        name="name"
        register={register}
        type="text"
        inputType="input"
        placeholder="Workspace Name"
        label="Name"
        errors={errors}
      />
      <Button
        className="mt-2 w-full rounded-xl bg-[#ff4c0f] text-sm font-bold text-black hover:bg-[#ff6840]"
        disabled={isPending}
        type="submit"
      >
        Create Workspace
      </Button>
    </form>
  );
};

export default WorkspaceForm;
