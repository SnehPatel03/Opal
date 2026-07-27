"use client";

import { TabsContent } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import React from "react";
import { getVideoComment } from "@/actions/user";
import { userQueryData } from "@/hooks/userQueryData";
import { VideoCommentsProps } from "@/types/index.type";
import CommentForm from "../../Forms/Comment-form";
import CommentCard from "../CommentCard";

type Props = {
  author: string;
  videoId: string;
};

const ActivityPage = ({ author, videoId }: Props) => {
  const { data } = userQueryData(["video-comments", videoId], () =>
    getVideoComment(videoId),
  );

  const comments = (data as VideoCommentsProps | undefined)?.data ?? [];

  return (
  <TabsContent
  value="Activity"
  className="mt-5 h-[calc(100vh-500px)]"
>
  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#171717]">
    <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 shrink-0">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-zinc-400" />

        <h3 className="text-sm font-semibold text-white">
          Comments
        </h3>

        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
          {comments.length}
        </span>
      </div>
    </div>

    <div className="border-b border-zinc-800 px-5 py-4 shrink-0">
      <CommentForm author={author} videoId={videoId} />
    </div>

    <div className="flex-1 overflow-y-auto">
      <div className="divide-y divide-zinc-800">
        {comments.length > 0 ? (
          comments.map((item) => (
            <div
              key={item.id}
              className="px-5 py-5 transition-colors hover:bg-white/2"
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
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageCircle className="mb-3 h-8 w-8 text-zinc-700" />

            <h4 className="text-sm font-medium text-white">
              No comments yet
            </h4>

            <p className="mt-1 text-sm text-zinc-500">
              Start the conversation by adding the first comment.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</TabsContent>
  );
};

export default ActivityPage;