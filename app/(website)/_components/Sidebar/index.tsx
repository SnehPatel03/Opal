"use client";

import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PlusCircle, X } from "lucide-react";

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
import GlobalCard from "../GlobalCard";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();


  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const { data, isFetched } = userQueryData(
    ["user-workspaces"],
    getWorkspaces,
  );
  const { data: workspace } = data as WorkspaceProps;

  useEffect(() => {
    const openSidebar = () => setSidebarOpen(true);
    window.addEventListener("open-sidebar", openSidebar);
    return () => window.removeEventListener("open-sidebar", openSidebar);
  }, []);

  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications,
  );

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

  useEffect(() => {
    if (isFetched && workspace) {
      dispatch(WORKSPACES(workspace.workspace));
    }
  }, [dispatch, isFetched, workspace]);

  const onChangeActiveWorkspace = (value: string | null) => {
    if (!value) return;
    setSelectedWorkspaceId(value);
    router.push(`/dashboard/${value}`);
  };

  const menuItems = MENU_ITEMS(activeWorkspaceId);
  const ownedWorkspaces =
    workspace?.workspace.filter((item) => item.type !== "PERSONAL") ?? [];
  const listedWorkspaces = [
    ...ownedWorkspaces,
    ...(workspace?.members.map((member) => member.Workspace) ?? []),
  ];

  const sidebarContent = (
    <aside className="flex h-screen w-64 flex-col overflow-hidden border-r border-zinc-800 bg-[#111111] text-neutral-200">
      <div className="flex items-center justify-center gap-2 border-b border-zinc-800 py-3 px-4">
        <Image
          src="/logo.svg"
          alt="Opal Logo"
          width={32}
          height={32}
          priority
        />
        <h1 className="text-2xl font-semibold">Opal</h1>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
        <Select
          value={selectedWorkspaceId}
          onValueChange={onChangeActiveWorkspace}
        >
          <SelectTrigger className="w-full border-zinc-700 bg-zinc-900 text-sm">
            <SelectValue placeholder="Select Workspace">
              {mounted
                ? selectedWorkspaceName || "Select Workspace"
                : "Select Workspace"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="border-zinc-800 bg-[#111111] text-neutral-200">
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


        {mounted &&
          currentWorkspace?.type === "PUBLIC" &&
          workspace?.subscription?.plan === "PRO" && (
            <Modal
              title="Invite To Workspace"
              description="Invite other users to your workspace"
              trigger={
                <span className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-800/90 bg-neutral-900 px-3 py-2 text-xs text-neutral-300 transition-colors hover:bg-neutral-800">
                  <PlusCircle size={14} className="text-neutral-400" />
                  <span>Invite</span>
                </span>
              }
            >
              <div className="space-y-4">
                <SearchWorkspaceMember workspaceId={activeWorkspaceId} />
              </div>
            </Modal>
          )}

        <SelectSeparator className="mt-2" />

        <div className="mt-2 mb-2 px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Menu
          </p>
        </div>

        <nav className="mt-1">
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.title}
                {...item}
                selected={pathname === item.href}
                notification={
                  mounted && item.title === "Notifications"
                    ? (count?._count?.notification ?? 0)
                    : undefined
                }
              />
            ))}
          </ul>
        </nav>

        {mounted && (
          <>
            <div className="flex items-center justify-between border-b border-zinc-800/60 px-3 py-2 mt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Workspaces
                </p>
              </div>
            </div>
            {listedWorkspaces.length > 0 ? (
              <div className="relative mt-2 overflow-hidden rounded-lg border border-zinc-800/60 bg-[#151515]/80 backdrop-blur-xl">
                <div className="pointer-events-none absolute top-0 left-0 z-20 h-8 w-full bg-linear-to-b from-[#151515] via-[#151515]/90 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-8 w-full bg-linear-to-t from-[#151515] via-[#151515]/90 to-transparent" />
                <div className="no-scrollbar max-h-40 space-y-0.5 overflow-y-auto p-2 py-2 scroll-smooth">
                  {listedWorkspaces.map((item) => (
                    <SidebarItem
                      key={item.id}
                      title={item.name}
                      href={`/dashboard/${item.id}`}
                      selected={pathname === `/dashboard/${item.id}`}
                      icon={
                        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-700/80 bg-neutral-600 text-[11px] font-semibold text-black">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-2 rounded-lg border border-dashed border-zinc-800 py-6 text-center">
                <p className="text-xs text-zinc-400">No Workspaces</p>
              </div>
            )}
          </>
        )}

        {mounted && workspace?.subscription?.plan === "FREE" && (
          <GlobalCard
            className="mt-auto"
            title="Upgrade to Pro"
            description="Unlock AI Features like transcription, AI Summary and effortless collaboration."
            footer={
              <button className="w-full rounded-lg bg-neutral-200 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                Upgrade Now
              </button>
            }
          />
        )}

        {/* This block is already safe because it only depends on workspace, but we include it in mounted for consistency */}
        {mounted && workspace?.workspace.length === 1 && workspace.members.length === 0 && (
          <div className="w-full">
            <p className="text-[#3c3c3c] font-medium text-[14px] px-2 mt-2">
              {workspace.subscription?.plan === "FREE"
                ? "Upgrade to Create Workspaces."
                : ""}
            </p>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:flex">{sidebarContent}</div>

      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          {sidebarContent}

          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-2.5 right-4 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-neutral-200"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
