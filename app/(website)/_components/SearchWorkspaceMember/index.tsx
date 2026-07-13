"use client";

import React from "react";
import { Input } from "@base-ui/react";
import { Search, Loader2, UserPlus } from "lucide-react";
import Image from "next/image";

import { useSearch } from "@/hooks/useSearch";
import { useMutationData } from "@/hooks/useMutationData";

type Props = {
  workspaceId: string;
};

const SearchWorkspaceMember = ({ workspaceId }: Props) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    "get-users",
    "USERS"
  );

  // Work In Progress
  // const { mutate, isPending } = useMutationData(
  //   ["invite-member"],
  //   (data: { receiverId: string; email: string }) => {}
  // );

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          size={18}
        />

        <Input
          value={query}
          onChange={onSearchQuery}
          type="text"
          placeholder="Search users by name or email..."
          className="h-11 w-full rounded-lg border border-neutral-800 bg-neutral-900 pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-500 focus:border-neutral-600"
        />
      </div>

      {/* Loading */}
      {isFetching && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
        </div>
      )}

      {/* User List */}
      {!isFetching && onUsers && onUsers.length > 0 && (
        <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
          {onUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 transition hover:border-neutral-700 hover:bg-neutral-800"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={user.image || "/logo.svg"}
                  alt={user.firstname ?? "User"}
                  width={42}
                  height={42}
                  className="rounded-full border border-neutral-700"
                />

                <div className="flex flex-col">
                  <span className="font-medium text-white">
                    {user.firstname} {user.lastname}
                  </span>

                  <span className="text-xs text-neutral-400">
                    {user.email}
                  </span>

                  {user.subscription?.plan && (
                    <span
                      className={`mt-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        user.subscription.plan === "PRO"
                          ? "bg-violet-500/20 text-violet-300"
                          : "bg-neutral-700 text-neutral-300"
                      }`}
                    >
                      {user.subscription.plan}
                    </span>
                  )}
                </div>
              </div>

              <button
                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-neutral-200"
              >
                <UserPlus size={15} />
                Invite
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isFetching && query && (!onUsers || onUsers.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-800 py-10">
          <Search size={28} className="mb-3 text-neutral-600" />

          <h3 className="text-sm font-medium text-neutral-300">
            No users found
          </h3>

          <p className="mt-1 text-xs text-neutral-500">
            Try searching with another name or email.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchWorkspaceMember;