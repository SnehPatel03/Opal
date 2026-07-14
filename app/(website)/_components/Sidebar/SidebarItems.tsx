"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  href: string;
  icon: React.ReactNode;
  notification?: number;
  selected?: boolean;
};

const SidebarItem = ({
  title,
  href,
  icon,
  notification,
  selected = false,
}: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center justify-between rounded-lg px-2.5 py-2 transition-all duration-200",
        selected
          ? "bg-linear-to-b from-neutral-800 to-neutral-800/80 text-white shadow-sm shadow-black/40"
          : "text-neutral-400 hover:bg-linear-to-b hover:from-neutral-900 hover:to-neutral-900/60 hover:text-white"
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={cn(
            "shrink-0 transition-colors duration-200",
            selected
              ? "text-white"
              : "text-neutral-500 group-hover:text-white"
          )}
        >
          {icon}
        </span>

        <span
          title={title}
          className="truncate text-[13px] font-medium tracking-wide"
        >
          {title}
        </span>
      </div>

      {notification !== undefined && notification > 0 && (
        <div className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-semibold text-black">
          {notification > 99 ? "99+" : notification}
        </div>
      )}

      <span
        className={cn(
          "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white transition-all",
          selected ? "opacity-100" : "opacity-0"
        )}
      />
    </Link>
  );
};

export default SidebarItem;