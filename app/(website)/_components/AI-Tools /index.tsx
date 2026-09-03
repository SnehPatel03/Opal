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
    className="mt-4 rounded-xl border border-white/[.08] bg-black/20 p-4"
  >
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-semibold text-white">AI Tools</h3>
        <p className="mt-1 text-xs text-white/45">
          Summarize, describe, and explore this recording.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="h-7 rounded-md border border-white/[.1] bg-white/[.06] px-3 text-xs text-white hover:bg-white/[.12]"
        >
          Try Now
        </Button>

        <Button
          size="sm"
          className="h-7 rounded-md bg-[#ff4c0f] px-3 text-xs text-black hover:bg-[#ff6840]"
        >
          Upgrade
        </Button>
      </div>
    </div>

    {/* AI Tools */}
    <div className="space-y-2">
      <button className="group flex w-full items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.035] p-3 transition-all duration-200 hover:border-[#ff4c0f]/60 hover:bg-white/[.08]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff4c0f]/12 transition group-hover:bg-[#ff4c0f]">
          <Sparkles className="h-4 w-4 text-[#ff784c] transition group-hover:text-black" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">
            Generate Summary
          </p>

          <p className="mt-0.5 text-xs text-white/45">
            AI creates a concise summary.
          </p>
        </div>
      </button>

      <button className="group flex w-full items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.035] p-3 transition-all duration-200 hover:border-[#ff4c0f]/60 hover:bg-white/[.08]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff4c0f]/12 transition group-hover:bg-[#ff4c0f]">
          <FileText className="h-4 w-4 text-[#ff784c] transition group-hover:text-black" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">
            Generate Description
          </p>

          <p className="mt-0.5 text-xs text-white/45">
            Create a professional description.
          </p>
        </div>
      </button>

      <button className="group flex w-full items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.035] p-3 transition-all duration-200 hover:border-[#ff4c0f]/60 hover:bg-white/[.08]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff4c0f]/12 transition group-hover:bg-[#ff4c0f]">
          <Bot className="h-4 w-4 text-[#ff784c] transition group-hover:text-black" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">
            AI Assistant
          </p>

          <p className="mt-0.5 text-xs text-white/45">
            Ask questions about your video.
          </p>
        </div>
      </button>
    </div>
  </TabsContent>
);
};

export default AiTools;
