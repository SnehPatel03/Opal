"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

import { getWorkspaces } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";

import { Modal } from "../Modal";
import WorkspaceForm from "../../Forms/WorkspaceForm";

const CreateWorkspace = () => {
  const [open, setOpen] = useState(false);
  const { data } = userQueryData(["user-workspaces"], getWorkspaces);

  const plan = (data as
    | {
        status: number;
        data: {
          subscription: {
            plan: "FREE" | "PRO";
          } | null;
        };
      }
    | undefined)?.data;

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Create Workspace"
      description="Create a dedicated workspace for your projects, videos, and team members."
      trigger={
        <span className="flex h-9 items-center gap-1.5 rounded-xl border border-white/[.1] bg-white/[.055] px-3 text-sm font-medium text-white/75 transition-all duration-200 hover:border-white/[.2] hover:bg-white/[.1] hover:text-white active:scale-[0.98]">
          <Plus size={15} strokeWidth={2.2} />
          <span>Create Workspace</span>
        </span>
      }
    >
        <WorkspaceForm onSuccess={() => setOpen(false)} />
    </Modal>
  );
};

export default CreateWorkspace;
