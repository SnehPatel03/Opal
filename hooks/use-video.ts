import { createCommentAndReply, getUserProfile } from "@/actions/user";
import { useMutationData } from "./useMutationData";
import { userQueryData } from "./userQueryData";
import useZodForm from "./useZodForm";
import { createCommentSchema } from "@/app/(website)/Forms/Comment-form/schema";

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data: profile } = userQueryData(["user-profile"], getUserProfile);

  const user = profile as {
    status: number;
    data: {
      id: string;
      image: string;
    };
  } | undefined;

  const { mutate, isPending } = useMutationData(
    ["new-comment"],
    (data: { comment: string }) =>
      user?.data.id
        ? createCommentAndReply(videoId, data.comment, user.data.id, commentId)
        : Promise.resolve({ status: 401, data: "Please sign in to comment." }),
    "video-comments",
  );

  const { register, onFormSubmit, errors } = useZodForm(
    createCommentSchema,
    mutate,
  );
  return { register, onFormSubmit, errors, isPending };
};
