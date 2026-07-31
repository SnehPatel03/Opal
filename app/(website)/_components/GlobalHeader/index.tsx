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

  const title =
    currentPath && !currentPath.includes("folder")
      ? ''
      : "My Library";

  return (
    <header className="mb-8 flex items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {workspace.type}
        </span>

        <h1 className="text-xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h1>
      </div>

      <CreateWorkspace />
    </header>
  );
};

export default GlobalHeader;
