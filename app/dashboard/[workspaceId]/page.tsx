import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateWorkspace from "@/app/(website)/_components/CreateWorkspace";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspacePage = ({ params }: Props) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="videos">
        <div className="flex items-center justify-between">
          <TabsList className="h-10 rounded-xl border border-zinc-800 bg-zinc-900 p-1">
            <TabsTrigger
              value="videos"
              className="rounded-lg px-4 text-sm text-zinc-400 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Videos
            </TabsTrigger>

            <TabsTrigger
              value="archive"
              className="rounded-lg px-4 text-sm text-zinc-400 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Archive
            </TabsTrigger>
          </TabsList>

          <CreateWorkspace />
        </div>
      </Tabs>
    </div>
  );
};

export default WorkspacePage;