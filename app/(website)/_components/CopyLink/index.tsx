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
      variant={variant}
      onClick={onCopyClipboard}
      className="
    h-9 w-9 rounded-xl
    border border-white/[.12]
    bg-white/[.04] p-0
    backdrop-blur-md
    transition-all duration-200
    hover:border-[#ff4c0f]
    hover:bg-[#ff4c0f]
  "
    >
      <Link size={17} className="text-white/70" />
    </Button>
  );
};

export default CopyLink;
