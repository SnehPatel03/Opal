"use client";

import { Search } from "lucide-react";

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, placeholder = "Search...", onChange }: Props) => {
  return (
    <div className="group flex h-9 md:h-9 w-full items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl border border-white/[.09] bg-white/[.035] px-3 md:px-4 transition-all duration-200 hover:border-white/[.18] focus-within:border-[#ff4c0f]/70 focus-within:ring-2 focus-within:ring-[#ff4c0f]/10">
      <Search
        size={18}
        className="shrink-0 text-zinc-500 group-focus-within:text-zinc-300"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-200 placeholder:text-zinc-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
