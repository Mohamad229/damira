import { cache } from "react";

import { getPageContent } from "@/lib/content/loaders";
import {
  sanitizeTemplateValue,
  sanitizeValueAgainstTemplate,
} from "@/lib/content/admin-template-sanitizer";
import {
  getDefaultSectionNavigationLabel,
  getPageDefinition,
} from "@/lib/content/page-definitions";
import type { Locale } from "@/i18n/config";

import { getPublicUiData } from "./mock-data";
import type { PublicUiData } from "./mock-data";

type PublicPageKey = keyof PublicUiData;
export type ManagedPublicPageData<K extends PublicPageKey> = PublicUiData[K] & {
  visibility: Record<string, boolean>;
  navigationLabels: Record<string, string>;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (!isRecord(base) || !isRecord(override)) {
    return override;
  }

  const merged: UnknownRecord = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const current = merged[key];
    merged[key] = deepMerge(current, value);
  }

  return merged;
}

function normalizeSectionOverride(sectionData: unknown): UnknownRecord | null {
  if (!isRecord(sectionData)) {
    return null;
  }

  const candidate = sectionData.data;
  if (isRecord(candidate)) {
    return candidate;
  }

  return sectionData;
}

function getSectionTitleFallback(sectionData: unknown): string | null {
  if (!isRecord(sectionData)) {
    return null;
  }

  for (const key of ["title", "eyebrow", "label", "name"]) {
    const value = sectionData[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  for (const key of ["content", "stats"]) {
    const nested = getSectionTitleFallback(sectionData[key]);
    if (nested) {
      return nested;
    }
  }

  return null;
}

function attachSectionMetadata<K extends PublicPageKey>(
  pageKey: K,
  locale: Locale,
  data: PublicUiData[K],
  content: Awaited<ReturnType<typeof getPageContent>>,
): ManagedPublicPageData<K> {
  const pageDefinition = getPageDefinition(pageKey);
  const dataRecord = data as unknown as UnknownRecord;
  const visibility: Record<string, boolean> = {};
  const navigationLabels: Record<string, string> = {};

  for (const section of pageDefinition?.sections ?? []) {
    const settings = content?.sectionSettings?.[section.sectionKey];
    const fallbackLabel =
      getSectionTitleFallback(dataRecord[section.sectionKey]) ||
      getDefaultSectionNavigationLabel(pageKey, section.sectionKey, locale);

    visibility[section.sectionKey] = settings?.isVisible ?? true;
    navigationLabels[section.sectionKey] =
      settings?.navigationLabel?.trim() || fallbackLabel;
  }

  return {
    ...data,
    visibility,
    navigationLabels,
  };
}

const getManagedPublicPageDataCached = cache(
  async <K extends PublicPageKey>(
    pageKey: K,
    locale: Locale,
  ): Promise<ManagedPublicPageData<K>> => {
    const fallback = getPublicUiData(locale)[pageKey];
    const content = await getPageContent(pageKey, locale);

    if (!content) {
      return attachSectionMetadata(pageKey, locale, fallback, null);
    }

    const merged = {
      ...fallback,
      metadata: {
        ...fallback.metadata,
      },
    } as PublicUiData[K] & { metadata: { title: string; description: string } };

    if (content.metaTitle || content.title) {
      merged.metadata.title = content.metaTitle || content.title;
    }

    if (content.metaDescription) {
      merged.metadata.description = content.metaDescription;
    }

    const mergedRecord = merged as unknown as UnknownRecord;

    for (const [sectionKey, sectionData] of Object.entries(content.sections)) {
      const override = normalizeSectionOverride(sectionData);
      if (!override) {
        continue;
      }

      const current = mergedRecord[sectionKey];
      if (current === undefined) {
        continue;
      }

      const cleanTemplate =
        sanitizeTemplateValue(current, { pageKey, sectionKey }) ?? {};
      const sanitizedOverride = sanitizeValueAgainstTemplate(
        override,
        cleanTemplate,
        { pageKey, sectionKey },
      );

      mergedRecord[sectionKey] = deepMerge(current, sanitizedOverride);
    }

    return attachSectionMetadata(pageKey, locale, merged, content);
  },
);

export async function getManagedPublicPageData<K extends PublicPageKey>(
  pageKey: K,
  locale: Locale,
): Promise<ManagedPublicPageData<K>> {
  return getManagedPublicPageDataCached(pageKey, locale);
}
