import { getUserProfile, getVideoComment } from "@/actions/user";
import { getPreviewVideo } from "@/actions/workspace";
import VideoPriview from "@/app/(website)/_components/videos/VideoPriview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{
    videoId: string;
  }>;
};

const VideoPage = async ({ params }: Props) => {
  const { videoId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video", videoId], // include videoId
    queryFn: () => getPreviewVideo(videoId),
  });
  
  await query.prefetchQuery({
    queryKey: ["user-profile"], 
    queryFn: getUserProfile
  });

 await query.prefetchQuery({
  queryKey: ["video-comments", videoId],
  queryFn: () => getVideoComment(videoId),
});

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPriview videoId={videoId} />
    </HydrationBoundary>
  );
};

export default VideoPage;
