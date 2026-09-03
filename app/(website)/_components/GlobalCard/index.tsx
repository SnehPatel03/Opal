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
        "rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.08] to-white/[0.03] shadow-[inset_0_1px_rgba(255,255,255,.06)] backdrop-blur-sm",
        className
      )}
    >
      <div className="space-y-1 p-4">
        <h3 className="text-sm font-bold text-white">{title}</h3>

        {description && (
          <p className="text-xs leading-relaxed text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="border-t border-white/[0.08] px-4 py-4">
          {children}
        </div>
      )}

      {footer && (
        <div className="border-t border-white/[0.08] bg-black/10 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default GlobalCard;
