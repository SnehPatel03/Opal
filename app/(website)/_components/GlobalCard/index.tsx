"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

const GlobalCard = ({
  title,
  description,
  children,
  footer,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm",
        className
      )}
    >
      <div className="space-y-1 p-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>

        {description && (
          <p className="text-xs leading-relaxed text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="border-t border-zinc-800 px-4 py-4">
          {children}
        </div>
      )}

      {footer && (
        <div className="border-t border-zinc-800 bg-zinc-900/60 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default GlobalCard;