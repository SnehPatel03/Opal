"use client";

import { Menu, Upload, Video } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "../SearchBar";

const TopNavbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-[57.5px] items-center border-b border-zinc-800 bg-[#111111]/90 px-3 md:px-6 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-2 md:gap-4 min-w-0">
        <button
          onClick={() => window.dispatchEvent(new Event("open-sidebar"))}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-neutral-200 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <SearchBar placeholder="Search for people, projects..." />
        </div>
      </div>

      <div className="ml-2 flex items-center gap-2 md:gap-3 shrink-0">
        <button className="flex h-9 md:h-9 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 md:px-5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800 hover:text-neutral-200">
          <Upload size={15} className="text-zinc-400" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        <button className="flex h-9 md:h-9 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 md:px-5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800 hover:text-neutral-200">
          <Video size={15} className="text-zinc-400" />
          <span className="hidden sm:inline">Record</span>
        </button>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10 md:h-13 md:w-13 ring-1 ring-zinc-700",
            },
          }}
        />
      </div>
    </header>
  );
};

export default TopNavbar;
