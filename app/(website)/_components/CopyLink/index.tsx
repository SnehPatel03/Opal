"use client";

import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "sonner";

type Props = {
  videoId: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

const CopyLink = ({ videoId, className, variant = "ghost" }: Props) => {
  const onCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`,
      );

      toast.success("Copied!", {
        description: "Link copied successfully.",
      });
    } catch {
      toast.error("Failed", {
        description: "Couldn't copy the link.",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={onCopyClipboard}
      className="
    h-9 w-9 rounded-xl
    border border-zinc-700
    bg-black/60 p-0
    backdrop-blur-md
    transition-all duration-200
    hover:border-white/40
    hover:bg-black/80
  "
    >
      <Link size={17} className="text-zinc-300" />
    </Button>
  );
};

export default CopyLink;
