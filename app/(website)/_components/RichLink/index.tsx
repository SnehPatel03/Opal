"use client";

import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import { toast } from "sonner";
import React from "react";

type Props = {
  title: string;
  description: string;
  id: string;
  source: string;
};

const RichLink = ({ title, description, source, id }: Props) => {
  const imageKitUrlEndpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/+$/, "");
  const videoSource = /^https?:\/\//i.test(source)
    ? source
    : imageKitUrlEndpoint
      ? `${imageKitUrlEndpoint}/${source.replace(/^\/+/, "")}`
      : "";

  const copyLink = async () => {
    const previewUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}`;

    const html = `
      <a
        href="${previewUrl}"
        style="
          display:flex;
          flex-direction:column;
          gap:10px;
          text-decoration:none;
          color:black;
        "
      >
        <h3 style="margin:0;font-size:18px;">
          ${title}
        </h3>

        <p style="margin:0;color:#555;">
          ${description || "No description"}
        </p>

        <video
          width="320"
          controls
          style="display:block;border-radius:10px;"
        >
          <source
            src="${videoSource}"
            type="video/mp4"
          />
        </video>
      </a>
    `;

    const htmlBlob = new Blob([html], {
      type: "text/html",
    });

    const textBlob = new Blob([previewUrl], {
      type: "text/plain",
    });

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": textBlob,
          "text/html": htmlBlob,
        }),
      ]);

      toast.success("Embedded link copied!", {
        description: "Rich embed copied to clipboard.",
      });
    } catch (error) {
      console.error(error);

      toast.error("Copy failed", {
        description: "Your browser doesn't support rich clipboard.",
      });
    }
  };

  return (
    <Button onClick={copyLink} className="h-9 rounded-xl border border-white/[.12] bg-white/[.06] px-3 text-xs font-semibold text-white hover:border-[#ff4c0f] hover:bg-[#ff4c0f] hover:text-black">
      <Code2 size={14} className="mr-1.5" /> Embed
    </Button>
  );
};

export default RichLink;
