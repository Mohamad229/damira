"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-provider";

const navGroups = [
  {
    label: "Operate",
    items: [
      {
        label: "Dashboard",
        description: "System overview",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Products",
        description: "Catalog management",
        href: "/admin/products",
        icon: Package,
      },
      {
        label: "Pages",
        description: "Public content editor",
        href: "/admin/pages",
        icon: FileText,
      },
    ],
  },
  {
    label: "Assets & Requests",
    items: [
      {
        label: "Media",
        description: "Images and files",
        href: "/admin/media",
        icon: Image,
      },
      {
        label: "Forms",
        description: "Submissions inbox",
        href: "/admin/forms",
        icon: Inbox,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Settings",
        description: "Site data and options",
        href: "/admin/settings",
        icon: Settings,
      },
      {
        label: "Users",
        description: "Admin accounts",
        href: "/admin/users",
        icon: Users,
      },
    ],
  },
] as const;

type NavItemConfig = (typeof navGroups)[number]["items"][number];

function NavItem({
  item,
  isActive,
  isCollapsed,
  onClick,
}: {
  item: NavItemConfig;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200",
        "hover:bg-primary/10 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isActive
          ? "bg-gradient-to-r from-primary/15 to-secondary/10 text-primary shadow-sm ring-1 ring-primary/15"
          : "text-sidebar-foreground/70",
        isCollapsed && "justify-center px-2",
      )}
      title={isCollapsed ? item.label : undefined}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
          isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
        )}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className={cn("min-w-0 flex-1 transition-all duration-200", isCollapsed && "sr-only")}> 
        <span className="block truncate font-semibold">{item.label}</span>
        <span className="block truncate text-xs font-normal text-sidebar-foreground/45 group-hover:text-primary/70">
          {item.description}
        </span>
      </span>
      {isActive && !isCollapsed ? (
        <span className="h-2 w-2 rounded-full bg-primary" />
      ) : null}
      {isCollapsed ? (
        <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 rounded-xl border border-border bg-popover px-3 py-2 text-xs font-semibold text-popover-foreground shadow-lg group-hover:block">
          {item.label}
        </span>
      ) : null}
    </Link>
  );
}

function UserProfile({ isCollapsed }: { isCollapsed: boolean }) {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Admin User";
  const userEmail = session?.user?.email || "admin@damira.com";
  const userInitials = userName
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      href="/admin/users/profile"
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-sidebar-border/80 bg-sidebar-accent/60 p-2 transition-all duration-200 hover:border-primary/25 hover:bg-primary/5",
        isCollapsed && "justify-center border-transparent bg-transparent",
      )}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary text-sm font-bold text-white shadow-md shadow-primary/20">
        {userInitials}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-secondary" />
      </div>

      {!isCollapsed ? (
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            {userName}
          </p>
          <p className="truncate text-xs text-sidebar-foreground/55">
            {userEmail}
          </p>
        </div>
      ) : null}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();

  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const effectiveCollapsed = hasMounted && !isMobile && isCollapsed;

  const handleNavClick = () => {
    closeMobile();
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  const sidebarContent = (
    <>
      <div
        className={cn(
          "relative border-b border-sidebar-border px-4 py-5",
          effectiveCollapsed && "px-2",
        )}
      >
        <div className={cn("flex items-center gap-3", effectiveCollapsed && "justify-center")}> 
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-lg shadow-primary/25">
            <ShieldCheck className="h-5 w-5" />
          </div>

          {!effectiveCollapsed ? (
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-heading text-base font-bold tracking-tight text-sidebar-foreground">
                Damira Pharma
              </h1>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                <BarChart3 className="h-3 w-3" />
                CMS Admin
              </div>
            </div>
          ) : null}

          <button
            onClick={closeMobile}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-xl text-sidebar-foreground/60 transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            {!effectiveCollapsed ? (
              <p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/35">
                {group.label}
              </p>
            ) : null}
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={isActive}
                    isCollapsed={effectiveCollapsed}
                    onClick={handleNavClick}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <UserProfile isCollapsed={effectiveCollapsed} />

        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "mt-2 w-full justify-start gap-3 rounded-2xl text-sidebar-foreground/65 hover:bg-destructive/10 hover:text-destructive",
            effectiveCollapsed && "justify-center px-2",
          )}
          title={effectiveCollapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!effectiveCollapsed ? <span>Sign out</span> : null}
        </Button>
      </div>

      <div className="hidden border-t border-sidebar-border p-3 lg:block">
        <Button
          variant="outline"
          onClick={toggleCollapse}
          className="w-full justify-center gap-2 rounded-2xl bg-sidebar text-sidebar-foreground/70 hover:bg-primary/10 hover:text-primary"
          size="sm"
        >
          {effectiveCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse menu</span>
            </>
          )}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {isMobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[292px] flex-col border-r border-sidebar-border bg-sidebar/95 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition-all duration-300 ease-in-out lg:shadow-none",
          effectiveCollapsed ? "lg:w-[84px]" : "lg:w-[292px]",
        )}
        style={{
          transform:
            !hasMounted
              ? undefined
              : isMobile && !isMobileOpen
                ? "translateX(-100%)"
                : "translateX(0)",
        }}
        data-mobile-hidden={!hasMounted ? "true" : undefined}
      >
        {sidebarContent}
      </aside>

      <div
        className={cn(
          "hidden shrink-0 transition-all duration-300 ease-in-out lg:block",
          effectiveCollapsed ? "w-[84px]" : "w-[292px]",
        )}
        aria-hidden="true"
      />
    </>
  );
}
