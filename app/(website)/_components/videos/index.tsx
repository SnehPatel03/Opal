"use client";

import { getAllUserVideos } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import { VideoIcon } from "lucide-react";
import React from "react";
import VideoCard from "./video-card.tsx";

type Props = {
  folderId: string;
  videoKey: string;
  workspaceId: string;
  limit?: number;
};

const Videos = ({ folderId , workspaceId , videoKey, limit }: Props) => {
  const { data: videoData, isPending } = userQueryData([videoKey, folderId], () =>
    getAllUserVideos(folderId),
  );

  if (isPending || !videoData) {
    return null;
  }

  const { status: VideoStatus, data: videos } = videoData as VideosProps;

  if (VideoStatus !== 200) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <VideoIcon className="h-5 w-5 text-zinc-400" />
        <h2 className="text-xl font-semibold text-neutral-200">
          Videos ({limit ? Math.min(videos.length, limit) : videos.length})
        </h2>
      </div>
      <section
        className={cn(
          VideoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {VideoStatus == 200 ? (
          videos.slice(0, limit).map((video) =>
            <VideoCard 
              key={video.id} 
              workspaceId={workspaceId} 
              videoQueryKey={videoKey} 
              videoUrl={video.source}
              {...video}
            />
        )
        ) : (
          <p>No Videos In Workspace</p>
        )}

      </section>
    </div>
  );
};

export default Videos;
