"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider } from "@/components/admin/sidebar-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--color-primary)/0.12),transparent_34rem),linear-gradient(180deg,hsl(var(--color-muted)/0.85),hsl(var(--color-background))_38rem)] text-foreground">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminHeader />
            <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
              <div className="mx-auto w-full max-w-[1500px]">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
