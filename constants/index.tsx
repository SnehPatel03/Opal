import {
  House,
  LibraryBig,
  Bell,
  CreditCard,
  Settings,
} from "lucide-react";

export const MENU_ITEMS = (
  workspaceId: string,
): {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] => [
  {
    title: "Home",
    href: `/dashboard/${workspaceId}`,
    icon: <House className="h-5 w-5 text-neutral-400" />,
  },
  {
    title: "Library",
    href: `/dashboard/${workspaceId}/library`,
    icon: <LibraryBig className="h-5 w-5 text-neutral-400" />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <Bell className="h-5 w-5 text-neutral-400" />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCard className="h-5 w-5 text-neutral-400" />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <Settings className="h-5 w-5 text-neutral-400" />,
  },
];