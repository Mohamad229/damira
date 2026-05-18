/**
 * Page Content Definitions
 *
 * Defines the fixed public page structures editable in the admin dashboard.
 * Admins edit content for predefined sections only; arbitrary page/section
 * creation is intentionally not supported.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "json"
  | "media"
  | "number"
  | "boolean";

export interface FieldDefinition {
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
}

export interface SectionDefinition {
  sectionKey: string;
  label: string;
  navigationLabel: Record<"en" | "ar", string>;
  description?: string;
  fields: Record<string, FieldDefinition>;
}

export interface PageDefinition {
  pageKey: string;
  label: string;
  sections: SectionDefinition[];
}

export const ACTIVE_PAGE_SECTIONS = {
  home: [
    "hero",
    "atAGlance",
    "strategicFocus",
    "keyStrengths",
    "coverageReach",
    "successHighlight",
    "cta",
  ],
  about: [
    "hero",
    "companyOverview",
    "visionMission",
    "coreValues",
    "legacySuccess",
  ],
  services: ["hero", "serviceItems"],
  products: ["hero", "pipelineSegments", "catalog"],
  quality: [
    "hero",
    "complianceDetails",
    "qmsArchitecture",
    "certificates",
    "ethicsCompliance",
  ],
  partnerships: ["hero", "whyPartner", "advantage", "partnershipForm"],
  contact: ["hero", "contactInfo", "contactForm"],
} as const;

export type ActivePageKey = keyof typeof ACTIVE_PAGE_SECTIONS;

const DEFAULT_SECTION_NAVIGATION_LABELS: Record<
  ActivePageKey,
  Record<string, Record<"en" | "ar", string>>
> = {
  home: {
    hero: { en: "Overview", ar: "الرئيسية" },
    atAGlance: { en: "At a Glance", ar: "لمحة عامة" },
    strategicFocus: { en: "Strategic Focus", ar: "التركيز الاستراتيجي" },
    keyStrengths: { en: "Key Strengths", ar: "نقاط القوة" },
    coverageReach: { en: "Coverage & Reach", ar: "التغطية والانتشار" },
    successHighlight: { en: "Success Highlight", ar: "إبراز النجاح" },
    cta: { en: "Call To Action", ar: "الدعوة للتواصل" },
  },
  about: {
    hero: { en: "Overview", ar: "من نحن" },
    companyOverview: { en: "Company Overview", ar: "نظرة عامة على الشركة" },
    visionMission: { en: "Vision & Mission", ar: "الرؤية والرسالة" },
    coreValues: { en: "Core Values", ar: "القيم الأساسية" },
    legacySuccess: { en: "Legacy & Success", ar: "الإرث والنجاح" },
  },
  services: {
    hero: { en: "Overview", ar: "الخدمات" },
    serviceItems: { en: "Services", ar: "الخدمات" },
    regulatory: { en: "Regulatory Services", ar: "الخدمات التنظيمية" },
    infrastructure: { en: "Infrastructure", ar: "البنية التحتية" },
    marketAccess: { en: "Market Access", ar: "الوصول إلى السوق" },
    logisticsDistribution: {
      en: "Logistics & Distribution",
      ar: "اللوجستيات والتوزيع",
    },
    safetyVigilance: { en: "Safety & Vigilance", ar: "السلامة والتيقظ" },
  },
  products: {
    hero: { en: "Overview", ar: "المنتجات" },
    pipelineSegments: { en: "Pipeline Segments", ar: "شرائح المنتجات" },
    catalog: { en: "Product Catalog", ar: "كتالوج المنتجات" },
  },
  quality: {
    hero: { en: "Overview", ar: "الجودة والامتثال" },
    complianceDetails: { en: "Compliance Details", ar: "تفاصيل الامتثال" },
    qmsArchitecture: { en: "QMS Architecture", ar: "نظام إدارة الجودة" },
    certificates: { en: "Certifications", ar: "الشهادات" },
    ethicsCompliance: {
      en: "Ethics & Compliance",
      ar: "الأخلاقيات والامتثال",
    },
  },
  partnerships: {
    hero: { en: "Overview", ar: "الشراكات" },
    whyPartner: { en: "Why Partner", ar: "لماذا الشراكة" },
    advantage: { en: "Damira Advantage", ar: "ميزة داميرا" },
    partnershipForm: { en: "Inquiry Form", ar: "نموذج الاستفسار" },
  },
  contact: {
    hero: { en: "Overview", ar: "اتصل بنا" },
    contactInfo: { en: "Contact Info", ar: "معلومات التواصل" },
    contactForm: { en: "Contact Form", ar: "نموذج التواصل" },
  },
};

function sectionDataField(description: string): Record<string, FieldDefinition> {
  return {
    data: {
      type: "json",
      label: "Section content",
      placeholder: "{}",
      description,
    },
  };
}

function section(
  sectionKey: string,
  label: string,
  pageKey: ActivePageKey,
  description?: string,
): SectionDefinition {
  return {
    sectionKey,
    label,
    navigationLabel: DEFAULT_SECTION_NAVIGATION_LABELS[pageKey][sectionKey] ?? {
      en: label,
      ar: label,
    },
    description,
    fields: sectionDataField(
      `Edit the visible fields for the ${sectionKey} public section.`,
    ),
  };
}

export const PAGE_DEFINITIONS: Record<ActivePageKey, PageDefinition> = {
  home: {
    pageKey: "home",
    label: "Home Page",
    sections: [
      section("hero", "Hero Section", "home", "Hero eyebrow, title, subtitle, actions, and image"),
      section("atAGlance", "At A Glance", "home", "Stats block below hero"),
      section("strategicFocus", "Strategic Focus", "home", "Strategic focus cards and labels"),
      section("keyStrengths", "Key Strengths", "home", "Core strengths cards"),
      section("coverageReach", "Coverage And Reach", "home", "Coverage stats section"),
      section("successHighlight", "Success Highlight", "home", "Achievement highlight block"),
      section("cta", "Call To Action", "home", "Final call-to-action area"),
    ],
  },
  about: {
    pageKey: "about",
    label: "About Page",
    sections: [
      section("hero", "Hero Section", "about", "Top hero section"),
      section("companyOverview", "Company Overview", "about", "Company overview content block"),
      section("visionMission", "Vision And Mission", "about", "Vision and mission content"),
      section("coreValues", "Core Values", "about", "Core values cards"),
      section("legacySuccess", "Legacy And Success", "about", "Combined content and stats section"),
    ],
  },
  services: {
    pageKey: "services",
    label: "Services Page",
    sections: [
      section("hero", "Hero Section", "services", "Top hero section"),
      section(
        "serviceItems",
        "Service Items",
        "services",
        "Repeatable service cards shown on the public Services page",
      ),
    ],
  },
  products: {
    pageKey: "products",
    label: "Products Page",
    sections: [
      section("hero", "Hero Section", "products", "Top hero section"),
      section("pipelineSegments", "Pipeline Segments", "products", "Pipeline segments section"),
      section(
        "catalog",
        "Product fallback portfolio",
        "products",
        "Fallback catalog content used only when product database content is unavailable",
      ),
    ],
  },
  quality: {
    pageKey: "quality",
    label: "Quality Page",
    sections: [
      section("hero", "Hero Section", "quality", "Top hero section"),
      section("complianceDetails", "Compliance Details", "quality", "Quality and compliance details"),
      section("qmsArchitecture", "QMS Architecture", "quality", "Quality management system diagram content"),
      section("certificates", "Quality Certificates", "quality", "Certification showcase slider and records"),
      section("ethicsCompliance", "Ethics Compliance", "quality", "Ethics and compliance commitment cards"),
    ],
  },
  partnerships: {
    pageKey: "partnerships",
    label: "Partnerships Page",
    sections: [
      section("hero", "Hero Section", "partnerships", "Top hero section"),
      section("whyPartner", "Why Partner", "partnerships", "Partner benefit cards"),
      section("advantage", "Partnership Advantage", "partnerships", "Damira advantage cards and image"),
      section("partnershipForm", "Partnership Form", "partnerships", "Partnership inquiry form copy and labels"),
    ],
  },
  contact: {
    pageKey: "contact",
    label: "Contact Page",
    sections: [
      section("hero", "Hero Section", "contact", "Top hero section"),
      section("contactInfo", "Contact Information", "contact", "Contact section title and item layout"),
      section("contactForm", "Contact Form", "contact", "Contact form copy and labels"),
    ],
  },
};

export function getPageDefinition(pageKey: string): PageDefinition | undefined {
  return PAGE_DEFINITIONS[pageKey as ActivePageKey];
}

export function getAllPageKeys(): ActivePageKey[] {
  return Object.keys(PAGE_DEFINITIONS) as ActivePageKey[];
}

export function getSectionDefinition(
  pageKey: string,
  sectionKey: string,
): SectionDefinition | undefined {
  const page = getPageDefinition(pageKey);
  if (!page) return undefined;
  return page.sections.find((s) => s.sectionKey === sectionKey);
}

export function formatSectionKey(sectionKey: string): string {
  return sectionKey
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getDefaultSectionNavigationLabel(
  pageKey: string,
  sectionKey: string,
  locale: "en" | "ar",
): string {
  const sectionDef = getSectionDefinition(pageKey, sectionKey);
  return (
    sectionDef?.navigationLabel[locale] ||
    sectionDef?.label ||
    formatSectionKey(sectionKey)
  );
}

export function validatePageStructure(
  pageKey: string,
  structure: Record<string, unknown>,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const page = getPageDefinition(pageKey);

  if (!page) {
    errors.push(`Page '${pageKey}' not found`);
    return { valid: false, errors };
  }

  for (const sectionDef of page.sections) {
    if (!structure[sectionDef.sectionKey]) {
      continue;
    }
  }

  return { valid: errors.length === 0, errors };
}
