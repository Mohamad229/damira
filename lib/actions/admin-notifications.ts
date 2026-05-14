"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAuth } from "@/lib/auth-utils";
import db from "@/lib/db";

const DEFAULT_NOTIFICATION_LIMIT = 10;
const MAX_NOTIFICATION_LIMIT = 20;

const createAdminNotificationSchema = z.object({
  type: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(160),
  message: z.string().trim().max(500).optional().nullable(),
  href: z.string().trim().max(300).optional().nullable(),
  entityType: z.string().trim().max(80).optional().nullable(),
  entityId: z.string().trim().max(191).optional().nullable(),
  actorId: z.string().trim().max(191).optional().nullable(),
});

const notificationIdSchema = z.string().trim().min(1).max(191);

export type CreateAdminNotificationInput = z.infer<
  typeof createAdminNotificationSchema
>;

export type AdminNotificationItem = {
  id: string;
  type: string;
  title: string;
  message: string | null;
  href: string | null;
  entityType: string | null;
  entityId: string | null;
  actorId: string | null;
  readAt: string | null;
  createdAt: string;
  isUnread: boolean;
};

export type AdminNotificationResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

type AdminNotificationRecord = {
  id: string;
  type: string;
  title: string;
  message: string | null;
  href: string | null;
  entityType: string | null;
  entityId: string | null;
  actorId: string | null;
  readAt: Date | null;
  createdAt: Date;
};

type AdminNotificationDelegate = {
  create(args: unknown): Promise<AdminNotificationRecord>;
  findMany(args: unknown): Promise<AdminNotificationRecord[]>;
  count(args?: unknown): Promise<number>;
  update(args: unknown): Promise<AdminNotificationRecord>;
  updateMany(args: unknown): Promise<{ count: number }>;
};

function adminNotificationModel(): AdminNotificationDelegate {
  return (db as unknown as { adminNotification: AdminNotificationDelegate })
    .adminNotification;
}

function clampLimit(limit: number = DEFAULT_NOTIFICATION_LIMIT): number {
  if (!Number.isFinite(limit)) {
    return DEFAULT_NOTIFICATION_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_NOTIFICATION_LIMIT);
}

function toNotificationItem(
  record: AdminNotificationRecord,
): AdminNotificationItem {
  return {
    id: record.id,
    type: record.type,
    title: record.title,
    message: record.message,
    href: record.href,
    entityType: record.entityType,
    entityId: record.entityId,
    actorId: record.actorId,
    readAt: record.readAt?.toISOString() ?? null,
    createdAt: record.createdAt.toISOString(),
    isUnread: record.readAt === null,
  };
}

export async function createAdminNotification(
  input: CreateAdminNotificationInput,
): Promise<AdminNotificationResult<AdminNotificationItem>> {
  try {
    const validated = createAdminNotificationSchema.parse(input);

    const notification = await adminNotificationModel().create({
      data: {
        type: validated.type,
        title: validated.title,
        message: validated.message || null,
        href: validated.href || null,
        entityType: validated.entityType || null,
        entityId: validated.entityId || null,
        actorId: validated.actorId || null,
      },
    });

    revalidatePath("/admin");
    if (validated.href?.startsWith("/admin")) {
      revalidatePath(validated.href.split("?")[0]);
    }

    return { success: true, data: toNotificationItem(notification) };
  } catch (error) {
    console.error("Error creating admin notification:", error);
    return { success: false, error: "Failed to create admin notification" };
  }
}

export async function getAdminNotifications(
  limit: number = DEFAULT_NOTIFICATION_LIMIT,
): Promise<AdminNotificationResult<AdminNotificationItem[]>> {
  try {
    await requireAuth();

    const notifications = await adminNotificationModel().findMany({
      take: clampLimit(limit),
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: notifications.map(toNotificationItem) };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error loading admin notifications:", error);
    return { success: false, error: "Failed to load admin notifications" };
  }
}

export async function getUnreadAdminNotificationCount(): Promise<
  AdminNotificationResult<{ count: number }>
> {
  try {
    await requireAuth();

    const count = await adminNotificationModel().count({
      where: { readAt: null },
    });

    return { success: true, data: { count } };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error loading unread notification count:", error);
    return {
      success: false,
      error: "Failed to load unread notification count",
    };
  }
}

export async function markAdminNotificationRead(
  id: string,
): Promise<AdminNotificationResult<AdminNotificationItem>> {
  try {
    await requireAuth();

    const notificationId = notificationIdSchema.parse(id);
    const notification = await adminNotificationModel().update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    });

    revalidatePath("/admin");

    return { success: true, data: toNotificationItem(notification) };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error marking admin notification read:", error);
    return { success: false, error: "Failed to mark notification as read" };
  }
}

export async function markAllAdminNotificationsRead(): Promise<
  AdminNotificationResult<{ count: number }>
> {
  try {
    await requireAuth();

    const result = await adminNotificationModel().updateMany({
      where: { readAt: null },
      data: { readAt: new Date() },
    });

    revalidatePath("/admin");

    return { success: true, data: { count: result.count } };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error marking all admin notifications read:", error);
    return { success: false, error: "Failed to mark notifications as read" };
  }
}

export async function getDashboardRecentActivity(
  limit: number = 8,
): Promise<AdminNotificationResult<AdminNotificationItem[]>> {
  try {
    await requireAuth();

    const notifications = await adminNotificationModel().findMany({
      take: clampLimit(limit),
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: notifications.map(toNotificationItem) };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error loading dashboard recent activity:", error);
    return { success: false, error: "Failed to load recent activity" };
  }
}
