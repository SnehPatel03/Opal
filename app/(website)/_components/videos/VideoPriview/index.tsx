"use client";

import { getPreviewVideo } from "@/actions/workspace";
import { sendEmailForFirstView } from "@/actions/user";
import { userQueryData } from "@/hooks/userQueryData";
import { truncateString } from "@/lib/utils";
import { VideoProps } from "@/types/index.type";
import { Download, Eye, MessageSquareText, Play, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ActivityPage from "../../Activity";
import AiTools from "../../AI-Tools ";
import CopyLink from "../../CopyLink";
import LoadingComponent from "../../loadingComponent";
import RichLink from "../../RichLink";
import TabsComponent from "../../tabs";
import VideoTranscript from "../../VideoTranscript";

type Props = { videoId: string };

const VideoPriview = ({ videoId }: Props) => {
  const router = useRouter();
  const hasNotifiedFirstView = useRef(false);
  const { data } = userQueryData(["preview-video", videoId], () => getPreviewVideo(videoId), { staleTime: 60_000, refetchOnMount: false });
  const result = data as VideoProps | undefined;
  const video = result?.data;
  const status = result?.status;

  useEffect(() => { if (data && status !== 200) router.push("/"); }, [data, status, router]);
  useEffect(() => { if (!hasNotifiedFirstView.current && video?.views === 0) { hasNotifiedFirstView.current = true; void sendEmailForFirstView(videoId); } }, [video?.views, videoId]);

  if (!video) return <div className="flex min-h-[65vh] items-center justify-center"><LoadingComponent label="Loading video" /></div>;

  const videoSource = video.videoUrl?.trim() ?? "";
  const hasPlayableSource = /^https?:\/\//i.test(videoSource);
  const author = `${video.User?.firstname ?? ""} ${video.User?.lastname ?? ""}`.trim() || "Opal member";

  return <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10">
    <header className="mb-7 border-b border-white/[.08] pb-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="min-w-0"><p className="font-mono text-[10px] font-bold uppercase tracking-[.25em] text-[#ff784c]">Video review</p><h1 className="mt-3 max-w-4xl truncate text-3xl font-black tracking-[-.055em] text-white sm:text-5xl">{video.title || "Untitled video"}</h1><div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/45"><span className="font-medium text-white/80">{author}</span><span className="hidden text-white/20 sm:block">•</span><span>{result?.relativeDate}</span><span className="hidden text-white/20 sm:block">•</span><span className="flex items-center gap-1.5"><Eye size={14}/>{video.views} views</span></div></div><div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] ${video.processing ? "border-amber-400/30 bg-amber-400/10 text-amber-200" : "border-[#ff4c0f]/30 bg-[#ff4c0f]/10 text-[#ff956f]"}`}><span className={`h-1.5 w-1.5 rounded-full ${video.processing ? "animate-pulse bg-amber-300" : "bg-[#ff4c0f]"}`}/>{video.processing ? "Processing" : "Ready to review"}</div></div></header>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_375px]"><div className="min-w-0 space-y-5"><section className="overflow-hidden rounded-[22px] border border-white/[.1] bg-[#070708] shadow-[0_24px_70px_rgba(0,0,0,.36)]"><div className="flex items-center justify-between border-b border-white/[.08] px-4 py-3"><span className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Now playing</span><div className="flex items-center gap-1.5 text-[10px] font-medium text-white/40"><Sparkles size={12} className="text-[#ff784c]"/> AI-ready video</div></div>{hasPlayableSource ? <video key={videoSource} controls preload="metadata" playsInline className="aspect-video w-full bg-black"><source src={videoSource} type="video/webm" />Your browser does not support video playback.</video> : <div className="flex aspect-video flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_25%,rgba(255,76,15,.18),transparent_38%),#080808] px-6 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4c0f] text-black"><Play size={21} fill="currentColor"/></div><h2 className="mt-5 text-lg font-bold text-white">Video source unavailable</h2><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/45">This recording does not have a playable video URL yet. Check back when processing is complete.</p></div>}</section><section className="opal-panel rounded-[22px] p-5 sm:p-6"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4c0f]/15 text-[#ff784c]"><MessageSquareText size={18}/></div><div><h2 className="font-bold text-white">About this video</h2><p className="text-xs text-white/40">Context shared by {author}</p></div></div><p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-white/60">{video.description || "No description was added to this recording."}</p></section></div>
      <aside className="space-y-5 xl:sticky xl:top-5 xl:self-start"><section className="opal-panel rounded-[22px] p-5"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#ff784c]">Share</p><h2 className="mt-2 text-lg font-bold text-white">Send the context</h2></div><CopyLink videoId={videoId} /></div><p className="mt-2 text-xs leading-relaxed text-white/45">Copy a direct link or an embed that keeps the recording easy to revisit.</p><div className="mt-5 flex gap-2"><RichLink id={videoId} title={video.title || "Untitled video"} description={truncateString(video.description || "", 150)} source={videoSource}/>{hasPlayableSource && <a href={videoSource} download={video.source} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[.12] text-white/55 transition hover:border-[#ff4c0f] hover:bg-[#ff4c0f] hover:text-black" aria-label="Download video"><Download size={16}/></a>}</div></section><section className="opal-panel rounded-[22px] p-3 sm:p-4"><TabsComponent defaultValue="AI Tools" triggers={["AI Tools", "Transcript"]}><AiTools videoId={videoId} trial={video.User?.trial ?? false} plan={video.User?.subscription?.plan ?? "FREE"}/><VideoTranscript transcript={video.summery ?? ""}/></TabsComponent></section></aside>
    </div>
    <div className="mt-6"><ActivityPage author={author} videoId={videoId} standalone /></div>
  </div>;
};

export default VideoPriview;
