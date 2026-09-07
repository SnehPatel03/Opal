"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PlusCircle, Trash2, X } from "lucide-react";

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
import { deleteWorkspace, getWorkspaces } from "@/actions/workspace";
import { MENU_ITEMS } from "@/constants";
import { userQueryData } from "@/hooks/userQueryData";
import { NotifactionProps, WorkspaceProps } from "@/types/index.type";
import { Modal } from "../Modal";
import SearchWorkspaceMember from "../SearchWorkspaceMember";
import SidebarItem from "./SidebarItems";
import GlobalCard from "../GlobalCard";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
import PaymentButton from "../Payment-Button";
import { useMutationData } from "@/hooks/useMutationData";
import Link from "next/link";

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

  const { data, isFetched } = userQueryData(["user-workspaces"], getWorkspaces);
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
  const { mutate: removeWorkspace, isPending: isDeletingWorkspace } =
    useMutationData(
      ["delete-workspace"],
      () => deleteWorkspace(activeWorkspaceId),
      "user-workspaces",
      () =>
        router.push(
          `/dashboard/${workspace?.workspace.find((item) => item.type === "PERSONAL")?.id ?? ""}`,
        ),
    );

  const handleDeleteWorkspace = () => {
    if (
      window.confirm(
        `Delete “${currentWorkspace?.name}”? Its folders, videos, and workspace members will be removed.`,
      )
    ) {
      removeWorkspace({});
    }
  };

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
    <aside className="opal-sidebar flex h-screen w-68 flex-col overflow-hidden border-r border-white/[0.08] text-neutral-200">
    
    <Link
  href="/"
  className="
    group relative flex h-[73px] shrink-0 cursor-pointer
    items-center justify-center overflow-hidden
    border-b border-white/[0.08]
    px-5
    transition-all duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:border-[#ff4c0f]
  "
>

  <div
    className="
      absolute inset-0
      origin-left scale-x-0
      bg-[#ff4c0f]
      transition-transform duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:scale-x-100
    "
  />

  {/* Content */}
  <div className="relative z-10 flex h-full w-full justify-center items-center">

    {/* Logo */}
    <Image
      src="/logo.svg"
      alt="Opal Logo"
      width={72}
      height={72}
      priority
      className="
        shrink-0
        transition-all duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-0
        group-hover:opacity-0
        group-hover:-rotate-45
      "
    />


    <span
      className="
  pointer-events-none
  absolute left-0

  translate-x-[-40px]
  translate-y-[3px]
  scale-x-[0.9]
  scale-y-[1.02]
  rotate-[-3deg]

  font-black
  uppercase
  leading-[0.72]
  tracking-[-0.14em]

  text-[4rem]
  text-black

  opacity-0

  transition-all
  duration-500
  ease-[cubic-bezier(0.16,1,0.3,1)]

  group-hover:translate-x-0
  group-hover:translate-y-0
  group-hover:scale-x-100
  group-hover:scale-y-100
  group-hover:rotate-[-2deg]
  group-hover:opacity-100
"
    >
      OPAL
    </span>
  </div>
  <span
    className="
      absolute right-5 z-10
      translate-x-4
      -translate-y-1
      rotate-[-20deg]

      text-[25px]
      font-black
      text-black

      opacity-0

      transition-all duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]

      group-hover:translate-x-0
      group-hover:translate-y-0
      group-hover:rotate-0
      group-hover:opacity-100
    "
  >
    ↗
  </span>
</Link>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3">
        <Select
          value={selectedWorkspaceId}
          onValueChange={onChangeActiveWorkspace}
        >
          <SelectTrigger className="w-full rounded-xl border-white/[.1] bg-white/[.055] text-sm shadow-[inset_0_1px_rgba(255,255,255,.06)] hover:bg-white/[.08]">
            <SelectValue placeholder="Select Workspace">
              {mounted
                ? selectedWorkspaceName || "Select Workspace"
                : "Select Workspace"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="border-white/[.1] bg-[#161618]/95 text-neutral-200 backdrop-blur-2xl">
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
          <ul className="space-y-1 opal-stagger">
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
            <div className="flex items-center justify-between border-b border-white/[.08] px-3 py-2 mt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Workspaces
                </p>
              </div>
            </div>
            {listedWorkspaces.length > 0 ? (
              <div className="relative mt-2 overflow-hidden rounded-xl border border-white/[.08] bg-white/[.035] backdrop-blur-xl">
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
              <div className="mt-2 rounded-xl border border-dashed border-white/[.1] bg-black/10 py-6 text-center">
                <p className="text-xs text-zinc-400">No Workspaces</p>
              </div>
            )}
          </>
        )}

        {mounted && currentWorkspace?.type === "PUBLIC" && (
          <button
            type="button"
            onClick={handleDeleteWorkspace}
            disabled={isDeletingWorkspace}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[.08] bg-white/[.025] px-3 py-2 text-xs font-medium text-white/40 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200 disabled:opacity-50"
          >
            <Trash2 size={14} />{" "}
            {isDeletingWorkspace ? "Deleting workspace…" : "Delete workspace"}
          </button>
        )}

        {mounted && workspace?.subscription?.plan === "FREE" && (
          <GlobalCard
            className="mt-auto"
            title="Upgrade to Pro"
            description="Unlock AI Features like transcription, AI Summary and effortless collaboration."
            footer={<PaymentButton />}
          />
        )}

        {/* This block is already safe because it only depends on workspace, but we include it in mounted for consistency */}
        {mounted &&
          workspace?.workspace.length === 1 &&
          workspace.members.length === 0 && (
            <div className="w-full">
              <p className="text-[#3c3c3c] font-medium text-[14px] px-2 mt-2">
                {workspace.subscription?.plan === "FREE"
                  ? ""
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
