import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  Languages,
  Layers3,
  PencilLine,
  Sparkles,
} from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPageKeys, getPageDefinition } from "@/lib/content/page-definitions";

export const metadata = {
  title: "Structured Pages | Damira Admin",
  description: "Manage predefined structured pages and localized content",
};

const pageAccentClasses = [
  "from-primary/15 to-primary/5 text-primary",
  "from-secondary/15 to-secondary/5 text-secondary",
  "from-accent/15 to-accent/5 text-accent-dark",
];

interface AdminPagesPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function AdminPagesPage({ searchParams }: AdminPagesPageProps) {
  const query = await searchParams;
  const searchQuery = (Array.isArray(query.q) ? query.q[0] : query.q)
    ?.trim()
    .toLowerCase();

  const pages = getAllPageKeys()
    .map((pageKey) => getPageDefinition(pageKey))
    .filter((page): page is NonNullable<typeof page> => Boolean(page))
    .filter((page) => {
      if (!searchQuery) {
        return true;
      }

      return [
        page.pageKey,
        page.label,
        ...page.sections.flatMap((section) => [
          section.sectionKey,
          section.label,
          section.description,
        ]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery);
    });

  const totalSections = pages.reduce((total, page) => total + page.sections.length, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pages Content Studio"
        description="Edit the exact public-page sections in a calmer, structured workflow. Choose a page, switch language, then update only the visible content fields."
        eyebrow="Structured Content"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2 rounded-full bg-background/80">
              <Globe2 className="h-4 w-4" />
              EN / AR ready
            </Button>
            <Link href="/" target="_blank">
              <Button className="gap-2 rounded-full">
                <ArrowRight className="h-4 w-4" />
                Preview site
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card variant="elevated" className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/10 to-card">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-foreground">{pages.length}</p>
              <p className="text-sm text-muted-foreground">managed public pages</p>
            </div>
          </CardContent>
        </Card>
        <Card variant="elevated" className="overflow-hidden border-secondary/15 bg-gradient-to-br from-secondary/10 to-card">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/20">
              <Layers3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalSections}</p>
              <p className="text-sm text-muted-foreground">editable page sections</p>
            </div>
          </CardContent>
        </Card>
        <Card variant="elevated" className="overflow-hidden border-accent/20 bg-gradient-to-br from-accent/10 to-card">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
              <Languages className="h-5 w-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">content locales per page</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[var(--shadow-card)] backdrop-blur sm:p-5">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Choose a page to edit</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Each card shows the available public sections. Use EN or AR to jump directly into the editor.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Public layout stays untouched
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.length === 0 ? (
            <Card variant="elevated" className="border-dashed md:col-span-2 xl:col-span-3">
              <CardHeader>
                <CardTitle>No matching pages</CardTitle>
                <CardDescription>
                  No page or section matches your current page search.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}
          {pages.map((page, index) => {
            const accent = pageAccentClasses[index % pageAccentClasses.length];
            return (
              <Card
                key={page.pageKey}
                variant="elevated"
                className="group overflow-hidden border-border/70 bg-background/85 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent}`}>
                      <FileText className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-secondary/15 bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary-dark">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active
                    </span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <CardTitle className="text-xl">{page.label}</CardTitle>
                    <CardDescription>
                      Key <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs">{page.pageKey}</code> · {page.sections.length} sections
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {page.sections.slice(0, 4).map((section) => (
                      <span
                        key={section.sectionKey}
                        className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {section.label}
                      </span>
                    ))}
                    {page.sections.length > 4 ? (
                      <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        +{page.sections.length - 4} more
                      </span>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-border/60 pt-4">
                    <Link href={`/admin/pages/${page.pageKey}/edit?locale=en`}>
                      <Button variant="outline" className="w-full justify-between rounded-xl bg-background">
                        <span>English</span>
                        <PencilLine className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/pages/${page.pageKey}/edit?locale=ar`}>
                      <Button variant="outline" className="w-full justify-between rounded-xl bg-background">
                        <span>العربية</span>
                        <PencilLine className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
