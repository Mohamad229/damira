import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import {
  ACTIVE_PAGE_SECTIONS,
  type ActivePageKey,
} from "../lib/content/page-definitions";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const apply =
  process.env.APPLY === "true" || process.argv.some((arg) => arg === "--apply");

function isActivePageKey(pageKey: string): pageKey is ActivePageKey {
  return pageKey in ACTIVE_PAGE_SECTIONS;
}

async function main() {
  console.log(
    apply
      ? "Cleanup mode: APPLYING changes"
      : "Cleanup mode: dry run. Pass --apply or APPLY=true to delete.",
  );

  const sections = await prisma.pageContentSection.findMany({
    include: {
      content: {
        select: {
          pageKey: true,
          locale: true,
        },
      },
      fields: {
        select: {
          id: true,
          fieldKey: true,
        },
      },
    },
    orderBy: [{ contentId: "asc" }, { order: "asc" }],
  });

  const obsoleteSectionIds: string[] = [];
  const obsoleteFieldIds: string[] = [];

  for (const section of sections) {
    const pageKey = section.content.pageKey;
    const activeSections = isActivePageKey(pageKey)
      ? ACTIVE_PAGE_SECTIONS[pageKey]
      : null;

    if (
      !activeSections ||
      !(activeSections as readonly string[]).includes(section.sectionKey)
    ) {
      obsoleteSectionIds.push(section.id);
      console.log(
        `Section: ${pageKey}/${section.content.locale}.${section.sectionKey}`,
      );
      continue;
    }

    for (const field of section.fields) {
      if (field.fieldKey !== "data") {
        obsoleteFieldIds.push(field.id);
        console.log(
          `Field: ${pageKey}/${section.content.locale}.${section.sectionKey}.${field.fieldKey}`,
        );
      }
    }
  }

  console.log(`Obsolete sections: ${obsoleteSectionIds.length}`);
  console.log(`Obsolete non-data fields: ${obsoleteFieldIds.length}`);

  if (!apply) {
    return;
  }

  if (obsoleteFieldIds.length > 0) {
    await prisma.pageContentField.deleteMany({
      where: {
        id: {
          in: obsoleteFieldIds,
        },
      },
    });
  }

  if (obsoleteSectionIds.length > 0) {
    await prisma.pageContentSection.deleteMany({
      where: {
        id: {
          in: obsoleteSectionIds,
        },
      },
    });
  }

  console.log("Structured page content cleanup completed.");
}

main()
  .catch((error) => {
    console.error("Cleanup failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
