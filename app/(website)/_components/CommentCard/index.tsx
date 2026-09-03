"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { CommentRepliersProps } from "@/types/index.type";
import CommentForm from "../../Forms/Comment-form";

type Props = {
  comment: string;
  author: {
    image: string;
    firstname: string;
    lastname: string;
  };
  videoId: string;
  commentId?: string;
  reply: CommentRepliersProps[];
  isReply?: boolean;
};

const CommentCard = ({
  author,
  comment,
  reply,
  videoId,
  commentId,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState(false);

  return (
    <div className={`${!isReply ? "pb-6" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="h-9 w-9 shrink-0 border border-white/[.12]">
          <AvatarImage src={author.image} />
          <AvatarFallback>
            {author.firstname[0]}
            {author.lastname[0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {author.firstname} {author.lastname}
            </span>

            <span className="text-xs text-white/35">
              just now
            </span>
          </div>

          {/* Comment */}
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-white/70">
            {comment}
          </p>

          {/* Actions */}
          {!isReply && (
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={() => setOnReply((prev) => !prev)}
                className="flex items-center gap-1 text-xs font-medium text-white/40 transition hover:text-[#ff956f]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Reply
              </button>

              {reply.length > 0 && (
                <span className="text-xs text-white/35">
                  {reply.length} {reply.length === 1 ? "reply" : "replies"}
                </span>
              )}
            </div>
          )}

          {/* Reply Form */}
          {onReply && !isReply && commentId && (
            <div className="mt-4">
              <CommentForm
                author={`${author.firstname} ${author.lastname}`}
                videoId={videoId}
                commentId={commentId}
                close={() => setOnReply(false)}
              />
            </div>
          )}

          {/* Replies */}
          {reply.length > 0 && (
            <div className="relative mt-5 ml-4 pl-6">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[.1]" />

              <div className="space-y-5">
                {reply.map((item) => (
                  <div key={item.id} className="relative">
                    {/* Horizontal connector */}
                    <div className="absolute -left-6 top-4 h-px w-6 bg-white/[.1]" />

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
                      isReply
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
