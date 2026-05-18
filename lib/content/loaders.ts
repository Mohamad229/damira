/**
 * Content Loader Functions
 *
 * Server-side functions to load page content from the database.
 * These are used by frontend components to fetch structured content.
 *
 * Pattern: Server Components → Call loader → Get typed data → Render
 */

import db from "@/lib/db";
import { parseFieldValue } from "@/lib/content/validators";
import type {
  PageData,
  SectionData,
  GetPageContentResponse,
  SectionSettings,
} from "@/lib/content/types";
import type { Locale } from "@/i18n/config";

interface PageContentFieldRecord {
  fieldKey: string;
  fieldType: string;
  value: string | null;
}

interface PageContentSectionWithFields {
  sectionKey: string;
  isVisible?: boolean | null;
  navigationLabel?: string | null;
  fields: PageContentFieldRecord[];
}

function normalizeSectionSettings(
  section: PageContentSectionWithFields,
): SectionSettings {
  const navigationLabel = section.navigationLabel?.trim();

  return {
    isVisible: section.isVisible !== false,
    navigationLabel: navigationLabel || "",
  };
}

/**
 * Extract a single section's data from PageContent
 */
function extractSectionData(
  sections: PageContentSectionWithFields[] | undefined,
  sectionKey: string,
): SectionData | null {
  if (!sections) return null;

  const section = sections.find((s) => s.sectionKey === sectionKey);
  if (!section || !section.fields) return null;

  const data: SectionData = {};
  for (const field of section.fields) {
    data[field.fieldKey] = parseFieldValue(field.value, field.fieldType);
  }

  return data;
}

/**
 * Load page content from database
 * Generic function to load any page
 */
export async function getPageContent(
  pageKey: string,
  locale: Locale,
): Promise<GetPageContentResponse | null> {
  try {
    const content = await db.pageContent.findUnique({
      where: {
        pageKey_locale: { pageKey, locale },
      },
      include: {
        sections: {
          include: { fields: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!content) {
      return null;
    }

    const sections: Record<string, SectionData> = {};
    const sectionSettings: Record<string, SectionSettings> = {};
    for (const section of content.sections as PageContentSectionWithFields[]) {
      const data = extractSectionData([section], section.sectionKey);
      if (data) {
        sections[section.sectionKey] = data;
      }
      sectionSettings[section.sectionKey] = normalizeSectionSettings(
        section,
      );
    }

    return {
      pageKey: content.pageKey,
      locale: content.locale,
      title: content.title,
      metaTitle: content.metaTitle,
      metaDescription: content.metaDescription,
      sections,
      sectionSettings,
    };
  } catch (error) {
    console.error(`Error loading page content: ${pageKey}/${locale}`, error);
    return null;
  }
}

async function getStructuredPageData(
  pageKey: string,
  locale: Locale,
): Promise<PageData | null> {
  const content = await getPageContent(pageKey, locale);
  if (!content) return null;

  return {
    title: content.title,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    visibility: Object.fromEntries(
      Object.entries(content.sectionSettings).map(([sectionKey, settings]) => [
        sectionKey,
        settings.isVisible,
      ]),
    ),
    navigationLabels: Object.fromEntries(
      Object.entries(content.sectionSettings).map(([sectionKey, settings]) => [
        sectionKey,
        settings.navigationLabel,
      ]),
    ),
    ...content.sections,
  };
}

export async function getHomePageContent(
  locale: Locale = "en" as Locale,
): Promise<PageData | null> {
  return getStructuredPageData("home", locale);
}

export async function getAboutPageContent(
  locale: Locale = "en" as Locale,
): Promise<PageData | null> {
  return getStructuredPageData("about", locale);
}

export async function getServicesPageContent(
  locale: Locale = "en" as Locale,
): Promise<PageData | null> {
  return getStructuredPageData("services", locale);
}

export async function getProductsPageContent(
  locale: Locale = "en" as Locale,
): Promise<PageData | null> {
  return getStructuredPageData("products", locale);
}

/**
 * Load contact page content
 */
export async function getContactPageContent(
  locale: Locale = "en" as Locale,
): Promise<PageData | null> {
  return getStructuredPageData("contact", locale);
}

/**
 * Load all pages for a locale
 * Used in admin dashboard
 */
export async function getAllPageContents(
  locale: Locale,
): Promise<GetPageContentResponse[]> {
  try {
    const contents = await db.pageContent.findMany({
      where: { locale },
      include: {
        sections: {
          include: { fields: true },
          orderBy: { order: "asc" },
        },
      },
    });

    return contents.map((content) => {
      const sections: Record<string, SectionData> = {};
      const sectionSettings: Record<string, SectionSettings> = {};
      for (const section of content.sections as PageContentSectionWithFields[]) {
        const data = extractSectionData([section], section.sectionKey);
        if (data) {
          sections[section.sectionKey] = data;
        }
        sectionSettings[section.sectionKey] = normalizeSectionSettings(
          section,
        );
      }

      return {
        pageKey: content.pageKey,
        locale: content.locale,
        title: content.title,
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        sections,
        sectionSettings,
      };
    });
  } catch (error) {
    console.error("Error loading all page contents", error);
    return [];
  }
}

/**
 * Get content sections for a page
 * Useful in admin for rendering section editors
 */
export async function getPageContentSections(
  pageKey: string,
  locale: Locale,
): Promise<PageContentSectionWithFields[]> {
  try {
    const content = await db.pageContent.findUnique({
      where: { pageKey_locale: { pageKey, locale } },
      include: {
        sections: {
          include: { fields: true },
          orderBy: { order: "asc" },
        },
      },
    });

    return (content?.sections || []) as PageContentSectionWithFields[];
  } catch (error) {
    console.error(`Error loading page sections: ${pageKey}/${locale}`, error);
    return [];
  }
}

/**
 * Get a specific content section's data
 */
export async function getPageContentSection(
  pageKey: string,
  sectionKey: string,
  locale: Locale,
): Promise<SectionData | null> {
  try {
    const content = await db.pageContent.findUnique({
      where: { pageKey_locale: { pageKey, locale } },
      include: {
        sections: {
          where: { sectionKey },
          include: { fields: true },
        },
      },
    });

    if (!content || content.sections.length === 0) {
      return null;
    }

    return extractSectionData(content.sections, sectionKey);
  } catch (error) {
    console.error(
      `Error loading section: ${pageKey}/${sectionKey}/${locale}`,
      error,
    );
    return null;
  }
}
