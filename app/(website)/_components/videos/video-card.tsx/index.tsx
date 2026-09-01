"use client";

import { deleteVideo, renameVideo } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
import { useMutationData } from "@/hooks/useMutationData";
import React, { useRef, useState } from "react";
import {
  Calendar,
  Clock3,
  Pencil,
  Trash2,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import VideoMenu from "../video-card-menu";
import { cn } from "@/lib/utils";
import CopyLink from "../../CopyLink";

type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;
  videoQueryKey: string;
  videoUrl:string
};

const VideoCard = ({
  User,
  id,
  Folder,
  createdAt,
  title,
  source,
  processing,
  videoUrl,
  workspaceId,
  videoQueryKey,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);

  const videoSource = videoUrl?.trim() ?? "";

  const { mutate: updateTitle } = useMutationData(
    ["rename-video"],
    (data: { title: string }) =>
      renameVideo(id, data.title),
    videoQueryKey,
    () => setIsRenaming(false),
  );

  const {
    mutate: removeVideo,
    isPending: isDeleting,
  } = useMutationData(
    ["delete-video"],
    () => deleteVideo(id),
    videoQueryKey,
  );

  const saveTitle = () => {
    const nextTitle = inputRef.current?.value.trim();
    const currentTitle = title || "Untitled Video";

    if (!nextTitle || nextTitle === currentTitle) {
      setIsRenaming(false);
      return;
    }

    updateTitle({
      title: nextTitle,
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete “${title || "Untitled Video"}”? This cannot be undone.`,
      )
    ) {
      removeVideo({});
    }
  };

  const dayAgo =
    (new Date().getTime() - createdAt.getTime()) /
    (24 * 60 * 60 * 1000);

  const formattedDate = new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(createdAt);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717]",
        "transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900",
      )}
    >
      <div className="absolute right-3 top-3 z-30 flex items-center gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100 focus-within:opacity-100">
        <VideoMenu
          currentFolder={Folder?.id}
          currentFolderName={Folder?.name}
          videoId={id}
          currentWorkspace={workspaceId}
        />

        <CopyLink videoId={id} />

        <button
          type="button"
          aria-label="Rename video"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsRenaming(true);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/80 text-zinc-300 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white active:scale-95"
        >
          <Pencil size={16} />
        </button>

        <button
          type="button"
          aria-label="Delete video"
          disabled={isDeleting}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleDelete();
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <Link
        href={`/dashboard/${workspaceId}/video/${id}`}
        className="flex h-full flex-col transition duration-200 hover:bg-[#202020]"
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          {videoSource ? (
            <video
              preload="metadata"
              muted
              playsInline
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            >
              <source
                src={videoSource}
                type="video/webm"
              />
            </video>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Video className="h-10 w-10 text-zinc-600" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            {processing ? "Processing..." : "Ready"}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div>
            {isRenaming ? (
              <Input
                ref={inputRef}
                defaultValue={
                  title || "Untitled Video"
                }
                autoFocus
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onBlur={saveTitle}
                onKeyDown={(event) => {
                  event.stopPropagation();

                  if (event.key === "Enter") {
                    event.currentTarget.blur();
                  }

                  if (event.key === "Escape") {
                    setIsRenaming(false);
                  }
                }}
                className="h-7 rounded-none border-0 border-b border-zinc-600 bg-transparent px-0 text-base font-semibold text-white shadow-none focus:border-white focus-visible:ring-0"
              />
            ) : (
              <h2
                onDoubleClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsRenaming(true);
                }}
                className="line-clamp-1 text-base font-semibold text-white"
              >
                {title || "Untitled Video"}
              </h2>
            )}

            <p className="mt-1 text-sm text-zinc-500">
              {Folder?.name || "No Folder"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {User?.image ? (
                <Image
                  src={User.image}
                  alt=""
                  width={34}
                  height={34}
                  className="rounded-full border border-zinc-700"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
                  <Video
                    size={15}
                    className="text-zinc-400"
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-white">
                  {User?.firstname} {User?.lastname}
                </p>

                <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {formattedDate}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={11} />

                    {dayAgo < 1
                      ? "Today"
                      : `${Math.floor(dayAgo)} ${
                          Math.floor(dayAgo) === 1
                            ? "day"
                            : "days"
                        } ago`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;