"use client";

import { getVideoComment } from "@/actions/user";
import { TabsContent } from "@/components/ui/tabs";
import { userQueryData } from "@/hooks/userQueryData";
import { VideoCommentsProps } from "@/types/index.type";
import { MessageCircle } from "lucide-react";
import CommentForm from "../../Forms/Comment-form";
import CommentCard from "../CommentCard";

type Props = { author: string; videoId: string; standalone?: boolean };

const ActivityPage = ({ author, videoId, standalone = false }: Props) => {
  const { data } = userQueryData(["video-comments", videoId], () =>
    getVideoComment(videoId),
  );
  const comments = (data as VideoCommentsProps | undefined)?.data ?? [];
  const content = (
    <section className="opal-panel overflow-hidden rounded-[28px]">
      <header className="flex items-center justify-between border-b border-white/[.1] bg-white/[.025] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#ff4c0f]/20 bg-[#ff4c0f]/10 text-[#ff784c]">
            <MessageCircle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Comments</h2>
            <p className="text-xs text-white/35">
              A focused space for video feedback
            </p>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[.22em] text-white/35">
          Discussion
        </span>
      </header>
      <div className="grid lg:grid-cols-[minmax(300px,.72fr)_minmax(0,1.28fr)]">
        <div className="border-b border-white/[.08] bg-black/[.08] p-6 lg:border-b-0 lg:border-r">
          <p className="mb-5 text-sm font-semibold text-white">
            Leave a clear next step
          </p>
          <CommentForm author={author} videoId={videoId} />
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <div className="divide-y divide-white/[.08]">
            {comments.length ? (
              comments.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-6 transition-colors hover:bg-white/[.035]"
                >
                  <CommentCard
                    comment={item.comment}
                    author={{
                      image: item.User?.image ?? "",
                      firstname: item.User?.firstname ?? "Unknown",
                      lastname: item.User?.lastname ?? "",
                    }}
                    videoId={videoId}
                    commentId={item.id}
                    reply={item.reply}
                  />
                </div>
              ))
            ) : (
              <div className="flex min-h-58 flex-col items-center justify-center px-5 text-center">
                <MessageCircle className="mb-3 h-7 w-7 text-[#ff4c0f]/50" />
                <h3 className="text-sm font-semibold text-white">
                  Start the conversation
                </h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-white/45">
                  Add the first comment to give this video a clear next step.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  return standalone ? (
    <div>{content}</div>
  ) : (
    <TabsContent value="Activity" className="mt-5">
      {content}
    </TabsContent>
  );
};

export default ActivityPage;
