import React from "react";
import { Calendar, Clock3, Video } from "lucide-react";
import Image from "next/image";

import VideoMenu from "../video-card-menu";
import ChangeVideoLocation from "@/app/(website)/Forms/ChangeVideoLocation";
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
};

const VideoCard = ({
  User,
  id,
  Folder,
  createdAt,
  title,
  source,
  processing,
  workspaceId,
}: Props) => {
  const dayAgo =
    Math.floor(new Date().getTime() - createdAt.getTime()) /
    (24 * 60 * 60 * 1000);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717]",
        "transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900",
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-900">
        <video
          src={source}
          muted
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur">
          {processing ? "Processing..." : "Ready"}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <VideoMenu
            currentFolder={Folder?.id}
            videoId={id}
            currentFolderName={Folder?.name}
            currentWorkspace={workspaceId}
          />

          <CopyLink videoId={id} />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h2 className="line-clamp-1 text-base font-semibold text-white">
            {title || "Untitled Video"}
          </h2>

          <p className="mt-0.5 text-sm text-zinc-500">
            {Folder?.name || "No Folder"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {User?.image ? (
              <Image
                src={User.image}
                alt=""
                width={32}
                height={32}
                className="rounded-full border border-zinc-700"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
                <Video size={15} className="text-zinc-400" />
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-white leading-none">
                {User?.firstname} {User?.lastname}
              </p>

              <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {new Date(createdAt).toLocaleDateString()}
                </span>

                <span className="flex items-end ml-11 gap-1">
                  <Clock3 size={11} />
                  {dayAgo < 1
                    ? "Today"
                    : `${Math.floor(dayAgo)} ${
                        Math.floor(dayAgo) === 1 ? "day" : "days"
                      } ago`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
