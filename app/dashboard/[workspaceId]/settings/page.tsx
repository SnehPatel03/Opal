"use client";

import { enableFirstView, getFirstView } from "@/actions/user";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [firstView, setFirstView] = useState<boolean | undefined>(undefined);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFirstView();

      if (res.status === 200) {
        setFirstView(res.data);
      } else {
        toast.error("Failed to load settings");
      }
    };

    fetchData();
  }, []);

  const switchState = async (checked: boolean) => {
    setUpdating(true);

    const res = await enableFirstView(checked);

    if (res?.status === 200) {
      setFirstView(checked);

      toast.success("Settings Updated", {
        description: res.data,
      });
    } else {
      toast.error("Failed", {
        description: res?.data ?? "Something went wrong",
      });
    }

    setUpdating(false) ;
  };

  return (
<div className="mx-auto max-w-3xl p-8">
  <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717]">
    <div className="border-b border-zinc-800 px-6 py-5">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        PERSONAL
      </p>

      <h1 className="mt-1 text-2xl font-bold text-white">
        Video Sharing Settings
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        Configure how you're notified when people interact with your videos.
      </p>
    </div>

    <div className="flex items-center justify-between px-6 py-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Eye className="h-5 w-5 text-zinc-300" />
        </div>

        <div className="max-w-lg">
          <h3 className="text-sm font-semibold text-white">
            First View Notifications
          </h3>

          <p className="mt-1 text-sm leading-6 text-zinc-500">
            Receive a notification when your video gets its very first
            viewer. This helps you know when someone has started engaging
            with your content so you can follow up at the right time.
          </p>
        </div>
      </div>

      {firstView === undefined ? (
        <Skeleton className="h-6 w-12 rounded-full bg-zinc-800" />
      ) : (
        <div className="flex items-center gap-3">
          {updating && (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
          )}

          <Switch
            checked={firstView}
            disabled={updating}
            onCheckedChange={switchState}
          />
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default SettingsPage;