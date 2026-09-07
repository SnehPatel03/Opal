"use client";

import { Sparkles, FileText, Bot } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { toast } from "sonner";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan }: Props) => {
  const isFreePlan = plan === "FREE";
  const subscription = useSubscription();
  const isProcessing = subscription?.isProcessing ?? false;

  const showUpgradeMessage = () => {
    toast.error("Upgrade your plan to use AI tools.", {
      description: "AI summaries, descriptions, and the AI Assistant are available on Pro.",
    });
  };

  const tools = [
    {
      label: "Generate Summary",
      description: "AI creates a concise summary.",
      icon: Sparkles,
    },
    {
      label: "Generate Description",
      description: "Create a professional description.",
      icon: FileText,
    },
    {
      label: "AI Assistant",
      description: "Ask questions about your video.",
      icon: Bot,
    },
  ];

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

      {isFreePlan ? (
        <Button
          size="sm"
          onClick={() => void subscription?.onSubscribe()}
          disabled={isProcessing}
          className="h-7 rounded-md bg-[#ff4c0f] px-3 text-xs text-black hover:bg-[#ff6840]"
        >
          {isProcessing ? "Processing..." : "Upgrade"}
        </Button>
      ) : (
        <span className="pt-1 text-xs font-medium text-white/55">Active plan</span>
      )}
    </div>

    {/* AI Tools */}
    <div className="space-y-2">
      {tools.map(({ label, description, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-disabled={isFreePlan}
          title={isFreePlan ? "Upgrade your plan to use this AI tool" : undefined}
          onClick={isFreePlan ? showUpgradeMessage : undefined}
          className={`group flex w-full items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
            isFreePlan
              ? "cursor-not-allowed border-white/[.06] bg-white/[.02] opacity-50"
              : "border-white/[.08] bg-white/[.035] hover:border-[#ff4c0f]/60 hover:bg-white/[.08]"
          }`}
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff4c0f]/12 transition ${!isFreePlan ? "group-hover:bg-[#ff4c0f]" : ""}`}>
            <Icon className={`h-4 w-4 text-[#ff784c] transition ${!isFreePlan ? "group-hover:text-black" : ""}`} />
          </div>

          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="mt-0.5 text-xs text-white/45">{description}</p>
          </div>
        </button>
      ))}
    </div>
  </TabsContent>
);
};

export default AiTools;
