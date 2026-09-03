"use client";

import { Workspace } from "@/generated/prisma/client";
import { usePathname } from "next/navigation";
import CreateWorkspace from "../CreateWorkspace";

type Props = {
  workspace: Workspace;
};

const GlobalHeader = ({ workspace }: Props) => {
  const pathname = usePathname();
  const currentPath = pathname.split(`/dashboard/${workspace.id}`)[1];

  // The video review view owns its own compact metadata header.
  if (currentPath?.includes("/video/")) return null;

  const title =
    currentPath && !currentPath.includes("folder")
      ? ''
      : "My Library";

  return (
    <header className="mb-8 flex items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {workspace.type}
        </span>

        <h1 className="text-2xl font-black uppercase tracking-[-.06em] text-white sm:text-4xl">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h1>
      </div>

      <CreateWorkspace />
    </header>
  );
};

export default GlobalHeader;
