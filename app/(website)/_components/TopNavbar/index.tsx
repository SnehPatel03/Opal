"use client";

import Image from "next/image";
import { Menu, Upload, Video } from "lucide-react";
import SearchBar from "../SearchBar";
import { UserButton } from "@clerk/nextjs";

type Props = {
  onMenuClick?: () => void;
};

const TopNavbar = ({ onMenuClick }: Props) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#111111]/90 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <SearchBar placeholder="Search for people, projects..." />
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:bg-zinc-200">
          <Upload size={18} />
          Upload
        </button>
        <button className="flex h-11 items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 text-sm font-medium text-white transition hover:bg-zinc-800">
          <Video size={18} />
          Record
        </button>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-13 w-13 ring-1 ring-zinc-700",
            },
          }}
        />
      </div>
    </header>
  );
};
export default TopNavbar;
