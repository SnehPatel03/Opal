"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react";

type Props = {
  title: string;
  description: string;
  id: string;
  source: string;
};

const RichLink = ({ title, description, source, id }: Props) => {
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
            src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}"
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
    <Button onClick={copyLink}>
      Get Embedded Code
    </Button>
  );
};

export default RichLink;