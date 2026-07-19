import FolderInfo from "@/app/(website)/_components/Folders/folder-info";
import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{
    workspaceId: string;
    folderId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { folderId } = await params;

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
    </HydrationBoundary>
  );
};

export default Page;