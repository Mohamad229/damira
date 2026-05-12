"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  Layers3,
  Loader2,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { LanguageTabs } from "@/components/admin/language-tabs";
import { VisualJsonFieldEditor } from "@/components/admin/visual-json-field-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import {
  initializePageContent,
  updatePageContent,
} from "@/lib/actions/content";
import {
  parseJsonForSanitizer,
  sanitizeTemplateValue,
  sanitizeValueAgainstTemplate,
  stringifySanitized,
  type SanitizedJson,
} from "@/lib/content/admin-template-sanitizer";
import type { Locale } from "@/i18n/config";
import type { GetPageContentResponse } from "@/lib/content/types";
import type { PageDefinition } from "@/lib/content/page-definitions";
import { cn } from "@/lib/utils";

interface StructuredPageEditorClientProps {
  pageKey: string;
  locale: Locale;
  pageDefinition: PageDefinition;
  initialContent: GetPageContentResponse | null;
  sectionTemplates: Record<string, unknown>;
}

interface StructuredFormState {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: Record<string, Record<string, string>>;
}

function fieldValueToString(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return "";
    }
  }

  return String(value);
}

function getSanitizedTemplate(template: unknown): SanitizedJson {
  return sanitizeTemplateValue(template) ?? {};
}

function getSanitizedFieldString(value: unknown, template: unknown): string {
  const sanitizedTemplate = getSanitizedTemplate(template);
  return stringifySanitized(
    sanitizeValueAgainstTemplate(value, sanitizedTemplate),
  );
}

function buildInitialState(
  pageDefinition: PageDefinition,
  content: GetPageContentResponse | null,
  sectionTemplates: Record<string, unknown>,
): StructuredFormState {
  const sections: Record<string, Record<string, string>> = {};

  for (const section of pageDefinition.sections) {
    sections[section.sectionKey] = {};
    const sectionData = content?.sections?.[section.sectionKey];
    const sectionTemplate = sectionTemplates[section.sectionKey];

    for (const fieldKey of Object.keys(section.fields)) {
      const raw =
        sectionData?.[fieldKey] ??
        (fieldKey === "data" ? sectionTemplate : undefined);
      sections[section.sectionKey][fieldKey] =
        fieldKey === "data"
          ? getSanitizedFieldString(raw, sectionTemplate)
          : fieldValueToString(raw);
    }
  }

  return {
    title: content?.title ?? pageDefinition.label,
    metaTitle: content?.metaTitle ?? undefined,
    metaDescription: content?.metaDescription ?? undefined,
    sections,
  };
}

function countChangedSections(
  current: StructuredFormState,
  baseline: StructuredFormState,
) {
  return Object.keys(current.sections).filter(
    (sectionKey) =>
      JSON.stringify(current.sections[sectionKey]) !==
      JSON.stringify(baseline.sections[sectionKey]),
  ).length;
}

export function StructuredPageEditorClient({
  pageKey,
  locale,
  pageDefinition,
  initialContent,
  sectionTemplates,
}: StructuredPageEditorClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, startSaving] = useTransition();
  const [isInitializing, startInitializing] = useTransition();

  const initialState = useMemo(
    () => buildInitialState(pageDefinition, initialContent, sectionTemplates),
    [pageDefinition, initialContent, sectionTemplates],
  );

  const [formState, setFormState] = useState<StructuredFormState>(initialState);
  const [baselineState, setBaselineState] =
    useState<StructuredFormState>(initialState);
  const [adminSearchQuery, setAdminSearchQuery] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return new URLSearchParams(window.location.search).get("q")?.trim().toLowerCase() ?? "";
  });

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(formState) !== JSON.stringify(baselineState);
  }, [formState, baselineState]);

  const changedSectionsCount = useMemo(
    () => countChangedSections(formState, baselineState),
    [formState, baselineState],
  );

  const setFieldValue = (
    sectionKey: string,
    fieldKey: string,
    nextValue: string,
  ) => {
    setFormState((previous) => ({
      ...previous,
      sections: {
        ...previous.sections,
        [sectionKey]: {
          ...previous.sections[sectionKey],
          [fieldKey]: nextValue,
        },
      },
    }));
  };

  useEffect(() => {
    function handleAdminSearch(event: Event) {
      const detail = (event as CustomEvent<{ query?: string }>).detail;
      setAdminSearchQuery(detail?.query?.trim().toLowerCase() ?? "");
    }

    window.addEventListener("admin-search", handleAdminSearch);
    return () => window.removeEventListener("admin-search", handleAdminSearch);
  }, []);

  const handleLocaleChange = (nextLocale: "en" | "ar") => {
    if (nextLocale === locale) {
      return;
    }

    if (hasUnsavedChanges) {
      const ok = window.confirm(
        "You have unsaved changes. Switch locale and discard local edits?",
      );
      if (!ok) {
        return;
      }
    }

    router.replace(`/admin/pages/${pageKey}/edit?locale=${nextLocale}`);
    router.refresh();
  };

  const handleCancel = () => {
    setFormState(baselineState);
  };

  const handleInitialize = () => {
    startInitializing(async () => {
      const result = await initializePageContent(pageKey, locale);

      if (!result.success) {
        toast({
          title: "Initialization failed",
          description: result.message,
          variant: "error",
        });
        return;
      }

      toast({
        title: "Page initialized",
        description: `Created initial content for ${pageKey}/${locale}`,
        variant: "success",
      });

      router.refresh();
    });
  };

  const handleSave = () => {
    startSaving(async () => {
      for (const section of pageDefinition.sections) {
        const sectionValues = formState.sections[section.sectionKey] ?? {};

        for (const [fieldKey, fieldDef] of Object.entries(section.fields)) {
          if (fieldDef.type !== "json") {
            continue;
          }

          const rawValue = sectionValues[fieldKey] ?? "";
          const trimmed = rawValue.trim();

          if (trimmed.length === 0) {
            continue;
          }

          try {
            JSON.parse(trimmed);
          } catch {
            toast({
              title: "Invalid JSON",
              description: `${section.label} / ${fieldDef.label} contains invalid JSON.`,
              variant: "error",
            });
            return;
          }
        }
      }

      const sections: Record<string, Record<string, string | null>> = {};

      for (const [sectionKey, fields] of Object.entries(formState.sections)) {
        sections[sectionKey] = {};

        for (const [fieldKey, rawValue] of Object.entries(fields)) {
          const fieldDef = pageDefinition.sections.find(
            (section) => section.sectionKey === sectionKey,
          )?.fields[fieldKey];
          const trimmed = rawValue.trim();

          if (fieldDef?.type === "json" && fieldKey === "data") {
            const template = getSanitizedTemplate(sectionTemplates[sectionKey]);
            const parsedValue =
              trimmed === "" ? template : parseJsonForSanitizer(rawValue);
            const sanitizedValue = sanitizeValueAgainstTemplate(
              parsedValue,
              template,
              { pageKey, sectionKey },
            );

            sections[sectionKey][fieldKey] =
              stringifySanitized(sanitizedValue);
            continue;
          }

          sections[sectionKey][fieldKey] = trimmed === "" ? null : rawValue;
        }
      }

      const result = await updatePageContent({
        pageKey,
        locale,
        title: initialContent?.title ?? pageDefinition.label,
        sections,
      });

      if (!result.success) {
        toast({
          title: "Save failed",
          description: result.message,
          variant: "error",
        });
        return;
      }

      toast({
        title: "Saved",
        description: `${pageDefinition.label} (${locale.toUpperCase()}) was updated successfully`,
        variant: "success",
      });

      setBaselineState(formState);
      router.refresh();
    });
  };

  const visibleSections = useMemo(() => {
    if (!adminSearchQuery) {
      return pageDefinition.sections;
    }

    return pageDefinition.sections.filter((section) => {
      const sectionValues = formState.sections[section.sectionKey] ?? {};
      const haystack = [
        section.label,
        section.description,
        section.sectionKey,
        ...Object.values(section.fields).map((field) => field.label),
        ...Object.values(sectionValues),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(adminSearchQuery);
    });
  }, [adminSearchQuery, formState.sections, pageDefinition.sections]);

  return (
    <div
      className="space-y-6 pb-24"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <PageHeader
        title={`Edit ${pageDefinition.label}`}
        description="A focused content studio for updating public-page text, images, cards, lists, and CTA fields without changing the public layout."
        eyebrow={`${pageKey} / ${locale.toUpperCase()}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/pages">
              <Button variant="outline" className="gap-2 rounded-full bg-background/80">
                <ArrowLeft className="h-4 w-4" />
                Back to Pages
              </Button>
            </Link>
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className="gap-2 rounded-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <Card variant="elevated" className="overflow-hidden border-primary/15 bg-card/95">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <CardTitle className="text-base">Editing status</CardTitle>
                  <CardDescription>{pageDefinition.sections.length} structured sections</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <LanguageTabs
                currentLanguage={locale}
                onLanguageChange={handleLocaleChange}
                unsavedChanges={{
                  en: locale === "en" ? hasUnsavedChanges : false,
                  ar: locale === "ar" ? hasUnsavedChanges : false,
                }}
                className="rounded-2xl"
              />

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-border bg-muted/35 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Locale</p>
                  <p className="mt-1 text-lg font-bold text-foreground">{locale.toUpperCase()}</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/35 p-3">
                  <p className="text-xs font-medium text-muted-foreground">Changed</p>
                  <p className="mt-1 text-lg font-bold text-foreground">{changedSectionsCount}</p>
                </div>
              </div>

              <div
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-3",
                  hasUnsavedChanges
                    ? "border-accent/30 bg-accent/10 text-accent-dark"
                    : "border-secondary/25 bg-secondary/10 text-secondary-dark",
                )}
              >
                {hasUnsavedChanges ? (
                  <Circle className="mt-0.5 h-4 w-4 fill-current" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {hasUnsavedChanges ? "Unsaved changes" : "Everything saved"}
                  </p>
                  <p className="mt-0.5 text-xs opacity-80">
                    {hasUnsavedChanges
                      ? "Review the highlighted sections, then save."
                      : "Your local editor state matches the last saved content."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" className="hidden xl:block">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers3 className="h-4 w-4 text-primary" />
                Section map
              </CardTitle>
              <CardDescription>Jump quickly between editable public sections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {pageDefinition.sections.map((section, index) => {
                const isChanged =
                  JSON.stringify(formState.sections[section.sectionKey]) !==
                  JSON.stringify(baselineState.sections[section.sectionKey]);

                return (
                  <a
                    key={section.sectionKey}
                    href={`#section-${section.sectionKey}`}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                      "hover:bg-primary/10 hover:text-primary",
                      isChanged ? "bg-accent/10 text-accent-dark" : "text-muted-foreground",
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-xs font-bold shadow-sm ring-1 ring-border">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{section.label}</span>
                    {isChanged ? <Circle className="h-2.5 w-2.5 fill-current" /> : null}
                  </a>
                );
              })}
            </CardContent>
          </Card>
        </aside>

        <main className="min-w-0 space-y-5">
          {!initialContent ? (
            <Card variant="elevated" className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Page Not Initialized
                </CardTitle>
                <CardDescription>
                  No content exists yet for {pageKey}/{locale}. Initialize it first, then edit fields.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleInitialize} disabled={isInitializing} className="gap-2 rounded-full">
                  {isInitializing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Initialize Page Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <div className="space-y-4">
            {adminSearchQuery && visibleSections.length === 0 ? (
              <Card variant="elevated" className="border-dashed">
                <CardHeader>
                  <CardTitle>No matching sections</CardTitle>
                  <CardDescription>
                    No editable section content matches "{adminSearchQuery}".
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : null}

            {visibleSections.map((section, index) => {
              const isChanged =
                JSON.stringify(formState.sections[section.sectionKey]) !==
                JSON.stringify(baselineState.sections[section.sectionKey]);

              return (
                <details
                  key={section.sectionKey}
                  id={`section-${section.sectionKey}`}
                  className={cn(
                    "group scroll-mt-28 overflow-hidden rounded-2xl border bg-card/95 shadow-[var(--shadow-card)] transition-all duration-300",
                    isChanged ? "border-accent/40 ring-4 ring-accent/10" : "border-border/70",
                  )}
                  open={adminSearchQuery ? true : undefined}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/35 sm:px-6">
                    <div className="flex min-w-0 items-start gap-4">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold shadow-sm",
                          isChanged
                            ? "bg-accent text-white shadow-accent/20"
                            : "bg-primary/10 text-primary",
                        )}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-heading text-base font-bold text-foreground sm:text-lg">
                            {section.label}
                          </h2>
                          {isChanged ? (
                            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent-dark">
                              Modified
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {section.description ?? `Fixed section key: ${section.sectionKey}`}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-border/60 bg-background/55 px-5 py-5 sm:px-6">
                    {Object.entries(section.fields).map(([fieldKey, fieldDef]) => (
                      <div key={fieldKey} className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{fieldDef.label}</p>
                            {fieldDef.description ? (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {fieldDef.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <VisualJsonFieldEditor
                          value={formState.sections[section.sectionKey]?.[fieldKey] ?? ""}
                          template={sectionTemplates[section.sectionKey]}
                          label={`${section.label} visible fields`}
                          sanitizerContext={{ pageKey, sectionKey: section.sectionKey }}
                          onChange={(nextValue) =>
                            setFieldValue(section.sectionKey, fieldKey, nextValue)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </main>
      </div>

      <div className="sticky bottom-0 z-20 -mx-4 border-t border-border/70 bg-background/90 px-4 py-3 shadow-[0_-18px_36px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                hasUnsavedChanges ? "bg-accent/15 text-accent-dark" : "bg-secondary/15 text-secondary-dark",
              )}
            >
              {hasUnsavedChanges ? <Circle className="h-3.5 w-3.5 fill-current" /> : <CheckCircle2 className="h-4 w-4" />}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {hasUnsavedChanges
                  ? `${changedSectionsCount} section${changedSectionsCount === 1 ? "" : "s"} changed`
                  : "All page content changes are saved"}
              </p>
              <p className="text-xs text-muted-foreground">
                Changes are saved only for {pageDefinition.label} / {locale.toUpperCase()}.
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving || !hasUnsavedChanges}
              className="rounded-full bg-background"
            >
              Discard local edits
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className="gap-2 rounded-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
