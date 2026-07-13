"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getWorkspaces } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";
import { WorkspaceProps } from "@/types/index.type";
import { Modal } from "../Modal";
import { PlusCircle } from "lucide-react";
import SearchWorkspaceMember from "../SearchWorkspaceMember";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

  const { data, isFetched } = userQueryData(["user-workspaces"], getWorkspaces);

  const workspace = (data as WorkspaceProps | undefined)?.data;

  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    useState(activeWorkspaceId);

  const selectedWorkspaceName = useMemo(() => {
    if (!workspace) return "";

    const own = workspace.workspace.find((w) => w.id === selectedWorkspaceId);

    if (own) return own.name;

    const member = workspace.members.find(
      (m) => m.Workspace.id === selectedWorkspaceId,
    );

    return member?.Workspace.name ?? "";
  }, [workspace, selectedWorkspaceId]);

  const onChangeActiveWorkspace = (value: string | null) => {
    if (!value) return;

    setSelectedWorkspaceId(value);
    router.push(`/dashboard/${value}`);
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-[#111111] text-white">
      <div className="flex items-center justify-center gap-2 border-b border-zinc-800 py-8">
        <Image
          src="/logo.svg"
          alt="Opal Logo"
          width={40}
          height={40}
          priority
        />

        <h1 className="text-3xl font-semibold">Opal</h1>
      </div>

      <div className="p-4">
        <Select
          value={selectedWorkspaceId}
          onValueChange={onChangeActiveWorkspace}
        >
          <SelectTrigger className="w-full border-zinc-700 bg-zinc-900">
            <SelectValue placeholder="Select Workspace">
              {selectedWorkspaceName || "Select Workspace"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="border-zinc-800 bg-[#111111] text-white">
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>

              {isFetched &&
                workspace?.workspace.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectGroup>

            {workspace && workspace.members.length > 0 && (
              <>
                <SelectSeparator />

                <SelectGroup>
                  <SelectLabel>
                    Member Workspaces ({workspace.members.length})
                  </SelectLabel>

                  {workspace.members.map((member) => (
                    <SelectItem
                      key={member.Workspace.id}
                      value={member.Workspace.id}
                    >
                      {member.Workspace.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </>
            )}
          </SelectContent>
        </Select>

        <Modal
          title="Invite To Workspace"
          description="Invite other users to your workspace"
          trigger={
            <span className="flex  mt-3 w-[15vw] cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-800/90  bg-neutral-900 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 ">
              <PlusCircle size={16} className="text-neutral-400" />
              <span>Invite To Workspace</span>
            </span>
          }
        >
          <div className="space-y-4">
            <SearchWorkspaceMember/>
          </div>
        </Modal>
      </div>
    </aside>
  );
};

export default Sidebar;
