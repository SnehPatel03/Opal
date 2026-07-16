"use client";

import React from "react";
import { Plus } from "lucide-react";

import { getWorkspaces } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";

import { Modal } from "../Modal";
import WorkspaceForm from "../../Forms/WorkspaceForm";

const CreateWorkspace = () => {
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
      title="Create Workspace"
      description="Create a dedicated workspace for your projects, videos, and team members."
      trigger={
        <span className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-neutral-200 active:scale-[0.98]">
          <Plus size={15} strokeWidth={2.2} />
          <span>Create Workspace</span>
        </span>
      }
    >
        <WorkspaceForm/>
    </Modal>
  );
};

export default CreateWorkspace;
