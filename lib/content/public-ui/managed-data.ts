import { cache } from "react";

import { getPageContent } from "@/lib/content/loaders";
import {
  sanitizeTemplateValue,
  sanitizeValueAgainstTemplate,
} from "@/lib/content/admin-template-sanitizer";
import type { Locale } from "@/i18n/config";

import { getPublicUiData } from "./mock-data";
import type { PublicUiData } from "./mock-data";

type PublicPageKey = keyof PublicUiData;

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

const getManagedPublicPageDataCached = cache(
  async (pageKey: PublicPageKey, locale: Locale): Promise<PublicUiData[PublicPageKey]> => {
    const fallback = getPublicUiData(locale)[pageKey];
    const content = await getPageContent(pageKey, locale);

    if (!content) {
      return fallback;
    }

    const merged = {
      ...fallback,
      metadata: {
        ...fallback.metadata,
      },
    } as PublicUiData[PublicPageKey] & { metadata: { title: string; description: string } };

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

    return merged;
  },
);

export async function getManagedPublicPageData<K extends PublicPageKey>(
  pageKey: K,
  locale: Locale,
): Promise<PublicUiData[K]> {
  const data = await getManagedPublicPageDataCached(pageKey, locale);
  return data as PublicUiData[K];
}
