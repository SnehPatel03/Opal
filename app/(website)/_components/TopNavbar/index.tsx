"use client";

import { Menu, Upload, Video } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBar from "../SearchBar";

const TopNavbar = () => {
  const pathname = usePathname();
  // The Library is the workspace's index route; keep search out of Home and
  // every other workspace section.
  const showSearch = /^\/dashboard\/[^/]+\/?$/.test(pathname);

  return (
    <header className="opal-fade sticky top-0 z-30 flex h-[73px] shrink-0 items-center gap-3 border-b border-white/[0.08] bg-[#0b0b0c]/70 px-4 backdrop-blur-2xl backdrop-saturate-150 md:px-6">
      <button
        onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
        className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/[.08] hover:text-neutral-100 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex min-w-0 flex-1 items-center">
        {showSearch ? (
          <div className="w-full max-w-xl opal-fade">
            <SearchBar placeholder="Search your library..." />
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2 md:gap-3">
        <Link
          href="/download"
          aria-label="Download the Opal desktop app"
          className="btn-fill flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 text-sm font-medium text-zinc-200 backdrop-blur-xl"
        >
          <Upload size={15} />
          <span className="hidden sm:inline">Upload</span>
        </Link>

        <button className="btn-fill flex h-10 items-center justify-center gap-2 rounded-xl border border-[#ff4c0f]/70 bg-[#ff4c0f]/[.14] px-4 text-sm font-bold text-[#ff8a5c]">
          <Video size={15} />
          <span className="hidden sm:inline">Record</span>
        </button>

        <UserButton
          appearance={{ elements: { avatarBox: "h-10 w-10 ring-1 ring-white/15" } }}
        />
      </div>
    </header>
  );
};

export default TopNavbar;
