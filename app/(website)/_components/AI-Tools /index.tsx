import { Sparkles, FileText, Bot } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {

return (
  <TabsContent
    value="AI Tools"
    className="mt-4 rounded-xl border border-zinc-800 bg-[#171717] p-4"
  >
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-white">AI Tools</h3>
        <p className="mt-1 text-xs text-zinc-500">
          Enhance your video using AI
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="h-7 rounded-md px-3 text-xs"
        >
          Try Now
        </Button>

        <Button
          size="sm"
          className="h-7 rounded-md px-3 text-xs"
        >
          Upgrade
        </Button>
      </div>
    </div>

    {/* AI Tools */}
    <div className="space-y-2">
      <button className="group flex w-full items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 transition group-hover:bg-zinc-700">
          <Sparkles className="h-4 w-4 text-zinc-300" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">
            Generate Summary
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            AI creates a concise summary.
          </p>
        </div>
      </button>

      <button className="group flex w-full items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 transition group-hover:bg-zinc-700">
          <FileText className="h-4 w-4 text-zinc-300" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">
            Generate Description
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            Create a professional description.
          </p>
        </div>
      </button>

      <button className="group flex w-full items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 transition group-hover:bg-zinc-700">
          <Bot className="h-4 w-4 text-zinc-300" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">
            AI Assistant
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            Ask questions about your video.
          </p>
        </div>
      </button>
    </div>
  </TabsContent>
);
};

export default AiTools;
