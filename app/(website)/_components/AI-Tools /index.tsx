"use client";

import { createPortal } from "react-dom";
import { Bot } from "lucide-react";
import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { toast } from "sonner";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const AiTools = ({ plan, videoId }: Props) => {
  const isFreePlan = plan === "FREE";
  const subscription = useSubscription();
  const isProcessing = subscription?.isProcessing ?? false;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (isFreePlan) {
      toast.error("Upgrade your plan to use AI tools.", {
        description: "AI Assistant is available on Pro.",
      });
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <TabsContent
        value="PRO Tools"
        className=" rounded-xl border   border-white/[.08] bg-black/20 p-4 "
      >
        <div className="mb-5 flex items-start justify-between gap-3 ">
          <div>
            <h3 className="text-sm font-semibold text-white">
              PRO Tools
            </h3>

            <p className="mt-1 text-xs text-white/45">
              Explore this recording with AI.
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
            <span className="pt-1 text-xs font-medium text-white/55">
              Activated
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleOpen}
          className={`group flex w-full items-center gap-3 rounded-xl border p-3 transition ${
            isFreePlan
              ? "cursor-not-allowed border-white/[.06] bg-white/[.02] opacity-50"
              : "border-white/[.08] bg-white/[.035] hover:border-[#ff4c0f]/60 hover:bg-white/[.08]"
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff4c0f]/12 transition group-hover:bg-[#ff4c0f]">
            <Bot className="h-4 w-4 text-[#ff784c] group-hover:text-black" />
          </div>

          <div className="text-left">
            <p className="text-sm font-medium text-white">
              AI Assistant
            </p>

            <p className="mt-0.5 text-xs text-white/45">
              Ask questions about your video.
            </p>
          </div>
        </button>
        <div className=" flex items-center justify-center mt-2">

      <span className="text-sm capitalize font-extrabold text-white/25"> ~ More features coming soon 🧡</span>
        </div>
      </TabsContent>

      {open && (
        <AiAssistantModal
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

type AiAssistantModalProps = {
  videoId: string;
  onClose: () => void;
};

const AiAssistantModal = ({
  videoId,
  onClose,
}: AiAssistantModalProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your AI Assistant. Ask me anything about this recording.",
    },
  ]);

  const handleSend = async () => {
    const question = input.trim();

    if (!question || loading) return;

    setInput("");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((messages) => [...messages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId,
          question,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to get answer");
      }

      setMessages((messages) => [
        ...messages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((messages) => [
        ...messages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: error instanceof Error
            ? error.message
            : "Sorry, I couldn't process that question. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[.10] bg-[#0d0d0d] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff4c0f]/15">
              <Bot className="h-4 w-4 text-[#ff784c]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                AI Assistant
              </h2>

              <p className="text-xs text-white/40">
                Ask questions about this recording
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/[.06] hover:text-white"
          >
            <span className="text-xl font-light">×</span>
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "rounded-br-md bg-[#ff4c0f] text-black"
                    : "rounded-bl-md border border-white/[.08] bg-white/[.04] text-white/80"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-white/[.08] bg-white/[.04] px-4 py-3 text-sm text-white/40">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/[.08] p-4">
          <div className="flex items-end gap-2 rounded-xl border border-white/[.10] bg-white/[.03] p-2 focus-within:border-[#ff4c0f]/50">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about this recording..."
              rows={1}
              disabled={loading}
              className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/25"
            />

            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff4c0f] text-black hover:bg-[#ff6840] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ↑
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] text-white/25">
            AI Assistant can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AiTools;
