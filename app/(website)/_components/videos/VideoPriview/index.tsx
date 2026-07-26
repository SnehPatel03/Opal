"use client";
import { getPreviewVideo } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";
import { VideoProps } from "@/types/index.type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CopyLink from "../../CopyLink";
import RichLink from "../../RichLink";
import { truncateString } from "@/lib/utils";
import { Download } from "lucide-react";
import TabsComponent from "../../tabs";
import AiTools from "../../AI-Tools ";
import VideoTranscript from "../../VideoTranscript";
import ActivityPage from "../../Activity";

type Props = {
  videoId: string;
};

const VideoPriview = ({ videoId }: Props) => {
  //WIP:set notify first view
  //WIP: Activity tab contact setup
  const router = useRouter();
  const { data } = userQueryData(["preview-video", videoId], () =>
    getPreviewVideo(videoId),
  );

  const { data: video, status, relativeDate } = data as VideoProps;

  const cloudFrontBaseUrl =
    process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL?.replace(/\/+$/, "");
  const videoSource = /^https?:\/\//i.test(video.source)
    ? video.source
    : cloudFrontBaseUrl
      ? `${cloudFrontBaseUrl}/${video.source.replace(/^\/+/, "")}`
      : video.source;

  useEffect(() => {
    if (data && status !== 200) {
      router.push("/");
    }
  }, [data, status, router]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white">{video.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span className="font-medium text-zinc-200">
                {video.User?.firstname} {video.User?.lastname}
              </span>
              <span>•</span>
              <span>{relativeDate}</span>
              <span>•</span>
              <span>{video.views} Views</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717] shadow-lg">
            <video
              preload="metadata"
              controls
              className="aspect-video w-full bg-black"
            >
              <source src={videoSource} />
            </video>
          </div>


          {/* Description */}
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Description
            </h3>

            <p className="leading-7 text-zinc-400 whitespace-pre-wrap">
              {video.description || "No description"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">Share</h3>

            <div className="space-y-2">
              <CopyLink videoId={videoId} />

              <RichLink
                id={videoId}
                title={video.title as string}
                description={truncateString(video.description as string, 150)}
                source={video.source}
              />
              <Download className="text-neutral-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <TabsComponent
              defaultValue="AI Tools"
              triggers={["AI Tools", "Transcript", "Activity"]}
            >
              <AiTools
                videoId={videoId}
                trial={video.User?.trial ?? false}
                plan={video.User?.subscription?.plan ?? "FREE"}
              />
              <VideoTranscript transcript={video.description ?? ""} />
              <ActivityPage
                author={`${video.User?.firstname ?? ""} ${video.User?.lastname ?? ""}`.trim() || "this video"}
                videoId={videoId}
              />
            </TabsComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPriview;
