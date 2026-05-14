"use server";

export {
  getDashboardRecentActivity as getRecentAdminActivity,
  getDashboardRecentActivity,
} from "@/lib/actions/admin-notifications";

export type {
  AdminNotificationItem as AdminActivityItem,
  AdminNotificationItem,
} from "@/lib/actions/admin-notifications";
