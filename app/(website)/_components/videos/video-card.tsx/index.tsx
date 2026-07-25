import React from "react";
import { Calendar, Clock3, Video } from "lucide-react";
import Image from "next/image";

import VideoMenu from "../video-card-menu";
import ChangeVideoLocation from "@/app/(website)/Forms/ChangeVideoLocation";
import { cn } from "@/lib/utils";
import CopyLink from "../../CopyLink";
import Link from "next/link";

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
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(createdAt);
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717]",
        "transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900",
      )}
    >
      <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
        <VideoMenu
          currentFolder={Folder?.id}
          currentFolderName={Folder?.name}
          videoId={id}
          currentWorkspace={workspaceId}
        />

        <CopyLink videoId={id} />
      </div>
      <Link
        href={`/preview/${id}`}
        className="flex h-full flex-col transition duration-200 hover:bg-[#202020]"
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          <video
            controls={false}
            preload="metadata"
            muted
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          >
            <source src={source} />
          </video>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute left-4 top-4 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            {processing ? "Processing..." : "Ready"}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4">

          <div>
            <h2 className="line-clamp-1 text-base font-semibold text-white">
              {title || "Untitled Video"}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {Folder?.name || "No Folder"}
            </p>
          </div>

          {/* Footer */}
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
                  <Video size={15} className="text-zinc-400" />
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
                          Math.floor(dayAgo) === 1 ? "day" : "days"
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
