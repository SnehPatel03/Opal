"use client";

import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useMoveVideos";

type Props = {
  videoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  const { register, onFormSubmit, workspaces, isFolders, isPending } =
    useMoveVideos(videoId, currentWorkspace);

  console.log("=========== MOVE VIDEO DEBUG ===========");
  console.log("Current Workspace ID :", currentWorkspace);
  console.log("Current Folder ID :", currentFolder);
  console.log("User Workspaces :", workspaces);
  console.log("Fetched Folders :", isFolders);
  console.log("========================================");

  const workspace = workspaces.find((item) => item.id === currentWorkspace);

  console.log("Matched Workspace :", workspace);

  return (
    <>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-7 pt-2">
        {/* Current Location */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Current Location
          </h3>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-zinc-500">Workspace</p>

              <p className="mt-1 text-lg font-semibold text-white">
                {workspace?.name ?? "Workspace Not Found"}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Folder</p>

              <p className="mt-1 text-lg font-semibold text-white">
                {currentFolderName }
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        {/* Workspace Dropdown */}
        <div>
          <label
            htmlFor="workspace"
            className="mb-3 block text-sm font-medium text-zinc-300"
          >
            Select Workspace
          </label>

          <div className="relative">
            <select
              id="workspace"
              {...register("workspace_id")}
              className="
              h-14
              w-full
              appearance-none
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-900
              px-5
              pr-14
              text-base
              font-medium
              text-white
              transition-all
              outline-none
              hover:border-zinc-500
              focus:border-white
              focus:ring-2
              focus:ring-white/10
            "
            >
              {workspaces.map((workspace) => (
                <option key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </option>
              ))}
            </select>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Folder Dropdown */}
        <div>
          <label
            htmlFor="folder"
            className="mb-3 block text-sm font-medium text-zinc-300"
          >
            Select Folder
          </label>

          <div className="relative">
            <select
              id="folder"
              {...register("folder_id")}
              className="
              h-14
              w-full
              appearance-none
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-900
              px-5
              pr-14
              text-base
              font-medium
              text-white
              transition-all
              outline-none
              hover:border-zinc-500
              focus:border-white
              focus:ring-2
              focus:ring-white/10
            "
            >
              {isFolders?.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="
          mt-2
          h-14
          w-full
          rounded-2xl
          bg-white
          text-base
          font-semibold
          text-black
          transition-all
          hover:bg-zinc-200
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        >
          {isPending ? "Moving Video..." : "Move Video"}
        </button>
      </form>
    </>
  );
};

export default ChangeVideoLocation;
