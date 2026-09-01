import React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import CreateFolders from "@/app/(website)/_components/CreateFolders";
import Folders from "@/app/(website)/_components/Folders";
import Videos from "@/app/(website)/_components/videos";

type Props = {
  params: Promise<{
    workspaceId: string;
  }>;
};

const WorkspacePage = async({ params }: Props) => {
  const { workspaceId } = await params;
  return (
    <div className="space-y-6">
      <Tabs defaultValue="videos" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="h-10 rounded-xl border border-zinc-800 bg-zinc-900 p-1">
            <TabsTrigger
              value="videos"
              className="rounded-lg px-4 text-sm text-zinc-400 data-[state=active]:bg-neutral-200 data-[state=active]:text-black"
            >
              Videos
            </TabsTrigger>

            <TabsTrigger
              value="archive"
              className="rounded-lg px-4 text-sm text-zinc-400 data-[state=active]:bg-neutral-200 data-[state=active]:text-black"
            >
              Archive
            </TabsTrigger>
          </TabsList>

          <CreateFolders workspaceId={workspaceId} />
        </div>

        <TabsContent value="videos" className="pt-8">
          <div className="space-y-10">
            <Folders workspaceId={workspaceId} />
            <Videos
              workspaceId={workspaceId}
              folderId={workspaceId}
              videoKey="workspace-videos"
              limit={10}
            />
          </div>
        </TabsContent>

        <TabsContent value="archive" className="pt-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center text-zinc-500">
            No archived videos found.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspacePage;
