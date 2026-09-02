import { completeSubscription } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Promise<{ session_id?: string; cancel?: string }>;
};

const page = async ({ searchParams }: Props) => {
  const { session_id, cancel } = await searchParams;
  if (session_id) {
    const customer = await completeSubscription(session_id);
    if (customer?.status === 200) {
      return redirect(`/dashboard/${customer.workspaceId}`);
    }
  }

  if (cancel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-6">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#171717] p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white">Payment Cancelled</h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Your subscription could not be completed. No payment has been
            charged. You can try again anytime.
          </p>

          <a
            href="/dashboard"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f]">
      <div className="rounded-xl border border-zinc-800 bg-[#171717] px-8 py-6 text-center">
        <p className="text-zinc-400">Processing your subscription...</p>
      </div>
    </div>
  );
};

export default page;
