"use client";

import { Menu, Upload, Video } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import SearchBar from "../SearchBar";

const TopNavbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 md:h-[57.5px] items-center border-b border-white/[0.08] bg-[#0b0b0c]/85 px-3 md:px-6 backdrop-blur-xl">
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
        <button className="flex h-9 md:h-9 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3 md:px-5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.1] hover:text-white">
          <Upload size={15} className="text-zinc-400" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        <button className="flex h-9 md:h-9 items-center justify-center gap-2 rounded-xl border border-[#ff4c0f]/70 bg-[#ff4c0f] px-3 md:px-5 text-sm font-bold text-black transition-all duration-200 hover:scale-[1.03] hover:bg-[#ff6840] hover:text-black">
          <Video size={15} className="text-black" />
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
