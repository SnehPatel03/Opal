import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import React from "react";
import FormGenerator from "../FormGenerator";
import { Button } from "@/components/ui/button";

type Props = {};

const WorkspaceForm = (props: Props) => {
  const { errors, register, isPending, onFormSubmit } = useCreateWorkspace();
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
        className="text-sm w-full mt-2"
        disabled={isPending}
        type="submit"
      >
        Create Workspace
      </Button>
    </form>
  );
};

export default WorkspaceForm;
