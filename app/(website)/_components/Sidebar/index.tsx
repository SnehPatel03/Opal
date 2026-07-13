"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

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

import { getNotifications } from "@/actions/user";
import { getWorkspaces } from "@/actions/workspace";

import { MENU_ITEMS } from "@/constants";

import { userQueryData } from "@/hooks/userQueryData";

import {
  NotifactionProps,
  WorkspaceProps,
} from "@/types/index.type";

import { Modal } from "../Modal";
import SearchWorkspaceMember from "../SearchWorkspaceMember";
import SidebarItem from "./SidebarItems";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: workspaces, isFetched } = userQueryData(
    ["user-workspaces"],
    getWorkspaces
  );

  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications
  );

  const workspace = (workspaces as WorkspaceProps | undefined)?.data;
  const count = (notifications as NotifactionProps | undefined)?.data;

  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    useState(activeWorkspaceId);

  const selectedWorkspaceName = useMemo(() => {
    if (!workspace) return "";

    const own = workspace.workspace.find(
      (workspace) => workspace.id === selectedWorkspaceId
    );

    if (own) return own.name;

    const member = workspace.members.find(
      (member) => member.Workspace.id === selectedWorkspaceId
    );

    return member?.Workspace.name ?? "";
  }, [workspace, selectedWorkspaceId]);

  const currentWorkspace = workspace?.workspace.find(
    (workspace) => workspace.id === activeWorkspaceId
  );

  const onChangeActiveWorkspace = (value: string | null) => {
    if (!value) return;

    setSelectedWorkspaceId(value);
    router.push(`/dashboard/${value}`);
  };

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-[#111111] text-white">
      {/* Logo */}
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

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Workspace Switcher */}
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

        {/* Invite Button */}
        {currentWorkspace?.type === "PUBLIC" &&
          workspace?.subscription?.plan === "PRO" && (
            <Modal
              title="Invite To Workspace"
              description="Invite other users to your workspace"
              trigger={
                <span className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-800/90 bg-neutral-900 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-800">
                  <PlusCircle size={16} className="text-neutral-400" />
                  <span>Invite To Workspace</span>
                </span>
              }
            >
              <div className="space-y-4">
                <SearchWorkspaceMember workspaceId={activeWorkspaceId} />
              </div>
            </Modal>
          )}

        {/* Menu */}
        <div className="mt-6 mb-3 px-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Menu
          </p>
        </div>

        <nav className="mt-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.title}
                {...item}
                selected={pathname === item.href}
                notification={
                  item.title === "Notifications"
                    ? count?._count?.notification ?? 0
                    : undefined
                }
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;