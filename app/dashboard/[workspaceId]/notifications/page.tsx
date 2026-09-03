"use client";

import { getNotifications } from "@/actions/user";
import LoadingComponent from "@/app/(website)/_components/loadingComponent";
import { userQueryData } from "@/hooks/userQueryData";
import { Bell, CheckCheck } from "lucide-react";

type NotificationsResult = { status: number; data?: { notification: { id: string; userId: string; content: string; createdAt?: string }[] } };

export default function NotificationPage() {
  const { data: result } = userQueryData(["user-notifications"], getNotifications);
  if (!result) return <LoadingComponent label="Loading updates" />;
  const data = result as NotificationsResult;
  const notifications = data.data?.notification ?? [];

  return <div className="mx-auto max-w-4xl space-y-6"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.24em] text-[#ff784c]">Inbox</p><h1 className="mt-2 text-3xl font-black uppercase tracking-[-.06em] text-white sm:text-4xl">Notifications</h1><p className="mt-2 text-sm text-white/45">Stay close to what is happening across your videos and workspace.</p></div><div className="flex items-center gap-2 rounded-full border border-white/[.1] bg-white/[.035] px-3 py-2 text-xs text-white/55"><CheckCheck size={15} className="text-[#ff784c]"/>{notifications.length} updates</div></header>
    {data.status === 200 && notifications.length ? <section className="opal-panel overflow-hidden rounded-3xl"><div className="border-b border-white/[.08] px-5 py-4"><p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-white/40">Recent activity</p></div><div className="divide-y divide-white/[.08]">{notifications.map((notification, index) => <article key={notification.id} className="group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-white/[.035]"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff4c0f]/12 text-[#ff784c] group-hover:bg-[#ff4c0f] group-hover:text-black"><Bell size={17}/></div><div className="min-w-0 flex-1"><p className="text-sm leading-6 text-white/75">{notification.content}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[.15em] text-white/35">{notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : index === 0 ? "Latest" : "Recent"}</p></div></article>)}</div></section> : <section className="opal-panel flex min-h-72 flex-col items-center justify-center rounded-3xl px-6 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff4c0f]/12 text-[#ff784c]"><Bell size={20}/></div><h2 className="mt-4 text-lg font-bold text-white">You are all caught up</h2><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/45">When there is activity on your videos or workspace, it will appear here.</p></section>}
  </div>;
}
