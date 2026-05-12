"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileText,
  Home,
  Image as ImageIcon,
  Menu,
  Package,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  getRecentAdminActivity,
  type AdminActivityItem,
} from "@/lib/actions/admin-activity";
import { useSidebar } from "./sidebar-provider";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

const ROUTE_LABELS: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  new: "New",
  edit: "Edit",
  pages: "Pages",
  media: "Media",
  forms: "Forms",
  settings: "Settings",
  users: "Users",
  profile: "Profile",
};

function labelizeSegment(segment: string) {
  return (
    ROUTE_LABELS[segment] ??
    segment.replace(/-/g, " ").replace(/^./, (letter) => letter.toUpperCase())
  );
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) {
    return [{ label: "Dashboard", href: "/admin" }];
  }

  const crumbs: BreadcrumbItem[] = [];
  let href = "";

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    href += `/${segment}`;
    if (segment === "admin") {
      crumbs.push({ label: "Dashboard", href: "/admin" });
      continue;
    }

    if (segments[index - 1] === "pages" && segments[index + 1] === "edit") {
      crumbs.push({
        label: labelizeSegment(segment),
        href: undefined,
      });
      continue;
    }

    crumbs.push({
      label: labelizeSegment(segment),
      href: href === pathname ? undefined : href,
    });
  }

  return crumbs;
}

function UserDropdown() {
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
        "group flex items-center gap-3 rounded-full border border-border/70 bg-background/80 py-1 pl-1 pr-3 shadow-sm transition-all duration-200",
        "hover:border-primary/30 hover:bg-primary/5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full",
          "bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white",
          "ring-2 ring-white shadow-sm transition-transform duration-200 group-hover:scale-105",
        )}
      >
        {userInitials}
      </div>
      <div className="hidden min-w-0 text-left md:block">
        <p className="truncate text-sm font-semibold leading-4 text-foreground">
          {userName}
        </p>
        <p className="max-w-[180px] truncate text-xs text-muted-foreground">
          {userEmail}
        </p>
      </div>
    </Link>
  );
}

const ACTIVITY_ICONS = {
  form: FileText,
  product: Package,
  page: FileText,
  media: ImageIcon,
  user: UserRound,
} as const;

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

function NotificationBell() {
  const [items, setItems] = useState<AdminActivityItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const stored = window.localStorage.getItem("damira-admin-seen-activity");
    if (stored) {
      try {
        setSeenIds(new Set(JSON.parse(stored) as string[]));
      } catch {
        setSeenIds(new Set());
      }
    }

    startTransition(async () => {
      const result = await getRecentAdminActivity();
      if (result.success && result.data) {
        setItems(result.data);
      }
    });
  }, []);

  const unreadCount = items.filter((item) => !seenIds.has(item.id)).length;

  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen && items.length > 0) {
      const nextSeen = new Set([...seenIds, ...items.map((item) => item.id)]);
      setSeenIds(nextSeen);
      window.localStorage.setItem(
        "damira-admin-seen-activity",
        JSON.stringify(Array.from(nextSeen).slice(-100)),
      );
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
        aria-label="View notifications"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white ring-2 ring-background">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </Button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-bold text-foreground">Recent activity</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Local seen state only. Persistent read status needs a DB model.
            </p>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-2">
            {isPending ? (
              <div className="flex items-center gap-2 px-3 py-5 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4 animate-spin" />
                Loading activity...
              </div>
            ) : items.length > 0 ? (
              items.map((item) => {
                const Icon = ACTIVITY_ICONS[item.type];
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-foreground">
                          {item.title}
                        </span>
                        {item.isNew ? (
                          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase text-accent-dark">
                            New
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {item.message}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3" />
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </span>
                  </Link>
                );
              })
            ) : (
              <div className="px-3 py-6 text-sm text-muted-foreground">
                No recent activity found.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SearchBox({ pathname }: { pathname: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supported = useMemo(
    () =>
      pathname === "/admin/products" ||
      pathname === "/admin/forms" ||
      pathname === "/admin/media" ||
      pathname === "/admin/users" ||
      pathname === "/admin/pages" ||
      /^\/admin\/pages\/[^/]+\/edit$/.test(pathname),
    [pathname],
  );
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    if (!supported) {
      return;
    }

    const currentQuery = searchParams.get("q") ?? "";
    setQuery(currentQuery);
    window.dispatchEvent(
      new CustomEvent("admin-search", { detail: { query: currentQuery } }),
    );
  }, [searchParams, supported]);

  function updateSearch(nextQuery: string) {
    setQuery(nextQuery);
    window.dispatchEvent(
      new CustomEvent("admin-search", { detail: { query: nextQuery } }),
    );
  }

  useEffect(() => {
    if (!supported) {
      return;
    }

    const timer = window.setTimeout(() => {
      const normalizedQuery = query.trim();
      const currentQuery = searchParams.get("q") ?? "";

      if (currentQuery === normalizedQuery) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      if (normalizedQuery) {
        params.set("q", normalizedQuery);
      } else {
        params.delete("q");
      }

      const suffix = params.toString();
      router.replace(`${pathname}${suffix ? `?${suffix}` : ""}`, {
        scroll: false,
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [pathname, query, router, searchParams, supported]);

  if (!supported) {
    return null;
  }

  return (
    <label className="hidden min-w-[260px] items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-2 text-muted-foreground shadow-sm backdrop-blur md:flex xl:min-w-[340px]">
      <Search className="h-4 w-4" />
      <input
        value={query}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search this page..."
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

export function AdminHeader({ breadcrumbs }: AdminHeaderProps) {
  const { toggleMobile } = useSidebar();
  const pathname = usePathname();

  const displayBreadcrumbs = breadcrumbs ?? buildBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobile}
          className="shrink-0 rounded-full bg-background lg:hidden"
          aria-label="Toggle sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="hidden items-center gap-2 text-xs font-medium text-primary sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Damira Pharma CMS</span>
          </div>
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center gap-1.5 text-sm"
          >
            <Link
              href="/admin"
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>

            {displayBreadcrumbs.map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="flex min-w-0 items-center gap-1.5"
              >
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "truncate text-muted-foreground transition-colors hover:text-foreground",
                      index === displayBreadcrumbs.length - 1 &&
                        "font-semibold text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "truncate text-muted-foreground",
                      index === displayBreadcrumbs.length - 1 &&
                        "font-semibold text-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Suspense fallback={null}>
            <SearchBox pathname={pathname} />
          </Suspense>
          <Link href="/" target="_blank" className="hidden lg:block">
            <Button
              variant="outline"
              className="rounded-full bg-background/80 gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Button>
          </Link>
          <NotificationBell />
          <div className="mx-1 hidden h-8 w-px bg-border md:block" />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
