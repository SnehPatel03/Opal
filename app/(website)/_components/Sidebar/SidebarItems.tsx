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
        "group relative flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200",
        selected
          ? "bg-neutral-800 text-white shadow-sm"
          : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "transition-colors duration-200",
            selected
              ? "text-white"
              : "text-neutral-500 group-hover:text-white"
          )}
        >
          {icon}
        </span>

        <span className="text-sm font-medium tracking-wide">
          {title}
        </span>
      </div>

      {notification !== undefined && notification > 0 && (
        <div className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-[11px] font-semibold text-black">
          {notification > 99 ? "99+" : notification}
        </div>
      )}
      <span
        className={cn(
          "absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white transition-all",
          selected ? "opacity-100" : "opacity-0"
        )}
      />
    </Link>
  );
};

export default SidebarItem;