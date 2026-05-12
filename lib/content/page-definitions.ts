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
  services: [
    "hero",
    "regulatory",
    "infrastructure",
    "marketAccess",
    "logisticsDistribution",
    "safetyVigilance",
  ],
  products: ["hero", "pipelineSegments", "catalog"],
  quality: ["hero", "complianceDetails", "qmsArchitecture", "ethicsCompliance"],
  partnerships: ["hero", "whyPartner", "advantage", "partnershipForm"],
  contact: ["hero", "contactInfo", "contactForm"],
} as const;

export type ActivePageKey = keyof typeof ACTIVE_PAGE_SECTIONS;

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
  description?: string,
): SectionDefinition {
  return {
    sectionKey,
    label,
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
      section("hero", "Hero Section", "Hero eyebrow, title, subtitle, actions, and image"),
      section("atAGlance", "At A Glance", "Stats block below hero"),
      section("strategicFocus", "Strategic Focus", "Strategic focus cards and labels"),
      section("keyStrengths", "Key Strengths", "Core strengths cards"),
      section("coverageReach", "Coverage And Reach", "Coverage stats section"),
      section("successHighlight", "Success Highlight", "Achievement highlight block"),
      section("cta", "Call To Action", "Final call-to-action area"),
    ],
  },
  about: {
    pageKey: "about",
    label: "About Page",
    sections: [
      section("hero", "Hero Section", "Top hero section"),
      section("companyOverview", "Company Overview", "Company overview content block"),
      section("visionMission", "Vision And Mission", "Vision and mission content"),
      section("coreValues", "Core Values", "Core values cards"),
      section("legacySuccess", "Legacy And Success", "Combined content and stats section"),
    ],
  },
  services: {
    pageKey: "services",
    label: "Services Page",
    sections: [
      section("hero", "Hero Section", "Top hero section"),
      section("regulatory", "Regulatory", "Regulatory services section"),
      section("infrastructure", "Infrastructure", "Infrastructure section"),
      section("marketAccess", "Market Access", "Market access section"),
      section("logisticsDistribution", "Logistics And Distribution", "Logistics and distribution section"),
      section("safetyVigilance", "Safety And Vigilance", "Safety and vigilance section"),
    ],
  },
  products: {
    pageKey: "products",
    label: "Products Page",
    sections: [
      section("hero", "Hero Section", "Top hero section"),
      section("pipelineSegments", "Pipeline Segments", "Pipeline segments section"),
      section(
        "catalog",
        "Product fallback portfolio",
        "Fallback catalog content used only when product database content is unavailable",
      ),
    ],
  },
  quality: {
    pageKey: "quality",
    label: "Quality Page",
    sections: [
      section("hero", "Hero Section", "Top hero section"),
      section("complianceDetails", "Compliance Details", "Quality and compliance details"),
      section("qmsArchitecture", "QMS Architecture", "Quality management system diagram content"),
      section("ethicsCompliance", "Ethics Compliance", "Ethics and compliance commitment cards"),
    ],
  },
  partnerships: {
    pageKey: "partnerships",
    label: "Partnerships Page",
    sections: [
      section("hero", "Hero Section", "Top hero section"),
      section("whyPartner", "Why Partner", "Partner benefit cards"),
      section("advantage", "Partnership Advantage", "Damira advantage cards and image"),
      section("partnershipForm", "Partnership Form", "Partnership inquiry form copy and labels"),
    ],
  },
  contact: {
    pageKey: "contact",
    label: "Contact Page",
    sections: [
      section("hero", "Hero Section", "Top hero section"),
      section("contactInfo", "Contact Information", "Contact section title and item layout"),
      section("contactForm", "Contact Form", "Contact form copy and labels"),
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
