"use client";

import { getNotifications } from "@/actions/user";
import { userQueryData } from "@/hooks/userQueryData";
import { UserAvatar } from "@clerk/nextjs";

const NotificationPage = () => {
  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications
  );

  const { data, status } = notifications as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string;
        content: string;
        createdAt?: string;
      }[];
    };
  };

  if (status !== 200 || !data?.notification.length) {
    return (
      <div className="flex flex-col gap-6">
          <p className="text-muted-foreground ">
            Stay updated with recent activity.
          </p>

        <div className="flex h-64 items-center justify-center rounded-xl border">
          <p className="text-muted-foreground">No notifications yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-muted-foreground mt-1">
          Stay updated with recent activity.
        </p>
      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Today</h2>
        </div>

        {data.notification.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center gap-4 border-b px-6 py-4 transition-colors hover:bg-muted/40 last:border-none"
          >
            <UserAvatar />

            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                {notification.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;