"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentRepliersProps } from "@/types/index.type";
import CommentForm from "../../Forms/Comment-form";

type Props = {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliersProps[];
  isReply?: boolean;
};

const CommentCard = ({ author, comment, reply, videoId, commentId, isReply }: Props) => {
  const [onReply, setOnReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={isReply ? "" : "pb-6"}
    >
      <div className="group flex items-start gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-white/[.03]">
        <Avatar className={`${isReply ? "h-7 w-7" : "h-9 w-9"} shrink-0 border border-white/[.12] transition-transform duration-300 group-hover:scale-105`}>
          <AvatarImage src={author.image} />
          <AvatarFallback className="bg-[#ff4c0f]/20 text-[11px] text-[#ff8a5c]">
            {author.firstname[0]}
            {author.lastname[0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-white">
              @{author.firstname}
              {author.lastname}
            </span>
            <span className="text-xs text-white/35">just now</span>
          </div>

          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-white/75">{comment}</p>

          <div className="mt-1.5 flex items-center gap-1">
            <button
              onClick={() => setLiked((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-all duration-200 hover:bg-white/[.08] ${liked ? "text-[#ff8a5c]" : "text-white/45"}`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              {liked ? 1 : ""}
            </button>
            <button className="rounded-full px-2.5 py-1.5 text-white/45 transition-all duration-200 hover:bg-white/[.08] hover:text-white/80">
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
            {!isReply && (
              <button
                onClick={() => setOnReply((v) => !v)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-white/55 transition-all duration-200 hover:bg-white/[.08] hover:text-white"
              >
                Reply
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {onReply && !isReply && commentId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3">
                  <CommentForm
                    author={`${author.firstname} ${author.lastname}`}
                    videoId={videoId}
                    commentId={commentId}
                    close={() => setOnReply(false)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {reply.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowReplies((v) => !v)}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-[#ff8a5c] transition-colors hover:bg-[#ff4c0f]/10"
              >
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showReplies ? "rotate-180" : ""}`} />
                {reply.length} {reply.length === 1 ? "reply" : "replies"}
              </button>

              <AnimatePresence initial={false}>
                {showReplies && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-1 pl-4">
                      {reply.map((item) => (
                        <CommentCard
                          key={item.id}
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
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CommentCard;
