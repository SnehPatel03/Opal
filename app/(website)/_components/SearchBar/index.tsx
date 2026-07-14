"use client";

import { Search } from "lucide-react";

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({
  value,
  placeholder = "Search...",
  onChange,
}: Props) => {
  return (
    <div className="group flex h-11 w-85 items-center gap-3 rounded-2xl border border-zinc-800 bg-[#171717] px-4 transition-all duration-200 hover:border-zinc-700 focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-700/30">
      <Search
        size={20} 
        className="text-zinc-500 transition group-focus-within:text-zinc-300"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;