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

import { NotifactionProps, WorkspaceProps } from "@/types/index.type";

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
    getWorkspaces,
  );

  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications,
  );

  const workspace = (workspaces as WorkspaceProps | undefined)?.data;
  const count = (notifications as NotifactionProps | undefined)?.data;

  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    useState(activeWorkspaceId);

  const selectedWorkspaceName = useMemo(() => {
    if (!workspace) return "";

    const own = workspace.workspace.find(
      (workspace) => workspace.id === selectedWorkspaceId,
    );

    if (own) return own.name;

    const member = workspace.members.find(
      (member) => member.Workspace.id === selectedWorkspaceId,
    );

    return member?.Workspace.name ?? "";
  }, [workspace, selectedWorkspaceId]);

  const currentWorkspace = workspace?.workspace.find(
    (workspace) => workspace.id === activeWorkspaceId,
  );

  const onChangeActiveWorkspace = (value: string | null) => {
    if (!value) return;

    setSelectedWorkspaceId(value);
    router.push(`/dashboard/${value}`);
  };

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  return (
    <aside className="flex h-screen w-64 flex-col overflow-hidden border-r border-zinc-800 bg-[#111111] text-white">
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


      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
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
                    ? (count?._count?.notification ?? 0)
                    : undefined
                }
              />
            ))}
          </ul>
        </nav>

        <div className="h-px via-zinc-800 to-transparent" />

        <div className="flex items-center justify-between border-b border-zinc-800/60 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Workspaces
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              {workspace?.workspace.length ?? 0} Workspace
              {(workspace?.workspace.length ?? 0) !== 1 && "s"}
            </p>
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[11px] font-semibold text-zinc-400">
            {workspace?.workspace.length ?? 0}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#151515]/80 backdrop-blur-xl mt-2">
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-12 w-full bg-gradient-to-b from-[#151515] via-[#151515]/90 to-transparent" />

          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-12 w-full bg-gradient-to-t from-[#151515] via-[#151515]/90 to-transparent" />

          <div className="no-scrollbar max-h-72 space-y-1 overflow-y-auto p-3 scroll-smooth">
            {workspace?.workspace.map((item) => (
              <SidebarItem
                key={item.id}
                title={item.name}
                href={`/dashboard/${item.id}`}
                selected={pathname === `/dashboard/${item.id}`}
                icon={
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-800 text-[11px] font-semibold text-zinc-200 shadow-inner shadow-black/40">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                }
              />
            ))}

            {workspace && workspace.workspace.length === 0 && (
              <div className="rounded-xl border border-dashed border-zinc-800 py-10 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-500">
                  W
                </div>

                <p className="text-sm text-zinc-400">No Workspaces</p>

                <p className="mt-1 text-xs text-zinc-600">
                  Create your first workspace to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
