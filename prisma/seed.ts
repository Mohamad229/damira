import "dotenv/config";

import { PrismaClient, UserRole } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

import {
  ACTIVE_PAGE_SECTIONS,
  type ActivePageKey,
} from "../lib/content/page-definitions";
import { getPublicUiData } from "../lib/content/public-ui/mock-data";
import type { Locale } from "../i18n/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

type PageSeedInput = {
  pageKey: ActivePageKey;
  locale: Locale;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: Array<{
    sectionKey: string;
    order: number;
    data: unknown;
  }>;
};

function toJsonSafe(value: unknown): unknown {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "function" || typeof value === "symbol") {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => toJsonSafe(item))
      .filter((item) => item !== undefined);
  }

  if (typeof value === "object") {
    const output: Record<string, unknown> = {};

    for (const [key, child] of Object.entries(value)) {
      const safeChild = toJsonSafe(child);
      if (safeChild !== undefined) {
        output[key] = safeChild;
      }
    }

    return output;
  }

  return undefined;
}

async function upsertPageContent({
  pageKey,
  locale,
  title,
  metaTitle,
  metaDescription,
  sections,
}: PageSeedInput) {
  const content = await prisma.pageContent.upsert({
    where: {
      pageKey_locale: { pageKey, locale },
    },
    create: {
      pageKey,
      locale,
      title,
      metaTitle,
      metaDescription,
    },
    update: {
      title,
      metaTitle,
      metaDescription,
    },
  });

  for (const sectionInput of sections) {
    const section = await prisma.pageContentSection.upsert({
      where: {
        contentId_sectionKey: {
          contentId: content.id,
          sectionKey: sectionInput.sectionKey,
        },
      },
      create: {
        contentId: content.id,
        sectionKey: sectionInput.sectionKey,
        order: sectionInput.order,
      },
      update: {
        order: sectionInput.order,
      },
    });

    await prisma.pageContentField.upsert({
      where: {
        sectionId_fieldKey: {
          sectionId: section.id,
          fieldKey: "data",
        },
      },
      create: {
        sectionId: section.id,
        fieldKey: "data",
        fieldType: "json",
        value: JSON.stringify(toJsonSafe(sectionInput.data)),
      },
      update: {
        fieldType: "json",
        value: JSON.stringify(toJsonSafe(sectionInput.data)),
      },
    });
  }
}

async function seedStructuredPageContent() {
  const locales: Locale[] = ["en", "ar"];

  for (const locale of locales) {
    const publicData = getPublicUiData(locale);

    for (const pageKey of Object.keys(ACTIVE_PAGE_SECTIONS) as ActivePageKey[]) {
      const pageData = publicData[pageKey];
      const pageRecord = pageData as unknown as Record<string, unknown> & {
        metadata: { title: string; description: string };
      };

      await upsertPageContent({
        pageKey,
        locale,
        title: pageData.metadata.title,
        metaTitle: pageData.metadata.title,
        metaDescription: pageData.metadata.description,
        sections: ACTIVE_PAGE_SECTIONS[pageKey].map((sectionKey, index) => ({
          sectionKey,
          order: index + 1,
          data: pageRecord[sectionKey],
        })),
      });
    }
  }
}

async function main() {
  console.log("Starting database seeding...");

  const hashedPassword = await bcrypt.hash("admin123", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@damirapharma.com" },
    update: {},
    create: {
      email: "admin@damirapharma.com",
      password: hashedPassword,
      name: "Admin User",
      role: UserRole.ADMIN,
    },
  });
  console.log("Admin user ready:", adminUser.email);

  const therapeuticAreas = [
    { slug: "oncology", name: "Oncology", nameAr: "الأورام" },
    { slug: "cardiology", name: "Cardiology", nameAr: "أمراض القلب" },
    { slug: "neurology", name: "Neurology", nameAr: "الأعصاب" },
    { slug: "immunology", name: "Immunology", nameAr: "المناعة" },
    { slug: "respiratory", name: "Respiratory", nameAr: "الجهاز التنفسي" },
    {
      slug: "gastroenterology",
      name: "Gastroenterology",
      nameAr: "الجهاز الهضمي",
    },
    { slug: "dermatology", name: "Dermatology", nameAr: "الأمراض الجلدية" },
    { slug: "endocrinology", name: "Endocrinology", nameAr: "الغدد الصماء" },
  ];

  for (const area of therapeuticAreas) {
    await prisma.therapeuticArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: area,
    });
  }
  console.log("Therapeutic areas ready:", therapeuticAreas.length);

  const categories = [
    { slug: "pharmaceuticals", name: "Pharmaceuticals", nameAr: "الأدوية" },
    { slug: "biologics", name: "Biologics", nameAr: "المستحضرات الحيوية" },
    { slug: "vaccines", name: "Vaccines", nameAr: "اللقاحات" },
    {
      slug: "medical-devices",
      name: "Medical Devices",
      nameAr: "الأجهزة الطبية",
    },
    { slug: "diagnostics", name: "Diagnostics", nameAr: "التشخيص" },
    {
      slug: "nutraceuticals",
      name: "Nutraceuticals",
      nameAr: "المكملات الغذائية",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log("Categories ready:", categories.length);

  const manufacturers = [
    { slug: "damira-pharma", name: "Damira Pharma", country: "Syria" },
    { slug: "pfizer", name: "Pfizer", country: "United States" },
    { slug: "novartis", name: "Novartis", country: "Switzerland" },
    { slug: "roche", name: "Roche", country: "Switzerland" },
    { slug: "sanofi", name: "Sanofi", country: "France" },
    { slug: "astrazeneca", name: "AstraZeneca", country: "United Kingdom" },
  ];

  for (const manufacturer of manufacturers) {
    await prisma.manufacturer.upsert({
      where: { slug: manufacturer.slug },
      update: manufacturer,
      create: manufacturer,
    });
  }
  console.log("Manufacturers ready:", manufacturers.length);

  const siteSettings = [
    { key: "siteName", value: "Damira Pharma" },
    { key: "siteTagline", value: "Trusted. Healthy." },
    { key: "contactEmail", value: "info@damirapharma.sy" },
    { key: "contactPhone", value: "+963 935 222 202" },
    {
      key: "contactAddress",
      value: "Erbin, Damascus Countryside, Syria",
    },
    {
      key: "seoDefaultTitle",
      value: "Damira Pharma - Specialized Healthcare Distribution",
    },
    {
      key: "seoDefaultDescription",
      value:
        "Damira Pharma is a specialized healthcare distribution and commercialization partner in Syria.",
    },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("Site settings ready:", siteSettings.length);

  await seedStructuredPageContent();
  console.log("Structured page content ready");

  console.log("Database seeding completed!");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
