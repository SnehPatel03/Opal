"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import FormGenerator from "../FormGenerator";
import { useVideoComment } from "@/hooks/use-video";

type Props = {
  videoId: string;
  author: string;
  commentId?: string;
  close?: () => void;
};

const CommentForm = ({
  videoId,
  commentId,
  author,
  close,
}: Props) => {
  const { isPending, register, onFormSubmit, errors } =
    useVideoComment(videoId, commentId);

  return (
    <form onSubmit={onFormSubmit} className="w-full">
      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-sm font-medium text-white">
          {author.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <FormGenerator
            register={register}
            errors={errors}
            placeholder={
              commentId
                ? `Reply to ${author}...`
                : "Add a public comment..."
            }
            name="comment"
            inputType="input"
            type="text"
          />

          <div className="mt-3 flex items-center justify-end gap-2">
            {commentId && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={close}
                className="text-zinc-400 hover:text-white"
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="gap-2 rounded-full px-4"
            >
              <Send className="h-3.5 w-3.5" />

              {isPending
                ? "Sending..."
                : commentId
                  ? "Reply"
                  : "Comment"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CommentForm;