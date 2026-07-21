import FolderInfo from "@/app/(website)/_components/Folders/folder-info";
import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Videos from "@/app/(website)/_components/videos";

type Props = {
  params: Promise<{
    workspaceId: string;
    folderId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { folderId , workspaceId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["folder-videos", folderId],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info", folderId],
    queryFn: () => getFolderInfo(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos workspaceId={workspaceId} folderId={folderId} videoKey="folder-videos"/>
    </HydrationBoundary>
  );
};

export default Page;