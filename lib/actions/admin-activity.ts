"use server";

import db from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";

export type AdminActivityItem = {
  id: string;
  type: "form" | "product" | "page" | "media" | "user";
  title: string;
  message: string;
  href: string;
  createdAt: string;
  isNew?: boolean;
};

export async function getRecentAdminActivity(): Promise<{
  success: boolean;
  data?: AdminActivityItem[];
  error?: string;
}> {
  try {
    await requireAuth();

    const [forms, products, pages, media, users] = await Promise.all([
      db.formSubmission.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          status: true,
          name: true,
          company: true,
          createdAt: true,
        },
      }),
      db.product.findMany({
        take: 8,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          updatedAt: true,
          createdAt: true,
          translations: {
            where: { locale: "en" },
            take: 1,
            select: { name: true },
          },
        },
      }),
      db.pageContent.findMany({
        take: 8,
        orderBy: { updatedAt: "desc" },
        select: {
          pageKey: true,
          locale: true,
          title: true,
          updatedAt: true,
        },
      }),
      db.media.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          type: true,
          createdAt: true,
        },
      }),
      db.user.findMany({
        take: 8,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          name: true,
          role: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
    ]);

    const items: AdminActivityItem[] = [
      ...forms.map((item) => ({
        id: `form-${item.id}`,
        type: "form" as const,
        title: item.status === "NEW" ? "New form submission" : "Form submission updated",
        message: `${item.name}${item.company ? `, ${item.company}` : ""} (${item.type.toLowerCase().replace(/_/g, " ")})`,
        href: `/admin/forms/${item.id}`,
        createdAt: item.createdAt.toISOString(),
        isNew: item.status === "NEW",
      })),
      ...products.map((item) => ({
        id: `product-${item.id}`,
        type: "product" as const,
        title: "Product updated",
        message: item.translations[0]?.name || "Untitled product",
        href: `/admin/products/${item.id}/edit`,
        createdAt: item.updatedAt.toISOString(),
        isNew: item.updatedAt.getTime() === item.createdAt.getTime(),
      })),
      ...pages.map((item) => ({
        id: `page-${item.pageKey}-${item.locale}`,
        type: "page" as const,
        title: "Page content updated",
        message: `${item.title || item.pageKey} (${item.locale.toUpperCase()})`,
        href: `/admin/pages/${item.pageKey}/edit?locale=${item.locale}`,
        createdAt: item.updatedAt.toISOString(),
      })),
      ...media.map((item) => ({
        id: `media-${item.id}`,
        type: "media" as const,
        title: "Media uploaded",
        message: `${item.name} (${item.type})`,
        href: "/admin/media",
        createdAt: item.createdAt.toISOString(),
        isNew: true,
      })),
      ...users.map((item) => ({
        id: `user-${item.id}`,
        type: "user" as const,
        title: "User account updated",
        message: `${item.name} (${item.role.toLowerCase().replace(/_/g, " ")})`,
        href: `/admin/users/${item.id}/edit`,
        createdAt: item.updatedAt.toISOString(),
        isNew: item.updatedAt.getTime() === item.createdAt.getTime(),
      })),
    ]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, 12);

    return { success: true, data: items };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error loading admin activity:", error);
    return { success: false, error: "Failed to load recent activity" };
  }
}
