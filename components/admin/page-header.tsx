import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow = "Admin Workspace",
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 px-5 py-5 shadow-[var(--shadow-card)] backdrop-blur sm:px-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,hsl(var(--color-primary)/0.12),transparent_20rem)]" />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl space-y-2">
          {eyebrow ? (
            <span className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
