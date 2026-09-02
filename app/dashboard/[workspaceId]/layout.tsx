import { getNotifications, onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import Sidebar from "@/app/(website)/_components/Sidebar";
import SearchBar from "@/app/(website)/_components/SearchBar";
import TopNavbar from "@/app/(website)/_components/TopNavbar";
import GlobalHeader from "@/app/(website)/_components/GlobalHeader";
type Props = {
  params: Promise<{
    workspaceId: string;
  }>;
  children: React.ReactNode;
};

const Layout = async ({ params, children }: Props) => {
  const { workspaceId } = await params;
  const auth = await onAuthenticatedUser();
  const firstWorkspaceId = auth.data?.workspace?.[0]?.id;
  if (!firstWorkspaceId) return redirect(`/auth/sign-in`);

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200)
    return redirect(`/dashboard/${auth.data?.workspace[0].id}`); // redirect to his correct workspace

  if (!hasAccess.data?.workspace) {
    return null;
  }

  const query = new QueryClient(); // initialize the Client of React Tanstack Query

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen overflow-hidden bg-[#0f0f0f]">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <GlobalHeader workspace={hasAccess.data.workspace}/>

              <main className="mt-6">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};
export default Layout;
