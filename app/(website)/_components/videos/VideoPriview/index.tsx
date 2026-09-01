"use client";

import { getPreviewVideo } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";
import { VideoProps } from "@/types/index.type";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import CopyLink from "../../CopyLink";
import RichLink from "../../RichLink";
import { truncateString } from "@/lib/utils";
import { Download, Play } from "lucide-react";
import TabsComponent from "../../tabs";
import AiTools from "../../AI-Tools ";
import VideoTranscript from "../../VideoTranscript";
import ActivityPage from "../../Activity";
import { sendEmailForFirstView } from "@/actions/user";

type Props = {
  videoId: string;
};

const VideoPriview = ({ videoId }: Props) => {
  const router = useRouter();
  const hasNotifiedFirstView = useRef(false);

  const { data } = userQueryData(
    ["preview-video", videoId],
    () => getPreviewVideo(videoId),
    {
      staleTime: 60_000,
      refetchOnMount: false,
    },
  );

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-zinc-400">
        Loading video...
      </div>
    );
  }

  const { data: video, status, relativeDate } =
    data as VideoProps;

  useEffect(() => {
    if (data && status !== 200) {
      router.push("/");
    }
  }, [data, status, router]);

  useEffect(() => {
    if (
      !hasNotifiedFirstView.current &&
      video?.views === 0
    ) {
      hasNotifiedFirstView.current = true;
      void sendEmailForFirstView(videoId);
    }
  }, [video?.views, videoId]);

  // Use the actual ImageKit URL saved in the database.
  // Do NOT construct the URL from video.source.
  const videoSource = video?.videoUrl?.trim() ?? "";

  const hasPlayableSource =
    videoSource.length > 0 &&
    /^https?:\/\//i.test(videoSource);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Video library
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {video.title || "Untitled Video"}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span className="font-medium text-zinc-200">
              {video.User?.firstname}{" "}
              {video.User?.lastname}
            </span>

            <span>•</span>

            <span>{relativeDate}</span>

            <span>•</span>

            <span>{video.views} Views</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                video.processing
                  ? "bg-amber-400"
                  : "bg-emerald-400"
              }`}
            />

            {video.processing
              ? "Processing"
              : "Ready"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717] shadow-2xl shadow-black/20">
            {hasPlayableSource ? (
              <video
                key={videoSource}
                controls
                preload="metadata"
                playsInline
                className="aspect-video w-full bg-black"
              >
                <source
                  src={videoSource}
                  type="video/webm"
                />

                Your browser does not support the video
                element.
              </video>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-linear-to-br from-zinc-900 to-black px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800">
                  <Play className="h-6 w-6 text-zinc-300" />
                </div>

                <div className="max-w-md space-y-1">
                  <p className="font-medium text-zinc-100">
                    Video source is not connected
                  </p>

                  <p className="text-sm leading-6 text-zinc-500">
                    ImageKit video URL could not be
                    loaded.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Description
            </h3>

            <p className="whitespace-pre-wrap leading-7 text-zinc-400">
              {video.description || "No description"}
            </p>
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">
              Share
            </h3>

            <div className="flex items-center gap-2">
              <CopyLink videoId={videoId} />

              <RichLink
                id={videoId}
                title={video.title || "Untitled Video"}
                description={truncateString(
                  video.description || "",
                  150,
                )}
                source={videoSource}
              />

              {hasPlayableSource && (
                <a
                  href={videoSource}
                  download={video.source}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 text-zinc-400 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                  aria-label="Download video"
                >
                  <Download size={17} />
                </a>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6">
            <TabsComponent
              defaultValue="AI Tools"
              triggers={[
                "AI Tools",
                "Transcript",
                "Activity",
              ]}
            >
              <AiTools
                videoId={videoId}
                trial={video.User?.trial ?? false}
                plan={
                  video.User?.subscription?.plan ??
                  "FREE"
                }
              />

              <VideoTranscript
                transcript={video.summery ?? ""}
              />

              <ActivityPage
                author={
                  `${video.User?.firstname ?? ""} ${
                    video.User?.lastname ?? ""
                  }`.trim() || "this video"
                }
                videoId={videoId}
              />
            </TabsComponent>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VideoPriview;