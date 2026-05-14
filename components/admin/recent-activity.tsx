import Link from "next/link";
import { FileText, Image, Inbox, Package, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getDashboardRecentActivity,
  type AdminNotificationItem,
} from "@/lib/actions/admin-notifications";
import { cn } from "@/lib/utils";

interface RecentActivityProps {
  className?: string;
}

const ACTIVITY_STYLES = {
  form: {
    icon: Inbox,
    iconBg: "bg-orange-500/10 dark:bg-orange-400/15",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  product: {
    icon: Package,
    iconBg: "bg-blue-500/10 dark:bg-blue-400/15",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  page: {
    icon: FileText,
    iconBg: "bg-green-500/10 dark:bg-green-400/15",
    iconColor: "text-green-600 dark:text-green-400",
  },
  media: {
    icon: Image,
    iconBg: "bg-cyan-500/10 dark:bg-cyan-400/15",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  user: {
    icon: UserRound,
    iconBg: "bg-purple-500/10 dark:bg-purple-400/15",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
} as const;

type ActivityStyleKey = keyof typeof ACTIVITY_STYLES;

function getActivityStyleKey(item: AdminNotificationItem): ActivityStyleKey {
  const value = `${item.entityType || item.type}`.toLowerCase();

  if (value.includes("form")) {
    return "form";
  }

  if (value.includes("product")) {
    return "product";
  }

  if (value.includes("page")) {
    return "page";
  }

  if (value.includes("media")) {
    return "media";
  }

  if (value.includes("user")) {
    return "user";
  }

  return "page";
}

function formatRelativeTime(value: string) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return "Recently";
  }

  const diff = Date.now() - timestamp;
  const minutes = Math.max(1, Math.round(diff / 60000));

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${Math.round(hours / 24)}d ago`;
}

export async function RecentActivity({ className }: RecentActivityProps) {
  const result = await getDashboardRecentActivity(8);
  const activities = result.success && result.data ? result.data : [];

  return (
    <Card
      variant="elevated"
      className={cn(
        "transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const style = ACTIVITY_STYLES[getActivityStyleKey(activity)];
            const Icon = style.icon;
            const content = (
              <>
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    style.iconBg,
                  )}
                >
                  <Icon
                    className={cn("size-4", style.iconColor)}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  {activity.message ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {activity.message}
                    </p>
                  ) : null}
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(activity.createdAt)}
                  </p>
                </div>
              </>
            );

            return activity.href ? (
              <Link
                key={activity.id}
                href={activity.href}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                {content}
              </Link>
            ) : (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-2"
              >
                {content}
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
            No recent activity yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
