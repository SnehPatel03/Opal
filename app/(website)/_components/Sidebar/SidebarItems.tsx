"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  title: string;
  href: string;
  icon: React.ReactNode;
  notification?: number;
  selected?: boolean;
};

const SidebarItem = ({ title, href, icon, notification, selected = false }: Props) => {
  return (
    <li className="relative list-none">
      <Link
        href={href}
        className={cn(
          "group relative flex items-center justify-between overflow-hidden rounded-xl py-2 pl-4 pr-2.5 transition-colors duration-300",
          selected ? "text-white" : "text-neutral-400 hover:text-neutral-100"
        )}
      >
        {selected && (
          <motion.span
            layoutId="sidebar-active"
            transition={{ type: "spring", stiffness: 420, damping: 38 }}
            className="absolute inset-0 rounded-xl border border-[#ff4c0f]/35 bg-[linear-gradient(100deg,rgba(255,76,15,.28),rgba(255,76,15,.10)_55%,rgba(255,255,255,.03))] shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_10px_28px_-14px_rgba(255,76,15,.8)] backdrop-blur-md"
          />
        )}

        <span
          className={cn(
            "absolute left-1.5 top-1/2 h-5 -translate-y-1/2 rounded-full bg-[#ff4c0f] transition-all duration-300",
            selected ? "w-[3px] opacity-100 shadow-[0_0_12px_rgba(255,76,15,.9)]" : "w-[3px] opacity-0 group-hover:opacity-40"
          )}
        />

        {!selected && (
          <span className="absolute inset-0 rounded-xl bg-white/0 transition-colors duration-300 group-hover:bg-white/[.06]" />
        )}

        <div className="relative flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              "shrink-0 transition-all duration-300 group-hover:scale-110",
              selected ? "text-[#ff8a5c]" : "text-neutral-500 group-hover:text-neutral-100"
            )}
          >
            {icon}
          </span>
          <span title={title} className="truncate text-[13px] font-medium tracking-wide">
            {title}
          </span>
        </div>

        {notification !== undefined && notification > 0 && (
          <div className="relative flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#ff4c0f] px-1.5 text-[10px] font-semibold text-black">
            {notification > 99 ? "99+" : notification}
          </div>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
