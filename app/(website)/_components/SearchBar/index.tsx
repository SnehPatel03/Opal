"use client";

import { Search } from "lucide-react";

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, placeholder = "Search...", onChange }: Props) => {
  return (
    <div className="group flex h-9 md:h-9 w-full items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-800 bg-[#171717] px-3 md:px-4 transition-all duration-200 hover:border-zinc-700 focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-700/30">
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
